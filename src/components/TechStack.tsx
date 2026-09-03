"use client";

import { useEffect, useRef, useState } from "react";

const technologies = [
  ["Java", "java-original.svg"],
  ["Python", "python-original.svg"],
  ["TypeScript", "typescript-original.svg"],
  ["JavaScript", "javascript-original.svg"],
  ["HTML5", "html5-original.svg"],
  ["CSS3", "css3-original.svg"],
  ["React", "react-original.svg"],
  ["Next.js", "nextjs-original-wordmark.svg"],
  ["Node.js", "nodejs-original.svg"],
  ["Flask", "flask-original.svg"],
  ["MongoDB", "mongodb-original.svg"],
  ["MySQL", "mysql-original.svg"],
  ["Git", "git-original.svg"],
  ["GitHub", "github-original.svg"],
  ["AWS", "amazonwebservices-original-wordmark.svg"],
  ["VS Code", "vscode-original.svg"],
] as const;

const iconBaseUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

type Point = {
  name: string;
  icon: string;
  x: number;
  y: number;
  z: number;
};

function createPoints(rotationX: number, rotationY: number): Point[] {
  const radius = 168;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return technologies.map(([name, file], index) => {
    const y = 1 - (index / (technologies.length - 1)) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    const angle = goldenAngle * index;
    const initialX = Math.cos(angle) * ringRadius;
    const initialZ = Math.sin(angle) * ringRadius;
    const rotatedY = y * Math.cos(rotationX) - initialZ * Math.sin(rotationX);
    const rotatedZ = y * Math.sin(rotationX) + initialZ * Math.cos(rotationX);
    const rotatedX = initialX * Math.cos(rotationY) + rotatedZ * Math.sin(rotationY);
    const finalZ = -initialX * Math.sin(rotationY) + rotatedZ * Math.cos(rotationY);

    return {
      name,
      icon: `${iconBaseUrl}/${file.replace(/-(?:original|original-wordmark)\.svg$/, "")}/${file}`,
      x: rotatedX * radius,
      y: rotatedY * radius,
      z: finalZ,
    };
  });
}

export function TechStack() {
  const [points, setPoints] = useState<Point[]>([]);
  const rotation = useRef({ x: 0.25, y: 0 });
  const pointer = useRef({ active: false, x: 0, y: 0 });

  useEffect(() => {
    setPoints(createPoints(rotation.current.x, rotation.current.y));
    let animationFrame = 0;
    const animate = () => {
      if (!pointer.current.active) {
        rotation.current.y += 0.0025;
        rotation.current.x += 0.0007;
        setPoints(createPoints(rotation.current.x, rotation.current.y));
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointer.current = { active: true, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current.active) return;
    rotation.current.y += (event.clientX - pointer.current.x) * 0.008;
    rotation.current.x += (event.clientY - pointer.current.y) * 0.008;
    pointer.current.x = event.clientX;
    pointer.current.y = event.clientY;
    setPoints(createPoints(rotation.current.x, rotation.current.y));
  };

  const stopDragging = () => {
    pointer.current.active = false;
  };

  return (
    <section id="techs" className="py-24 border-t border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
            Ecossistema
          </h2>
          <h3 className="text-3xl font-bold text-zinc-100">
            Tecnologias & Ferramentas
          </h3>
        </div>
        <div
          className="technology-sphere"
          aria-label="Esfera interativa com as tecnologias utilizadas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
        >
          <div className="technology-sphere__halo" />
          {points.map((point) => {
            const depth = (point.z + 1) / 2;
            return (
              <div
                className="technology-sphere__item"
                key={point.name}
                title={point.name}
                aria-label={point.name}
                style={{
                  transform: `translate3d(${point.x}px, ${point.y}px, 0) scale(${0.72 + depth * 0.42})`,
                  opacity: 0.28 + depth * 0.72,
                  filter: `blur(${(1 - depth) * 1.8}px)`,
                  zIndex: Math.round(depth * 100),
                }}
              >
                <img src={point.icon} alt={point.name} draggable={false} />
                <span>{point.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
