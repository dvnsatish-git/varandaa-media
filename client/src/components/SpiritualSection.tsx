import { useState } from "react";
import { RAASHIS, TEMPLES, Temple } from "../data/content";

function TempleModal({ temple, onClose }: { temple: Temple; onClose: () => void }) {
  const [iframeBlocked, setIframeBlocked] = useState(false);

  return (
    <div
      className="fixed inset-0 bg-night/90 z-[600] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-warmWhite rounded-[8px] w-full max-w-[860px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)] flex flex-col"
        style={{ maxHeight: "90vh" }}>
        {/* Header */}
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

        {/* Description */}
        <div className="px-5 py-2.5 bg-parchment/60 border-b border-border text-[12px] text-charcoal flex-shrink-0">
          <span className="font-semibold text-saffron mr-2">🛕 {temple.deity}</span>{temple.desc}
          <span className="ml-3 text-ash">📍 {temple.en.split(",").slice(1).join(",").trim() || temple.city}</span>
        </div>

        {/* iframe or blocked fallback */}
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
          <iframe
            src={temple.url}
            title={temple.en}
            className="flex-1 w-full border-0"
            style={{ minHeight: "500px" }}
            onError={() => setIframeBlocked(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
      </div>
    </div>
  );
}

const MONTHS_TE = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జులై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"];
const DAYS_TE = ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"];

function CalendarPanel({ region }: { region: "india" | "usa" }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const festDays: number[] = []; // update with festival dates each month

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-warmWhite border border-border rounded-[5px] overflow-hidden">
      <div
        className="p-[12px_16px] flex items-center justify-between"
        style={{
          background: region === "india"
            ? "linear-gradient(135deg, #E8590C, #B84208)"
            : "linear-gradient(135deg, #1E3A5F, #0D2137)",
        }}
      >
        <div>
          <div className="font-te text-[14px] font-bold text-white">{region === "india" ? "🇮🇳 భారత్ కేలండర్" : "🇺🇸 అమెరికా కేలండర్"}</div>
          <div className="text-[9.5px] text-white/60 mt-0.5">{region === "india" ? "India Time (IST)" : "Eastern Time (ET)"}</div>
        </div>
      </div>

      <div className="flex items-center justify-between px-[14px] py-[9px] border-b border-border">
        <button onClick={prevMonth} className="border border-border text-ash w-[26px] h-[26px] rounded-[3px] text-[13px] hover:border-saffron hover:text-saffron transition-all">‹</button>
        <div className="text-center">
          <div className="font-te text-[13px] font-bold">{MONTHS_TE[month]}</div>
          <div className="text-[10px] text-ash">{year}</div>
        </div>
        <button onClick={nextMonth} className="border border-border text-ash w-[26px] h-[26px] rounded-[3px] text-[13px] hover:border-saffron hover:text-saffron transition-all">›</button>
      </div>

      <div className="p-[10px_12px_12px]">
        <div className="grid grid-cols-7 mb-1">
          {DAYS_TE.map((d, i) => (
            <div key={d} className={`text-center text-[8.5px] font-bold py-[3px] ${i === 0 ? "text-saffron" : "text-ash"}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[1px]">
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const isToday = month === today.getMonth() && year === today.getFullYear() && d === today.getDate();
            const isFest = month === 2 && festDays.includes(d);
            return (
              <div
                key={i}
                className={`aspect-square flex flex-col items-center justify-center rounded-[3px] cursor-pointer text-[11.5px] transition-colors
                  ${isToday ? "cal-date-today" : isFest ? "cal-date-fest" : "hover:bg-saffron/[0.07]"}`}
              >
                <span className="text-[11px] font-medium leading-none">{d}</span>
                {isFest && !isToday && <span className="w-[3px] h-[3px] bg-turmeric rounded-full mt-0.5" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SpiritualSection() {
  const [activeTemple, setActiveTemple] = useState<Temple | null>(null);

  return (
    <section id="spiritual" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-spirit" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Spiritual & Calendar</h2>
        <span className="font-te text-[13px] text-ash">ఆధ్యాత్మికం & పంచాంగం</span>
      </div>

      {/* Banner */}
      <div
        className="rounded-[6px] p-[22px_26px] flex items-center gap-5 mb-[22px] border"
        style={{ background: "linear-gradient(135deg,#3D0C0C,#1A0A00)", borderColor: "rgba(245,166,35,0.15)" }}
      >
        <div className="text-[50px] opacity-20 flex-shrink-0">🕉️</div>
        <div>
          <div className="font-te text-[20px] font-black text-white mb-0.5">రోజువారి రాశిఫలాలు</div>
          <div className="font-serif text-[14px] text-white/50 italic mb-3">Daily Horoscope — Raashifalalu</div>
          <div className="flex gap-[7px] flex-wrap">
            {[
              { label: "రాశిఫలాలు", url: "https://www.eenadu.net/rashifal" },
              { label: "పంచాంగం",   url: "https://www.eenadu.net/panchangam" },
              { label: "గుడి వేళలు", url: "https://tirumala.org/darshan-details/" },
              { label: "ముహూర్తాలు", url: "https://www.prokerala.com/muhurat/" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-[13px] py-[5px] rounded-[20px] text-[11px] font-semibold border border-turmeric/30 text-turmeric bg-turmeric/[0.08] hover:bg-turmeric hover:text-night transition-all"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Raashi Grid 4x3 */}
      <h3 className="font-te text-[16px] font-bold mb-3">రాశిఫలాలు — Raashifalalu</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px] mb-[22px]">
        {RAASHIS.map((r) => (
          <a
            key={r.en}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-warmWhite border border-border rounded-[5px] p-[14px_12px] cursor-pointer transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-turmeric text-center relative overflow-hidden group block"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-turmeric scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <div className="text-[26px] mb-[6px]">{r.sym}</div>
            <div className="font-te text-[15px] font-bold mb-0.5">{r.name}</div>
            <div className="text-[9.5px] text-ash uppercase tracking-[0.5px] mb-[5px]">{r.en}</div>
            <div className="text-turmeric text-[11px]">{r.stars}</div>
          </a>
        ))}
      </div>

      {/* Calendar Dual */}
      <h3 className="font-te text-[16px] font-bold mb-3">తెలుగు కేలండర్</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[22px]">
        <CalendarPanel region="india" />
        <CalendarPanel region="usa" />
      </div>

      {/* Temples */}
      <h3 className="font-te text-[16px] font-bold mb-3">అమెరికాలో తెలుగు మందిరాలు</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
        {TEMPLES.map((temple, i) => (
          <div
            key={i}
            onClick={() => setActiveTemple(temple)}
            className="flex gap-3 bg-warmWhite border border-border rounded-[5px] p-[13px] cursor-pointer hover:border-saffron hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] transition-all group"
          >
            <img src={temple.img} alt={temple.name} className="w-[76px] h-[56px] rounded-[3px] flex-shrink-0 object-cover" loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="font-te text-[13px] font-bold mb-0.5 group-hover:text-saffron transition-colors">{temple.name}</div>
              <div className="text-[10px] text-ash mb-1 leading-[1.4]">{temple.desc}</div>
              <div className="text-[9px] text-saffron font-semibold">📍 {temple.city} · Click to visit ↗</div>
            </div>
          </div>
        ))}
      </div>

      {/* Temple iframe modal */}
      {activeTemple && <TempleModal temple={activeTemple} onClose={() => setActiveTemple(null)} />}
    </section>
  );
}
