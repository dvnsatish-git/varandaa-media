export default function Footer() {
  const year = new Date().getFullYear();

  const sections = [
    {
      heading: "Sections",
      links: ["రాజకీయాలు", "వినోదం", "America", "OTT", "ఆధ్యాత్మికం", "రైతులు", "ట్రాఫిక్", "Weekend"],
    },
    {
      heading: "Quick Links",
      links: ["About Us", "Contact", "Advertise", "Privacy Policy", "Terms of Use", "RSS Feed"],
    },
    {
      heading: "Follow Us",
      links: ["YouTube", "Facebook", "Instagram", "Twitter/X", "WhatsApp Channel", "Telegram"],
    },
  ];

  return (
    <footer className="bg-night border-t border-white/[0.06] pt-12 pb-6 mt-8">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-saffron rounded-[5px] flex items-center justify-center font-te text-[17px] font-black text-white">
                వ
              </div>
              <div>
                <div className="font-te text-[18px] font-bold text-white">వరండా టాకీస్</div>
                <div className="text-[9px] text-turmeric tracking-[2px] uppercase">Varandaa Talkies</div>
              </div>
            </div>
            <p className="font-te text-[13px] text-white/40 leading-[1.8] mb-4">
              తెలుగు వార్తలు, సంస్కృతి మరియు కమ్యూనిటీ — భారత్ మరియు అమెరికా
            </p>
            <p className="text-[12px] text-white/30 leading-[1.7]">
              Telugu News, Culture & Community for Telugu people across India and the USA.
            </p>
          </div>

          {/* Sections */}
          {sections.map((sec) => (
            <div key={sec.heading}>
              <h4 className="text-[11px] font-bold text-white/40 tracking-[2px] uppercase mb-4">{sec.heading}</h4>
              <ul className="space-y-2">
                {sec.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={`text-[13px] text-white/50 hover:text-turmeric transition-colors ${link.match(/[\u0C00-\u0C7F]/) ? "font-te" : ""}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25 text-center">
            © {year} వరండా టాకీస్ (Varandaa Talkies). All rights reserved.
          </p>
          <p className="text-[11px] text-white/20 text-center">
            Telugu News for the Global Telugu Community
          </p>
        </div>
      </div>
    </footer>
  );
}
