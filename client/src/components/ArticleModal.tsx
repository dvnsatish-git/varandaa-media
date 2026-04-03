import { useEffect } from "react";

interface Article {
  title?: string;
  t?: string;
  te?: string;
  tebody?: string;
  en?: string;
  img?: string;
  time?: string;
  views?: string;
  cat?: string;
  dur?: string;
  [key: string]: unknown;
}

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

function extractVideoId(url: string): string {
  return (
    url.match(/[?&]v=([^&]+)/)?.[1] ??
    url.match(/shorts\/([^?&/]+)/)?.[1] ??
    ""
  );
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!article) return null;

  const displayTitle = (article.title || article.t || "Article") as string;
  const displayTe    = (article.te || article.titleTe || "") as string;
  const displayBody  = (article.tebody || article.summaryTe || "") as string;
  const displayEn    = (article.en || article.summaryEn || article.summary || "") as string;
  const displayImg   = (article.img || article.image || `https://picsum.photos/seed/${displayTitle.slice(0, 4)}/900/400`) as string;
  const displayCat   = (article.cat || article.category || "") as string;
  const displayTime  = (article.time || "") as string;
  const displayLink  = (article.link || "") as string;

  const isYouTube = displayLink.includes("youtube.com/watch") || displayLink.includes("youtube.com/shorts");
  const videoId   = isYouTube ? extractVideoId(displayLink) : "";
  // YouTube embed: shorts use the same /embed/ URL
  const embedUrl  = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : "";

  return (
    <div
      className="fixed inset-0 bg-night/95 backdrop-blur-sm z-[500] flex items-start justify-center pt-[60px] px-4 pb-8 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-animate bg-warmWhite rounded-[8px] w-full max-w-[720px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            {displayCat && (
              <span className="bg-saffron text-white text-[8px] font-bold tracking-[1.5px] uppercase px-[8px] py-[3px] rounded-[2px]">
                {isYouTube ? "YouTube" : displayCat}
              </span>
            )}
            {displayTime && <span className="text-[11px] text-ash">{displayTime}</span>}
          </div>
          <button onClick={onClose} className="text-ash hover:text-night text-[22px] leading-none transition-colors">✕</button>
        </div>

        {/* Media — embedded YouTube player OR article image */}
        <div className="aspect-video overflow-hidden bg-charcoal">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={displayTitle}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img src={displayImg} alt={displayTitle} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="font-serif text-[26px] font-bold leading-[1.28] mb-3">{displayTitle}</h1>

          {displayTe && (
            <p className="font-te text-[17px] font-bold text-night/80 mb-4 leading-[1.55]">{displayTe}</p>
          )}

          {displayBody && (
            <div className="mb-5">
              <h3 className="font-te text-[13px] font-bold text-saffron mb-2 uppercase tracking-[1px]">తెలుగు</h3>
              <p className="font-te text-[15px] text-night leading-[1.9]">{displayBody}</p>
            </div>
          )}

          {displayEn && (
            <div className="mb-6">
              <h3 className="text-[11px] font-bold text-saffron mb-2 uppercase tracking-[1px]">English</h3>
              <p className="text-[14px] text-charcoal leading-[1.75]">{displayEn}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            {!isYouTube && displayLink && (
              <a href={displayLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-night text-white px-5 py-2.5 rounded-[4px] text-[13px] font-semibold hover:bg-charcoal transition-colors">
                🔗 Open Source ↗
              </a>
            )}
            {isYouTube && displayLink && (
              <a href={displayLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-saffron text-white px-5 py-2.5 rounded-[4px] text-[13px] font-semibold hover:bg-deep transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.67 12 3.67 12 3.67s-7.5 0-9.37.38A3.02 3.02 0 00.5 6.19 31.8 31.8 0 000 12a31.8 31.8 0 00.5 5.81 3.02 3.02 0 002.13 2.14c1.87.38 9.37.38 9.37.38s7.5 0 9.37-.38a3.02 3.02 0 002.13-2.14A31.8 31.8 0 0024 12a31.8 31.8 0 00-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
                </svg>
                Open on YouTube
              </a>
            )}
            <button
              onClick={() => navigator.share?.({ title: displayTitle, text: displayTe || displayTitle, url: displayLink || window.location.href })}
              className="flex items-center gap-2 bg-parchment border border-border text-charcoal px-5 py-2.5 rounded-[4px] text-[13px] font-semibold hover:border-saffron transition-colors">
              📤 Share
            </button>
            <button onClick={onClose} className="ml-auto flex items-center gap-1 text-[12px] text-ash hover:text-saffron transition-colors">
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
