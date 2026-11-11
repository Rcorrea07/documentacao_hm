import type { ReactNode } from "react";
import Link from "next/link";
import { Revelar, TituloCinematico } from "@/components/motion/revelar";
import { telaAncora, type TelaId } from "@/content/documentacao";
import { cn } from "@/lib/utils";

export function Secao({
  id,
  titulo,
  resumo,
  children,
  className,
}: {
  id: string;
  titulo: string;
  resumo?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("relative py-28 md:py-40", className)}>
      {/* Brilho azul no topo de cada seção, a luz do cartão do hero. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklch,var(--deep)_55%,transparent),transparent)]"
        aria-hidden="true"
      />
      <header className="mb-16 max-w-4xl md:mb-24">
        <TituloCinematico
          id={`${id}-titulo`}
          className="text-3d-matte text-5xl leading-[0.95] font-bold tracking-tight text-balance md:text-7xl lg:text-[5.5rem]"
        >
          {titulo}
        </TituloCinematico>
        {resumo ? (
          <Revelar atraso={0.15}>
            <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">{resumo}</p>
          </Revelar>
        ) : null}
      </header>
      {children}
    </section>
  );
}

/** Subtítulo dentro de uma seção. */
export function Sub({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <TituloCinematico
      as="h3"
      id={id}
      className="mt-28 mb-10 text-3xl font-semibold tracking-tight text-balance md:mt-36 md:text-5xl"
    >
      {children}
    </TituloCinematico>
  );
}

/** Termo grande em prata, usado como âncora visual de cada passo. */
export function Marca({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("text-silver-matte block pb-1 text-6xl leading-none font-black tracking-tighter md:text-7xl", className)}>
      {children}
    </span>
  );
}

/** Lista de definição em linhas. */
export function Linhas({
  itens,
  className,
}: {
  itens: ReadonlyArray<{ termo: string; texto: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cn("divide-y divide-white/8", className)}>
      {itens.map((item) => (
        <div key={item.termo} className="grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
          <dt className="font-semibold text-foreground">{item.termo}</dt>
          <dd className="leading-relaxed text-pretty text-muted-foreground">{item.texto}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ChipTela({ id }: { id: TelaId }) {
  return (
    <Link href={`#${telaAncora(id)}`} className="chip-tela">
      Tela {id}
    </Link>
  );
}

export function ChipsTelas({ ids }: { ids: readonly TelaId[] }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {ids.map((id) => (
        <ChipTela key={id} id={id} />
      ))}
    </span>
  );
}
