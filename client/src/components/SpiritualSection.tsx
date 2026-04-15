import { useState } from "react";
import { RAASHIS, TEMPLES, Temple } from "../data/content";

// ── Temple iframe modal ─────────────────────────────────────────
function TempleModal({ temple, onClose }: { temple: Temple; onClose: () => void }) {
  const [iframeBlocked, setIframeBlocked] = useState(false);
  return (
    <div className="fixed inset-0 bg-night/90 z-[600] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-warmWhite rounded-[8px] w-full max-w-[860px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)] flex flex-col"
        style={{ maxHeight: "90vh" }}>
        <div className="flex items-center gap-3 px-5 py-3 border-b border-border flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="font-te text-[14px] font-bold text-night truncate">{temple.name}</div>
            <div className="text-[10px] text-ash truncate">{temple.en} · {temple.city}</div>
          </div>
          <a href={temple.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-saffron text-white text-[11px] font-semibold px-3 py-1.5 rounded-[4px] hover:bg-deep transition-colors flex-shrink-0">
            Open Website ↗
          </a>
          <button onClick={onClose} className="text-ash hover:text-night text-[20px] leading-none ml-1">✕</button>
        </div>
        <div className="px-5 py-2.5 bg-parchment/60 border-b border-border text-[12px] text-charcoal flex-shrink-0">
          <span className="font-semibold text-saffron mr-2">🛕 {temple.deity}</span>{temple.desc}
          <span className="ml-3 text-ash">📍 {temple.en.split(",").slice(1).join(",").trim() || temple.city}</span>
        </div>
        {iframeBlocked ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="text-[40px]">🛕</div>
            <p className="text-[13px] text-charcoal">This temple's website cannot be displayed inside the app.</p>
            <a href={temple.url} target="_blank" rel="noopener noreferrer"
              className="bg-saffron text-white px-6 py-2.5 rounded-[4px] text-[13px] font-semibold hover:bg-deep transition-colors">
              Visit {temple.en.split(",")[0]} ↗
            </a>
          </div>
        ) : (
          <iframe src={temple.url} title={temple.en} className="flex-1 w-full border-0"
            style={{ minHeight: "500px" }}
            onError={() => setIframeBlocked(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
        )}
      </div>
    </div>
  );
}

// ── Telugu panchangam data ───────────────────────────────────────
const TE_MONTHS = ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జులై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్"];
const TE_DAYS = ["ఆది","సోమ","మంగళ","బుధ","గురు","శుక్ర","శని"];
const TE_DAYS_FULL = ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"];

// Telugu month names (solar Rasi-based, approximate)
const TELUGU_MASA = ["పుష్యమి","మాఘమాసం","ఫాల్గుణమాసం","చైత్రమాసం","వైశాఖమాసం","జ్యేష్ఠమాసం","ఆషాఢమాసం","శ్రావణమాసం","భాద్రపదమాసం","ఆశ్వయుజమాసం","కార్తీకమాసం","మార్గశిరమాసం"];

// Approximate Tithi from Ugadi 2026 (March 30 = Chaitra Shukla Pratipada)
const UGADI_2026 = new Date(2026, 2, 30);
const TITHI_NAMES_TE = ["ప్రతిపద","విదియ","తదియ","చవితి","పంచమి","షష్ఠి","సప్తమి","అష్టమి","నవమి","దశమి","ఏకాదశి","ద్వాదశి","త్రయోదశి","చతుర్దశి","పౌర్ణమి","ప్రతిపద","విదియ","తదియ","చవితి","పంచమి","షష్ఠి","సప్తమి","అష్టమి","నవమి","దశమి","ఏకాదశి","ద్వాదశి","త్రయోదశి","చతుర్దశి","అమావాస్య"];
const TITHI_NAMES_EN = ["Pratipada","Vidiya","Tadiya","Chaviti","Panchami","Shashti","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Pournami","Pratipada","Vidiya","Tadiya","Chaviti","Panchami","Shashti","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Amavasya"];

// Approximate Rahukalam by weekday (start hour in 24h, relative to sunrise ~6:00)
const RAHUKALAM_BY_DAY: Record<number, string> = {
  0: "4:30 PM – 6:00 PM", 1: "7:30 AM – 9:00 AM",
  2: "3:00 PM – 4:30 PM", 3: "12:00 PM – 1:30 PM",
  4: "1:30 PM – 3:00 PM", 5: "10:30 AM – 12:00 PM",
  6: "9:00 AM – 10:30 AM",
};
const YAMGANDAM_BY_DAY: Record<number, string> = {
  0: "12:00 PM – 1:30 PM", 1: "10:30 AM – 12:00 PM",
  2: "9:00 AM – 10:30 AM", 3: "7:30 AM – 9:00 AM",
  4: "6:00 AM – 7:30 AM",  5: "3:00 PM – 4:30 PM",
  6: "1:30 PM – 3:00 PM",
};

// Approximate sunrise/sunset for Hyderabad by month
const SUNRISE_HYD = ["6:42","6:30","6:13","6:02","5:52","5:48","5:54","6:00","5:55","5:48","5:50","6:02"];
const SUNSET_HYD  = ["18:08","18:22","18:32","18:41","18:48","18:55","18:52","18:38","18:16","17:50","17:37","17:47"];

function getPanchangam() {
  const today = new Date();
  const dow = today.getDay();
  const mon = today.getMonth();
  const daysSinceUgadi = Math.floor((today.getTime() - UGADI_2026.getTime()) / 86_400_000);
  // Tithi cycles ~29.5 days; approximate with 30
  const tithiIdx = ((daysSinceUgadi % 30) + 30) % 30;
  const paksha = tithiIdx < 15 ? "శుక్ల పక్షం" : "కృష్ణ పక్షం";
  const pakshaEn = tithiIdx < 15 ? "Shukla Paksha" : "Krishna Paksha";

  return {
    dateTE: `${today.getDate()} ${TE_MONTHS[mon]} ${today.getFullYear()}`,
    dayTE: TE_DAYS_FULL[dow],
    masa: TELUGU_MASA[mon],
    tithi: TITHI_NAMES_TE[tithiIdx],
    tithiEn: TITHI_NAMES_EN[tithiIdx],
    paksha,
    pakshaEn,
    sunrise: SUNRISE_HYD[mon] + " AM",
    sunset: SUNSET_HYD[mon] + " PM",
    rahukalam: RAHUKALAM_BY_DAY[dow],
    yamgandam: YAMGANDAM_BY_DAY[dow],
  };
}

// ── Month calendar grid ─────────────────────────────────────────
function CalendarGrid() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const month = viewDate.getMonth();
  const year  = viewDate.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="bg-warmWhite border border-border rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-parchment/50">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-7 h-7 border border-border rounded-[4px] text-ash hover:border-saffron hover:text-saffron transition-all text-[14px]">‹</button>
        <div className="text-center">
          <div className="font-te text-[14px] font-bold">{TE_MONTHS[month]}</div>
          <div className="text-[11px] text-ash">{year}</div>
        </div>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-7 h-7 border border-border rounded-[4px] text-ash hover:border-saffron hover:text-saffron transition-all text-[14px]">›</button>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-7 mb-1">
          {TE_DAYS.map((d, i) => (
            <div key={d} className={`text-center text-[9px] font-bold py-[3px] ${i === 0 ? "text-saffron" : "text-ash"}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[2px]">
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const isToday = isCurrentMonth && d === today.getDate();
            return (
              <div key={i} className={`aspect-square flex items-center justify-center rounded-[3px] text-[12px] font-medium transition-colors
                ${isToday ? "cal-date-today" : "hover:bg-saffron/[0.07] cursor-pointer"}`}>
                {d}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Today's panchangam panel ─────────────────────────────────────
function PanchangamPanel() {
  const p = getPanchangam();
  const fields = [
    { label: "తిథి", value: p.tithi, sub: p.tithiEn, color: "#7B1C1C" },
    { label: "పక్షం", value: p.paksha, sub: p.pakshaEn, color: "#1565C0" },
    { label: "మాసం", value: p.masa, sub: "Telugu Month", color: "#2E7D32" },
    { label: "సూర్యోదయం", value: p.sunrise, sub: "Sunrise · Hyderabad", color: "#E65100" },
    { label: "సూర్యాస్తమయం", value: p.sunset, sub: "Sunset · Hyderabad", color: "#AD1457" },
    { label: "రాహుకాలం", value: p.rahukalam, sub: "Avoid auspicious work", color: "#C62828" },
    { label: "యమగండం", value: p.yamgandam, sub: "Inauspicious period", color: "#4527A0" },
    { label: "వారం", value: p.dayTE, sub: "Day of Week", color: "#00766C" },
  ];

  return (
    <div className="rounded-[8px] overflow-hidden border" style={{ background: "linear-gradient(135deg,#2A0800,#180500)", borderColor: "rgba(245,166,35,0.2)" }}>
      {/* Header */}
      <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(245,166,35,0.15)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-te text-[16px] font-bold text-turmeric">నేటి పంచాంగం</div>
            <div className="text-[11px] text-white/40 mt-0.5">Today · {p.dateTE}</div>
          </div>
          <a href="https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html"
            target="_blank" rel="noopener noreferrer"
            className="text-[11px] text-turmeric border border-turmeric/30 px-3 py-1 rounded-full hover:bg-turmeric/10 transition-colors">
            Full Panchangam ↗
          </a>
        </div>
      </div>
      {/* Fields grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-white/[0.03]">
        {fields.map((f) => (
          <div key={f.label} className="bg-night/40 px-4 py-3 hover:bg-white/[0.04] transition-colors">
            <div className="text-[9px] font-bold uppercase tracking-[1.5px] mb-1" style={{ color: f.color === "#C62828" || f.color === "#7B1C1C" ? "#F5A623" : "rgba(255,255,255,0.35)" }}>
              {f.label}
            </div>
            <div className="font-te text-[13px] font-bold text-white leading-[1.3]">{f.value}</div>
            <div className="text-[9px] text-white/30 mt-0.5">{f.sub}</div>
          </div>
        ))}
      </div>
      {/* Note */}
      <div className="px-5 py-2.5 text-[10px] text-white/25 text-center border-t" style={{ borderColor: "rgba(245,166,35,0.08)" }}>
        * Approximate values for Hyderabad. For exact Nakshatra, Yogam, Muhurtham — view full panchangam
      </div>
    </div>
  );
}

// ── Main SpiritualSection ────────────────────────────────────────
export default function SpiritualSection() {
  const [activeTemple, setActiveTemple] = useState<Temple | null>(null);

  return (
    <section id="spiritual" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-spirit" />
        <h2 className="font-serif text-[24px] font-bold mr-2">Spiritual & Calendar</h2>
        <span className="font-te text-[14px] text-ash">ఆధ్యాత్మికం & పంచాంగం</span>
      </div>

      {/* Banner */}
      <div className="rounded-[8px] p-[22px_26px] flex items-center gap-5 mb-[22px] border"
        style={{ background: "linear-gradient(135deg,#3D0C0C,#1A0A00)", borderColor: "rgba(245,166,35,0.15)" }}>
        <div className="text-[50px] opacity-20 flex-shrink-0">🕉️</div>
        <div>
          <div className="font-te text-[20px] font-black text-white mb-0.5">రోజువారి రాశిఫలాలు</div>
          <div className="font-serif text-[14px] text-white/50 italic mb-3">Daily Horoscope — Raashifalalu</div>
          <div className="flex gap-[7px] flex-wrap">
            {[
              { label: "రాశిఫలాలు", url: "https://www.drikpanchang.com/rashifal/" },
              { label: "పంచాంగం",   url: "https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html" },
              { label: "గుడి వేళలు", url: "https://tirumala.org/darshan-details/" },
              { label: "ముహూర్తాలు", url: "https://www.drikpanchang.com/muhurta/" },
            ].map((p) => (
              <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer"
                className="px-[13px] py-[5px] rounded-[20px] text-[12px] font-semibold border border-turmeric/30 text-turmeric bg-turmeric/[0.08] hover:bg-turmeric hover:text-night transition-all">
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Raashi Grid 4x3 */}
      <h3 className="font-te text-[17px] font-bold mb-3">రాశిఫలాలు — Raashifalalu</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px] mb-[28px]">
        {RAASHIS.map((r) => (
          <a key={r.en} href={r.url} target="_blank" rel="noopener noreferrer"
            className="bg-warmWhite border border-border rounded-[8px] p-[14px_12px] cursor-pointer transition-all hover:-translate-y-[4px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] hover:border-turmeric text-center relative overflow-hidden group block">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-turmeric scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <div className="text-[28px] mb-[7px]">{r.sym}</div>
            <div className="font-te text-[15px] font-bold mb-0.5">{r.name}</div>
            <div className="text-[10px] text-ash uppercase tracking-[0.5px] mb-[5px]">{r.en}</div>
            <div className="text-turmeric text-[11px]">{r.stars}</div>
          </a>
        ))}
      </div>

      {/* Today's Panchangam */}
      <h3 className="font-te text-[17px] font-bold mb-3">తెలుగు పంచాంగం — Daily Panchangam</h3>
      <div className="mb-[22px]">
        <PanchangamPanel />
      </div>

      {/* Calendar Grid */}
      <h3 className="font-te text-[17px] font-bold mb-3">తెలుగు కేలండర్</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[28px]">
        <CalendarGrid />
        <div className="bg-warmWhite border border-border rounded-[8px] p-4 flex flex-col gap-3">
          <div className="font-te text-[14px] font-bold text-night">సంపూర్ణ పంచాంగం వివరాలు</div>
          <p className="font-te text-[12px] text-ash leading-[1.7]">
            Tithi, Nakshatra, Sunrise, Sunset, Rahukalam, Yamgandam, Gulikai, Varjyam, Durmuhurtam మరియు మరిన్ని వివరాల కోసం:
          </p>
          <div className="flex flex-col gap-2">
            <a href="https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 bg-[#1A0800] border border-turmeric/20 rounded-[6px] hover:border-turmeric/50 transition-colors group">
              <span className="font-te text-[13px] text-turmeric">DrikPanchang — Telugu</span>
              <span className="text-white/30 group-hover:text-turmeric text-[12px]">↗</span>
            </a>
            <a href="https://omsrisaibalajitemple.org/calendar-2026.php" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 bg-[#1A0800] border border-turmeric/20 rounded-[6px] hover:border-turmeric/50 transition-colors group">
              <span className="font-te text-[13px] text-turmeric">Om Sri Sai Balaji — 2026 Calendar</span>
              <span className="text-white/30 group-hover:text-turmeric text-[12px]">↗</span>
            </a>
            <a href="https://www.venkateswaratemple.org/Annual_Calendar.pdf" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 bg-[#1A0800] border border-turmeric/20 rounded-[6px] hover:border-turmeric/50 transition-colors group">
              <span className="font-te text-[13px] text-turmeric">Venkateswara Temple — Annual PDF</span>
              <span className="text-white/30 group-hover:text-turmeric text-[12px]">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Temples */}
      <h3 className="font-te text-[17px] font-bold mb-3">అమెరికాలో తెలుగు మందిరాలు</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
        {TEMPLES.map((temple, i) => (
          <div key={i} onClick={() => setActiveTemple(temple)}
            className="flex gap-3 bg-warmWhite border border-border rounded-[8px] p-[13px] cursor-pointer hover:border-saffron hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all group">
            <img src={temple.img} alt={temple.name} className="w-[76px] h-[56px] rounded-[4px] flex-shrink-0 object-cover" loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="font-te text-[14px] font-bold mb-0.5 group-hover:text-saffron transition-colors">{temple.name}</div>
              <div className="text-[11px] text-ash mb-1 leading-[1.4]">{temple.desc}</div>
              <div className="text-[10px] text-saffron font-semibold">📍 {temple.city} · Click to visit ↗</div>
            </div>
          </div>
        ))}
      </div>

      {activeTemple && <TempleModal temple={activeTemple} onClose={() => setActiveTemple(null)} />}
    </section>
  );
}
