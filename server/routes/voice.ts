// ─────────────────────────────────────────────────────────────
//  Voice Route — wisprflow.ai speech-to-text + article search
//  Security: API key stays server-side; IP rate limiting applied
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import type { Request, Response } from "express";
import { getAllArticles } from "../storage/feedStore.js";

const router = Router();

// ── IP Rate Limiter ────────────────────────────────────────────
// 20 voice requests per IP per hour (guards against abuse)
const rlMap = new Map<string, { count: number; resetAt: number }>();
const RL_MAX    = 20;
const RL_WINDOW = 3_600_000; // 1 hour

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

// Sanitize: strip HTML tags, control chars, limit length
function sanitizeQuery(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x1F\x7F]/g, " ")
    .trim()
    .slice(0, 300);
}

// ── GET /api/voice/config ──────────────────────────────────────
// Lets the client know if wisprflow is available server-side
router.get("/config", (_req: Request, res: Response) => {
  res.json({
    wisprflowEnabled: !!process.env.DEEPGRAM_API_KEY,  // field name kept for client compat
    freeTrial: 3,
  });
});

// ── POST /api/voice/search ─────────────────────────────────────
// Accepts transcribed text, returns matching articles (max 5)
router.post("/search", (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket?.remoteAddress ?? "unknown";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const rawQuery = (req.body as { query?: unknown }).query;
  if (typeof rawQuery !== "string" || rawQuery.trim().length < 2) {
    return res.status(400).json({ error: "Invalid query." });
  }

  const q = sanitizeQuery(rawQuery).toLowerCase();
  const terms = q.split(/\s+/).filter((t) => t.length > 2);

  if (terms.length === 0) {
    return res.status(400).json({ error: "Query too short." });
  }

  const articles = getAllArticles(100);

  const scored = articles
    .map((a) => {
      const haystack = [
        a.title,
        a.titleTe,
        a.summaryEn,
        a.summaryTe,
        a.category,
        ...(a.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const score = terms.reduce((s, t) => s + (haystack.includes(t) ? 1 : 0), 0);
      return { a, score };
    })
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, 5)
    .map(({ a }) => ({
      title:     a.title,
      titleTe:   a.titleTe,
      summaryEn: a.summaryEn,
      summaryTe: a.summaryTe,
      category:  a.category,
      link:      a.link,
      realLink:  a.realLink,
      image:     a.image,
      sourceName: a.sourceName,
      publishedAt: a.publishedAt,
      tags:      a.tags,
    }));

  return res.json({ results: scored, query: q });
});

// ── POST /api/voice/transcribe ─────────────────────────────────
// Proxies raw audio (webm/ogg) to Deepgram REST API
// API key never leaves the server
router.post("/transcribe", async (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket?.remoteAddress ?? "unknown";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests." });
  }

  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Voice transcription not configured." });
  }

  // Validate content-type: only accept audio
  const ct = req.headers["content-type"] ?? "";
  if (!ct.startsWith("audio/") && !ct.startsWith("multipart/")) {
    return res.status(415).json({ error: "Expected audio content." });
  }

  try {
    // ── Deepgram REST API ──────────────────────────────────────
    // Docs: https://developers.deepgram.com/reference/listen-file
    // nova-3: best accuracy; en-IN handles Indian English + Telugu code-switching
    const upstream = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-3&language=en-IN&smart_format=true&punctuate=true",
      {
        method: "POST",
        headers: {
          "Authorization": `Token ${apiKey}`,
          "Content-Type": ct,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: req as any,              // Readable stream passthrough
        // @ts-expect-error node-fetch duplex requirement
        duplex: "half",
        signal: AbortSignal.timeout(20_000),
      }
    );

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      console.error("[voice] deepgram error", upstream.status, errText);
      return res.status(502).json({ error: "Transcription service error." });
    }

    const data = await upstream.json() as {
      results?: { channels?: { alternatives?: { transcript?: string }[] }[] };
    };
    const transcript =
      data.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? "";
    return res.json({ transcript });
  } catch (err) {
    const e = err as Error;
    if (e.name === "TimeoutError" || e.name === "AbortError") {
      return res.status(504).json({ error: "Transcription timed out." });
    }
    console.error("[voice] transcribe error:", e.message);
    return res.status(500).json({ error: "Transcription failed." });
  }
});

export default router;
