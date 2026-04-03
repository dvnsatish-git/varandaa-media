import { OTT_DATA, OTTItem } from "../data/content";
import { Article, timeAgo } from "../hooks/useFeed";

interface OTTGridProps {
  articles: Article[];
  onArticleClick: (item: OTTItem | Article) => void;
}

export default function OTTGrid({ articles, onArticleClick }: OTTGridProps) {
  const items = articles.filter((a) => a.category === "ott").slice(0, 6);

  return (
    <section id="ott" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-teal" />
        <h2 className="font-serif text-[21px] font-bold mr-2">OTT This Week</h2>
        <span className="font-te text-[13px] text-ash">ఈ వారం OTT</span>
        <a href="#" className="ml-auto text-[11px] font-semibold text-saffron hover:text-deep transition-colors">View All →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[13px]">
        {items.length >= 2
          ? items.map((article) => (
            <div key={article.link} onClick={() => onArticleClick(article)}
              className="bg-night rounded-[5px] overflow-hidden cursor-pointer border border-white/[0.05] transition-transform hover:-translate-y-[3px] group">
              <div className="relative aspect-video overflow-hidden">
                <img src={article.image} alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                <span className="absolute top-[7px] right-[7px] text-[8.5px] font-bold px-[7px] py-[2px] rounded-[2px] tracking-[0.5px] bg-teal text-white">
                  {article.tags[0] ?? "OTT"}
                </span>
              </div>
              <div className="p-[10px_12px]">
                <h3 className="text-[13px] font-semibold text-white leading-[1.3] mb-0.5">{article.title}</h3>
                <p className="font-te text-[11px] text-white/50">{article.titleTe}</p>
                <p className="text-[9px] text-white/30 mt-1">{timeAgo(article.publishedAt)} · {article.sourceName}</p>
              </div>
            </div>
          ))
          : OTT_DATA.map((item, i) => (
            <div key={i} onClick={() => onArticleClick(item)}
              className="bg-night rounded-[5px] overflow-hidden cursor-pointer border border-white/[0.05] transition-transform hover:-translate-y-[3px] group">
              <div className="relative aspect-video overflow-hidden">
                <img src={item.img} alt={item.t} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                <span className="absolute top-[7px] right-[7px] text-[8.5px] font-bold px-[7px] py-[2px] rounded-[2px] tracking-[0.5px]"
                  style={{ background: item.platColor, color: item.platTextColor || "white" }}>
                  {item.plat}
                </span>
              </div>
              <div className="p-[10px_12px]">
                <h3 className="text-[13px] font-semibold text-white leading-[1.3] mb-0.5">{item.t}</h3>
                <p className="font-te text-[11px] text-white/50">{item.te}</p>
                <p className="text-[9px] text-white/30 mt-1">{item.meta}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}
