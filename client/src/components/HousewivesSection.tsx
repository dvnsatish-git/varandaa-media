import { RECIPES } from "../data/content";

export default function HousewivesSection() {
  return (
    <section id="housewives" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-house" />
        <h2 className="font-serif text-[24px] font-bold mr-2">Housewives Corner</h2>
        <span className="font-te text-[14px] text-ash">ఇల్లాళ్ళ వేదిక</span>
        <a
          href="https://www.youtube.com/results?search_query=telugu+recipes+cooking"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[12px] font-semibold text-saffron hover:text-deep transition-colors"
        >View All →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
        {RECIPES.map((recipe, i) => (
          <a
            key={i}
            href={recipe.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-warmWhite border border-border rounded-[8px] overflow-hidden cursor-pointer transition-all hover:-translate-y-[4px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-house/40 group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={recipe.img}
                alt={recipe.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-[8px] right-[8px] bg-black/80 text-white text-[11px] px-[8px] py-[3px] rounded-[4px] font-medium">
                ⏱ {recipe.time}
              </span>
              {recipe.isNew && (
                <span className="absolute top-[8px] left-[8px] bg-house text-white text-[10px] font-bold px-[8px] py-[3px] rounded-[3px] tracking-wide">
                  NEW
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-saffron ml-1"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
            <div className="p-[14px_15px]">
              <div className="text-[10px] font-bold text-house tracking-[1.5px] uppercase mb-[5px]">{recipe.cat}</div>
              <h3 className="font-te text-[15px] font-bold leading-[1.4] mb-1 transition-colors group-hover:text-house">{recipe.title}</h3>
              <p className="font-teBody text-[12px] text-ash leading-[1.6]">{recipe.te}</p>
              <div className="mt-2 text-[11px] text-saffron font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Watch Recipe on YouTube ↗</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
