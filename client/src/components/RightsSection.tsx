import { BIG_RIGHTS, HELPLINES } from "../data/content";

export default function RightsSection() {
  return (
    <section id="everyone" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-civic" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Your Rights</h2>
        <span className="font-te text-[13px] text-ash">మీ హక్కులు</span>
      </div>

      {/* Rights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[22px]">
        {BIG_RIGHTS.map((r, i) => (
          <div
            key={i}
            className="bg-warmWhite border-2 border-[#BBDEFB] rounded-[6px] p-[18px] cursor-pointer transition-all hover:border-civic hover:-translate-y-0.5 text-center"
          >
            <div className="text-[40px] mb-2">{r.icon}</div>
            <h3 className="font-te text-[18px] font-black text-[#0D47A1] mb-[5px]">{r.title}</h3>
            <p className="font-teBody text-[13px] text-ash leading-[1.75]">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Helpline Numbers */}
      <h3 className="font-te text-[15px] font-bold mb-3">అత్యవసర నంబర్లు</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[9px]">
        {HELPLINES.map((h, i) => (
          <div
            key={i}
            className="rounded-[5px] p-[14px_8px] text-center cursor-pointer transition-transform hover:scale-[1.03]"
            style={{ background: h.bg }}
          >
            <div className="font-mono text-[22px] font-bold text-white mb-0.5">{h.num}</div>
            <div className="font-te text-[11px] font-bold text-white mb-0.5">{h.te}</div>
            <div className="text-[9px] text-white/65">{h.en}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
