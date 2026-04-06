import { OTT_WEEK } from "../data/content";

export default function OTTGrid() {
  return (
    <section id="ott" className="mb-[52px]">
      {/* Dark container */}
      <div className="rounded-[10px] overflow-hidden" style={{ background: "#0d0d0d", border: "2px solid #2a2a2a" }}>

        {/* Header */}
        <div className="text-center py-5 px-4" style={{ borderBottom: "1px solid #2a2a2a" }}>
          <div className="text-[9px] font-bold tracking-[3px] text-white/40 uppercase mb-1">Streaming Now</div>
          <h2 className="font-serif text-[24px] font-bold text-white tracking-wide">OTT Releases</h2>
          <div className="text-[11px] font-semibold tracking-[2px] text-white/50 uppercase">This Week</div>
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#2a2a2a" }}>
          {OTT_WEEK.map((platform) => (
            <div key={platform.name} className="p-4" style={{ background: "#0d0d0d" }}>
              {/* Platform name */}
              <div
                className="text-center font-serif font-bold text-[15px] tracking-wide mb-3 pb-2"
                style={{ color: platform.textColor, borderBottom: `1px solid ${platform.color}33` }}
              >
                {platform.name}
              </div>
              {/* Release list */}
              <ul className="space-y-[5px]">
                {platform.releases.map((r, i) => (
                  <li key={i} className="text-[11.5px] text-white/80 leading-[1.4]">
                    <span className="text-white font-medium">{r.title}</span>
                    <span className="text-white/40"> · {r.type} · {r.language}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center py-3 text-[10px] text-white/25 tracking-wide" style={{ borderTop: "1px solid #2a2a2a" }}>
          Updated weekly — includes Telugu, Hindi & International releases
        </div>
      </div>
    </section>
  );
}
