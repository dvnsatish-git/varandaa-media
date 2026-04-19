// Vercel serverless entry point — wraps Express app
import express from "express";
import feedRouter from "../server/routes/feed.js";
import articleRouter from "../server/routes/article.js";
import voiceRouter from "../server/routes/voice.js";
import panchangRouter from "../server/routes/panchang.js";
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
app.use("/api/voice", voiceRouter);
app.use("/api/panchang", panchangRouter);

export default app;
