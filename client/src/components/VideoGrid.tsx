import { VIDEOS, VideoItem } from "../data/content";
import { useFeed, Article, timeAgo } from "../hooks/useFeed";

const CAT_LABEL: Record<string, string> = {
  politics:      "రాజకీయాలు",
  entertainment: "వినోదం",
  ott:           "OTT",
  america:       "అమెరికా",
  spiritual:     "ఆధ్యాత్మికం",
  farmers:       "రైతు",
  achievements:  "విజయాలు",
  rights:        "హక్కులు",
  traffic:       "ట్రాఫిక్",
  general:       "వార్తలు",
};

interface VideoGridProps {
  onArticleClick: (item: VideoItem | Article) => void;
}

export default function VideoGrid({ onArticleClick }: VideoGridProps) {
  const { articles, loading } = useFeed(6);
  const items = !loading && articles.length >= 3 ? articles.slice(0, 6) : null;

  return (
    <section className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-saffron" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Latest News</h2>
        <span className="font-te text-[13px] text-ash">తాజా వార్తలు</span>
        <a href="#" className="ml-auto text-[11px] font-semibold text-saffron hover:text-deep transition-colors">View All →</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {items
          ? items.map((article) => (
            <div
              key={article.link}
              onClick={() => onArticleClick(article)}
              className="bg-warmWhite border border-border rounded-[5px] overflow-hidden cursor-pointer transition-all duration-[220ms] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.09)] group"
            >
              <div className="relative aspect-video overflow-hidden bg-[#111]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.05]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${article.sourceId}/400/225`;
                  }}
                />
                <span className="absolute top-[7px] left-[7px] bg-night/80 text-turmeric text-[8px] font-bold tracking-[1px] px-[7px] py-[2px] rounded-[2px]">
                  {CAT_LABEL[article.category] ?? article.category}
                </span>
              </div>
              <div className="p-[12px_14px]">
                <div className="text-[8.5px] font-bold text-saffron tracking-[1.5px] uppercase mb-1">
                  {article.sourceName}
                </div>
                <h3 className="font-serif text-[15px] font-bold leading-[1.35] mb-0.5 transition-colors group-hover:text-saffron">
                  {article.title}
                </h3>
                <p className="font-te text-[11px] text-ash leading-[1.5] mb-2">{article.titleTe}</p>
                <div className="flex justify-between text-[10px] text-ash">
                  <span>{timeAgo(article.publishedAt)}</span>
                  <span className="bg-parchment px-[7px] py-[2px] rounded-[10px] text-[9px]">★ {article.relevanceScore}/10</span>
                </div>
              </div>
            </div>
          ))
          : VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => onArticleClick(video)}
              className="bg-warmWhite border border-border rounded-[5px] overflow-hidden cursor-pointer transition-all duration-[220ms] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.09)] group"
            >
              <div className="relative aspect-video overflow-hidden bg-[#111]">
                <img src={video.img} alt={video.title} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[42px] h-[42px] bg-saffron/88 rounded-full flex items-center justify-center opacity-0 scale-[0.7] transition-all duration-[220ms] group-hover:opacity-100 group-hover:scale-100">
                    <svg viewBox="0 0 24 24" className="w-[14px] fill-white ml-[3px]"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <span className="absolute bottom-[6px] right-[7px] bg-black/82 text-white text-[10px] font-mono px-[6px] py-[2px] rounded-[2px]">{video.dur}</span>
                <span className="absolute top-[7px] left-[7px] bg-night/80 text-turmeric text-[8px] font-bold tracking-[1px] px-[7px] py-[2px] rounded-[2px]">{video.cat}</span>
              </div>
              <div className="p-[12px_14px]">
                <div className="text-[8.5px] font-bold text-saffron tracking-[1.5px] uppercase mb-1">{video.cat}</div>
                <h3 className="font-serif text-[15px] font-bold leading-[1.35] mb-0.5 transition-colors group-hover:text-saffron">{video.title}</h3>
                <p className="font-te text-[11px] text-ash leading-[1.5] mb-2">{video.te}</p>
                <div className="flex justify-between text-[10px] text-ash">
                  <span>{video.time}</span>
                  <span className="bg-parchment px-[7px] py-[2px] rounded-[10px] text-[9px]">👁 {video.views}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}
