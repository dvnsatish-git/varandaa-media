// Mic button — shows trial count badge; pulses while listening
import type { VoiceStatus } from "../hooks/useVoice";

interface VoiceButtonProps {
  status: VoiceStatus;
  trialLeft: number;
  subscribed: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function VoiceButton({
  status,
  trialLeft,
  subscribed,
  onStart,
  onStop,
}: VoiceButtonProps) {
  const isListening  = status === "listening";
  const isProcessing = status === "processing";
  const isActive     = isListening || isProcessing;

  const handleClick = () => {
    if (isListening) onStop();
    else onStart();
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleClick}
        title={
          isListening  ? "Stop listening"
          : isProcessing ? "Processing…"
          : "Voice search"
        }
        className={[
          "relative flex items-center gap-[6px] px-[14px] py-[7px] rounded-[20px] text-[12px] font-semibold transition-all duration-200 border",
          isListening
            ? "bg-red-500 text-white border-red-600 animate-pulse"
            : isProcessing
            ? "bg-saffron/70 text-white border-saffron cursor-not-allowed"
            : "bg-warmWhite text-charcoal border-border hover:border-saffron hover:text-saffron",
        ].join(" ")}
        disabled={isProcessing}
      >
        {/* Mic icon */}
        <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] flex-shrink-0" fill="currentColor">
          {isListening ? (
            // Stop icon while recording
            <rect x="6" y="6" width="12" height="12" rx="2" />
          ) : (
            // Mic icon
            <>
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z" />
              <path d="M19 10a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V21H9v2h6v-2h-2v-2.06A9 9 0 0 0 21 10h-2z" />
            </>
          )}
        </svg>

        <span>
          {isListening  ? "Listening…"
          : isProcessing ? "Searching…"
          : "Voice Search"}
        </span>
      </button>

      {/* Trial / subscribed badge */}
      {!isActive && (
        <span className={[
          "absolute -top-[8px] -right-[8px] text-[8px] font-bold px-[5px] py-[1px] rounded-[8px] leading-tight whitespace-nowrap",
          subscribed
            ? "bg-green-500 text-white"
            : trialLeft > 0
            ? "bg-saffron text-white"
            : "bg-red-500 text-white",
        ].join(" ")}>
          {subscribed
            ? "PRO"
            : trialLeft > 0
            ? `${trialLeft} free`
            : "Subscribe"}
        </span>
      )}
    </div>
  );
}
