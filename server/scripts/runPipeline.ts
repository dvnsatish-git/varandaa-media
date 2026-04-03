import { fetchAllFeeds } from "../jobs/fetchFeeds.js";
import { processArticlesWithAI } from "../jobs/processWithAI.js";
import { updateFeed, getFeedMeta } from "../storage/feedStore.js";

async function main() {
  console.log("Starting pipeline...");
  const raw = await fetchAllFeeds(8);
  console.log(`Fetched ${raw.length} raw articles`);
  const processed = await processArticlesWithAI(raw);
  await updateFeed(processed);
  const meta = getFeedMeta();
  console.log(`Done: ${meta.total} articles saved, updatedAt: ${meta.updatedAt}`);

  // Print sample
  const { getAllArticles } = await import("../storage/feedStore.js");
  const articles = getAllArticles(5);
  console.log("\nSample articles:");
  articles.forEach((a, i) => {
    console.log(`[${i + 1}] ${a.title}`);
    console.log(`     TE: ${a.titleTe}`);
    console.log(`     Category: ${a.category} | Score: ${a.relevanceScore}`);
    console.log(`     Tags: ${a.tags.join(", ")}`);
  });
}

main().catch(console.error);
