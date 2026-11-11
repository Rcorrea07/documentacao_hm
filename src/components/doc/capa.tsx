import { ExternalLink } from "lucide-react";
import { IPhoneFrame } from "@/components/ui/iphone-frame";
import { PROTOTIPO_URL, citacaoPersona, justificativa, projeto, simulacao } from "@/content/documentacao";
import { Secao } from "./secao";

const TELA_IFRAME = 292;

export function Capa() {
  return (
    <Secao id="capa" titulo="Capa">
      <div className="premium-depth-card overflow-hidden rounded-[28px] md:rounded-[40px]">
        <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-16 lg:p-14">
          <div className="min-w-0">
            <p className="text-sm text-blue-100/70">
              {projeto.instituicao} · {projeto.disciplina} · {projeto.professor}
            </p>
            <h3 className="text-card-silver-matte mt-6 pb-1 text-4xl leading-[1.05] font-black tracking-tight text-balance md:text-6xl">
              {projeto.titulo}
            </h3>
            <p className="mt-3 text-lg text-blue-100/80 md:text-xl">
              {projeto.subtitulo} · {projeto.eixo}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
              <div>
                <dt className="text-blue-100/60">Aluno</dt>
                <dd className="mt-0.5 text-base font-semibold text-white">{projeto.aluno}</dd>
              </div>
              <div>
                <dt className="text-blue-100/60">Matrícula</dt>
                <dd className="mt-0.5 text-base font-semibold text-white">{projeto.matricula}</dd>
              </div>
            </dl>

            <h4 className="mt-12 text-lg font-semibold text-white">Justificativa pela persona</h4>
            <p className="mt-3 max-w-[65ch] leading-relaxed text-pretty text-blue-100/80">
              {justificativa.antes}{" "}
              <q className="font-semibold text-white">{citacaoPersona}</q> {justificativa.depois}
            </p>

            <h4 className="mt-12 text-lg font-semibold text-white">Simulação de input, processamento e feedback</h4>
            <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {simulacao.map((s) => (
                <div key={s.termo} className="grid gap-1 py-4 md:grid-cols-[9rem_1fr] md:gap-6">
                  <dt className="font-semibold text-white">{s.termo}</dt>
                  <dd className="leading-relaxed text-pretty text-blue-100/80">{s.texto}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col items-start gap-3 lg:hidden">
              <a
                href={PROTOTIPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern-light inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-semibold"
              >
                Abrir protótipo <ExternalLink className="size-4" aria-hidden="true" />
              </a>
              <span className="text-sm break-all text-blue-100/70">{PROTOTIPO_URL.replace("https://", "")}</span>
            </div>
          </div>

          <figure className="hidden flex-col items-center gap-5 lg:flex">
            <IPhoneFrame largura={TELA_IFRAME}>
              <iframe
                src={`${PROTOTIPO_URL}/app/perfis`}
                title="Protótipo do Planejador Financeiro & Bolsa, ao vivo"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                className="absolute top-0 left-0 origin-top-left border-0 bg-black"
                style={{ width: 390, height: 844, transform: `scale(${TELA_IFRAME / 390})` }}
              />
            </IPhoneFrame>
            <figcaption className="flex flex-col items-center gap-3 text-center">
              <span className="text-sm text-blue-100/70">O app ao vivo. Toque para navegar.</span>
              <a
                href={PROTOTIPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern-light inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold"
              >
                Abrir em tela cheia <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </Secao>
  );
}
