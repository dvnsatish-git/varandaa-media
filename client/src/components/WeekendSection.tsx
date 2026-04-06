import { WEEKEND, TIPS, REELS, Weekend, Tip } from "../data/content";

interface WeekendSectionProps {
  onArticleClick: (item: Weekend | Tip) => void;
}

export default function WeekendSection({ onArticleClick }: WeekendSectionProps) {
  return (
    <section id="weekend" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-[#7B1FA2]" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Weekend Picks</h2>
        <span className="font-te text-[13px] text-ash">వారాంతపు ఎంపికలు</span>
      </div>

      {/* Weekend Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px] mb-[32px]">
        {WEEKEND.map((item, i) => (
          <div
            key={i}
            onClick={() => onArticleClick(item)}
            className="bg-warmWhite border border-border rounded-[5px] overflow-hidden cursor-pointer transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.05]"  loading="lazy"/>
            </div>
            <div className="p-[12px_13px]">
              <div className="text-[8px] font-bold text-[#7B1FA2] tracking-[1.5px] uppercase mb-1">{item.cat}</div>
              <h3 className="text-[13px] font-semibold leading-[1.35] mb-0.5 transition-colors group-hover:text-saffron">{item.title}</h3>
              <p className="font-te text-[11px] text-ash">{item.te}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reels Row */}
      <h3 className="font-serif text-[18px] font-bold mb-3">Reels & Shorts <span className="font-te text-[13px] text-ash font-normal ml-1">రీల్స్</span></h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[11px] mb-[32px]">
        {REELS.map((reel, i) => (
          <div key={i} className="bg-night rounded-[5px] overflow-hidden cursor-pointer aspect-[9/16] relative max-h-[190px] transition-transform hover:scale-[1.03]">
            <img src={reel.img} alt={reel.t} className="w-full h-full object-cover"  loading="lazy"/>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }}>
              <div className="absolute bottom-0 left-0 right-0 p-[9px]">
                <div className="text-[8.5px] font-bold text-turmeric tracking-[1px] mb-[3px]">{reel.lbl}</div>
                <div className="text-[11px] font-semibold text-white leading-[1.3]">{reel.t}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Row */}
      <h3 className="font-serif text-[18px] font-bold mb-3">Tips & Useful Info <span className="font-te text-[13px] text-ash font-normal ml-1">చిట్కాలు</span></h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[11px]">
        {TIPS.map((tip, i) => (
          <div
            key={i}
            onClick={() => onArticleClick(tip)}
            className="bg-warmWhite border border-border rounded-[5px] p-[15px_13px] cursor-pointer transition-all hover:border-saffron hover:-translate-y-0.5 text-center group"
          >
            <div className="text-[24px] mb-[7px]">{tip.icon}</div>
            <div className="text-[8.5px] font-bold tracking-[1.5px] uppercase text-ash mb-1">{tip.cat}</div>
            <h4 className="text-[12px] font-semibold leading-[1.35] mb-0.5 transition-colors group-hover:text-saffron">{tip.title}</h4>
            <p className="font-te text-[11px] text-ash leading-[1.5]">{tip.te}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
