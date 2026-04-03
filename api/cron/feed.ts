// Vercel Cron handler — triggered at 8 AM IST + 7 PM IST
// Vercel calls this endpoint on schedule defined in vercel.json
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runFeedPipeline } from "../../server/jobs/scheduler.js";
import { loadFromDisk } from "../../server/storage/feedStore.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel automatically verifies cron requests with CRON_SECRET
  // Manual calls are also allowed for testing
  if (
    req.method !== "GET" ||
    (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}` &&
      process.env.NODE_ENV === "production")
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await loadFromDisk();
  await runFeedPipeline();
  return res.json({ ok: true, ran: new Date().toISOString() });
}
