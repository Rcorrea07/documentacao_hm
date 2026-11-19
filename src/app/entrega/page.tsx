import type { Metadata } from "next";
import localFont from "next/font/local";
import type { CSSProperties, ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { DiagramaClasses, areaLivreLarga } from "@/components/doc/diagrama-classes";
import { IPhoneFrame } from "@/components/ui/iphone-frame";
import {
  PROTOTIPO_URL,
  citacaoPersona,
  contextualizacao,
  criteriosAceite,
  demonstracao,
  historia,
  historiaPartes,
  htaObjetivos,
  htaRaiz,
  justificativa,
  mudancasDoApp,
  persona,
  planos,
  projeto,
  simulacao,
  tabela2,
  telas,
  tiposDoDominio,
  usabilidade,
  type Tela,
} from "@/content/documentacao";
// Fontes estáticas em TrueType. A Geist variável (e a estática, que é CFF) sai como
// Type 3 no PDF do Chromium, com espaçamento quebrado no Preview do Mac.
// fontes/geist-sans-*.woff2: instâncias fixas (wght 400–800) da Geist variável latina do
// Google Fonts, a mesma do site, geradas com fontTools.varLib.instancer.
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/600.css";
import tela05 from "../../../referencias/telas-finais/tela-05.png";
import tela09 from "../../../referencias/telas-finais/tela-09.png";
import tela10 from "../../../referencias/telas-finais/tela-10.png";

const geistPdf = localFont({
  src: [
    { path: "./fontes/geist-sans-400.woff2", weight: "400" },
    { path: "./fontes/geist-sans-500.woff2", weight: "500" },
    { path: "./fontes/geist-sans-600.woff2", weight: "600" },
    { path: "./fontes/geist-sans-700.woff2", weight: "700" },
    { path: "./fontes/geist-sans-800.woff2", weight: "800" },
  ],
  variable: "--font-pdf-sans",
  display: "block",
});

export const metadata: Metadata = {
  title: "Projeto Final · PDF de entrega",
  robots: { index: false, follow: false },
};

/*
 * Os 5 slides do PDF de entrega, no formato do modelo do Moodle
 * (16:9, Capa > User Story > Análise da Tarefa > Fluxo de Informação > Wireframe).
 * Cada slide tem 1920×1080 px; `npm run pdf` imprime em 720×405 pt (escala 0,5).
 */

const AZUL = "#0166c0";
const DOCUMENTACAO_URL = "https://documentacao-hm.vercel.app";

/** Cores claras para o diagrama do site, que nasce no tema escuro. */
const DIAGRAMA_CLARO = {
  "--deep": AZUL,
  "--deep-2": "#ffffff",
  "--tinta": "#3b4a63",
  "--border": "#c5cfdd",
  "--foreground": "#111827",
  "--novo": "#0a6fd1",
} as CSSProperties;

function Slide({ titulo, pagina, children }: { titulo?: string; pagina: number; children: ReactNode }) {
  return (
    <section className="slide relative flex h-[1080px] w-[1920px] flex-col overflow-hidden bg-white px-[72px] pt-[52px] pb-[40px] text-[#111827]">
      {titulo ? (
        <h2 className="mb-[30px] text-center text-[44px] leading-none font-semibold tracking-tight">{titulo}</h2>
      ) : null}
      <div className="min-h-0 flex-1">{children}</div>
      <footer className="mt-[20px] flex justify-between border-t border-[#e5e9f0] pt-[14px] text-[15px] text-[#6b7280]">
        <span>
          {projeto.aluno} · {projeto.matricula} · {projeto.disciplina}
        </span>
        <span className="tabular-nums">{pagina} / 5</span>
      </footer>
    </section>
  );
}

function Rotulo({ children }: { children: ReactNode }) {
  return <h3 className="mb-[10px] text-[17px] font-bold tracking-wide text-[#0166c0] uppercase">{children}</h3>;
}

function Celular({ imagem, alt, largura, legenda }: { imagem: StaticImageData; alt: string; largura: number; legenda?: string }) {
  return (
    <figure className="flex flex-col items-center gap-[12px]">
      <IPhoneFrame largura={largura} className="[box-shadow:inset_0_0_0_2px_#52525b,inset_0_0_0_7px_#000,0_24px_40px_-18px_rgba(15,23,42,0.45)!important]">
        <Image src={imagem} alt={alt} fill loading="eager" sizes={`${largura * 2}px`} className="object-cover object-top" />
      </IPhoneFrame>
      {legenda ? <figcaption className="text-[15px] text-[#4b5563]">{legenda}</figcaption> : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ 1. Capa */

function SlideCapa() {
  return (
    <Slide pagina={1}>
      <div className="grid h-full grid-cols-[1fr_auto] gap-[64px]">
        <div className="flex flex-col">
          <p className="text-[24px] font-bold">{projeto.aluno}</p>
          <p className="mt-[4px] text-[24px] font-bold">{projeto.matricula}</p>
          <p className="mt-[6px] text-[17px] text-[#4b5563]">
            {projeto.disciplina} · {projeto.professor}
          </p>

          <p className="mt-[44px] text-[17px] font-bold tracking-wide text-[#0166c0] uppercase">
            {projeto.subtitulo} · {projeto.eixo}
          </p>
          <h1 className="mt-[8px] text-[60px] leading-[1] font-extrabold tracking-[-0.03em] whitespace-nowrap">{projeto.titulo}</h1>

          <p className="mt-[28px] max-w-[60ch] text-[21px] leading-[1.5] text-pretty">
            {justificativa.antes} <strong>“{citacaoPersona}”</strong> {justificativa.depois}
          </p>

          <div className="mt-[28px] grid max-w-[1000px] grid-cols-3 gap-[28px]">
            {simulacao.map((s) => (
              <div key={s.termo} className="border-t-2 border-[#0166c0] pt-[10px]">
                <p className="text-[18px] font-bold">
                  {s.termo} <span className="font-normal text-[#6b7280]">· Tela {s.tela}</span>
                </p>
                <p className="mt-[6px] text-[16px] leading-[1.45] text-[#374151]">{s.texto}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <p className="text-[17px] font-bold">Protótipo publicado</p>
            <a href={PROTOTIPO_URL} className="mt-[4px] inline-block text-[30px] font-semibold text-[#0166c0] underline underline-offset-4">
              {PROTOTIPO_URL.replace("https://", "")}
            </a>
            <p className="mt-[6px] text-[16px] text-[#4b5563]">
              Abre no celular (tamanho de app) e no computador. Documentação interativa:{" "}
              <a href={DOCUMENTACAO_URL} className="text-[#0166c0] underline underline-offset-2">
                {DOCUMENTACAO_URL.replace("https://", "")}
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[28px] self-center">
          <Celular imagem={tela05} alt="Tela 5, resumo da mensalidade líquida" largura={240} legenda="Tela 5 · Resumo" />
          <Celular imagem={tela09} alt="Tela 9, orçamento do mês" largura={240} legenda="Tela 9 · Orçamento" />
          <Celular imagem={tela10} alt="Tela 10, lançar gasto" largura={240} legenda="Tela 10 · Lançar gasto" />
        </div>
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------ 2. User Story */

function SlideUserStory() {
  return (
    <Slide titulo="User Story" pagina={2}>
      <div className="grid h-full grid-cols-[1.05fr_1fr_0.95fr] gap-[48px]">
        <div>
          <Rotulo>Contextualização</Rotulo>
          <p className="text-[17.5px] leading-[1.5] text-[#374151]">{contextualizacao}</p>

          <Rotulo>
            <span className="mt-[26px] block">História</span>
          </Rotulo>
          <blockquote className="border-l-[3px] border-[#0166c0] pl-[16px] text-[21px] leading-[1.45] font-medium italic">
            “{historia}”
          </blockquote>
          <dl className="mt-[18px] space-y-[8px] text-[17.5px] leading-[1.4]">
            {historiaPartes.map((p) => (
              <div key={p.termo} className="grid grid-cols-[92px_1fr]">
                <dt className="font-bold">{p.termo}</dt>
                <dd className="text-[#374151]">{p.texto}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <Rotulo>Persona primária</Rotulo>
          <table className="w-full border-collapse text-left text-[17px] leading-[1.42]">
            <caption className="caption-bottom pt-[8px] text-left text-[14px] text-[#6b7280]">
              Tabela 1 — Persona primária (Lucas Andrade). Persona fictícia.
            </caption>
            <thead>
              <tr className="bg-[#0166c0] text-white">
                <th className="w-[34%] px-[12px] py-[8px] font-semibold">Dimensão</th>
                <th className="px-[12px] py-[8px] font-semibold">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {persona.map((l) => (
                <tr key={l.dimensao} className="border-b border-[#e5e9f0] align-top">
                  <th scope="row" className="px-[12px] py-[9px] font-semibold">
                    {l.dimensao}
                  </th>
                  <td className="px-[12px] py-[9px] text-[#374151]">{l.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Rotulo>Critérios de aceite (verificados no protótipo)</Rotulo>
          <ol className="space-y-[22px]">
            {criteriosAceite.map((c, i) => (
              <li key={c.tela + i} className="grid grid-cols-[44px_1fr] text-[19px] leading-[1.45]">
                <span className="text-[28px] leading-none font-extrabold text-[#0166c0] tabular-nums">{i + 1}</span>
                <span>
                  {c.texto} <span className="font-semibold whitespace-nowrap text-[#0166c0]">Tela {c.tela}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------- 3. Análise da Tarefa */

const colunasTabela2 = [
  { chave: "plano", rotulo: "Plano e input" },
  { chave: "feedback", rotulo: "Feedback do sistema" },
  { chave: "problema", rotulo: "Problema previsto" },
  { chave: "recomendacao", rotulo: "Recomendação" },
] as const;

function SlideAnaliseTarefa() {
  return (
    <Slide titulo="Análise da Tarefa" pagina={3}>
      <div className="flex h-full flex-col">
        <p className="-mt-[14px] mb-[14px] text-center text-[15px] text-[#6b7280]">
          Figura 1 — Análise Hierárquica da Tarefa (HTA), notação de Annett e Duncan (1967)
        </p>

        {/* Árvore: raiz, barra e os três subobjetivos com as operações. */}
        <div className="mx-auto w-[560px] rounded-[12px] border-2 border-[#0166c0] bg-[#eef5fc] px-[20px] py-[12px] text-center">
          <p className="text-[19px] font-bold">
            {htaRaiz.codigo}. {htaRaiz.titulo}
          </p>
          <p className="text-[15px] text-[#374151]">{htaRaiz.plano}</p>
        </div>
        <div className="relative h-[30px]" aria-hidden="true">
          <div className="absolute top-0 left-1/2 h-[15px] w-[2px] bg-[#9aa8bd]" />
          <div className="absolute top-[15px] right-[calc((100%-64px)/6)] left-[calc((100%-64px)/6)] h-[2px] bg-[#9aa8bd]" />
        </div>
        <ol className="grid grid-cols-3 gap-[32px]">
          {htaObjetivos.map((o) => (
            <li key={o.codigo} className="relative">
              <div className="absolute -top-[15px] left-1/2 h-[15px] w-[2px] bg-[#9aa8bd]" aria-hidden="true" />
              <div className="rounded-[12px] border border-[#c5cfdd] px-[18px] py-[12px]">
                <p className="text-[20px] font-bold">
                  {o.codigo}. {o.titulo}
                </p>
                <p className="text-[16px] text-[#4b5563]">
                  {o.plano} · Telas {o.telas.join(", ")}
                </p>
                <ol className="mt-[8px] space-y-[4px]">
                  {o.passos.map((p) => (
                    <li key={p.codigo} className="grid grid-cols-[42px_1fr] text-[17px] leading-[1.35]">
                      <span className="font-mono font-semibold text-[#0166c0]">{p.codigo}</span>
                      <span>{p.titulo}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-[18px] grid grid-cols-2 gap-[32px] text-[16.5px] leading-[1.42]">
          {planos.map((p) => (
            <p key={p.termo}>
              <strong>{p.termo}:</strong> <span className="text-[#374151]">{p.texto}</span>
            </p>
          ))}
        </div>

        <table className="mt-[20px] w-full border-collapse text-left text-[16px] leading-[1.38]">
          <caption className="mb-[6px] caption-top text-left text-[16px] font-bold text-[#0166c0] uppercase">
            Tabela 2 — Planos, entradas, feedbacks, problemas previstos e recomendações
          </caption>
          <thead>
            <tr className="bg-[#0166c0] text-white">
              <th className="w-[15%] px-[12px] py-[9px] font-semibold">Objetivo</th>
              {colunasTabela2.map((c) => (
                <th key={c.chave} className="px-[12px] py-[9px] font-semibold">
                  {c.rotulo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabela2.map((l) => (
              <tr key={l.objetivo} className="border-b border-[#e5e9f0] align-top">
                <th scope="row" className="px-[12px] py-[9px] font-semibold">
                  {l.objetivo}
                  <span className="block font-normal text-[#0166c0]">Telas {l.telas.join(", ")}</span>
                </th>
                <td className="px-[12px] py-[9px] text-[#374151]">
                  {l.plano} <em className="not-italic text-[#111827]">Input:</em> {l.input}
                </td>
                <td className="px-[12px] py-[9px] text-[#374151]">{l.feedback}</td>
                <td className="px-[12px] py-[9px] text-[#374151]">{l.problema}</td>
                <td className="px-[12px] py-[9px] text-[#374151]">{l.recomendacao}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-auto grid grid-cols-3 gap-[32px] pt-[12px] text-[16px] leading-[1.42]">
          {usabilidade.map((u) => (
            <p key={u.termo}>
              <strong className="text-[#0166c0]">{u.termo} (NBR ISO 9241-11):</strong> <span className="text-[#374151]">{u.texto}</span>
            </p>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* --------------------------------------------------- 4. Fluxo de Informação */

const legenda = [
  { simbolo: <path d="M0 6 L40 6" />, rotulo: "associação" },
  {
    simbolo: (
      <>
        <path d="M1 6 L10 1 L19 6 L10 11 Z" fill="#fff" />
        <path d="M19 6 L40 6" />
      </>
    ),
    rotulo: "agregação",
  },
  {
    simbolo: (
      <>
        <path d="M1 6 L10 1 L19 6 L10 11 Z" fill="#3b4a63" />
        <path d="M19 6 L40 6" />
      </>
    ),
    rotulo: "composição",
  },
  {
    simbolo: (
      <>
        <path d="M0 6 L38 6" strokeDasharray="6 5" />
        <path d="M30 1 L40 6 L30 11" fill="none" />
      </>
    ),
    rotulo: "dependência",
  },
];

function SlideFluxo() {
  const livre = areaLivreLarga();
  const pct = (n: number) => `${(n * 100).toFixed(2)}%`;
  return (
    <Slide titulo="Fluxo de Informação (Diagrama de Classes)" pagina={4}>
      <div className="diagrama-claro relative" style={DIAGRAMA_CLARO}>
        <DiagramaClasses layout="largo" className="block h-auto w-full font-mono text-[12.5px]" />

        {/* Legenda e tipos no espaço livre abaixo de Aluno. */}
        <aside
          className="absolute text-[14.5px] leading-[1.4]"
          style={{ left: pct(livre.left), top: pct(livre.top), width: pct(livre.width), height: pct(livre.height) }}
        >
          <Rotulo>Legenda</Rotulo>
          <ul className="grid grid-cols-2 gap-x-[12px] gap-y-[4px]">
            {legenda.map((l) => (
              <li key={l.rotulo} className="flex items-center gap-[8px]">
                <svg width="42" height="12" aria-hidden="true" stroke="#3b4a63" strokeWidth="1.5" fill="none">
                  {l.simbolo}
                </svg>
                {l.rotulo}
              </li>
            ))}
          </ul>
          <p className="mt-[6px]">
            <span className="font-mono text-[#0a6fd1]">★</span> acrescentado depois da entrega do diagrama ·{" "}
            <span className="font-mono">/</span> atributo derivado
          </p>

          <div className="mt-[16px]">
            <Rotulo>Tipos do domínio</Rotulo>
            <dl className="space-y-[3px] font-mono text-[13.5px]">
              {tiposDoDominio.map((t) => (
                <div key={t.nome}>
                  <dt className="inline font-semibold">{t.nome}: </dt>
                  <dd className="inline text-[#4b5563]">{t.valores}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
      <p className="mt-[14px] text-[15px] leading-[1.45] text-[#374151]">
        {demonstracao} Cada classe é um arquivo TypeScript em <span className="font-mono">src/domain/</span> do protótipo; a
        serialização (toDados, fromDados, migrarDados) fica de fora.
      </p>
    </Slide>
  );
}

/* ------------------------------------------------------------ 5. Wireframe */

const tipoTela: Record<Tela["tipo"], { rotulo: string; classe: string }> = {
  existente: { rotulo: "Existente", classe: "bg-[#eef1f5] text-[#4b5563]" },
  alterada: { rotulo: "Alterada", classe: "bg-[#fff4d6] text-[#8a5a00]" },
  nova: { rotulo: "Nova", classe: "bg-[#0166c0] text-white" },
};

function CartaoTela({ tela }: { tela: Tela }) {
  const tipo = tipoTela[tela.tipo];
  return (
    <li className="flex flex-col rounded-[12px] border border-[#dbe2ec] px-[12px] pt-[10px] pb-[10px]">
      <div className="flex items-baseline gap-[8px]">
        <span className="text-[24px] leading-none font-extrabold text-[#0166c0]">{tela.id}</span>
        <span className="min-w-0 flex-1 text-[15px] leading-[1.15] font-bold">{tela.titulo}</span>
      </div>
      <div className="mt-[5px] flex items-center gap-[6px] text-[12.5px]">
        <span className={`rounded-full px-[8px] py-[1px] font-semibold ${tipo.classe}`}>{tipo.rotulo}</span>
        {tela.hta ? <span className="font-mono text-[#374151]">HTA {tela.hta}</span> : null}
      </div>
      <div className="mt-[8px] grid grid-cols-2 gap-[8px]">
        <figure>
          <div className="relative aspect-[390/844] overflow-hidden rounded-[8px] border border-[#dbe2ec] bg-[#f6f8fb]">
            {tela.wireframe ? (
              <Image src={tela.wireframe} alt={`Wireframe da Tela ${tela.id}`} fill loading="eager" sizes="260px" className="object-contain" />
            ) : (
              <p className="absolute inset-0 flex items-center p-[8px] text-center text-[11.5px] leading-[1.3] text-[#6b7280]">
                Tela acrescentada depois do wireframe entregue
              </p>
            )}
          </div>
          <figcaption className="mt-[3px] text-center text-[11.5px] text-[#6b7280]">Wireframe</figcaption>
        </figure>
        <figure>
          <div className="relative aspect-[390/844] overflow-hidden rounded-[8px] bg-black">
            <Image src={tela.imagem} alt={`Tela ${tela.id} no protótipo`} fill loading="eager" sizes="260px" className="object-cover object-top" />
          </div>
          <figcaption className="mt-[3px] text-center text-[11.5px] text-[#6b7280]">Protótipo</figcaption>
        </figure>
      </div>
      <p className="mt-[6px] text-[12.5px] leading-[1.3] text-[#374151]">
        <span className="text-[#111827]">→ </span>
        {tela.navegacao}
      </p>
    </li>
  );
}

function SlideWireframe() {
  return (
    <Slide titulo="Wireframe" pagina={5}>
      <ol className="grid h-full grid-cols-6 grid-rows-2 gap-[14px]">
        {telas.map((t) => (
          <CartaoTela key={t.id} tela={t} />
        ))}
        <li className="flex flex-col rounded-[12px] bg-[#eef5fc] px-[14px] py-[12px] text-[13px] leading-[1.38]">
          <p className="text-[15px] font-bold">Fluxo da tarefa</p>
          <p className="mt-[4px] text-[#374151]">
            1 → 2 → 3 → 4 (HTA 1.1) → 5 e 6 (1.2) → 7 (2.1) → 8 (2.2) → 9 (3.2) ⇄ 10 (3.1).
          </p>
          <p className="mt-[10px] text-[15px] font-bold">O que mudou desde o wireframe</p>
          <ul className="mt-[4px] list-disc space-y-[3px] pl-[16px] text-[#374151]">
            {mudancasDoApp.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </li>
      </ol>
    </Slide>
  );
}

export default function Entrega() {
  return (
    <main className={`entrega-pdf bg-[#e5e7eb] font-sans ${geistPdf.variable}`}>
      <style>{`
        @page { margin: 0; }
        html, body { background: #e5e7eb !important; }
        .entrega-pdf { --font-geist-sans: var(--font-pdf-sans), sans-serif; --font-geist-mono: 'Geist Mono', monospace; }
        /* Sem isso o Chromium arredonda larguras em texto pequeno e abre vãos ("INAT EL") no PDF. */
        .entrega-pdf { text-rendering: geometricPrecision; }
        .entrega-pdf .slide { margin: 0 auto; }
        .entrega-pdf .slide:not(:last-child) { break-after: page; }
        .diagrama-claro svg text[class*="opacity-80"] { fill: #dbe7f7; opacity: 1; }
        @media screen { .entrega-pdf .slide { margin: 24px auto; box-shadow: 0 10px 30px rgba(0,0,0,.15); } }
        @media print { html, body { background: #fff !important; } }
      `}</style>
      <SlideCapa />
      <SlideUserStory />
      <SlideAnaliseTarefa />
      <SlideFluxo />
      <SlideWireframe />
    </main>
  );
}
