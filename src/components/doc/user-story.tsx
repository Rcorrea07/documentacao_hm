import { CelularRolante } from "@/components/motion/celular-rolante";
import { Revelar, TextoRevelado } from "@/components/motion/revelar";
import { contextualizacao, criteriosAceite, historia, historiaPartes, persona } from "@/content/documentacao";
import { ChipTela, Marca, Secao, Sub } from "./secao";

export function UserStory() {
  return (
    <Secao id="user-story" titulo="User Story" resumo={contextualizacao}>
      <figure>
        <TextoRevelado
          as="blockquote"
          texto={`“${historia}”`}
          className="max-w-[30ch] text-3xl leading-[1.15] font-semibold tracking-tight text-pretty md:text-5xl lg:text-6xl"
        />
        <figcaption>
          <Revelar className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
            {historiaPartes.map((p) => (
              <div key={p.termo}>
                <p className="text-silver-matte pb-1 text-4xl font-black tracking-tight">{p.termo}</p>
                <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{p.texto}</p>
              </div>
            ))}
          </Revelar>
        </figcaption>
      </figure>

      <Sub>Persona primária</Sub>
      <Revelar as="dl" className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        {persona.map((linha, i) => (
          <div key={linha.dimensao} className={i === 0 ? "md:col-span-2" : undefined}>
            <dt className="text-sm font-semibold tracking-wide text-[var(--novo)]">{linha.dimensao}</dt>
            <dd
              className={
                i === 0
                  ? "mt-3 max-w-[48ch] text-2xl leading-snug font-semibold text-pretty md:text-3xl"
                  : "mt-3 text-lg leading-relaxed text-pretty text-muted-foreground"
              }
            >
              {linha.descricao}
            </dd>
          </div>
        ))}
      </Revelar>
      <p className="mt-10 text-sm text-muted-foreground">Tabela 1 — Persona primária (Lucas Andrade)</p>

      <Sub>Critérios de aceite</Sub>
      <CelularRolante
        passos={criteriosAceite.map((c, i) => ({
          id: `criterio-${i + 1}`,
          rotulo: String(i + 1),
          imagem: c.imagem,
          alt: c.legenda,
          legenda: c.legenda,
          conteudo: (
            <div className="max-w-xl">
              <Marca>
                <span className="sr-only">Critério </span>
                {String(i + 1).padStart(2, "0")}
              </Marca>
              <p className="mt-6 text-2xl leading-snug font-medium text-pretty md:text-3xl">{c.texto}</p>
              <div className="mt-6">
                <ChipTela id={c.tela} />
              </div>
            </div>
          ),
        }))}
      />
    </Secao>
  );
}
