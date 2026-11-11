import Image from "next/image";
import { IPhoneFrame } from "@/components/ui/iphone-frame";
import { estados, mudancasDoApp, telaAncora, telas, type Tela } from "@/content/documentacao";
import { cn } from "@/lib/utils";
import { Secao, Sub } from "./secao";

const rotuloTipo: Record<Tela["tipo"], string> = { existente: "Existente", alterada: "Alterada", nova: "Nova" };

function CartaoTela({ tela }: { tela: Tela }) {
  return (
    <article
      id={telaAncora(tela.id)}
      aria-labelledby={`${telaAncora(tela.id)}-titulo`}
      className="alvo-tela flex scroll-mt-28 flex-col gap-6 rounded-[24px] border border-border bg-card/40 p-5 sm:flex-row"
    >
      <IPhoneFrame largura={168} className="self-center sm:self-start">
        <Image
          src={tela.imagem}
          alt={`Tela ${tela.id}, ${tela.titulo}, no protótipo`}
          fill
          sizes="168px"
          className="object-cover object-top"
        />
      </IPhoneFrame>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">Tela {tela.id}</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-semibold",
              tela.tipo === "nova" && "bg-[var(--app)] text-white",
              tela.tipo === "alterada" && "bg-[var(--novo)]/20 text-[var(--novo)]",
              tela.tipo === "existente" && "bg-muted text-muted-foreground",
            )}
          >
            {rotuloTipo[tela.tipo]}
          </span>
        </div>
        <h3 id={`${telaAncora(tela.id)}-titulo`} className="mt-1 text-xl font-semibold tracking-tight text-balance">
          {tela.titulo}
        </h3>

        <dl className="mt-4 space-y-3 text-sm">
          {tela.hta ? (
            <div>
              <dt className="text-muted-foreground">HTA</dt>
              <dd className="font-mono text-[var(--novo)]">{tela.hta}</dd>
            </div>
          ) : null}
          {tela.classes ? (
            <div>
              <dt className="text-muted-foreground">Classes / métodos</dt>
              <dd className="font-mono text-[13px] leading-relaxed break-words">{tela.classes}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-muted-foreground">Navegação</dt>
            <dd className="leading-relaxed">{tela.navegacao}</dd>
          </div>
        </dl>

        {tela.wireframe ? (
          <a
            href={tela.wireframe.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-auto flex items-center gap-3 pt-5 text-sm text-muted-foreground"
          >
            <Image
              src={tela.wireframe}
              alt=""
              width={44}
              className="rounded-md border border-border opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="underline decoration-border group-hover:text-foreground group-hover:decoration-current">
              Wireframe entregue
              <span className="sr-only"> da Tela {tela.id} (abre a imagem)</span>
            </span>
          </a>
        ) : (
          <p className="mt-auto pt-5 text-sm text-muted-foreground">Sem wireframe: a tela entrou depois da entrega do wireframe.</p>
        )}
      </div>
    </article>
  );
}

export function Wireframe() {
  return (
    <Secao
      id="wireframe"
      titulo="Wireframe"
      resumo="As telas do protótipo publicado, cada uma com o item da HTA, as classes e métodos que a sustentam e para onde ela leva. O wireframe entregue fica ao lado, como histórico."
    >
      <div className="grid gap-5 xl:grid-cols-2">
        {telas.map((t) => (
          <CartaoTela key={t.id} tela={t} />
        ))}
      </div>

      <Sub>O que mudou desde o wireframe entregue</Sub>
      <ul className="max-w-[70ch] space-y-3 text-muted-foreground">
        {mudancasDoApp.map((m) => (
          <li key={m} className="flex gap-3 leading-relaxed text-pretty">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--novo)]" aria-hidden="true" />
            {m}
          </li>
        ))}
      </ul>

      <Sub id="estados-extras">Estados extras</Sub>
      <div
        className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:px-0"
        tabIndex={0}
        role="region"
        aria-labelledby="estados-extras"
      >
        <ul className="flex snap-x snap-mandatory gap-6">
          {estados.map((e) => (
            <li key={e.titulo} className="w-[196px] shrink-0 snap-start">
              <figure>
                <IPhoneFrame largura={180} botoes={false}>
                  <Image src={e.imagem} alt={`${e.titulo} (${e.tela})`} fill sizes="180px" className="object-cover object-top" />
                </IPhoneFrame>
                <figcaption className="mt-3 text-sm">
                  <span className="block font-semibold text-pretty">{e.titulo}</span>
                  <span className="text-muted-foreground">{e.tela}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
