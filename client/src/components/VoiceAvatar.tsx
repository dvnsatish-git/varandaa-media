// ─────────────────────────────────────────────────────────────
//  VoiceAvatar — D-ID talking head presenter
//  Generates a lip-synced video of the chosen presenter reading
//  the news summary. Gender toggle + custom photo URL support.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

export type AvatarGender = "female" | "male";

interface VoiceAvatarProps {
  text: string;                   // text for the presenter to speak
  enabled: boolean;               // only render when avatar feature is on
  gender: AvatarGender;
  customImageUrl?: string;
  onGenderChange: (g: AvatarGender) => void;
  onCustomImageChange: (url: string) => void;
}

type AvatarStatus = "idle" | "generating" | "ready" | "error";

export default function VoiceAvatar({
  text,
  enabled,
  gender,
  customImageUrl,
  onGenderChange,
  onCustomImageChange,
}: VoiceAvatarProps) {
  const [status,    setStatus]    = useState<AvatarStatus>("idle");
  const [videoUrl,  setVideoUrl]  = useState<string | null>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customInput, setCustomInput] = useState(customImageUrl ?? "");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Generate whenever text changes (new search result) and feature is on
  useEffect(() => {
    if (!enabled || !text.trim()) return;

    setStatus("generating");
    setVideoUrl(null);

    fetch("/api/voice/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        gender,
        customImageUrl: customImageUrl || undefined,
      }),
    })
      .then((r) => r.json())
      .then((d: { talkId?: string; error?: string }) => {
        if (!d.talkId) { setStatus("error"); return; }
        startPolling(d.talkId);
      })
      .catch(() => setStatus("error"));

    return () => stopPolling();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled]);

  function startPolling(talkId: string) {
    stopPolling();
    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      if (attempts > 20) { setStatus("error"); stopPolling(); return; } // 40s max

      try {
        const r = await fetch(`/api/voice/avatar/${talkId}`);
        const d = await r.json() as { status?: string; videoUrl?: string };
        if (d.status === "done" && d.videoUrl) {
          setVideoUrl(d.videoUrl);
          setStatus("ready");
          stopPolling();
        } else if (d.status === "error" || d.status === "rejected") {
          setStatus("error");
          stopPolling();
        }
      } catch {
        setStatus("error");
        stopPolling();
      }
    }, 2_000);
  }

  function stopPolling() {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }

  function applyCustomUrl() {
    const trimmed = customInput.trim();
    if (trimmed.startsWith("https://")) {
      onCustomImageChange(trimmed);
      setShowCustom(false);
    }
  }

  if (!enabled) return null;

  return (
    <div className="border-t border-border pt-4 mt-4">
      {/* Header row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold text-saffron uppercase tracking-[1px]">
          🎙 Varandaa Presenter
        </span>
        <span className="text-[9px] text-ash ml-auto">వారండా యాంకర్</span>
      </div>

      {/* Gender selector + custom photo */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <div className="flex gap-1">
          <button
            onClick={() => onGenderChange("female")}
            className={[
              "px-3 py-1 rounded-[14px] text-[11px] font-semibold border transition-colors",
              gender === "female"
                ? "bg-saffron text-white border-saffron"
                : "bg-warmWhite text-ash border-border hover:border-saffron",
            ].join(" ")}
          >
            👩 Female
          </button>
          <button
            onClick={() => onGenderChange("male")}
            className={[
              "px-3 py-1 rounded-[14px] text-[11px] font-semibold border transition-colors",
              gender === "male"
                ? "bg-saffron text-white border-saffron"
                : "bg-warmWhite text-ash border-border hover:border-saffron",
            ].join(" ")}
          >
            👨 Male
          </button>
        </div>

        <button
          onClick={() => setShowCustom((p) => !p)}
          className="text-[10px] text-saffron hover:underline ml-auto"
        >
          {customImageUrl ? "📷 Change photo" : "📷 Use your photo"}
        </button>
      </div>

      {/* Custom photo URL input */}
      {showCustom && (
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="https://your-photo-url.jpg (clear face, HTTPS)"
            className="flex-1 border border-border rounded-[4px] px-3 py-1.5 text-[11px] focus:outline-none focus:border-saffron"
          />
          <button
            onClick={applyCustomUrl}
            className="bg-saffron text-white px-3 py-1.5 rounded-[4px] text-[11px] font-semibold hover:bg-deep"
          >
            Apply
          </button>
          {customImageUrl && (
            <button
              onClick={() => { onCustomImageChange(""); setCustomInput(""); setShowCustom(false); }}
              className="text-[11px] text-ash hover:text-night px-2"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Avatar display area */}
      <div className="rounded-[8px] overflow-hidden bg-charcoal relative"
           style={{ aspectRatio: "16/9", maxHeight: "280px" }}>

        {/* Generating state */}
        {status === "generating" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-charcoal">
            <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center">
              <svg className="animate-spin w-6 h-6 text-saffron" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            </div>
            <p className="text-[12px] text-white/70">Preparing your Varandaa anchor…</p>
            <p className="font-te text-[10px] text-white/40">వారండా యాంకర్ సిద్ధం అవుతున్నారు</p>
          </div>
        )}

        {/* Ready — video player */}
        {status === "ready" && videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            controls
            className="w-full h-full object-cover"
            onEnded={() => videoRef.current?.load()}
          />
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal">
            <span className="text-[24px]">📹</span>
            <p className="text-[11px] text-white/60">Avatar generation failed</p>
            <p className="text-[10px] text-white/30">Check DID_API_KEY or try again</p>
          </div>
        )}

        {/* Idle (before first search) */}
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal">
            <div className="w-14 h-14 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-[28px]">
              {gender === "female" ? "👩" : "👨"}
            </div>
            <p className="text-[11px] text-white/50">Presenter will appear after search</p>
          </div>
        )}
      </div>

      {/* D-ID credit note */}
      <p className="text-[9px] text-ash/50 mt-1.5 text-right">Powered by D-ID · ai-generated presenter</p>
    </div>
  );
}
