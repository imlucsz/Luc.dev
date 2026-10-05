"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { User, Code, GraduationCap } from "lucide-react";
import { profileData } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-20 border-t border-zinc-800/40 bg-zinc-950"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div             className="relative group w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-red-700 to-red-950 blur opacity-30 group-hover:opacity-70 transition duration-500" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <Image
                  src="/profile.jpeg"
                  alt={profileData.name}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-widest">
              <User size={16} />
              <span>Sobre Mim</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100">
              Transformando lógica em sistemas escaláveis
            </h3>

            <p className="text-zinc-400 leading-relaxed">{profileData.about}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-1">
                  <Code size={18} />
                  <span className="text-sm">Foco Atual</span>
                </div>
                <p className="text-xs text-zinc-400">
                  APIs RESTful, automação com IA, arquitetura de software e
                  gestão de bancos SQL e NoSQL.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-1">
                  <GraduationCap size={18} />
                  <span className="text-sm">Formação Ativa</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Cursando DSM na Fatec Itaquera · Técnico em Administração
                  concluído (ETEC).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
