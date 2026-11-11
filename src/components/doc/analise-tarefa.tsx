import { htaObjetivos, htaRaiz, planos, tabela2, usabilidade } from "@/content/documentacao";
import { ChipsTelas, Linhas, Secao, Sub } from "./secao";

const colunasTabela2 = [
  { chave: "plano", rotulo: "Plano" },
  { chave: "input", rotulo: "Input" },
  { chave: "feedback", rotulo: "Feedback" },
  { chave: "problema", rotulo: "Problema" },
  { chave: "recomendacao", rotulo: "Recomendação" },
] as const;

function ArvoreHTA() {
  return (
    <div role="group" aria-label="Árvore da Análise Hierárquica da Tarefa">
      <div className="depth-panel mx-auto max-w-2xl rounded-2xl px-6 py-5 text-center">
        <p className="text-lg font-semibold text-balance text-white md:text-xl">
          <span className="text-[var(--novo)]">{htaRaiz.codigo}.</span> {htaRaiz.titulo}
        </p>
        <p className="mt-1 text-sm text-blue-100/70">{htaRaiz.plano}</p>
      </div>

      {/* Conectores: tronco, barra e um ramo por objetivo (só em md+). */}
      <div className="relative hidden h-12 md:block" aria-hidden="true">
        <div className="absolute top-0 left-1/2 h-6 w-px bg-[var(--tinta)]/40" />
        <div className="absolute top-6 right-[16.66%] left-[16.66%] h-px bg-[var(--tinta)]/40" />
      </div>

      <ol className="grid gap-5 border-l border-[var(--tinta)]/30 pl-5 max-md:mt-6 md:grid-cols-3 md:border-0 md:pl-0">
        {htaObjetivos.map((obj) => (
          <li key={obj.codigo} className="relative flex flex-col">
            <div className="absolute -top-6 left-1/2 hidden h-6 w-px bg-[var(--tinta)]/40 md:block" aria-hidden="true" />
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-5">
              <p className="text-lg font-semibold text-balance">
                <span className="text-[var(--novo)]">{obj.codigo}.</span> {obj.titulo}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{obj.plano}</p>
              <ol className="mt-4 space-y-3 border-t border-border pt-4">
                {obj.passos.map((p) => (
                  <li key={p.codigo} className="grid grid-cols-[2.5rem_1fr] text-pretty">
                    <span className="font-mono text-sm leading-6 text-[var(--novo)]">{p.codigo}</span>
                    <span className="leading-6 text-muted-foreground">{p.titulo}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto pt-5">
                <ChipsTelas ids={obj.telas} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AnaliseTarefa() {
  return (
    <Secao
      id="analise-da-tarefa"
      titulo="Análise da Tarefa"
      resumo="Análise hierárquica (HTA) da tarefa principal: conferir a bolsa, montar o orçamento e lançar gastos ao longo do mês. Cada objetivo aponta as telas que o atendem."
    >
      <ArvoreHTA />

      <Sub>Planos</Sub>
      <Linhas itens={planos} larguraTermo="md:grid-cols-[14rem_1fr]" />

      <Sub id="tabela-2">Planos, entradas, feedbacks, problemas e recomendações</Sub>
      <div className="overflow-x-auto rounded-2xl border border-border" tabIndex={0} role="region" aria-labelledby="tabela-2">
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
          <caption className="sr-only">Tabela 2 — Planos, entradas, feedbacks, problemas e recomendações</caption>
          <thead className="bg-[var(--deep)] text-white">
            <tr>
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
          <tbody className="divide-y divide-border">
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
      <p className="mt-3 text-sm text-muted-foreground">Tabela 2 — Planos, entradas, feedbacks, problemas e recomendações</p>

      <Sub>Critérios de usabilidade (NBR ISO 9241-11)</Sub>
      <Linhas itens={usabilidade} />
    </Secao>
  );
}
