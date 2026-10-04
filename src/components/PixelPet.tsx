"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PET_WIDTH = 48;
const PET_HEIGHT = 52;
const PANIC_RADIUS = 120;
const WALK_SPEED = 42;
const ESCAPE_SPEED = 340;
const BUBBLE_WIDTH = 200;

const reactions = [
  "OPA! QUE SUSTO!",
  "Calma, estou compilando!",
  "Esse mouse está em produção?",
  "Socorro, um cursor!",
];

export function PixelPet() {
  const petRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const positionRef = useRef(0);
  const directionRef = useRef(1);
  const isScaredRef = useRef(false);
  const panicUntilRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [isScared, setIsScared] = useState(false);
  const [message, setMessage] = useState("");

  const triggerPanic = useCallback(() => {
    panicUntilRef.current = performance.now() + 1500;
  }, []);

  useEffect(() => {
    const pet = petRef.current;
    if (!pet) return;

    let previousTime = 0;

    const updateScaredState = (scared: boolean) => {
      if (isScaredRef.current === scared) return;

      isScaredRef.current = scared;
      setIsScared(scared);

      if (scared) {
        setMessage(reactions[Math.floor(Math.random() * reactions.length)]);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleResize = () => {
      const maxPosition = Math.max(0, window.innerWidth - PET_WIDTH);
      positionRef.current = Math.min(positionRef.current, maxPosition);
      pet.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
    };

    const animate = (time: number) => {
      const delta = previousTime === 0 ? 0 : Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const petCenterX = positionRef.current + PET_WIDTH / 2;
      const petCenterY = window.innerHeight - PET_HEIGHT / 2;
      const distanceX = mouseRef.current.x - petCenterX;
      const distanceY = mouseRef.current.y - petCenterY;
      const isNearMouse =
        distanceX * distanceX + distanceY * distanceY <= PANIC_RADIUS ** 2;
      const scared = isNearMouse || time < panicUntilRef.current;

      updateScaredState(scared);

      if (scared) {
        if (Math.abs(distanceX) > 1) {
          directionRef.current = distanceX > 0 ? -1 : 1;
        }

        const maxPosition = Math.max(0, window.innerWidth - PET_WIDTH);
        if (
          (positionRef.current <= 0 && directionRef.current < 0) ||
          (positionRef.current >= maxPosition && directionRef.current > 0)
        ) {
          directionRef.current *= -1;
        }

        const nextPosition = Math.max(
          0,
          Math.min(
            maxPosition,
            positionRef.current + directionRef.current * ESCAPE_SPEED * delta,
          ),
        );
        positionRef.current = nextPosition;

        const bubbleWidth = Math.min(BUBBLE_WIDTH, window.innerWidth - 24);
        const minCenter = 12 + bubbleWidth / 2;
        const maxCenter = window.innerWidth - minCenter;
        if (bubbleRef.current) {
          bubbleRef.current.style.left = `${Math.max(
            minCenter,
            Math.min(maxCenter, positionRef.current + PET_WIDTH / 2),
          )}px`;
        }
      } else {
        const maxPosition = Math.max(0, window.innerWidth - PET_WIDTH);
        let nextPosition =
          positionRef.current + directionRef.current * WALK_SPEED * delta;

        if (nextPosition >= maxPosition) {
          nextPosition = maxPosition;
          directionRef.current = -1;
        } else if (nextPosition <= 0) {
          nextPosition = 0;
          directionRef.current = 1;
        }

        positionRef.current = nextPosition;
      }

      pet.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-40">
        <button
          ref={petRef}
          type="button"
          aria-label={
            isScared
              ? `Mascote assustado: ${message}`
              : "Mascote virtual interativo"
          }
          onClick={triggerPanic}
          onFocus={triggerPanic}
          className="pixel-pet-walking pointer-events-auto absolute bottom-0 left-0 h-[52px] w-12 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-red-400"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <span
            aria-hidden="true"
            className={`pixel-pet-exclamation absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-lg font-black transition-all duration-150 ${
              isScared
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          >
            !
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="h-12 w-12 overflow-visible drop-shadow-[0_4px_3px_rgba(255,255,255,0.18)]"
          >
            <ellipse className="pixel-pet-shadow" cx="24" cy="46" rx="17" ry="2" />
            <rect className="pixel-pet-body pixel-pet-foot pixel-pet-foot-left" x="14" y="35" width="6" height="10" rx="1" />
            <rect className="pixel-pet-body pixel-pet-foot pixel-pet-foot-right" x="29" y="35" width="6" height="10" rx="1" />
            <rect className="pixel-pet-body" x="8" y="4" width="30" height="35" rx="14" />
            {isScared ? (
              <>
                <rect className="pixel-pet-eye" x="15" y="14" width="5" height="12" rx="2.5" />
                <rect className="pixel-pet-eye" x="27" y="14" width="5" height="12" rx="2.5" />
              </>
            ) : (
              <>
                <rect className="pixel-pet-eye" x="15.5" y="16" width="4" height="9" rx="2" />
                <rect className="pixel-pet-eye" x="27.5" y="16" width="4" height="9" rx="2" />
              </>
            )}
            <rect className="pixel-pet-accessory" x="28" y="27" width="19" height="12" rx="3" strokeWidth="2.5" />
            <text className="pixel-pet-accessory-text" x="37.5" y="35.5" fontFamily="monospace" fontSize="6.5" fontWeight="900" textAnchor="middle">
              {"</>"}
            </text>
          </svg>
        </button>
      </div>

      {isScared && (
        <div
          ref={bubbleRef}
          role="status"
          className="pixel-pet-bubble pointer-events-none fixed bottom-[58px] z-40 max-w-[min(200px,calc(100vw-24px))] -translate-x-1/2 animate-[virtual-pet-bubble-in_180ms_ease-out_both] rounded-xl border-[3px] px-3 py-2 text-center text-xs font-black"
          style={{ left: 100 }}
        >
          {message}
          <span
            aria-hidden="true"
            className="pixel-pet-bubble-tail absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px]"
          />
        </div>
      )}
    </>
  );
}
