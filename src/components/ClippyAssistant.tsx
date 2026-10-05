"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { clippyPhrases, getRandomClippyPhrase } from "@/data/clippy";

export function ClippyAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [phrase, setPhrase] = useState(clippyPhrases[0]);

  const changePhrase = useCallback(() => {
    setPhrase((currentPhrase) => getRandomClippyPhrase(currentPhrase));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const intervalId = window.setInterval(changePhrase, 10_000);
    return () => window.clearInterval(intervalId);
  }, [changePhrase, isOpen]);

  return (
    <div className="clippy-widget" onMouseEnter={changePhrase}>
      {isOpen && (
        <div className="clippy-bubble">
          <div className="clippy-titlebar">
            <div className="clippy-title-left">
              <span className="clippy-bulb" aria-hidden="true">
                💡
              </span>
              <span className="clippy-title-text">
                Assistente do portfólio
              </span>
            </div>
            <button
              type="button"
              className="clippy-close"
              aria-label="Fechar mensagem do Clippy"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="clippy-content">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={phrase}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="clippy-main-text"
                aria-live="polite"
                aria-atomic="true"
              >
                {phrase}
              </motion.p>
            </AnimatePresence>
            <p className="clippy-prompt-text">Por onde começamos?</p>
            <div className="clippy-options">
              <a
                href="#projects"
                className="clippy-opt-btn"
                onClick={() => setIsOpen(false)}
              >
                <span className="clippy-bullet" aria-hidden="true" />
                <span className="clippy-opt-text">Ver meus projetos</span>
              </a>
              <a
                href="#about"
                className="clippy-opt-btn"
                onClick={() => setIsOpen(false)}
              >
                <span className="clippy-bullet" aria-hidden="true" />
                <span className="clippy-opt-text">Saber mais sobre mim</span>
              </a>
            </div>
          </div>
          <div className="clippy-tail" aria-hidden="true" />
        </div>
      )}
      <button
        type="button"
        className="clippy-sprite"
        aria-label={isOpen ? "Fechar Clippy" : "Abrir Clippy"}
        aria-expanded={isOpen}
        onClick={() => {
          changePhrase();
          setIsOpen((open) => !open);
        }}
      >
        <svg
          viewBox="0 0 100 130"
          className="clippy-svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="clippy-metal-base"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="30%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#cbd5e1" />
              <stop offset="85%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <ellipse
            cx="50"
            cy="120"
            rx="35"
            ry="6"
            fill="rgba(0, 0, 0, 0.25)"
          />
          <path
            d="M 34,92 A 11,11 0 0,0 56,92 V 55 A 6,6 0 0,0 44,55 V 105 A 14,14 0 0,0 72,105 V 38 A 22,22 0 0,0 28,38 V 100"
            fill="none"
            stroke="#1a202c"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 34,92 A 11,11 0 0,0 56,92 V 55 A 6,6 0 0,0 44,55 V 105 A 14,14 0 0,0 72,105 V 38 A 22,22 0 0,0 28,38 V 100"
            fill="none"
            stroke="url(#clippy-metal-base)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g className="clippy-eye clippy-eye-left">
            <ellipse
              cx="43"
              cy="44"
              rx="10"
              ry="12.5"
              fill="#ffffff"
              stroke="#111827"
              strokeWidth="2.5"
            />
            <ellipse cx="45" cy="45" rx="5" ry="6.5" fill="#111827" />
            <circle cx="43" cy="42" r="1.8" fill="#ffffff" />
          </g>
          <g className="clippy-eye clippy-eye-right">
            <ellipse
              cx="65"
              cy="42"
              rx="10"
              ry="12.5"
              fill="#ffffff"
              stroke="#111827"
              strokeWidth="2.5"
            />
            <ellipse cx="63.5" cy="43.5" rx="5" ry="6.5" fill="#111827" />
            <circle cx="61.5" cy="40.5" r="1.8" fill="#ffffff" />
          </g>
          <path
            className="clippy-brow clippy-brow-left"
            d="M 28 28 C 34 20, 48 22, 53 29"
            fill="none"
            stroke="#111827"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            className="clippy-brow clippy-brow-right"
            d="M 58 29 C 64 20, 76 21, 80 27"
            fill="none"
            stroke="#111827"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
