export const TICKER_ITEMS = [
  "H-1B 2027 లాటరీ: USCIS April 1 నుండి నమోదు ప్రారంభం",
  "Aha OTT: 3 కొత్త Telugu originals ఈ వారం",
  "తెలంగాణ CM నూతన సంక్షేమ పథకాలు ప్రకటించారు",
  "Prabhas New Project: ₹400 Crore confirmed",
  "వరి ధర: ₹2,183/క్వి — నేటి హైదరాబాద్ మంది",
  "అక్షయ తృతీయ 2026: ఏప్రిల్ 30 — 15 రోజులు మిగిలాయి",
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
    title: "వేసవి స్పెషల్ — మామిడి పులిహోర",
    te: "Summer special Mango Pulihora recipe",
    img: "https://picsum.photos/seed/vs1/320/180",
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
  url: string;
  summary: string;   // Telugu — positive highlight for today
  caution: string;   // Telugu — thing to be careful about
}

export const RAASHIS: Raashi[] = [
  {
    sym: "♈", name: "మేషం", en: "Aries", stars: "★★★★☆",
    url: "https://www.drikpanchang.com/rashifal/aries-daily-rashifal.html",
    summary: "నేడు కొత్త అవకాశాలు మీ వైపు వస్తున్నాయి, ధైర్యంగా స్వీకరించండి.",
    caution: "ఆర్థిక నిర్ణయాలలో తొందరపడకండి, జాగ్రత్తగా ఉండండి.",
  },
  {
    sym: "♉", name: "వృషభం", en: "Taurus", stars: "★★★☆☆",
    url: "https://www.drikpanchang.com/rashifal/taurus-daily-rashifal.html",
    summary: "కుటుంబ సంతోషం మీకు శక్తిని ఇస్తుంది, బంధాలు మరింత బలపడతాయి.",
    caution: "ఆరోగ్యం వైపు శ్రద్ధ అవసరం, విశ్రాంతి తగ్గించుకోకండి.",
  },
  {
    sym: "♊", name: "మిథునం", en: "Gemini", stars: "★★★★★",
    url: "https://www.drikpanchang.com/rashifal/gemini-daily-rashifal.html",
    summary: "వ్యాపారంలో లాభాలు పెరుగుతాయి, బంధువులతో అనుబంధం పెరుగుతుంది.",
    caution: "మాటల వల్ల అపోహలు రాకుండా జాగ్రత్త పడండి.",
  },
  {
    sym: "♋", name: "కర్కాటకం", en: "Cancer", stars: "★★★☆☆",
    url: "https://www.drikpanchang.com/rashifal/cancer-daily-rashifal.html",
    summary: "ప్రేమ విషయాలలో శుభ సమయం, మనసు ఆనందంగా ఉంటుంది.",
    caution: "అనవసర ఖర్చులు తగ్గించుకోండి, పొదుపుగా ఉండండి.",
  },
  {
    sym: "♌", name: "సింహం", en: "Leo", stars: "★★★★☆",
    url: "https://www.drikpanchang.com/rashifal/leo-daily-rashifal.html",
    summary: "నాయకత్వ గుణాలు మీకు గుర్తింపు తెస్తాయి, పదోన్నతి సాధ్యమే.",
    caution: "అహంభావం వల్ల సంబంధాలకు హాని జరగవచ్చు, వినయంగా ఉండండి.",
  },
  {
    sym: "♍", name: "కన్య", en: "Virgo", stars: "★★★★☆",
    url: "https://www.drikpanchang.com/rashifal/virgo-daily-rashifal.html",
    summary: "శ్రమకు తగిన ఫలితాలు లభిస్తాయి, విద్యలో ముందడుగు పడుతుంది.",
    caution: "ఆతురపడి నిర్ణయాలు తీసుకోకండి, ఆలోచించి వ్యవహరించండి.",
  },
  {
    sym: "♎", name: "తుల", en: "Libra", stars: "★★★☆☆",
    url: "https://www.drikpanchang.com/rashifal/libra-daily-rashifal.html",
    summary: "సమతుల్యత మీ బలం, సంబంధాలు సుఖవంతంగా ఉంటాయి.",
    caution: "ప్రయాణాలలో జాగ్రత్తగా ఉండండి, అనవసర వివాదాలు వద్దు.",
  },
  {
    sym: "♏", name: "వృశ్చికం", en: "Scorpio", stars: "★★★☆☆",
    url: "https://www.drikpanchang.com/rashifal/scorpio-daily-rashifal.html",
    summary: "ఆంతరిక శక్తి మేల్కొంటుంది, పరిశోధనలో విజయం కలుగుతుంది.",
    caution: "అనుమానాలు అనవసర కష్టాలు తెస్తాయి, నమ్మకంగా ఉండండి.",
  },
  {
    sym: "♐", name: "ధనుస్సు", en: "Sagittarius", stars: "★★★★☆",
    url: "https://www.drikpanchang.com/rashifal/sagittarius-daily-rashifal.html",
    summary: "దీర్ఘకాల ప్రణాళికలు ఫలిస్తాయి, విదేశీ అనుభవాలు శుభప్రదం.",
    caution: "సాహసాలలో అతిగా ముందుకు వెళ్ళకండి, జాగ్రత్తగా అడుగువేయండి.",
  },
  {
    sym: "♑", name: "మకరం", en: "Capricorn", stars: "★★★☆☆",
    url: "https://www.drikpanchang.com/rashifal/capricorn-daily-rashifal.html",
    summary: "కఠిన శ్రమకు బహుమానం దొరుకుతుంది, ఉద్యోగంలో పురోగతి కనిపిస్తుంది.",
    caution: "ఆరోగ్యంపై శ్రద్ధ అవసరం, తగినంత నిద్ర తీసుకోండి.",
  },
  {
    sym: "♒", name: "కుంభం", en: "Aquarius", stars: "★★★★☆",
    url: "https://www.drikpanchang.com/rashifal/aquarius-daily-rashifal.html",
    summary: "నూతన ఆలోచనలు మీకు ముందుకు తీసుకెళ్తాయి, స్నేహితులతో ఆనందం.",
    caution: "ఆర్థిక రంగంలో అవసరమైన జాగ్రత్తలు తీసుకోండి, పెట్టుబడులు ఆలోచించి చేయండి.",
  },
  {
    sym: "♓", name: "మీనం", en: "Pisces", stars: "★★★★☆",
    url: "https://www.drikpanchang.com/rashifal/pisces-daily-rashifal.html",
    summary: "ఆధ్యాత్మిక చింతన మీకు శాంతిని ఇస్తుంది, సృజనాత్మకత వికసిస్తుంది.",
    caution: "ఇతరులను అతిగా నమ్మడం వల్ల నష్టం రావచ్చు, వివేకంగా వ్యవహరించండి.",
  },
];

export interface Temple {
  name: string;
  en: string;
  city: string;
  deity: string;
  desc: string;
  img: string;
  url: string;
}

export const TEMPLES: Temple[] = [
  {
    name: "శ్రీ వేంకటేశ్వర స్వామి మందిరం",
    en: "Sri Venkateswara Temple of Greater Houston",
    city: "Pearland, TX",
    deity: "వేంకటేశ్వర స్వామి",
    desc: "One of the largest Telugu temples in Texas, dedicated to Lord Venkateswara with authentic Agamic rituals and major festival celebrations.",
    img: "https://picsum.photos/seed/t1/76/56",
    url: "https://www.svtht.org",
  },
  {
    name: "శ్రీ గణేశ్ మందిరం — న్యూయార్క్",
    en: "Sri Ganesha Temple, Flushing NY",
    city: "Flushing, NY",
    deity: "గణపతి",
    desc: "The oldest and most prominent Hindu temple in New York, established in 1977, following South Indian Agamic traditions.",
    img: "https://picsum.photos/seed/t2/76/56",
    url: "https://nyganeshtemple.org",
  },
  {
    name: "శ్రీ లక్ష్మి-నారాయణ మందిరం",
    en: "Sri Lakshmi Narayana Temple, Livermore CA",
    city: "Livermore, CA",
    deity: "లక్ష్మి నారాయణ",
    desc: "A prominent Hindu temple in the Bay Area serving the Telugu and broader Hindu community with daily pujas and cultural programs.",
    img: "https://picsum.photos/seed/t3/76/56",
    url: "https://www.livermoretemple.org",
  },
  {
    name: "SVBF శ్రీ వేంకటేశ్వర మందిరం",
    en: "SVBF Sri Venkateswara Temple, Bridgewater NJ",
    city: "Bridgewater, NJ",
    deity: "వేంకటేశ్వర స్వామి",
    desc: "Sringeri Vidya Bharati Foundation temple serving NJ's Hindu community with Vedic education, cultural events and daily temple services.",
    img: "https://picsum.photos/seed/t4/76/56",
    url: "https://www.svbf.org",
  },
  {
    name: "ఓం శ్రీ సాయి బాలాజీ మందిరం",
    en: "Om Sri Sai Balaji Temple, Monroe NJ",
    city: "Monroe, NJ",
    deity: "సాయి బాలాజీ",
    desc: "Monroe Hindu Temple dedicated to Lord Venkateswara (Sai Balaji), serving as a community and cultural centre promoting arts, health, yoga and Telugu heritage.",
    img: "https://picsum.photos/seed/t5/76/56",
    url: "https://omsrisaibalajitemple.org",
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
  link: string;
}

export const RECIPES: Recipe[] = [
  {
    cat: "వేసవి పానీయాలు",
    title: "మామిడి పానకం — వేసవి కూలింగ్ డ్రింక్",
    te: "Mango Panakam summer cooler recipe",
    time: "10min",
    isNew: true,
    img: "https://picsum.photos/seed/rc10/320/240",
    link: "https://www.youtube.com/results?search_query=mango+panakam+recipe+telugu+summer",
  },
  {
    cat: "అల్పాహారం",
    title: "రవ్వ ఉపమా — 15 నిమిషాల్లో రెడీ",
    te: "Rava upma quick recipe",
    time: "15min",
    isNew: false,
    img: "https://picsum.photos/seed/rc2/320/240",
    link: "https://www.youtube.com/results?search_query=rava+upma+recipe+telugu+quick",
  },
  {
    cat: "వేసవి వంటలు",
    title: "దోసకాయ పప్పు — వేసవి స్పెషల్",
    te: "Dosakaya pappu summer special recipe",
    time: "25min",
    isNew: true,
    img: "https://picsum.photos/seed/rc11/320/240",
    link: "https://www.youtube.com/results?search_query=dosakaya+pappu+recipe+telugu",
  },
];

export interface RightsCard {
  icon: string;
  title: string;
  desc: string;
  link: string;
  linkLabel: string;
  points: string[];
  howTo: string;
  law: string;
}

export const BIG_RIGHTS: RightsCard[] = [
  {
    icon: "🗳️",
    title: "మీ ఓటు మీ శక్తి",
    desc: "ఓటు వేయడం మీ రాజ్యాంగ హక్కు. 18 ఏళ్ళు నిండిన ప్రతి పౌరుడికి ఓటు వేసే హక్కు ఉంది.",
    link: "https://voters.eci.gov.in/",
    linkLabel: "Voter Registration Portal",
    law: "Article 326, Constitution of India",
    howTo: "Aadhaar, Voter ID, లేదా మరే ఒక ప్రభుత్వ గుర్తింపు కార్డు చూపిస్తే ఓటు వేయవచ్చు. Online voter registration: voters.eci.gov.in",
    points: [
      "18 ఏళ్ళు నిండిన భారత పౌరులందరికీ ఓటు హక్కు ఉంటుంది",
      "Voter ID card లేకపోయినా 12 ప్రత్యామ్నాయ IDs తో ఓటు వేయవచ్చు",
      "Online voter registration, name correction: voters.eci.gov.in",
      "Polling booth నుండి ఎవరూ అక్రమంగా తొలగించలేరు",
      "ఓటు వేయడం వల్ల ఆఫీసు నుండి సెలవు నిరాకరించలేరు",
    ],
  },
  {
    icon: "🏥",
    title: "ఉచిత వైద్యం హక్కు",
    desc: "ప్రభుత్వ ఆసుపత్రిలో డబ్బు లేదని వైద్యం నిరాకరించే హక్కు ఏ వైద్యుడికీ లేదు.",
    link: "https://mohfw.gov.in/",
    linkLabel: "Ministry of Health Portal",
    law: "Right to Emergency Medical Treatment, Andhra Pradesh & Telangana Acts",
    howTo: "Government hospital లో admission తిరస్కరించినా, Ayushman Bharat card లేకపోయినా — 104 helpline కి call చేయండి. CMO office కి complaint ఇవ్వండి.",
    points: [
      "Emergency లో ప్రభుత్వ ఆసుపత్రి admission నిరాకరించలేదు",
      "Ayushman Bharat - PM-JAY: ₹5 lakh వరకు ఉచిత చికిత్స",
      "CGHS, ESI card holders కి empanelled hospitals లో ఉచిత వైద్యం",
      "వైద్య నిర్లక్ష్యానికి complaint: State Medical Council కి ఫిర్యాదు చేయవచ్చు",
      "Andhra Pradesh: Aarogyasri scheme — ₹2.5 lakh వరకు ఉచిత సర్జరీలు",
    ],
  },
  {
    icon: "📋",
    title: "రేషన్ కార్డ్ హక్కు",
    desc: "National Food Security Act ప్రకారం ప్రతి పేద కుటుంబానికి రేషన్ కార్డ్ రావాలి. తిరస్కరిస్తే appeal చేయవచ్చు.",
    link: "https://nfsa.gov.in/",
    linkLabel: "NFSA Portal",
    law: "National Food Security Act 2013, PDS Control Order 2015",
    howTo: "తహసీల్దార్ / MRO office లో application ఇవ్వండి. తిరస్కరిస్తే District Collector కి appeal చేయవచ్చు. Status check: nfsa.gov.in",
    points: [
      "Priority Household (PHH): 5 kg rice/wheat per person per month @ ₹2-3",
      "Antyodaya Anna Yojana (AAY): 35 kg per family per month",
      "Ration card apply చేయడానికి address proof + income certificate",
      "Fake ration cards మరియు ghost beneficiaries report చేయవచ్చు",
      "Online status check, complaints: Mee Seva / ePDS portal",
    ],
  },
  {
    icon: "⚖️",
    title: "అరెస్ట్ హక్కులు",
    desc: "అరెస్ట్ అయినప్పుడు మీకు అనేక రాజ్యాంగ హక్కులు ఉన్నాయి. వాటిని తెలుసుకోండి.",
    link: "https://nalsa.gov.in/",
    linkLabel: "NALSA Legal Aid",
    law: "Article 21, 22 of the Constitution; CrPC Section 50, 56",
    howTo: "అరెస్ట్ అయినప్పుడు: మీ పేరు + అరెస్ట్ కారణం అడగండి. Lawyer ని పంపించమని request చేయండి. NALSA helpline: 15100",
    points: [
      "అరెస్ట్ కారణం తెలుసుకునే హక్కు ఉంది (Article 22)",
      "24 గంటల్లో magistrate ముందు హాజరుపరచాలి",
      "వెంటనే lawyer ని సంప్రదించే హక్కు ఉంది",
      "తన కుటుంబానికి లేదా మిత్రునికి inform చేయమని request చేయవచ్చు",
      "Custody లో torture చేస్తే — NHRC, State Human Rights Commission కి complaint",
      "ఉచిత legal aid: NALSA helpline 15100",
    ],
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
  { icon: "🎬", title: "Pushpa 2 Earns ₹1,800 Cr Worldwide", te: "పుష్ప 2 ప్రపంచ వ్యాప్తంగా ₹1,800 కోట్లు సాధించింది", badge: "Box Office" },
  { icon: "🚀", title: "Kalki 2898-AD: Global Blockbuster", te: "కల్కి 2898-AD ప్రపంచ వ్యాప్తంగా రికార్డులు", badge: "Sci-Fi Epic" },
  { icon: "💼", title: "Satya Nadella Leads Microsoft to $3T", te: "సత్య నాదెళ్ళ నేతృత్వంలో Microsoft $3 ట్రిల్లియన్ సంస్థ", badge: "Tech Leader" },
];

export interface Festival {
  icon: string;
  name: string;
  en: string;
  date: string;
  days: number;
}

export const FESTIVALS: Festival[] = [
  { icon: "🎊", name: "అక్షయ తృతీయ", en: "Akshaya Tritiya", date: "Apr 30, 2026", days: 15 },
  { icon: "🌕", name: "బుద్ధ పూర్ణిమ", en: "Buddha Purnima", date: "May 12, 2026", days: 27 },
  { icon: "🌙", name: "ఈద్ అల్-అదా", en: "Bakrid / Eid ul-Adha", date: "Jun 7, 2026", days: 53 },
  { icon: "🌿", name: "వినాయక చవితి", en: "Vinayaka Chavithi", date: "Aug 22, 2026", days: 129 },
  { icon: "💫", name: "దసరా", en: "Dussehra", date: "Oct 2, 2026", days: 170 },
  { icon: "🪔", name: "దీపావళి", en: "Deepawali", date: "Oct 21, 2026", days: 189 },
];

export interface Weekend {
  cat: string;
  title: string;
  te: string;
  img: string;
}

export const WEEKEND: Weekend[] = [
  { cat: "Cricket", title: "IPL 2026: SRH vs MI — Sunday 7:30 PM", te: "IPL 2026: SRH vs MI — ఆదివారం సాయంత్రం", img: "https://picsum.photos/seed/wk10/320/240" },
  { cat: "Travel", title: "Summer Getaway: Horsley Hills, AP", te: "వేసవి యాత్ర — హార్స్లీ హిల్స్, ఆంధ్రప్రదేశ్", img: "https://picsum.photos/seed/wk11/320/240" },
  { cat: "OTT", title: "Top Telugu Films Releasing on OTT This Weekend", te: "ఈ వారాంతం OTT లో కొత్త తెలుగు చిత్రాలు", img: "https://picsum.photos/seed/wk12/320/240" },
];

export interface Tip {
  icon: string;
  cat: string;
  title: string;
  te: string;
}

export const TIPS: Tip[] = [
  { icon: "💰", cat: "Finance", title: "UPI Scam: ఈ 5 signs చూసి జాగ్రత్తపడండి", te: "UPI మోసాల నుండి రక్షణ" },
  { icon: "🌿", cat: "Health", title: "వేసవిలో చల్లగా ఉండటానికి 5 ఆహారాలు", te: "వేసవి ఆరోగ్య చిట్కాలు" },
  { icon: "📱", cat: "Tech", title: "WhatsApp: Privacy Settings మార్చండి", te: "WhatsApp గోప్యత సెట్టింగులు" },
  { icon: "🎓", cat: "Education", title: "NEET 2026 పరీక్ష తేదీలు విడుదల", te: "NEET 2026 నోటిఫికేషన్" },
];

export interface Reel {
  lbl: string;
  t: string;
  img: string;
}

export const REELS: Reel[] = [
  { lbl: "VIRAL", t: "IPL 2026 హైలైట్స్", img: "https://picsum.photos/seed/rl1/180/320" },
  { lbl: "TRENDING", t: "పుష్ప 2 డాన్స్ రీల్స్", img: "https://picsum.photos/seed/rl2/180/320" },
  { lbl: "NEW", t: "వేసవి వంట చిట్కాలు", img: "https://picsum.photos/seed/rl3/180/320" },
  { lbl: "HOT", t: "తెలుగు కమెడీ రీల్స్", img: "https://picsum.photos/seed/rl4/180/320" },
];

export interface ViralReel {
  id: string;
  lbl: string;
  title: string;
  channel: string;
  link: string;
  thumbnail: string;
}

// Curated top Telugu viral videos from YouTube/Instagram (not VarandaaTalkies)
export const VIRAL_REELS: ViralReel[] = [
  {
    id: "vr1",
    lbl: "🔥 VIRAL",
    title: "SRH vs MI IPL 2026 — Winning Moment",
    channel: "Star Sports Telugu",
    link: "https://www.youtube.com/results?search_query=SRH+MI+IPL+2026+highlights+telugu",
    thumbnail: "https://picsum.photos/seed/vr1/180/320",
  },
  {
    id: "vr2",
    lbl: "🎬 TRENDING",
    title: "Pushpa 2 — Flower Bro Dance Challenge",
    channel: "Trending Telugu",
    link: "https://www.youtube.com/results?search_query=pushpa+2+flower+bro+dance+viral+telugu",
    thumbnail: "https://picsum.photos/seed/vr2/180/320",
  },
  {
    id: "vr3",
    lbl: "😂 COMEDY",
    title: "పల్లెటూరి అమ్మాయి — Viral Reel",
    channel: "Telugu Memes",
    link: "https://www.youtube.com/results?search_query=pallettouri+ammayyi+comedy+reel+telugu+viral",
    thumbnail: "https://picsum.photos/seed/vr3/180/320",
  },
  {
    id: "vr4",
    lbl: "🍳 FOOD",
    title: "అమ్మ చేతి వంట — 10M Views Reel",
    channel: "Amma Vantalu",
    link: "https://www.youtube.com/results?search_query=amma+vantalu+telugu+viral+cooking+reel",
    thumbnail: "https://picsum.photos/seed/vr4/180/320",
  },
  {
    id: "vr5",
    lbl: "🎵 MUSIC",
    title: "Kalki 2898-AD — Theme Song Reel",
    channel: "Lahari Music",
    link: "https://www.youtube.com/results?search_query=kalki+2898+theme+song+reel+viral",
    thumbnail: "https://picsum.photos/seed/vr5/180/320",
  },
  {
    id: "vr6",
    lbl: "⭐ HOT",
    title: "Allu Arjun — Stylish Entry Compilation",
    channel: "Tollywood Shorts",
    link: "https://www.youtube.com/results?search_query=allu+arjun+stylish+entry+compilation+telugu+shorts",
    thumbnail: "https://picsum.photos/seed/vr6/180/320",
  },
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

// Week of Apr 14–20, 2026
export const OTT_WEEK: OTTPlatform[] = [
  {
    name: "Netflix",
    color: "#E50914",
    textColor: "#E50914",
    releases: [
      { title: "Dragon: The Bruce Lee Story (Telugu Dub)", type: "Film", language: "Telugu" },
      { title: "Retro", type: "Film", language: "Tamil/Telugu" },
      { title: "Raid 2", type: "Film", language: "Hindi" },
      { title: "Adolescence", type: "Series", language: "English" },
      { title: "The Diplomat S3", type: "Series", language: "English" },
      { title: "Running Point S1", type: "Series", language: "English" },
    ],
  },
  {
    name: "Prime Video",
    color: "#00A8E0",
    textColor: "#00A8E0",
    releases: [
      { title: "HIT: The Third Case", type: "Film", language: "Telugu" },
      { title: "Saathamindri", type: "Film", language: "Tamil" },
      { title: "Clarkson's Farm S4", type: "Series", language: "English" },
      { title: "Citadel: Diana S2", type: "Series", language: "Italian" },
      { title: "The Summer I Turned Pretty S3", type: "Series", language: "English" },
    ],
  },
  {
    name: "Jio Hotstar",
    color: "#1565C0",
    textColor: "#1565C0",
    releases: [
      { title: "Peddi", type: "Film", language: "Telugu" },
      { title: "Paradise", type: "Film", language: "Hindi" },
      { title: "Andor S2", type: "Series", language: "English" },
      { title: "Daredevil: Born Again", type: "Series", language: "English" },
      { title: "IPL 2026 Live", type: "Series", language: "Telugu/Hindi" },
    ],
  },
  {
    name: "Zee 5",
    color: "#7B2D8B",
    textColor: "#7B2D8B",
    releases: [
      { title: "Oke Oka Jeevitham 2", type: "Film", language: "Telugu" },
      { title: "Viduthalai Part 2", type: "Film", language: "Tamil" },
      { title: "Madgaon Express", type: "Film", language: "Hindi" },
      { title: "Kushi (2023)", type: "Film", language: "Telugu" },
    ],
  },
  {
    name: "Aha",
    color: "#F5C518",
    textColor: "#c49a00",
    releases: [
      { title: "Tillu Square", type: "Film", language: "Telugu" },
      { title: "Unstoppable with NBK S5 Ep.4", type: "Series", language: "Telugu" },
      { title: "Vivaha Bhojanambu Ep.5", type: "Series", language: "Telugu" },
      { title: "Aha Cricket Live", type: "Series", language: "Telugu" },
    ],
  },
  {
    name: "SUN NXT",
    color: "#FF6B00",
    textColor: "#FF6B00",
    releases: [
      { title: "Vidaamuyarchi", type: "Film", language: "Tamil" },
      { title: "Vaarisu", type: "Film", language: "Tamil" },
      { title: "Lubber Pandhu", type: "Film", language: "Tamil" },
    ],
  },
];
