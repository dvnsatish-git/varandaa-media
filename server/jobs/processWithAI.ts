// ─────────────────────────────────────────────────────────────
//  AI Processor — translate, summarize & score via OpenAI API
// ─────────────────────────────────────────────────────────────
import OpenAI from "openai";
import type { RawArticle } from "./fetchFeeds.js";

const client = new OpenAI();

export interface ProcessedArticle extends RawArticle {
  titleTe: string;        // Telugu translated title
  summaryTe: string;      // Telugu summary (2 sentences)
  summaryEn: string;      // English summary (2 sentences, cleaned)
  relevanceScore: number; // 1–10: how relevant to Telugu audience
  tags: string[];         // e.g. ["Hyderabad", "YCP", "OTT"]
  processedAt: string;
}

// Process a batch of up to 20 articles in one OpenAI call
async function processBatch(articles: RawArticle[]): Promise<ProcessedArticle[]> {
  if (articles.length === 0) return [];

  const prompt = `You are a bilingual Telugu-English news editor for a Telugu audience portal called "Varandaa Talkies".

For each article below, return a JSON array with one object per article in the same order.
Each object must have exactly these keys:
- titleTe: Telugu translation of the title (use proper Telugu script)
- summaryEn: Clean 1–2 sentence English summary (remove fluff, keep facts)
- summaryTe: Telugu translation of summaryEn (2 sentences, natural Telugu)
- relevanceScore: integer 1–10 (10 = highly relevant to Telugu-speaking audience in India/USA)
- tags: array of 2–5 short keyword tags (people, places, topics)

Articles:
${articles
  .map(
    (a, i) => `[${i}] title: ${a.title}
category: ${a.category}
source: ${a.sourceName}
snippet: ${a.summary || "(no snippet)"}
`
  )
  .join("\n")}

Return ONLY a valid JSON array — no markdown, no explanation.`;

  try {
    // ~200 tokens per article for titleTe + summaryEn + summaryTe + score + tags
    const maxTokens = Math.min(4096, Math.max(1024, articles.length * 200));
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content?.trim() ?? "";
    // Strip markdown code fences if present
    const json = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
    const parsed: Array<{
      titleTe: string;
      summaryEn: string;
      summaryTe: string;
      relevanceScore: number;
      tags: string[];
    }> = JSON.parse(json);

    return articles.map((article, i) => ({
      ...article,
      titleTe: parsed[i]?.titleTe ?? article.title,
      summaryEn: parsed[i]?.summaryEn ?? article.summary,
      summaryTe: parsed[i]?.summaryTe ?? "",
      relevanceScore: parsed[i]?.relevanceScore ?? 5,
      tags: parsed[i]?.tags ?? [],
      processedAt: new Date().toISOString(),
    }));
  } catch (err) {
    console.warn(`[processWithAI] Batch failed: ${(err as Error).message}`);
    // Return articles with defaults so the pipeline doesn't stall
    return articles.map((article) => ({
      ...article,
      titleTe: article.title,
      summaryEn: article.summary,
      summaryTe: "",
      relevanceScore: 5,
      tags: [],
      processedAt: new Date().toISOString(),
    }));
  }
}

// Process all raw articles — all batches run in parallel for speed
export async function processArticlesWithAI(
  articles: RawArticle[],
  batchSize = 20
): Promise<ProcessedArticle[]> {
  console.log(`[processWithAI] Processing ${articles.length} articles in parallel batches of ${batchSize}`);
  const batches: RawArticle[][] = [];
  for (let i = 0; i < articles.length; i += batchSize) {
    batches.push(articles.slice(i, i + batchSize));
  }
  console.log(`[processWithAI] Running ${batches.length} batches concurrently`);

  const batchResults = await Promise.all(batches.map((b, idx) => {
    console.log(`[processWithAI] Starting batch ${idx + 1}/${batches.length} (${b.length} articles)`);
    return processBatch(b);
  }));
  const results = batchResults.flat();

  // Sort: most recent first, with relevance as tiebreaker
  results.sort((a, b) => {
    const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.relevanceScore - a.relevanceScore;
  });

  console.log(`[processWithAI] Done — ${results.length} articles processed`);
  return results;
}
