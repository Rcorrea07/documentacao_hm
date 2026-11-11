import { classes, demonstracao, nomeRelacao, relacoes, tiposDoDominio } from "@/content/documentacao";
import { DiagramaClasses } from "./diagrama-classes";
import { Secao, Sub } from "./secao";

function Legenda() {
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
      <li className="flex items-center gap-2">
        <svg width="44" height="12" aria-hidden="true">
          <line x1="0" y1="6" x2="44" y2="6" className="stroke-[var(--tinta)]" strokeWidth="1.5" />
        </svg>
        associação
      </li>
      <li className="flex items-center gap-2">
        <svg width="44" height="12" aria-hidden="true">
          <path d="M1 6 L10 1 L19 6 L10 11 Z" className="fill-background stroke-[var(--tinta)]" strokeWidth="1.5" />
          <line x1="19" y1="6" x2="44" y2="6" className="stroke-[var(--tinta)]" strokeWidth="1.5" />
        </svg>
        agregação
      </li>
      <li className="flex items-center gap-2">
        <svg width="44" height="12" aria-hidden="true">
          <path d="M1 6 L10 1 L19 6 L10 11 Z" className="fill-[var(--tinta)] stroke-[var(--tinta)]" strokeWidth="1.5" />
          <line x1="19" y1="6" x2="44" y2="6" className="stroke-[var(--tinta)]" strokeWidth="1.5" />
        </svg>
        composição
      </li>
      <li className="flex items-center gap-2">
        <svg width="44" height="12" aria-hidden="true">
          <line x1="0" y1="6" x2="42" y2="6" className="stroke-[var(--tinta)]" strokeWidth="1.5" strokeDasharray="6 5" />
          <path d="M33 1 L43 6 L33 11" fill="none" className="stroke-[var(--tinta)]" strokeWidth="1.5" />
        </svg>
        dependência
      </li>
      <li className="flex items-center gap-2">
        <span className="font-mono text-[var(--novo)]">★</span> acrescentado depois da entrega do diagrama
      </li>
      <li className="flex items-center gap-2">
        <span className="font-mono">/</span> atributo derivado (calculado)
      </li>
    </ul>
  );
}

export function FluxoInformacao() {
  return (
    <Secao
      id="fluxo-de-informacao"
      titulo="Fluxo de Informação"
      resumo="Diagrama de Classes do domínio, igual ao código do protótipo (src/domain no app_hm). A serialização (toDados, fromDados, migrarDados) fica de fora."
    >
      <div className="depth-panel overflow-hidden rounded-[28px]">
        <div className="overflow-x-auto p-4 sm:p-6" tabIndex={0} role="region" aria-label="Diagrama de Classes, role para os lados">
          <DiagramaClasses />
        </div>
      </div>
      <div className="mt-6">
        <Legenda />
      </div>

      <Sub>Tipos do domínio</Sub>
      <dl className="grid gap-x-10 gap-y-4 font-mono text-sm sm:grid-cols-2">
        {tiposDoDominio.map((t) => (
          <div key={t.nome}>
            <dt className="text-foreground">{t.nome}</dt>
            <dd className="text-muted-foreground">{t.valores}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 max-w-[70ch] leading-relaxed text-pretty text-muted-foreground">{demonstracao}</p>

      <details className="group mt-10 rounded-2xl border border-border">
        <summary className="cursor-pointer list-none rounded-2xl px-5 py-4 font-semibold transition-colors hover:bg-muted/40 [&::-webkit-details-marker]:hidden">
          <span className="mr-2 inline-block transition-transform group-open:rotate-90" aria-hidden="true">
            ›
          </span>
          Ver classes e relações em texto
        </summary>
        <div className="grid gap-8 border-t border-border px-5 py-6 md:grid-cols-2">
          {Object.values(classes).map((c) => (
            <div key={c.nome}>
              <h4 className="font-semibold">
                {c.nome} <span className="font-mono text-xs font-normal text-muted-foreground">{c.arquivo}</span>
              </h4>
              <ul className="mt-2 space-y-0.5 font-mono text-[13px] text-muted-foreground">
                {[...c.atributos, ...c.metodos].map((m) => (
                  <li key={m.texto}>
                    {m.texto}
                    {m.novo ? <span className="text-[var(--novo)]"> ★</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2">
            <h4 className="font-semibold">Relações</h4>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {relacoes.map((r) => (
                <li key={`${r.de}-${r.para}`}>
                  {r.de} → {r.para}: {nomeRelacao[r.tipo]}, “{r.rotulo}”
                  {r.multiplicidade ? ` (${r.multiplicidade[0]} : ${r.multiplicidade[1]})` : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </Secao>
  );
}
