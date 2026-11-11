import { ExternalLink } from "lucide-react";
import { Revelar, TituloCinematico } from "@/components/motion/revelar";
import { IPhoneFrame } from "@/components/ui/iphone-frame";
import { PROTOTIPO_URL } from "@/content/documentacao";

const TELA = 320;

/** Fechamento: o protótipo ao vivo dentro do iPhone. */
export function Experimente() {
  return (
    <section aria-labelledby="experimente-titulo" className="relative overflow-hidden py-28 md:py-40">
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-8 lg:grid-cols-[1fr_auto]">
        <div>
          <TituloCinematico
            id="experimente-titulo"
            className="text-silver-matte pb-2 text-5xl leading-[0.95] font-extrabold tracking-tighter text-balance md:text-7xl lg:text-8xl"
          >
            Experimente o protótipo.
          </TituloCinematico>
          <Revelar atraso={0.2}>
            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
              A tarefa inteira roda no navegador: perfil, login, resumo da bolsa, renda, tetos e gastos. Os dados ficam só neste
              aparelho.
            </p>
            <a
              href={PROTOTIPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern-light mt-10 inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-semibold whitespace-nowrap"
            >
              Abrir em tela cheia <ExternalLink className="size-5" aria-hidden="true" />
            </a>
          </Revelar>
        </div>

        <Revelar className="hidden justify-center lg:flex">
          <IPhoneFrame largura={TELA}>
            <iframe
              src={`${PROTOTIPO_URL}/app/perfis`}
              title="Protótipo do Planejador Financeiro & Bolsa, ao vivo"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="absolute top-0 left-0 origin-top-left border-0 bg-black"
              style={{ width: 390, height: 844, transform: `scale(${TELA / 390})` }}
            />
          </IPhoneFrame>
        </Revelar>
      </div>
    </section>
  );
}
