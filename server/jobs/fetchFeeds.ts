// ─────────────────────────────────────────────────────────────
//  Feed Fetcher — parse RSS/Atom/YouTube feeds
// ─────────────────────────────────────────────────────────────
import Parser from "rss-parser";
import { FEED_SOURCES, type FeedSource, type FeedCategory } from "./feedSources.js";

const parser = new Parser({
  timeout: 10_000,
  headers: { "User-Agent": "VarandaaTalkies/1.0 (news aggregator)" },
});

export interface RawArticle {
  sourceId: string;
  sourceName: string;
  category: FeedCategory;
  language: "te" | "en";
  title: string;
  link: string;
  summary: string;
  image: string;
  publishedAt: string;
}

// Extract first image from content/enclosure/media
function extractImage(item: Parser.Item & Record<string, unknown>): string {
  const enclosure = item.enclosure as { url?: string } | undefined;
  if (enclosure?.url) return enclosure.url;

  const mediaThumbnail = item["media:thumbnail"] as { $?: { url?: string } } | undefined;
  if (mediaThumbnail?.$?.url) return mediaThumbnail.$.url;

  const mediaContent = item["media:content"] as { $?: { url?: string } } | undefined;
  if (mediaContent?.$?.url) return mediaContent.$.url;

  // Try to extract from content HTML
  const content = (item.content || item["content:encoded"] || "") as string;
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  return `https://picsum.photos/seed/${Date.now()}/320/180`;
}

// Fetch a single source, return raw articles (max 10 per source)
async function fetchSource(source: FeedSource): Promise<RawArticle[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const items = (feed.items ?? []).slice(0, 10);

    return items.map((item) => ({
      sourceId: source.id,
      sourceName: source.name,
      category: source.category,
      language: source.language,
      title: item.title?.trim() ?? "",
      link: item.link ?? item.guid ?? "",
      summary: item.contentSnippet?.slice(0, 300) ?? item.summary?.slice(0, 300) ?? "",
      image: extractImage(item as Parser.Item & Record<string, unknown>),
      publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
    }));
  } catch (err) {
    console.warn(`[fetchFeeds] Failed to fetch ${source.id}: ${(err as Error).message}`);
    return [];
  }
}

// Fetch all sources in parallel (with concurrency limit)
export async function fetchAllFeeds(maxPerCategory = 6): Promise<RawArticle[]> {
  console.log(`[fetchFeeds] Fetching ${FEED_SOURCES.length} sources…`);

  // Fetch in parallel, max 8 concurrent
  const CONCURRENCY = 8;
  const results: RawArticle[] = [];
  const sources = [...FEED_SOURCES];

  while (sources.length) {
    const batch = sources.splice(0, CONCURRENCY);
    const batchResults = await Promise.allSettled(batch.map(fetchSource));
    for (const r of batchResults) {
      if (r.status === "fulfilled") results.push(...r.value);
    }
  }

  // Deduplicate by title similarity (simple substring check)
  const seen = new Set<string>();
  const deduped = results.filter((a) => {
    const key = a.title.toLowerCase().replace(/\s+/g, " ").slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return a.title.length > 5;
  });

  // Cap per category so no single category dominates
  const countByCategory: Record<string, number> = {};
  const capped = deduped.filter((a) => {
    countByCategory[a.category] = (countByCategory[a.category] ?? 0) + 1;
    return countByCategory[a.category] <= maxPerCategory;
  });

  console.log(`[fetchFeeds] Got ${results.length} raw → ${deduped.length} deduped → ${capped.length} capped`);
  return capped;
}
