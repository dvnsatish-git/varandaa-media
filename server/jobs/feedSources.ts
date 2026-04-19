// ─────────────────────────────────────────────────────────────
//  Feed Sources
//  Strategy: verified direct RSS (known-working) + GNews for everything else.
//  GNews queries never fail. Speculative direct URLs are gone — they silently
//  fail and hand all slots back to Hans India.
//  Priority ordering: Entertainment > TV/Politics > National > Niche
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
  priority: number;
}

const GN = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;

export const FEED_SOURCES: FeedSource[] = [

  // ═══════════════════════════════════════════════════════════
  //  ENTERTAINMENT / TOLLYWOOD / MOVIES  — User priority #1
  //  All GNews (reliable). Direct Telugu entertainment RSS rare.
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-tollywood-latest",
    name: "Google News — Tollywood Latest",
    url: GN("tollywood telugu movie news 2026"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-prabhas",
    name: "Google News — Prabhas",
    url: GN("Prabhas new movie Spirit Kalki 2026"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-allu-arjun",
    name: "Google News — Allu Arjun",
    url: GN("Allu Arjun Pushpa 3 movie 2026"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-ram-charan-ntr",
    name: "Google News — Ram Charan & Jr NTR",
    url: GN("Ram Charan Jr NTR telugu movie 2026"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-mahesh-babu",
    name: "Google News — Mahesh Babu",
    url: GN("Mahesh Babu SSMB29 Rajamouli 2026"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-tollywood-boxoffice",
    name: "Google News — Telugu Box Office",
    url: GN("telugu movie box office collection first day 2026"),
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-tollywood-review",
    name: "Google News — Telugu Movie Reviews",
    url: GN("telugu movie review rating release 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-bigg-boss-telugu",
    name: "Google News — Bigg Boss Telugu",
    url: GN("Bigg Boss Telugu Star Maa Season 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-gemini-zee-serials",
    name: "Google News — Gemini Zee TV Serials",
    url: GN("Gemini TV Zee Telugu serial new episode 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-south-cinema",
    name: "Google News — South Cinema",
    url: GN("south indian cinema Kollywood Sandalwood telugu 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-tollywood-celebs",
    name: "Google News — Tollywood Celebrities",
    url: GN("tollywood celebrity actor actress news gossip 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  // Verified direct RSS for entertainment
  {
    id: "pinkvilla",
    name: "PinkVilla",
    url: "https://www.pinkvilla.com/rss",
    category: "entertainment",
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
  {
    id: "bollywood-hungama",
    name: "Bollywood Hungama",
    url: "https://www.bollywoodhungama.com/rss/news/feed/",
    category: "entertainment",
    language: "en",
    priority: 3,
  },

  // ═══════════════════════════════════════════════════════════
  //  OTT
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-ott-aha",
    name: "Google News — Aha OTT",
    url: GN("Aha Video OTT Telugu web series premiere 2026"),
    category: "ott",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-ott-netflix-telugu",
    name: "Google News — Netflix Telugu",
    url: GN("Netflix Telugu movie series streaming 2026"),
    category: "ott",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-ott-amazon-disney",
    name: "Google News — Amazon Disney Telugu",
    url: GN("Amazon Prime Disney Plus Telugu OTT release 2026"),
    category: "ott",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  AP / TELANGANA NEWS — verified direct RSS + GNews
  // ═══════════════════════════════════════════════════════════
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
    id: "gn-ap-chandrababu",
    name: "Google News — AP Chandrababu TDP",
    url: GN("Andhra Pradesh Chandrababu Naidu TDP government 2026"),
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telangana-revanth",
    name: "Google News — Telangana Revanth",
    url: GN("Telangana Revanth Reddy Congress government 2026"),
    category: "politics",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-ap-ysrcp-jagan",
    name: "Google News — AP YSRCP Jagan",
    url: GN("Andhra Pradesh YSRCP Jagan Mohan Reddy opposition 2026"),
    category: "politics",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-telangana-brs",
    name: "Google News — Telangana BRS KCR",
    url: GN("Telangana BRS KCR KTR opposition 2026"),
    category: "politics",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-hyderabad-news",
    name: "Google News — Hyderabad",
    url: GN("Hyderabad city news development 2026"),
    category: "politics",
    language: "en",
    priority: 2,
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
    id: "gn-amaravati",
    name: "Google News — Amaravati Capital",
    url: GN("Amaravati capital city Andhra Pradesh construction 2026"),
    category: "politics",
    language: "en",
    priority: 2,
  },

  // ── National English (lower priority — fills gaps only) ────
  {
    id: "the-print",
    name: "The Print",
    url: "https://theprint.in/feed",
    category: "politics",
    language: "en",
    priority: 3,
  },
  {
    id: "ndtv",
    name: "NDTV",
    url: "https://feeds.feedburner.com/ndtvnews-latest",
    category: "politics",
    language: "en",
    priority: 3,
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
    priority: 4,  // last resort — was dominating; only fills if nothing else available
  },

  // ═══════════════════════════════════════════════════════════
  //  AMERICA / TELUGU DIASPORA
  // ═══════════════════════════════════════════════════════════
  {
    id: "economic-times-nri",
    name: "Economic Times — NRI",
    url: "https://economictimes.indiatimes.com/nri/rss.cms",
    category: "america",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-h1b-visa",
    name: "Google News — H-1B Visa",
    url: GN("H1B visa USCIS immigration Indians when:7d"),
    category: "america",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telugu-nri-usa",
    name: "Google News — Telugu NRI USA",
    url: GN("Telugu NRI America United States when:7d"),
    category: "america",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-india-us-relations",
    name: "Google News — India-US",
    url: GN("India US policy Modi Trump technology when:7d"),
    category: "america",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-indian-techies-usa",
    name: "Google News — Indian tech in USA",
    url: GN("Indian technology CEO Silicon Valley Telugu when:7d"),
    category: "america",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  SPIRITUAL / CULTURAL
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-tirumala",
    name: "Google News — Tirumala TTD",
    url: GN("Tirumala Tirupati TTD darshan prasadam 2026"),
    category: "spiritual",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telugu-temples",
    name: "Google News — Telugu Temples",
    url: GN("Andhra Pradesh Telangana temple festival puja 2026"),
    category: "spiritual",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-svbc",
    name: "Google News — SVBC Devotional",
    url: GN("SVBC Telugu devotional bhajan Vedanta 2026"),
    category: "spiritual",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  FARMERS / AGRICULTURE
  // ═══════════════════════════════════════════════════════════
  {
    id: "krishijagran",
    name: "Krishi Jagran",
    url: "https://english.krishijagran.com/feed",
    category: "farmers",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-ap-farmers",
    name: "Google News — AP Farmers",
    url: GN("Andhra Pradesh farmers agriculture crop price 2026"),
    category: "farmers",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-tg-farmers",
    name: "Google News — Telangana Farmers",
    url: GN("Telangana farmers paddy cotton Rytu Bandhu 2026"),
    category: "farmers",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  RIGHTS / CONSUMER
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-consumer-rights",
    name: "Google News — Consumer Rights",
    url: GN("consumer rights scam fraud India 2026"),
    category: "rights",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-cyber-fraud",
    name: "Google News — Cyber Fraud India",
    url: GN("cyber fraud online scam Hyderabad Andhra 2026"),
    category: "rights",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  TRAFFIC / HYDERABAD CITY
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-hyderabad-traffic",
    name: "Google News — Hyderabad Traffic",
    url: GN("Hyderabad traffic metro MMTS road accident 2026"),
    category: "traffic",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-hyderabad-infra",
    name: "Google News — Hyderabad Infrastructure",
    url: GN("Hyderabad GHMC infrastructure flyover construction 2026"),
    category: "traffic",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-telugu-achievements",
    name: "Google News — Telugu Achievements",
    url: GN("Telugu achievement award IAS IIT NASA success 2026"),
    category: "achievements",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-nri-achievements",
    name: "Google News — NRI Achievements",
    url: GN("Indian NRI achievement award success America 2026"),
    category: "achievements",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  VARANDAA TALKIES — always first
  // ═══════════════════════════════════════════════════════════
  {
    id: "yt-varandaa",
    name: "Varandaa Talkies",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCLVrk2qH3kZ7UtO7Q_HKbrg",
    category: "general",
    language: "te",
    priority: 1,
  },
];
