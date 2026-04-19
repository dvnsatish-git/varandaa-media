import { useState, useEffect } from "react";
import { RAASHIS, TEMPLES, Temple } from "../data/content";

// ── Types ────────────────────────────────────────────────────
interface TimeSlot { ist: string; et: string; pt: string }
interface PanchangData {
  date: string;
  sunrise: TimeSlot;
  sunset:  TimeSlot;
  tithi:   { index: number; nameTe: string; nameEn: string; paksha: string; pakshaEn: string };
  masa:    string;
  rahukalam: TimeSlot;
  yamgandam: TimeSlot;
  gulikai:   TimeSlot;
  upcoming:  { date: string; name: string; en: string }[];
}

// ── Hook: fetch panchang for a given date ───────────────────
function usePanchang(dateStr: string) {
  const [data, setData]     = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/panchang?date=${dateStr}`)
      .then(r => r.json())
      .then((d: PanchangData) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [dateStr]);

  return { data, loading, error };
}

// ── Temple iframe modal ─────────────────────────────────────
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

// ── Calendar ─────────────────────────────────────────────────
const TE_MONTHS = ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జులై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్"];
const TE_DAYS   = ["ఆది","సోమ","మంగళ","బుధ","గురు","శుక్ర","శని"];

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function CalendarGrid({ selectedDate, onSelectDate }: {
  selectedDate: string;
  onSelectDate: (d: string) => void;
}) {
  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const month = viewDate.getMonth();
  const year  = viewDate.getFullYear();
  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

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
            const ds = toDateStr(year, month, d);
            const isToday    = ds === todayStr;
            const isSelected = ds === selectedDate;
            return (
              <button key={i} onClick={() => onSelectDate(ds)}
                className={[
                  "aspect-square flex items-center justify-center rounded-[3px] text-[12px] font-medium transition-colors w-full",
                  isToday    ? "cal-date-today" :
                  isSelected ? "bg-saffron/20 text-saffron border border-saffron/40" :
                               "hover:bg-saffron/[0.07]",
                ].join(" ")}>
                {d}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Panchang panel (shared for today + date picker) ──────────
function PanchangPanel({
  data,
  loading,
  error,
  compact = false,
}: {
  data: PanchangData | null;
  loading: boolean;
  error: boolean;
  compact?: boolean;
}) {
  if (loading) return (
    <div className="flex items-center justify-center h-[180px] border border-border rounded-[8px] bg-[#1A0800]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-7 h-7 rounded-full border-2 border-turmeric/40 border-t-turmeric animate-spin" />
        <p className="text-[11px] text-white/40">పంచాంగం లోడ్ అవుతోంది…</p>
      </div>
    </div>
  );
  if (error || !data) return (
    <div className="flex items-center justify-center h-[140px] border border-border rounded-[8px] bg-[#1A0800]">
      <div className="text-center">
        <p className="text-[12px] text-red-400 mb-2">పంచాంగం లోడ్ కాలేదు</p>
        <a href="https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html"
          target="_blank" rel="noopener noreferrer"
          className="text-[11px] text-turmeric hover:underline">DrikPanchang లో చూడండి ↗</a>
      </div>
    </div>
  );

  const fields = [
    { label: "తిథి",       value: data.tithi.nameTe,   sub: `${data.tithi.nameEn} · ${data.tithi.pakshaEn}`, warn: false },
    { label: "పక్షం",      value: data.tithi.paksha,   sub: data.tithi.pakshaEn,                             warn: false },
    { label: "మాసం",       value: data.masa,            sub: "Telugu Month",                                  warn: false },
    { label: "సూర్యోదయం", value: data.sunrise.ist,     sub: `ET ${data.sunrise.et} · PT ${data.sunrise.pt}`, warn: false },
    { label: "సూర్యాస్తమయం", value: data.sunset.ist,   sub: `ET ${data.sunset.et} · PT ${data.sunset.pt}`,   warn: false },
    { label: "రాహుకాలం",  value: data.rahukalam.ist,   sub: `ET ${data.rahukalam.et} · PT ${data.rahukalam.pt}`, warn: true },
    { label: "యమగండం",    value: data.yamgandam.ist,   sub: `ET ${data.yamgandam.et} · PT ${data.yamgandam.pt}`, warn: true },
    { label: "గులికై కాలం", value: data.gulikai.ist,   sub: `ET ${data.gulikai.et} · PT ${data.gulikai.pt}`,  warn: true },
  ];

  if (compact) {
    // Compact layout for date detail panel
    return (
      <div className="bg-warmWhite border border-border rounded-[8px] overflow-hidden flex flex-col">
        <div className="px-4 py-2.5 bg-[#1A0800] border-b border-turmeric/20 flex-shrink-0">
          <div className="font-te text-[12px] font-bold text-turmeric">{data.tithi.nameTe} · {data.tithi.paksha}</div>
          <div className="text-[9px] text-white/40">{data.tithi.nameEn} · {data.tithi.pakshaEn}</div>
        </div>
        <div className="flex flex-col divide-y divide-border flex-1 overflow-y-auto">
          {fields.map((f) => (
            <div key={f.label} className="px-4 py-[8px] flex items-start justify-between gap-2">
              <div className={`text-[10px] font-bold min-w-[90px] flex-shrink-0 ${f.warn ? "text-red-500" : "text-ash"}`}>{f.label}</div>
              <div className="flex-1 text-right">
                <div className="font-te text-[12px] font-semibold text-night leading-[1.3]">{f.value}</div>
                <div className="text-[8.5px] text-ash leading-[1.4]">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 bg-parchment/50 border-t border-border flex-shrink-0">
          <a href="https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html"
            target="_blank" rel="noopener noreferrer"
            className="text-[10px] text-saffron hover:underline">Nakshatra, Varjyam, Muhurtha → DrikPanchang ↗</a>
        </div>
      </div>
    );
  }

  // Full-width today's panel
  return (
    <div className="rounded-[8px] overflow-hidden border"
      style={{ background: "linear-gradient(135deg,#2A0800,#180500)", borderColor: "rgba(245,166,35,0.2)" }}>
      <div className="px-5 py-3.5 border-b flex items-center justify-between"
        style={{ borderColor: "rgba(245,166,35,0.15)" }}>
        <div>
          <div className="font-te text-[16px] font-bold text-turmeric">నేటి పంచాంగం</div>
          <div className="text-[11px] text-white/40 mt-0.5">Hyderabad · {data.masa}</div>
        </div>
        <a href="https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html"
          target="_blank" rel="noopener noreferrer"
          className="text-[11px] text-turmeric border border-turmeric/30 px-3 py-1 rounded-full hover:bg-turmeric/10 transition-colors">
          Full Panchangam ↗
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-white/[0.03]">
        {fields.map((f) => (
          <div key={f.label} className="bg-night/40 px-4 py-3 hover:bg-white/[0.04] transition-colors">
            <div className={`text-[9px] font-bold uppercase tracking-[1.5px] mb-1 ${f.warn ? "text-[#F5A623]" : "text-white/35"}`}>
              {f.label}
            </div>
            <div className="font-te text-[13px] font-bold text-white leading-[1.3]">{f.value}</div>
            <div className="text-[8px] text-white/30 mt-0.5 leading-[1.4]">{f.sub}</div>
          </div>
        ))}
      </div>
      <div className="px-5 py-2.5 text-[10px] text-white/25 text-center border-t"
        style={{ borderColor: "rgba(245,166,35,0.08)" }}>
        Sunrise/Sunset: SunCalc (accurate) · Tithi: lunar phase · Rahukalam/Yamgandam: computed from actual sunrise
        · Nakshatra, Varjyam, Muhurtha →{" "}
        <a href="https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html"
          target="_blank" rel="noopener noreferrer" className="text-turmeric hover:underline">DrikPanchang</a>
      </div>
    </div>
  );
}

// ── Upcoming festivals panel ──────────────────────────────────
function FestivalsPanel({ festivals }: { festivals: { date: string; name: string; en: string }[] }) {
  if (!festivals?.length) return null;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="rounded-[8px] border border-border overflow-hidden">
      <div className="px-4 py-2.5 bg-parchment/60 border-b border-border">
        <div className="font-te text-[13px] font-bold text-night">రాబోయే పండుగలు — Upcoming Festivals</div>
        <div className="text-[9px] text-ash mt-0.5">* = approximate lunar date · verify on DrikPanchang</div>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {festivals.map((f) => {
          const daysLeft = Math.round((new Date(f.date).getTime() - new Date(today).getTime()) / 86_400_000);
          return (
            <div key={f.date} className="px-4 py-2.5 flex items-center gap-3 hover:bg-parchment/30 transition-colors">
              <div className="text-center min-w-[44px]">
                <div className="text-[11px] font-bold text-saffron">{new Date(f.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                <div className="text-[9px] text-ash">{daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft}d`}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-te text-[13px] font-semibold text-night leading-[1.3]">{f.name}</div>
                <div className="text-[10px] text-ash">{f.en}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main SpiritualSection ────────────────────────────────────
export default function SpiritualSection() {
  const today = new Date().toISOString().slice(0, 10);
  const [activeTemple,  setActiveTemple]  = useState<Temple | null>(null);
  const [selectedDate,  setSelectedDate]  = useState<string>(today);

  const todayPanchang    = usePanchang(today);
  const selectedPanchang = usePanchang(selectedDate);

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
              { label: "రాశిఫలాలు", url: "https://www.drikpanchang.com/rashifal/rashifal.html" },
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

      {/* Raashi Grid 4×3 with inline summaries */}
      <h3 className="font-te text-[17px] font-bold mb-3">రాశిఫలాలు — Raashifalalu</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px] mb-[28px]">
        {RAASHIS.map((r) => (
          <a key={r.en} href={r.url} target="_blank" rel="noopener noreferrer"
            className="bg-warmWhite border border-border rounded-[8px] p-[14px_12px] cursor-pointer transition-all hover:-translate-y-[4px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] hover:border-turmeric text-center relative overflow-hidden group block">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-turmeric scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <div className="text-[28px] mb-[7px]">{r.sym}</div>
            <div className="font-te text-[15px] font-bold mb-0.5">{r.name}</div>
            <div className="text-[10px] text-ash uppercase tracking-[0.5px] mb-[5px]">{r.en}</div>
            <div className="text-turmeric text-[11px] mb-[8px]">{r.stars}</div>
            <div className="text-left border-t border-border pt-[8px] flex flex-col gap-[5px]">
              <p className="font-te text-[10px] text-green-700 leading-[1.5]">
                <span className="text-[9px] font-bold text-green-600 mr-0.5">✓</span>{r.summary}
              </p>
              <p className="font-te text-[10px] text-red-700 leading-[1.5]">
                <span className="text-[9px] font-bold text-red-500 mr-0.5">⚠</span>{r.caution}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Today's Panchangam — from server */}
      <h3 className="font-te text-[17px] font-bold mb-3">తెలుగు పంచాంగం — Daily Panchangam</h3>
      <div className="mb-[22px]">
        <PanchangPanel data={todayPanchang.data} loading={todayPanchang.loading} error={todayPanchang.error} />
      </div>

      {/* Upcoming Festivals */}
      {todayPanchang.data?.upcoming?.length ? (
        <div className="mb-[28px]">
          <FestivalsPanel festivals={todayPanchang.data.upcoming} />
        </div>
      ) : null}

      {/* Calendar + date panchang */}
      <h3 className="font-te text-[17px] font-bold mb-1">తెలుగు కేలండర్</h3>
      <p className="text-[11px] text-ash mb-3">తేదీ నొక్కండి — click any date to see its Panchangam</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[28px]">
        <CalendarGrid selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <PanchangPanel
          data={selectedPanchang.data}
          loading={selectedPanchang.loading}
          error={selectedPanchang.error}
          compact
        />
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
