// ─────────────────────────────────────────────────────────────
//  Feed Fetcher — parse RSS/Atom/YouTube feeds
// ─────────────────────────────────────────────────────────────
import Parser from "rss-parser";
import { FEED_SOURCES, type FeedSource, type FeedCategory } from "./feedSources.js";

// Shorter timeout on Vercel to stay within 60s function limit
const parser = new Parser({
  timeout: process.env.VERCEL ? 3_000 : 8_000,
  headers: { "User-Agent": "VarandaaTalkies/1.0 (news aggregator)" },
});

export interface RawArticle {
  sourceId: string;
  sourceName: string;
  category: FeedCategory;
  language: "te" | "en";
  title: string;
  link: string;
  realLink: string;    // resolved URL after following Google News redirects
  summary: string;
  image: string;
  publishedAt: string;
}

// Stable numeric hash from a string (no Date.now())
function stableHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

// Category fallback images (Unsplash free, no API key needed)
// Extract first real image from content/enclosure/media;
// fall back to picsum with title-hash seed — unique per article, never repeats.
function extractImage(
  item: Parser.Item & Record<string, unknown>,
  _category: string,
  title: string
): string {
  const enclosure = item.enclosure as { url?: string; type?: string } | undefined;
  if (enclosure?.url && enclosure.type?.startsWith("image")) return enclosure.url;

  const mediaThumbnail = item["media:thumbnail"] as { $?: { url?: string } } | undefined;
  if (mediaThumbnail?.$?.url) return mediaThumbnail.$.url;

  const mediaContent = item["media:content"] as
    | { $?: { url?: string; medium?: string } }
    | undefined;
  if (mediaContent?.$?.url && mediaContent.$?.medium === "image") return mediaContent.$.url;

  // Try to extract from content HTML
  const content = (item.content || item["content:encoded"] || "") as string;
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1] && !imgMatch[1].includes("pixel") && !imgMatch[1].includes("tracking")) {
    return imgMatch[1];
  }

  // Unique per-article fallback: picsum.photos seed is deterministic on title hash.
  // Each article gets a different photo; same article always gets the same one.
  const seed = stableHash(title) % 1000;
  return `https://picsum.photos/seed/${seed}/640/360`;
}

// Normalise title for deduplication: strip all trailing " - Publisher" segments
function normTitle(title: string): string {
  let t = title;
  // Strip up to 3 trailing " - Source" segments (requires whitespace before separator
  // so intra-word dashes like "IIT-B" are not stripped)
  for (let i = 0; i < 3; i++) {
    const stripped = t.replace(/\s+[-–—|]\s*[^-–—|]{2,60}$/, "");
    if (stripped === t || stripped.length < 10) break;
    t = stripped;
  }
  return t
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

// Follow a Google News redirect URL to get the real article URL.
// Uses GET (not HEAD) because Google News requires a browser-like GET to resolve.
async function resolveGNewsUrl(url: string): Promise<string> {
  if (!url.includes("news.google.com")) return url;
  try {
    const resp = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,*/*",
      },
      signal: AbortSignal.timeout(10_000),
    });
    const resolved = resp.url;
    return resolved && !resolved.includes("news.google.com") ? resolved : url;
  } catch {
    return url;
  }
}

// Fetch a single source, return raw articles (max 4 per source — prevents any
// single publisher from dominating the feed regardless of how prolific they are)
async function fetchSource(source: FeedSource): Promise<RawArticle[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const items = (feed.items ?? []).slice(0, 4);

    return items
      .map((item) => {
        const title = item.title?.trim() ?? "";
        const summary = item.contentSnippet?.slice(0, 300) ?? item.summary?.slice(0, 300) ?? "";
        // Skip articles where summary is just the title repeated (no real content)
        const hasContent = summary.length > 20 && summary.toLowerCase() !== title.toLowerCase().slice(0, summary.length);
        return {
          sourceId: source.id,
          sourceName: source.name,
          category: source.category,
          language: source.language,
          title,
          link: item.link ?? item.guid ?? "",
          realLink: item.link ?? item.guid ?? "",  // resolved later if RESOLVE_REDIRECTS=true
          summary: hasContent ? summary : "",
          image: extractImage(item as Parser.Item & Record<string, unknown>, source.category, title),
          publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
          _hasContent: hasContent,
        };
      })
      .filter((a) => a.title.length > 5 && a.link.length > 0);
  } catch (err) {
    console.warn(`[fetchFeeds] Failed to fetch ${source.id}: ${(err as Error).message}`);
    return [];
  }
}

// Fetch all sources in parallel (with concurrency limit)
export async function fetchAllFeeds(maxPerCategory = 6): Promise<RawArticle[]> {
  console.log(`[fetchFeeds] Fetching ${FEED_SOURCES.length} sources…`);

  // On Vercel: fetch all sources in one shot to save time
  const CONCURRENCY = process.env.VERCEL ? FEED_SOURCES.length : 8;
  const results: RawArticle[] = [];
  const sources = [...FEED_SOURCES];

  while (sources.length) {
    const batch = sources.splice(0, CONCURRENCY);
    const batchResults = await Promise.allSettled(batch.map(fetchSource));
    for (const r of batchResults) {
      if (r.status === "fulfilled") results.push(...r.value);
    }
  }

  // Deduplicate by normalised title.
  // Two keys per article: full title + first-6-words (catches slightly-different-title
  // duplicates that come from the same story via different Google News search queries).
  const seen = new Set<string>();
  const deduped = results.filter((a) => {
    const full = normTitle(a.title);
    const short = full.split(" ").slice(0, 6).join(" ");
    if (seen.has(full) || seen.has(short)) return false;
    seen.add(full);
    seen.add(short);
    return true;
  });

  // Sort by source priority so high-priority sources win category slots
  const priorityMap = new Map(FEED_SOURCES.map((s) => [s.id, s.priority]));
  deduped.sort((a, b) => (priorityMap.get(a.sourceId) ?? 9) - (priorityMap.get(b.sourceId) ?? 9));

  // Resolve the true publisher name for capping.
  // For GNews items: extract the trailing "- Publisher Name" from the title.
  // For direct feeds: strip sub-edition suffixes ("The Hindu — Andhra Pradesh" → "the hindu")
  // so the same outlet doesn't get extra slots via multiple RSS feeds.
  function resolvePublisher(title: string, sourceName: string): string {
    const isGNews = sourceName.toLowerCase().includes("google news");
    if (isGNews) {
      const m = title.match(/[-–—]\s*([^-–—]{3,60})$/);
      if (m) return m[1].trim().toLowerCase();
    }
    // Strip everything after em-dash / en-dash / " - " in source name
    return sourceName.replace(/\s*[-–—]\s*.+$/, "").toLowerCase().trim();
  }

  // 1 article per publisher — user requirement: strict source diversity
  const countByPublisher: Record<string, number> = {};
  const publisherCapped = deduped.filter((a) => {
    const pub = resolvePublisher(a.title, a.sourceName);
    countByPublisher[pub] = (countByPublisher[pub] ?? 0) + 1;
    return countByPublisher[pub] <= 1;
  });
  const topPublishers = Object.entries(countByPublisher).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([p,n])=>`${p}:${n}`).join(", ");
  console.log(`[fetchFeeds] Publishers (capped at 1): ${topPublishers}`);

  // Cap per category so no single category dominates
  const countByCategory: Record<string, number> = {};
  const capped = publisherCapped.filter((a) => {
    countByCategory[a.category] = (countByCategory[a.category] ?? 0) + 1;
    return countByCategory[a.category] <= maxPerCategory;
  });

  console.log(`[fetchFeeds] Got ${results.length} raw → ${deduped.length} deduped → ${publisherCapped.length} publisher-capped → ${capped.length} final`);

  // Strip internal _hasContent flag
  const cleaned = capped.map(({ ...a }) => {
    const out = a as RawArticle & { _hasContent?: boolean };
    delete out._hasContent;
    return out;
  });

  // Resolve Google News redirect URLs when enabled (GitHub Actions pipeline only —
  // adds latency so disabled on Vercel where each request has a 60s limit)
  if (process.env.RESOLVE_REDIRECTS === "true") {
    console.log("[fetchFeeds] Resolving Google News redirect URLs…");
    const resolved = await Promise.all(
      cleaned.map(async (a) => ({
        ...a,
        realLink: await resolveGNewsUrl(a.link),
      }))
    );
    const resolvedCount = resolved.filter((a) => a.realLink !== a.link).length;
    console.log(`[fetchFeeds] Resolved ${resolvedCount} Google News URLs`);
    return resolved;
  }

  return cleaned;
}
