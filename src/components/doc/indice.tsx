"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { PROTOTIPO_URL, secoes, type SecaoId } from "@/content/documentacao";
import { cn } from "@/lib/utils";

export function Indice() {
  const [ativa, setAtiva] = useState<SecaoId | null>(null);
  const listaRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const alvos = secoes
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // A seção ativa é a que cruza uma faixa logo abaixo do índice.
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setAtiva(e.target.id as SecaoId);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    alvos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // No celular, mantém o link ativo visível na barra rolável.
  useEffect(() => {
    const lista = listaRef.current;
    const link = lista?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!lista || !link) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const esquerda = link.offsetLeft - 16;
    const direita = link.offsetLeft + link.offsetWidth - lista.clientWidth + 16;
    if (lista.scrollLeft > esquerda) lista.scrollTo({ left: esquerda, behavior });
    else if (lista.scrollLeft < direita) lista.scrollTo({ left: direita, behavior });
  }, [ativa]);

  return (
    <nav
      aria-label="Seções da documentação"
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-8">
        <a href="#capa" className="hidden shrink-0 text-sm font-bold tracking-tight lg:block">
          Planejador Financeiro &amp; Bolsa
        </a>
        <ol
          ref={listaRef}
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {secoes.map((s, i) => {
            const atual = ativa === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={atual ? "location" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-200",
                    atual ? "bg-[var(--deep)] font-semibold text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className={cn("tabular-nums", atual ? "text-[var(--novo)]" : "opacity-60")}>{i + 1}</span>
                  {s.rotulo}
                </a>
              </li>
            );
          })}
        </ol>
        <a
          href={PROTOTIPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-modern-dark hidden shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold sm:inline-flex"
        >
          Protótipo <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
