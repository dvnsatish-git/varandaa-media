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

  try {
    const raw = await fetchAllFeeds(8); // up to 8 per category
    const processed = await processArticlesWithAI(raw);
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
