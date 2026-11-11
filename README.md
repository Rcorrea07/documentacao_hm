# Documentação · Planejador Financeiro & Bolsa

Site de página única com a documentação do Projeto Final de S05 (Interação Homem-Máquina, Inatel): Capa, User Story, Análise da Tarefa, Fluxo de Informação (Diagrama de Classes) e Wireframe.

O protótipo fica em outro repo (`app_hm`), publicado em https://apphomemmaquina.vercel.app. Ele é a fonte de verdade deste conteúdo.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run lint
```

## Atualizar as telas

As capturas em `referencias/telas-finais/` e `referencias/estados/` vêm do app publicado:

```bash
npx playwright install chromium   # só na primeira vez
npm run capturas                  # usa https://apphomemmaquina.vercel.app
BASE_URL=http://localhost:3123 npm run capturas   # contra um build local do app_hm
```

## Onde fica o quê

- `src/content/documentacao.ts`: todo o texto e os dados do site. Espelha `referencias/conteudo-das-paginas.md`.
- `src/components/ui/cinematic-landing-hero.tsx`: hero com GSAP. `iphone-frame.tsx` é a moldura de celular.
- `src/components/doc/`: as 5 seções, o índice e o diagrama em SVG.
- `PRODUCT.md`, `DESIGN.md` e `GLOSSARY.md`: produto, identidade visual e vocabulário.
- `entrega/`: o PDF entregue antes (ainda com "Estudos" como terceira categoria).
