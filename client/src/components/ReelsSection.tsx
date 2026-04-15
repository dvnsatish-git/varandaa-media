import { useState, useEffect } from "react";

interface YTVideo {
  title: string;
  link: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor(diff / 3_600_000);
  if (d >= 1) return `${d}d ago`;
  if (h >= 1) return `${h}h ago`;
  return "Just now";
}

interface ReelsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onArticleClick?: (article: any) => void;
}

export default function ReelsSection({ onArticleClick }: ReelsSectionProps = {}) {
  const [shorts, setShorts] = useState<YTVideo[]>([]);

  useEffect(() => {
    fetch("/api/feed/youtube")
      .then((r) => r.json())
      .then((d: { videos?: YTVideo[] }) => {
        // Prefer Shorts, fall back to any videos
        const all = d.videos ?? [];
        const s = all.filter((v) => v.link.includes("/shorts/"));
        setShorts((s.length >= 2 ? s : all).slice(0, 6));
      })
      .catch(() => {});
  }, []);

  if (shorts.length === 0) return null;

  return (
    <section id="reels" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[20px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-saffron" />
        <h2 className="font-serif text-[24px] font-bold mr-2">Reels & Shorts</h2>
        <span className="font-te text-[14px] text-ash">రీల్స్</span>
        <a
          href="https://www.youtube.com/@VarandaaTalkies/shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[11px] font-semibold text-saffron hover:text-deep transition-colors"
        >
          View All →
        </a>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[10px]">
        {shorts.map((s) => (
          <div
            key={s.videoId}
            onClick={() => onArticleClick?.({
              title: s.title,
              link: s.link,
              img: s.thumbnail,
              time: timeAgo(s.publishedAt),
              cat: "YouTube",
            })}
            className="cursor-pointer group relative rounded-[6px] overflow-hidden bg-night"
            style={{ aspectRatio: "9/16" }}
          >
            <img
              src={s.thumbnail}
              alt={s.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-9 h-9 bg-saffron/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-[13px] fill-white ml-[2px]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Label + title */}
            <div className="absolute bottom-0 left-0 right-0 p-[8px]">
              <div className="text-[7.5px] font-bold text-saffron tracking-[1px] mb-[2px] uppercase">▶ Short</div>
              <div className="text-[10px] font-semibold text-white leading-[1.3] line-clamp-2">{s.title}</div>
              <div className="text-[8px] text-white/50 mt-0.5">{timeAgo(s.publishedAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
