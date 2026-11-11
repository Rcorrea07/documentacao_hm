"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SEM_MOVIMENTO = "(prefers-reduced-motion: no-preference)";

/**
 * Título com a entrada do hero: desfoque, escala e um leve giro em X,
 * quando entra na tela.
 */
export function TituloCinematico({
  children,
  id,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(SEM_MOVIMENTO, () => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 50, scale: 0.92, filter: "blur(16px)", rotationX: -16 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <Tag ref={ref} id={id} className={cn("will-change-transform", className)} style={{ transformPerspective: 800 }}>
      {children}
    </Tag>
  );
}

/**
 * Texto que acende palavra por palavra conforme o scroll.
 */
export function TextoRevelado({ texto, className, as: Tag = "p" }: { texto: string; className?: string; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(SEM_MOVIMENTO, () => {
      const palavras = ref.current?.querySelectorAll("[data-palavra]");
      if (!palavras?.length) return;
      gsap.fromTo(
        palavras,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 40%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {texto.split(" ").map((palavra, i) => (
        <span key={i} data-palavra>
          {palavra}{" "}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Revela os filhos diretos em cascata (sobe, desfoca e aparece) quando o
 * grupo entra na tela.
 */
export function Revelar({
  children,
  className,
  as: Tag = "div",
  atraso = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  atraso?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(SEM_MOVIMENTO, () => {
      const filhos = ref.current?.children;
      if (!filhos?.length) return;
      gsap.fromTo(
        filhos,
        { autoAlpha: 0, y: 36, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          delay: atraso,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        },
      );
    });
    return () => mm.revert();
  }, [atraso]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
