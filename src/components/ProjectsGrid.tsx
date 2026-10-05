"use client";

import { projects } from "@/data/projects";
import { ProjectSpotlightCards } from "./ui/SpotlightCard";

export function ProjectsGrid() {
  return (
    <section id="projects" className="py-16 md:py-20 px-4 sm:px-6 relative bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-2 mb-9">
          <span className="font-mono text-xs text-red-400 uppercase tracking-widest">
            Portfólio
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
            Projetos em Destaque
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl">
            Um projeto autoral de automação e integração de serviços,
            desenvolvido como Trabalho de Conclusão de Curso.
          </p>
        </div>

        <ProjectSpotlightCards projects={projects} />
      </div>
    </section>
  );
}
