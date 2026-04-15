// ─────────────────────────────────────────────────────────────
//  useVoice — voice search hook
//  Trial: 3 free uses (localStorage). After that: subscription gate.
//  Primary:  Browser SpeechRecognition (no API key needed)
//  Enhanced: wisprflow.ai via /api/voice/transcribe (if key configured)
// ─────────────────────────────────────────────────────────────
import { useState, useRef, useCallback, useEffect } from "react";

export type VoiceStatus =
  | "idle"
  | "listening"
  | "processing"
  | "done"
  | "error"
  | "gate";      // trial exhausted — show subscription wall

export interface VoiceResult {
  title: string;
  titleTe?: string;
  summaryEn?: string;
  summaryTe?: string;
  category?: string;
  link?: string;
  realLink?: string;
  image?: string;
  sourceName?: string;
  publishedAt?: string;
  tags?: string[];
}

const TRIAL_KEY  = "vm_voice_uses";
const SUB_KEY    = "vm_subscribed";
const FREE_LIMIT = 3;

function getTrialUses(): number {
  return parseInt(localStorage.getItem(TRIAL_KEY) ?? "0", 10);
}
function incrementTrialUses(): number {
  const next = getTrialUses() + 1;
  localStorage.setItem(TRIAL_KEY, String(next));
  return next;
}
function isSubscribed(): boolean {
  return localStorage.getItem(SUB_KEY) === "true";
}

export function useVoice() {
  const [status,       setStatus]      = useState<VoiceStatus>("idle");
  const [transcript,   setTranscript]  = useState("");
  const [results,      setResults]     = useState<VoiceResult[]>([]);
  const [error,        setError]       = useState("");
  const [trialLeft,    setTrialLeft]   = useState(FREE_LIMIT - getTrialUses());
  const [subscribed,   setSubscribed]  = useState(isSubscribed());
  const [wisprEnabled, setWisprEnabled] = useState(false);

  const mediaRef      = useRef<MediaRecorder | null>(null);
  const chunksRef     = useRef<Blob[]>([]);
  const srRef         = useRef<SpeechRecognition | null>(null);

  // Check if wisprflow is configured server-side
  useEffect(() => {
    fetch("/api/voice/config")
      .then((r) => r.json())
      .then((d: { wisprflowEnabled?: boolean }) => {
        setWisprEnabled(!!d.wisprflowEnabled);
      })
      .catch(() => {});
  }, []);

  // Check gate before recording
  const canUse = useCallback((): boolean => {
    if (isSubscribed()) return true;
    return getTrialUses() < FREE_LIMIT;
  }, []);

  // Search articles by transcribed text
  const searchArticles = useCallback(async (query: string) => {
    setTranscript(query);
    setStatus("processing");
    try {
      const res = await fetch("/api/voice/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json() as { results?: VoiceResult[]; error?: string };
      if (data.results) {
        setResults(data.results);
        setStatus("done");
      } else {
        setError(data.error ?? "No results found.");
        setStatus("error");
      }
    } catch {
      setError("Search failed. Please try again.");
      setStatus("error");
    }
  }, []);

  // Transcribe via wisprflow.ai (server-proxied — API key stays server-side)
  const transcribeWithWispr = useCallback(async (blob: Blob): Promise<string> => {
    const res = await fetch("/api/voice/transcribe", {
      method: "POST",
      headers: { "Content-Type": blob.type || "audio/webm" },
      body: blob,
    });
    if (!res.ok) throw new Error("Transcription failed");
    const data = await res.json() as { transcript?: string };
    return data.transcript ?? "";
  }, []);

  // Start recording / listening
  const startListening = useCallback(async () => {
    if (!canUse()) {
      setStatus("gate");
      return;
    }

    setError("");
    setResults([]);
    setTranscript("");
    setStatus("listening");

    // ── Path A: wisprflow.ai (MediaRecorder → blob → server) ──
    if (wisprEnabled && typeof MediaRecorder !== "undefined") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunksRef.current = [];
        const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRef.current = mr;

        mr.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        mr.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          try {
            const text = await transcribeWithWispr(blob);
            if (text) {
              const used = incrementTrialUses();
              setTrialLeft(Math.max(0, FREE_LIMIT - used));
              await searchArticles(text);
            } else {
              setError("Could not understand. Please try again.");
              setStatus("error");
            }
          } catch {
            setError("Transcription failed. Please try again.");
            setStatus("error");
          }
        };

        mr.start();
        // Auto-stop after 8 seconds
        setTimeout(() => { if (mr.state === "recording") mr.stop(); }, 8_000);
        return;
      } catch {
        // Mic permission denied — fall through to SpeechRecognition
      }
    }

    // ── Path B: Browser SpeechRecognition (fallback / no API key) ──
    const SR = (window as unknown as {
      SpeechRecognition?: typeof SpeechRecognition;
      webkitSpeechRecognition?: typeof SpeechRecognition;
    }).SpeechRecognition ?? (window as unknown as {
      webkitSpeechRecognition?: typeof SpeechRecognition;
    }).webkitSpeechRecognition;

    if (!SR) {
      setError("Voice search not supported in this browser. Try Chrome.");
      setStatus("error");
      return;
    }

    const sr = new SR();
    srRef.current = sr;
    sr.lang = "te-IN";        // Telugu-first; browser auto-falls back to English
    sr.interimResults = false;
    sr.maxAlternatives = 1;

    sr.onresult = async (e) => {
      const text = e.results[0]?.[0]?.transcript ?? "";
      if (text) {
        const used = incrementTrialUses();
        setTrialLeft(Math.max(0, FREE_LIMIT - used));
        await searchArticles(text);
      } else {
        setError("Could not understand. Please try again.");
        setStatus("error");
      }
    };

    sr.onerror = (e) => {
      if (e.error === "not-allowed") {
        setError("Microphone access denied. Please allow microphone access.");
      } else if (e.error === "no-speech") {
        setError("No speech detected. Please try again.");
      } else {
        setError("Voice recognition failed. Please try again.");
      }
      setStatus("error");
    };

    sr.onend = () => {
      if (status === "listening") setStatus("idle");
    };

    sr.start();
  }, [canUse, wisprEnabled, transcribeWithWispr, searchArticles, status]);

  // Stop recording early
  const stopListening = useCallback(() => {
    mediaRef.current?.stop();
    srRef.current?.stop();
    if (status === "listening") setStatus("idle");
  }, [status]);

  // Activate subscription (client-side; wire to real payment in prod)
  const subscribe = useCallback(() => {
    localStorage.setItem(SUB_KEY, "true");
    setSubscribed(true);
    setTrialLeft(FREE_LIMIT); // reset display
    setStatus("idle");
  }, []);

  const dismiss = useCallback(() => setStatus("idle"), []);
  const reset   = useCallback(() => {
    setStatus("idle");
    setResults([]);
    setTranscript("");
    setError("");
  }, []);

  return {
    status,
    transcript,
    results,
    error,
    trialLeft,
    subscribed,
    wisprEnabled,
    startListening,
    stopListening,
    subscribe,
    dismiss,
    reset,
  };
}
