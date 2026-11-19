/**
 * Gera o PDF de entrega (5 slides 16:9, 720×405 pt, como o modelo do Moodle)
 * a partir da rota /entrega deste site.
 *
 * Uso: npm run pdf            (faz o build, sobe o servidor e imprime)
 *      BASE_URL=http://localhost:3000 node scripts/pdf.mjs   (contra um servidor já rodando)
 */
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";

const SAIDA = "entrega/Projeto_Final_Rafael_Correa_Barbosa_GES745.pdf";
const PORTA = 3999;

async function esperar(url, tentativas = 60) {
  for (let i = 0; i < tentativas; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Servidor não respondeu em ${url}`);
}

// detached: o grupo inteiro (npx e o next-server filho) é encerrado no fim.
const servidor = process.env.BASE_URL
  ? null
  : spawn("npx", ["next", "start", "-p", String(PORTA)], { stdio: "ignore", detached: true });
const base = process.env.BASE_URL ?? `http://localhost:${PORTA}`;

try {
  await esperar(`${base}/entrega`);
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 } });
  await pagina.goto(`${base}/entrega`, { waitUntil: "networkidle" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.pdf({ path: SAIDA, width: "10in", height: "5.625in", scale: 0.5, printBackground: true });
  await navegador.close();
  console.log(`PDF gerado: ${SAIDA}`);
} finally {
  if (servidor) process.kill(-servidor.pid, "SIGTERM");
}
