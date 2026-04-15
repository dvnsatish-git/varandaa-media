import { HELPLINES } from "../data/content";
import { Article, timeAgo } from "../hooks/useFeed";

const FESTIVALS = [
  { name: "హనుమాన్ జయంతి",    en: "Hanuman Jayanti",  date: new Date(2026, 3, 15) },
  { name: "అక్షయ తృతీయ",      en: "Akshaya Tritiya",  date: new Date(2026, 4, 1)  },
  { name: "బుద్ధ పౌర్ణమి",    en: "Buddha Pournami",  date: new Date(2026, 4, 12) },
  { name: "కృష్ణ జన్మాష్టమి", en: "Janmashtami",      date: new Date(2026, 7, 16) },
];

function daysUntil(d: Date): number {
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.max(0, Math.ceil((d.getTime() - today.getTime()) / 86_400_000));
}
function todayDayTE(): string {
  return ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"][new Date().getDay()];
}
function todayDateStr(): string {
  const d = new Date();
  const m = ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జులై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్"];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

interface SidebarProps {
  articles?: Article[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onArticleClick?: (article: any) => void;
}

export default function Sidebar({ articles = [], onArticleClick }: SidebarProps) {
  const nextFest = FESTIVALS.find((f) => daysUntil(f.date) >= 0) ?? FESTIVALS[FESTIVALS.length - 1];
  const festDays = daysUntil(nextFest.date);
  const trending = [...articles].sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5);

  return (
    <aside className="w-full">
      {/* YouTube Channel */}
      <div className="bg-warmWhite border border-border rounded-[8px] p-[18px] mb-5">
        <h3 className="font-serif text-[19px] font-bold mb-0.5">Varandaa Talkies</h3>
        <p className="font-te text-[13px] text-ash mb-[13px]">వరండా టాకీస్ యూట్యూబ్ ఛానెల్</p>
        <a href="https://youtube.com/@VarandaaTalkies" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-saffron text-white p-[10px] rounded-[3px] font-semibold text-[12.5px] hover:bg-deep transition-colors w-full mb-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
            <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.67 12 3.67 12 3.67s-7.5 0-9.37.38A3.02 3.02 0 00.5 6.19 31.8 31.8 0 000 12a31.8 31.8 0 00.5 5.81 3.02 3.02 0 002.13 2.14c1.87.38 9.37.38 9.37.38s7.5 0 9.37-.38a3.02 3.02 0 002.13-2.14A31.8 31.8 0 0024 12a31.8 31.8 0 00-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
          </svg>
          Subscribe to Channel
        </a>
        <a href="https://youtube.com/@VarandaaTalkies/shorts" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border border-border text-charcoal p-[8px] rounded-[3px] text-[11.5px] hover:border-saffron transition-colors w-full">
          ▶ Latest Shorts & Reels
        </a>
      </div>

      {/* Today's Panchangam */}
      <div className="rounded-[5px] p-[18px] mb-5 border"
        style={{ background: "linear-gradient(135deg,#2A1000,#1A0800)", borderColor: "rgba(245,166,35,0.15)" }}>
        <div className="font-te text-[16px] font-bold text-turmeric mb-0.5">నేటి పంచాంగం</div>
        <div className="text-[10px] text-white/40 uppercase tracking-[1.5px] mb-[13px]">Today · {todayDateStr()}</div>
        <div className="flex justify-between py-[7px] border-b border-white/[0.05]">
          <span className="text-[11px] text-white/35">వారం</span>
          <span className="font-te text-[14px] text-white font-semibold">{todayDayTE()}</span>
        </div>
        <div className="flex justify-between items-center py-[7px]">
          <span className="text-[11px] text-white/35">తిథి · నక్షత్రం</span>
          <span className="text-[11px] text-white/50">drikpanchang.com ↗</span>
        </div>
        <a href="https://www.drikpanchang.com/telugu/panchang/telugu-panchangam.html" target="_blank" rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-1 w-full py-[9px] rounded-[4px] text-[12px] font-semibold text-turmeric border border-turmeric/30 hover:bg-turmeric/10 transition-colors">
          పూర్తి పంచాంగం చూడండి ↗
        </a>
      </div>

      {/* Next festival countdown */}
      <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFF3E0] border border-turmeric/30 rounded-[5px] p-[18px] mb-5 text-center">
        <div className="text-[26px] mb-[4px]">🪔</div>
        <div className="font-te text-[17px] font-bold text-night mb-0.5">{nextFest.name}</div>
        <div className="text-[12px] text-ash mb-2">
          {nextFest.en} · {nextFest.date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <div className="font-serif text-[48px] font-bold text-saffron leading-none">{festDays}</div>
        <div className="text-[12px] text-ash mt-[3px]">
          {festDays === 0 ? "Today! శుభాకాంక్షలు 🎉" : festDays === 1 ? "day to go" : "days to go"}
        </div>
      </div>

      {/* Trending Now — live from feed */}
      <div className="bg-warmWhite border border-border rounded-[8px] p-[18px] mb-5">
        <h3 className="font-serif text-[18px] font-bold mb-3">Trending Now</h3>
        {trending.length === 0 ? (
          <p className="text-[13px] text-ash">Loading…</p>
        ) : (
          <div className="flex flex-col">
            {trending.map((article, i) => (
              <div key={article.link} onClick={() => onArticleClick?.(article)}
                className="flex gap-[10px] py-[10px] border-b border-border last:border-0 last:pb-0 cursor-pointer group">
                <div className="font-serif text-[24px] font-bold text-border min-w-[24px] leading-none">{i + 1}</div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold leading-[1.35] mb-0.5 transition-colors group-hover:text-saffron line-clamp-2">{article.title}</div>
                  <div className="font-te text-[11px] text-ash">{article.titleTe || timeAgo(article.publishedAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Follow Us */}
      <div className="bg-warmWhite border border-border rounded-[8px] p-[18px] mb-5">
        <h3 className="font-serif text-[18px] font-bold mb-3">Follow Us</h3>
        <div className="flex flex-col gap-[6px]">
          {[
            { name: "YouTube",   color: "#FF0000", icon: "▶", url: "https://youtube.com/@VarandaaTalkies" },
            { name: "Instagram", color: "#E1306C", icon: "📷", url: "https://www.instagram.com/varandaatalkies" },
            { name: "Facebook",  color: "#1877F2", icon: "f",  url: "https://www.facebook.com/varandaatalkies" },
          ].map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-[6px] py-2.5 px-[6px] rounded-[4px] text-[13px] font-semibold text-white hover:opacity-85 transition-opacity"
              style={{ background: s.color }}>
              <span>{s.icon}</span><span>{s.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Helplines */}
      <div className="bg-warmWhite border border-border rounded-[8px] p-[18px]">
        <h3 className="font-serif text-[18px] font-bold mb-3">Emergency Helplines</h3>
        <div className="flex flex-col gap-[7px]">
          {HELPLINES.slice(0, 5).map((h, i) => (
            <a key={i} href={`tel:${h.num}`} className="flex items-center gap-[10px] bg-parchment rounded-[5px] p-[9px_12px] hover:bg-saffron/[0.05] transition-colors group">
              <span className="font-mono text-[16px] font-bold text-saffron min-w-[50px] group-hover:text-deep">{h.num}</span>
              <div>
                <div className="font-te text-[13px] font-bold">{h.te}</div>
                <div className="text-[11px] text-ash">{h.en}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
