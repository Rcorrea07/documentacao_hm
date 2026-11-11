import { Fragment } from "react";
import { BookOpen, ExternalLink, GraduationCap, ReceiptText } from "lucide-react";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { AnaliseTarefa } from "@/components/doc/analise-tarefa";
import { Capa } from "@/components/doc/capa";
import { Experimente } from "@/components/doc/experimente";
import { FluxoInformacao } from "@/components/doc/fluxo-informacao";
import { Indice } from "@/components/doc/indice";
import { UserStory } from "@/components/doc/user-story";
import { Wireframe } from "@/components/doc/wireframe";
import { Interludio } from "@/components/motion/interludio";
import { TransicaoSecoes } from "@/components/motion/transicao-secoes";
import { PROTOTIPO_URL, projeto } from "@/content/documentacao";
import tela09 from "../../referencias/telas-finais/tela-09.png";

export default function Home() {
  return (
    <>
      <a
        href="#capa"
        className="sr-only z-50 rounded-lg bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para a documentação
      </a>

      <CinematicHero
        brandName="Planejador"
        brandSubtitle="Financeiro & Bolsa"
        tagline1="Quanto sobra no mês"
        tagline2="depois da bolsa."
        cardHeading="Mensalidade líquida e orçamento do mês."
        cardDescription={
          <>
            O <span className="font-semibold text-white">Planejador Financeiro &amp; Bolsa</span> traz a mensalidade
            líquida já calculada a partir dos dados da SAE e divide o saldo que sobra entre Moradia, Alimentação e Outros
            gastos, com os gastos guardados só no celular do aluno.
          </>
        }
        screen={tela09}
        screenAlt="Tela 9 do protótipo: saldo restante do mês e o quanto cada categoria já usou do teto."
        badges={[
          { icon: <ReceiptText aria-hidden="true" />, titulo: "Parcela líquida R$ 1.710,00", detalhe: "R$ 2.850,00 − 40% de bolsa" },
          { icon: <GraduationCap aria-hidden="true" />, titulo: "Bolsa Finatel · 40%", detalhe: "20% + 20%, metade reembolsável" },
        ]}
        ctaHeading="Veja o projeto inteiro."
        ctaDescription="Capa, User Story, Análise da Tarefa, Diagrama de Classes e Wireframe, todos tirados do protótipo publicado."
        ctas={[
          { href: PROTOTIPO_URL, rotulo: "Abrir protótipo", detalhe: "No navegador", icon: <ExternalLink />, externo: true },
          { href: "#capa", rotulo: "Ler a documentação", detalhe: "Nesta página", icon: <BookOpen /> },
        ]}
      />

      <Indice />
      <TransicaoSecoes />

      <main>
        {[Capa, UserStory, AnaliseTarefa, FluxoInformacao, Wireframe].map((SecaoDoc, i) => (
          <Fragment key={i}>
            <Interludio indice={i} />
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <SecaoDoc />
            </div>
          </Fragment>
        ))}
      </main>

      <Experimente />

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-10 text-sm text-muted-foreground md:flex-row md:justify-between md:px-8">
          <p>
            {projeto.aluno} · {projeto.matricula} · {projeto.disciplina}
          </p>
          <p>{projeto.professor}</p>
        </div>
      </footer>
    </>
  );
}
