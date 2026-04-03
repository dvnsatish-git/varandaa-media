import { useState } from "react";
import { TRAFFIC_DATA, TrafficRoute, TrafficAlert } from "../data/content";

const STATUS_DOT: Record<string, string> = {
  clear: "bg-[#43A047]",
  slow: "bg-[#FB8C00]",
  heavy: "bg-[#E53935]",
};

const STATUS_TEXT: Record<string, string> = {
  clear: "text-[#2E7D32]",
  slow: "text-[#E65100]",
  heavy: "text-[#C62828]",
};

const ALERT_STYLES: Record<string, string> = {
  high: "bg-[#FFEBEE] border border-[#FFCDD2]",
  medium: "bg-[#FFF3E0] border border-[#FFCC80]",
  info: "bg-[#E3F2FD] border border-[#90CAF9]",
};

export default function TrafficSection() {
  const cityKeys = Object.keys(TRAFFIC_DATA);
  const [activeCity, setActiveCity] = useState(cityKeys[0]);
  const data = TRAFFIC_DATA[activeCity];

  return (
    <section id="traffic" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-traffic" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Traffic Updates</h2>
        <span className="font-te text-[13px] text-ash">ట్రాఫిక్ వార్తలు</span>
        <span className="ml-3 inline-flex items-center gap-1 bg-[#C62828] text-white text-[9px] font-bold px-2 py-[2px] rounded-[2px] tracking-[1px]">
          <span className="blink-dot w-[5px] h-[5px] bg-white rounded-full inline-block" />
          LIVE
        </span>
      </div>

      {/* City Tabs */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {cityKeys.map((k) => (
          <button
            key={k}
            onClick={() => setActiveCity(k)}
            className={`px-[14px] py-[6px] rounded-[4px] text-[12px] font-semibold border transition-all ${
              activeCity === k
                ? "bg-traffic text-white border-traffic"
                : "bg-warmWhite text-ash border-border hover:border-traffic"
            }`}
          >
            {TRAFFIC_DATA[k].label}
          </button>
        ))}
      </div>

      {/* Route Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-[18px]">
        {data.routes.map((route: TrafficRoute, i: number) => (
          <div key={i} className="bg-warmWhite border border-border rounded-[4px] p-[13px_14px] flex gap-[10px] items-center">
            <div className={`w-[11px] h-[11px] rounded-full flex-shrink-0 ${STATUS_DOT[route.s]}`} />
            <div className="flex-1">
              <div className="font-te text-[13px] font-bold">{route.te}</div>
              <div className="text-[10.5px] text-ash">{route.en}</div>
            </div>
            <div className="text-right">
              <div className={`text-[11px] font-semibold ${STATUS_TEXT[route.s]}`}>
                {route.s === "clear" ? "Clear" : route.s === "slow" ? "Slow" : "Heavy"}
              </div>
              <div className="font-mono text-[11px] text-ash">{route.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <h3 className="font-te text-[14px] font-bold mb-2">ట్రాఫిక్ హెచ్చరికలు</h3>
      <div className="flex flex-col gap-[9px]">
        {data.alerts.map((alert: TrafficAlert, i: number) => (
          <div key={i} className={`flex gap-[11px] p-[12px_14px] rounded-[4px] cursor-pointer ${ALERT_STYLES[alert.sev]}`}>
            <span className="text-[20px] flex-shrink-0">{alert.icon}</span>
            <div>
              <div className="font-te text-[13.5px] font-bold mb-0.5">{alert.title}</div>
              <div className="font-teBody text-[12px] text-charcoal leading-[1.65]">{alert.te}</div>
              <div className="text-[9px] text-ash mt-[3px]">{alert.time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
