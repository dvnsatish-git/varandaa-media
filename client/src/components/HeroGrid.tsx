import { HERO_ITEMS, HeroItem } from "../data/content";
import { Article, timeAgo } from "../hooks/useFeed";

const TAG_CLASSES: Record<string, string> = {
  "tag-red": "bg-saffron text-white",
  "tag-gold": "bg-turmeric text-night",
  "tag-blue": "bg-[#1565C0] text-white",
  "tag-teal": "bg-teal text-white",
  "tag-green": "bg-farmer text-white",
  "tag-dark": "bg-white/15 text-white backdrop-blur-sm",
};

const CAT_LABEL: Record<string, string> = {
  politics:      "🔴 రాజకీయాలు",
  entertainment: "వినోదం",
  ott:           "OTT",
  america:       "🇺🇸 అమెరికా",
  spiritual:     "ఆధ్యాత్మికం",
  farmers:       "రైతు",
  achievements:  "విజయాలు",
  general:       "వార్తలు",
};

function toHeroItem(a: Article, main: boolean): HeroItem {
  return {
    id: 0,
    main,
    tag: "tag-dark",
    tagLabel: CAT_LABEL[a.category] ?? "వార్తలు",
    cat: a.category,
    title: a.title,
    te: a.titleTe || a.title,
    tebody: a.summaryTe || a.summaryEn || a.summary,
    en: a.summaryEn || a.summary,
    img: a.image,
    time: timeAgo(a.publishedAt),
    views: `${(a.relevanceScore * 1200 + 800).toLocaleString()}`,
    dur: "",
    link: a.link,
  };
}

interface HeroGridProps {
  articles: Article[];
  onArticleClick: (item: HeroItem | Article) => void;
}

export default function HeroGrid({ articles, onArticleClick }: HeroGridProps) {
  const items =
    articles.length >= 3
      ? articles.slice(0, 3).map((a, i) => toHeroItem(a, i === 0))
      : HERO_ITEMS;

  const main = items.find((h) => h.main)!;
  const rest = items.filter((h) => !h.main);

  return (
    <section id="home" className="bg-night">
      <div
        className="grid gap-0.5 max-w-[1320px] mx-auto"
        style={{ gridTemplateColumns: "58fr 42fr", gridTemplateRows: "300px 190px" }}
      >
        <div
          className="relative overflow-hidden cursor-pointer group"
          style={{ gridRow: "1 / 3" }}
          onClick={() => onArticleClick(main)}
        >
          <img src={main.img} alt={main.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          <div className="hero-overlay absolute inset-0 flex flex-col justify-end p-[26px_30px]">
            <span className={`inline-block text-[8.5px] font-bold tracking-[1.8px] uppercase px-[9px] py-[3px] rounded-[2px] mb-[7px] self-start ${TAG_CLASSES[main.tag] || "bg-white/15 text-white"}`}>
              {main.tagLabel}
            </span>
            <h2 className="font-serif text-[26px] font-bold text-white leading-[1.28] mb-1.5">{main.title}</h2>
            <p className="font-te text-[14px] text-white/70 leading-[1.55] mb-2">{main.te}</p>
            <div className="flex gap-2.5 text-[10px] text-white/40">
              <span>{main.time}</span>
              <span>👁 {main.views}</span>
            </div>
          </div>
        </div>

        {rest.map((item, i) => (
          <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => onArticleClick(item)}>
            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            <div className="hero-overlay absolute inset-0 flex flex-col justify-end p-[18px_22px]">
              <span className={`inline-block text-[8.5px] font-bold tracking-[1.8px] uppercase px-[9px] py-[3px] rounded-[2px] mb-[7px] self-start ${TAG_CLASSES[item.tag] || "bg-white/15 text-white"}`}>
                {item.tagLabel}
              </span>
              <h3 className="font-serif text-[16px] font-bold text-white leading-[1.3] mb-0.5">{item.title}</h3>
              <p className="font-te text-[12px] text-white/70 leading-[1.55]">{item.te}</p>
              <div className="flex gap-2.5 text-[10px] text-white/40 mt-1">
                <span>{item.time}</span>
                <span>👁 {item.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
