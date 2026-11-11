"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { secoes } from "@/content/documentacao";
import { RECORTE_CARTAO, RECORTE_CHEIO, SlideSecao, slides } from "./slide-secao";

/**
 * Transição entre seções: ao clicar num link "#secao", o cartão azul do hero
 * sobe, abre até a tela cheia com o iPhone e o nome da seção, a página pula
 * para o destino e o cartão sai por cima. Com reduced motion, só pula.
 */
export function TransicaoSecoes() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const ocupado = useRef(false);

  useEffect(() => {
    const ids = new Set<string>(secoes.map((s) => s.id));

    const pular = (alvo: HTMLElement, id: string) => {
      // scrollIntoView erra a posição no celular por causa do pin do hero; a conta direta não.
      window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - 64, behavior: "instant" });
      history.pushState(null, "", `#${id}`);
      // O foco vai para a seção (o título ainda está invisível antes de entrar).
      alvo.setAttribute("tabindex", "-1");
      alvo.focus({ preventScroll: true });
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id || !ids.has(id)) return;
      const alvo = document.getElementById(id);
      const overlay = overlayRef.current;
      if (!alvo || !overlay) return;
      e.preventDefault();

      const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduzir) {
        pular(alvo, id);
        return;
      }
      if (ocupado.current) return;
      ocupado.current = true;

      const q = gsap.utils.selector(overlay);
      const indice = slides.findIndex((s) => s.id === id);
      const slide = q(`[data-slide="${indice}"]`);
      const celular = q(`[data-slide="${indice}"] [data-celular]`);
      const textos = q(`[data-slide="${indice}"] [data-texto]`);
      const h = window.innerHeight;

      gsap.set(q("[data-slide]"), { autoAlpha: 0 });
      gsap.set(slide, { autoAlpha: 1 });
      gsap.set(overlay, { autoAlpha: 1, y: h + 120, clipPath: RECORTE_CARTAO });

      gsap
        .timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            gsap.set(overlay, { autoAlpha: 0 });
            ocupado.current = false;
          },
        })
        // Entrada: o cartão sobe e abre, o iPhone gira para a frente.
        .to(overlay, { y: 0, duration: 0.5, ease: "power3.inOut" })
        .to(overlay, { clipPath: RECORTE_CHEIO, duration: 0.35, ease: "power3.inOut" })
        .fromTo(
          celular,
          { y: 220, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "expo.out" },
          "-=0.45",
        )
        .fromTo(
          textos,
          { x: -50, autoAlpha: 0, filter: "blur(12px)" },
          { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.6, ease: "power4.out", stagger: 0.06 },
          "<0.1",
        )
        // Troca: com o cartão cobrindo tudo, a página pula para a seção.
        .add(() => pular(alvo, id), "+=0.12")
        // Saída: conteúdo recua, o cartão fecha e sobe para fora.
        .to([celular, textos], { scale: 0.9, y: -40, z: -200, autoAlpha: 0, duration: 0.35, ease: "power3.in", stagger: 0.04 })
        .to(overlay, { clipPath: RECORTE_CARTAO, duration: 0.35, ease: "power3.inOut" }, "-=0.1")
        .to(overlay, { y: -h - 120, duration: 0.5, ease: "power3.in" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="premium-depth-card invisible fixed inset-0 z-[60] overflow-hidden"
      style={{ perspective: "1500px" }}
      aria-hidden="true"
    >
      <div className="film-grain" />
      {slides.map((s, i) => (
        <div key={s.id} data-slide={i} className="invisible absolute inset-0">
          <SlideSecao indice={i} eager />
        </div>
      ))}
    </div>
  );
}
