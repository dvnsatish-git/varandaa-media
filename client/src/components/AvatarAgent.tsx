// ─────────────────────────────────────────────────────────────
//  AvatarAgent — Floating AI news anchor
//  Proactively greets the user and asks what news they want.
//  Speaks results via D-ID talking head video.
//  Placement: fixed bottom-right, collapsed ↔ expanded.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import type { VoiceResult, VoiceStatus } from "../hooks/useVoice";

export type AvatarGender = "female" | "male";
type VideoPhase = "idle" | "generating" | "ready" | "error";

interface AvatarAgentProps {
  status: VoiceStatus;
  transcript: string;
  results: VoiceResult[];
  error: string;
  trialLeft: number;
  subscribed: boolean;
  avatarEnabled: boolean;
  onArticleClick: (a: VoiceResult) => void;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onSubscribe: () => void;
  onDismiss: () => void;
}

const GREETING =
  "Hello! I'm your Varandaa news anchor. What topic would you like to hear about today? " +
  "You can ask me about politics, movies, sports, cricket, or any Telugu news.";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(diff / 86_400_000);
  if (d >= 1) return `${d}d ago`;
  if (h >= 1) return `${h}h ago`;
  return "Just now";
}

export default function AvatarAgent({
  status, transcript, results, error, trialLeft, subscribed,
  avatarEnabled, onArticleClick, onStart, onStop, onReset, onSubscribe,
}: AvatarAgentProps) {
  const [open, setOpen]           = useState(false);
  const [gender, setGender]       = useState<AvatarGender>("female");
  const [videoPhase, setVideoPhase] = useState<VideoPhase>("idle");
  const [videoUrl, setVideoUrl]   = useState<string | null>(null);
  const pollRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const greetingRequested = useRef(false);

  // Generate greeting video the first time the panel opens
  useEffect(() => {
    if (open && avatarEnabled && !greetingRequested.current) {
      greetingRequested.current = true;
      generateVideo(GREETING);
    }
  }, [open, avatarEnabled]);

  // Regenerate greeting video when gender changes (only if no active search)
  useEffect(() => {
    if (open && avatarEnabled && (status === "idle" || videoPhase === "error")) {
      greetingRequested.current = true;
      generateVideo(GREETING);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);

  // Speak the result after a successful search
  useEffect(() => {
    if (status === "done" && results.length > 0 && avatarEnabled) {
      const top = results[0];
      const text =
        `Here's what I found. ${top.title}. ${top.summaryEn ?? ""}`.slice(0, 500);
      generateVideo(text);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, results]);

  function generateVideo(text: string) {
    stopPolling();
    setVideoPhase("generating");
    setVideoUrl(null);

    fetch("/api/voice/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, gender }),
    })
      .then((r) => r.json())
      .then((d: { talkId?: string }) => {
        if (!d.talkId) { setVideoPhase("error"); return; }
        startPolling(d.talkId);
      })
      .catch(() => setVideoPhase("error"));
  }

  function startPolling(talkId: string) {
    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      if (attempts > 25) { setVideoPhase("error"); stopPolling(); return; }
      try {
        const r = await fetch(`/api/voice/avatar/${talkId}`);
        const d = await r.json() as { status?: string; videoUrl?: string };
        if (d.status === "done" && d.videoUrl) {
          setVideoUrl(d.videoUrl);
          setVideoPhase("ready");
          stopPolling();
        } else if (d.status === "error" || d.status === "rejected") {
          setVideoPhase("error");
          stopPolling();
        }
      } catch {
        setVideoPhase("error");
        stopPolling();
      }
    }, 2_000);
  }

  function stopPolling() {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }

  function handleMicClick() {
    if (status === "listening") {
      onStop();
    } else {
      onReset();
      onStart();
    }
  }

  function handleClose() {
    onReset();
    setOpen(false);
  }

  // ── Collapsed launcher button ──────────────────────────────────
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[500] flex flex-col items-center gap-1 group"
        aria-label="Open Varandaa Anchor"
      >
        {/* Pulsing ring */}
        <span className="absolute w-[68px] h-[68px] rounded-full bg-saffron/20 animate-ping" />
        {/* Circle */}
        <span className="relative w-[60px] h-[60px] rounded-full bg-saffron flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform">
          <span className="text-[26px]">{gender === "female" ? "👩" : "👨"}</span>
        </span>
        <span className="relative bg-night text-white text-[9px] font-bold px-2 py-[2px] rounded-[8px] whitespace-nowrap tracking-[0.5px]">
          VARANDAA ANCHOR
        </span>
      </button>
    );
  }

  // ── Expanded agent panel ───────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-[500] w-[360px] max-w-[calc(100vw-24px)] rounded-[14px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden bg-warmWhite flex flex-col">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-night text-white">
        {/* Gender toggle */}
        <div className="flex gap-1">
          <button
            onClick={() => setGender("female")}
            className={[
              "w-7 h-7 rounded-full text-[14px] transition-all",
              gender === "female" ? "bg-saffron" : "bg-white/10 hover:bg-white/20",
            ].join(" ")}
          >👩</button>
          <button
            onClick={() => setGender("male")}
            className={[
              "w-7 h-7 rounded-full text-[14px] transition-all",
              gender === "male" ? "bg-saffron" : "bg-white/10 hover:bg-white/20",
            ].join(" ")}
          >👨</button>
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold tracking-[1px] uppercase">Varandaa Anchor</div>
          <div className="font-te text-[9px] text-white/50">వారండా యాంకర్</div>
        </div>
        {!subscribed && (
          <span className="text-[9px] font-bold bg-saffron/20 text-saffron border border-saffron/40 px-1.5 py-[2px] rounded-[4px]">
            {trialLeft} free
          </span>
        )}
        <button
          onClick={handleClose}
          className="text-white/50 hover:text-white text-[18px] leading-none transition-colors"
        >✕</button>
      </div>

      {/* ── Video / Avatar area ──────────────────────────────────── */}
      {avatarEnabled && (
        <div className="relative bg-charcoal" style={{ aspectRatio: "16/9" }}>
          {/* Generating */}
          {videoPhase === "generating" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center">
                <svg className="animate-spin w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              </div>
              <p className="text-[11px] text-white/60">Preparing anchor…</p>
            </div>
          )}
          {/* Ready */}
          {videoPhase === "ready" && videoUrl && (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              className="w-full h-full object-cover"
            />
          )}
          {/* Error */}
          {videoPhase === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-[28px]">{gender === "female" ? "👩" : "👨"}</span>
              <p className="text-[10px] text-white/40">Ask me anything</p>
            </div>
          )}
          {/* Idle (before first generate) */}
          {videoPhase === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-[36px]">
                {gender === "female" ? "👩" : "👨"}
              </div>
              <p className="text-[11px] text-white/50">Your Varandaa anchor</p>
            </div>
          )}

          {/* D-ID badge */}
          <span className="absolute bottom-1 right-2 text-[8px] text-white/25">Powered by D-ID</span>
        </div>
      )}

      {/* ── Mic + status ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 px-5 py-4 bg-parchment/40">

        {/* Subscription gate */}
        {status === "gate" && (
          <div className="w-full text-center">
            <p className="text-[12px] text-charcoal mb-2">You've used all <strong>3 free</strong> searches.</p>
            <button
              onClick={onSubscribe}
              className="w-full bg-saffron text-white py-2 rounded-[6px] text-[12px] font-bold hover:bg-deep transition-colors"
            >
              Subscribe — ₹99/month for unlimited
            </button>
          </div>
        )}

        {/* Error message */}
        {status === "error" && (
          <p className="text-[11px] text-red-500 text-center">{error}</p>
        )}

        {/* Status prompt */}
        {status !== "gate" && (
          <p className="text-[11px] text-ash text-center">
            {status === "listening"   && "Listening… speak your news topic"}
            {status === "processing"  && `Searching for: "${transcript}"`}
            {(status === "idle" || status === "error") && "Tap the mic and ask about any news topic"}
            {status === "done"        && transcript && `You asked: "${transcript}"`}
          </p>
        )}

        {/* Big mic button */}
        {status !== "gate" && (
          <button
            onClick={handleMicClick}
            disabled={status === "processing"}
            className={[
              "w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all",
              status === "listening"
                ? "bg-red-500 animate-pulse scale-110"
                : status === "processing"
                ? "bg-ash/40 cursor-not-allowed"
                : "bg-saffron hover:bg-deep hover:scale-105",
            ].join(" ")}
            aria-label={status === "listening" ? "Stop" : "Start listening"}
          >
            {status === "processing" ? (
              <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm6.5 9a.5.5 0 0 1 .5.5 7 7 0 0 1-14 0 .5.5 0 0 1 1 0 6 6 0 0 0 12 0 .5.5 0 0 1 .5-.5zM11 20.5a.5.5 0 0 1 1 0V23h2.5a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1H10v-2.5z"/>
              </svg>
            )}
          </button>
        )}

        {/* Trial left */}
        {!subscribed && status !== "gate" && trialLeft > 0 && (
          <p className="text-[9px] text-ash/60">{trialLeft} free search{trialLeft !== 1 ? "es" : ""} remaining</p>
        )}
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      {status === "done" && results.length > 0 && (
        <div className="flex flex-col gap-2 px-4 pb-4 max-h-[280px] overflow-y-auto">
          <p className="text-[10px] text-ash pt-1 pb-0.5">
            Found <strong>{results.length}</strong> article{results.length !== 1 ? "s" : ""}
          </p>
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => { onArticleClick(r); handleClose(); }}
              className="flex gap-2.5 p-2.5 border border-border rounded-[6px] cursor-pointer hover:border-saffron hover:bg-saffron/5 transition-all group"
            >
              {r.image && (
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  className="w-[60px] h-[44px] object-cover rounded-[4px] flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  {r.category && (
                    <span className="text-[7px] font-bold text-saffron uppercase tracking-[1px]">{r.category}</span>
                  )}
                  {r.publishedAt && (
                    <span className="text-[8px] text-ash">{timeAgo(r.publishedAt)}</span>
                  )}
                  {r.isLive && (
                    <span className="text-[7px] font-bold text-green-600 uppercase ml-auto">LIVE</span>
                  )}
                </div>
                <h4 className="text-[11px] font-semibold leading-[1.3] group-hover:text-saffron transition-colors line-clamp-2">
                  {r.title}
                </h4>
              </div>
            </div>
          ))}
          <button
            onClick={() => { onReset(); greetingRequested.current = false; generateVideo(GREETING); }}
            className="text-[10px] text-saffron hover:underline text-center py-1"
          >
            🎙 Ask another question
          </button>
        </div>
      )}

      {/* No results */}
      {status === "done" && results.length === 0 && (
        <div className="text-center px-4 pb-4 pt-2">
          <p className="text-[12px] text-ash mb-1">No articles found.</p>
          <p className="font-te text-[10px] text-ash/60 mb-2">ఫలితాలు కనుగొనబడలేదు</p>
          <button onClick={onReset} className="text-[11px] text-saffron hover:underline">Try again</button>
        </div>
      )}
    </div>
  );
}
