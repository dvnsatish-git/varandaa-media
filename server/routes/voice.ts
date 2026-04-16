// ─────────────────────────────────────────────────────────────
//  Voice Route — Deepgram STT, live search, D-ID avatar
//  Security: all API keys server-side; IP rate limiting applied
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import type { Request, Response } from "express";
import Parser from "rss-parser";
import { getAllArticles } from "../storage/feedStore.js";

const router = Router();
const rssParser = new Parser({ timeout: 8_000, headers: { "User-Agent": "VarandaaMedia/1.0" } });

// ── IP Rate Limiter ────────────────────────────────────────────
const rlMap = new Map<string, { count: number; resetAt: number }>();
const RL_MAX    = 30;
const RL_WINDOW = 3_600_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rlMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rlMap.set(ip, { count: 1, resetAt: now + RL_WINDOW });
    return true;
  }
  if (entry.count >= RL_MAX) return false;
  entry.count++;
  return true;
}

function sanitizeQuery(raw: string): string {
  return raw.replace(/<[^>]*>/g, "").replace(/[\x00-\x1F\x7F]/g, " ").trim().slice(0, 300);
}

// Default D-ID presenter images — must be direct HTTPS URLs (no redirects).
// Unsplash URLs redirect through CDN which D-ID rejects.
// Using D-ID's own public sample images which are pre-approved and always work.
// Override with env vars: DID_PRESENTER_FEMALE_URL / DID_PRESENTER_MALE_URL
const DEFAULT_FEMALE_URL =
  process.env.DID_PRESENTER_FEMALE_URL ||
  "https://d-id-public-bucket.s3.amazonaws.com/alice.jpg";
const DEFAULT_MALE_URL =
  process.env.DID_PRESENTER_MALE_URL ||
  "https://d-id-public-bucket.s3.amazonaws.com/or-roman.jpg";

// D-ID API key format from dashboard: base64(email):key_hash
// This is already the Basic auth credential — do NOT re-encode it
function didAuthHeader(apiKey: string) {
  return `Basic ${apiKey}`;
}

// ── GET /api/voice/config ──────────────────────────────────────
router.get("/config", (_req: Request, res: Response) => {
  res.json({
    wisprflowEnabled: !!process.env.DEEPGRAM_API_KEY,
    avatarEnabled:    !!process.env.DID_API_KEY,
    freeTrial: 3,
  });
});

// ── POST /api/voice/search ─────────────────────────────────────
// Cached-only search (kept for backward compat)
router.post("/search", (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket?.remoteAddress ?? "unknown";
  if (!checkRateLimit(ip)) return res.status(429).json({ error: "Too many requests." });

  const rawQuery = (req.body as { query?: unknown }).query;
  if (typeof rawQuery !== "string" || rawQuery.trim().length < 2)
    return res.status(400).json({ error: "Invalid query." });

  const q = sanitizeQuery(rawQuery).toLowerCase();
  const terms = q.split(/\s+/).filter((t) => t.length > 2);
  if (!terms.length) return res.status(400).json({ error: "Query too short." });

  const results = scoreArticles(getAllArticles(100), terms).slice(0, 5);
  return res.json({ results, query: q });
});

// ── POST /api/voice/livesearch ─────────────────────────────────
// OpenAI query expansion → Google News RSS + cached articles merged
router.post("/livesearch", async (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket?.remoteAddress ?? "unknown";
  if (!checkRateLimit(ip)) return res.status(429).json({ error: "Too many requests." });

  const rawQuery = (req.body as { query?: unknown }).query;
  if (typeof rawQuery !== "string" || rawQuery.trim().length < 2)
    return res.status(400).json({ error: "Invalid query." });

  const q = sanitizeQuery(rawQuery).toLowerCase();

  // 1. Expand query with OpenAI for much better search accuracy
  const [expandedTerms, rssQuery] = await expandQuery(q);

  // 2. Run live RSS fetch and cached search in parallel
  const [liveResult, cachedResult] = await Promise.allSettled([
    fetchGoogleNewsRSS(rssQuery),
    Promise.resolve(scoreArticles(getAllArticles(100), expandedTerms).slice(0, 5)),
  ]);

  const live   = liveResult.status   === "fulfilled" ? liveResult.value   : [];
  const cached = cachedResult.status === "fulfilled" ? cachedResult.value : [];

  // 3. Merge: live first, then cached; deduplicate by normalised title
  const seen = new Set<string>();
  const merged = [...live, ...cached].filter((r) => {
    const key = r.title.toLowerCase().replace(/\W+/g, " ").trim().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return res.json({ results: merged.slice(0, 8), query: q, liveCount: live.length });
});

// ── POST /api/voice/transcribe ─────────────────────────────────
router.post("/transcribe", async (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket?.remoteAddress ?? "unknown";
  if (!checkRateLimit(ip)) return res.status(429).json({ error: "Too many requests." });

  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Voice transcription not configured." });

  const ct = req.headers["content-type"] ?? "";
  if (!ct.startsWith("audio/") && !ct.startsWith("multipart/"))
    return res.status(415).json({ error: "Expected audio content." });

  try {
    const upstream = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-3&language=en-IN&smart_format=true&punctuate=true",
      {
        method: "POST",
        headers: { "Authorization": `Token ${apiKey}`, "Content-Type": ct },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: req as any,
        // @ts-expect-error node-fetch duplex requirement
        duplex: "half",
        signal: AbortSignal.timeout(20_000),
      }
    );
    if (!upstream.ok) return res.status(502).json({ error: "Transcription service error." });
    const data = await upstream.json() as {
      results?: { channels?: { alternatives?: { transcript?: string }[] }[] };
    };
    const transcript = data.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? "";
    return res.json({ transcript });
  } catch (err) {
    const e = err as Error;
    return res.status(e.name === "TimeoutError" ? 504 : 500).json({ error: "Transcription failed." });
  }
});

// ── POST /api/voice/avatar ─────────────────────────────────────
// Creates a D-ID talking video of a presenter reading the text
// Body: { text: string, gender?: "female"|"male", customImageUrl?: string }
router.post("/avatar", async (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket?.remoteAddress ?? "unknown";
  if (!checkRateLimit(ip)) return res.status(429).json({ error: "Too many requests." });

  const apiKey = process.env.DID_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Avatar service not configured." });

  const { text, gender, customImageUrl } = req.body as {
    text?: string;
    gender?: "female" | "male";
    customImageUrl?: string;
  };

  if (!text || typeof text !== "string" || text.trim().length < 3)
    return res.status(400).json({ error: "Text is required." });

  // Sanitize inputs
  const speakText  = sanitizeQuery(text).slice(0, 600);
  let presenterUrl = gender === "male" ? DEFAULT_MALE_URL : DEFAULT_FEMALE_URL;

  // Allow custom photo URL (must be https, not a data URI)
  if (customImageUrl && typeof customImageUrl === "string") {
    try {
      const u = new URL(customImageUrl);
      if (u.protocol === "https:") presenterUrl = customImageUrl;
    } catch { /* invalid URL — ignore */ }
  }

  try {
    const resp = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": didAuthHeader(apiKey),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: presenterUrl,
        script: {
          type: "text",
          input: speakText,
          provider: {
            type: "microsoft",
            voice_id: gender === "male" ? "en-IN-PrabhatNeural" : "en-IN-NeerjaNeural",
          },
        },
        config: { fluent: true, stitch: true },
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!resp.ok) {
      const errBody = await resp.text().catch(() => "");
      console.error("[avatar] D-ID error", resp.status, errBody);
      // Return the actual D-ID error for easier diagnosis
      return res.status(502).json({ error: "Avatar service error.", didStatus: resp.status, didError: errBody });
    }

    const talk = await resp.json() as { id?: string; status?: string };
    return res.json({ talkId: talk.id });
  } catch (err) {
    const e = err as Error;
    console.error("[avatar] create error:", e.message);
    return res.status(500).json({ error: "Avatar creation failed." });
  }
});

// ── GET /api/voice/avatar/:id ──────────────────────────────────
// Poll D-ID for video completion
router.get("/avatar/:id", async (req: Request, res: Response) => {
  const apiKey = process.env.DID_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Avatar service not configured." });

  // Validate ID: alphanumeric + hyphens/underscores only
  const { id } = req.params;
  if (!/^[\w-]{1,80}$/.test(id)) return res.status(400).json({ error: "Invalid talk ID." });

  try {
    const resp = await fetch(`https://api.d-id.com/talks/${encodeURIComponent(id)}`, {
      headers: { "Authorization": didAuthHeader(apiKey) },
      signal: AbortSignal.timeout(10_000),
    });
    if (!resp.ok) return res.status(502).json({ error: "Could not check avatar status." });

    const data = await resp.json() as { status?: string; result_url?: string };
    return res.json({ status: data.status, videoUrl: data.result_url ?? null });
  } catch {
    return res.status(500).json({ error: "Status check failed." });
  }
});

// ── Helpers ────────────────────────────────────────────────────

interface VoiceResult {
  title: string;
  titleTe?: string;
  summaryEn?: string;
  summaryTe?: string;
  category?: string;
  link?: string;
  realLink?: string;
  image?: string;
  sourceName?: string;
  publishedAt?: string;
  tags?: string[];
  isLive?: boolean;
}

function scoreArticles(
  articles: ReturnType<typeof getAllArticles>,
  terms: string[]
): VoiceResult[] {
  return articles
    .map((a) => {
      const haystack = [a.title, a.titleTe, a.summaryEn, a.summaryTe, a.category, ...(a.tags ?? [])]
        .filter(Boolean).join(" ").toLowerCase();
      const score = terms.reduce((s, t) => s + (haystack.includes(t) ? 1 : 0), 0);
      return { a, score };
    })
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score)
    .map(({ a }) => ({
      title: a.title, titleTe: a.titleTe, summaryEn: a.summaryEn,
      summaryTe: a.summaryTe, category: a.category, link: a.link,
      realLink: a.realLink, image: a.image, sourceName: a.sourceName,
      publishedAt: a.publishedAt, tags: a.tags,
    }));
}

// ── OpenAI query expander ──────────────────────────────────────
// Turns a casual voice query like "tell me about IPL today" into
// specific search terms ["ipl", "cricket", "srh", "match", "score"]
// and a clean RSS search string "IPL 2026 cricket telugu"
async function expandQuery(query: string): Promise<[string[], string]> {
  const apiKey = process.env.OPENAI_API_KEY;
  const fallbackTerms = query.split(/\s+/).filter((t) => t.length > 1);

  if (!apiKey) return [fallbackTerms, `${query} telugu`];

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{
          role: "system",
          content: "You are a Telugu news search assistant. Extract precise search terms from voice queries.",
        }, {
          role: "user",
          content: `Voice query from a Telugu news app user: "${query}"

Return a JSON object with:
- "terms": array of 6-10 specific lowercase keywords (include abbreviations, Telugu transliterations, related terms)
- "rssQuery": a concise 3-5 word English search string for Google News RSS

Examples:
- "tell me about IPL match today" → {"terms":["ipl","cricket","match","score","today","srh","mi","rcb","bcci"],"rssQuery":"IPL 2026 cricket match"}
- "prabhas new movie" → {"terms":["prabhas","movie","film","tollywood","telugu","project","release","actor"],"rssQuery":"Prabhas new Telugu film 2026"}
- "H-1B visa news" → {"terms":["h-1b","visa","uscis","immigration","h1b","work","america","telugu"],"rssQuery":"H-1B visa 2026 news"}

Return ONLY valid JSON, no markdown.`,
        }],
        max_tokens: 150,
        temperature: 0,
      }),
      signal: AbortSignal.timeout(5_000),
    });

    if (!resp.ok) return [fallbackTerms, `${query} telugu`];

    const data = await resp.json() as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content) as { terms?: string[]; rssQuery?: string };
    const terms    = Array.isArray(parsed.terms) ? parsed.terms.map(String) : fallbackTerms;
    const rssQuery = typeof parsed.rssQuery === "string" ? parsed.rssQuery : `${query} telugu`;
    return [terms, rssQuery];
  } catch {
    return [fallbackTerms, `${query} telugu`];
  }
}

async function fetchGoogleNewsRSS(query: string): Promise<VoiceResult[]> {
  const encoded = encodeURIComponent(`${query} telugu`);
  const url = `https://news.google.com/rss/search?q=${encoded}&hl=en-IN&gl=IN&ceid=IN:en`;
  const feed = await rssParser.parseURL(url);
  return feed.items.slice(0, 6).map((item) => ({
    title:      item.title ?? "",
    summaryEn:  item.contentSnippet ?? item.summary ?? "",
    category:   "general",
    link:       item.link ?? "",
    realLink:   item.link ?? "",
    sourceName: (item.creator as string | undefined) ?? "Google News",
    publishedAt: item.isoDate ?? new Date().toISOString(),
    tags:       [],
    isLive:     true,
  }));
}

export default router;
