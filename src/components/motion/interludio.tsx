"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RECORTE_CARTAO, RECORTE_CHEIO, SlideSecao } from "./slide-secao";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Transição entre seções guiada pelo scroll. O bloco tem 280svh com um palco
 * fixo (sticky) de uma tela. O próprio scroll traz o cartão de baixo e o leva
 * para cima; a linha do tempo só abre o recorte, gira o iPhone para a frente,
 * mostra o nome da seção e fecha tudo na saída.
 * Com reduced motion o bloco some: a seção abre com o próprio título.
 */
export function Interludio({ indice }: { indice: number }) {
  const blocoRef = useRef<HTMLDivElement>(null);
  const cartaoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(cartaoRef);
      const celular = q("[data-celular]");
      const textos = q("[data-texto]");

      // Unidades da linha do tempo = alturas de tela de scroll (bloco 2,8 + entrada 1).
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: blocoRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        })
        // Subindo com o scroll: o cartão se abre até a tela cheia.
        .fromTo(cartaoRef.current, { clipPath: RECORTE_CARTAO }, { clipPath: RECORTE_CHEIO, duration: 0.6, ease: "power2.inOut" }, 0.4)
        // Palco fixo: o iPhone entra em 3D e o nome da seção aparece.
        .fromTo(
          celular,
          { y: 220, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "expo.out" },
          0.85,
        )
        .fromTo(
          textos,
          { x: -50, autoAlpha: 0, filter: "blur(12px)" },
          { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out", stagger: 0.08 },
          1.0,
        )
        // Saída: o conteúdo recua e o cartão fecha enquanto o scroll o leva embora.
        .to([celular, textos], { scale: 0.9, y: -40, z: -200, autoAlpha: 0, duration: 0.5, ease: "power2.in", stagger: 0.04 }, 2.1)
        .to(cartaoRef.current, { clipPath: RECORTE_CARTAO, duration: 0.6, ease: "power2.inOut" }, 2.6)
        .set({}, {}, 3.8);
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={blocoRef} className="relative h-[280svh] motion-reduce:hidden" aria-hidden="true">
      <div className="sticky top-0 h-svh overflow-hidden" style={{ perspective: "1500px" }}>
        <div ref={cartaoRef} className="premium-depth-card absolute inset-0" style={{ clipPath: RECORTE_CARTAO }}>
          <div className="film-grain" />
          <SlideSecao indice={indice} />
        </div>
      </div>
    </div>
  );
}
