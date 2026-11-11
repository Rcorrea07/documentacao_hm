import Image from "next/image";
import { GaleriaHorizontal } from "@/components/motion/animacoes-secao";
import { CelularRolante } from "@/components/motion/celular-rolante";
import { Revelar } from "@/components/motion/revelar";
import { IPhoneFrame } from "@/components/ui/iphone-frame";
import { estados, mudancasDoApp, telaAncora, telas, type Tela } from "@/content/documentacao";
import { cn } from "@/lib/utils";
import { Secao, Sub } from "./secao";

const tipos: Record<Tela["tipo"], { rotulo: string; classe: string }> = {
  existente: { rotulo: "Existente", classe: "bg-white/10 text-muted-foreground" },
  alterada: { rotulo: "Alterada", classe: "bg-[var(--novo)]/20 text-[var(--novo)]" },
  nova: { rotulo: "Nova", classe: "bg-[var(--app)] text-white" },
};

function DetalheTela({ tela }: { tela: Tela }) {
  const tipo = tipos[tela.tipo];
  return (
    <article id={telaAncora(tela.id)} className="alvo-tela max-w-xl scroll-mt-[40vh] rounded-2xl">
      <div className="flex items-center gap-3">
        <span className="text-silver-matte pb-1 text-6xl leading-none font-black tracking-tighter md:text-7xl">{tela.id}</span>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", tipo.classe)}>{tipo.rotulo}</span>
      </div>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">{tela.titulo}</h3>
      <dl className="mt-8 space-y-4">
        {tela.hta ? (
          <div>
            <dt className="text-sm font-semibold text-[var(--novo)]">HTA</dt>
            <dd className="mt-1 font-mono">{tela.hta}</dd>
          </div>
        ) : null}
        {tela.classes ? (
          <div>
            <dt className="text-sm font-semibold text-[var(--novo)]">Classes e métodos</dt>
            <dd className="mt-1 font-mono text-sm leading-relaxed break-words text-muted-foreground">{tela.classes}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-sm font-semibold text-[var(--novo)]">Navegação</dt>
          <dd className="mt-1 leading-relaxed text-muted-foreground">{tela.navegacao}</dd>
        </div>
      </dl>
    </article>
  );
}

export function Wireframe() {
  return (
    <Secao
      id="wireframe"
      titulo="Wireframe"
      resumo="A tarefa de ponta a ponta, tela por tela: o item da HTA, as classes que sustentam cada tela e para onde ela leva. O wireframe entregue aparece atrás do celular."
    >
      <CelularRolante
        comWireframe
        passos={telas.map((t) => ({
          id: t.id,
          rotulo: t.id,
          imagem: t.imagem,
          alt: `Tela ${t.id}, ${t.titulo}, no protótipo`,
          legenda: `Tela ${t.id} · ${t.titulo}`,
          wireframe: t.wireframe,
          conteudo: <DetalheTela tela={t} />,
        }))}
      />

      <Sub>O que mudou desde o wireframe entregue</Sub>
      <Revelar as="ul" className="max-w-[70ch] space-y-4 text-lg text-muted-foreground">
        {mudancasDoApp.map((m) => (
          <li key={m} className="flex gap-4 leading-relaxed text-pretty">
            <span className="mt-3 size-1.5 shrink-0 rounded-full bg-[var(--novo)]" aria-hidden="true" />
            {m}
          </li>
        ))}
      </Revelar>

      <Sub id="estados-extras">Estados extras</Sub>
      <GaleriaHorizontal rotulo="Estados extras, role para os lados">
        {estados.map((e) => (
          <li key={e.titulo} className="w-[236px] shrink-0 snap-start">
            <figure>
              <IPhoneFrame largura={220}>
                <Image src={e.imagem} alt={`${e.titulo} (${e.tela})`} fill sizes="220px" className="object-cover object-top" />
              </IPhoneFrame>
              <figcaption className="mt-4 text-sm">
                <span className="block font-semibold text-pretty">{e.titulo}</span>
                <span className="text-muted-foreground">{e.tela}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </GaleriaHorizontal>
    </Secao>
  );
}
