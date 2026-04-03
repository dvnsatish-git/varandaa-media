// Vercel serverless entry point — wraps Express app
import express from "express";
import feedRouter from "../server/routes/feed.js";
import articleRouter from "../server/routes/article.js";
import { loadFromDisk, getFeedMeta } from "../server/storage/feedStore.js";

const app = express();
app.use(express.json());

// Load persisted feed on cold start
let initialized = false;
app.use(async (_req, _res, next) => {
  if (!initialized) {
    initialized = true;
    await loadFromDisk();
  }
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Varandaa Media API", ...getFeedMeta() });
});

app.use("/api/feed", feedRouter);
app.use("/api/article", articleRouter);

export default app;
