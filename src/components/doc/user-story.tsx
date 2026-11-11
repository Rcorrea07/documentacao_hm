import { contextualizacao, criteriosAceite, historia, historiaPartes, persona } from "@/content/documentacao";
import { Linhas, Secao, Sub } from "./secao";

export function UserStory() {
  return (
    <Secao id="user-story" titulo="User Story" resumo={contextualizacao}>
      <figure className="depth-panel rounded-[28px] p-6 sm:p-10 md:p-14">
        <blockquote className="max-w-[40ch] text-2xl leading-snug font-semibold tracking-tight text-balance text-white md:text-4xl">
          “{historia}”
        </blockquote>
        <figcaption className="mt-10">
          <Linhas itens={historiaPartes} larguraTermo="md:grid-cols-[8rem_1fr]" className="border-white/10 [&>div]:border-white/10" />
        </figcaption>
      </figure>

      <Sub>Persona primária</Sub>
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Tabela 1 — Persona primária (Lucas Andrade)</caption>
          <tbody className="divide-y divide-border">
            {persona.map((linha) => (
              <tr key={linha.dimensao} className="flex flex-col md:table-row">
                <th scope="row" className="bg-muted/40 px-5 pt-4 pb-1 align-top font-semibold md:w-56 md:py-4">
                  {linha.dimensao}
                </th>
                <td className="px-5 pt-1 pb-4 leading-relaxed text-pretty text-muted-foreground md:py-4">{linha.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Tabela 1 — Persona primária (Lucas Andrade)</p>

      <Sub>Critérios de aceite</Sub>
      <ol className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        {criteriosAceite.map((c, i) => (
          <li key={c} className="flex gap-4">
            <span className="text-silver-matte w-8 shrink-0 text-3xl leading-none font-black" aria-hidden="true">
              {i + 1}
            </span>
            <p className="leading-relaxed text-pretty text-muted-foreground">
              <span className="sr-only">Critério {i + 1}: </span>
              {c}
            </p>
          </li>
        ))}
      </ol>
    </Secao>
  );
}
