// ─────────────────────────────────────────────────────────────
//  Feed Sources — all free RSS/Atom feeds, no API key needed
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

// Google News RSS — Telugu-relevant search queries
const GN = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;

export const FEED_SOURCES: FeedSource[] = [
  // ── Politics / Telangana / AP ──────────────────────────────
  {
    id: "gn-telangana",
    name: "Google News — Telangana",
    url: GN("Telangana government news"),
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-ap-politics",
    name: "Google News — Andhra Pradesh",
    url: GN("Andhra Pradesh YCP TDP politics"),
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-cm-revanth",
    name: "Google News — AP/TG CM",
    url: GN("Revanth Reddy Chandrababu Naidu news"),
    category: "politics",
    language: "en",
    priority: 2,
  },

  // ── Entertainment / Tollywood ──────────────────────────────
  {
    id: "gn-tollywood",
    name: "Google News — Tollywood",
    url: GN("tollywood telugu movies 2026"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telugu-actors",
    name: "Google News — Telugu Stars",
    url: GN("Prabhas Mahesh Babu Allu Arjun Ram Charan news"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },

  // ── OTT ───────────────────────────────────────────────────
  {
    id: "gn-ott-telugu",
    name: "Google News — Telugu OTT",
    url: GN("telugu OTT Netflix Aha Amazon Prime 2026"),
    category: "ott",
    language: "en",
    priority: 1,
  },

  // ── America / Telugu Diaspora ──────────────────────────────
  {
    id: "gn-h1b",
    name: "Google News — H-1B",
    url: GN("H1B visa 2027 USCIS immigration"),
    category: "america",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telugu-usa",
    name: "Google News — Telugu America",
    url: GN("Telugu community USA Indians America jobs tech"),
    category: "america",
    language: "en",
    priority: 2,
  },

  // ── Spiritual / Cultural ───────────────────────────────────
  {
    id: "gn-festivals",
    name: "Google News — Telugu Festivals",
    url: GN("Telugu festivals Ugadi Sankranti puja 2026"),
    category: "spiritual",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-temples",
    name: "Google News — Temples",
    url: GN("Tirupati Tirumala temple news 2026"),
    category: "spiritual",
    language: "en",
    priority: 2,
  },

  // ── Farmers / Agriculture ──────────────────────────────────
  {
    id: "gn-farmers-ap",
    name: "Google News — AP Farmers",
    url: GN("Andhra Pradesh Telangana farmers agriculture crops 2026"),
    category: "farmers",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-mandi",
    name: "Google News — Mandi Prices",
    url: GN("mandi prices paddy chilli cotton Andhra Telangana"),
    category: "farmers",
    language: "en",
    priority: 1,
  },

  // ── Rights / Civic ─────────────────────────────────────────
  {
    id: "gn-rights",
    name: "Google News — Civic Rights AP/TG",
    url: GN("consumer rights scam alert India Telugu helpline 2026"),
    category: "rights",
    language: "en",
    priority: 2,
  },

  // ── Traffic ────────────────────────────────────────────────
  {
    id: "gn-traffic-hyd",
    name: "Google News — Hyderabad Traffic",
    url: GN("Hyderabad traffic road accident news"),
    category: "traffic",
    language: "en",
    priority: 2,
  },

  // ── Achievements ───────────────────────────────────────────
  {
    id: "gn-achievements",
    name: "Google News — Telugu Achievements",
    url: GN("Telugu people achievement award success story 2026"),
    category: "achievements",
    language: "en",
    priority: 2,
  },

  // ── YouTube RSS (Varandaa Talkies) ────────────────────────
  // Replace CHANNEL_ID below with the actual YouTube channel ID
  {
    id: "yt-varandaa",
    name: "Varandaa Talkies YouTube",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCxxxxxxxxxxxxxxxxxx",
    category: "general",
    language: "te",
    priority: 1,
  },

  // ── Other Telugu YouTube channels ─────────────────────────
  {
    id: "yt-tv9",
    name: "TV9 Telugu YouTube",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCa3OzvKSBsHGBSGT_dMdMXQ",
    category: "politics",
    language: "te",
    priority: 2,
  },
  {
    id: "yt-ntv",
    name: "NTV Telugu YouTube",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCld3spFlM1x3oQqlRFEVkIw",
    category: "general",
    language: "te",
    priority: 2,
  },
];
