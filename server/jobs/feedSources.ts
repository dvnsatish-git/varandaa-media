// ─────────────────────────────────────────────────────────────
//  Feed Sources — Telugu media landscape, comprehensive
//  Priority ordering: Entertainment/Movies > TV News > Print > National
//  Max 4 articles per source enforced in fetcher.
//  Failed sources are silently skipped — safe to list speculative URLs.
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

const GN = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;

export const FEED_SOURCES: FeedSource[] = [

  // ═══════════════════════════════════════════════════════════
  //  ENTERTAINMENT / TOLLYWOOD / MOVIES  (user priority #1)
  // ═══════════════════════════════════════════════════════════

  // — Dedicated movie/entertainment sites —
  {
    id: "greatandhra-movies",
    name: "GreatAndhra — Movies",
    url: "https://www.greatandhra.com/movies/rss.xml",
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "greatandhra-feed",
    name: "GreatAndhra",
    url: "https://www.greatandhra.com/feed/",
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "mirchi9",
    name: "Mirchi9 (M9 News)",
    url: "https://m9.news/feed/",
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "123telugu",
    name: "123Telugu",
    url: "https://www.123telugu.com/feed/",
    category: "entertainment",
    language: "en",
    priority: 1,
  },
  {
    id: "filmibeat-telugu",
    name: "Filmibeat Telugu",
    url: "https://telugu.filmibeat.com/rss/telugu-movies.xml",
    category: "entertainment",
    language: "te",
    priority: 1,
  },
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
    priority: 2,
  },
  {
    id: "tollywood-net",
    name: "Tollywood.net",
    url: "https://www.tollywood.net/feed/",
    category: "entertainment",
    language: "en",
    priority: 2,
  },

  // — Tollywood via Google News —
  {
    id: "gn-tollywood-top",
    name: "Google News — Tollywood",
    url: GN("tollywood telugu movies 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-prabhas",
    name: "Google News — Prabhas",
    url: GN("Prabhas Telugu movie 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-allu-arjun",
    name: "Google News — Allu Arjun",
    url: GN("Allu Arjun Pushpa Telugu 2026"),
    category: "entertainment",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-ram-charan",
    name: "Google News — Ram Charan NTR",
    url: GN("Ram Charan Jr NTR telugu movie 2026"),
    category: "entertainment",
    language: "en",
    priority: 3,
  },
  {
    id: "gn-star-maa",
    name: "Google News — Star Maa / Bigg Boss",
    url: GN("Star Maa Bigg Boss Telugu 2026"),
    category: "entertainment",
    language: "en",
    priority: 3,
  },
  {
    id: "gn-gemini-zee-telugu",
    name: "Google News — Gemini Zee Telugu serials",
    url: GN("Gemini TV Zee Telugu serial 2026"),
    category: "entertainment",
    language: "en",
    priority: 3,
  },
  {
    id: "gn-south-box-office",
    name: "Google News — South Box Office",
    url: GN("south indian box office collection telugu 2026"),
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
    url: GN("Aha Video OTT Telugu web series 2026"),
    category: "ott",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-ott-telugu",
    name: "Google News — Telugu OTT",
    url: GN("telugu OTT Netflix Amazon Prime Disney Zee5 2026"),
    category: "ott",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  TV NEWS CHANNELS (direct RSS where available, else GNews)
  // ═══════════════════════════════════════════════════════════
  {
    id: "tv9-telugu",
    name: "TV9 Telugu",
    url: "https://www.tv9telugu.com/feed/",
    category: "general",
    language: "te",
    priority: 1,
  },
  {
    id: "v6-news",
    name: "V6 News",
    url: "https://www.v6news.tv/feed/",
    category: "general",
    language: "te",
    priority: 1,
  },
  {
    id: "etv-bharat-ap",
    name: "ETV Bharat — Andhra Pradesh",
    url: "https://www.etvbharat.com/rss/andhra-pradesh",
    category: "politics",
    language: "te",
    priority: 1,
  },
  {
    id: "etv-bharat-telangana",
    name: "ETV Bharat — Telangana",
    url: "https://www.etvbharat.com/rss/telangana",
    category: "politics",
    language: "te",
    priority: 1,
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
    id: "hmtv",
    name: "HMTV",
    url: "https://www.hmtv.in/rss",
    category: "general",
    language: "te",
    priority: 2,
  },
  {
    id: "10tv",
    name: "10TV News",
    url: "https://10tv.in/feed/",
    category: "general",
    language: "te",
    priority: 2,
  },
  {
    id: "mahaa-tv",
    name: "Mahaa TV",
    url: "https://www.maahanews.com/feed/",
    category: "general",
    language: "te",
    priority: 2,
  },
  {
    id: "t-news",
    name: "T News",
    url: "https://www.tnews.com/rss/",
    category: "general",
    language: "te",
    priority: 2,
  },
  {
    id: "sakshi-tv",
    name: "Sakshi TV",
    url: "https://www.sakshi.com/rss/sakshi-tv",
    category: "general",
    language: "te",
    priority: 2,
  },
  {
    id: "inews-telugu",
    name: "iNews Telugu",
    url: "https://www.inewslive.com/rss/",
    category: "general",
    language: "te",
    priority: 3,
  },
  {
    id: "zee-telugu-news",
    name: "Zee News Telugu",
    url: "https://zeenews.india.com/telugu/rss/",
    category: "general",
    language: "te",
    priority: 3,
  },

  // ═══════════════════════════════════════════════════════════
  //  PRINT / ONLINE — Telugu publishers
  // ═══════════════════════════════════════════════════════════
  {
    id: "eenadu",
    name: "Eenadu",
    url: "https://www.eenadu.net/Rss.aspx?nw=1",
    category: "politics",
    language: "te",
    priority: 1,
  },
  {
    id: "sakshi",
    name: "Sakshi",
    url: "https://www.sakshi.com/rss/top-news",
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
    id: "namasthe-telangana",
    name: "Namasthe Telangana",
    url: "https://www.namasthetelangana.com/feed/",
    category: "politics",
    language: "te",
    priority: 1,
  },
  {
    id: "vaartha",
    name: "Vaartha",
    url: "https://www.vaartha.com/feed/",
    category: "politics",
    language: "te",
    priority: 2,
  },
  {
    id: "prajasakti",
    name: "Prajasakti",
    url: "https://www.prajasakti.com/feed/",
    category: "politics",
    language: "te",
    priority: 2,
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
    id: "abn-andhra-jyothy",
    name: "ABN Andhra Jyothy",
    url: "https://www.andhrabhoomi.net/feed",
    category: "politics",
    language: "te",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  POLITICS AGGREGATORS — English
  // ═══════════════════════════════════════════════════════════
  {
    id: "oneindia-telugu",
    name: "Oneindia Telugu",
    url: "https://telugu.oneindia.com/rss/telugu-news.xml",
    category: "politics",
    language: "te",
    priority: 1,
  },
  {
    id: "news18-telugu",
    name: "News18 Telugu",
    url: "https://telugu.news18.com/feeds/rss.xml",
    category: "politics",
    language: "te",
    priority: 1,
  },
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
    priority: 2,
  },
  {
    id: "the-hindu-telangana",
    name: "The Hindu — Telangana",
    url: "https://www.thehindu.com/news/national/telangana/?service=rss",
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
    id: "the-print",
    name: "The Print",
    url: "https://theprint.in/feed",
    category: "politics",
    language: "en",
    priority: 3,
  },
  {
    id: "ndtv-india",
    name: "NDTV",
    url: "https://feeds.feedburner.com/ndtvnews-latest",
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
    priority: 4, // lowered — was flooding
  },

  // GNews for AP/TG political gaps
  {
    id: "gn-ap-politics",
    name: "Google News — AP Politics",
    url: GN("Andhra Pradesh Chandrababu Naidu TDP 2026"),
    category: "politics",
    language: "en",
    priority: 4,
  },
  {
    id: "gn-telangana",
    name: "Google News — Telangana",
    url: GN("Telangana Revanth Reddy BRS 2026"),
    category: "politics",
    language: "en",
    priority: 4,
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
    id: "gn-h1b",
    name: "Google News — H-1B Visa",
    url: GN("H1B visa USCIS immigration 2026 Indians"),
    category: "america",
    language: "en",
    priority: 1,
  },
  {
    id: "gn-telugu-nri",
    name: "Google News — Telugu NRI",
    url: GN("Telugu NRI America achievement community 2026"),
    category: "america",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-india-us-policy",
    name: "Google News — India-US",
    url: GN("India US policy Modi Trump 2026"),
    category: "america",
    language: "en",
    priority: 3,
  },

  // ═══════════════════════════════════════════════════════════
  //  SPIRITUAL / CULTURAL
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-tirumala",
    name: "Google News — Tirumala/TTD",
    url: GN("Tirumala Tirupati TTD darshan 2026"),
    category: "spiritual",
    language: "en",
    priority: 1,
  },
  {
    id: "svbc-gn",
    name: "Google News — SVBC / Devotional",
    url: GN("SVBC Telugu devotional bhajan temple 2026"),
    category: "spiritual",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-festivals",
    name: "Google News — Telugu Festivals",
    url: GN("Telugu festival puja Akshaya Tritiya 2026"),
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
    id: "gn-farmers-ap",
    name: "Google News — AP/TG Farmers",
    url: GN("Andhra Pradesh Telangana farmers agriculture 2026"),
    category: "farmers",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  RIGHTS / TRAFFIC / ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════
  {
    id: "gn-rights",
    name: "Google News — Consumer Rights",
    url: GN("consumer rights scam fraud India 2026"),
    category: "rights",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-traffic-hyd",
    name: "Google News — Hyderabad",
    url: GN("Hyderabad traffic metro GHMC road 2026"),
    category: "traffic",
    language: "en",
    priority: 2,
  },
  {
    id: "gn-achievements",
    name: "Google News — Telugu Achievements",
    url: GN("Telugu achievement IIT IAS award success 2026"),
    category: "achievements",
    language: "en",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════
  //  VARANDAA TALKIES (own channel — always priority 1)
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
