// ─────────────────────────────────────────────────────────────
//  Article Reader — proxy Jina AI to extract full article text
// ─────────────────────────────────────────────────────────────
import { Router } from "express";

const router = Router();

// Simple in-memory cache so the same article isn't re-fetched per session
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

  // Return cached content if fresh
  const cached = articleCache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.json({ content: cached.content });
  }

  try {
    // Jina AI Reader: returns clean markdown of the article
    const jinaUrl = `https://r.jina.ai/${url}`;
    const resp = await fetch(jinaUrl, {
      headers: {
        "Accept": "text/markdown,text/plain,*/*",
        "X-Return-Format": "markdown",
        "User-Agent": "VarandaaMedia/1.0",
        ...(process.env.JINA_API_KEY
          ? { Authorization: `Bearer ${process.env.JINA_API_KEY}` }
          : {}),
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!resp.ok) {
      return res.status(resp.status).json({ error: `Jina returned ${resp.status}` });
    }

    const raw_text = await resp.text();

    // Strip Jina metadata header (Title: / URL: / Published: lines at top)
    const content = raw_text
      .replace(/^(Title|URL|Published Time|Description|Author):[^\n]*\n/gim, "")
      .replace(/^={3,}\s*\n/gm, "")
      .trim();

    articleCache.set(url, { content, ts: Date.now() });
    return res.json({ content });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
