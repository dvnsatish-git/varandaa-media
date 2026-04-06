// ─────────────────────────────────────────────────────────────
//  Article Reader — fetch HTML and extract with Mozilla Readability
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import { parseHTML } from "linkedom";
import { Readability } from "@mozilla/readability";
import { getArticleByLink } from "../storage/feedStore.js";

const router = Router();

// In-memory cache: url → { content, ts }
const articleCache = new Map<string, { content: string; ts: number }>();
const CACHE_TTL = 3_600_000; // 1 hour

const FETCH_TIMEOUT_MS = 12_000;

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

  // Use the pre-resolved real URL from the feed store when available
  const stored = getArticleByLink(url);
  const target =
    stored?.realLink && !stored.realLink.includes("news.google.com")
      ? stored.realLink
      : url;

  if (target.includes("news.google.com")) {
    return res.status(422).json({
      error: "This article is from a news aggregator — use 'Open Source ↗' to read it on the original site.",
    });
  }

  try {
    const resp = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VarandaaMedia/1.0)",
        "Accept": "text/html,application/xhtml+xml,*/*",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      redirect: "follow",
    });

    if (!resp.ok) {
      const msg =
        resp.status === 451 ? "Article not available in your region." :
        resp.status === 403 ? "Article is behind a paywall or login wall." :
        resp.status === 404 ? "Article not found." :
        `Could not fetch article (${resp.status}).`;
      return res.status(resp.status).json({ error: msg });
    }

    const html = await resp.text();

    // Parse with Mozilla Readability (same engine as Firefox Reader Mode)
    const { document } = parseHTML(html);
    (document as unknown as { URL: string }).URL = target;
    const reader = new Readability(document as unknown as Document);
    const article = reader.parse();

    if (!article || !article.textContent?.trim()) {
      return res.status(422).json({
        error: "Could not extract article text. Try 'Open Source ↗' to read it directly.",
      });
    }

    // Convert the plain text content to simple paragraphs
    const content = article.textContent
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter((p) => p.length > 40)
      .join("\n\n");

    articleCache.set(url, { content, ts: Date.now() });
    return res.json({ content, title: article.title, byline: article.byline });
  } catch (err) {
    const e = err as Error;
    const isTimeout = e.name === "TimeoutError" || e.name === "AbortError";
    return res.status(504).json({
      error: isTimeout
        ? "Article took too long to load. Try 'Open Source ↗' to read it directly."
        : "Could not load article. Try 'Open Source ↗' to read it directly.",
    });
  }
});

export default router;
