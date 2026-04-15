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

interface YouTubeSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onArticleClick?: (article: any) => void;
}

export default function YouTubeSection({ onArticleClick }: YouTubeSectionProps = {}) {
  const [videos, setVideos] = useState<YTVideo[]>([]);

  useEffect(() => {
    fetch("/api/feed/youtube")
      .then((r) => r.json())
      .then((d: { videos?: YTVideo[] }) => {
        if (d.videos?.length) setVideos(d.videos.slice(0, 2));
      })
      .catch(() => {});
  }, []);

  if (videos.length === 0) return null;

  return (
    <section id="varandaa" className="mb-[52px]">
      <div className="flex items-end pb-[10px] border-b-2 border-night mb-[16px] relative">
        <div className="absolute bottom-[-2px] left-0 w-[50px] h-[2px] bg-saffron" />
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-saffron flex-shrink-0">
            <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.67 12 3.67 12 3.67s-7.5 0-9.37.38A3.02 3.02 0 00.5 6.19 31.8 31.8 0 000 12a31.8 31.8 0 00.5 5.81 3.02 3.02 0 002.13 2.14c1.87.38 9.37.38 9.37.38s7.5 0 9.37-.38a3.02 3.02 0 002.13-2.14A31.8 31.8 0 0024 12a31.8 31.8 0 00-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
          </svg>
          <h2 className="font-serif text-[24px] font-bold">Varandaa Talkies</h2>
        </div>
        <a
          href="https://www.youtube.com/@VarandaaTalkies"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[12px] font-semibold text-saffron hover:text-deep transition-colors"
        >
          Subscribe →
        </a>
      </div>

      <div className="flex flex-col gap-[10px]">
        {videos.map((video) => (
          <div
            key={video.videoId}
            onClick={() => onArticleClick?.({
              title: video.title,
              link: video.link,
              img: video.thumbnail,
              time: timeAgo(video.publishedAt),
              cat: "YouTube",
            })}
            className="flex gap-3 bg-warmWhite border border-border rounded-[8px] overflow-hidden cursor-pointer transition-all hover:border-saffron hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] group"
          >
            <div className="relative w-[150px] flex-shrink-0 bg-[#111]">
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-saffron/90 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-[13px] fill-white ml-[2px]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1 py-3 pr-3 flex flex-col justify-center min-w-0">
              <h3 className="font-serif text-[15px] font-bold leading-[1.35] mb-1 group-hover:text-saffron transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="text-[12px] text-ash">{timeAgo(video.publishedAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
