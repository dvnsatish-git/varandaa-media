import { RECIPES, Recipe } from "../data/content";

interface HousewivesSectionProps {
  onArticleClick: (item: Recipe) => void;
}

export default function HousewivesSection({ onArticleClick }: HousewivesSectionProps) {
  return (
    <section id="housewives" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-house" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Housewives Corner</h2>
        <span className="font-te text-[13px] text-ash">ఇల్లాళ్ళ వేదిక</span>
        <a href="#" className="ml-auto text-[11px] font-semibold text-saffron hover:text-deep transition-colors">View All →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {RECIPES.map((recipe, i) => (
          <div
            key={i}
            onClick={() => onArticleClick(recipe)}
            className="bg-warmWhite border border-border rounded-[5px] overflow-hidden cursor-pointer transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={recipe.img}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.05]"
              />
              <span className="absolute bottom-[7px] right-[7px] bg-black/75 text-white text-[10px] px-[7px] py-[2px] rounded-[3px]">
                ⏱ {recipe.time}
              </span>
              {recipe.isNew && (
                <span className="absolute top-[7px] left-[7px] bg-house text-white text-[8px] font-bold px-[7px] py-[2px] rounded-[2px]">
                  NEW
                </span>
              )}
            </div>
            <div className="p-[12px_13px]">
              <div className="text-[8px] font-bold text-house tracking-[1.5px] uppercase mb-1">{recipe.cat}</div>
              <h3 className="font-te text-[14px] font-bold leading-[1.4] mb-0.5 transition-colors group-hover:text-house">{recipe.title}</h3>
              <p className="font-teBody text-[11px] text-ash leading-[1.6]">{recipe.te}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
