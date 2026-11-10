# Conteúdo das 5 páginas do PDF

Rafael Correa Barbosa — GES 745 · S05 — Interação Homem-Máquina (Ergonomia e Usabilidade) · Prof. Raphael C. M. Pereira

## Regras da entrega (Moodle, tarefa Projeto Final)

- PDF de 5 páginas, nesta ordem: 1 Capa (nome, matrícula, justificativa pela persona, link, tela no celular) · 2 User Story · 3 Análise da Tarefa · 4 Fluxo de Informação (Diagrama de Classes) · 5 Wireframe.
- A avaliação é sobre a interface publicada (o link). Exigido: experiência completa de ponta a ponta; simulação de input, processamento e feedback (diferencial); qualidade de grid, cores, imagens, animações e interações.
- Só 1 tentativa de envio. Prazo ≈ 27/11/2026.

## 1. Capa

**Planejador Financeiro & Bolsa** — nova funcionalidade do App Inatel Acadêmico · Eixo Suporte Financeiro

**Justificativa pela persona:** Lucas Andrade, 20 anos, bolsista parcial no 4º período de Engenharia de Software, mora em república e diz: “Preciso saber quanto sobra no mês depois de pagar a parcela da faculdade e a república.” Hoje o App Inatel mostra notas e horários, mas não liga o desconto da bolsa ao custo de vida. O Planejador Financeiro & Bolsa traz a mensalidade líquida já calculada a partir dos dados da SAE e divide o saldo que sobra entre Moradia, Alimentação e Estudos, com os gastos guardados só no celular do aluno.

**Simulação de input, processamento e feedback:**
- **Input:** Renda por fonte com máscara de moeda, tetos por controle deslizante e teclado numérico próprio com categoria em 1 toque.
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
| Objetivos-chave | Ver o valor líquido exato da mensalidade já com a bolsa e distribuir o saldo restante entre moradia, alimentação e estudos sem estourar o mês. |
| Dores principais | Dificuldade em prever o impacto de créditos e reajustes na parcela líquida; falta de uma visão que una a mensalidade do Inatel aos gastos fixos de estudante. |
| O que nunca devemos fazer | Entregar uma tela vazia tipo “bloco de notas” que exija cálculos manuais da bolsa, ou expor gastos pessoais fora do armazenamento local do celular. |

> “Como Lucas Andrade, estudante bolsista que mora fora de casa, quero visualizar minha mensalidade líquida integrada a um planejador de gastos estudantis no App Inatel, para que eu consiga organizar meu custo de vida mensal com base no desconto da minha bolsa sem comprometer meu orçamento.”

- **Como [persona]:** Estudante bolsista (Finatel/Fundacred/FIES) que gerencia um orçamento mensal restrito.
- **Quero [intenção]:** Unir a consulta da parcela líquida da faculdade ao controle estruturado de gastos pessoais.
- **Para que [benefício]:** Ter previsibilidade financeira no semestre e evitar endividamento ou perda de prazos da bolsa.

**Critérios de aceite:**
1. A mensalidade líquida aparece já calculada (bruto − desconto da bolsa), sem digitação.
2. Com a renda informada, o saldo livre pós-mensalidade é calculado na hora; renda insuficiente bloqueia o avanço com explicação.
3. Os tetos de Moradia, Alimentação e Estudos sempre somam 100% e têm divisão sugerida (50/30/20).
4. Um gasto é registrado com valor + 1 toque na categoria e atualiza a barra e o saldo restante.
5. Os gastos ficam só no armazenamento local do celular e podem ser apagados pelo aluno.

## 3. Análise da Tarefa (HTA)

**0. Planejar orçamento mensal integrado à bolsa no App Inatel** — Plano 0: 1 > 2 > 3 (repetir 3 ao longo do mês)

- **1. Conferir bolsa e parcela** (Plano 1: 1.1 > 1.2)
  - 1.1 Acessar Suporte Financeiro no App Inatel
  - 1.2 Visualizar mensalidade líquida (Finatel / Fundacred / FIES)
- **2. Estruturar orçamento local** (Plano 2: 2.1 > 2.2)
  - 2.1 Informar renda / auxílio mensal (abatendo a parcela líquida)
  - 2.2 Definir tetos por categoria (Moradia, Alimentação, Estudos)
- **3. Lançar gasto e ver saldo** (Plano 3: 3.1 > 3.2)
  - 3.1 Registrar despesa rápida em categoria pré-definida
  - 3.2 Consultar barra de saldo livre e comprometimento

- **Plano 0 (1 > 2 > 3):** No início do mês, acessar o módulo para conferir a parcela líquida (1), definir a renda e os tetos (2) e, ao longo do mês, registrar despesas conferindo o saldo livre (3).
- **Iteração mensal (repetir 3):** Sempre que houver uma despesa relevante em Moradia, Alimentação ou Estudos, executar só o subobjetivo 3 para atualizar o saldo.

**Tabela 2 — Planos, entradas, feedbacks, problemas e recomendações**

| Objetivo | Plano | Input | Feedback | Problema | Recomendação | Telas |
|---|---|---|---|---|---|---|
| 1. Conferir bolsa e parcela (1.1, 1.2) | Abrir Suporte Financeiro (1.1) e ver o resumo da mensalidade líquida (1.2). | Dados do Portal Acadêmico/SAE: valor bruto, % da bolsa, cotas, prazo de renovação. | Tabela com bruto, desconto, parcela líquida e vencimento; selo “atualizado hoje”. | Dúvida sobre o que é reembolsável e perda do prazo de renovação. | Discriminar as cotas (Tela 6) e alertar a renovação com cor e contagem de dias. | Telas 4, 5 e 6 |
| 2. Estruturar orçamento local (2.1, 2.2) | Informar a renda (2.1) e distribuir tetos nas categorias (2.2). | Renda por fonte (auxílio, estágio, bolsa IC) e percentuais por categoria. | Saldo livre calculado na hora; tetos em R$ que somam 100%; aviso se a renda não cobre a parcela. | Abandono se exigir preenchimento extenso como planilha. | Categorias prontas, divisão sugerida 50/30/20 e controles que se reequilibram. | Telas 7 e 8 |
| 3. Lançar gasto e ver saldo (3.1, 3.2) | Registrar o valor em uma categoria (3.1) e consultar o comprometimento (3.2). | Valor no teclado numérico e 1 toque na categoria. | Barra da categoria animada (ok/atenção/estouro), saldo restante, toast com “Desfazer”. | Receio de privacidade e erro de digitação. | Guardar só no celular, avisar antes de estourar o teto e permitir desfazer. | Telas 9 e 10 |

**Critérios de usabilidade (NBR ISO 9241-11):**
- **Eficácia:** O aluno vê a mensalidade líquida correta e monta o orçamento sem erros de cálculo (regras testadas, valores em centavos).
- **Eficiência:** O desconto já vem preenchido; um gasto leva 3 toques (valor, categoria, registrar), sem digitação livre.
- **Satisfação:** Sensação de controle com barras e estados claros, e privacidade garantida pelo armazenamento local.

## 4. Fluxo de Informação — Diagrama de Classes

Membros com ★ foram acrescentados no protótipo final.

### Aluno  (`src/domain/Aluno.ts` no app_hm)
```
- nome: string
- matricula: string
- periodo: number
---
+ autenticar(matricula, senha): boolean
```
### SuporteFinanceiro  (`src/domain/SuporteFinanceiro.ts` no app_hm)
```
- telaAtiva: string
---
+ abrirResumo(): void
+ abrirOrcamento(): void
+ sincronizarPortal(): Mensalidade
```
### Mensalidade  (`src/domain/Mensalidade.ts` no app_hm)
```
- mesReferencia: string
- valorBruto: number
- dataVencimento: string
/ descontoAplicado: number
/ parcelaLiquida: number
---
+ calcularParcelaLiquida(): number
+ exibirResumo(): ResumoMensalidade
```
### Bolsa  (`src/domain/Bolsa.ts` no app_hm)
```
- tipo: string
- percentual: number
- cotaNaoReembolsavel: number
- cotaReembolsavel: number
- dataRenovacao: string
---
+ calcularDesconto(valorBruto): number
+ verificarRenovacao(hoje): boolean
+ diasParaRenovacao(hoje): number ★
```
### OrcamentoMensal  (`src/domain/OrcamentoMensal.ts` no app_hm)
```
- mesReferencia: string
- rendaMensal: number
/ saldoLivre: number
/ saldoRestante: number
---
+ informarRenda(valor: number): void
+ calcularSaldoLivre(m: Mensalidade): number
+ sugerirTetos(): void
+ calcularSaldoRestante(): number
+ removerDespesa(id: string): Despesa ★
+ salvarLocal(): boolean
```
### CategoriaGasto  (`src/domain/CategoriaGasto.ts` no app_hm)
```
- nome: string
- percentualTeto: number
/ valorTeto: number
/ totalGasto: number
---
+ definirTeto(percentual: number): void
+ registrarDespesa(valor: number): Despesa
+ calcularComprometimento(): number
+ excessoSeRegistrar(valor): number ★
```
### Despesa  (`src/domain/Despesa.ts` no app_hm)
```
- id: string ★
- valor: number
- data: string
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

## 5. Wireframe

Wireframe entregue: `referencias/wireframe-recortes/wf-NN.png` · Tela final: `referencias/telas-finais/tela-NN.png`

| # | Tela | Tipo | HTA | Classes / métodos | Navegação |
|---|---|---|---|---|---|
| 1 | Perfis Salvos | existente | — | — | Perfil salvo → Tela 2 |
| 2 | Autenticação | existente | — | Aluno.autenticar() | Autenticar → Tela 3 |
| 3 | Avisos (início) | existente | — | — | Aba Menu → Tela 4 |
| 4 | Menu | alterada | 1.1 | Aluno acessa SuporteFinanceiro | Planejador Financeiro & Bolsa (NOVO) → Tela 5 |
| 5 | Resumo da Mensalidade | nova | 1.2 | SuporteFinanceiro.abrirResumo(); Mensalidade.calcularParcelaLiquida(); Bolsa.verificarRenovacao() | Bolsa → 6 · Planejar orçamento → 7 · Aba Orçamento → 9 |
| 6 | Detalhes da Bolsa | nova | 1.2 | Bolsa: percentual, cotas, dataRenovacao | Voltar → 5 |
| 7 | Informar Renda | nova | 2.1 | OrcamentoMensal.informarRenda(); calcularSaldoLivre(Mensalidade) | Continuar → 8 |
| 8 | Definir Tetos | nova | 2.2 | OrcamentoMensal.sugerirTetos(); CategoriaGasto.definirTeto() | Salvar orçamento → 9 |
| 9 | Painel do Orçamento | nova | 3.2 | OrcamentoMensal.calcularSaldoRestante(); CategoriaGasto.calcularComprometimento() | + Lançar gasto → 10 · Aba Resumo → 5 |
| 10 | Lançar Gasto | nova | 3.1 | CategoriaGasto.registrarDespesa(); Despesa.salvarLocal() | Registrar ou Cancelar → 9 |

**Estados extras implementados:**
- Sincronizando com o Portal/SAE (skeleton) nas telas 5–10
- Renda insuficiente: alerta e Continuar bloqueado (Tela 7)
- Orçamento vazio com chamada para planejar (Tela 9)
- Aviso antes de passar do teto, com confirmação (Tela 10)
- Histórico de gastos com remover + Desfazer (Tela 9)
- Apagar meus dados com confirmação (Tela 9)
