"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IPhoneFrame } from "@/components/ui/iphone-frame";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Passo = {
  id: string;
  /** Rótulo curto do trilho (ex.: "1.1", "Tela 5"). */
  rotulo: string;
  imagem: StaticImageData;
  alt: string;
  /** Legenda sob o celular (ex.: "Tela 7 · renda insuficiente"). */
  legenda?: string;
  /** Wireframe entregue, mostrado como papel atrás do celular. */
  wireframe?: StaticImageData;
  conteudo: ReactNode;
};

/**
 * Largura da tela do celular para caber na altura da janela, com a legenda e
 * os botões de passo à vista. Altura do aparelho ≈ 2,285 × largura + aro.
 */
function larguraPelaAltura(alturaJanela: number) {
  const disponivel = alturaJanela - 64 - 32 - 132; // índice fixo, respiro, legenda + botões
  return Math.round(Math.min(300, Math.max(130, (disponivel - 14) / 2.285)));
}

/**
 * Scrollytelling: o texto de cada passo rola à esquerda e o celular fica fixo
 * à direita, trocando de tela conforme o passo ativo. No celular (abaixo de lg),
 * cada passo traz a própria tela, sem fixar nada.
 */
export function CelularRolante({ passos, comWireframe = false }: { passos: Passo[]; comWireframe?: boolean }) {
  const [ativo, setAtivo] = useState(0);
  const [largura, setLargura] = useState(288);
  const itensRef = useRef<Array<HTMLLIElement | null>>([]);
  const raizRef = useRef<HTMLDivElement>(null);
  const celularRef = useRef<HTMLDivElement>(null);
  // Enquanto a rolagem de um clique no trilho anda, o celular fica no destino
  // em vez de passar por todas as telas do meio.
  const navegando = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        if (navegando.current !== null) return;
        for (const e of entradas) {
          if (e.isIntersecting) setAtivo(Number((e.target as HTMLElement).dataset.indice));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    itensRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const medir = () => setLargura(larguraPelaAltura(window.innerHeight));
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  // O celular gira de leve ao longo da seção, como no hero.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        celularRef.current,
        { rotationY: -14, rotationX: 6 },
        {
          rotationY: 10,
          rotationX: -4,
          ease: "none",
          scrollTrigger: { trigger: raizRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    });
    return () => mm.revert();
  }, []);

  const soltarRef = useRef<() => void>(() => {});

  const soltar = () => {
    window.removeEventListener("scrollend", soltarRef.current);
    if (navegando.current !== null) window.clearTimeout(navegando.current);
    navegando.current = null;
  };

  useEffect(() => () => soltarRef.current(), []);

  const irPara = (i: number) => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    soltarRef.current();
    setAtivo(i);
    soltarRef.current = soltar;
    // scrollend não existe em todo Safari: o tempo-limite garante a soltura.
    navegando.current = window.setTimeout(soltar, 1200);
    window.addEventListener("scrollend", soltar, { once: true });
    itensRef.current[i]?.scrollIntoView({ block: "center", behavior: reduzir ? "auto" : "smooth" });
  };

  const atual = passos[ativo];

  return (
    <div ref={raizRef} className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,auto)] lg:gap-16 xl:gap-24">
      <ol className="relative">
        {passos.map((p, i) => (
          <li
            key={p.id}
            ref={(el) => {
              itensRef.current[i] = el;
            }}
            data-indice={i}
            className="flex flex-col justify-center py-14 lg:min-h-[78svh] lg:py-0"
          >
            <div
              className={cn(
                "transition-[opacity,filter,transform] duration-700 ease-[var(--ease-out-strong)]",
                i === ativo
                  ? "lg:opacity-100"
                  : "lg:translate-y-2 lg:opacity-30 lg:blur-[1.5px] motion-reduce:lg:translate-y-0 motion-reduce:lg:opacity-100 motion-reduce:lg:blur-none",
              )}
            >
              {p.conteudo}
            </div>
            <figure className="mt-10 flex flex-col items-center gap-3 lg:hidden">
              <IPhoneFrame largura={220}>
                <Image src={p.imagem} alt={p.alt} fill sizes="220px" className="object-cover object-top" />
              </IPhoneFrame>
              {p.legenda ? <figcaption className="text-sm text-muted-foreground">{p.legenda}</figcaption> : null}
            </figure>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col items-center justify-center gap-6">
          <div className="relative" style={{ perspective: "1200px" }}>
            {comWireframe ? (
              <div
                className="absolute top-[6%] hidden -rotate-6 rounded-2xl bg-[#e9edf5] p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] xl:block"
                style={{ width: Math.round(largura * 0.64), left: -Math.round(largura * 0.6) }}
                aria-hidden="true"
              >
                <div className="relative aspect-[424/827] overflow-hidden rounded-xl bg-white">
                  {passos.map((p, i) =>
                    p.wireframe ? (
                      <Image
                        key={p.id}
                        src={p.wireframe}
                        alt=""
                        fill
                        sizes="192px"
                        className={cn(
                          "object-contain transition-[opacity,visibility] duration-300 ease-[var(--ease-out-strong)]",
                          i === ativo ? "visible opacity-100" : "invisible opacity-0",
                        )}
                      />
                    ) : null,
                  )}
                  {!atual.wireframe ? (
                    <p className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs font-medium text-slate-500">
                      Sem wireframe: a tela entrou depois da entrega.
                    </p>
                  ) : null}
                </div>
                <p className="px-1 pt-2 pb-0.5 text-[11px] font-semibold text-slate-600">Wireframe entregue</p>
              </div>
            ) : null}

            <div ref={celularRef}>
              <IPhoneFrame largura={largura}>
                {passos.map((p, i) => (
                  <Image
                    key={p.id}
                    src={p.imagem}
                    alt={i === ativo ? p.alt : ""}
                    aria-hidden={i === ativo ? undefined : true}
                    fill
                    sizes="300px"
                    className={cn(
                      "object-cover object-top transition-[opacity,visibility] duration-300 ease-[var(--ease-out-strong)]",
                      i === ativo ? "visible opacity-100" : "invisible opacity-0",
                    )}
                  />
                ))}
              </IPhoneFrame>
            </div>
          </div>

          <p className="h-5 text-sm text-muted-foreground" aria-live="polite">
            {atual.legenda}
          </p>

          <div className="flex max-w-[28rem] flex-wrap justify-center gap-1.5" aria-label="Ir para o passo">
            {passos.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => irPara(i)}
                aria-current={i === ativo ? "step" : undefined}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums transition-[background-color,color,transform] duration-200 active:scale-95",
                  i === ativo
                    ? "bg-[var(--app)] text-white"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground",
                )}
              >
                {p.rotulo}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
