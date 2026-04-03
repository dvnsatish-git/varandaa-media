import { useState, useEffect } from "react";

interface HeaderProps {
  onSearch: (q: string) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

function getEditionPill() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "🌅 MORNING · " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  if (h >= 12 && h < 17) return "☀️ AFTERNOON · " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  if (h >= 17 && h < 20) return "🌆 EVENING · " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return "🌙 NIGHT · " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function Header({ onSearch, menuOpen, setMenuOpen }: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");
  const [edition, setEdition] = useState(getEditionPill());

  useEffect(() => {
    const t = setInterval(() => setEdition(getEditionPill()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="bg-night border-b-2 border-turmeric sticky top-0 z-[200]">
      <div className="max-w-[1320px] mx-auto px-6 flex items-center h-[60px] gap-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-[10px] flex-shrink-0">
          <div className="w-10 h-10 bg-saffron rounded-[5px] flex items-center justify-center font-te text-[17px] font-black text-white flex-shrink-0">
            వ
          </div>
          <div>
            <span className="font-te text-[19px] font-bold text-white block leading-none">వరండా టాకీస్</span>
            <span className="text-[8.5px] text-turmeric tracking-[2.5px] uppercase block mt-0.5">Varandaa Talkies</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[360px] relative">
          <input
            type="text"
            placeholder="వార్తలు వెతకండి... Search news"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full bg-white/[0.08] border border-white/[0.12] text-white px-[14px] pr-9 py-2 rounded-[4px] text-[13px] font-sans outline-none focus:bg-white/[0.13] focus:border-turmeric/50 placeholder-white/30 transition-all"
          />
          <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-white/35 text-[14px] pointer-events-none">🔍</span>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-[10px]">
          {/* Edition pill */}
          <div className="bg-turmeric/[0.12] border border-turmeric/25 text-turmeric text-[9.5px] font-semibold tracking-[1px] px-[11px] py-[5px] rounded-[3px] whitespace-nowrap hidden md:block">
            {edition}
          </div>

          {/* YouTube CTA */}
          <a
            href="https://youtube.com/@VarandaaTalkies"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-[6px] bg-saffron text-white px-[15px] py-2 rounded-[3px] text-[12px] font-semibold hover:bg-deep transition-colors whitespace-nowrap flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
              <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.67 12 3.67 12 3.67s-7.5 0-9.37.38A3.02 3.02 0 00.5 6.19 31.8 31.8 0 000 12a31.8 31.8 0 00.5 5.81 3.02 3.02 0 002.13 2.14c1.87.38 9.37.38 9.37.38s7.5 0 9.37-.38a3.02 3.02 0 002.13-2.14A31.8 31.8 0 0024 12a31.8 31.8 0 00-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
            </svg>
            Subscribe
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-[6px] rounded-[3px] hover:bg-white/10 transition-colors md:hidden"
          >
            <span className={`block w-[22px] h-0.5 bg-white rounded-[1px] transition-all ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-0.5 bg-white rounded-[1px] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-0.5 bg-white rounded-[1px] transition-all ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
