// ─────────────────────────────────────────────────────────────
//  Article Reader — proxy Jina AI to extract full article text
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import { getArticleByLink } from "../storage/feedStore.js";

const router = Router();

// In-memory cache: url → { markdown, ts }
const articleCache = new Map<string, { content: string; ts: number }>();
const CACHE_TTL = 3_600_000; // 1 hour

// GET /api/article?url=<encoded_url>
router.get("/", async (req, res) => {
  const raw = req.query.url as string;
  if (!raw) return res.status(400).json({ error: "Missing url param" });

  let url: string;
  try {
    url = decodeURIComponent(raw);
    new URL(url); // validate
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // Check in-memory cache first
  const cached = articleCache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.json({ content: cached.content });
  }

  // Look up article in feed store to get the resolved real URL
  // (realLink was set during the GitHub Actions pipeline run)
  const stored = getArticleByLink(url);
  const jinaTarget = stored?.realLink && !stored.realLink.includes("news.google.com")
    ? stored.realLink
    : url;

  // If jinaTarget is still a Google News URL, try to resolve it live
  let resolvedTarget = jinaTarget;
  if (resolvedTarget.includes("news.google.com")) {
    resolvedTarget = await resolveGNewsLive(resolvedTarget);
  }

  try {
    const jinaUrl = `https://r.jina.ai/${resolvedTarget}`;
    const resp = await fetch(jinaUrl, {
      headers: {
        Accept: "text/markdown,text/plain,*/*",
        "X-Return-Format": "markdown",
        "User-Agent": "VarandaaMedia/1.0",
        ...(process.env.JINA_API_KEY
          ? { Authorization: `Bearer ${process.env.JINA_API_KEY}` }
          : {}),
      },
      signal: AbortSignal.timeout(20_000),
    });

    if (!resp.ok) {
      return res.status(resp.status).json({ error: `Could not fetch article (${resp.status})` });
    }

    const raw_text = await resp.text();

    // Strip Jina metadata header lines (Title:, URL:, Published Time:, etc.)
    const content = raw_text
      .replace(/^(Title|URL|Published Time|Description|Author|Source):[^\n]*\n/gim, "")
      .replace(/^={3,}\s*\n/gm, "")
      .trim();

    articleCache.set(url, { content, ts: Date.now() });
    return res.json({ content });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

// Follow a Google News redirect live (fallback when realLink not stored)
async function resolveGNewsLive(url: string): Promise<string> {
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

export default router;
