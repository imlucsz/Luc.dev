"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { loadingPhrases } from "@/data/loading";

const DISPLAY_DURATION_MS = 2500;
const FADE_DURATION_MS = 500;

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [phrase, setPhrase] = useState(loadingPhrases[0]);

  useEffect(() => {
    setPhrase(
      loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)],
    );

    const fadeTimer = window.setTimeout(
      () => setIsFading(true),
      DISPLAY_DURATION_MS,
    );
    const removeTimer = window.setTimeout(
      () => setIsVisible(false),
      DISPLAY_DURATION_MS + FADE_DURATION_MS,
    );

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
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
    </div>
  );
}
