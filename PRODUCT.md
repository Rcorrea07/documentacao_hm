# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primário: Prof. Raphael C. M. Pereira, avaliando o Projeto Final da disciplina S05 — Interação Homem-Máquina (Ergonomia e Usabilidade) do Inatel. Ele lê a documentação para entender e avaliar o projeto de Rafael Correa Barbosa, e segue dela para o protótipo publicado.

## Product Purpose

Site de documentação do projeto **Planejador Financeiro & Bolsa**, uma nova funcionalidade proposta para o App Inatel Acadêmico (eixo Suporte Financeiro). O site apresenta as 5 seções exigidas no Moodle, na mesma ordem:

1. Capa: nome, matrícula, justificativa pela persona, link do protótipo, tela no celular.
2. User Story: contextualização, persona, história e critérios de aceite.
3. Análise da Tarefa (HTA): árvore de objetivos, planos e Tabela 2.
4. Fluxo de Informação: Diagrama de Classes.
5. Wireframe: as 10 telas, com HTA, classes e navegação de cada uma.

Sucesso: o professor encontra cada seção exigida, entende a ligação entre persona, tarefa, classes e telas, e chega ao protótipo sem esforço.

## Positioning

O conteúdo prova uma cadeia rastreável: a dor da persona (Lucas) vira critérios de aceite, os critérios viram subobjetivos da HTA, os subobjetivos viram classes e métodos, e as classes viram telas numeradas. Cada tela no wireframe aponta o item da HTA e o método que a sustenta. Essa rastreabilidade é o que a documentação precisa deixar visível.

## Operating Context

- Entrega no Moodle (tarefa Projeto Final): PDF de 5 páginas, 1 tentativa de envio, prazo ≈ 27/11/2026.
- A nota é dada sobre a interface publicada (o link do protótipo). Critérios: experiência completa de ponta a ponta; simulação de input, processamento e feedback (diferencial); qualidade de grid, cores, imagens, animações e interações.
- O protótipo vive em outro repo (`app_hm`), publicado em https://apphomemmaquina.vercel.app. As classes do diagrama apontam para `src/domain/*.ts` nesse repo.

## Capabilities and Constraints

- Idioma: só pt-BR.
- Deploy: Vercel, com link público.
- Fonte de verdade: o protótipo publicado. O texto segue `referencias/conteudo-das-paginas.md`, atualizado para bater com o app. O PDF em `entrega/` é a entrega anterior (ainda com "Estudos"). Sem novas afirmações, números ou claims.
- Stack existente: Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript.
- Termos fixos: Planejador Financeiro & Bolsa, mensalidade líquida, parcela líquida, saldo livre, saldo restante, teto, comprometimento, SAE, Finatel, Fundacred, FIES, Moradia / Alimentação / Outros gastos (com subcategorias). Ver `GLOSSARY.md`.

## Brand Commitments

- Autor: Rafael Correa Barbosa, matrícula GES 745. Professor: Raphael C. M. Pereira. Disciplina: S05 — Interação Homem-Máquina (Ergonomia e Usabilidade), Inatel.
- O protótipo é uma funcionalidade dentro do App Inatel Acadêmico; as telas existentes (1 a 3) seguem o app real.

## Evidence on Hand

- `entrega/Projeto_Final_Rafael_Correa_Barbosa_GES745.pdf`: entrega anterior em PDF (desatualizada em relação ao app).
- `referencias/conteudo-das-paginas.md`: texto das 5 seções, tabelas, classes e relações, atualizado para o app publicado.
- `referencias/telas-finais/tela-01.png` a `tela-10.png` e `tela-02b.png`: capturas do app publicado (tema escuro, 780×1688, geradas por `npm run capturas`).
- `referencias/estados/`: 7 estados extras capturados.
- `referencias/wireframe-recortes/wf-01.png` a `wf-10.png`: wireframe entregue (histórico).
- `referencias/capturas-app-real/`: capturas do App Inatel real (perfis, login, avisos, horários, notas, frequência, menu).
- `referencias/entregas-anteriores/`: Diagrama de Classes, User Story e HTA, Wireframe em PDF.
- Ausências: sem testes com usuários, métricas, depoimentos ou dados reais de alunos. Não inventar.

## Product Principles

1. O protótipo publicado é a fonte de verdade: o site reorganiza a leitura, não inventa conteúdo.
2. Rastreabilidade visível: persona, critério, HTA, classe e tela sempre se ligam por número e nome.
3. Avaliação primeiro: as 5 seções exigidas e o link do protótipo ficam fáceis de achar.
4. Persona fictícia: nenhum dado de aluno real além do autor e do professor.

## Accessibility & Inclusion

Sem requisito específico definido. Imagens de telas e diagramas precisam de texto alternativo, e as tabelas devem continuar legíveis no celular.
