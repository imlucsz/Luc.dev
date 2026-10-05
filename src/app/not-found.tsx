import Link from "next/link";
import { Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Página não encontrada | Lucas Araujo",
  description: "A página que você procurou não foi encontrada.",
};

export default function NotFound() {
  return (
    <main className="not-found-page relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 text-zinc-100 sm:px-6">
      <div aria-hidden="true" className="not-found-glow" />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-emerald-400 sm:text-sm">
            Sinal perdido
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Essa página saiu do ar
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base lg:mx-0">
            Procuramos em todos os canais, mas não encontramos esse endereço.
            Talvez ele tenha mudado de frequência.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-400/15 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <Home size={16} aria-hidden="true" />
            Voltar ao início
          </Link>
        </div>

        <figure
          className="order-1 mx-auto w-full max-w-[27rem] lg:order-2"
          aria-labelledby="tv404-caption"
        >
          <div className="tv404-antenna" aria-hidden="true">
            <span className="tv404-antenna-rod tv404-antenna-rod-left" />
            <span className="tv404-antenna-rod tv404-antenna-rod-right" />
            <span className="tv404-antenna-tip" />
          </div>

          <div className="tv404-shell">
            <div className="tv404-screen-frame">
              <div className="tv404-screen">
                <span className="tv404-screen-label">ERROR</span>
                <strong className="tv404-digits">404</strong>
                <span className="tv404-screen-caption">PAGE NOT FOUND</span>
              </div>
            </div>

            <div className="tv404-controls" aria-hidden="true">
              <span className="tv404-control-knob" />
              <span className="tv404-control-knob tv404-control-knob-small" />
              <span className="tv404-speaker">
                {Array.from({ length: 12 }, (_, index) => (
                  <i key={index} />
                ))}
              </span>
            </div>
          </div>
          <div className="tv404-stand" aria-hidden="true">
            <span />
          </div>
          <figcaption id="tv404-caption" className="sr-only">
            Um televisor retrô exibe o erro 404 em verde neon.
          </figcaption>
        </figure>

      </div>
    </main>
  );
}
