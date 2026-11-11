import type { ReactNode } from "react";
import Link from "next/link";
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
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("border-t border-border py-20 md:py-28", className)}>
      <header className="mb-12 max-w-3xl md:mb-16">
        <h2 id={`${id}-titulo`} className="text-3d-matte text-4xl font-bold tracking-tight text-balance md:text-6xl">
          {titulo}
        </h2>
        {resumo ? <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">{resumo}</p> : null}
      </header>
      {children}
    </section>
  );
}

/** Subtítulo dentro de uma seção. */
export function Sub({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="mt-16 mb-6 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
      {children}
    </h3>
  );
}

/** Lista de definição em linhas, usada para Input/Processamento/Feedback e afins. */
export function Linhas({
  itens,
  className,
  larguraTermo = "md:grid-cols-[11rem_1fr]",
}: {
  itens: ReadonlyArray<{ termo: string; texto: ReactNode }>;
  className?: string;
  larguraTermo?: string;
}) {
  return (
    <dl className={cn("divide-y divide-border border-y border-border", className)}>
      {itens.map((item) => (
        <div key={item.termo} className={cn("grid gap-1 py-4 md:gap-6", larguraTermo)}>
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
