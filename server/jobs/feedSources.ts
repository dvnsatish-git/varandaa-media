// ─────────────────────────────────────────────────────────────
//  Feed Sources — direct publisher RSS feeds (real URLs, no GNews redirect)
//  + targeted Google News searches where no direct feed exists
// ─────────────────────────────────────────────────────────────

export type FeedCategory =
  | "politics"
  | "entertainment"
  | "america"
  | "ott"
  | "spiritual"
  | "farmers"
  | "housewives"
  | "rights"
  | "traffic"
  | "achievements"
  | "weekend"
  | "general";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: FeedCategory;
  language: "te" | "en";
  priority: number; // 1 = highest
}

// Google News RSS helper (used only where no direct publisher feed exists)
const GN = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;

export const FEED_SOURCES: FeedSource[] = [
  // ── Politics / Telangana / AP — direct publisher feeds ────
  {
    id: "telangana-today",
    name: "Telangana Today",
    url: "https://telanganatoday.com/?feed=rss2",
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "hans-india",
    name: "The Hans India",
    url: "https://www.thehansindia.com/feed/",
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "deccan-chronicle",
    name: "Deccan Chronicle",
    url: "https://www.deccanchronicle.com/rss_feed.xml",
    category: "politics",
    language: "en",
    priority: 2,
  },
  {
    id: "hindustan-times",
    name: "Hindustan Times — India",
    url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
    category: "politics",
    language: "en",
    priority: 2,
  },
  {
    id: "india-today",
    name: "India Today",
    url: "https://www.indiatoday.in/rss/home",
    category: "politics",
    language: "en",
    priority: 2,
  },

  // ── Supplemental politics via GNews (AP/TG specific) ──────
  {
    id: "gn-ap-politics",
    name: "Google News — AP Politics",
    url: GN("Andhra Pradesh Chandrababu Naidu YCP TDP 2026"),
    category: "politics",
    language: "en",
    priority: 3,
  },
  {
    id: "gn-telangana",
    name: "Google News — Telangana",
    url: GN("Telangana Revanth Reddy government 2026"),
    category: "politics",
    language: "en",
    priority: 3,
  },

  // ── Entertainment / Tollywood — direct feeds ───────────────
  {
    id: "pinkvilla",
    name: "PinkVilla",
    url: "https://www.pinkvilla.com/rss",
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "bollywood-hungama",
    name: "Bollywood Hungama",
    url: "https://www.bollywoodhungama.com/rss/news/feed/",
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-tollywood",
    name: "Google News — Tollywood",
    url: GN("tollywood telugu movies Prabhas Allu Arjun 2026"),
    category: "entertainment",
    language: "en",
    priority: 3,
  },

  // ── OTT ───────────────────────────────────────────────────
  {
    id: "gn-ott-telugu",
    name: "Google News — Telugu OTT",
    url: GN("telugu OTT Netflix Aha Amazon Prime Disney 2026"),
    category: "ott",
    language: "en",
    priority: 2,
  },
  {
    id: "filmcompanion",
    name: "Film Companion",
    url: "https://www.filmcompanion.in/feed",
    category: "entertainment",
    language: "en",
    priority: 2,
  },

  // ── America / Telugu Diaspora ──────────────────────────────
  {
    id: "gn-h1b",
    name: "Google News — H-1B / US Immigration",
    url: GN("H1B visa USCIS immigration 2026 Indians"),
    category: "america",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telugu-usa",
    name: "Google News — Telugu America",
    url: GN("Telugu NRI community USA achievement 2026"),
    category: "america",
    language: "en",
    priority: 2,
  },

  // ── Spiritual / Cultural ───────────────────────────────────
  {
    id: "gn-temples",
    name: "Google News — Tirumala/Tirupati",
    url: GN("Tirumala Tirupati temple TTD 2026"),
    category: "spiritual",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-festivals",
    name: "Google News — Telugu Festivals",
    url: GN("Telugu festivals Ugadi puja 2026"),
    category: "spiritual",
    language: "en",
    priority: 2,
  },

  // ── Farmers / Agriculture ──────────────────────────────────
  {
    id: "gn-farmers-ap",
    name: "Google News — AP/TG Farmers",
    url: GN("Andhra Pradesh Telangana farmers agriculture paddy cotton 2026"),
    category: "farmers",
    language: "en",
    priority: 1,
  },

  // ── Rights / Civic ─────────────────────────────────────────
  {
    id: "gn-rights",
    name: "Google News — Consumer Rights India",
    url: GN("consumer rights scam fraud alert India 2026"),
    category: "rights",
    language: "en",
    priority: 2,
  },

  // ── Traffic / Hyderabad ────────────────────────────────────
  {
    id: "gn-traffic-hyd",
    name: "Google News — Hyderabad Traffic",
    url: GN("Hyderabad traffic road accident GHMC 2026"),
    category: "traffic",
    language: "en",
    priority: 2,
  },

  // ── Achievements ───────────────────────────────────────────
  {
    id: "gn-achievements",
    name: "Google News — Telugu Achievements",
    url: GN("Telugu achievement award success story 2026"),
    category: "achievements",
    language: "en",
    priority: 2,
  },

  // ── YouTube — Varandaa Talkies (own channel) ──────────────
  {
    id: "yt-varandaa",
    name: "Varandaa Talkies",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCLVrk2qH3kZ7UtO7Q_HKbrg",
    category: "general",
    language: "te",
    priority: 1,
  },
];
