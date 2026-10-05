"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Briefcase, GraduationCap } from "lucide-react";
import { profileData } from "@/data/profile";

export function Experience() {
  return (
    <section
      id="experience"
      className="py-16 md:py-20 border-t border-zinc-800/40 bg-zinc-950/50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
          <div>
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Briefcase size={16} />
              <span>Trajetória Profissional</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-6">
              Experiência
            </h3>

            <div className="space-y-7">
              {profileData.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-6 border-l-2 border-red-700/50 hover:border-red-500 transition-colors"
                >
                  <span className="text-xs font-mono text-red-400">
                    {exp.period}
                  </span>
                  <h4 className="text-xl font-bold text-zinc-100 mt-1">
                    {exp.role}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2 mb-3">
                    {exp.logoUrl && (
                      <span className="relative h-14 w-28 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image
                          src={exp.logoUrl}
                          alt={`${exp.company} logo`}
                          fill
                          sizes="112px"
                          className="object-contain p-1"
                        />
                      </span>
                    )}
                    <span>{exp.company}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-widest mb-2">
              <GraduationCap size={16} />
              <span>Educação & Base</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-6">Formação</h3>

            <div className="space-y-6">
              {profileData.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30"
                >
                  <div                   className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs font-mono text-zinc-500 mb-2">
                    <span className="text-red-400 font-semibold">
                      {edu.status}
                    </span>
                    <span>{edu.period}</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-200">
                    {edu.course}
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1">
                    {edu.institution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
