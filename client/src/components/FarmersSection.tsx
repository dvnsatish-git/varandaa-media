import { useState } from "react";
import { PRICES_HYD, PRICES_GNT, WEATHER, PriceItem } from "../data/content";

const CITY_TABS = [
  { key: "hyd", label: "హైదరాబాద్", prices: PRICES_HYD },
  { key: "gnt", label: "గుంటూరు", prices: PRICES_GNT },
  { key: "wrg", label: "వరంగల్", prices: PRICES_GNT.slice(0, 3) },
  { key: "vjw", label: "విజయవాడ", prices: PRICES_HYD.slice(0, 4) },
];

export default function FarmersSection() {
  const [activeCity, setActiveCity] = useState("hyd");
  const cityData = CITY_TABS.find((c) => c.key === activeCity)!;

  return (
    <section id="farmers" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-farmer" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Farmers Corner</h2>
        <span className="font-te text-[13px] text-ash">రైతు వేదిక</span>
      </div>

      {/* City Tabs */}
      <div className="flex gap-1.5 flex-wrap mb-[14px]">
        {CITY_TABS.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCity(c.key)}
            className={`px-3 py-[5px] rounded-[3px] text-[11px] font-semibold border transition-all ${
              activeCity === c.key
                ? "bg-farmer text-white border-farmer"
                : "bg-warmWhite text-ash border-border hover:border-farmer"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Mandi Price Table */}
      <div className="mb-[22px] overflow-x-auto">
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr>
              <th className="bg-farmer text-white px-3 py-[9px] text-left font-te text-[10.5px]">పంట</th>
              <th className="bg-farmer text-white px-3 py-[9px] text-left font-te text-[10.5px]">కనిష్ట</th>
              <th className="bg-farmer text-white px-3 py-[9px] text-left font-te text-[10.5px]">గరిష్ట</th>
              <th className="bg-farmer text-white px-3 py-[9px] text-left font-te text-[10.5px]">మోడల్</th>
              <th className="bg-farmer text-white px-3 py-[9px] text-left font-te text-[10.5px]">మార్పు</th>
            </tr>
          </thead>
          <tbody>
            {cityData.prices.map((p: PriceItem, i: number) => (
              <tr key={i} className={i % 2 === 1 ? "bg-[#E8F5E9]" : ""}>
                <td className="px-3 py-[9px] border-b border-[#DCEDC8]">
                  <span className="font-te text-[13.5px] font-bold block">{p.te}</span>
                  <span className="text-[10px] text-ash">{p.en}</span>
                </td>
                <td className="px-3 py-[9px] border-b border-[#DCEDC8] font-mono font-bold">₹{p.min}</td>
                <td className="px-3 py-[9px] border-b border-[#DCEDC8] font-mono font-bold">₹{p.max}</td>
                <td className="px-3 py-[9px] border-b border-[#DCEDC8] font-mono font-bold">₹{p.modal}</td>
                <td className="px-3 py-[9px] border-b border-[#DCEDC8]">
                  <span
                    className={`text-[11px] font-bold ${
                      p.dir === "up" ? "text-farmer" : p.dir === "dn" ? "text-[#C62828]" : "text-ash"
                    }`}
                  >
                    {p.dir === "up" ? "▲ " : p.dir === "dn" ? "▼ " : ""}{p.chg}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weather Row */}
      <h3 className="font-te text-[15px] font-bold mb-3">నేటి వాతావరణం</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[10px]">
        {WEATHER.map((w) => (
          <div key={w.city} className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-[4px] p-[13px] text-center">
            <div className="font-te text-[12px] font-bold mb-0.5">{w.city}</div>
            <div className="text-[24px] mb-0.5">{w.icon}</div>
            <div className="font-mono text-[20px] font-bold text-[#1B5E20]">{w.temp}</div>
            <div className="text-[10px] text-[#1565C0] font-semibold mt-0.5">💧 {w.rain}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
