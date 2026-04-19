// ─────────────────────────────────────────────────────────────
//  Feed Sources — direct publisher RSS feeds
//  Priority 1 = highest. Max 4 articles per source enforced in fetcher.
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

// Google News RSS helper
const GN = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;

export const FEED_SOURCES: FeedSource[] = [

  // ── Telugu-language publishers (direct) ────────────────────
  {
    id: "sakshi",
    name: "Sakshi",
    url: "https://www.sakshi.com/rss/top-news",
    category: "politics",
    language: "te",
    priority: 1,
  },
  {
    id: "eenadu",
    name: "Eenadu",
    url: "https://www.eenadu.net/Rss.aspx?nw=1",
    category: "politics",
    language: "te",
    priority: 1,
  },
  {
    id: "andhra-jyothy",
    name: "Andhra Jyothy",
    url: "https://www.andhrajyothy.com/andhrajyothy.xml",
    category: "politics",
    language: "te",
    priority: 1,
  },
  {
    id: "ap7am",
    name: "AP7AM",
    url: "https://www.ap7am.com/rss",
    category: "politics",
    language: "te",
    priority: 2,
  },
  {
    id: "ntv-telugu",
    name: "NTV Telugu",
    url: "https://ntv.in/rss/all-news",
    category: "general",
    language: "te",
    priority: 2,
  },
  {
    id: "tv9-telugu",
    name: "TV9 Telugu",
    url: "https://tv9telugu.com/rss",
    category: "general",
    language: "te",
    priority: 2,
  },
  {
    id: "abn-andhra-jyothy",
    name: "ABN Andhra Jyothy",
    url: "https://www.andhrabhoomi.net/feed",
    category: "politics",
    language: "te",
    priority: 2,
  },

  // ── Politics / AP / TG — English publishers ────────────────
  {
    id: "telangana-today",
    name: "Telangana Today",
    url: "https://telanganatoday.com/?feed=rss2",
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "the-hindu-ap",
    name: "The Hindu — Andhra Pradesh",
    url: "https://www.thehindu.com/news/national/andhra-pradesh/?service=rss",
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "the-hindu-telangana",
    name: "The Hindu — Telangana",
    url: "https://www.thehindu.com/news/national/telangana/?service=rss",
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
    id: "the-print",
    name: "The Print",
    url: "https://theprint.in/feed",
    category: "politics",
    language: "en",
    priority: 2,
  },
  {
    id: "the-wire",
    name: "The Wire",
    url: "https://thewire.in/rss",
    category: "politics",
    language: "en",
    priority: 2,
  },
  {
    id: "ndtv-india",
    name: "NDTV",
    url: "https://feeds.feedburner.com/ndtvnews-latest",
    category: "politics",
    language: "en",
    priority: 2,
  },
  {
    id: "scroll-in",
    name: "Scroll.in",
    url: "https://feeds.feedburner.com/ScrollinArticles.rss",
    category: "politics",
    language: "en",
    priority: 3,
  },
  {
    id: "hans-india",
    name: "The Hans India",
    url: "https://www.thehansindia.com/feed/",
    category: "politics",
    language: "en",
    priority: 3,  // lowered — was flooding the feed
  },
  {
    id: "hindustan-times",
    name: "Hindustan Times",
    url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
    category: "politics",
    language: "en",
    priority: 3,
  },

  // ── AP/TG politics via GNews (fills gaps) ─────────────────
  {
    id: "gn-ap-politics",
    name: "Google News — AP Politics",
    url: GN("Andhra Pradesh Chandrababu Naidu TDP YCP 2026"),
    category: "politics",
    language: "en",
    priority: 3,
  },
  {
    id: "gn-telangana",
    name: "Google News — Telangana",
    url: GN("Telangana Revanth Reddy BRS Congress 2026"),
    category: "politics",
    language: "en",
    priority: 3,
  },

  // ── Entertainment / Tollywood ──────────────────────────────
  {
    id: "pinkvilla",
    name: "PinkVilla",
    url: "https://www.pinkvilla.com/rss",
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "filmcompanion",
    name: "Film Companion",
    url: "https://www.filmcompanion.in/feed",
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
    url: GN("tollywood telugu movies Prabhas Allu Arjun Ram Charan 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-kollywood",
    name: "Google News — South Cinema",
    url: GN("south indian cinema telugu kannada tamil movie release 2026"),
    category: "entertainment",
    language: "en",
    priority: 3,
  },

  // ── OTT ───────────────────────────────────────────────────
  {
    id: "gn-ott-telugu",
    name: "Google News — Telugu OTT",
    url: GN("telugu OTT Netflix Aha Amazon Prime Disney Zee5 2026"),
    category: "ott",
    language: "en",
    priority: 2,
  },

  // ── America / Telugu Diaspora ──────────────────────────────
  {
    id: "economic-times-nri",
    name: "Economic Times — NRI",
    url: "https://economictimes.indiatimes.com/nri/rss.cms",
    category: "america",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-h1b",
    name: "Google News — H-1B Visa",
    url: GN("H1B visa USCIS immigration Trump 2026 Indians"),
    category: "america",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telugu-usa",
    name: "Google News — Telugu NRI",
    url: GN("Telugu NRI America achievement community 2026"),
    category: "america",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-india-usa-policy",
    name: "Google News — India-US",
    url: GN("India US relations Modi Trump policy 2026"),
    category: "america",
    language: "en",
    priority: 3,
  },

  // ── Spiritual / Cultural ───────────────────────────────────
  {
    id: "gn-tirumala",
    name: "Google News — Tirumala/TTD",
    url: GN("Tirumala Tirupati TTD darshan seva 2026"),
    category: "spiritual",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-festivals",
    name: "Google News — Telugu Festivals",
    url: GN("Akshaya Tritiya Telugu festival puja 2026"),
    category: "spiritual",
    language: "en",
    priority: 2,
  },

  // ── Farmers / Agriculture ──────────────────────────────────
  {
    id: "krishijagran",
    name: "Krishi Jagran",
    url: "https://english.krishijagran.com/feed",
    category: "farmers",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-farmers-ap",
    name: "Google News — AP/TG Farmers",
    url: GN("Andhra Pradesh Telangana farmers agriculture paddy 2026"),
    category: "farmers",
    language: "en",
    priority: 2,
  },

  // ── Rights / Consumer ─────────────────────────────────────
  {
    id: "gn-rights",
    name: "Google News — Consumer Rights",
    url: GN("consumer rights scam fraud alert India 2026"),
    category: "rights",
    language: "en",
    priority: 2,
  },

  // ── Traffic / Hyderabad ────────────────────────────────────
  {
    id: "gn-traffic-hyd",
    name: "Google News — Hyderabad",
    url: GN("Hyderabad traffic road metro GHMC 2026"),
    category: "traffic",
    language: "en",
    priority: 2,
  },

  // ── Achievements ───────────────────────────────────────────
  {
    id: "gn-achievements",
    name: "Google News — Telugu Achievements",
    url: GN("Telugu achievement award IIT IAS success 2026"),
    category: "achievements",
    language: "en",
    priority: 2,
  },

  // ── Varandaa Talkies (own channel) ────────────────────────
  {
    id: "yt-varandaa",
    name: "Varandaa Talkies",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCLVrk2qH3kZ7UtO7Q_HKbrg",
    category: "general",
    language: "te",
    priority: 1,
  },
];
