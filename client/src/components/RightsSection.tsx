import { useState } from "react";
import { BIG_RIGHTS, HELPLINES, RightsCard } from "../data/content";

function RightsModal({ right, onClose }: { right: RightsCard; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-night/90 z-[600] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-warmWhite rounded-[10px] w-full max-w-[600px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] modal-animate"
        style={{ maxHeight: "90vh" }}>
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-border"
          style={{ background: "linear-gradient(135deg,#1565C0,#0D47A1)" }}>
          <div className="text-[44px]">{right.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="font-te text-[18px] font-bold text-white leading-tight">{right.title}</div>
            <div className="text-[11px] text-white/55 mt-0.5">{right.law}</div>
          </div>
          <button onClick={onClose}
            className="text-white/50 hover:text-white text-[22px] leading-none ml-2 flex-shrink-0">✕</button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 90px)" }}>
          {/* Intro */}
          <p className="font-te text-[14px] text-charcoal leading-[1.8] mb-5">{right.desc}</p>

          {/* Key points */}
          <div className="mb-5">
            <h3 className="font-serif text-[16px] font-bold mb-3 text-civic">మీకు ఉన్న హక్కులు</h3>
            <ul className="space-y-2">
              {right.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-civic font-bold text-[14px] mt-0.5 flex-shrink-0">✓</span>
                  <span className="font-te text-[13px] text-charcoal leading-[1.65]">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to claim */}
          <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-[8px] p-4 mb-5">
            <div className="text-[11px] font-bold text-civic uppercase tracking-wider mb-2">ఎలా claim చేయాలి</div>
            <p className="font-te text-[13px] text-[#0D47A1] leading-[1.75]">{right.howTo}</p>
          </div>

          {/* Official link */}
          <a href={right.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-civic text-white rounded-[6px] font-semibold text-[14px] hover:bg-[#0D47A1] transition-colors">
            {right.linkLabel} ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function RightsSection() {
  const [activeRight, setActiveRight] = useState<RightsCard | null>(null);

  return (
    <section id="everyone" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-civic" />
        <h2 className="font-serif text-[24px] font-bold mr-2">Your Rights</h2>
        <span className="font-te text-[14px] text-ash">మీ హక్కులు</span>
      </div>

      {/* Rights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[22px]">
        {BIG_RIGHTS.map((r, i) => (
          <div
            key={i}
            onClick={() => setActiveRight(r)}
            className="bg-warmWhite border-2 border-[#BBDEFB] rounded-[8px] p-[20px] cursor-pointer transition-all hover:border-civic hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(21,101,192,0.12)] text-center group"
          >
            <div className="text-[42px] mb-3">{r.icon}</div>
            <h3 className="font-te text-[19px] font-black text-[#0D47A1] mb-[6px] group-hover:text-civic transition-colors">{r.title}</h3>
            <p className="font-teBody text-[13px] text-ash leading-[1.75] mb-3">{r.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-civic border border-civic/30 px-4 py-1.5 rounded-full group-hover:bg-civic group-hover:text-white transition-all">
              వివరాలు చూడండి →
            </span>
          </div>
        ))}
      </div>

      {/* Helpline Numbers */}
      <h3 className="font-te text-[16px] font-bold mb-3">అత్యవసర నంబర్లు — Emergency Helplines</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[10px]">
        {HELPLINES.map((h, i) => (
          <a
            key={i}
            href={`tel:${h.num}`}
            className="rounded-[8px] p-[16px_10px] text-center cursor-pointer transition-all hover:scale-[1.04] hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] block"
            style={{ background: h.bg }}
          >
            <div className="font-mono text-[24px] font-bold text-white mb-1">{h.num}</div>
            <div className="font-te text-[12px] font-bold text-white mb-0.5">{h.te}</div>
            <div className="text-[10px] text-white/70">{h.en}</div>
            <div className="mt-2 text-[9px] text-white/50 tracking-wide">TAP TO CALL</div>
          </a>
        ))}
      </div>

      {activeRight && <RightsModal right={activeRight} onClose={() => setActiveRight(null)} />}
    </section>
  );
}
