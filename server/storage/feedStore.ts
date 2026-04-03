// ─────────────────────────────────────────────────────────────
//  Feed Store — in-memory cache with JSON file persistence
// ─────────────────────────────────────────────────────────────
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import type { ProcessedArticle } from "../jobs/processWithAI.js";
import type { FeedCategory } from "../jobs/feedSources.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// On Vercel: write to /tmp (writable), read seed from repo if /tmp is empty
const TMP_FILE = "/tmp/feed.json";
const SEED_FILE = path.join(__dirname, "../../data/feed.json");
const DATA_FILE = process.env.VERCEL ? TMP_FILE : SEED_FILE;

interface FeedSnapshot {
  updatedAt: string;
  articles: ProcessedArticle[];
}

let cache: FeedSnapshot = {
  updatedAt: "",
  articles: [],
};

// ── Persistence ────────────────────────────────────────────
async function ensureDataDir() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
}

export async function loadFromDisk(): Promise<void> {
  // On Vercel: try /tmp first (updated by cron), fall back to bundled seed
  const filesToTry = process.env.VERCEL ? [TMP_FILE, SEED_FILE] : [SEED_FILE];
  for (const file of filesToTry) {
    try {
      const raw = await fs.readFile(file, "utf-8");
      cache = JSON.parse(raw) as FeedSnapshot;
      console.log(`[feedStore] Loaded ${cache.articles.length} articles from ${file} (${cache.updatedAt})`);
      return;
    } catch {
      // try next
    }
  }
  console.log("[feedStore] No feed file found — starting fresh");
}

async function saveToDisk(): Promise<void> {
  try {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(cache, null, 2), "utf-8");
    console.log(`[feedStore] Saved ${cache.articles.length} articles to disk`);
  } catch (err) {
    console.error(`[feedStore] Failed to save: ${(err as Error).message}`);
  }
}

// ── Write ──────────────────────────────────────────────────
export async function updateFeed(articles: ProcessedArticle[]): Promise<void> {
  cache = {
    updatedAt: new Date().toISOString(),
    articles,
  };
  await saveToDisk();
}

// ── Read ───────────────────────────────────────────────────
export function getFeedMeta(): { updatedAt: string; total: number } {
  return { updatedAt: cache.updatedAt, total: cache.articles.length };
}

export function getAllArticles(limit = 60): ProcessedArticle[] {
  return cache.articles.slice(0, limit);
}

export function getArticlesByCategory(
  category: FeedCategory,
  limit = 20
): ProcessedArticle[] {
  return cache.articles.filter((a) => a.category === category).slice(0, limit);
}

export function getLatestArticles(limit = 10): ProcessedArticle[] {
  return [...cache.articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getTickerItems(): string[] {
  // Top 8 most relevant articles, short titles for the ticker
  return cache.articles
    .slice(0, 8)
    .map((a) => a.titleTe || a.title)
    .filter(Boolean);
}
