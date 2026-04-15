import { USA_DATA, USAItem } from "../data/content";
import { Article, timeAgo } from "../hooks/useFeed";

interface AmericaPanelProps {
  articles: Article[];
  onArticleClick: (item: USAItem | Article) => void;
}

export default function AmericaPanel({ articles, onArticleClick }: AmericaPanelProps) {
  const items = articles.filter((a) => a.category === "america").slice(0, 6);

  return (
    <section id="america" className="mb-[52px]">
      <div className="bg-[#0A1628] rounded-[6px] p-[22px]">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.07]">
          <span className="text-2xl">🇺🇸</span>
          <div>
            <h2 className="font-serif text-[22px] font-bold text-white">America Section</h2>
            <p className="font-te text-[13px] text-white/35">అమెరికా తెలుగు వార్తలు</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          {(items.length >= 2 ? items : USA_DATA.map((d) => ({ ...d, _static: true }))).map((item, i) => {
            const isLive = "link" in item && !("_static" in item);
            if (isLive) {
              const a = item as Article;
              return (
                <div key={a.link} onClick={() => onArticleClick(a)}
                  className="bg-white/[0.05] border border-white/[0.08] rounded-[6px] p-[14px_15px] cursor-pointer transition-all hover:border-turmeric/50 hover:bg-white/[0.08] group">
                  <div className="text-[10px] font-bold text-turmeric tracking-[1.5px] uppercase mb-[5px]">{a.sourceName}</div>
                  <h3 className="text-[14px] font-semibold text-white leading-[1.4] mb-1 transition-colors group-hover:text-turmeric">{a.title}</h3>
                  <p className="font-te text-[12px] text-white/45 leading-[1.5]">{a.titleTe}</p>
                  <div className="text-[10px] text-white/25 mt-1">{timeAgo(a.publishedAt)}</div>
                </div>
              );
            }
            const s = item as USAItem & { _static?: boolean };
            return (
              <div key={i} onClick={() => onArticleClick(s as USAItem)}
                className="bg-white/[0.05] border border-white/[0.08] rounded-[6px] p-[14px_15px] cursor-pointer transition-all hover:border-turmeric/50 hover:bg-white/[0.08] group">
                <div className="text-[10px] font-bold text-turmeric tracking-[1.5px] uppercase mb-[5px]">{s.cat}</div>
                <h3 className="text-[14px] font-semibold text-white leading-[1.4] mb-1 transition-colors group-hover:text-turmeric">{s.t}</h3>
                <p className="font-te text-[12px] text-white/45 leading-[1.5]">{s.te}</p>
                <div className="text-[10px] text-white/25 mt-1">{s.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
