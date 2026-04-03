import { useState, useEffect } from "react";

const NAV_LINKS = [
  { sec: "home", en: "Home", te: "హోమ్", color: "#E8590C" },
  { sec: "politics", en: "Politics", te: "రాజకీయాలు", color: "#E53935" },
  { sec: "entertainment", en: "Entertainment", te: "వినోదం", color: "#F5A623" },
  { sec: "america", en: "America", te: "America", color: "#1976D2" },
  { sec: "ott", en: "OTT", te: "OTT", color: "#00766C" },
  { sec: "weekend", en: "Weekend", te: "Weekend", color: "#7B1FA2" },
  { sec: "spiritual", en: "Spiritual", te: "ఆధ్యాత్మికం", color: "#B71C1C" },
  { sec: "farmers", en: "Farmers", te: "రైతులు", color: "#2E7D32" },
  { sec: "housewives", en: "Housewives", te: "ఇల్లాళ్ళు", color: "#AD1457" },
  { sec: "everyone", en: "Rights", te: "హక్కులు", color: "#1565C0" },
  { sec: "traffic", en: "Traffic", te: "ట్రాఫిక్", color: "#E65100" },
  { sec: "achievements", en: "Achievements", te: "విజయాలు", color: "#F9A825" },
];

interface NavigationProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export default function Navigation({ menuOpen, setMenuOpen }: NavigationProps) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map((l) => l.sec);
      for (const sec of sections.slice().reverse()) {
        const el = document.getElementById(sec);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sec);
          return;
        }
      }
      setActive("home");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (sec: string) => {
    const el = document.getElementById(sec);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(sec);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav className="bg-charcoal border-b border-white/[0.05] sticky top-[60px] z-[190]">
        <div className="max-w-[1320px] mx-auto px-6 flex items-center overflow-x-auto scrollbar-hide">
          {NAV_LINKS.map((link, i) => (
            <div key={link.sec} className="flex items-center flex-shrink-0">
              {i === 4 && <div className="w-px h-5 bg-white/[0.07] mx-1 flex-shrink-0" />}
              <button
                onClick={() => scrollTo(link.sec)}
                className="flex flex-col items-center justify-center gap-0.5 px-[14px] h-11 whitespace-nowrap border-b-2 -mb-px transition-all"
                style={{
                  borderBottomColor: active === link.sec ? link.color : "transparent",
                  color: active === link.sec ? "white" : "rgba(255,255,255,0.45)",
                }}
              >
                <span className="text-[11.5px] font-semibold">{link.en}</span>
                <span
                  className="font-te text-[9.5px]"
                  style={{ color: active === link.sec ? "#F5A623" : "rgba(255,255,255,0.2)" }}
                >
                  {link.te}
                </span>
              </button>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {menuOpen && (
        <div className="fixed top-[60px] left-0 right-0 bottom-0 bg-night z-[195] overflow-y-auto py-4 md:hidden">
          <div className="px-5">
            <div className="text-[8.5px] font-bold text-white/30 tracking-[2px] uppercase pt-3 pb-1.5">Main Sections</div>
            {NAV_LINKS.map((link) => (
              <button
                key={link.sec}
                onClick={() => scrollTo(link.sec)}
                className="flex items-center gap-2.5 w-full py-3 border-b border-white/[0.05] hover:text-white transition-colors"
              >
                <span className="font-te text-[15px] text-white">{link.te}</span>
                <span className="text-[11px] text-white/35 mt-0.5">{link.en}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
