import { ACHIEVEMENTS, FESTIVALS } from "../data/content";
import { useFeedCategory, timeAgo } from "../hooks/useFeed";

const ICONS = ["🏆", "🌟", "🎖️", "🥇", "🎯", "✨"];

export default function AchievementsSection() {
  const { articles, loading } = useFeedCategory("achievements", 5);
  const liveItems = !loading && articles.length >= 2 ? articles : null;

  return (
    <section id="achievements" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-turmeric" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Telugu Achievements</h2>
        <span className="font-te text-[13px] text-ash">తెలుగు విజయాలు</span>
      </div>

      {/* Achievements List */}
      <div className="flex flex-col gap-[10px] mb-[32px]">
        {liveItems
          ? liveItems.map((article, i) => (
            <a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-center bg-warmWhite border border-border rounded-[5px] p-[13px_14px] cursor-pointer transition-colors hover:border-turmeric group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[18px] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8590C, #F5A623)" }}>
                {ICONS[i % ICONS.length]}
              </div>
              <div className="flex-1">
                <h3 className="text-[13.5px] font-semibold mb-0.5 transition-colors group-hover:text-saffron">{article.title}</h3>
                <p className="font-te text-[12px] text-ash">{article.titleTe}</p>
              </div>
              <span className="text-[9px] font-bold text-turmeric bg-turmeric/10 border border-turmeric/20 px-2 py-[2px] rounded-[2px] whitespace-nowrap flex-shrink-0">
                {timeAgo(article.publishedAt)}
              </span>
            </a>
          ))
          : ACHIEVEMENTS.map((ach, i) => (
            <div
              key={i}
              className="flex gap-3 items-center bg-warmWhite border border-border rounded-[5px] p-[13px_14px] cursor-pointer transition-colors hover:border-turmeric group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[18px] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8590C, #F5A623)" }}>
                {ach.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-[13.5px] font-semibold mb-0.5 transition-colors group-hover:text-saffron">{ach.title}</h3>
                <p className="font-te text-[12px] text-ash">{ach.te}</p>
              </div>
              <span className="text-[9px] font-bold text-turmeric bg-turmeric/10 border border-turmeric/20 px-2 py-[2px] rounded-[2px] whitespace-nowrap flex-shrink-0">
                {ach.badge}
              </span>
            </div>
          ))
        }
      </div>

      {/* Festival Strip */}
      <h3 className="font-serif text-[18px] font-bold mb-3">Upcoming Festivals <span className="font-te text-[13px] text-ash font-normal ml-1">పండుగలు</span></h3>
      <div className="flex gap-[9px] overflow-x-auto pb-1 scrollbar-hide">
        {FESTIVALS.map((fest, i) => (
          <div
            key={i}
            className="bg-warmWhite border border-border rounded-[4px] p-[13px_14px] min-w-[148px] flex-shrink-0 cursor-pointer text-center transition-all hover:border-saffron hover:bg-saffron/[0.02]"
          >
            <div className="text-[28px] mb-[5px]">{fest.icon}</div>
            <div className="font-te text-[13px] font-bold mb-0.5">{fest.name}</div>
            <div className="text-[9.5px] text-ash mb-1">{fest.en}</div>
            <div className="text-[10px] font-semibold text-saffron mt-1">{fest.date}</div>
            <div className="text-[9.5px] text-ash">
              {fest.days <= 0 ? "Today!" : fest.days === 1 ? "Tomorrow" : `${fest.days} days away`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
