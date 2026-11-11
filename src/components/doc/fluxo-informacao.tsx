import { DiagramaAnimado } from "@/components/motion/animacoes-secao";
import { Revelar } from "@/components/motion/revelar";
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
      resumo="Diagrama de Classes do domínio, igual ao código do protótipo. A serialização (toDados, fromDados, migrarDados) fica de fora."
    >
      <DiagramaAnimado className="premium-depth-card overflow-hidden rounded-[28px] md:rounded-[40px]">
        <div className="overflow-x-auto p-4 sm:p-8" tabIndex={0} role="region" aria-label="Diagrama de Classes, role para os lados">
          <DiagramaClasses />
        </div>
      </DiagramaAnimado>
      <div className="mt-8">
        <Legenda />
      </div>

      <Sub>Tipos do domínio</Sub>
      <Revelar as="dl" className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {tiposDoDominio.map((t) => (
          <div key={t.nome}>
            <dt className="font-mono text-lg text-foreground">{t.nome}</dt>
            <dd className="mt-1 font-mono text-sm text-muted-foreground">{t.valores}</dd>
          </div>
        ))}
      </Revelar>
      <Revelar>
        <p className="mt-14 max-w-[70ch] leading-relaxed text-pretty text-muted-foreground">{demonstracao}</p>
      </Revelar>

      <details className="group mt-16 rounded-3xl bg-white/[0.03]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 font-semibold transition-colors hover:bg-white/[0.04] [&::-webkit-details-marker]:hidden">
          Classes e relações em texto
          <span className="text-xl text-muted-foreground transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="grid gap-8 px-6 pt-2 pb-8 md:grid-cols-2">
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
