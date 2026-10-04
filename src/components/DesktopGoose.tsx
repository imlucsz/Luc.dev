"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

export type DesktopGooseProps = {
  paused?: boolean;
  muted?: boolean;
  speed?: number;
  size?: number;
};

type Vector2 = { x: number; y: number };

interface GooseRig {
  underbodyCenter: Vector2;
  bodyCenter: Vector2;
  neckCenter: Vector2;
  neckBase: Vector2;
  neckHeadPoint: Vector2;
  head1EndPoint: Vector2;
  head2EndPoint: Vector2;
  neckLerpPercent: number;
}

interface GooseState {
  position: Vector2;
  targetPos: Vector2;
  velocity: Vector2;
  direction: number;
  targetDirection: Vector2;
  mode: "IDLE" | "WANDER" | "CHASE_MOUSE";
  timer: number;
  rig: GooseRig;
  leftFoot: GooseFoot;
  rightFoot: GooseFoot;
}

const FOOTPRINT_INTERVAL = 320;
const FOOTPRINT_LIFETIME = 3_000;
const MODEL_SIZE = 48;
const FOOT_STEP_LENGTH = 12;
const FOOT_STEP_SPEED = 0.15;
const HONK_SOUNDS = [
  "/audio/patodonald.mp3",
  "/audio/quack.mp3",
  "/audio/quack2.mp3",
];

function createFoot(): GooseFoot {
  const origin = { x: 0, y: 0 };
  return {
    currentPos: origin,
    startPos: origin,
    targetPos: origin,
    isStepping: false,
    stepProgress: 0,
  };
}

const vAdd = (a: Vector2, b: Vector2): Vector2 => ({
  x: a.x + b.x,
  y: a.y + b.y,
});
const vSub = (a: Vector2, b: Vector2): Vector2 => ({
  x: a.x - b.x,
  y: a.y - b.y,
});
const vMult = (v: Vector2, n: number): Vector2 => ({
  x: v.x * n,
  y: v.y * n,
});
const vMag = (v: Vector2): number => Math.hypot(v.x, v.y);
const vNorm = (v: Vector2): Vector2 => {
  const magnitude = vMag(v);
  return magnitude === 0
    ? { x: 0, y: 0 }
    : { x: v.x / magnitude, y: v.y / magnitude };
};
const vLerp = (a: Vector2, b: Vector2, t: number): Vector2 => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});
const getFromAngle = (degrees: number): Vector2 => {
  const radians = (degrees * Math.PI) / 180;
  return { x: Math.cos(radians), y: Math.sin(radians) };
};

interface GooseFoot {
  currentPos: Vector2;
  startPos: Vector2;
  targetPos: Vector2;
  isStepping: boolean;
  stepProgress: number;
}

function createRig(): GooseRig {
  return {
    underbodyCenter: { x: 0, y: 0 },
    bodyCenter: { x: 0, y: 0 },
    neckCenter: { x: 0, y: 0 },
    neckBase: { x: 0, y: 0 },
    neckHeadPoint: { x: 0, y: 0 },
    head1EndPoint: { x: 0, y: 0 },
    head2EndPoint: { x: 0, y: 0 },
    neckLerpPercent: 0,
  };
}

function createGooseState(): GooseState {
  return {
    position: { x: 0, y: 0 },
    targetPos: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    direction: 0,
    targetDirection: { x: 1, y: 0 },
    mode: "IDLE",
    timer: 2_000,
    rig: createRig(),
    leftFoot: createFoot(),
    rightFoot: createFoot(),
  };
}

function initializeFeet(state: GooseState, scale: number) {
  const forward = getFromAngle(state.direction);
  const side = getFromAngle(state.direction + 90);
  state.leftFoot.currentPos = vAdd(
    vAdd(state.position, vMult(side, -4 * scale)),
    vMult(forward, -5 * scale),
  );
  state.rightFoot.currentPos = vAdd(
    vAdd(state.position, vMult(side, 4 * scale)),
    vMult(forward, 5 * scale),
  );
  for (const foot of [state.leftFoot, state.rightFoot]) {
    foot.startPos = { ...foot.currentPos };
    foot.targetPos = { ...foot.currentPos };
    foot.isStepping = false;
    foot.stepProgress = 0;
  }
}

function updateFeet(
  state: GooseState,
  deltaFrames: number,
  scale: number,
  viewportWidth: number,
  viewportHeight: number,
) {
  const forward = getFromAngle(state.direction);
  const side = getFromAngle(state.direction + 90);
  const naturalLeft = vAdd(
    vAdd(state.position, vMult(side, -4 * scale)),
    vMult(forward, -5 * scale),
  );
  const naturalRight = vAdd(
    vAdd(state.position, vMult(side, 4 * scale)),
    vMult(forward, 5 * scale),
  );
  const stepLength = FOOT_STEP_LENGTH * scale;

  if (
    !state.leftFoot.isStepping &&
    !state.rightFoot.isStepping &&
    vMag(state.velocity) > 0.5
  ) {
    const leftDistance = vMag(vSub(state.leftFoot.currentPos, naturalLeft));
    const rightDistance = vMag(vSub(state.rightFoot.currentPos, naturalRight));
    const footToStep =
      leftDistance > stepLength
        ? state.leftFoot
        : rightDistance > stepLength
          ? state.rightFoot
          : null;

    if (footToStep) {
      footToStep.isStepping = true;
      footToStep.stepProgress = 0;
      footToStep.startPos = { ...footToStep.currentPos };
      const naturalTarget =
        footToStep === state.leftFoot ? naturalLeft : naturalRight;
      const predictedMovement = vMult(
        state.velocity,
        Math.min(1 / FOOT_STEP_SPEED, 8),
      );
      const movementLength = vMag(predictedMovement);
      const maxPrediction = stepLength;
      const cappedPrediction =
        movementLength > maxPrediction
          ? vMult(vNorm(predictedMovement), maxPrediction)
          : predictedMovement;
      const predictedTarget = vAdd(naturalTarget, cappedPrediction);
      footToStep.targetPos = {
        x: Math.min(Math.max(predictedTarget.x, 4), Math.max(4, viewportWidth - 4)),
        y: Math.min(Math.max(predictedTarget.y, 4), Math.max(4, viewportHeight - 4)),
      };
    }
  }

  for (const foot of [state.leftFoot, state.rightFoot]) {
    if (!foot.isStepping) continue;

    foot.stepProgress = Math.min(
      1,
      foot.stepProgress + FOOT_STEP_SPEED * deltaFrames,
    );
    const easedProgress =
      foot.stepProgress * foot.stepProgress * (3 - 2 * foot.stepProgress);
    foot.currentPos = vLerp(foot.startPos, foot.targetPos, easedProgress);
    if (foot.stepProgress === 1) {
      foot.currentPos = { ...foot.targetPos };
      foot.isStepping = false;
    }
  }
}

function updateRig(rig: GooseRig, direction: number) {
  const origin = { x: 0, y: 0 };
  const forward = getFromAngle(direction);
  const up = { x: 0, y: -1 };
  const num4 = 20 + (10 - 20) * rig.neckLerpPercent;
  const num5 = 3 + (16 - 3) * rig.neckLerpPercent;

  rig.underbodyCenter = vAdd(origin, vMult(up, 9));
  rig.bodyCenter = vAdd(origin, vMult(up, 14));
  rig.neckCenter = vAdd(origin, vMult(up, 14 + num4));
  rig.neckBase = vAdd(rig.bodyCenter, vMult(forward, 15));
  rig.neckHeadPoint = vAdd(
    vAdd(rig.neckBase, vMult(forward, num5)),
    vMult(up, num4),
  );
  rig.head1EndPoint = vAdd(
    vSub(rig.neckHeadPoint, vMult(up, 1)),
    vMult(forward, 3),
  );
  rig.head2EndPoint = vAdd(rig.head1EndPoint, vMult(forward, 5));
}

function drawGoose(
  context: CanvasRenderingContext2D,
  state: GooseState,
  size: number,
  walking: boolean,
  phase: number,
  honking: boolean,
  time: number,
) {
  const rig = state.rig;
  const forward = getFromAngle(state.direction);
  const side = getFromAngle(state.direction + 90);
  const scale = size / MODEL_SIZE;
  const bob = walking ? Math.sin(phase) * 1.25 : 0;

  updateRig(rig, state.direction);
  context.save();
  context.translate(state.position.x, state.position.y - bob * scale);
  context.scale(scale, scale);
  context.lineCap = "round";
  context.lineJoin = "round";

  const drawLine = (
    start: Vector2,
    end: Vector2,
    width: number,
    color: string,
  ) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.stroke();
  };
  const fillCircle = (point: Vector2, radius: number, color: string) => {
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  };

  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.beginPath();
  context.ellipse(0, 1, 20, 5, 0, 0, Math.PI * 2);
  context.fill();

  const drawFoot = (foot: GooseFoot, sideOffset: number) => {
    const localFoot = vMult(
      vSub(foot.currentPos, state.position),
      1 / scale,
    );
    const lift = foot.isStepping
      ? Math.sin(foot.stepProgress * Math.PI) * -12
      : 0;
    const footPosition = { x: localFoot.x, y: localFoot.y + lift };
    const legBase = vAdd(
      rig.underbodyCenter,
      vAdd(vMult(forward, sideOffset * 2), vMult(side, sideOffset * 3)),
    );
    const legVector = vSub(footPosition, legBase);
    const distance = vMag(legVector);
    const bendAmount = Math.max(0, 22 - distance) * 0.6;
    const midPoint = vLerp(legBase, footPosition, 0.5);
    const kneePosition = vAdd(
      midPoint,
      vAdd(
        vMult(forward, -bendAmount),
        { x: 0, y: -bendAmount * 0.3 },
      ),
    );
    drawLine(legBase, kneePosition, 6, "#ffa500");
    drawLine(kneePosition, footPosition, 5, "#ffa500");

    const footPitch = foot.isStepping
      ? Math.sin(foot.stepProgress * Math.PI) * 15
      : 0;
    const toeForward = getFromAngle(state.direction + footPitch);
    drawLine(
      footPosition,
      vAdd(footPosition, vMult(toeForward, 5)),
      6,
      "#ffa500",
    );
    drawLine(
      footPosition,
      vAdd(footPosition, vAdd(vMult(toeForward, 3), vMult(side, 2.5))),
      2.5,
      "#ffa500",
    );
    drawLine(
      footPosition,
      vAdd(footPosition, vSub(vMult(toeForward, 3), vMult(side, 2.5))),
      2.5,
      "#ffa500",
    );
  };
  drawFoot(state.leftFoot, -1);
  drawFoot(state.rightFoot, 1);

  const bodyStart = vAdd(rig.bodyCenter, vMult(forward, 11));
  const bodyEnd = vSub(rig.bodyCenter, vMult(forward, 11));
  const underbodyStart = vAdd(rig.underbodyCenter, vMult(forward, 7));
  const underbodyEnd = vSub(rig.underbodyCenter, vMult(forward, 7));
  const outline = "#d3d3d3";
  drawLine(bodyStart, bodyEnd, 24, outline);
  drawLine(rig.neckBase, rig.neckHeadPoint, 15, outline);
  drawLine(rig.neckHeadPoint, rig.head1EndPoint, 17, outline);
  drawLine(rig.head1EndPoint, rig.head2EndPoint, 12, outline);
  drawLine(underbodyStart, underbodyEnd, 15, outline);

  drawLine(bodyStart, bodyEnd, 22, "#fff");
  drawLine(rig.neckBase, rig.neckHeadPoint, 13, "#fff");
  drawLine(rig.neckHeadPoint, rig.head1EndPoint, 15, "#fff");
  drawLine(rig.head1EndPoint, rig.head2EndPoint, 10, "#fff");
  drawLine(underbodyStart, underbodyEnd, 13, "#fff");

  const idleHeadTurn = walking
    ? Math.sin(phase * 0.5) * 2.5
    : Math.sin(time / 1400) * 5;
  context.save();
  context.translate(rig.neckHeadPoint.x, rig.neckHeadPoint.y);
  context.rotate(((idleHeadTurn + (honking ? -18 : 0)) * Math.PI) / 180);
  const head1 = vSub(rig.head1EndPoint, rig.neckHeadPoint);
  const head2 = vSub(rig.head2EndPoint, rig.neckHeadPoint);
  drawLine({ x: 0, y: 0 }, head1, 15, "#fff");
  drawLine(head1, head2, 10, "#fff");

  const beakEnd = vAdd(head2, vMult(forward, 3));
  drawLine(head2, beakEnd, 9, "#ffa500");

  const eye1 = vAdd(
    vAdd({ x: 0, y: -3 }, vMult(vMult(side, -1), 2)),
    vMult(forward, 5),
  );
  const eye2 = vAdd(
    vAdd({ x: 0, y: -3 }, vMult(side, 2)),
    vMult(forward, 5),
  );
  fillCircle(eye1, 2, "#111");
  fillCircle(eye2, 2, "#111");
  context.restore();
  context.restore();
}

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
}

export function DesktopGoose({
  paused = false,
  muted = false,
  speed = 1,
  size = 64,
}: DesktopGooseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const footprintLayerRef = useRef<HTMLDivElement>(null);
  const honkBubbleRef = useRef<HTMLSpanElement>(null);
  const pointerRef = useRef<Vector2 | null>(null);
  const gooseRef = useRef<GooseState>(createGooseState());
  const initializedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const lastFootprintAtRef = useRef(0);
  const stepPhaseRef = useRef(0);
  const walkingRef = useRef(false);
  const honkUntilRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bubbleTimerRef = useRef<number | null>(null);
  const footprintTimersRef = useRef<number[]>([]);
  const renderRef = useRef<() => void>(() => {});
  const reducedMotion = usePrefersReducedMotion();
  const safeSize = Number.isFinite(size) && size > 0 ? size : 64;
  const safeSpeed = Number.isFinite(speed) && speed >= 0 ? speed : 1;
  const settingsRef = useRef({ muted, speed: safeSpeed, size: safeSize });

  useEffect(() => {
    settingsRef.current = { muted, speed: safeSpeed, size: safeSize };
  }, [muted, safeSpeed, safeSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    const bubble = honkBubbleRef.current;
    if (!canvas || !button || !bubble) return;

    const context = canvas.getContext("2d");
    if (!context) {
      console.warn("Não foi possível inicializar o Canvas do ganso.");
      return;
    }

    const state = gooseRef.current;
    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));
    const clampPosition = () => {
      const scale = settingsRef.current.size / MODEL_SIZE;
      const minX = 11 * scale;
      const maxX = window.innerWidth - 29 * scale;
      const minY = 23 * scale;
      const maxY = window.innerHeight - 1 * scale;
      state.position.x = minX > maxX
        ? window.innerWidth / 2
        : clamp(state.position.x, minX, maxX);
      state.position.y = minY > maxY
        ? window.innerHeight / 2
        : clamp(state.position.y, minY, maxY);
    };

    if (!initializedRef.current) {
      const scale = safeSize / MODEL_SIZE;
      state.position = {
        x: 24 + 11 * scale,
        y: window.innerHeight - 2 * scale,
      };
      state.targetPos = { ...state.position };
      initializedRef.current = true;
      initializeFeet(state, scale);
    }
    clampPosition();

    const render = (time = performance.now()) => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (
        canvas.width !== Math.round(width * pixelRatio) ||
        canvas.height !== Math.round(height * pixelRatio)
      ) {
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const currentSize = settingsRef.current.size;
      const buttonWidth = currentSize * 1.5;
      const buttonHeight = currentSize;
      button.style.left = `${state.position.x - currentSize * 0.45}px`;
      button.style.top = `${state.position.y - currentSize * 0.95}px`;
      button.style.width = `${buttonWidth}px`;
      button.style.height = `${buttonHeight}px`;
      bubble.style.transform =
        `translate(${state.position.x + currentSize * 0.45}px, ${state.position.y - currentSize}px)`;
      bubble.style.opacity = time < honkUntilRef.current ? "1" : "0";

      drawGoose(
        context,
        state,
        currentSize,
        walkingRef.current,
        stepPhaseRef.current,
        time < honkUntilRef.current,
        time,
      );
    };
    renderRef.current = render;

    const addFootprint = (now: number) => {
      const footprints = footprintLayerRef.current;
      if (!footprints) return;

      const mark = document.createElement("span");
      mark.setAttribute("aria-hidden", "true");
      Object.assign(mark.style, {
        position: "absolute",
        left: `${state.position.x - Math.cos((state.direction * Math.PI) / 180) * safeSize * 0.12}px`,
        top: `${state.position.y}px`,
        width: "7px",
        height: "4px",
        borderRadius: "50%",
        background: "#5b4a3a",
        opacity: "0.68",
        transform: `rotate(${Math.cos((state.direction * Math.PI) / 180) >= 0 ? "-18deg" : "18deg"})`,
        transition: "opacity 300ms linear, transform 300ms ease-out",
      });
      footprints.appendChild(mark);

      const fadeTimer = window.setTimeout(() => {
        mark.style.opacity = "0";
        mark.style.transform += " scale(.55)";
      }, Math.max(0, FOOTPRINT_LIFETIME - 300));
      const removeTimer = window.setTimeout(() => {
        mark.remove();
        footprintTimersRef.current = footprintTimersRef.current.filter(
          (timer) => timer !== fadeTimer && timer !== removeTimer,
        );
      }, FOOTPRINT_LIFETIME);
      footprintTimersRef.current.push(fadeTimer, removeTimer);
      lastFootprintAtRef.current = now;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    const updateAI = (deltaTime: number) => {
      if (state.mode === "IDLE") {
        state.timer -= deltaTime;

        if (Math.random() < 0.02 * (deltaTime / (1000 / 60))) {
          state.direction +=
            ((Math.random() - 0.5) * 0.8 * 180) / Math.PI;
        }

        if (state.timer <= 0) {
          if (pointerRef.current && Math.random() < 0.3) {
            state.mode = "CHASE_MOUSE";
            state.timer = 4_000 + Math.random() * 3_000;
            state.targetPos = { ...pointerRef.current };
            return;
          }

          const scale = settingsRef.current.size / MODEL_SIZE;
          const minX = 11 * scale;
          const maxX = window.innerWidth - 29 * scale;
          const minY = 23 * scale;
          const maxY = window.innerHeight - 1 * scale;
          const margin = Math.min(50, window.innerWidth / 4, window.innerHeight / 4);
          const randomTarget = (min: number, max: number) => {
            const safeMin = Math.min(min, max);
            const safeMax = Math.max(min, max);
            const innerMin = Math.min(safeMin + margin, safeMax);
            const innerMax = Math.max(safeMax - margin, innerMin);
            return innerMin + Math.random() * (innerMax - innerMin);
          };

          state.targetPos = {
            x: randomTarget(minX, maxX),
            y: randomTarget(minY, maxY),
          };
          state.mode = "WANDER";
        }
        return;
      }

      if (state.mode === "WANDER") {
        if (
          pointerRef.current &&
          Math.random() < 0.005 * (deltaTime / (1000 / 60))
        ) {
          state.mode = "CHASE_MOUSE";
          state.timer = 3_000;
          state.targetPos = { ...pointerRef.current };
          return;
        }

        if (vMag(vSub(state.targetPos, state.position)) < 15) {
          state.mode = "IDLE";
          state.timer = 2_000 + Math.random() * 3_000;
        }
        return;
      }

      state.timer -= deltaTime;
      if (pointerRef.current) {
        state.targetPos = { ...pointerRef.current };
      }
      if (
        vMag(vSub(state.targetPos, state.position)) < 30 ||
        state.timer <= 0
      ) {
        state.mode = "IDLE";
        state.timer = 1_500 + Math.random() * 2_000;
      }
    };

    const updateVisibility = () => {
      if (document.hidden) {
        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
        lastFrameRef.current = 0;
        return;
      }
      if (!paused && !reducedMotion && frameRef.current === null) {
        lastFrameRef.current = 0;
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const animate = (time: number) => {
      if (document.hidden) {
        frameRef.current = null;
        return;
      }

      const delta = lastFrameRef.current === 0
        ? 0
        : Math.min((time - lastFrameRef.current) / 1000, 0.05);
      lastFrameRef.current = time;
      const deltaFrames = delta * 60;
      const deltaTime = delta * 1000;
      walkingRef.current = false;
      updateAI(deltaTime);

      const difference = vSub(state.targetPos, state.position);
      const distance = vMag(difference);
      const shouldMove =
        state.mode === "WANDER" || state.mode === "CHASE_MOUSE";
      if (shouldMove && distance > 5 && settingsRef.current.speed > 0) {
        state.targetDirection = vNorm(difference);
        const targetAngle = Math.atan2(
          state.targetDirection.y,
          state.targetDirection.x,
        );
        const currentAngle = (state.direction * Math.PI) / 180;
        const angleDifference = Math.atan2(
          Math.sin(targetAngle - currentAngle),
          Math.cos(targetAngle - currentAngle),
        );
        const isChasing = state.mode === "CHASE_MOUSE";
        state.direction +=
          (angleDifference *
            Math.min(1, (isChasing ? 0.1 : 0.05) * deltaFrames) *
            180) /
          Math.PI;
        state.velocity = vAdd(
          state.velocity,
          vMult(
            state.targetDirection,
            (isChasing ? 1 : 0.5) *
              deltaFrames *
              settingsRef.current.speed,
          ),
        );
        const maxSpeed =
          (isChasing ? 3.5 : 2) * settingsRef.current.speed;
        const velocityMagnitude = vMag(state.velocity);
        if (velocityMagnitude > maxSpeed) {
          state.velocity = vMult(vNorm(state.velocity), maxSpeed);
        }
        walkingRef.current = vMag(state.velocity) > 0.1;
      } else {
        state.velocity = vMult(state.velocity, Math.pow(0.8, deltaFrames));
      }

      state.position = vAdd(
        state.position,
        vMult(state.velocity, deltaFrames),
      );
      clampPosition();

      if (
        walkingRef.current &&
        time - lastFootprintAtRef.current >= FOOTPRINT_INTERVAL
      ) {
        addFootprint(time);
      }

      updateFeet(
        state,
        deltaFrames,
        settingsRef.current.size / MODEL_SIZE,
        window.innerWidth,
        window.innerHeight,
      );
      stepPhaseRef.current += delta * (walkingRef.current ? 13 : 2);
      render(time);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      clampPosition();
      renderRef.current();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", updateVisibility);
    render();
    if (!paused && !reducedMotion && !document.hidden) {
      frameRef.current = window.requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", updateVisibility);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastFrameRef.current = 0;
      renderRef.current = () => {};
    };
  }, [paused, reducedMotion, safeSize]);

  useEffect(() => {
    return () => {
      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current);
      }
      footprintTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      footprintTimersRef.current = [];
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const honk = () => {
    honkUntilRef.current = performance.now() + 750;
    renderRef.current();
    if (bubbleTimerRef.current !== null) {
      window.clearTimeout(bubbleTimerRef.current);
    }
    bubbleTimerRef.current = window.setTimeout(() => {
      honkUntilRef.current = 0;
      renderRef.current();
      bubbleTimerRef.current = null;
    }, 750);

    if (settingsRef.current.muted) return;

    audioRef.current?.pause();
    const soundIndex = Math.floor(Math.random() * HONK_SOUNDS.length);
    const audio = new Audio(HONK_SOUNDS[soundIndex]);
    audioRef.current = audio;
    void audio.play().catch((error: unknown) => {
      console.warn("Não foi possível reproduzir o som do ganso.", error);
    });
  };

  return (
    <div
      aria-label="Mascote Desktop Goose"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0"
      />
      <div
        ref={footprintLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      <button
        ref={buttonRef}
        type="button"
        aria-label="Ganso. Clique para ouvir um honk."
        onClick={honk}
        className="pointer-events-auto fixed left-0 top-0 bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500"
        style={{ width: safeSize * 1.5, height: safeSize }}
      />
      <span
        ref={honkBubbleRef}
        aria-live="polite"
        className="pointer-events-none fixed left-0 top-0 z-40 rounded-sm border border-zinc-800 bg-white px-2 py-1 font-mono text-[10px] font-bold tracking-wide text-zinc-900 shadow-[2px_2px_0_#27272a]"
        style={{
          opacity: 0,
          transform: "translate(-100vw, -100vh)",
          transition: "opacity 100ms ease",
        }}
      >
        HONK
      </span>
    </div>
  );
}
