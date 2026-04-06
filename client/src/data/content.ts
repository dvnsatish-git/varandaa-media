export const TICKER_ITEMS = [
  "H-1B 2027 లాటరీ: USCIS April 1 నుండి నమోదు ప్రారంభం",
  "Aha OTT: 3 కొత్త Telugu originals ఈ వారం",
  "తెలంగాణ CM నూతన సంక్షేమ పథకాలు ప్రకటించారు",
  "Prabhas New Project: ₹400 Crore confirmed",
  "వరి ధర: ₹2,183/క్వి — నేటి హైదరాబాద్ మంది",
  "ఉగాది 2026: మార్చి 30 — 21 రోజులు మిగిలాయి",
  "Darwinbox Telugu startup raises $140M",
  "SRH vs MI IPL 2026 opener — Sunday 7:30 PM",
];

export interface HeroItem {
  id: number;
  main: boolean;
  tag: string;
  tagLabel: string;
  cat: string;
  title: string;
  te: string;
  tebody: string;
  en: string;
  img: string;
  time: string;
  views: string;
  dur: string;
  link?: string;
}

export const HERO_ITEMS: HeroItem[] = [
  {
    id: 0,
    main: true,
    tag: "tag-red",
    tagLabel: "🔴 BREAKING",
    cat: "రాజకీయాలు",
    title: "Telangana Announces ₹12,000 Crore Rural Welfare Package",
    te: "తెలంగాణ ₹12,000 కోట్ల గ్రామీణ సంక్షేమ ప్యాకేజ్ — 50 లక్షల కుటుంబాలకు",
    tebody:
      "హైదరాబాద్, మార్చి 9: తెలంగాణ ముఖ్యమంత్రి నేడు 50 లక్షల కుటుంబాలకు ప్రత్యక్ష నగదు బదిలీ, రైతులకు ఉచిత విద్యుత్ పొడిగింపు, మహిళా సంక్షేమ పథకాల విస్తరణతో కూడిన సమగ్ర ప్యాకేజీని ప్రకటించారు.",
    en: "The Telangana CM unveiled a ₹12,000 crore welfare package — the state's largest-ever social intervention.",
    img: "https://picsum.photos/seed/h1/900/600",
    time: "2 గంటల క్రితం",
    views: "18.4K",
    dur: "14:22",
  },
  {
    id: 1,
    main: false,
    tag: "tag-gold",
    tagLabel: "వినోదం",
    cat: "Entertainment",
    title: "Prabhas New Project: ₹400 Crore",
    te: "ప్రభాస్ కొత్త ప్రాజెక్ట్ — నూతన అవతారం",
    tebody:
      "పాన్-ఇండియా స్టార్ ప్రభాస్ ₹400 కోట్ల బడ్జెట్‌తో కొత్త దర్శకుడితో పని చేస్తున్నారు.",
    en: "Prabhas takes his biggest creative risk with a ₹400 crore untitled project.",
    img: "https://picsum.photos/seed/h2/600/320",
    time: "5 గంటల క్రితం",
    views: "31.2K",
    dur: "9:15",
  },
  {
    id: 2,
    main: false,
    tag: "tag-blue",
    tagLabel: "🇺🇸 H-1B",
    cat: "America",
    title: "H-1B 2027 Registration Opens April 1",
    te: "H-1B 2027 నమోదు ఏప్రిల్ 1 నుండి",
    tebody:
      "USCIS H-1B 2027 లాటరీ నమోదు ఏప్రిల్ 1 నుండి. ఫీజు $215కి పెరిగింది.",
    en: "USCIS announces H-1B 2027 registration opens April 1. Fee increases to $215.",
    img: "https://picsum.photos/seed/h3/600/200",
    time: "నిన్న",
    views: "9.8K",
    dur: "22:40",
  },
  {
    id: 3,
    main: false,
    tag: "tag-teal",
    tagLabel: "OTT",
    cat: "OTT",
    title: "7 Telugu Films on OTT This Weekend",
    te: "ఈ వారాంతం OTT లో 7 తెలుగు చిత్రాలు",
    tebody:
      "Netflix, Aha, Amazon Prime Video లపై ఈ వారాంతం అద్భుతమైన తెలుగు కంటెంట్.",
    en: "A fantastic lineup of Telugu content across OTT platforms this weekend.",
    img: "https://picsum.photos/seed/h4/600/200",
    time: "ఈరోజు",
    views: "14.6K",
    dur: "7:55",
  },
];

export interface VideoItem {
  id: number;
  cat: string;
  title: string;
  te: string;
  img: string;
  time: string;
  views: string;
  dur: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 10,
    cat: "రాజకీయాలు",
    title: "Telangana Welfare Package Breakdown",
    te: "తెలంగాణ ₹12,000 కోట్ల ప్యాకేజ్",
    img: "https://picsum.photos/seed/h1/320/180",
    time: "2 గంటల క్రితం",
    views: "18.4K",
    dur: "14:22",
  },
  {
    id: 11,
    cat: "వినోదం",
    title: "Prabhas New Project Update",
    te: "ప్రభాస్ కొత్త ప్రాజెక్ట్",
    img: "https://picsum.photos/seed/h2/320/180",
    time: "5 గంటల క్రితం",
    views: "31.2K",
    dur: "9:15",
  },
  {
    id: 12,
    cat: "America",
    title: "H-1B 2027 Complete Guide",
    te: "H-1B గైడ్",
    img: "https://picsum.photos/seed/h3/320/180",
    time: "నిన్న",
    views: "9.8K",
    dur: "22:40",
  },
  {
    id: 13,
    cat: "వ్యవసాయం",
    title: "వరి పంటలో చీడపురుగుల నివారణ",
    te: "Organic pest control for paddy",
    img: "https://picsum.photos/seed/v4/320/180",
    time: "నిన్న",
    views: "22.1K",
    dur: "18:30",
  },
  {
    id: 14,
    cat: "వంటకాలు",
    title: "ఉగాది పచ్చడి — సరైన నిష్పత్తులు",
    te: "Ugadi Pachadi correct recipe",
    img: "https://picsum.photos/seed/v5/320/180",
    time: "2 రోజులు",
    views: "45.3K",
    dur: "12:20",
  },
  {
    id: 15,
    cat: "OTT",
    title: "7 Telugu Films on OTT This Weekend",
    te: "ఈ వారాంతం OTT",
    img: "https://picsum.photos/seed/h4/320/180",
    time: "ఈరోజు",
    views: "14.6K",
    dur: "7:55",
  },
];

export interface USAItem {
  cat: string;
  t: string;
  te: string;
  time: string;
}

export const USA_DATA: USAItem[] = [
  {
    cat: "H-1B · వీసా",
    t: "H-1B 2027 Registration: Complete Guide for Telugu Applicants",
    te: "తెలుగు దరఖాస్తుదారులకు పూర్తి గైడ్",
    time: "3 గంటల క్రితం",
  },
  {
    cat: "Jobs · ఉద్యోగాలు",
    t: "Silicon Valley: 12,000 New Tech Jobs — Telugu Opportunities",
    te: "12,000 కొత్త టెక్ ఉద్యోగాలు",
    time: "5 గంటల క్రితం",
  },
  {
    cat: "Community · కమ్యూనిటీ",
    t: "TANA 2026 Conference Dates Announced — Houston, Texas",
    te: "TANA 2026 సమావేశం తేదీలు",
    time: "నిన్న",
  },
  {
    cat: "Education · విద్య",
    t: "Top 10 US Universities for Telugu Students — 2026 Rankings",
    te: "తెలుగు విద్యార్థులకు టాప్ 10 విశ్వవిద్యాలయాలు",
    time: "2 రోజుల క్రితం",
  },
];

export interface OTTItem {
  plat: string;
  pc: string;
  platColor: string;
  platTextColor?: string;
  t: string;
  te: string;
  meta: string;
  img: string;
}

export const OTT_DATA: OTTItem[] = [
  {
    plat: "Netflix",
    pc: "p-netflix",
    platColor: "#E50914",
    t: "Unstoppable with NBK S4",
    te: "NBK తో ఆపలేనిది S4",
    meta: "New · Talk Show",
    img: "https://picsum.photos/seed/o1/320/180",
  },
  {
    plat: "Aha",
    pc: "p-aha",
    platColor: "#F5D000",
    platTextColor: "#111",
    t: "Vivaha Bhojanambu",
    te: "వివాహ భోజనంబు",
    meta: "New · Comedy Series",
    img: "https://picsum.photos/seed/o2/320/180",
  },
  {
    plat: "Prime",
    pc: "p-prime",
    platColor: "#00A8E0",
    t: "Ramabanam",
    te: "రామబాణం",
    meta: "Streaming · Action",
    img: "https://picsum.photos/seed/o3/320/180",
  },
  {
    plat: "Hotstar",
    pc: "p-hotstar",
    platColor: "#1F80E0",
    t: "Bigg Boss Telugu S8",
    te: "బిగ్ బాస్ తెలుగు S8",
    meta: "Live · Reality Show",
    img: "https://picsum.photos/seed/o4/320/180",
  },
  {
    plat: "Aha",
    pc: "p-aha",
    platColor: "#F5D000",
    platTextColor: "#111",
    t: "Kalki 2898 AD",
    te: "కల్కి 2898 AD",
    meta: "Trending · Sci-Fi",
    img: "https://picsum.photos/seed/o5/320/180",
  },
  {
    plat: "Zee5",
    pc: "p-zee",
    platColor: "#6B2D8B",
    t: "Naa Saami Ranga",
    te: "నా సామి రంగా",
    meta: "New · Drama",
    img: "https://picsum.photos/seed/o6/320/180",
  },
];

export interface Raashi {
  sym: string;
  name: string;
  en: string;
  stars: string;
}

export const RAASHIS: Raashi[] = [
  { sym: "♈", name: "మేషం", en: "Aries", stars: "★★★★☆" },
  { sym: "♉", name: "వృషభం", en: "Taurus", stars: "★★★☆☆" },
  { sym: "♊", name: "మిథునం", en: "Gemini", stars: "★★★★★" },
  { sym: "♋", name: "కర్కాటకం", en: "Cancer", stars: "★★★☆☆" },
  { sym: "♌", name: "సింహం", en: "Leo", stars: "★★★★☆" },
  { sym: "♍", name: "కన్య", en: "Virgo", stars: "★★★★☆" },
  { sym: "♎", name: "తుల", en: "Libra", stars: "★★★☆☆" },
  { sym: "♏", name: "వృశ్చికం", en: "Scorpio", stars: "★★★☆☆" },
  { sym: "♐", name: "ధనుస్సు", en: "Sagittarius", stars: "★★★★☆" },
  { sym: "♑", name: "మకరం", en: "Capricorn", stars: "★★★☆☆" },
  { sym: "♒", name: "కుంభం", en: "Aquarius", stars: "★★★★☆" },
  { sym: "♓", name: "మీనం", en: "Pisces", stars: "★★★★☆" },
];

export interface Temple {
  name: string;
  en: string;
  city: string;
  deity: string;
  img: string;
}

export const TEMPLES: Temple[] = [
  {
    name: "శ్రీ వేంకటేశ్వర స్వామి మందిరం",
    en: "Sri Venkateswara Temple, Houston TX",
    city: "Houston, TX",
    deity: "వేంకటేశ్వర స్వామి",
    img: "https://picsum.photos/seed/t1/76/56",
  },
  {
    name: "శ్రీ మహా గణపతి మందిరం",
    en: "Sri Maha Ganapathi Temple, NJ",
    city: "Flushing, NJ",
    deity: "గణపతి",
    img: "https://picsum.photos/seed/t2/76/56",
  },
  {
    name: "శ్రీ లక్ష్మి-నారాయణ మందిరం",
    en: "Sri Lakshmi Narayana Temple, CA",
    city: "Livermore, CA",
    deity: "లక్ష్మి నారాయణ",
    img: "https://picsum.photos/seed/t3/76/56",
  },
  {
    name: "SVBF తిరుపతి మందిరం",
    en: "SVBF Tirupati Temple, Bridgewater NJ",
    city: "Bridgewater, NJ",
    deity: "వేంకటేశ్వర స్వామి",
    img: "https://picsum.photos/seed/t4/76/56",
  },
];

export interface PriceItem {
  te: string;
  en: string;
  min: string;
  max: string;
  modal: string;
  chg: string;
  dir: string;
}

export const PRICES_HYD: PriceItem[] = [
  { te: "వరి", en: "Paddy", min: "2050", max: "2280", modal: "2183", chg: "+₹45", dir: "up" },
  { te: "టమాట", en: "Tomato", min: "15", max: "22", modal: "18", chg: "-₹6", dir: "dn" },
  { te: "ఉల్లి", en: "Onion", min: "28", max: "38", modal: "32", chg: "+₹4", dir: "up" },
  { te: "మిర్చి", en: "Chilli", min: "125", max: "160", modal: "140", chg: "+₹12", dir: "up" },
  { te: "పత్తి", en: "Cotton", min: "6800", max: "7400", modal: "7200", chg: "→₹0", dir: "" },
  { te: "మొక్కజొన్న", en: "Maize", min: "1720", max: "1960", modal: "1850", chg: "-₹30", dir: "dn" },
];

export const PRICES_GNT: PriceItem[] = [
  { te: "మిర్చి", en: "Chilli", min: "130", max: "168", modal: "148", chg: "+₹15", dir: "up" },
  { te: "పత్తి", en: "Cotton", min: "6900", max: "7600", modal: "7300", chg: "+₹100", dir: "up" },
  { te: "వరి", en: "Paddy", min: "2100", max: "2300", modal: "2200", chg: "+₹50", dir: "up" },
  { te: "అరటి", en: "Banana", min: "12", max: "18", modal: "15", chg: "→₹0", dir: "" },
];

export interface WeatherItem {
  city: string;
  icon: string;
  temp: string;
  rain: string;
}

export const WEATHER: WeatherItem[] = [
  { city: "హైదరాబాద్", icon: "⛅", temp: "34°C", rain: "20%" },
  { city: "గుంటూరు", icon: "☀️", temp: "37°C", rain: "5%" },
  { city: "వరంగల్", icon: "🌩️", temp: "31°C", rain: "60%" },
  { city: "విశాఖపట్నం", icon: "🌤️", temp: "33°C", rain: "15%" },
];

export interface Recipe {
  cat: string;
  title: string;
  te: string;
  time: string;
  isNew: boolean;
  img: string;
}

export const RECIPES: Recipe[] = [
  {
    cat: "పప్పు వంటలు",
    title: "పెసరపప్పు పులుసు — అమ్మ చేతి రుచి",
    te: "Pesarapappu pulusu recipe",
    time: "30min",
    isNew: true,
    img: "https://picsum.photos/seed/rc1/320/240",
  },
  {
    cat: "అల్పాహారం",
    title: "రవ్వ ఉపమా — 15 నిమిషాల్లో రెడీ",
    te: "Rava upma quick recipe",
    time: "15min",
    isNew: false,
    img: "https://picsum.photos/seed/rc2/320/240",
  },
  {
    cat: "పండుగ వంటలు",
    title: "ఉగాది పచ్చడి — సరైన నిష్పత్తులు",
    te: "Ugadi pachadi correct recipe",
    time: "20min",
    isNew: true,
    img: "https://picsum.photos/seed/rc3/320/240",
  },
];

export interface RightsCard {
  icon: string;
  title: string;
  desc: string;
}

export const BIG_RIGHTS: RightsCard[] = [
  {
    icon: "🗳️",
    title: "మీ ఓటు మీ శక్తి",
    desc: "ఓటు వేయడం మీ రాజ్యాంగ హక్కు. Aadhaar చూపిస్తే ఓటు వేయొచ్చు.",
  },
  {
    icon: "🏥",
    title: "ఉచిత వైద్యం హక్కు",
    desc: "ప్రభుత్వ ఆసుపత్రిలో డబ్బు లేదని తిరస్కరించే హక్కు లేదు.",
  },
  {
    icon: "📋",
    title: "రేషన్ కార్డ్ హక్కు",
    desc: "ప్రతి పేద కుటుంబానికి రేషన్ కార్డ్ రావాలి.",
  },
  {
    icon: "⚖️",
    title: "అరెస్ట్ హక్కులు",
    desc: "అరెస్ట్ అయినప్పుడు కారణం అడిగే హక్కు మీకు ఉంది.",
  },
];

export interface Helpline {
  num: string;
  te: string;
  en: string;
  bg: string;
}

export const HELPLINES: Helpline[] = [
  { num: "112", te: "అత్యవసర సేవలు", en: "All Emergency", bg: "#C62828" },
  { num: "181", te: "మహిళా హెల్ప్‌లైన్", en: "Women Safety", bg: "#AD1457" },
  { num: "1098", te: "చైల్డ్‌లైన్", en: "Child Protection", bg: "#1565C0" },
  { num: "1930", te: "సైబర్ క్రైమ్", en: "Cyber Crime", bg: "#4527A0" },
  { num: "108", te: "అంబులెన్స్", en: "Medical Emergency", bg: "#00695C" },
  { num: "1800", te: "కిసాన్ కాల్", en: "Farmer Helpline", bg: "#2E7D32" },
  { num: "104", te: "ఆరోగ్య హెల్ప్‌లైన్", en: "Health Helpline", bg: "#00838F" },
  { num: "14567", te: "వృద్ధుల హెల్ప్‌లైన్", en: "Elderly Helpline", bg: "#E65100" },
];

export interface TrafficRoute {
  te: string;
  en: string;
  s: "clear" | "slow" | "heavy";
  time: string;
}

export interface TrafficAlert {
  sev: "high" | "medium" | "info";
  icon: string;
  title: string;
  te: string;
  time: string;
}

export interface TrafficCity {
  label: string;
  routes: TrafficRoute[];
  alerts: TrafficAlert[];
}

export const TRAFFIC_DATA: Record<string, TrafficCity> = {
  hyd: {
    label: "హైదరాబాద్",
    routes: [
      { te: "ORR (బాహ్య వలయం)", en: "Outer Ring Road", s: "clear", time: "Normal" },
      { te: "HITECH సిటీ → Gachibowli", en: "IT Corridor", s: "heavy", time: "+35 min" },
      { te: "ట్యాంక్‌బండ్ రోడ్", en: "Tank Bund Road", s: "slow", time: "+15 min" },
      { te: "నాంపల్లి → సికింద్రాబాద్", en: "NH-44 Corridor", s: "slow", time: "+20 min" },
    ],
    alerts: [
      { sev: "high", icon: "🚧", title: "HITECH సిటీ ప్రమాదం", te: "Flyover దగ్గర రెండు వాహనాలు ఢీకొన్నాయి.", time: "30 నిమిషాల క్రితం" },
      { sev: "medium", icon: "🔧", title: "ORR Exit 14 రిపేర్", te: "రోడ్డు రిపేర్ పని.", time: "2 గంటల క్రితం" },
    ],
  },
  vjw: {
    label: "విజయవాడ",
    routes: [
      { te: "బందర్ రోడ్", en: "Bandar Road NH-16", s: "slow", time: "+20 min" },
      { te: "రైల్వే స్టేషన్ Road", en: "Railway Station Approach", s: "heavy", time: "+30 min" },
      { te: "పంటమూడి జంక్షన్", en: "Pantamoodi Junction", s: "clear", time: "Normal" },
      { te: "అమరావతి రోడ్", en: "Amaravati Road", s: "clear", time: "Normal" },
    ],
    alerts: [
      { sev: "medium", icon: "🌊", title: "పి.బి. రోడ్ — నీరు నిలిచింది", te: "వర్షం నీరు నిలిచింది.", time: "45 నిమిషాల క్రితం" },
    ],
  },
  vsp: {
    label: "విశాఖపట్నం",
    routes: [
      { te: "Beach Road", en: "RK Beach to NAD", s: "clear", time: "Normal" },
      { te: "Waltair Main Road", en: "Waltair Uplands", s: "slow", time: "+10 min" },
      { te: "Steel Plant Road", en: "VSP Gate", s: "heavy", time: "+25 min" },
      { te: "Simhachalam Road", en: "Bypass Road", s: "clear", time: "Normal" },
    ],
    alerts: [
      { sev: "info", icon: "🚆", title: "Trains On Time Today", te: "ఈరోజు అన్ని ట్రెయిన్లు సమయానికి నడుస్తున్నాయి.", time: "1 గంట క్రితం" },
    ],
  },
  wrg: {
    label: "వరంగల్",
    routes: [
      { te: "Hanamkonda Bypass", en: "NH-163 Bypass", s: "clear", time: "Normal" },
      { te: "కాజీపేట రోడ్", en: "Kazipet Road", s: "slow", time: "+12 min" },
    ],
    alerts: [
      { sev: "info", icon: "ℹ️", title: "Normal Traffic Today", te: "వరంగల్‌లో ట్రాఫిక్ సాధారణంగా ఉంది.", time: "2 గంటల క్రితం" },
    ],
  },
};

export interface Achievement {
  icon: string;
  title: string;
  te: string;
  badge: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { icon: "🏆", title: "Darwinbox Raises $140M Series E", te: "హైదరాబాద్ స్టార్టప్ Darwinbox $140M సేకరించింది", badge: "Tech Unicorn" },
  { icon: "🎬", title: "SS Rajamouli's RRR Oscar Legacy", te: "RRR Oscar విజయం తెలుగు చలనచిత్రం గర్వం", badge: "Global Cinema" },
  { icon: "🚀", title: "ISRO's Chandrayaan-3 Success", te: "చంద్రయాన్-3 — భారత చంద్ర ప్రయాణం విజయం", badge: "Space Science" },
  { icon: "🏅", title: "Neeraj Chopra: Olympic Gold", te: "నీరజ్ చోప్రా ఒలింపిక్ స్వర్ణం — భారత్ గర్వం", badge: "Olympics 2024" },
];

export interface Festival {
  icon: string;
  name: string;
  en: string;
  date: string;
  days: number;
}

export const FESTIVALS: Festival[] = [
  { icon: "🌸", name: "ఉగాది", en: "Telugu New Year", date: "Mar 30, 2026", days: 1 },
  { icon: "🌺", name: "శ్రీరామ నవమి", en: "Sri Rama Navami", date: "Apr 6, 2026", days: 8 },
  { icon: "🪔", name: "హనుమాన్ జయంతి", en: "Hanuman Jayanti", date: "Apr 12, 2026", days: 14 },
  { icon: "🎊", name: "అక్షయ తృతీయ", en: "Akshaya Tritiya", date: "Apr 30, 2026", days: 32 },
  { icon: "🌿", name: "వినాయక చవితి", en: "Vinayaka Chavithi", date: "Aug 22, 2026", days: 146 },
  { icon: "💫", name: "దసరా", en: "Dussehra", date: "Oct 2, 2026", days: 187 },
  { icon: "🪔", name: "దీపావళి", en: "Deepawali", date: "Oct 21, 2026", days: 206 },
];

export interface Weekend {
  cat: string;
  title: string;
  te: string;
  img: string;
}

export const WEEKEND: Weekend[] = [
  { cat: "Family", title: "Hyderabad Zoo: Weekend Timings & New Attractions", te: "హైదరాబాద్ జూ — వారాంతపు సమయాలు", img: "https://picsum.photos/seed/wk1/320/240" },
  { cat: "Food", title: "Best Ugadi Special Thali Restaurants", te: "ఉగాది స్పెషల్ థాళీ — మంచి రెస్టారెంట్లు", img: "https://picsum.photos/seed/wk2/320/240" },
  { cat: "Travel", title: "Araku Valley: 2-Day Trip from Visakhapatnam", te: "అరకు వ్యాలీ — 2 రోజుల యాత్ర", img: "https://picsum.photos/seed/wk3/320/240" },
];

export interface Tip {
  icon: string;
  cat: string;
  title: string;
  te: string;
}

export const TIPS: Tip[] = [
  { icon: "💰", cat: "Finance", title: "UPI Scam: ఈ 5 signs చూసి జాగ్రత్తపడండి", te: "UPI మోసాల నుండి రక్షణ" },
  { icon: "🌿", cat: "Health", title: "ఉగాది పచ్చడి ఆరోగ్య ప్రయోజనాలు", te: "ఆరోగ్యకరమైన ఉగాది" },
  { icon: "📱", cat: "Tech", title: "WhatsApp: Privacy Settings మార్చండి", te: "WhatsApp గోప్యత సెట్టింగులు" },
  { icon: "🎓", cat: "Education", title: "NEET 2026 పరీక్ష తేదీలు విడుదల", te: "NEET 2026 నోటిఫికేషన్" },
];

export interface Reel {
  lbl: string;
  t: string;
  img: string;
}

export const REELS: Reel[] = [
  { lbl: "VIRAL", t: "ఉగాది వేడుకలు", img: "https://picsum.photos/seed/r1/180/320" },
  { lbl: "TRENDING", t: "IPL హైలైట్స్", img: "https://picsum.photos/seed/r2/180/320" },
  { lbl: "NEW", t: "వంట చిట్కాలు", img: "https://picsum.photos/seed/r3/180/320" },
  { lbl: "HOT", t: "టెక్ రివ్యూ", img: "https://picsum.photos/seed/r4/180/320" },
];

export interface TrendingItem {
  t: string;
  te: string;
}

export const TRENDING: TrendingItem[] = [
  { t: "H-1B 2027 నమోదు", te: "April 1 నుండి" },
  { t: "ఉగాది 2026 రాశిఫలాలు", te: "12 రాశులు" },
  { t: "Prabhas New Film", te: "₹400 Crore Budget" },
  { t: "తెలంగాణ సంక్షేమ పథకాలు", te: "50 లక్షల కుటుంబాలు" },
  { t: "IPL 2026 Schedule", te: "SRH vs MI Sunday" },
];

// ── OTT Releases This Week ─────────────────────────────────
export interface OTTRelease {
  title: string;
  type: "Film" | "Series";
  language: string;
}

export interface OTTPlatform {
  name: string;
  color: string;       // border/header color
  textColor: string;   // header text color
  releases: OTTRelease[];
}

export const OTT_WEEK: OTTPlatform[] = [
  {
    name: "Netflix",
    color: "#E50914",
    textColor: "#E50914",
    releases: [
      { title: "Mrityunjay", type: "Film", language: "Telugu" },
      { title: "Sampradayini Suppini Suddapoosani", type: "Film", language: "Telugu" },
      { title: "Happy Patel", type: "Film", language: "Hindi" },
      { title: "Vadh 2", type: "Film", language: "Hindi" },
      { title: "28 Years Later: Bone Temple", type: "Film", language: "English" },
      { title: "Merrily We Roll Along", type: "Film", language: "English" },
      { title: "Mamla Legal Hai S2", type: "Series", language: "Hindi" },
      { title: "The Big Bang Theory S1-12", type: "Series", language: "English" },
      { title: "XO Kitty S3", type: "Series", language: "English" },
      { title: "Ripple S1", type: "Series", language: "English" },
    ],
  },
  {
    name: "Prime Video",
    color: "#00A8E0",
    textColor: "#00A8E0",
    releases: [
      { title: "S Sarawasthi", type: "Film", language: "Telugu" },
      { title: "Crime 101", type: "Film", language: "English" },
      { title: "London Calling", type: "Film", language: "English" },
      { title: "Valathu Vashate Kallan", type: "Film", language: "Malayalam" },
      { title: "Inuyashiki", type: "Film", language: "Japanese" },
      { title: "Maa Ka Sum", type: "Series", language: "Hindi" },
      { title: "PM Selfie Wali S1", type: "Series", language: "Hindi" },
      { title: "The Best Thing S1", type: "Series", language: "Mandarin" },
    ],
  },
  {
    name: "Jio Hotstar",
    color: "#1565C0",
    textColor: "#1565C0",
    releases: [
      { title: "Phantom", type: "Film", language: "Hindi" },
      { title: "Mike And Nick Nick And Nice", type: "Film", language: "English" },
      { title: "The Carpenter Son", type: "Film", language: "English" },
      { title: "Anemone", type: "Film", language: "English" },
      { title: "Love Overboard S1", type: "Series", language: "English" },
    ],
  },
  {
    name: "Zee 5",
    color: "#7B2D8B",
    textColor: "#7B2D8B",
    releases: [
      { title: "Hey Balwanth", type: "Film", language: "Telugu" },
      { title: "Sabdam", type: "Film", language: "Tamil" },
      { title: "Hey Kay Navin", type: "Series", language: "Hindi" },
      { title: "Rubaab", type: "Film", language: "Marathi" },
      { title: "Krishna Aur Kans Antim Yudh", type: "Film", language: "Hindi" },
    ],
  },
  {
    name: "Aha",
    color: "#F5C518",
    textColor: "#c49a00",
    releases: [
      { title: "Euphoria", type: "Film", language: "Telugu" },
      { title: "Love Policy", type: "Film", language: "Telugu" },
      { title: "Unstoppable with NBK S5", type: "Series", language: "Telugu" },
      { title: "Vivaha Bhojanambu", type: "Series", language: "Telugu" },
    ],
  },
  {
    name: "SUN NXT",
    color: "#FF6B00",
    textColor: "#FF6B00",
    releases: [
      { title: "Mayabimbum", type: "Film", language: "Tamil" },
      { title: "Vadam", type: "Film", language: "Tamil" },
      { title: "Velleppam", type: "Film", language: "Malayalam" },
    ],
  },
];
