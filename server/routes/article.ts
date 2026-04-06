// ─────────────────────────────────────────────────────────────
//  Article Reader — proxy Jina AI to extract full article text
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import { getArticleByLink } from "../storage/feedStore.js";

const router = Router();

// In-memory cache: url → { markdown, ts }
const articleCache = new Map<string, { content: string; ts: number }>();
const CACHE_TTL = 3_600_000; // 1 hour

// Jina fetch timeout — must be well under the Vercel maxDuration (45s)
const JINA_TIMEOUT_MS = 25_000;

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

  // Return cached content if still fresh
  const cached = articleCache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.json({ content: cached.content });
  }

  // Use the pre-resolved real URL from the feed store when available.
  // realLink is set during the GitHub Actions pipeline run for direct-feed articles.
  // For Google News articles realLink == link, so we skip those (Jina blocks them).
  const stored = getArticleByLink(url);
  const jinaTarget =
    stored?.realLink && !stored.realLink.includes("news.google.com")
      ? stored.realLink
      : url;

  if (jinaTarget.includes("news.google.com")) {
    return res.status(422).json({
      error: "This article is from a news aggregator — use 'Open Source ↗' to read it on the original site.",
    });
  }

  try {
    const jinaUrl = `https://r.jina.ai/${jinaTarget}`;
    const resp = await fetch(jinaUrl, {
      headers: {
        Accept: "text/markdown,text/plain,*/*",
        "X-Return-Format": "markdown",
        "User-Agent": "VarandaaMedia/1.0",
        ...(process.env.JINA_API_KEY
          ? { Authorization: `Bearer ${process.env.JINA_API_KEY}` }
          : {}),
      },
      signal: AbortSignal.timeout(JINA_TIMEOUT_MS),
    });

    if (!resp.ok) {
      const msg =
        resp.status === 451
          ? "Article not available in your region."
          : resp.status === 403
          ? "Article is behind a paywall."
          : `Could not fetch article (${resp.status}).`;
      return res.status(resp.status).json({ error: msg });
    }

    const raw_text = await resp.text();

    // Strip Jina metadata header lines
    const content = raw_text
      .replace(/^(Title|URL|Published Time|Description|Author|Source):[^\n]*\n/gim, "")
      .replace(/^={3,}\s*\n/gm, "")
      .trim();

    articleCache.set(url, { content, ts: Date.now() });
    return res.json({ content });
  } catch (err) {
    const isTimeout = (err as Error).name === "TimeoutError" || (err as Error).name === "AbortError";
    return res.status(504).json({
      error: isTimeout
        ? "Article took too long to load. Try 'Open Source ↗' to read it directly."
        : (err as Error).message,
    });
  }
});

export default router;
