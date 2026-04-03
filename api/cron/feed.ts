// Vercel Cron handler — single-phase, tuned to fit within 60s Hobby limit
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchAllFeeds } from "../../server/jobs/fetchFeeds.js";
import { processArticlesWithAI } from "../../server/jobs/processWithAI.js";
import { updateFeed, loadFromDisk, getFeedMeta } from "../../server/storage/feedStore.js";

export const maxDuration = 60;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await loadFromDisk();

  // Fetch: all sources in parallel, 5s timeout, max 3 per category → ~15 articles
  // AI:    single OpenAI call for all articles, 2048 tokens → ~10-15s
  // Total target: ~30s
  const raw = await fetchAllFeeds(3);
  const processed = await processArticlesWithAI(raw, raw.length); // single batch
  await updateFeed(processed);

  const meta = getFeedMeta();
  return res.json({ ok: true, total: meta.total, updatedAt: meta.updatedAt });
}
