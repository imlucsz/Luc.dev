import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import { certifications } from "@/data/certifications";

function CertificationCard({
  certification,
  duplicate = false,
}: {
  certification: (typeof certifications)[number];
  duplicate?: boolean;
}) {
  const card = (
    <article className="h-full rounded-2xl border border-white/10 bg-neutral-900/50 p-6 shadow-lg shadow-black/10 transition-[transform,border-color,box-shadow] duration-300 hover:scale-105 hover:border-red-400/50 hover:shadow-red-950/30">
      <div className="relative mb-5 h-40 overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
        <Image
          src={certification.imageUrl}
          alt={certification.imageAlt}
          fill
          sizes="320px"
          className="object-contain"
        />
      </div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-red-300">
          <Award size={22} aria-hidden="true" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
          {certification.technology}
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-zinc-100">
        {certification.name}
      </h3>
      <p className="mt-2 text-sm text-zinc-400">{certification.issuer}</p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          {certification.date}
        </p>
        {certification.credentialUrl && (
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={duplicate ? -1 : undefined}
            aria-label={`Validar credencial: ${certification.name}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-300 transition-colors hover:text-red-200"
          >
            Ver credencial
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );

  return duplicate ? (
    <div aria-hidden="true" className="w-[min(86vw,300px)] shrink-0 sm:w-72">
      {card}
    </div>
  ) : (
    <div className="w-[min(86vw,300px)] shrink-0 sm:w-72">{card}</div>
  );
}

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="overflow-hidden border-t border-zinc-800/40 bg-zinc-950 py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8">
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-red-400">
            Aprendizado contínuo
          </p>
          <h2
            id="certifications-title"
            className="text-2xl font-bold text-zinc-100 md:text-3xl"
          >
            Certificações &amp; Credenciais
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Certificações, cursos e credenciais que complementam minha
            trajetória em tecnologia.
          </p>
        </div>

        {certifications.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-neutral-900/50 px-6 py-10 text-center">
            <Award
              size={28}
              aria-hidden="true"
              className="mx-auto mb-3 text-zinc-500"
            />
            <p className="text-sm text-zinc-400">
              Nenhuma certificação cadastrada no momento.
            </p>
          </div>
        ) : (
          <div className="group relative -mx-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 sm:overflow-hidden">
            <div className="certifications-marquee flex w-max gap-4 py-2 lg:gap-5">
              {[false, true].map((duplicate) => (
                <div
                  key={duplicate ? "duplicate" : "original"}
                  aria-hidden={duplicate || undefined}
                  className="flex w-max gap-4 lg:gap-5"
                >
                  {certifications.map((certification, index) => (
                    <CertificationCard
                      key={`${certification.name}-${index}`}
                      certification={certification}
                      duplicate={duplicate}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
