---
name: Planejador Financeiro & Bolsa · Documentação
description: Página única, só em tema escuro, com o cartão azul profundo e a moldura de iPhone do CinematicHero.
colors:
  background: "oklch(0.13 0.018 262)"
  foreground: "oklch(0.97 0.006 262)"
  muted-foreground: "oklch(0.76 0.025 262)"
  card: "oklch(0.18 0.03 262)"
  border: "oklch(0.85 0.03 262 / 12%)"
  ring: "oklch(0.72 0.14 255)"
  deep: "#162c6d"
  deep-2: "#0a101d"
  app: "#0166c0"
  novo: "oklch(0.82 0.13 230)"
  tinta: "oklch(0.86 0.04 255)"
typography:
  hero:
    fontFamily: "Geist, sans-serif"
    fontSize: "6rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  section-title:
    fontFamily: "Geist, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  subtitle:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  code:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  chip: "999px"
  card: "24px"
  panel: "28px"
  feature: "40px"
spacing:
  gutter: "16px"
  gutter-md: "32px"
  section: "112px"
components:
  depth-card:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.feature}"
    padding: "56px"
  depth-panel:
    backgroundColor: "{colors.deep-2}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.panel}"
    padding: "56px"
  chip-tela:
    backgroundColor: "{colors.app}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.chip}"
    padding: "2px 10px"
  nav-link-active:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.chip}"
    padding: "6px 12px"
---

# Design

## Overview

A identidade vem do componente `CinematicHero`, escolhido pelo autor. É um cartão físico azul profundo sobre um fundo quase preto, com film grain, uma grade com máscara radial e um iPhone com aro, botões e ilha dinâmica. O hero abre com scroll fixo de 3000px: o cartão sobe, o iPhone entra em 3D e a chamada final aparece. As seções seguem a mesma linguagem com scrollytelling. O celular fica fixo à direita e troca de tela conforme o passo ativo à esquerda (critérios de aceite, operações da HTA, tarefa de ponta a ponta). Os títulos entram com o desfoque do hero, os textos longos acendem palavra por palavra, e a árvore da HTA e o diagrama se desenham. A página fecha com o protótipo ao vivo.

O site é só em tema escuro, coerente com o cartão e com as capturas do app, que também estão em tema escuro.

## Colors

- Os neutros puxam para o azul do cartão (matiz 262), nunca para o cinza puro.
- `deep` → `deep-2` é o gradiente do cartão. `depth-panel` é a versão mais calma dele, para blocos de leitura.
- `app` (#0166C0) é o azul do App Inatel. Aparece nos chips de tela, no fundo da seleção e na faixa de status da moldura, que continua o cabeçalho do app.
- `novo` marca o que é novo: membros ★ do diagrama, códigos da HTA e o selo "Alterada".
- `tinta` é a cor das linhas do diagrama e dos conectores da HTA.

## Typography

- Fonte única: Geist, com Geist Mono só para código (assinaturas de classe, códigos da HTA, caminhos de arquivo).
- Os títulos das seções usam `text-3d-matte`. O título da Capa e os números dos critérios usam o prateado do componente.
- `text-balance` nos títulos e `text-pretty` nos parágrafos. A medida do corpo fica em até ~70ch.
- Números tabulares no corpo inteiro (`font-variant-numeric: tabular-nums`).

## Layout

- O hero ocupa a tela inteira. Depois vem o índice fixo no topo, com âncoras das 5 seções e o link do protótipo. No celular, o índice vira uma faixa com rolagem lateral, e o link ativo fica sempre visível.
- O conteúdo tem `max-w-7xl`, com margem lateral de 16px no celular e 32px a partir de md.
- As seções têm 80px de padding vertical no celular e 112px a partir de md, separadas por uma linha de borda.
- Tabelas largas (Tabela 2) e o diagrama (largura mínima de 1000px) rolam dentro do próprio contêiner. A página nunca rola na horizontal.

## Elevation & Depth

- A profundidade vem de sombras com deslocamento e desfoque, mais brilho interno em cima e sombra interna embaixo (`premium-depth-card`, `depth-panel`, `iphone-bezel`).
- Os badges flutuantes usam vidro sobre base escura, porque passam por cima da captura do app.
- Os cartões de tela no Wireframe usam só borda, sem sombra.

## Shapes

- Cartão de destaque: 40px (28px no celular). Painéis: 28px. Cartões de tela: 24px. Chips e links do índice: pílula.
- O raio da moldura de iPhone é proporcional à largura (16% do aro, 14% da tela).

## Components

- `CinematicHero` (`src/components/ui/cinematic-landing-hero.tsx`): scroll fixo com GSAP ScrollTrigger e inclinação pelo mouse. Com `prefers-reduced-motion`, o cartão aparece parado e os botões passam para dentro dele.
- `CelularRolante` (`src/components/motion/celular-rolante.tsx`): o celular fica fixo e troca de tela pelo passo ativo, com a tela antiga desfocando. O wireframe entregue aparece como papel atrás. Abaixo de lg, cada passo traz a própria tela. O tamanho segue a altura da janela.
- `TituloCinematico`, `TextoRevelado`, `Revelar` (`src/components/motion/revelar.tsx`) e `ArvoreAnimada`, `DiagramaAnimado`, `GaleriaHorizontal` (`src/components/motion/animacoes-secao.tsx`). Todos respeitam `prefers-reduced-motion`.
- `IPhoneFrame` (`src/components/ui/iphone-frame.tsx`): moldura com uma faixa de status de 47pt na cor do app, para a ilha dinâmica não cobrir o cabeçalho.
- `ChipTela`: link para `#tela-N`. O cartão de destino pisca um anel de foco ao chegar (`.alvo-tela:target`).
- `DiagramaClasses`: SVG feito à mão, com geometria fixa. Losango vazio = agregação, losango cheio = composição, traço com seta = dependência.

## Do's and Don'ts

- Faça: o conteúdo do projeto (texto do PDF, dados do app, telas, classes) vem de `src/content/documentacao.ts`, que espelha `referencias/conteudo-das-paginas.md`. Microtextos de interface podem ficar no componente.
- Faça: mostre telas do app só dentro de `IPhoneFrame`, com capturas de `npm run capturas`. A exceção é o iframe ao vivo da Capa.
- Faça: use `CelularRolante` sempre que um conteúdo aponta para telas; cada passo precisa de uma tela que o prove.
- Não faça: inventar uma animação nova por seção. Use as do hero: `TituloCinematico`, `TextoRevelado`, `Revelar`, `CelularRolante`.
- Não faça: usar o prateado em gradiente fora de títulos de destaque.
- Não faça: criar tema claro sem refazer o cartão e as capturas.
