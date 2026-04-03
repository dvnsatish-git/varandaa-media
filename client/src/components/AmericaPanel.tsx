import { USA_DATA, USAItem } from "../data/content";
import { useFeedCategory, Article, timeAgo } from "../hooks/useFeed";

interface AmericaPanelProps {
  onArticleClick: (item: USAItem | Article) => void;
}

export default function AmericaPanel({ onArticleClick }: AmericaPanelProps) {
  const { articles, loading } = useFeedCategory("america", 6);
  const items = !loading && articles.length >= 2 ? articles : null;

  return (
    <section id="america" className="mb-[52px]">
      <div className="bg-[#0A1628] rounded-[6px] p-[22px]">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.07]">
          <span className="text-2xl">🇺🇸</span>
          <div>
            <h2 className="font-serif text-[19px] font-bold text-white">America Section</h2>
            <p className="font-te text-[12px] text-white/35">అమెరికా తెలుగు వార్తలు</p>
          </div>
          <a href="#" className="ml-auto text-[11px] font-semibold text-turmeric hover:text-white transition-colors">View All →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          {items
            ? items.map((article) => (
              <div
                key={article.link}
                onClick={() => onArticleClick(article)}
                className="bg-white/[0.04] border border-white/[0.07] rounded-[4px] p-[12px_13px] cursor-pointer transition-all hover:border-saffron/40 group"
              >
                <div className="text-[8px] font-bold text-turmeric tracking-[1.5px] uppercase mb-1">{article.sourceName}</div>
                <h3 className="text-[12.5px] font-semibold text-white leading-[1.35] mb-0.5 transition-colors group-hover:text-turmeric">{article.title}</h3>
                <p className="font-te text-[11px] text-white/40 leading-[1.5]">{article.titleTe}</p>
                <div className="text-[9px] text-white/22 mt-1">{timeAgo(article.publishedAt)}</div>
              </div>
            ))
            : USA_DATA.map((item, i) => (
              <div
                key={i}
                onClick={() => onArticleClick(item)}
                className="bg-white/[0.04] border border-white/[0.07] rounded-[4px] p-[12px_13px] cursor-pointer transition-all hover:border-saffron/40 group"
              >
                <div className="text-[8px] font-bold text-turmeric tracking-[1.5px] uppercase mb-1">{item.cat}</div>
                <h3 className="text-[12.5px] font-semibold text-white leading-[1.35] mb-0.5 transition-colors group-hover:text-turmeric">{item.t}</h3>
                <p className="font-te text-[11px] text-white/40 leading-[1.5]">{item.te}</p>
                <div className="text-[9px] text-white/22 mt-1">{item.time}</div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
