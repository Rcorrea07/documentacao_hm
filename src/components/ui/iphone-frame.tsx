import type { CSSProperties, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

/** Proporção da tela capturada (390×844) + a faixa de status (47 pt). */
const TELA_W = 390;
const TELA_H = 844;
const STATUS_H = 47;

export interface IPhoneFrameProps {
  /** Largura da tela em px (sem o aro). */
  largura?: number;
  /** Cor da faixa de status, que continua o cabeçalho do app. */
  faixa?: string;
  /** Mostra os botões laterais (só em tamanhos grandes). */
  botoes?: boolean;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
}

/**
 * Moldura de iPhone do CinematicHero, sem 3D. A tela fica abaixo de uma faixa
 * de status com a ilha dinâmica, para não cobrir o cabeçalho do app.
 */
export function IPhoneFrame({
  largura = 266,
  faixa = "var(--app)",
  botoes = largura >= 240,
  className,
  style,
  ref,
  children,
}: IPhoneFrameProps) {
  const escala = largura / TELA_W;
  const aro = Math.max(4, Math.round(7 * Math.min(1, escala * 1.4)));

  return (
    <div
      ref={ref}
      className={cn("iphone-bezel relative shrink-0", className)}
      style={{
        width: largura + aro * 2,
        padding: aro,
        borderRadius: Math.round(largura * 0.16),
        ...style,
      }}
    >
      {botoes ? (
        <>
          <div className="hardware-btn absolute top-[20%] -left-[3px] h-[4%] w-[3px] rounded-l-md" aria-hidden="true" />
          <div className="hardware-btn absolute top-[27%] -left-[3px] h-[8%] w-[3px] rounded-l-md" aria-hidden="true" />
          <div className="hardware-btn absolute top-[37%] -left-[3px] h-[8%] w-[3px] rounded-l-md" aria-hidden="true" />
          <div className="hardware-btn absolute top-[29%] -right-[3px] h-[12%] w-[3px] scale-x-[-1] rounded-r-md" aria-hidden="true" />
        </>
      ) : null}

      <div
        className="relative overflow-hidden bg-black"
        style={{
          aspectRatio: `${TELA_W} / ${TELA_H + STATUS_H}`,
          borderRadius: Math.round(largura * 0.14),
        }}
      >
        <div className="relative flex items-center justify-center" style={{ height: `${(STATUS_H / (TELA_H + STATUS_H)) * 100}%`, background: faixa }}>
          <div
            className="rounded-full bg-black shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]"
            style={{ width: "32%", height: "62%" }}
            aria-hidden="true"
          />
        </div>
        <div className="relative" style={{ aspectRatio: `${TELA_W} / ${TELA_H}` }}>
          {children}
        </div>
        <div className="screen-glare pointer-events-none absolute inset-0" aria-hidden="true" />
      </div>
    </div>
  );
}
