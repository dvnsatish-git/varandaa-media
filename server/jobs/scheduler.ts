// ─────────────────────────────────────────────────────────────
//  Scheduler — run feed pipeline at 8 AM IST + 7 PM IST
//  (= 2:30 AM UTC + 1:30 PM UTC)
// ─────────────────────────────────────────────────────────────
import cron from "node-cron";
import { fetchAllFeeds } from "./fetchFeeds.js";
import { processArticlesWithAI } from "./processWithAI.js";
import { updateFeed } from "../storage/feedStore.js";

let isRunning = false;

export async function runFeedPipeline(): Promise<void> {
  if (isRunning) {
    console.log("[scheduler] Pipeline already running — skipping");
    return;
  }
  isRunning = true;
  const start = Date.now();
  console.log(`[scheduler] ── Feed pipeline started at ${new Date().toISOString()} ──`);

  // On Vercel (60s limit): cap at 4 per category → ~32 articles → 2 OpenAI batches ~25s total
  // Locally (no limit): 8 per category → 64 articles → full quality run
  const perCategory = process.env.VERCEL ? 4 : 8;
  const batchSize = process.env.VERCEL ? 32 : 20;

  try {
    const raw = await fetchAllFeeds(perCategory);
    const processed = await processArticlesWithAI(raw, batchSize);
    await updateFeed(processed);
    console.log(`[scheduler] ── Pipeline done in ${((Date.now() - start) / 1000).toFixed(1)}s ──`);
  } catch (err) {
    console.error(`[scheduler] Pipeline error: ${(err as Error).message}`);
  } finally {
    isRunning = false;
  }
}

export function startScheduler(): void {
  // 8 AM IST = 2:30 AM UTC
  cron.schedule("30 2 * * *", () => {
    console.log("[scheduler] Morning run (8 AM IST)");
    void runFeedPipeline();
  }, { timezone: "UTC" });

  // 7 PM IST = 1:30 PM UTC
  cron.schedule("30 13 * * *", () => {
    console.log("[scheduler] Evening run (7 PM IST)");
    void runFeedPipeline();
  }, { timezone: "UTC" });

  console.log("[scheduler] Cron jobs registered: 2:30 AM UTC + 1:30 PM UTC");
}
