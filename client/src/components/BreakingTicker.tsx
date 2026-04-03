import { TICKER_ITEMS } from "../data/content";
import { useTicker } from "../hooks/useFeed";

export default function BreakingTicker() {
  const liveItems = useTicker();
  const items = liveItems.length > 0 ? liveItems : TICKER_ITEMS;
  const doubled = [...items, ...items];

  return (
    <div className="h-8 bg-saffron flex items-center overflow-hidden flex-shrink-0 relative z-50">
      <div className="bg-night text-turmeric text-[8.5px] font-bold tracking-[2.5px] px-4 h-full flex items-center whitespace-nowrap flex-shrink-0">
        BREAKING
      </div>
      <div className="overflow-hidden flex-1">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} className="text-[11.5px] text-white font-medium pr-11">
              <span className="text-white/55 text-[7px] mr-1">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
