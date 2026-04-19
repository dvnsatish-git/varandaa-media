// ─────────────────────────────────────────────────────────────
//  Panchang Route — accurate astronomical calculations
//  Sunrise/Sunset: SunCalc (Hyderabad 17.385°N, 78.487°E)
//  Tithi:          Moon phase fraction from SunCalc
//  Rahukalam etc.: Computed from actual sunrise, not hardcoded
// ─────────────────────────────────────────────────────────────
import express from "express";
import SunCalc from "suncalc";

const router = express.Router();

// Hyderabad coordinates
const HYD_LAT = 17.3850;
const HYD_LON = 78.4867;

// ── Tithi names ──────────────────────────────────────────────
// Index 0–14 = Shukla Pratipada … Pournami
// Index 15–29 = Krishna Pratipada … Amavasya
const TITHI_TE = [
  "ప్రతిపద","విదియ","తదియ","చవితి","పంచమి","షష్ఠి","సప్తమి","అష్టమి",
  "నవమి","దశమి","ఏకాదశి","ద్వాదశి","త్రయోదశి","చతుర్దశి","పౌర్ణమి",
  "ప్రతిపద","విదియ","తదియ","చవితి","పంచమి","షష్ఠి","సప్తమి","అష్టమి",
  "నవమి","దశమి","ఏకాదశి","ద్వాదశి","త్రయోదశి","చతుర్దశి","అమావాస్య",
];
const TITHI_EN = [
  "Pratipada","Vidiya","Tadiya","Chaviti","Panchami","Shashti","Saptami","Ashtami",
  "Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Pournami",
  "Pratipada","Vidiya","Tadiya","Chaviti","Panchami","Shashti","Saptami","Ashtami",
  "Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Amavasya",
];

// Approximate Telugu Masa by Gregorian month (solar approximation)
const MASA_BY_MONTH = [
  "మాఘమాసం","ఫాల్గుణమాసం","చైత్రమాసం","వైశాఖమాసం",
  "జ్యేష్ఠమాసం","ఆషాఢమాసం","శ్రావణమాసం","భాద్రపదమాసం",
  "ఆశ్వయుజమాసం","కార్తీకమాసం","మార్గశిరమాసం","పుష్యమి",
];

// ── Time zone offsets (minutes from UTC) ────────────────────
const IST = 330;  // UTC+5:30
// US offsets depend on DST: EDT Apr–Oct, EST Nov–Mar (approximate)
function getUsOffset(date: Date): { edt: number; pdt: number } {
  const m = date.getUTCMonth() + 1; // 1-12
  const isDST = m >= 3 && m <= 10;
  return { edt: isDST ? -240 : -300, pdt: isDST ? -420 : -480 };
}

function fmtTime(date: Date, offsetMin: number): string {
  const localMs = date.getTime() + offsetMin * 60_000;
  const d = new Date(localMs);
  let h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ap}`;
}

function fmtRange(start: Date, end: Date, offsetMin: number): string {
  return `${fmtTime(start, offsetMin)} – ${fmtTime(end, offsetMin)}`;
}

// Inauspicious period parts (1-indexed, out of 8 equal daytime divisions)
// by weekday 0=Sun…6=Sat
const RAHU_PART = [8, 2, 7, 5, 6, 4, 3]; // Rahukalam
const YAMG_PART = [5, 4, 3, 2, 1, 7, 6]; // Yamgandam
const GULI_PART = [7, 6, 5, 4, 3, 2, 1]; // Gulikai Kalam

function partRange(
  sunrise: Date,
  daytimeMs: number,
  partNum: number
): { start: Date; end: Date } {
  const partMs = daytimeMs / 8;
  const startMs = sunrise.getTime() + (partNum - 1) * partMs;
  return { start: new Date(startMs), end: new Date(startMs + partMs) };
}

// ── 2026 Telugu festival calendar ───────────────────────────
// Solar festivals: exact dates.
// Lunar festivals: approximate (marked with *).
// Source for approximation: known dates from 2024–2025 + ~11-day annual shift.
const FESTIVALS_2026 = [
  // January
  { date: "2026-01-13", name: "భోగి",           en: "Bhogi (Sankranti Eve)" },
  { date: "2026-01-14", name: "మకర సంక్రాంతి",  en: "Makar Sankranti / Pongal" },
  { date: "2026-01-15", name: "కనుమ",            en: "Kanuma" },
  { date: "2026-01-16", name: "ముక్కనుమ",       en: "Mukkanuma" },
  { date: "2026-01-26", name: "గణతంత్ర దినం",   en: "Republic Day" },
  // February
  { date: "2026-02-17", name: "మహా శివరాత్రి",  en: "Maha Shivaratri*" },
  // March
  { date: "2026-03-14", name: "హోళి",            en: "Holi*" },
  { date: "2026-03-29", name: "ఉగాది",           en: "Ugadi — Telugu New Year*" },
  // April
  { date: "2026-04-14", name: "బైశాఖి",          en: "Baisakhi / Tamil New Year" },
  { date: "2026-04-17", name: "రామ నవమి",         en: "Ram Navami*" },
  { date: "2026-04-27", name: "హనుమాన్ జయంతి",  en: "Hanuman Jayanti*" },
  // May
  { date: "2026-05-09", name: "అక్షయ తృతీయ",    en: "Akshaya Tritiya*" },
  // July
  { date: "2026-07-25", name: "గురు పూర్ణిమ",   en: "Guru Purnima*" },
  // August
  { date: "2026-08-08", name: "వరలక్ష్మి వ్రతం", en: "Varalakshmi Vratam*" },
  { date: "2026-08-15", name: "స్వాతంత్ర్య దినం", en: "Independence Day" },
  { date: "2026-08-28", name: "రక్షా బంధన్",    en: "Raksha Bandhan*" },
  { date: "2026-09-03", name: "కృష్ణ జన్మాష్టమి", en: "Krishna Janmashtami*" },
  // September
  { date: "2026-09-17", name: "వినాయక చవితి",   en: "Vinayaka Chaviti (Ganesh Chaturthi)*" },
  // October
  { date: "2026-10-02", name: "గాంధీ జయంతి",    en: "Gandhi Jayanti" },
  { date: "2026-10-13", name: "నవరాత్రి",         en: "Navratri Begins*" },
  { date: "2026-10-22", name: "విజయ దశమి",       en: "Vijayadasami (Dasara)*" },
  // November
  { date: "2026-11-08", name: "దీపావళి",         en: "Deepavali / Diwali*" },
  { date: "2026-11-23", name: "కార్తీక పౌర్ణమి", en: "Karthika Pournami*" },
  // December
  { date: "2026-12-25", name: "క్రిస్మస్",       en: "Christmas" },
];

// ── Handler ──────────────────────────────────────────────────
router.get("/", (req, res) => {
  try {
    const dateStr =
      (req.query.date as string) || new Date().toISOString().slice(0, 10);
    const [year, month, day] = dateStr.split("-").map(Number);

    // Use local solar noon IST (= 06:30 UTC) for moon phase calculation
    // — avoids day-boundary flips near midnight
    const noonUtc = new Date(Date.UTC(year, month - 1, day, 6, 30, 0));
    const dayUtc  = new Date(Date.UTC(year, month - 1, day, 0,  0,  0));

    // Accurate sunrise/sunset for Hyderabad
    const times   = SunCalc.getTimes(dayUtc, HYD_LAT, HYD_LON);
    const sunrise = times.sunrise;
    const sunset  = times.sunset;
    const daytimeMs = sunset.getTime() - sunrise.getTime();

    const dow = dayUtc.getDay(); // 0=Sun … 6=Sat

    // Inauspicious period ranges (computed from real sunrise)
    const rahuR = partRange(sunrise, daytimeMs, RAHU_PART[dow]);
    const yamgR = partRange(sunrise, daytimeMs, YAMG_PART[dow]);
    const guliR = partRange(sunrise, daytimeMs, GULI_PART[dow]);

    // Moon phase → Tithi
    // SunCalc.phase:  0 = new moon (Amavasya), 0.5 = full moon (Pournami)
    // Our array index: 14 = Pournami, 29 = Amavasya
    // Mapping: raw = floor(phase * 30), index = (raw + 29) % 30
    const moon = SunCalc.getMoonIllumination(noonUtc);
    const rawPhase = Math.floor(moon.phase * 30); // 0..29
    const tithiIdx = (rawPhase + 29) % 30;        // shift so 0=Amavasya→29

    const paksha   = tithiIdx < 15 ? "శుక్ల పక్షం" : "కృష్ణ పక్షం";
    const pakshaEn = tithiIdx < 15 ? "Shukla Paksha" : "Krishna Paksha";

    const { edt, pdt } = getUsOffset(dayUtc);

    // Upcoming festivals (next 60 days from today or selected date)
    const upcoming = FESTIVALS_2026.filter(f => f.date >= dateStr).slice(0, 6);

    res.json({
      date:    dateStr,
      sunrise: { ist: fmtTime(sunrise, IST), et: fmtTime(sunrise, edt), pt: fmtTime(sunrise, pdt) },
      sunset:  { ist: fmtTime(sunset, IST),  et: fmtTime(sunset, edt),  pt: fmtTime(sunset, pdt)  },
      tithi: {
        index:  tithiIdx,
        nameTe: TITHI_TE[tithiIdx],
        nameEn: TITHI_EN[tithiIdx],
        paksha,
        pakshaEn,
      },
      masa:    MASA_BY_MONTH[month - 1],
      rahukalam: {
        ist: fmtRange(rahuR.start, rahuR.end, IST),
        et:  fmtRange(rahuR.start, rahuR.end, edt),
        pt:  fmtRange(rahuR.start, rahuR.end, pdt),
      },
      yamgandam: {
        ist: fmtRange(yamgR.start, yamgR.end, IST),
        et:  fmtRange(yamgR.start, yamgR.end, edt),
        pt:  fmtRange(yamgR.start, yamgR.end, pdt),
      },
      gulikai: {
        ist: fmtRange(guliR.start, guliR.end, IST),
        et:  fmtRange(guliR.start, guliR.end, edt),
        pt:  fmtRange(guliR.start, guliR.end, pdt),
      },
      upcoming,
      // Varjyam requires Nakshatra calculation (needs full ephemeris).
      // Link to DrikPanchang for exact Nakshatra, Varjyam, Muhurtha.
    });
  } catch (err) {
    console.error("[panchang]", err);
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
