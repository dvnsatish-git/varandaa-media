import { HELPLINES, TRENDING } from "../data/content";

function computeUgadiDays(): number {
  const today = new Date();
  const ugadi = new Date(2026, 2, 30); // March 30, 2026
  const diff = ugadi.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const SCHEDULE = [
  { label: "Morning Show", time: "8:00 AM" },
  { label: "Midday Bulletin", time: "12:00 PM" },
  { label: "Prime Time", time: "7:00 PM" },
  { label: "Night Wrap", time: "10:00 PM" },
];

const PANCHANGAM = [
  { lbl: "తిథి", val: "తృతీయ", sub: "Tritiya" },
  { lbl: "వారం", val: "ఆదివారం", sub: "Sunday" },
  { lbl: "నక్షత్రం", val: "చిత్త", sub: "Chitra" },
  { lbl: "యోగం", val: "సిద్ధి", sub: "Siddhi" },
  { lbl: "కరణం", val: "బవ", sub: "Bava" },
];

const SOC_LINKS = [
  { name: "YouTube", color: "#FF0000", icon: "▶" },
  { name: "Facebook", color: "#1877F2", icon: "f" },
  { name: "Instagram", color: "#E1306C", icon: "📷" },
  { name: "Twitter/X", color: "#000000", icon: "𝕏" },
];

export default function Sidebar() {
  const ugadiDays = computeUgadiDays();

  return (
    <aside className="w-full">
      {/* YouTube Widget */}
      <div className="bg-warmWhite border border-border rounded-[5px] p-[18px] mb-5">
        <h3 className="font-serif text-[17px] font-bold mb-0.5">Our YouTube Channel</h3>
        <p className="font-te text-[11px] text-ash mb-[13px]">వరండా టాకీస్ యూట్యూబ్</p>
        <a
          href="https://youtube.com/@VarandaaTalkies"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-saffron text-white p-[10px] rounded-[3px] font-semibold text-[12.5px] hover:bg-deep transition-colors w-full"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.67 12 3.67 12 3.67s-7.5 0-9.37.38A3.02 3.02 0 00.5 6.19 31.8 31.8 0 000 12a31.8 31.8 0 00.5 5.81 3.02 3.02 0 002.13 2.14c1.87.38 9.37.38 9.37.38s7.5 0 9.37-.38a3.02 3.02 0 002.13-2.14A31.8 31.8 0 0024 12a31.8 31.8 0 00-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
          </svg>
          Subscribe to Channel
        </a>
        <div className="grid grid-cols-2 gap-[7px] mt-[11px]">
          {[
            { n: "142K", l: "Subscribers" },
            { n: "890+", l: "Videos" },
            { n: "4.2M", l: "Total Views" },
            { n: "Daily", l: "New Videos" },
          ].map((s) => (
            <div key={s.l} className="bg-parchment rounded-[3px] p-[9px_6px] text-center">
              <div className="font-serif text-[19px] font-bold text-saffron">{s.n}</div>
              <div className="text-[9px] text-ash">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Publishing Schedule */}
      <div className="bg-charcoal rounded-[5px] p-[18px] mb-5">
        <div className="font-te text-[15px] font-bold text-turmeric mb-0.5">ప్రసార సమయాలు</div>
        <div className="text-[9px] text-white/30 mb-3 uppercase tracking-[1.5px]">Publishing Schedule</div>
        {SCHEDULE.map((s) => (
          <div key={s.label} className="flex justify-between items-center py-2 border-b border-white/[0.05] last:border-0 last:pb-0">
            <span className="text-[11.5px] text-white/65">{s.label}</span>
            <span className="font-mono text-[11px] text-turmeric">{s.time}</span>
          </div>
        ))}
      </div>

      {/* Panchangam */}
      <div
        className="rounded-[5px] p-[18px] mb-5 border"
        style={{ background: "linear-gradient(135deg,#2A1000,#1A0800)", borderColor: "rgba(245,166,35,0.15)" }}
      >
        <div className="font-te text-[15px] font-bold text-turmeric mb-0.5">నేటి పంచాంగం</div>
        <div className="text-[9px] text-white/30 uppercase tracking-[1.5px] mb-[13px]">Today's Panchangam · March 29, 2026</div>
        {PANCHANGAM.map((p) => (
          <div key={p.lbl} className="flex justify-between py-[7px] border-b border-white/[0.05] last:border-0 last:pb-0">
            <span className="text-[10px] text-white/35">{p.lbl}</span>
            <div className="text-right">
              <div className="font-te text-[12.5px] text-white font-semibold">{p.val}</div>
              <div className="text-[9px] text-white/30">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Ugadi Countdown */}
      <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFF3E0] border border-turmeric/30 rounded-[5px] p-[18px] mb-5 text-center">
        <div className="text-[28px] mb-[5px]">🌸</div>
        <div className="font-te text-[17px] font-bold text-night mb-0.5">ఉగాది 2026</div>
        <div className="text-[10px] text-ash mb-2">Telugu New Year · March 30, 2026</div>
        <div className="font-serif text-[44px] font-bold text-saffron leading-none">{ugadiDays}</div>
        <div className="text-[10px] text-ash mt-[3px]">{ugadiDays === 0 ? "Today is Ugadi!" : ugadiDays === 1 ? "day to go" : "days to go"}</div>
      </div>

      {/* Social Links */}
      <div className="bg-warmWhite border border-border rounded-[5px] p-[18px] mb-5">
        <h3 className="font-serif text-[16px] font-bold mb-3">Follow Us</h3>
        <div className="grid grid-cols-2 gap-[6px]">
          {SOC_LINKS.map((s) => (
            <button
              key={s.name}
              className="flex items-center justify-center gap-[5px] py-2 px-[6px] rounded-[3px] text-[11px] font-semibold text-white hover:opacity-82 transition-opacity"
              style={{ background: s.color }}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Helplines */}
      <div className="bg-warmWhite border border-border rounded-[5px] p-[18px] mb-5">
        <h3 className="font-serif text-[16px] font-bold mb-3">Emergency Helplines</h3>
        <div className="flex flex-col gap-[7px]">
          {HELPLINES.slice(0, 5).map((h, i) => (
            <div key={i} className="flex items-center gap-[9px] bg-parchment rounded-[4px] p-[8px_11px]">
              <span className="font-mono text-[15px] font-bold text-saffron min-w-[46px]">{h.num}</span>
              <div>
                <div className="font-te text-[12px] font-bold">{h.te}</div>
                <div className="text-[9.5px] text-ash">{h.en}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="bg-warmWhite border border-border rounded-[5px] p-[18px]">
        <h3 className="font-serif text-[16px] font-bold mb-3">Trending Now</h3>
        <div className="flex flex-col">
          {TRENDING.map((item, i) => (
            <div key={i} className="flex gap-[9px] py-[9px] border-b border-border last:border-0 last:pb-0 cursor-pointer group">
              <div className="font-serif text-[22px] font-bold text-border min-w-[22px] leading-none">{i + 1}</div>
              <div>
                <div className="text-[12px] font-semibold leading-[1.35] mb-0.5 transition-colors group-hover:text-saffron">{item.t}</div>
                <div className="font-te text-[10px] text-ash">{item.te}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
