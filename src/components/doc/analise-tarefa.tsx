import { ArvoreAnimada } from "@/components/motion/animacoes-secao";
import { CelularRolante } from "@/components/motion/celular-rolante";
import { Revelar } from "@/components/motion/revelar";
import { htaObjetivos, htaOperacoes, htaRaiz, planos, tabela2, usabilidade } from "@/content/documentacao";
import { ChipTela, ChipsTelas, Linhas, Marca, Secao, Sub } from "./secao";

const colunasTabela2 = [
  { chave: "plano", rotulo: "Plano" },
  { chave: "input", rotulo: "Input" },
  { chave: "feedback", rotulo: "Feedback" },
  { chave: "problema", rotulo: "Problema" },
  { chave: "recomendacao", rotulo: "Recomendação" },
] as const;

function ArvoreHTA() {
  return (
    <ArvoreAnimada>
      <div role="group" aria-label="Árvore da Análise Hierárquica da Tarefa">
        <div data-raiz className="premium-depth-card mx-auto max-w-2xl rounded-3xl px-8 py-7 text-center">
          <p className="text-xl font-semibold text-balance text-white md:text-2xl">
            <span className="text-[var(--novo)]">{htaRaiz.codigo}.</span> {htaRaiz.titulo}
          </p>
          <p className="mt-2 text-sm text-blue-100/70">{htaRaiz.plano}</p>
        </div>

        <div className="relative hidden h-14 md:block" aria-hidden="true">
          <div data-linha-v className="absolute top-0 left-1/2 h-7 w-px bg-[var(--tinta)]/50" />
          <div data-linha-h className="absolute top-7 right-[16.66%] left-[16.66%] h-px bg-[var(--tinta)]/50" />
        </div>

        <ol className="grid gap-12 max-md:mt-12 md:grid-cols-3 md:gap-8">
          {htaObjetivos.map((obj) => (
            <li key={obj.codigo} data-objetivo className="relative">
              <div className="absolute -top-7 left-1/2 hidden h-7 w-px bg-[var(--tinta)]/50 md:block" aria-hidden="true" />
              <div className="border-t border-[var(--app)] pt-6">
                <p className="text-silver-matte pb-1 text-5xl font-black tracking-tighter">{obj.codigo}</p>
                <p className="mt-3 text-xl font-semibold text-balance">{obj.titulo}</p>
                <p className="mt-1 text-sm text-muted-foreground">{obj.plano}</p>
                <ol className="mt-5 space-y-3">
                  {obj.passos.map((p) => (
                    <li key={p.codigo} className="grid grid-cols-[2.75rem_1fr] text-pretty">
                      <span className="font-mono text-sm leading-6 text-[var(--novo)]">{p.codigo}</span>
                      <span className="leading-6 text-muted-foreground">{p.titulo}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5">
                  <ChipsTelas ids={obj.telas} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ArvoreAnimada>
  );
}

function DetalheOperacao({ indice }: { indice: number }) {
  const op = htaOperacoes[indice];
  const obj = htaObjetivos[op.objetivo];
  const linha = tabela2[op.objetivo];
  // A linha da Tabela 2 é do objetivo: a 1ª operação mostra plano, input e feedback; a 2ª, problema e recomendação.
  const primeira = htaOperacoes.findIndex((o) => o.objetivo === op.objetivo) === indice;
  const campos = primeira
    ? [
        { termo: "Plano", texto: linha.plano },
        { termo: "Input", texto: linha.input },
        { termo: "Feedback", texto: linha.feedback },
      ]
    : [
        { termo: "Problema", texto: linha.problema },
        { termo: "Recomendação", texto: linha.recomendacao },
      ];

  return (
    <div className="max-w-xl">
      <Marca>{op.codigo}</Marca>
      <p className="mt-5 text-2xl leading-snug font-semibold text-balance md:text-3xl">{op.titulo}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Objetivo {obj.codigo} · {obj.titulo}
      </p>
      <dl className="mt-8 space-y-4">
        {campos.map((c) => (
          <div key={c.termo}>
            <dt className="text-sm font-semibold text-[var(--novo)]">{c.termo}</dt>
            <dd className="mt-1 leading-relaxed text-pretty text-muted-foreground">{c.texto}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6">
        <ChipTela id={op.tela} />
      </div>
    </div>
  );
}

export function AnaliseTarefa() {
  return (
    <Secao
      id="analise-da-tarefa"
      titulo="Análise da Tarefa"
      resumo="Análise hierárquica (HTA) da tarefa principal: conferir a bolsa, montar o orçamento e lançar gastos ao longo do mês."
    >
      <ArvoreHTA />

      <Sub>Cada operação, na tela que a executa</Sub>
      <CelularRolante
        passos={htaOperacoes.map((op, i) => ({
          id: op.codigo,
          rotulo: op.codigo,
          imagem: op.imagem,
          alt: `Operação ${op.codigo}: Tela ${op.tela} do protótipo`,
          legenda: `Tela ${op.tela}`,
          conteudo: <DetalheOperacao indice={i} />,
        }))}
      />

      <Sub>Planos</Sub>
      <Revelar>
        <Linhas itens={planos} />
      </Revelar>

      <Sub>Critérios de usabilidade (NBR ISO 9241-11)</Sub>
      <Revelar className="grid gap-12 md:grid-cols-3">
        {usabilidade.map((u) => (
          <div key={u.termo}>
            <p className="text-silver-matte pb-1 text-4xl font-black tracking-tight">{u.termo}</p>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{u.texto}</p>
          </div>
        ))}
      </Revelar>

      <details className="group mt-24 rounded-3xl bg-white/[0.03]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 font-semibold transition-colors hover:bg-white/[0.04] [&::-webkit-details-marker]:hidden">
          Tabela 2 completa: planos, entradas, feedbacks, problemas e recomendações
          <span className="text-xl text-muted-foreground transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="overflow-x-auto px-2 pb-4" tabIndex={0} role="region" aria-label="Tabela 2, role para os lados">
          <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
            <caption className="sr-only">Tabela 2 — Planos, entradas, feedbacks, problemas e recomendações</caption>
            <thead>
              <tr className="text-[var(--novo)]">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Objetivo
                </th>
                {colunasTabela2.map((c) => (
                  <th key={c.chave} scope="col" className="px-4 py-3 font-semibold">
                    {c.rotulo}
                  </th>
                ))}
                <th scope="col" className="px-4 py-3 font-semibold">
                  Telas
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {tabela2.map((linha) => (
                <tr key={linha.objetivo} className="align-top">
                  <th scope="row" className="w-44 px-4 py-4 font-semibold text-pretty">
                    {linha.objetivo}
                  </th>
                  {colunasTabela2.map((c) => (
                    <td key={c.chave} className="px-4 py-4 leading-relaxed text-pretty text-muted-foreground">
                      {linha[c.chave]}
                    </td>
                  ))}
                  <td className="w-32 px-4 py-4">
                    <ChipsTelas ids={linha.telas} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </Secao>
  );
}
