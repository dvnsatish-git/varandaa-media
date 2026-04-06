import { useEffect, useState, useCallback } from "react";

// Browser-side article cache (survives modal close, cleared on page reload)
const articleCache = new Map<string, string>();

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

// Lightweight markdown → readable text renderer
// Handles: headers, bold, italic, links, images (removed), code blocks, horizontal rules
function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;

  const inlineRender = (text: string, key: string): React.ReactNode => {
    // Remove image syntax
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
    // Convert links [text](url) → keep text only to avoid external navigation
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    // Bold **text** or __text__
    const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/);
    return (
      <span key={key}>
        {parts.map((p, pi) =>
          p.startsWith("**") || p.startsWith("__")
            ? <strong key={pi}>{p.replace(/^\*\*|__|\*\*$|__$/g, "")}</strong>
            : p
        )}
      </span>
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // Heading
    const hMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (hMatch) {
      const level = hMatch[1].length;
      const cls = level === 1
        ? "font-serif text-[20px] font-bold mt-5 mb-2 text-night"
        : level === 2
        ? "font-serif text-[17px] font-bold mt-4 mb-1.5 text-night"
        : "text-[14px] font-semibold mt-3 mb-1 text-charcoal";
      nodes.push(<p key={i} className={cls}>{inlineRender(hMatch[2], `h-${i}`)}</p>);
      i++; continue;
    }

    // Horizontal rule
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(line.trim())) {
      nodes.push(<hr key={i} className="border-border my-4" />);
      i++; continue;
    }

    // Bullet list
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s/, ""));
        i++;
      }
      nodes.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 my-2 text-[14px] text-charcoal leading-[1.7]">
          {items.map((item, ii) => <li key={ii}>{inlineRender(item, `li-${ii}`)}</li>)}
        </ul>
      );
      continue;
    }

    // Normal paragraph
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}|[-*+]|\s*$)/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      nodes.push(
        <p key={`p-${i}`} className="text-[14px] text-charcoal leading-[1.8] mb-3">
          {inlineRender(paraLines.join(" "), `pi-${i}`)}
        </p>
      );
    }
  }
  return nodes;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [fullContent, setFullContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset reader state whenever a new article opens
  useEffect(() => {
    setFullContent(null);
    setLoadingContent(false);
    setContentError(null);
  }, [article]);

  const fetchFullContent = useCallback(async (url: string) => {
    // Serve from session cache if already fetched
    if (articleCache.has(url)) {
      setFullContent(articleCache.get(url)!);
      return;
    }

    setLoadingContent(true);
    setContentError(null);
    try {
      const res = await fetch(`/api/article?url=${encodeURIComponent(url)}`, {
        signal: AbortSignal.timeout(35_000),
      });
      const data = await res.json() as { content?: string; error?: string };
      if (data.content) {
        articleCache.set(url, data.content);
        setFullContent(data.content);
      } else {
        setContentError(data.error ?? "Could not load article.");
      }
    } catch (err) {
      const isTimeout = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
      setContentError(isTimeout
        ? "Timed out — try 'Open Source ↗' to read it directly."
        : "Could not load article.");
    } finally {
      setLoadingContent(false);
    }
  }, []);

  if (!article) return null;

  const displayTitle = (article.title || article.t || "Article") as string;
  const displayTe    = (article.te || article.titleTe || "") as string;
  const displayBody  = (article.tebody || article.summaryTe || "") as string;
  const displayEn    = (article.en || article.summaryEn || article.summary || "") as string;
  const displayImg   = (article.img || article.image || `https://picsum.photos/seed/${displayTitle.slice(0, 4)}/900/400`) as string;
  const displayCat   = (article.cat || article.category || "") as string;
  const displayTime  = (article.time || "") as string;
  const displayLink  = (article.link || "") as string;
  // realLink is the resolved publisher URL; falls back to link
  const displayRealLink = (article.realLink || article.link || "") as string;
  const isGoogleNews = displayRealLink.includes("news.google.com");

  const isYouTube = displayLink.includes("youtube.com/watch") || displayLink.includes("youtube.com/shorts");
  const videoId   = isYouTube ? extractVideoId(displayLink) : "";
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

        {/* Media */}
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
            <img src={displayImg} alt={displayTitle} className="w-full h-full object-cover"  loading="lazy"/>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="font-serif text-[26px] font-bold leading-[1.28] mb-3">{displayTitle}</h1>

          {displayTe && (
            <p className="font-te text-[17px] font-bold text-night/80 mb-4 leading-[1.55]">{displayTe}</p>
          )}

          {/* Summary section — hidden once full content is loaded */}
          {!fullContent && (
            <>
              {displayBody && (
                <div className="mb-5">
                  <h3 className="font-te text-[13px] font-bold text-saffron mb-2 uppercase tracking-[1px]">తెలుగు</h3>
                  <p className="font-te text-[15px] text-night leading-[1.9]">{displayBody}</p>
                </div>
              )}
              {displayEn && (
                <div className="mb-5">
                  <h3 className="text-[11px] font-bold text-saffron mb-2 uppercase tracking-[1px]">English Summary</h3>
                  <p className="text-[14px] text-charcoal leading-[1.75]">{displayEn}</p>
                </div>
              )}
            </>
          )}

          {/* Full article content */}
          {fullContent && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[11px] font-bold text-saffron uppercase tracking-[1px]">Full Article</h3>
                <button
                  onClick={() => setFullContent(null)}
                  className="text-[10px] text-ash hover:text-saffron transition-colors ml-auto"
                >
                  ← Show Summary
                </button>
              </div>
              <div className="border border-border rounded-[4px] p-4 bg-parchment/50 max-h-[420px] overflow-y-auto">
                {renderMarkdown(fullContent)}
              </div>
            </div>
          )}

          {/* Loading / error states */}
          {loadingContent && (
            <div className="flex items-center gap-3 py-6 justify-center text-ash mb-4">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span className="text-[13px]">Loading full article…</span>
            </div>
          )}
          {contentError && (
            <div className="text-[12px] text-ash bg-parchment border border-border rounded-[4px] px-4 py-3 mb-4">
              {contentError}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            {!isYouTube && !isGoogleNews && displayRealLink && !fullContent && !loadingContent && (
              <button
                onClick={() => fetchFullContent(displayRealLink)}
                className="flex items-center gap-2 bg-saffron text-white px-5 py-2.5 rounded-[4px] text-[13px] font-semibold hover:bg-deep transition-colors"
              >
                📖 Read Full Article
              </button>
            )}
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
