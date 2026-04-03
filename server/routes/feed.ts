// ─────────────────────────────────────────────────────────────
//  Feed Routes — /api/feed endpoints
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import type { FeedCategory } from "../jobs/feedSources.js";
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

// GET /api/feed/:category — articles filtered by category
router.get("/:category", (req, res) => {
  const category = req.params.category as FeedCategory;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  const articles = getArticlesByCategory(category, limit);
  res.json({ category, count: articles.length, articles });
});

// POST /api/feed/refresh — manually trigger the pipeline (dev/admin use)
router.post("/refresh", async (_req, res) => {
  res.json({ message: "Feed refresh started" });
  await runFeedPipeline();
});

export default router;
