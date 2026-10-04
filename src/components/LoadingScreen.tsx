"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { loadingPhrases } from "@/data/loading";

const DISPLAY_DURATION_MS = 2500;
const FADE_DURATION_MS = 500;

export function LoadingScreen() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startAudioRef = useRef<() => void>(() => {});
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [phrase, setPhrase] = useState(loadingPhrases[0]);

  useEffect(() => {
    const audio = audioRef.current;
    let hasStartedAudio = false;
    let isStartingAudio = false;

    const phraseTimer = window.setTimeout(() => {
      setPhrase(
        loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)],
      );
    }, 0);

    const startAudioOnInteraction = () => {
      if (hasStartedAudio || isStartingAudio || !audio) return;
      isStartingAudio = true;
      audio.volume = 0.45;
      void audio.play().then(
        () => {
          hasStartedAudio = true;
          isStartingAudio = false;
          setAudioStarted(true);
          removeInteractionListeners();
        },
        () => {
          isStartingAudio = false;
        },
      );
    };
    startAudioRef.current = startAudioOnInteraction;

    const interactionEvents = [
      "pointermove",
      "pointerdown",
      "keydown",
      "touchstart",
    ] as const;

    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startAudioOnInteraction);
      });
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, startAudioOnInteraction, {
        once: true,
        passive: true,
      });
    });

    const fadeTimer = window.setTimeout(
      () => {
        setIsFading(true);
        removeInteractionListeners();
        audio?.pause();
      },
      DISPLAY_DURATION_MS,
    );
    const removeTimer = window.setTimeout(
      () => setIsVisible(false),
      DISPLAY_DURATION_MS + FADE_DURATION_MS,
    );

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(phraseTimer);
      removeInteractionListeners();
      startAudioRef.current = () => {};
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 px-6 text-center transition-opacity duration-500 ease-out ${
        isFading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/snoopy-loading.gif"
        alt="Snoopy programando enquanto a página carrega"
        width={240}
        height={240}
        unoptimized
        priority
        className="mb-7 h-48 w-48 object-contain motion-safe:animate-pulse"
      />
      <p className="font-mono text-sm font-semibold tracking-[0.25em] text-emerald-400">
        CARREGANDO...
      </p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
        {phrase}
      </p>
      {!audioStarted && !isFading && (
        <button
          type="button"
          onClick={() => startAudioRef.current()}
          className="group mt-7 inline-flex flex-col items-center gap-1 rounded-2xl px-5 py-2 text-zinc-100 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <Image
            src="/click.gif"
            alt=""
            width={64}
            height={64}
            unoptimized
            className="h-16 w-16 object-contain"
          />
          <span className="animate-pulse font-mono text-sm font-black tracking-[0.18em] text-emerald-300 group-hover:text-emerald-200">
            CLIQUE EM MIM!
          </span>
        </button>
      )}
      <audio
        ref={audioRef}
        src="/audio/snoopy.mp3"
        preload="auto"
        className="hidden"
      />
    </div>
  );
}
