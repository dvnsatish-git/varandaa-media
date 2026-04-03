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
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(diff / 86_400_000);
  if (d >= 1) return `${d} రోజుల క్రితం`;
  if (h >= 1) return `${h} గంటల క్రితం`;
  return "ఇప్పుడే";
}

function extractVideoId(url: string): string {
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortsMatch = url.match(/shorts\/([^?&/]+)/);
  if (shortsMatch) return shortsMatch[1];
  return "";
}

interface YouTubeSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onArticleClick?: (article: any) => void;
}

export default function YouTubeSection({ onArticleClick }: YouTubeSectionProps = {}) {
  const [videos, setVideos] = useState<YTVideo[]>([]);

  useEffect(() => {
    // Fetch via our backend to avoid CORS
    fetch("/api/feed/youtube")
      .then((r) => r.json())
      .then((d: { videos?: YTVideo[] }) => {
        if (d.videos?.length) setVideos(d.videos.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  if (videos.length === 0) return null;

  return (
    <section id="videos" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[22px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-saffron" />
        <h2 className="font-serif text-[21px] font-bold mr-2">Varandaa Talkies</h2>
        <span className="font-te text-[13px] text-ash">తాజా వీడియోలు</span>
        <a
          href="https://www.youtube.com/@VarandaaTalkies"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-saffron hover:text-deep transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-saffron">
            <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.67 12 3.67 12 3.67s-7.5 0-9.37.38A3.02 3.02 0 00.5 6.19 31.8 31.8 0 000 12a31.8 31.8 0 00.5 5.81 3.02 3.02 0 002.13 2.14c1.87.38 9.37.38 9.37.38s7.5 0 9.37-.38a3.02 3.02 0 002.13-2.14A31.8 31.8 0 0024 12a31.8 31.8 0 00-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
          </svg>
          Subscribe →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
        {videos.map((video) => (
          <div
            key={video.videoId}
            onClick={() => onArticleClick?.({ title: video.title, link: video.link, img: video.thumbnail, time: timeAgo(video.publishedAt), cat: "YouTube" })}
            className="bg-warmWhite border border-border rounded-[5px] overflow-hidden transition-all duration-[220ms] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.09)] group cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden bg-[#111]">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.05]"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[52px] h-[52px] bg-saffron/90 rounded-full flex items-center justify-center scale-[0.85] opacity-90 transition-all duration-[220ms] group-hover:scale-100 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="w-[18px] fill-white ml-[3px]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute top-[7px] left-[7px] bg-saffron text-white text-[8px] font-bold tracking-[1px] px-[7px] py-[2px] rounded-[2px]">
                ▶ YouTube
              </span>
            </div>
            <div className="p-[12px_14px]">
              <h3 className="font-serif text-[15px] font-bold leading-[1.35] mb-1 transition-colors group-hover:text-saffron line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-[10px] text-ash">
                <span>Varandaa Talkies</span>
                <span>{timeAgo(video.publishedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
