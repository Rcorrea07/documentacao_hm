"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { IPhoneFrame } from "@/components/ui/iphone-frame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Distância de scroll em que o hero fica fixo. */
const PIN_PX = 3000;

type Badge = { icon: ReactNode; titulo: string; detalhe: string };
type Cta = { href: string; rotulo: string; detalhe: string; icon: ReactNode; externo?: boolean };

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName: string;
  brandSubtitle?: string;
  tagline1: string;
  tagline2: string;
  cardHeading: string;
  cardDescription: ReactNode;
  screen: StaticImageData;
  screenAlt: string;
  badges: [Badge, Badge];
  ctaHeading: string;
  ctaDescription: string;
  ctas: [Cta, Cta];
}

function CtaLink({ cta, variante }: { cta: Cta; variante: "light" | "dark" }) {
  return (
    <a
      href={cta.href}
      {...(cta.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group flex items-center justify-center gap-3 rounded-[1.25rem] px-7 py-4 whitespace-nowrap",
        variante === "light" ? "btn-modern-light" : "btn-modern-dark",
      )}
    >
      <span className="size-6 transition-transform group-hover:scale-105 [&>svg]:size-6" aria-hidden="true">
        {cta.icon}
      </span>
      <span className="text-left">
        <span
          className={cn(
            "mb-[-2px] block text-[10px] font-bold tracking-wider uppercase",
            variante === "light" ? "text-neutral-500" : "text-neutral-400",
          )}
        >
          {cta.detalhe}
        </span>
        <span className="block text-xl leading-none font-bold tracking-tight">{cta.rotulo}</span>
      </span>
    </a>
  );
}

export function CinematicHero({
  brandName,
  brandSubtitle,
  tagline1,
  tagline2,
  cardHeading,
  cardDescription,
  screen,
  screenAlt,
  badges,
  ctaHeading,
  ctaDescription,
  ctas,
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // 1. Luz e inclinação seguindo o mouse (só com mouse e sem reduced motion).
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      let frame = 0;
      const onMove = (e: MouseEvent) => {
        if (window.scrollY > window.innerHeight * 2) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const card = mainCardRef.current;
          const mockup = mockupRef.current;
          if (!card || !mockup) return;
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockup, { rotationY: x * 12, rotationX: -y * 12, ease: "power3.out", duration: 1.2 });
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(frame);
        // Os tweens nascem no handler, fora do contexto do matchMedia.
        if (mockupRef.current) {
          gsap.killTweensOf(mockupRef.current);
          gsap.set(mockupRef.current, { clearProps: "transform" });
        }
      };
    });

    // 2. Linha do tempo de scroll. Com reduced motion, o CSS mostra o cartão parado.
    // Condições nomeadas: o matchMedia refaz a linha do tempo ao cruzar 768px.
    mm.add({ animar: "(prefers-reduced-motion: no-preference)", isMobile: "(max-width: 767px)" }, (mmCtx) => {
      const { animar, isMobile } = mmCtx.conditions as { animar: boolean; isMobile: boolean };
      if (!animar) return;
      const ctx = gsap.context(() => {
        gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
        gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
        gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
        gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-screen"], {
          autoAlpha: 0,
        });
        gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

        gsap
          .timeline({ delay: 0.3 })
          .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
          .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: `+=${PIN_PX}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
          .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
          .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
          .fromTo(
            ".mockup-scroll-wrapper",
            { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
            { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
            "-=0.8",
          )
          .fromTo(
            ".phone-screen",
            { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", ease: "power3.out", duration: 1.5 },
            "-=1.5",
          )
          .fromTo(
            ".floating-badge",
            { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
            { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
            "-=1.2",
          )
          .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
          .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
          .to({}, { duration: 1.5 })
          .set(".hero-text-wrapper", { autoAlpha: 0 })
          .set(".cta-wrapper", { autoAlpha: 1 })
          .to({}, { duration: 1 })
          .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
            scale: 0.9,
            y: -40,
            z: -200,
            autoAlpha: 0,
            ease: "power3.in",
            duration: 1.2,
            stagger: 0.05,
          })
          .to(
            ".main-card",
            {
              width: isMobile ? "92vw" : "85vw",
              height: isMobile ? "92vh" : "85vh",
              borderRadius: isMobile ? "32px" : "40px",
              ease: "expo.inOut",
              duration: 1.8,
            },
            "pullback",
          )
          .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
          .to(".main-card", { y: () => -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-svh w-full items-center justify-center overflow-hidden bg-background font-sans text-foreground antialiased",
        className,
      )}
      {...props}
      style={{ perspective: "1500px", ...props.style }}
    >
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true" />

      {/* Fundo 1: título */}
      <h1 className="hero-text-wrapper absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform motion-reduce:opacity-0">
        <span className="text-track gsap-reveal text-3d-matte mb-2 block text-5xl font-bold tracking-tight text-balance motion-reduce:visible md:text-7xl lg:text-[6rem]">
          {tagline1}
        </span>
        <span className="text-days gsap-reveal text-silver-matte block pb-2 text-5xl font-extrabold tracking-tighter text-balance motion-reduce:visible md:text-7xl lg:text-[6rem]">
          {tagline2}
        </span>
      </h1>

      {/* Fundo 2: chamada final */}
      <div className="cta-wrapper gsap-reveal pointer-events-auto absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform motion-reduce:pointer-events-none motion-reduce:opacity-0">
        <h2 className="text-silver-matte mb-6 pb-1 text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
          {ctaHeading}
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
          {ctaDescription}
        </p>
        <div className="flex flex-col gap-6 sm:flex-row">
          <CtaLink cta={ctas[0]} variante="light" />
          <CtaLink cta={ctas[1]} variante="dark" />
        </div>
      </div>

      {/* Frente: o cartão azul profundo */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[92svh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] motion-reduce:visible md:h-[85svh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
            {/* Marca */}
            <div className="card-right-text gsap-reveal order-1 z-20 flex w-full flex-col items-center motion-reduce:visible lg:order-3 lg:items-end">
              <p className="text-card-silver-matte text-[clamp(2.75rem,4vw,4.75rem)] leading-none font-black tracking-tighter uppercase">
                {brandName}
              </p>
              {brandSubtitle ? (
                <p className="mt-2 text-sm font-semibold tracking-[0.18em] text-blue-100/70 uppercase md:text-base">
                  {brandSubtitle}
                </p>
              ) : null}
            </div>

            {/* iPhone com a captura do app */}
            <div
              className="mockup-scroll-wrapper relative z-10 order-2 flex h-[380px] w-full items-center justify-center lg:order-2 lg:h-[600px]"
              style={{ perspective: "1000px" }}
            >
              <div className="relative flex h-full w-full scale-[0.65] items-center justify-center md:scale-85 lg:scale-100">
                <IPhoneFrame ref={mockupRef} largura={266} className="will-change-transform">
                  <Image
                    src={screen}
                    alt={screenAlt}
                    fill
                    sizes="266px"
                    className="phone-screen object-cover object-top"
                  />
                </IPhoneFrame>

                {badges.map((badge, i) => (
                  <div
                    key={badge.titulo}
                    className={cn(
                      "floating-badge floating-ui-badge absolute z-30 flex items-center gap-3 rounded-xl p-3 lg:gap-4 lg:rounded-2xl lg:p-4",
                      i === 0 ? "top-6 left-[-15px] lg:top-12 lg:left-[-80px]" : "right-[-15px] bottom-12 lg:right-[-80px] lg:bottom-20",
                    )}
                  >
                    <div className="flex size-8 items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-b from-blue-500/20 to-blue-900/10 text-blue-200 shadow-inner lg:size-10 [&>svg]:size-4 lg:[&>svg]:size-5">
                      {badge.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-tight text-white lg:text-sm">{badge.titulo}</p>
                      <p className="text-[10px] font-medium text-blue-100/70 lg:text-xs">{badge.detalhe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Texto do cartão */}
            <div className="card-left-text gsap-reveal order-3 z-20 flex w-full flex-col justify-center px-4 text-center motion-reduce:visible lg:order-1 lg:px-0 lg:text-left">
              <h2 className="mb-0 text-2xl font-bold tracking-tight text-balance text-white md:text-3xl lg:mb-5 lg:text-4xl">
                {cardHeading}
              </h2>
              <p className="mx-auto hidden max-w-sm text-sm leading-relaxed text-pretty text-blue-100/75 md:block md:text-base lg:mx-0 lg:max-w-none lg:text-lg">
                {cardDescription}
              </p>
              {/* Sem animação, a chamada final não aparece: os links ficam aqui. */}
              <div className="mt-6 hidden flex-col gap-4 motion-reduce:flex sm:flex-row lg:justify-start">
                <CtaLink cta={ctas[0]} variante="light" />
                <CtaLink cta={ctas[1]} variante="dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
