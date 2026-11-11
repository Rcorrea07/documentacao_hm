import { ExternalLink } from "lucide-react";
import { CelularRolante } from "@/components/motion/celular-rolante";
import { Revelar, TextoRevelado } from "@/components/motion/revelar";
import { PROTOTIPO_URL, citacaoPersona, justificativa, projeto, simulacao } from "@/content/documentacao";
import { ChipTela, Marca, Secao, Sub } from "./secao";

const meta = [
  { termo: "Aluno", valor: projeto.aluno },
  { termo: "Matrícula", valor: projeto.matricula },
  { termo: "Disciplina", valor: projeto.disciplina },
  { termo: "Professor", valor: projeto.professor },
];

export function Capa() {
  return (
    <Secao id="capa" titulo="Capa" resumo={`${projeto.subtitulo} · ${projeto.eixo}.`}>
      <Revelar>
        <div className="premium-depth-card overflow-hidden rounded-[28px] p-8 sm:p-12 md:rounded-[40px] lg:p-16">
          <div className="film-grain rounded-[inherit]" aria-hidden="true" />
          <p className="text-sm text-blue-100/70">{projeto.instituicao}</p>
          <p className="text-card-silver-matte mt-5 pb-2 text-5xl leading-[0.95] font-black tracking-tighter text-balance md:text-7xl lg:text-8xl">
            {projeto.titulo}
          </p>
          <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.termo}>
                <dt className="text-sm text-blue-100/60">{m.termo}</dt>
                <dd className="mt-1 font-semibold text-pretty text-white">{m.valor}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={PROTOTIPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern-light inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-semibold whitespace-nowrap"
            >
              Abrir protótipo <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <span className="text-sm break-all text-blue-100/70">{PROTOTIPO_URL.replace("https://", "")}</span>
          </div>
        </div>
      </Revelar>

      <Sub>Justificativa pela persona</Sub>
      <TextoRevelado
        texto={`${justificativa.antes} “${citacaoPersona}” ${justificativa.depois}`}
        className="max-w-[34ch] text-2xl leading-snug font-semibold tracking-tight text-pretty text-foreground md:text-4xl lg:text-[2.6rem]"
      />

      <Sub>Input, processamento e feedback</Sub>
      <CelularRolante
        passos={simulacao.map((s) => ({
          id: s.termo,
          rotulo: s.termo,
          imagem: s.imagem,
          alt: `${s.termo}: Tela ${s.tela} do protótipo`,
          legenda: `Tela ${s.tela}`,
          conteudo: (
            <div className="max-w-xl">
              <Marca>{s.termo}</Marca>
              <p className="mt-6 text-xl leading-relaxed text-pretty text-muted-foreground md:text-2xl">{s.texto}</p>
              <div className="mt-6">
                <ChipTela id={s.tela} />
              </div>
            </div>
          ),
        }))}
      />
    </Secao>
  );
}
