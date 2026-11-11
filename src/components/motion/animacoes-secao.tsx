"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Árvore da HTA: a raiz surge, o tronco e a barra se desenham e os três
 * objetivos descem em cascata. Marcadores: [data-raiz], [data-linha-v],
 * [data-linha-h], [data-objetivo].
 */
export function ArvoreAnimada({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(ref);
      gsap
        .timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } })
        .fromTo(q("[data-raiz]"), { autoAlpha: 0, y: 30, scale: 0.94, filter: "blur(12px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" })
        .fromTo(q("[data-linha-v]"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 0.35, ease: "power2.out" }, "-=0.5")
        .fromTo(q("[data-linha-h]"), { scaleX: 0 }, { scaleX: 1, transformOrigin: "center", duration: 0.5, ease: "power3.inOut" })
        .fromTo(
          q("[data-objetivo]"),
          { autoAlpha: 0, y: 40, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "expo.out", stagger: 0.12 },
          "-=0.2",
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Diagrama de classes: as caixas aparecem em cascata e as linhas se desenham.
 * Marcadores no SVG: [data-caixa], [data-relacao], [data-traco].
 */
export function DiagramaAnimado({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(ref);
      gsap.set(q("[data-traco]"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap
        .timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } })
        .fromTo(
          q("[data-caixa]"),
          { autoAlpha: 0, y: 24, scale: 0.96, transformOrigin: "center" },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.09 },
        )
        .fromTo(q("[data-relacao]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, "-=0.5")
        .to(q("[data-traco]"), { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.08 }, "<");
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Galeria horizontal: no computador, a seção fica fixa e a fila de telas
 * corre para o lado com o scroll. No celular, rolagem lateral nativa.
 */
export function GaleriaHorizontal({ children, rotulo }: { children: ReactNode; rotulo: string }) {
  const secaoRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const trilho = trilhoRef.current;
      if (!trilho) return;
      const distancia = () => Math.max(0, trilho.scrollWidth - trilho.clientWidth);
      gsap.to(trilho, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: secaoRef.current,
          start: "center center",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={secaoRef} className="relative lg:overflow-x-clip">
      <div
        className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:-mx-8 md:px-8 lg:overflow-visible"
        tabIndex={0}
        role="region"
        aria-label={rotulo}
      >
        <ul ref={trilhoRef} className="flex w-max snap-x snap-mandatory gap-8 will-change-transform lg:w-auto">
          {children}
        </ul>
      </div>
    </div>
  );
}
