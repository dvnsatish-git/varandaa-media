import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import feedRouter from "./routes/feed.js";
import { loadFromDisk, getFeedMeta } from "./storage/feedStore.js";
import { startScheduler, runFeedPipeline } from "./jobs/scheduler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());

// API routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Varandaa Media API" });
});

// Feed routes (/api/feed, /api/feed/:category, /api/feed/latest, etc.)
app.use("/api/feed", feedRouter);

// Serve static files in production
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  const staticPath = path.join(__dirname, "../public");
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.listen(PORT, async () => {
  console.log(`Varandaa Media server running on port ${PORT}`);

  // Load persisted feed from disk
  await loadFromDisk();

  // Start cron scheduler (8 AM + 7 PM IST)
  startScheduler();

  // Run pipeline immediately on first boot if no cached data
  if (getFeedMeta().total === 0) {
    console.log("[boot] No cached feed — running initial pipeline…");
    void runFeedPipeline();
  }
});

export default app;
