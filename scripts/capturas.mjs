/**
 * Captura as telas e os estados extras do protótipo publicado (tema escuro,
 * tamanho de iPhone, 2x) para referencias/.
 *
 * Uso: npm run capturas
 *      BASE_URL=http://localhost:3123 npm run capturas   (contra um build local do app_hm)
 *
 * Baseado em app_hm/scripts/capturas.mjs.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "https://apphomemmaquina.vercel.app";
const TELAS = "referencias/telas-finais";
const ESTADOS = "referencias/estados";
const CHAVE = "inatel-planejador:v1";

// Toasts e indicadores ficam fora das telas principais; alguns estados precisam deles.
const SEM_ANIMACAO = `*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }`;
const SEM_STATUS = `[role="status"] { display: none !important; }`;

function mesDeReferencia(hoje = new Date()) {
  const d = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth() + (hoje.getDate() > 15 ? 1 : 0), 15));
  return d.toISOString().slice(0, 7);
}

function orcamentoExemplo() {
  const mes = mesDeReferencia();
  const dia = (n, h) => `${mes}-${String(n).padStart(2, "0")}T${h}:00.000Z`;
  return {
    mesReferencia: mes,
    rendaMensal: 290_000,
    fontes: { auxilio: 220_000, bolsaIC: 70_000 },
    percentuais: { moradia: 50, alimentacao: 30, outros: 20 },
    despesas: [
      { id: "e4", valor: 6_490, data: dia(9, "18:20"), categoriaId: "outros", subcategoria: "Lazer" },
      { id: "e3", valor: 21_870, data: dia(8, "12:05"), categoriaId: "alimentacao" },
      { id: "e2", valor: 4_500, data: dia(6, "19:40"), categoriaId: "alimentacao" },
      { id: "e1", valor: 45_000, data: dia(5, "10:00"), categoriaId: "moradia" },
    ],
  };
}

mkdirSync(TELAS, { recursive: true });
mkdirSync(ESTADOS, { recursive: true });

const navegador = await chromium.launch();
const contexto = await navegador.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  colorScheme: "dark",
  reducedMotion: "reduce",
});
const page = await contexto.newPage();

async function ir(rota, espera = 400) {
  await page.goto(`${BASE}${rota}`);
  await page.waitForTimeout(espera);
}

async function capturar(caminho, { status = false } = {}) {
  await page.addStyleTag({ content: status ? SEM_ANIMACAO : SEM_ANIMACAO + SEM_STATUS });
  await page.waitForTimeout(250);
  await page.screenshot({ path: caminho });
  console.log("ok", caminho);
}

const tela = (n) => capturar(`${TELAS}/tela-${n}.png`);
const estado = (nome, opcoes) => capturar(`${ESTADOS}/${nome}.png`, opcoes);

async function digitar(teclas) {
  for (const t of teclas) {
    await page.getByRole("button", { name: t === "," ? "Vírgula" : t, exact: true }).click();
  }
}

async function comExemplo() {
  await page.evaluate(([chave, dados]) => localStorage.setItem(chave, JSON.stringify(dados)), [CHAVE, orcamentoExemplo()]);
}

async function semDados() {
  await page.evaluate(() => localStorage.clear());
}

// 1, 2, 2b, 3, 4: telas existentes
await ir("/app/perfis");
await semDados();
await tela("01");
await page.getByRole("link", { name: /Lucas Andrade/ }).click();
await page.waitForTimeout(400);
await tela("02");
await ir("/app/login/cursos");
await tela("02b");
await ir("/app/avisos");
await tela("03");
await ir("/app/menu");
await page.getByRole("link", { name: "Planejador Financeiro & Bolsa" }).scrollIntoViewIfNeeded();
await tela("04");

// 5 e 6: resumo e bolsa. O estado sincronizando vem antes de a sincronização terminar.
await page.goto(`${BASE}/app/financeiro`);
await page.waitForTimeout(150);
await estado("estado-05-sincronizando", { status: true });
await page.waitForTimeout(1600);
await tela("05");
await ir("/app/financeiro/bolsa", 1600);
await tela("06");

// 7: renda insuficiente bloqueia; depois a renda de exemplo.
await ir("/app/financeiro/planejar/renda", 1600);
await page.getByLabel("Auxílio familiar").fill("100000");
await page.getByRole("alert").filter({ hasText: "não cobre" }).waitFor();
await page.locator("body").click({ position: { x: 5, y: 5 } });
await estado("estado-07-renda-insuficiente");
// A máscara de moeda soma dígitos ao valor atual; recomeça a tela.
await ir("/app/financeiro/planejar/renda", 1600);
await page.getByLabel("Auxílio familiar").fill("220000");
await page.getByRole("button", { name: "Bolsa IC" }).click();
await page.locator("#renda-bolsaIC").fill("70000");
await page.locator("body").click({ position: { x: 5, y: 5 } });
await tela("07");

// 8: tetos com a divisão sugerida.
await page.getByRole("button", { name: "Continuar" }).click();
await page.waitForTimeout(400);
await tela("08");

// 9: vazio, painel, apagar dados e remover com Desfazer.
await semDados();
await ir("/app/financeiro/orcamento", 1700);
await estado("estado-09-vazio");
await comExemplo();
await ir("/app/financeiro/orcamento", 1700);
await tela("09");
await page.getByRole("button", { name: /Apagar meus dados/ }).click();
await page.getByRole("dialog").waitFor();
await estado("estado-09-apagar-dados");
await ir("/app/financeiro/orcamento", 1700);
const remover = page.getByRole("button", { name: /Remover gasto de/ }).first();
await remover.scrollIntoViewIfNeeded();
await remover.click();
await page.getByRole("button", { name: "Desfazer" }).waitFor();
await estado("estado-09-historico-desfazer", { status: true });

// 10: lançar gasto, aviso de teto e nova subcategoria.
await comExemplo();
await ir("/app/financeiro/lancar", 1600);
await digitar("32,50");
await page.getByRole("button", { name: /Alimentação/ }).click();
await tela("10");
await ir("/app/financeiro/lancar", 1600);
await digitar("300");
await page.getByRole("button", { name: /Alimentação/ }).click();
await page.getByRole("button", { name: "Registrar gasto" }).click();
await page.getByRole("dialog").filter({ hasText: "Vai passar do teto" }).waitFor();
await estado("estado-10-passar-do-teto");
await ir("/app/financeiro/lancar", 1600);
await digitar("30");
await page.getByRole("button", { name: /^Outros$/ }).click();
await page.getByRole("button", { name: "Nova" }).click();
await page.getByRole("dialog").waitFor();
await estado("estado-10-nova-subcategoria");

await semDados();
await navegador.close();
