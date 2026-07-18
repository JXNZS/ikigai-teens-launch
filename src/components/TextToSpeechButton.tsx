import { useEffect, useId, useState, useSyncExternalStore, type RefObject } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type TTSStatus = "idle" | "speaking" | "paused";

type TTSState = {
  activeId: string | null;
  status: TTSStatus;
};

type TextToSpeechButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  label?: string;
  minWords?: number;
  className?: string;
};

const ttsListeners = new Set<() => void>();

let currentState: TTSState = {
  activeId: null,
  status: "idle",
};

let currentUtterance: SpeechSynthesisUtterance | null = null;

const supportsSpeechSynthesis = () => typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";

const getSnapshot = () => currentState;

const subscribe = (listener: () => void) => {
  ttsListeners.add(listener);

  return () => {
    ttsListeners.delete(listener);
  };
};

const emitChange = () => {
  ttsListeners.forEach((listener) => listener());
};

const setState = (nextState: Partial<TTSState>) => {
  currentState = { ...currentState, ...nextState };
  emitChange();
};

const stopSpeech = () => {
  if (!supportsSpeechSynthesis()) {
    return;
  }

  window.speechSynthesis.cancel();
  currentUtterance = null;
  setState({ activeId: null, status: "idle" });
};

export const resetTextToSpeechState = () => {
  stopSpeech();
};

const extractReadableText = (root: HTMLElement) => {
  const clone = root.cloneNode(true) as HTMLElement;

  clone.querySelectorAll("[data-tts-exclude], [aria-hidden='true'], button, nav, footer, svg, script, style, noscript, input, textarea, select, option, img, video, audio").forEach((node) => {
    node.remove();
  });

  const rawText = typeof clone.innerText === "string" ? clone.innerText : clone.textContent ?? "";

  return rawText.replace(/\s+/g, " ").trim();
};

const readTextAloud = (id: string, text: string) => {
  if (!supportsSpeechSynthesis()) {
    return;
  }

  const synth = window.speechSynthesis;

  if (currentState.activeId && currentState.activeId !== id) {
    stopSpeech();
  }

  if (currentState.activeId === id) {
    if (currentState.status === "speaking") {
      synth.pause();
      setState({ status: "paused" });
      return;
    }

    if (currentState.status === "paused") {
      synth.resume();
      setState({ status: "speaking" });
      return;
    }
  }

  synth.cancel();

  const utterance = new window.SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  utterance.lang = document.documentElement.lang || "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onend = () => {
    if (currentUtterance === utterance) {
      currentUtterance = null;
      setState({ activeId: null, status: "idle" });
    }
  };

  utterance.onerror = () => {
    if (currentUtterance === utterance) {
      currentUtterance = null;
      setState({ activeId: null, status: "idle" });
    }
  };

  setState({ activeId: id, status: "speaking" });
  synth.speak(utterance);
};

const TextToSpeechButton = ({ targetRef, label = "Read this section aloud", minWords = 200, className = "" }: TextToSpeechButtonProps) => {
  const id = useId();
  const { activeId, status } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [isEligible, setIsEligible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (language === "kn") {
      setIsEligible(false);
      return;
    }

    const element = targetRef.current;

    if (!element) {
      setIsEligible(false);
      return;
    }

    const updateEligibility = () => {
      const text = extractReadableText(element);
      const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
      setIsEligible(wordCount >= minWords);
    };

    updateEligibility();

    const observer = new MutationObserver(updateEligibility);
    observer.observe(element, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();

      if (currentState.activeId === id && currentState.status !== "idle") {
        stopSpeech();
      }
    };
  }, [id, minWords, targetRef, language]);

  if (language === "kn" || !supportsSpeechSynthesis() || !isEligible) {
    return null;
  }

  const isPlaying = activeId === id && status === "speaking";
  const isPaused = activeId === id && status === "paused";
  const icon = isPlaying ? <Pause className="h-3.5 w-3.5" /> : isPaused ? <Play className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />;
  const ariaLabel = isPlaying ? `${label} - pause reading` : isPaused ? `${label} - resume reading` : label;

  const handleClick = () => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    const text = extractReadableText(element);

    if (!text) {
      return;
    }

    readTextAloud(id, text);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={isPlaying || isPaused}
      data-tts-exclude="true"
      className={`absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-white/90 text-primary shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background ${isPlaying ? "bg-primary text-primary-foreground border-primary/30" : isPaused ? "bg-primary/10 text-primary border-primary/25" : ""} ${className}`}
    >
      <span className="sr-only">{ariaLabel}</span>
      {icon}
    </button>
  );
};

export default TextToSpeechButton;