import { ACHIEVEMENTS, FESTIVALS } from "../data/content";
import { Article, timeAgo } from "../hooks/useFeed";

const ICONS = ["🏆", "🌟", "🎖️", "🥇", "🎯", "✨"];

interface AchievementsSectionProps {
  articles: Article[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onArticleClick?: (article: any) => void;
}

export default function AchievementsSection({ articles, onArticleClick }: AchievementsSectionProps) {
  const liveItems = articles.filter((a) => a.category === "achievements").slice(0, 5);
  const displayItems = liveItems.length >= 2 ? liveItems : null;

  return (
    <section id="achievements" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-turmeric" />
        <h2 className="font-serif text-[24px] font-bold mr-2">Telugu Achievements</h2>
        <span className="font-te text-[14px] text-ash">తెలుగు విజయాలు</span>
      </div>

      <div className="flex flex-col gap-[10px] mb-[32px]">
        {displayItems
          ? displayItems.map((article, i) => (
            <div key={article.link}
              onClick={() => onArticleClick?.(article)}
              className="flex gap-3 items-center bg-warmWhite border border-border rounded-[8px] p-[14px_16px] cursor-pointer transition-all hover:border-turmeric hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] group">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-[20px] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8590C, #F5A623)" }}>
                {ICONS[i % ICONS.length]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold mb-0.5 transition-colors group-hover:text-saffron leading-[1.35]">{article.title}</h3>
                <p className="font-te text-[13px] text-ash">{article.titleTe}</p>
              </div>
              <span className="text-[10px] font-bold text-turmeric bg-turmeric/10 border border-turmeric/20 px-2 py-[3px] rounded-[3px] whitespace-nowrap flex-shrink-0">
                {timeAgo(article.publishedAt)}
              </span>
            </div>
          ))
          : ACHIEVEMENTS.map((ach, i) => (
            <div key={i}
              className="flex gap-3 items-center bg-warmWhite border border-border rounded-[8px] p-[14px_16px] cursor-pointer transition-all hover:border-turmeric hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] group">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-[20px] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8590C, #F5A623)" }}>
                {ach.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold mb-0.5 transition-colors group-hover:text-saffron leading-[1.35]">{ach.title}</h3>
                <p className="font-te text-[13px] text-ash">{ach.te}</p>
              </div>
              <span className="text-[10px] font-bold text-turmeric bg-turmeric/10 border border-turmeric/20 px-2 py-[3px] rounded-[3px] whitespace-nowrap flex-shrink-0">
                {ach.badge}
              </span>
            </div>
          ))
        }
      </div>

      <h3 className="font-serif text-[20px] font-bold mb-3">Upcoming Festivals <span className="font-te text-[14px] text-ash font-normal ml-1">పండుగలు</span></h3>
      <div className="flex gap-[10px] overflow-x-auto pb-1 scrollbar-hide">
        {FESTIVALS.map((fest, i) => (
          <div key={i}
            className="bg-warmWhite border border-border rounded-[8px] p-[14px_15px] min-w-[155px] flex-shrink-0 cursor-pointer text-center transition-all hover:border-saffron hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <div className="text-[30px] mb-[6px]">{fest.icon}</div>
            <div className="font-te text-[14px] font-bold mb-0.5">{fest.name}</div>
            <div className="text-[11px] text-ash mb-1">{fest.en}</div>
            <div className="text-[11px] font-semibold text-saffron mt-1">{fest.date}</div>
            <div className="text-[10px] text-ash">
              {fest.days <= 0 ? "Today! 🎉" : fest.days === 1 ? "Tomorrow" : `${fest.days} days away`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
