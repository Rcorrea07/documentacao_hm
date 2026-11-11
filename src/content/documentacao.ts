/**
 * Conteúdo da documentação. Fonte: referencias/conteudo-das-paginas.md,
 * atualizado para o protótipo publicado. Mantenha os dois em sincronia.
 */
import type { StaticImageData } from "next/image";

import tela01 from "../../referencias/telas-finais/tela-01.png";
import tela02 from "../../referencias/telas-finais/tela-02.png";
import tela02b from "../../referencias/telas-finais/tela-02b.png";
import tela03 from "../../referencias/telas-finais/tela-03.png";
import tela04 from "../../referencias/telas-finais/tela-04.png";
import tela05 from "../../referencias/telas-finais/tela-05.png";
import tela06 from "../../referencias/telas-finais/tela-06.png";
import tela07 from "../../referencias/telas-finais/tela-07.png";
import tela08 from "../../referencias/telas-finais/tela-08.png";
import tela09 from "../../referencias/telas-finais/tela-09.png";
import tela10 from "../../referencias/telas-finais/tela-10.png";

import wf01 from "../../referencias/wireframe-recortes/wf-01.png";
import wf02 from "../../referencias/wireframe-recortes/wf-02.png";
import wf03 from "../../referencias/wireframe-recortes/wf-03.png";
import wf04 from "../../referencias/wireframe-recortes/wf-04.png";
import wf05 from "../../referencias/wireframe-recortes/wf-05.png";
import wf06 from "../../referencias/wireframe-recortes/wf-06.png";
import wf07 from "../../referencias/wireframe-recortes/wf-07.png";
import wf08 from "../../referencias/wireframe-recortes/wf-08.png";
import wf09 from "../../referencias/wireframe-recortes/wf-09.png";
import wf10 from "../../referencias/wireframe-recortes/wf-10.png";

import est05 from "../../referencias/estados/estado-05-sincronizando.png";
import est07 from "../../referencias/estados/estado-07-renda-insuficiente.png";
import est09vazio from "../../referencias/estados/estado-09-vazio.png";
import est09desfazer from "../../referencias/estados/estado-09-historico-desfazer.png";
import est09apagar from "../../referencias/estados/estado-09-apagar-dados.png";
import est10teto from "../../referencias/estados/estado-10-passar-do-teto.png";
import est10sub from "../../referencias/estados/estado-10-nova-subcategoria.png";

export const PROTOTIPO_URL = "https://apphomemmaquina.vercel.app";

export const projeto = {
  titulo: "Planejador Financeiro & Bolsa",
  subtitulo: "Nova funcionalidade do App Inatel Acadêmico",
  eixo: "Eixo Suporte Financeiro",
  aluno: "Rafael Correa Barbosa",
  matricula: "GES 745",
  disciplina: "S05 — Interação Homem-Máquina (Ergonomia e Usabilidade)",
  professor: "Prof. Raphael C. M. Pereira",
  instituicao: "Instituto Nacional de Telecomunicações",
} as const;

export const secoes = [
  { id: "capa", rotulo: "Capa" },
  { id: "user-story", rotulo: "User Story" },
  { id: "analise-da-tarefa", rotulo: "Análise da Tarefa" },
  { id: "fluxo-de-informacao", rotulo: "Fluxo de Informação" },
  { id: "wireframe", rotulo: "Wireframe" },
] as const;

export type SecaoId = (typeof secoes)[number]["id"];

/* ------------------------------------------------------------------ Capa */

export const citacaoPersona =
  "Preciso saber quanto sobra no mês depois de pagar a parcela da faculdade e a república.";

export const justificativa = {
  antes: "Lucas Andrade, 20 anos, bolsista parcial no 4º período de Engenharia de Software, mora em república e diz:",
  depois:
    "Hoje o App Inatel mostra notas e horários, mas não liga o desconto da bolsa ao custo de vida. O Planejador Financeiro & Bolsa traz a mensalidade líquida já calculada a partir dos dados da SAE e divide o saldo que sobra entre Moradia, Alimentação e Outros gastos, com os gastos guardados só no celular do aluno.",
};

export const simulacao = [
  {
    termo: "Input",
    tela: "7" as TelaId,
    imagem: tela07,
    texto:
      "Renda por fonte com máscara de moeda, tetos por controle deslizante e teclado numérico próprio com categoria em 1 toque. Em Outros gastos, o aluno escolhe ou cria uma subcategoria.",
  },
  {
    termo: "Processamento",
    tela: "8" as TelaId,
    imagem: tela08,
    texto:
      "Desconto da bolsa, parcela líquida, saldo livre, tetos que somam 100% ao centavo e comprometimento por categoria (código testado).",
  },
  {
    termo: "Feedback",
    tela: "10" as TelaId,
    imagem: est10teto,
    texto:
      "Sincronização com o Portal/SAE, valores animados, barras com estado (ok, atenção, estouro), alertas, confirmação e “Desfazer”.",
  },
] as const;

/* ------------------------------------------------------------ User Story */

export const contextualizacao =
  "Grande parte dos estudantes de graduação do Inatel custeia seus estudos por meio de programas geridos pela Seção de Assistência Estudantil (SAE) e pela Finatel: Bolsa Socioeconômica Finatel (de 20% a 100%, dividida em 50% não reembolsável e 50% reembolsável), Bolsa Beneficente, Bolsa Mérito, crédito estudantil Fundacred (CredIES Inatel, 50% reembolsável) e FIES (conciliável com a Bolsa Finatel). Para evitar um controle genérico tipo “bloco de notas”, a funcionalidade integra automaticamente os dados da bolsa do aluno (calculando a parcela líquida real do mês) a um planejador de custo de vida local no aparelho, com categorias típicas da rotina universitária.";

export const persona = [
  {
    dimensao: "Identificação e citação",
    descricao:
      "Lucas Andrade, 20 anos, 4º período (P4) de Engenharia de Software, bolsista parcial (Finatel/Fundacred). “Preciso saber quanto sobra no mês depois de pagar a parcela da faculdade e a república.”",
  },
  {
    dimensao: "Características-chave",
    descricao:
      "Mora em república em Santa Rita do Sapucaí; bolsa parcial administrada via SAE/Fundacred; recebe auxílio mensal da família somado a uma bolsa de iniciação científica.",
  },
  {
    dimensao: "Objetivos-chave",
    descricao:
      "Ver o valor líquido exato da mensalidade já com a bolsa e distribuir o saldo restante entre moradia, alimentação e outros gastos sem estourar o mês.",
  },
  {
    dimensao: "Dores principais",
    descricao:
      "Dificuldade em prever o impacto de créditos e reajustes na parcela líquida; falta de uma visão que una a mensalidade do Inatel aos gastos fixos de estudante.",
  },
  {
    dimensao: "O que nunca devemos fazer",
    descricao:
      "Entregar uma tela vazia tipo “bloco de notas” que exija cálculos manuais da bolsa, ou expor gastos pessoais fora do armazenamento local do celular.",
  },
] as const;

export const historia =
  "Como Lucas Andrade, estudante bolsista que mora fora de casa, quero visualizar minha mensalidade líquida integrada a um planejador de gastos estudantis no App Inatel, para que eu consiga organizar meu custo de vida mensal com base no desconto da minha bolsa sem comprometer meu orçamento.";

export const historiaPartes = [
  { termo: "Como", texto: "Estudante bolsista (Finatel/Fundacred/FIES) que gerencia um orçamento mensal restrito." },
  { termo: "Quero", texto: "Unir a consulta da parcela líquida da faculdade ao controle estruturado de gastos pessoais." },
  {
    termo: "Para que",
    texto: "Ter previsibilidade financeira no semestre e evitar endividamento ou perda de prazos da bolsa.",
  },
] as const;

export const criteriosAceite = [
  {
    texto: "A mensalidade líquida aparece já calculada (bruto − desconto da bolsa), sem digitação.",
    tela: "5" as TelaId,
    imagem: tela05,
    legenda: "Tela 5 · resumo da mensalidade",
  },
  {
    texto:
      "Com a renda informada, o saldo livre pós-mensalidade é calculado na hora; renda insuficiente bloqueia o avanço com explicação.",
    tela: "7" as TelaId,
    imagem: est07,
    legenda: "Tela 7 · renda insuficiente",
  },
  {
    texto: "Os tetos de Moradia, Alimentação e Outros gastos sempre somam 100% e têm divisão sugerida (50/30/20).",
    tela: "8" as TelaId,
    imagem: tela08,
    legenda: "Tela 8 · tetos por categoria",
  },
  {
    texto:
      "Um gasto é registrado com valor + 1 toque na categoria (em Outros gastos, também a subcategoria) e atualiza a barra e o saldo restante.",
    tela: "10" as TelaId,
    imagem: tela10,
    legenda: "Tela 10 · lançar gasto",
  },
  {
    texto: "Os gastos ficam só no armazenamento local do celular e podem ser apagados pelo aluno.",
    tela: "9" as TelaId,
    imagem: est09apagar,
    legenda: "Tela 9 · apagar meus dados",
  },
];

/* ----------------------------------------------------- Análise da Tarefa */

export type TelaId = "1" | "2" | "2b" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

export const htaRaiz = {
  codigo: "0",
  titulo: "Planejar orçamento mensal integrado à bolsa no App Inatel",
  plano: "Plano 0: 1 > 2 > 3 (repetir 3 ao longo do mês)",
};

export const htaObjetivos = [
  {
    codigo: "1",
    titulo: "Conferir bolsa e parcela",
    plano: "Plano 1: 1.1 > 1.2",
    passos: [
      { codigo: "1.1", titulo: "Acessar Suporte Financeiro no App Inatel" },
      { codigo: "1.2", titulo: "Visualizar mensalidade líquida (Finatel / Fundacred / FIES)" },
    ],
    telas: ["4", "5", "6"] as TelaId[],
  },
  {
    codigo: "2",
    titulo: "Estruturar orçamento local",
    plano: "Plano 2: 2.1 > 2.2",
    passos: [
      { codigo: "2.1", titulo: "Informar renda / auxílio mensal (abatendo a parcela líquida)" },
      { codigo: "2.2", titulo: "Definir tetos por categoria (Moradia, Alimentação, Outros gastos)" },
    ],
    telas: ["7", "8"] as TelaId[],
  },
  {
    codigo: "3",
    titulo: "Lançar gasto e ver saldo",
    plano: "Plano 3: 3.1 > 3.2",
    passos: [
      { codigo: "3.1", titulo: "Registrar despesa rápida em categoria pré-definida" },
      { codigo: "3.2", titulo: "Consultar barra de saldo livre e comprometimento" },
    ],
    telas: ["9", "10"] as TelaId[],
  },
] as const;

/** As seis operações da HTA, cada uma com a tela que a executa. */
export const htaOperacoes = [
  { codigo: "1.1", objetivo: 0, titulo: "Acessar Suporte Financeiro no App Inatel", tela: "4" as TelaId, imagem: tela04 },
  { codigo: "1.2", objetivo: 0, titulo: "Visualizar mensalidade líquida (Finatel / Fundacred / FIES)", tela: "5" as TelaId, imagem: tela05 },
  { codigo: "2.1", objetivo: 1, titulo: "Informar renda / auxílio mensal (abatendo a parcela líquida)", tela: "7" as TelaId, imagem: tela07 },
  { codigo: "2.2", objetivo: 1, titulo: "Definir tetos por categoria (Moradia, Alimentação, Outros gastos)", tela: "8" as TelaId, imagem: tela08 },
  { codigo: "3.1", objetivo: 2, titulo: "Registrar despesa rápida em categoria pré-definida", tela: "10" as TelaId, imagem: tela10 },
  { codigo: "3.2", objetivo: 2, titulo: "Consultar barra de saldo livre e comprometimento", tela: "9" as TelaId, imagem: tela09 },
];

export const planos = [
  {
    termo: "Plano 0 (1 > 2 > 3)",
    texto:
      "No início do mês, acessar o módulo para conferir a parcela líquida (1), definir a renda e os tetos (2) e, ao longo do mês, registrar despesas conferindo o saldo livre (3).",
  },
  {
    termo: "Iteração mensal (repetir 3)",
    texto:
      "Sempre que houver uma despesa relevante em Moradia, Alimentação ou Outros gastos, executar só o subobjetivo 3 para atualizar o saldo.",
  },
] as const;

export const tabela2 = [
  {
    objetivo: "1. Conferir bolsa e parcela (1.1, 1.2)",
    plano: "Abrir Suporte Financeiro (1.1) e ver o resumo da mensalidade líquida (1.2).",
    input: "Dados do Portal Acadêmico/SAE: valor bruto, % da bolsa, cotas, prazo de renovação.",
    feedback: "Tabela com bruto, desconto, parcela líquida e vencimento; selo “atualizado hoje”.",
    problema: "Dúvida sobre o que é reembolsável e perda do prazo de renovação.",
    recomendacao: "Discriminar as cotas (Tela 6) e alertar a renovação com cor e contagem de dias.",
    telas: ["4", "5", "6"] as TelaId[],
  },
  {
    objetivo: "2. Estruturar orçamento local (2.1, 2.2)",
    plano: "Informar a renda (2.1) e distribuir tetos nas categorias (2.2).",
    input: "Renda por fonte (auxílio, estágio, bolsa IC) e percentuais por categoria.",
    feedback: "Saldo livre calculado na hora; tetos em R$ que somam 100%; aviso se a renda não cobre a parcela.",
    problema: "Abandono se exigir preenchimento extenso como planilha.",
    recomendacao: "Categorias prontas, divisão sugerida 50/30/20 e controles que se reequilibram.",
    telas: ["7", "8"] as TelaId[],
  },
  {
    objetivo: "3. Lançar gasto e ver saldo (3.1, 3.2)",
    plano: "Registrar o valor em uma categoria (3.1) e consultar o comprometimento (3.2).",
    input: "Valor no teclado numérico, 1 toque na categoria e, em Outros gastos, a subcategoria.",
    feedback:
      "Barra da categoria animada (ok/atenção/estouro), saldo restante, divisão de Outros gastos por subcategoria, toast com “Desfazer”.",
    problema: "Receio de privacidade e erro de digitação.",
    recomendacao: "Guardar só no celular, avisar antes de estourar o teto e permitir desfazer.",
    telas: ["9", "10"] as TelaId[],
  },
] as const;

export const usabilidade = [
  {
    termo: "Eficácia",
    texto:
      "O aluno vê a mensalidade líquida correta e monta o orçamento sem erros de cálculo (regras testadas, valores em centavos).",
  },
  {
    termo: "Eficiência",
    texto:
      "O desconto já vem preenchido; um gasto leva 3 toques em Moradia ou Alimentação (valor, categoria, registrar) e 4 em Outros gastos (mais a subcategoria), sem digitação livre.",
  },
  {
    termo: "Satisfação",
    texto: "Sensação de controle com barras e estados claros, e privacidade garantida pelo armazenamento local.",
  },
] as const;

/* --------------------------------------------------- Fluxo de Informação */

export type Membro = { texto: string; novo?: boolean };
export type Classe = {
  nome: string;
  arquivo: string;
  atributos: Membro[];
  metodos: Membro[];
};

export const classes: Record<string, Classe> = {
  Aluno: {
    nome: "Aluno",
    arquivo: "src/domain/Aluno.ts",
    atributos: [
      { texto: "- nome: string" },
      { texto: "- matricula: string" },
      { texto: "- periodo: number" },
      { texto: "- curso: string", novo: true },
      { texto: "- email: string", novo: true },
    ],
    metodos: [{ texto: "+ autenticar(matricula, senha): boolean" }],
  },
  SuporteFinanceiro: {
    nome: "SuporteFinanceiro",
    arquivo: "src/domain/SuporteFinanceiro.ts",
    atributos: [{ texto: '- telaAtiva: "resumo" | "orcamento"' }],
    metodos: [
      { texto: "+ abrirResumo(): void" },
      { texto: "+ abrirOrcamento(): void" },
      { texto: "+ sincronizarPortal(hoje): Promise<Mensalidade>" },
    ],
  },
  Mensalidade: {
    nome: "Mensalidade",
    arquivo: "src/domain/Mensalidade.ts",
    atributos: [
      { texto: "- mesReferencia: string" },
      { texto: "- valorBruto: Centavos" },
      { texto: "- dataVencimento: DataISO" },
      { texto: "- bolsas: Bolsa[]", novo: true },
      { texto: "/ descontoAplicado: Centavos" },
      { texto: "/ parcelaLiquida: Centavos" },
      { texto: "/ percentualDesconto: number", novo: true },
    ],
    metodos: [{ texto: "+ calcularParcelaLiquida(): Centavos" }, { texto: "+ exibirResumo(): ResumoMensalidade" }],
  },
  Bolsa: {
    nome: "Bolsa",
    arquivo: "src/domain/Bolsa.ts",
    atributos: [
      { texto: "- tipo: TipoBolsa" },
      { texto: "- nome: string", novo: true },
      { texto: "- percentual: number" },
      { texto: "- cotaNaoReembolsavel: number" },
      { texto: "- cotaReembolsavel: number" },
      { texto: "- dataRenovacao: DataISO" },
    ],
    metodos: [
      { texto: "+ calcularDesconto(valorBruto): Centavos" },
      { texto: "+ valorNaoReembolsavel(valorBruto): Centavos", novo: true },
      { texto: "+ valorReembolsavel(valorBruto): Centavos", novo: true },
      { texto: "+ verificarRenovacao(hoje): boolean" },
      { texto: "+ diasParaRenovacao(hoje): number", novo: true },
      { texto: "+ nivelRenovacao(hoje): NivelRenovacao", novo: true },
    ],
  },
  OrcamentoMensal: {
    nome: "OrcamentoMensal",
    arquivo: "src/domain/OrcamentoMensal.ts",
    atributos: [
      { texto: "- mesReferencia: string" },
      { texto: "- rendaMensal: Centavos" },
      { texto: "- fontes: auxilio | estagio | bolsaIC → Centavos", novo: true },
      { texto: "- categorias: CategoriaGasto[3]" },
      { texto: "/ saldoLivre: Centavos" },
      { texto: "/ saldoRestante: Centavos" },
      { texto: "/ totalGasto: Centavos", novo: true },
      { texto: "/ comprometimento: number", novo: true },
      { texto: "/ estado: EstadoCategoria", novo: true },
    ],
    metodos: [
      { texto: "+ informarRenda(valor): void" },
      { texto: "+ calcularSaldoLivre(m: Mensalidade): Centavos" },
      { texto: "+ sugerirTetos(): void" },
      { texto: "+ definirTetos(percentuais): void", novo: true },
      { texto: "+ tetoDe(categoria): Centavos", novo: true },
      { texto: "+ categoria(id): CategoriaGasto", novo: true },
      { texto: "+ calcularSaldoRestante(): Centavos" },
      { texto: "+ removerDespesa(id): Despesa | undefined", novo: true },
      { texto: "+ salvarLocal(): boolean" },
    ],
  },
  CategoriaGasto: {
    nome: "CategoriaGasto",
    arquivo: "src/domain/CategoriaGasto.ts",
    atributos: [
      { texto: "- id: CategoriaId", novo: true },
      { texto: "- nome: string" },
      { texto: "- percentualTeto: number" },
      { texto: "- subcategorias: string[]", novo: true },
      { texto: "/ valorTeto: Centavos" },
      { texto: "/ totalGasto: Centavos" },
      { texto: "/ disponivel: Centavos", novo: true },
      { texto: "/ estado: EstadoCategoria", novo: true },
    ],
    metodos: [
      { texto: "+ definirTeto(percentual): void" },
      { texto: "+ registrarDespesa(valor, data?, subcategoria?): Despesa" },
      { texto: "+ adicionarSubcategoria(nome): string", novo: true },
      { texto: "+ totalPorSubcategoria(): {nome, total}[]", novo: true },
      { texto: "+ calcularComprometimento(): number" },
      { texto: "+ excessoSeRegistrar(valor): Centavos", novo: true },
    ],
  },
  Despesa: {
    nome: "Despesa",
    arquivo: "src/domain/Despesa.ts",
    atributos: [
      { texto: "- id: string", novo: true },
      { texto: "- valor: Centavos" },
      { texto: "- data: string" },
      { texto: "- categoriaId: CategoriaId", novo: true },
      { texto: "- subcategoria?: string", novo: true },
    ],
    metodos: [{ texto: "+ salvarLocal(): boolean" }],
  },
};

export const tiposDoDominio = [
  { nome: "TipoBolsa", valores: "Finatel | Fundacred | FIES | Beneficente | Merito" },
  { nome: "NivelRenovacao", valores: "tranquilo | atencao | urgente | vencida" },
  { nome: "CategoriaId", valores: "moradia | alimentacao | outros" },
  { nome: "EstadoCategoria", valores: "ok | atencao | estouro" },
  { nome: "Centavos", valores: "inteiro; R$ 1,00 = 100" },
] as const;

export type TipoRelacao = "associacao" | "agregacao" | "composicao" | "dependencia";

export const relacoes: Array<{
  de: string;
  para: string;
  tipo: TipoRelacao;
  rotulo: string;
  multiplicidade?: [string, string];
}> = [
  { de: "Aluno", para: "SuporteFinanceiro", tipo: "associacao", rotulo: "acessa", multiplicidade: ["1..1", "1..1"] },
  { de: "SuporteFinanceiro", para: "Mensalidade", tipo: "associacao", rotulo: "exibe", multiplicidade: ["1..1", "0..*"] },
  { de: "Mensalidade", para: "Bolsa", tipo: "agregacao", rotulo: "aplica", multiplicidade: ["0..*", "0..*"] },
  { de: "SuporteFinanceiro", para: "OrcamentoMensal", tipo: "composicao", rotulo: "gerencia", multiplicidade: ["1..1", "0..*"] },
  { de: "OrcamentoMensal", para: "CategoriaGasto", tipo: "composicao", rotulo: "contém", multiplicidade: ["1..1", "3"] },
  { de: "CategoriaGasto", para: "Despesa", tipo: "composicao", rotulo: "registra", multiplicidade: ["1..1", "0..*"] },
  { de: "OrcamentoMensal", para: "Mensalidade", tipo: "dependencia", rotulo: "usa a parcela líquida" },
];

export const nomeRelacao: Record<TipoRelacao, string> = {
  associacao: "associação",
  agregacao: "agregação",
  composicao: "composição",
  dependencia: "dependência",
};

export const demonstracao =
  "Dados de demonstração do protótipo: valor bruto R$ 2.850,00; Bolsa Socioeconômica Finatel 40% (20% não reembolsável + 20% reembolsável) = desconto R$ 1.140,00; parcela líquida R$ 1.710,00. As capturas usam renda de R$ 2.900,00, saldo livre R$ 1.190,00 e tetos 50/30/20 (R$ 595,00 / R$ 357,00 / R$ 238,00).";

/* ------------------------------------------------------------- Wireframe */

export type Tela = {
  id: TelaId;
  titulo: string;
  tipo: "existente" | "alterada" | "nova";
  hta?: string;
  classes?: string;
  navegacao: string;
  imagem: StaticImageData;
  wireframe?: StaticImageData;
};

export const telas: Tela[] = [
  { id: "1", titulo: "Perfis Salvos", tipo: "existente", navegacao: "Perfil salvo → Tela 2", imagem: tela01, wireframe: wf01 },
  {
    id: "2",
    titulo: "Autenticação",
    tipo: "existente",
    classes: "Aluno.autenticar()",
    navegacao: "Curso → Tela 2b · Autenticar → Tela 3",
    imagem: tela02,
    wireframe: wf02,
  },
  {
    id: "2b",
    titulo: "Escolha o seu curso",
    tipo: "existente",
    classes: "Aluno.curso",
    navegacao: "Curso escolhido → Tela 2",
    imagem: tela02b,
  },
  {
    id: "3",
    titulo: "Avisos (início)",
    tipo: "existente",
    navegacao: "Aba Menu → Tela 4 · Aba Financeiro → Tela 5",
    imagem: tela03,
    wireframe: wf03,
  },
  {
    id: "4",
    titulo: "Menu",
    tipo: "alterada",
    hta: "1.1",
    classes: "Aluno acessa SuporteFinanceiro",
    navegacao: "Planejador Financeiro & Bolsa (NOVO) → Tela 5",
    imagem: tela04,
    wireframe: wf04,
  },
  {
    id: "5",
    titulo: "Suporte Financeiro · Resumo",
    tipo: "nova",
    hta: "1.2",
    classes: "SuporteFinanceiro.abrirResumo(); Mensalidade.calcularParcelaLiquida(); Bolsa.verificarRenovacao()",
    navegacao: "Bolsa → 6 · Planejar orçamento do mês → 7 · Orçamento → 9",
    imagem: tela05,
    wireframe: wf05,
  },
  {
    id: "6",
    titulo: "Detalhes da Bolsa",
    tipo: "nova",
    hta: "1.2",
    classes: "Bolsa: percentual, cotas, dataRenovacao, nivelRenovacao()",
    navegacao: "Voltar → 5",
    imagem: tela06,
    wireframe: wf06,
  },
  {
    id: "7",
    titulo: "Planejar Orçamento · Renda",
    tipo: "nova",
    hta: "2.1",
    classes: "OrcamentoMensal.informarRenda(); calcularSaldoLivre(Mensalidade)",
    navegacao: "Continuar → 8",
    imagem: tela07,
    wireframe: wf07,
  },
  {
    id: "8",
    titulo: "Planejar Orçamento · Tetos",
    tipo: "nova",
    hta: "2.2",
    classes: "OrcamentoMensal.sugerirTetos(); definirTetos(); CategoriaGasto.definirTeto()",
    navegacao: "Salvar orçamento → 9",
    imagem: tela08,
    wireframe: wf08,
  },
  {
    id: "9",
    titulo: "Suporte Financeiro · Orçamento",
    tipo: "nova",
    hta: "3.2",
    classes:
      "OrcamentoMensal.calcularSaldoRestante(); CategoriaGasto.calcularComprometimento(); totalPorSubcategoria()",
    navegacao: "+ Lançar gasto → 10 · Resumo → 5",
    imagem: tela09,
    wireframe: wf09,
  },
  {
    id: "10",
    titulo: "Lançar Gasto",
    tipo: "nova",
    hta: "3.1",
    classes: "CategoriaGasto.registrarDespesa(); adicionarSubcategoria(); Despesa.salvarLocal()",
    navegacao: "Registrar ou Cancelar → 9",
    imagem: tela10,
    wireframe: wf10,
  },
];

export const mudancasDoApp = [
  "A terceira categoria passou de “Estudos” para Outros gastos, com subcategorias (Estudos / Material, Lazer, Investimento, Viagem / Transporte, ou uma criada pelo aluno).",
  "A barra de abas ganhou a aba Financeiro; Horários, Notas e Frequência ficam desativadas no protótipo.",
  "A Tela 3 mostra o aviso “Novo no app: Planejador Financeiro & Bolsa”.",
  "No computador, um menu lateral substitui as abas.",
  "O Menu tem “Voltar ao começo da demo”, que apaga os dados e volta à Tela 1.",
] as const;

export const estados: Array<{ titulo: string; tela: string; imagem: StaticImageData }> = [
  { titulo: "Sincronizando com o Portal/SAE", tela: "Telas 5 a 10", imagem: est05 },
  { titulo: "Renda insuficiente: Continuar bloqueado", tela: "Tela 7", imagem: est07 },
  { titulo: "Orçamento vazio com chamada para planejar", tela: "Tela 9", imagem: est09vazio },
  { titulo: "Gasto removido com “Desfazer”", tela: "Tela 9", imagem: est09desfazer },
  { titulo: "Apagar meus dados, com confirmação", tela: "Tela 9", imagem: est09apagar },
  { titulo: "Aviso antes de passar do teto", tela: "Tela 10", imagem: est10teto },
  { titulo: "Nova subcategoria em Outros gastos", tela: "Tela 10", imagem: est10sub },
];

export const telaAncora = (id: TelaId) => `tela-${id}`;
