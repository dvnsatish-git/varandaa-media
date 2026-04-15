export default function Footer() {
  const year = new Date().getFullYear();

  const sectionLinks = [
    { label: "రాజకీయాలు", id: "politics" },
    { label: "వినోదం", id: "entertainment" },
    { label: "America 🇺🇸", id: "america" },
    { label: "OTT", id: "ott" },
    { label: "ఆధ్యాత్మికం", id: "spiritual" },
    { label: "రైతులు", id: "farmers" },
    { label: "Weekend", id: "weekend" },
    { label: "మీ హక్కులు", id: "everyone" },
  ];

  const quickLinks = [
    { label: "About Us", url: "https://www.youtube.com/@VarandaaTalkies/about" },
    { label: "Contact", url: "mailto:varandaatalkies@gmail.com" },
    { label: "Advertise", url: "mailto:varandaatalkies@gmail.com?subject=Advertising" },
    { label: "Privacy Policy", url: "#" },
    { label: "Terms of Use", url: "#" },
    { label: "RSS Feed", url: "/api/feed/rss" },
  ];

  const socialLinks = [
    { label: "YouTube", url: "https://youtube.com/@VarandaaTalkies", icon: "▶" },
    { label: "Facebook", url: "https://www.facebook.com/varandaatalkies", icon: "f" },
    { label: "Instagram", url: "https://www.instagram.com/varandaatalkies", icon: "📷" },
    { label: "Twitter / X", url: "https://x.com/varandaatalkies", icon: "𝕏" },
    { label: "WhatsApp Channel", url: "https://whatsapp.com/channel/varandaatalkies", icon: "💬" },
    { label: "Telegram", url: "https://t.me/varandaatalkies", icon: "✈" },
  ];

  return (
    <footer className="bg-night border-t border-white/[0.06] pt-12 pb-6 mt-8">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-saffron rounded-[5px] flex items-center justify-center font-te text-[17px] font-black text-white">వ</div>
              <div>
                <div className="font-te text-[18px] font-bold text-white">వరండా టాకీస్</div>
                <div className="text-[9px] text-turmeric tracking-[2px] uppercase">Varandaa Talkies</div>
              </div>
            </div>
            <p className="font-te text-[13px] text-white/40 leading-[1.8] mb-3">
              తెలుగు వార్తలు, సంస్కృతి మరియు కమ్యూనిటీ — భారత్ మరియు అమెరికా
            </p>
            <p className="text-[12px] text-white/30 leading-[1.7]">
              Telugu News, Culture & Community for Telugu people across India and the USA.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-[11px] font-bold text-white/40 tracking-[2px] uppercase mb-4">Sections</h4>
            <ul className="space-y-2">
              {sectionLinks.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}
                    className={`text-[13px] text-white/50 hover:text-turmeric transition-colors cursor-pointer ${s.label.match(/[\u0C00-\u0C7F]/) ? "font-te" : ""}`}
                  >{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold text-white/40 tracking-[2px] uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((q) => (
                <li key={q.label}>
                  <a
                    href={q.url}
                    target={q.url.startsWith("http") ? "_blank" : undefined}
                    rel={q.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[13px] text-white/50 hover:text-turmeric transition-colors"
                  >{q.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[11px] font-bold text-white/40 tracking-[2px] uppercase mb-4">Follow Us</h4>
            <ul className="space-y-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/50 hover:text-turmeric transition-colors flex items-center gap-2"
                  >
                    <span className="text-[12px]">{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
