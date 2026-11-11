# Conteúdo das 5 páginas da documentação

Rafael Correa Barbosa — GES 745 · S05 — Interação Homem-Máquina (Ergonomia e Usabilidade) · Prof. Raphael C. M. Pereira

> **Fonte de verdade:** o protótipo publicado em https://apphomemmaquina.vercel.app (repo `app_hm`). Este texto foi atualizado para bater com ele em 11/11/2026. O PDF em `entrega/` é a entrega anterior e ainda usa "Estudos" como terceira categoria.

## Regras da entrega (Moodle, tarefa Projeto Final)

- PDF de 5 páginas, nesta ordem: 1 Capa (nome, matrícula, justificativa pela persona, link, tela no celular) · 2 User Story · 3 Análise da Tarefa · 4 Fluxo de Informação (Diagrama de Classes) · 5 Wireframe.
- A avaliação é sobre a interface publicada (o link). Exigido: experiência completa de ponta a ponta; simulação de input, processamento e feedback (diferencial); qualidade de grid, cores, imagens, animações e interações.
- Só 1 tentativa de envio. Prazo ≈ 27/11/2026.

## 1. Capa

**Planejador Financeiro & Bolsa** — nova funcionalidade do App Inatel Acadêmico · Eixo Suporte Financeiro

**Protótipo:** https://apphomemmaquina.vercel.app

**Justificativa pela persona:** Lucas Andrade, 20 anos, bolsista parcial no 4º período de Engenharia de Software, mora em república e diz: “Preciso saber quanto sobra no mês depois de pagar a parcela da faculdade e a república.” Hoje o App Inatel mostra notas e horários, mas não liga o desconto da bolsa ao custo de vida. O Planejador Financeiro & Bolsa traz a mensalidade líquida já calculada a partir dos dados da SAE e divide o saldo que sobra entre Moradia, Alimentação e Outros gastos, com os gastos guardados só no celular do aluno.

**Simulação de input, processamento e feedback:**
- **Input:** Renda por fonte com máscara de moeda, tetos por controle deslizante e teclado numérico próprio com categoria em 1 toque. Em Outros gastos, o aluno escolhe ou cria uma subcategoria.
- **Processamento:** Desconto da bolsa, parcela líquida, saldo livre, tetos que somam 100% ao centavo e comprometimento por categoria (código testado).
- **Feedback:** Sincronização com o Portal/SAE, valores animados, barras com estado (ok, atenção, estouro), alertas, confirmação e “Desfazer”.

Imagens da capa: `referencias/telas-finais/tela-05.png`, `tela-09.png`, `tela-10.png`.

## 2. User Story

**Contextualização:** Grande parte dos estudantes de graduação do Inatel custeia seus estudos por meio de programas geridos pela Seção de Assistência Estudantil (SAE) e pela Finatel: Bolsa Socioeconômica Finatel (de 20% a 100%, dividida em 50% não reembolsável e 50% reembolsável), Bolsa Beneficente, Bolsa Mérito, crédito estudantil Fundacred (CredIES Inatel, 50% reembolsável) e FIES (conciliável com a Bolsa Finatel). Para evitar um controle genérico tipo “bloco de notas”, a funcionalidade integra automaticamente os dados da bolsa do aluno (calculando a parcela líquida real do mês) a um planejador de custo de vida local no aparelho, com categorias típicas da rotina universitária.

**Tabela 1 — Persona primária (Lucas Andrade)**

| Dimensão | Descrição |
|---|---|
| Identificação e citação | Lucas Andrade, 20 anos, 4º período (P4) de Engenharia de Software, bolsista parcial (Finatel/Fundacred). “Preciso saber quanto sobra no mês depois de pagar a parcela da faculdade e a república.” |
| Características-chave | Mora em república em Santa Rita do Sapucaí; bolsa parcial administrada via SAE/Fundacred; recebe auxílio mensal da família somado a uma bolsa de iniciação científica. |
| Objetivos-chave | Ver o valor líquido exato da mensalidade já com a bolsa e distribuir o saldo restante entre moradia, alimentação e outros gastos sem estourar o mês. |
| Dores principais | Dificuldade em prever o impacto de créditos e reajustes na parcela líquida; falta de uma visão que una a mensalidade do Inatel aos gastos fixos de estudante. |
| O que nunca devemos fazer | Entregar uma tela vazia tipo “bloco de notas” que exija cálculos manuais da bolsa, ou expor gastos pessoais fora do armazenamento local do celular. |

> “Como Lucas Andrade, estudante bolsista que mora fora de casa, quero visualizar minha mensalidade líquida integrada a um planejador de gastos estudantis no App Inatel, para que eu consiga organizar meu custo de vida mensal com base no desconto da minha bolsa sem comprometer meu orçamento.”

- **Como [persona]:** Estudante bolsista (Finatel/Fundacred/FIES) que gerencia um orçamento mensal restrito.
- **Quero [intenção]:** Unir a consulta da parcela líquida da faculdade ao controle estruturado de gastos pessoais.
- **Para que [benefício]:** Ter previsibilidade financeira no semestre e evitar endividamento ou perda de prazos da bolsa.

**Critérios de aceite:**
1. A mensalidade líquida aparece já calculada (bruto − desconto da bolsa), sem digitação.
2. Com a renda informada, o saldo livre pós-mensalidade é calculado na hora; renda insuficiente bloqueia o avanço com explicação.
3. Os tetos de Moradia, Alimentação e Outros gastos sempre somam 100% e têm divisão sugerida (50/30/20).
4. Um gasto é registrado com valor + 1 toque na categoria (em Outros gastos, também a subcategoria) e atualiza a barra e o saldo restante.
5. Os gastos ficam só no armazenamento local do celular e podem ser apagados pelo aluno.

## 3. Análise da Tarefa (HTA)

**0. Planejar orçamento mensal integrado à bolsa no App Inatel** — Plano 0: 1 > 2 > 3 (repetir 3 ao longo do mês)

- **1. Conferir bolsa e parcela** (Plano 1: 1.1 > 1.2)
  - 1.1 Acessar Suporte Financeiro no App Inatel
  - 1.2 Visualizar mensalidade líquida (Finatel / Fundacred / FIES)
- **2. Estruturar orçamento local** (Plano 2: 2.1 > 2.2)
  - 2.1 Informar renda / auxílio mensal (abatendo a parcela líquida)
  - 2.2 Definir tetos por categoria (Moradia, Alimentação, Outros gastos)
- **3. Lançar gasto e ver saldo** (Plano 3: 3.1 > 3.2)
  - 3.1 Registrar despesa rápida em categoria pré-definida
  - 3.2 Consultar barra de saldo livre e comprometimento

- **Plano 0 (1 > 2 > 3):** No início do mês, acessar o módulo para conferir a parcela líquida (1), definir a renda e os tetos (2) e, ao longo do mês, registrar despesas conferindo o saldo livre (3).
- **Iteração mensal (repetir 3):** Sempre que houver uma despesa relevante em Moradia, Alimentação ou Outros gastos, executar só o subobjetivo 3 para atualizar o saldo.

**Tabela 2 — Planos, entradas, feedbacks, problemas e recomendações**

| Objetivo | Plano | Input | Feedback | Problema | Recomendação | Telas |
|---|---|---|---|---|---|---|
| 1. Conferir bolsa e parcela (1.1, 1.2) | Abrir Suporte Financeiro (1.1) e ver o resumo da mensalidade líquida (1.2). | Dados do Portal Acadêmico/SAE: valor bruto, % da bolsa, cotas, prazo de renovação. | Tabela com bruto, desconto, parcela líquida e vencimento; selo “atualizado hoje”. | Dúvida sobre o que é reembolsável e perda do prazo de renovação. | Discriminar as cotas (Tela 6) e alertar a renovação com cor e contagem de dias. | Telas 4, 5 e 6 |
| 2. Estruturar orçamento local (2.1, 2.2) | Informar a renda (2.1) e distribuir tetos nas categorias (2.2). | Renda por fonte (auxílio, estágio, bolsa IC) e percentuais por categoria. | Saldo livre calculado na hora; tetos em R$ que somam 100%; aviso se a renda não cobre a parcela. | Abandono se exigir preenchimento extenso como planilha. | Categorias prontas, divisão sugerida 50/30/20 e controles que se reequilibram. | Telas 7 e 8 |
| 3. Lançar gasto e ver saldo (3.1, 3.2) | Registrar o valor em uma categoria (3.1) e consultar o comprometimento (3.2). | Valor no teclado numérico, 1 toque na categoria e, em Outros gastos, a subcategoria. | Barra da categoria animada (ok/atenção/estouro), saldo restante, divisão de Outros gastos por subcategoria, toast com “Desfazer”. | Receio de privacidade e erro de digitação. | Guardar só no celular, avisar antes de estourar o teto e permitir desfazer. | Telas 9 e 10 |

**Critérios de usabilidade (NBR ISO 9241-11):**
- **Eficácia:** O aluno vê a mensalidade líquida correta e monta o orçamento sem erros de cálculo (regras testadas, valores em centavos).
- **Eficiência:** O desconto já vem preenchido; um gasto leva 3 toques em Moradia ou Alimentação (valor, categoria, registrar) e 4 em Outros gastos (mais a subcategoria), sem digitação livre.
- **Satisfação:** Sensação de controle com barras e estados claros, e privacidade garantida pelo armazenamento local.

## 4. Fluxo de Informação — Diagrama de Classes

Membros com ★ foram acrescentados depois da entrega do Diagrama de Classes. A serialização (`toDados`, `fromDados`, `migrarDados`) fica fora do diagrama. Valores em `Centavos` (inteiro).

### Aluno  (`src/domain/Aluno.ts` no app_hm)
```
- nome: string
- matricula: string
- periodo: number
- curso: string ★
- email: string ★
---
+ autenticar(matricula, senha): boolean
```
### SuporteFinanceiro  (`src/domain/SuporteFinanceiro.ts` no app_hm)
```
- telaAtiva: "resumo" | "orcamento"
---
+ abrirResumo(): void
+ abrirOrcamento(): void
+ sincronizarPortal(hoje): Promise<Mensalidade>
```
### Mensalidade  (`src/domain/Mensalidade.ts` no app_hm)
```
- mesReferencia: string
- valorBruto: Centavos
- dataVencimento: DataISO
- bolsas: Bolsa[] ★
/ descontoAplicado: Centavos
/ parcelaLiquida: Centavos
/ percentualDesconto: number ★
---
+ calcularParcelaLiquida(): Centavos
+ exibirResumo(): ResumoMensalidade
```
### Bolsa  (`src/domain/Bolsa.ts` no app_hm)
```
- tipo: Finatel | Fundacred | FIES | Beneficente | Merito
- nome: string ★
- percentual: number
- cotaNaoReembolsavel: number
- cotaReembolsavel: number
- dataRenovacao: DataISO
---
+ calcularDesconto(valorBruto): Centavos
+ valorNaoReembolsavel(valorBruto): Centavos ★
+ valorReembolsavel(valorBruto): Centavos ★
+ verificarRenovacao(hoje): boolean
+ diasParaRenovacao(hoje): number ★
+ nivelRenovacao(hoje): tranquilo | atencao | urgente | vencida ★
```
### OrcamentoMensal  (`src/domain/OrcamentoMensal.ts` no app_hm)
```
- mesReferencia: string
- rendaMensal: Centavos
- fontes: auxilio | estagio | bolsaIC → Centavos ★
- categorias: CategoriaGasto[3]
/ saldoLivre: Centavos
/ saldoRestante: Centavos
/ totalGasto: Centavos ★
/ comprometimento: number ★
/ estado: ok | atencao | estouro ★
---
+ informarRenda(valor): void
+ calcularSaldoLivre(m: Mensalidade): Centavos
+ sugerirTetos(): void
+ definirTetos(percentuais): void ★
+ tetoDe(categoria): Centavos ★
+ categoria(id): CategoriaGasto ★
+ calcularSaldoRestante(): Centavos
+ removerDespesa(id): Despesa | undefined ★
+ salvarLocal(): boolean
```
### CategoriaGasto  (`src/domain/CategoriaGasto.ts` no app_hm)
```
- id: moradia | alimentacao | outros ★
- nome: string
- percentualTeto: number
- subcategorias: string[] ★
/ valorTeto: Centavos
/ totalGasto: Centavos
/ disponivel: Centavos ★
/ estado: ok | atencao | estouro ★
---
+ definirTeto(percentual): void
+ registrarDespesa(valor, data?, subcategoria?): Despesa
+ adicionarSubcategoria(nome): string ★
+ totalPorSubcategoria(): {nome, total}[] ★
+ calcularComprometimento(): number
+ excessoSeRegistrar(valor): Centavos ★
```
### Despesa  (`src/domain/Despesa.ts` no app_hm)
```
- id: string ★
- valor: Centavos
- data: string
- categoriaId: CategoriaId ★
- subcategoria?: string ★
---
+ salvarLocal(): boolean
```
**Relações:**
- Aluno → SuporteFinanceiro: associacao, “acessa” (1..1 : 1..1)
- SuporteFinanceiro → Mensalidade: associacao, “exibe” (1..1 : 0..*)
- Mensalidade → Bolsa: agregacao, “aplica” (0..* : 0..*)
- SuporteFinanceiro → OrcamentoMensal: composicao, “gerencia” (1..1 : 0..*)
- OrcamentoMensal → CategoriaGasto: composicao, “contém” (1..1 : 3)
- CategoriaGasto → Despesa: composicao, “registra” (1..1 : 0..*)
- OrcamentoMensal → Mensalidade: dependencia, “usa a parcela líquida”

**Dados de demonstração do protótipo:** valor bruto R$ 2.850,00; Bolsa Socioeconômica Finatel 40% (20% não reembolsável + 20% reembolsável) = desconto R$ 1.140,00; parcela líquida R$ 1.710,00; renovação na SAE em 25 dias a partir de hoje. As capturas usam renda de R$ 2.900,00 (auxílio R$ 2.200,00 + bolsa IC R$ 700,00), saldo livre R$ 1.190,00 e tetos 50/30/20 (R$ 595,00 / R$ 357,00 / R$ 238,00).

## 5. Wireframe

Wireframe entregue (histórico, ainda com “Estudos”): `referencias/wireframe-recortes/wf-NN.png` · Tela final atual: `referencias/telas-finais/tela-NN.png`

| # | Tela (título no app) | Tipo | HTA | Classes / métodos | Navegação |
|---|---|---|---|---|---|
| 1 | Perfis Salvos | existente | — | — | Perfil salvo → Tela 2 |
| 2 | Autenticação (Inatel Acadêmico) | existente | — | Aluno.autenticar() | Curso → Tela 2b · Autenticar → Tela 3 |
| 2b | Escolha o seu curso | existente | — | Aluno.curso | Curso escolhido → Tela 2 |
| 3 | Avisos (início) | existente | — | — | Aba Menu → Tela 4 · Aba Financeiro → Tela 5 |
| 4 | Menu | alterada | 1.1 | Aluno acessa SuporteFinanceiro | Planejador Financeiro & Bolsa (NOVO) → Tela 5 |
| 5 | Suporte Financeiro · Resumo | nova | 1.2 | SuporteFinanceiro.abrirResumo(); Mensalidade.calcularParcelaLiquida(); Bolsa.verificarRenovacao() | Bolsa → 6 · Planejar orçamento do mês → 7 · Orçamento → 9 |
| 6 | Detalhes da Bolsa | nova | 1.2 | Bolsa: percentual, cotas, dataRenovacao, nivelRenovacao() | Voltar → 5 |
| 7 | Planejar Orçamento · Passo 1 (renda) | nova | 2.1 | OrcamentoMensal.informarRenda(); calcularSaldoLivre(Mensalidade) | Continuar → 8 |
| 8 | Planejar Orçamento · Passo 2 (tetos) | nova | 2.2 | OrcamentoMensal.sugerirTetos(); definirTetos(); CategoriaGasto.definirTeto() | Salvar orçamento → 9 |
| 9 | Suporte Financeiro · Orçamento | nova | 3.2 | OrcamentoMensal.calcularSaldoRestante(); CategoriaGasto.calcularComprometimento(); totalPorSubcategoria() | + Lançar gasto → 10 · Resumo → 5 |
| 10 | Lançar Gasto | nova | 3.1 | CategoriaGasto.registrarDespesa(); adicionarSubcategoria(); Despesa.salvarLocal() | Registrar ou Cancelar → 9 |

Mudanças do app em relação ao wireframe entregue:
- A terceira categoria passou de “Estudos” para **Outros gastos**, com subcategorias (Estudos / Material, Lazer, Investimento, Viagem / Transporte, ou uma criada pelo aluno).
- A barra de abas ganhou a aba **Financeiro**; Horários, Notas e Frequência ficam desativadas no protótipo.
- A Tela 3 mostra o aviso “Novo no app: Planejador Financeiro & Bolsa”.
- No computador, um menu lateral substitui as abas.
- O Menu tem “Voltar ao começo da demo”, que apaga os dados e volta à Tela 1.

**Estados extras implementados** (`referencias/estados/`):

| Estado | Tela | Imagem |
|---|---|---|
| Sincronizando com o Portal/SAE (skeleton) | 5 a 10 | `estado-05-sincronizando.png` |
| Renda insuficiente: alerta e Continuar bloqueado | 7 | `estado-07-renda-insuficiente.png` |
| Orçamento vazio com chamada para planejar | 9 | `estado-09-vazio.png` |
| Gasto removido com “Desfazer” | 9 | `estado-09-historico-desfazer.png` |
| Apagar meus dados com confirmação | 9 | `estado-09-apagar-dados.png` |
| Aviso antes de passar do teto, com confirmação | 10 | `estado-10-passar-do-teto.png` |
| Nova subcategoria em Outros gastos | 10 | `estado-10-nova-subcategoria.png` |

Capturas geradas por `npm run capturas` (`scripts/capturas.mjs`): 390×844 @2x, tema escuro, sem moldura de aparelho.
