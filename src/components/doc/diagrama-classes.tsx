import { classes, relacoes, type Classe } from "@/content/documentacao";

/* Geometria fixa do diagrama (unidades do viewBox). */
const LINHA = 18;
const CAB = 44;
const PAD = 8;
const W = 1540;
const COL = { 0: { x: 20, w: 400 }, 1: { x: 540, w: 460 }, 2: { x: 1120, w: 400 } } as const;

function altura(c: Classe) {
  return CAB + PAD + c.atributos.length * LINHA + PAD * 2 + c.metodos.length * LINHA + PAD;
}

type Caixa = { x: number; y: number; w: number; h: number };

const ROW_A = 20;
const posicoes: Record<string, { col: 0 | 1 | 2; y: number }> = {
  Aluno: { col: 0, y: ROW_A },
  SuporteFinanceiro: { col: 1, y: ROW_A },
  Mensalidade: { col: 2, y: ROW_A },
  OrcamentoMensal: { col: 1, y: 0 },
  Bolsa: { col: 2, y: 0 },
  CategoriaGasto: { col: 1, y: 0 },
  Despesa: { col: 0, y: 0 },
};

const alturaA = Math.max(altura(classes.Aluno), altura(classes.SuporteFinanceiro), altura(classes.Mensalidade));
const ROW_B = ROW_A + alturaA + 90;
const ROW_C = ROW_B + altura(classes.OrcamentoMensal) + 90;
posicoes.OrcamentoMensal.y = ROW_B;
posicoes.Bolsa.y = ROW_B;
posicoes.CategoriaGasto.y = ROW_C;
posicoes.Despesa.y = ROW_C;

const caixas: Record<string, Caixa> = Object.fromEntries(
  Object.entries(posicoes).map(([nome, p]) => [nome, { x: COL[p.col].x, y: p.y, w: COL[p.col].w, h: altura(classes[nome]) }]),
);
const H = Math.max(...Object.values(caixas).map((c) => c.y + c.h)) + 20;

const dir = (c: Caixa) => c.x + c.w;
const base = (c: Caixa) => c.y + c.h;
const meioX = (c: Caixa) => c.x + c.w / 2;

/** Traçado de cada relação: pontos do "todo"/origem até a parte/destino. */
function tracado(de: string, para: string): Array<[number, number]> {
  const a = caixas[de];
  const b = caixas[para];
  const chave = `${de}>${para}`;
  switch (chave) {
    case "Aluno>SuporteFinanceiro":
    case "SuporteFinanceiro>Mensalidade":
      return [
        [dir(a), a.y + 30],
        [b.x, b.y + 30],
      ];
    case "Mensalidade>Bolsa":
    case "SuporteFinanceiro>OrcamentoMensal":
    case "OrcamentoMensal>CategoriaGasto":
      return [
        [meioX(a), base(a)],
        [meioX(b), b.y],
      ];
    case "CategoriaGasto>Despesa":
      return [
        [a.x, a.y + 30],
        [dir(b), b.y + 30],
      ];
    case "OrcamentoMensal>Mensalidade": {
      const gap = (base(b) + caixas.Bolsa.y) / 2;
      const xGap = dir(a) + 60;
      return [
        [dir(a), a.y + 30],
        [xGap, a.y + 30],
        [xGap, gap],
        [b.x + 120, gap],
        [b.x + 120, base(b)],
      ];
    }
    default:
      return [];
  }
}

function MembroLinha({ texto, novo, x, y }: { texto: string; novo?: boolean; x: number; y: number }) {
  return (
    <text x={x} y={y} className={novo ? "fill-[var(--novo)]" : "fill-foreground"}>
      {texto}
      {novo ? <tspan className="fill-[var(--novo)]"> ★</tspan> : null}
    </text>
  );
}

function CaixaClasse({ nome }: { nome: string }) {
  const c = classes[nome];
  const box = caixas[nome];
  const yAttr = box.y + CAB + PAD;
  const yDiv = yAttr + c.atributos.length * LINHA + PAD;
  const yMet = yDiv + PAD;

  return (
    <g data-caixa>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={12} className="fill-[var(--deep-2)] stroke-[color:var(--border)]" strokeWidth={1} />
      <path
        d={`M${box.x} ${box.y + CAB} V${box.y + 12} a12 12 0 0 1 12 -12 H${box.x + box.w - 12} a12 12 0 0 1 12 12 V${box.y + CAB} Z`}
        className="fill-[var(--deep)]"
      />
      <text x={box.x + box.w / 2} y={box.y + 20} textAnchor="middle" className="fill-white font-sans text-[15px] font-bold">
        {c.nome}
      </text>
      <text x={box.x + box.w / 2} y={box.y + 35} textAnchor="middle" className="fill-[var(--tinta)] text-[10.5px] opacity-80">
        {c.arquivo}
      </text>
      {c.atributos.map((m, i) => (
        <MembroLinha key={m.texto} {...m} x={box.x + 12} y={yAttr + i * LINHA + 13} />
      ))}
      <line x1={box.x} x2={box.x + box.w} y1={yDiv} y2={yDiv} className="stroke-[color:var(--border)]" />
      {c.metodos.map((m, i) => (
        <MembroLinha key={m.texto} {...m} x={box.x + 12} y={yMet + i * LINHA + 13} />
      ))}
    </g>
  );
}

function Relacao({ de, para, tipo, rotulo, multiplicidade }: (typeof relacoes)[number]) {
  const pts = tracado(de, para);
  if (pts.length < 2) return null;
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const [x0, y0] = pts[0];
  const [x1, y1] = pts[pts.length - 1];
  const horizontal = pts.length === 2 && y0 === y1;

  // Rótulo no meio do maior trecho.
  let mx = (x0 + x1) / 2;
  let my = (y0 + y1) / 2;
  if (pts.length > 2) {
    mx = (pts[2][0] + pts[3][0]) / 2;
    my = pts[2][1];
  }

  const marcadorInicio = tipo === "agregacao" ? "url(#losango-vazio)" : tipo === "composicao" ? "url(#losango-cheio)" : undefined;
  const marcadorFim = tipo === "dependencia" ? "url(#seta-aberta)" : undefined;

  return (
    <g data-relacao>
      <path
        d={d}
        data-traco={tipo === "dependencia" ? undefined : true}
        pathLength={tipo === "dependencia" ? undefined : 1}
        fill="none"
        className="stroke-[var(--tinta)]"
        strokeWidth={1.5}
        strokeDasharray={tipo === "dependencia" ? "6 5" : undefined}
        markerStart={marcadorInicio}
        markerEnd={marcadorFim}
      />
      <text
        x={horizontal ? mx : mx + (pts.length > 2 ? 0 : 10)}
        y={horizontal ? my - 9 : my + (pts.length > 2 ? -8 : 4)}
        textAnchor={horizontal || pts.length > 2 ? "middle" : "start"}
        className="fill-foreground font-sans text-[13px] font-semibold"
      >
        {rotulo}
      </text>
      {multiplicidade ? (
        horizontal ? (
          <>
            <text x={x0 + (x1 > x0 ? 10 : -10)} y={y0 + 18} textAnchor={x1 > x0 ? "start" : "end"} className="fill-[var(--tinta)] text-[11.5px]">
              {multiplicidade[0]}
            </text>
            <text x={x1 + (x1 > x0 ? -10 : 10)} y={y1 + 18} textAnchor={x1 > x0 ? "end" : "start"} className="fill-[var(--tinta)] text-[11.5px]">
              {multiplicidade[1]}
            </text>
          </>
        ) : (
          <>
            <text x={x0 - 10} y={y0 + 26} textAnchor="end" className="fill-[var(--tinta)] text-[11.5px]">
              {multiplicidade[0]}
            </text>
            <text x={x1 - 10} y={y1 - 8} textAnchor="end" className="fill-[var(--tinta)] text-[11.5px]">
              {multiplicidade[1]}
            </text>
          </>
        )
      ) : null}
    </g>
  );
}

export function DiagramaClasses() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby="diagrama-titulo diagrama-desc"
      className="h-auto w-full min-w-[1000px] font-mono text-[12.5px]"
    >
      <title id="diagrama-titulo">Diagrama de Classes do Planejador Financeiro & Bolsa</title>
      <desc id="diagrama-desc">
        Sete classes: Aluno, SuporteFinanceiro, Mensalidade, Bolsa, OrcamentoMensal, CategoriaGasto e Despesa, com suas
        relações. A versão em texto está logo abaixo do diagrama.
      </desc>
      <defs>
        <marker id="losango-vazio" viewBox="0 0 20 12" refX="19" refY="6" markerWidth="20" markerHeight="12" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M1 6 L10 1 L19 6 L10 11 Z" className="fill-[var(--deep-2)] stroke-[var(--tinta)]" strokeWidth={1.5} />
        </marker>
        <marker id="losango-cheio" viewBox="0 0 20 12" refX="19" refY="6" markerWidth="20" markerHeight="12" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M1 6 L10 1 L19 6 L10 11 Z" className="fill-[var(--tinta)] stroke-[var(--tinta)]" strokeWidth={1.5} />
        </marker>
        <marker id="seta-aberta" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L11 6 L1 11" fill="none" className="stroke-[var(--tinta)]" strokeWidth={1.5} />
        </marker>
      </defs>
      {relacoes.map((r) => (
        <Relacao key={`${r.de}-${r.para}`} {...r} />
      ))}
      {Object.keys(caixas).map((nome) => (
        <CaixaClasse key={nome} nome={nome} />
      ))}
    </svg>
  );
}
