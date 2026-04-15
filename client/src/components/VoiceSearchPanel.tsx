// Voice search results panel + subscription gate
import { useState } from "react";
import type { VoiceStatus, VoiceResult } from "../hooks/useVoice";
import VoiceAvatar, { type AvatarGender } from "./VoiceAvatar";

interface VoiceSearchPanelProps {
  status: VoiceStatus;
  transcript: string;
  results: VoiceResult[];
  error: string;
  trialLeft: number;
  subscribed: boolean;
  avatarEnabled: boolean;
  onArticleClick: (article: VoiceResult) => void;
  onSubscribe: () => void;
  onDismiss: () => void;
  onReset: () => void;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(diff / 86_400_000);
  if (d >= 1) return `${d}d ago`;
  if (h >= 1) return `${h}h ago`;
  return "Just now";
}

export default function VoiceSearchPanel({
  status,
  transcript,
  results,
  error,
  trialLeft,
  subscribed,
  avatarEnabled,
  onArticleClick,
  onSubscribe,
  onDismiss,
  onReset,
}: VoiceSearchPanelProps) {
  const [avatarGender, setAvatarGender]     = useState<AvatarGender>("female");
  const [customImageUrl, setCustomImageUrl] = useState("");
  if (status === "idle") return null;

  // ── Subscription gate ────────────────────────────────────────
  if (status === "gate") {
    return (
      <div className="fixed inset-0 bg-night/90 backdrop-blur-sm z-[600] flex items-center justify-center px-4">
        <div className="bg-warmWhite rounded-[10px] w-full max-w-[420px] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)] text-center">
          <div className="text-[40px] mb-3">🎙️</div>
          <h2 className="font-serif text-[22px] font-bold mb-1">Voice Search</h2>
          <p className="font-te text-[14px] text-ash mb-5">వాయిస్ సెర్చ్ — తెలుగులో మాట్లాడండి</p>

          <div className="bg-saffron/10 border border-saffron/30 rounded-[6px] px-5 py-3 mb-6">
            <p className="text-[13px] text-charcoal">
              You've used all <strong>3 free</strong> voice searches.
              Subscribe for <strong>unlimited voice search</strong> in Telugu & English.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-[13px] text-charcoal">
              <span className="text-green-500 font-bold">✓</span> Unlimited voice queries
            </div>
            <div className="flex items-center gap-2 text-[13px] text-charcoal">
              <span className="text-green-500 font-bold">✓</span> Telugu + English speech recognition
            </div>
            <div className="flex items-center gap-2 text-[13px] text-charcoal">
              <span className="text-green-500 font-bold">✓</span> Priority wisprflow.ai transcription
            </div>
            <div className="flex items-center gap-2 text-[13px] text-charcoal">
              <span className="text-green-500 font-bold">✓</span> Ad-free reading experience
            </div>
          </div>

          <button
            onClick={onSubscribe}
            className="w-full bg-saffron text-white py-3 rounded-[6px] text-[14px] font-bold hover:bg-deep transition-colors mb-3"
          >
            Subscribe — ₹99/month
          </button>
          <button
            onClick={onDismiss}
            className="w-full text-[12px] text-ash hover:text-charcoal transition-colors py-1"
          >
            Maybe later
          </button>

          <p className="text-[10px] text-ash/70 mt-4">
            Secure payment · Cancel anytime
          </p>
        </div>
      </div>
    );
  }

  // ── Listening / processing spinner ───────────────────────────
  if (status === "listening" || status === "processing") {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[600] flex items-center gap-3 bg-night text-white px-5 py-3 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <span className={[
          "w-3 h-3 rounded-full",
          status === "listening" ? "bg-red-400 animate-pulse" : "bg-saffron animate-spin"
        ].join(" ")} />
        <span className="text-[13px] font-medium">
          {status === "listening"
            ? "Listening… speak your news topic"
            : `Searching for: "${transcript}"`}
        </span>
        {status === "listening" && (
          <span className="text-[10px] text-white/50 ml-1">Auto-stops in 8s</span>
        )}
      </div>
    );
  }

  // ── Results / error panel ────────────────────────────────────
  if (status === "done" || status === "error") {
    return (
      <div className="fixed inset-0 bg-night/90 backdrop-blur-sm z-[600] flex items-start justify-center pt-[60px] px-4 pb-8 overflow-y-auto">
        <div className="bg-warmWhite rounded-[10px] w-full max-w-[620px] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-parchment/60">
            <span className="text-[18px]">🎙️</span>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-saffron uppercase tracking-[1px] mb-[1px]">Voice Search</div>
              {transcript && (
                <div className="text-[13px] text-charcoal font-medium truncate">
                  "{transcript}"
                </div>
              )}
            </div>
            {!subscribed && (
              <span className="text-[9px] font-bold bg-saffron/15 text-saffron border border-saffron/30 px-2 py-[2px] rounded-[4px] whitespace-nowrap">
                {trialLeft} free left
              </span>
            )}
            <button
              onClick={onReset}
              className="text-ash hover:text-night text-[20px] leading-none transition-colors ml-1"
            >
              ✕
            </button>
          </div>

          {/* Error state */}
          {status === "error" && (
            <div className="px-5 py-6 text-center">
              <div className="text-[32px] mb-2">🤷</div>
              <p className="text-[13px] text-charcoal mb-4">{error}</p>
              <button
                onClick={onReset}
                className="bg-saffron text-white px-5 py-2 rounded-[4px] text-[12px] font-semibold hover:bg-deep transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Results */}
          {status === "done" && (
            <div className="p-4">
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-[32px] mb-2">🔍</div>
                  <p className="text-[13px] text-ash mb-1">No articles found for that query.</p>
                  <p className="font-te text-[12px] text-ash/70">మీ ప్రశ్నకు ఫలితాలు కనుగొనబడలేదు</p>
                  <button
                    onClick={onReset}
                    className="mt-4 text-[12px] text-saffron hover:underline"
                  >
                    Search again
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-[11px] text-ash mb-1">
                    Found <strong>{results.length}</strong> article{results.length !== 1 ? "s" : ""}
                  </p>
                  {results.map((r, i) => (
                    <div
                      key={i}
                      onClick={() => { onArticleClick(r); onReset(); }}
                      className="flex gap-3 bg-warmWhite border border-border rounded-[6px] p-3 cursor-pointer hover:border-saffron hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] transition-all group"
                    >
                      {r.image && (
                        <img
                          src={r.image}
                          alt={r.title}
                          loading="lazy"
                          className="w-[80px] h-[56px] object-cover rounded-[4px] flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {r.category && (
                            <span className="text-[8px] font-bold text-saffron uppercase tracking-[1px]">
                              {r.category}
                            </span>
                          )}
                          {r.publishedAt && (
                            <span className="text-[9px] text-ash">{timeAgo(r.publishedAt)}</span>
                          )}
                        </div>
                        <h3 className="text-[13px] font-semibold leading-[1.3] mb-0.5 group-hover:text-saffron transition-colors line-clamp-2">
                          {r.title}
                        </h3>
                        {r.titleTe && (
                          <p className="font-te text-[11px] text-ash line-clamp-1">{r.titleTe}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={onReset}
                    className="mt-2 text-center text-[12px] text-ash hover:text-saffron transition-colors py-1"
                  >
                    🎙️ Search again
                  </button>
                </div>
              )}

              {/* D-ID Avatar — reads the top result summary */}
              <VoiceAvatar
                enabled={avatarEnabled}
                text={results[0]
                  ? `${results[0].title}. ${results[0].summaryEn ?? ""}`.slice(0, 500)
                  : ""}
                gender={avatarGender}
                customImageUrl={customImageUrl}
                onGenderChange={setAvatarGender}
                onCustomImageChange={setCustomImageUrl}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
