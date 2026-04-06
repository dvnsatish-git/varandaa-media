import { useState, useEffect } from "react";

export interface Article {
  sourceId: string;
  sourceName: string;
  category: string;
  language: string;
  title: string;
  titleTe: string;
  link: string;
  realLink: string;  // resolved URL (direct publisher URL, or same as link for GNews)
  summary: string;
  summaryEn: string;
  summaryTe: string;
  image: string;
  publishedAt: string;
  relevanceScore: number;
  tags: string[];
  processedAt: string;
}

interface FeedResponse {
  updatedAt: string;
  total: number;
  articles: Article[];
}

interface CategoryResponse {
  category: string;
  count: number;
  articles: Article[];
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor(diff / 60_000);
  if (h >= 24) return `${Math.floor(h / 24)} రోజుల క్రితం`;
  if (h >= 1) return `${h} గంటల క్రితం`;
  if (m >= 1) return `${m} నిమిషాల క్రితం`;
  return "ఇప్పుడే";
}

export function useFeed(limit = 60) {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/feed?limit=${limit}`)
      .then((r) => r.json())
      .then((json: FeedResponse) => setData(json.articles ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [limit]);

  return { articles: data, loading };
}

export function useFeedCategory(category: string, limit = 20) {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/feed/${category}?limit=${limit}`)
      .then((r) => r.json())
      .then((json: CategoryResponse) => setData(json.articles ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [category, limit]);

  return { articles: data, loading };
}

export function useTicker() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/feed/ticker")
      .then((r) => r.json())
      .then((json: { items: string[] }) => {
        if (json.items?.length) setItems(json.items);
      })
      .catch(() => {});
  }, []);

  return items;
}

export { timeAgo };
