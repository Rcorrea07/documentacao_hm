import Image from "next/image";
import { IPhoneFrame } from "@/components/ui/iphone-frame";
import { secoes, telas, type TelaId } from "@/content/documentacao";
import { cn } from "@/lib/utils";

/** A tela que representa cada seção no cartão de transição. */
const telaDaSecao: Record<(typeof secoes)[number]["id"], TelaId> = {
  capa: "5",
  "user-story": "9",
  "analise-da-tarefa": "4",
  "fluxo-de-informacao": "8",
  wireframe: "10",
};

export const slides = secoes.map((s, i) => {
  const tela = telas.find((t) => t.id === telaDaSecao[s.id])!;
  return { ...s, numero: i + 1, imagem: tela.imagem };
});

export const RECORTE_CARTAO = "inset(7% 7% 7% 7% round 40px)";
export const RECORTE_CHEIO = "inset(0% 0% 0% 0% round 0px)";

/**
 * Conteúdo do cartão de transição: número, nome da seção e o iPhone.
 * Marcadores para a animação: [data-texto] e [data-celular].
 */
export function SlideSecao({ indice, className, eager }: { indice: number; className?: string; eager?: boolean }) {
  const s = slides[indice];
  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between md:gap-16 md:px-12",
        className,
      )}
    >
      <div className="order-2 w-full text-center md:order-1 md:w-auto md:text-left">
        <p data-texto className="text-lg font-semibold text-blue-100/70 tabular-nums">
          {s.numero} / {slides.length}
        </p>
        <p
          data-texto
          className="text-card-silver-matte mt-3 pb-2 text-[2.75rem] leading-[0.95] font-black tracking-tighter text-balance break-words sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {s.rotulo}
        </p>
      </div>
      <div data-celular className="order-1 will-change-transform md:order-2" style={{ transformStyle: "preserve-3d" }}>
        <IPhoneFrame largura={210} className="md:hidden">
          <Image src={s.imagem} alt="" fill sizes="210px" loading={eager ? "eager" : undefined} className="object-cover object-top" />
        </IPhoneFrame>
        <IPhoneFrame largura={260} className="hidden md:block">
          <Image src={s.imagem} alt="" fill sizes="260px" loading={eager ? "eager" : undefined} className="object-cover object-top" />
        </IPhoneFrame>
      </div>
    </div>
  );
}
