// ─────────────────────────────────────────────────────────────
//  Feed Routes — /api/feed endpoints
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import Parser from "rss-parser";
import type { FeedCategory } from "../jobs/feedSources.js";

const ytParser = new Parser({ timeout: 8_000, headers: { "User-Agent": "VarandaaTalkies/1.0" } });
const YT_CHANNEL_ID = "UCLVrk2qH3kZ7UtO7Q_HKbrg";
const YT_RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`;
import {
  getAllArticles,
  getArticlesByCategory,
  getLatestArticles,
  getTickerItems,
  getFeedMeta,
} from "../storage/feedStore.js";
import { runFeedPipeline } from "../jobs/scheduler.js";

const router = Router();

// GET /api/feed — all articles (latest snapshot)
router.get("/", (_req, res) => {
  const { updatedAt, total } = getFeedMeta();
  const articles = getAllArticles(60);
  res.json({ updatedAt, total, articles });
});

// GET /api/feed/latest — top 10 most recent articles
router.get("/latest", (_req, res) => {
  res.json({ articles: getLatestArticles(10) });
});

// GET /api/feed/ticker — short headline strings for ticker bar
router.get("/ticker", (_req, res) => {
  const items = getTickerItems();
  // Fall back to hardcoded items if store is empty
  const fallback = [
    "H-1B 2027 లాటరీ: USCIS April 1 నుండి నమోదు ప్రారంభం",
    "Aha OTT: 3 కొత్త Telugu originals ఈ వారం",
    "తెలంగాణ CM నూతన సంక్షేమ పథకాలు ప్రకటించారు",
    "Prabhas New Project: ₹400 Crore confirmed",
  ];
  res.json({ items: items.length > 0 ? items : fallback });
});

// GET /api/feed/meta — snapshot metadata
router.get("/meta", (_req, res) => {
  res.json(getFeedMeta());
});

// GET /api/feed/youtube — latest 2 videos from Varandaa Talkies channel (live, no cache)
router.get("/youtube", async (_req, res) => {
  try {
    const feed = await ytParser.parseURL(YT_RSS);
    const videos = (feed.items ?? []).slice(0, 2).map((item) => {
      const link = item.link ?? item.guid ?? "";
      const videoId = link.match(/[?&]v=([^&]+)/)?.[1] ?? link.match(/shorts\/([^?&/]+)/)?.[1] ?? "";
      return {
        title: item.title?.trim() ?? "",
        link,
        videoId,
        thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "",
        publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
      };
    });
    res.json({ videos });
  } catch (err) {
    res.json({ videos: [], error: (err as Error).message });
  }
});

// GET /api/feed/:category — articles filtered by category
router.get("/:category", (req, res) => {
  const category = req.params.category as FeedCategory;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  const articles = getArticlesByCategory(category, limit);
  res.json({ category, count: articles.length, articles });
});

// GET|POST /api/feed/refresh — trigger pipeline; protected by CRON_SECRET if set
router.all("/refresh", async (req, res) => {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // Synchronous — wait for pipeline so in-memory cache is updated before responding
  await runFeedPipeline();
  const meta = getFeedMeta();
  return res.json({ ok: true, total: meta.total, updatedAt: meta.updatedAt });
});

export default router;
