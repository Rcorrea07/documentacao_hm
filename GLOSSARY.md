# Planejador Financeiro & Bolsa

Documentação da funcionalidade Planejador Financeiro & Bolsa, proposta para o App Inatel Acadêmico (eixo Suporte Financeiro). O app publicado é a fonte de verdade dos termos.

## Language

### Mensalidade e bolsa

**Mensalidade líquida**:
Valor da mensalidade do mês já com o desconto da bolsa aplicado (bruto − desconto).
_Avoid_: mensalidade com desconto, valor a pagar

**Parcela líquida**:
O mesmo valor da mensalidade líquida, visto como a parcela que o aluno paga no mês. Os dois termos aparecem no app; não são conceitos distintos.

**Bolsa**:
Benefício que reduz a mensalidade (Finatel, Fundacred, FIES, Beneficente ou Mérito), com percentual, cotas e data de renovação.
_Avoid_: desconto (desconto é o valor que a bolsa gera)

**Cota não reembolsável / cota reembolsável**:
As duas partes do percentual da bolsa: uma que o aluno não devolve e uma que devolve depois.

### Orçamento

**Renda mensal**:
Soma das fontes de renda do aluno no mês (auxílio familiar, estágio, bolsa IC).

**Saldo livre**:
O que sobra da renda mensal depois da parcela líquida. É o valor dividido entre as categorias.

**Saldo restante**:
Saldo livre menos o total das despesas registradas no mês.

**Categoria**:
Uma das três partes fixas do saldo livre: Moradia, Alimentação e Outros gastos.
_Avoid_: Estudos (antiga terceira categoria; hoje é uma subcategoria de Outros gastos)

**Subcategoria**:
Rótulo opcional dentro de Outros gastos (Estudos / Material, Lazer, Investimento, Viagem / Transporte, ou uma criada pelo aluno).

**Teto**:
Parte do saldo livre reservada a uma categoria, em percentual e em reais. Os três tetos somam 100%.
_Avoid_: limite, meta

**Divisão sugerida**:
A divisão padrão dos tetos: Moradia 50%, Alimentação 30%, Outros gastos 20%.

**Despesa**:
Um gasto registrado com valor, data e categoria, guardado só no celular do aluno.
_Avoid_: lançamento, transação

**Comprometimento**:
Quanto do teto de uma categoria (ou do saldo livre) já foi gasto, em percentual.

**Estado da categoria**:
Situação do comprometimento: ok, atenção ou estouro.

### Documentação

**Tela N**:
Uma das telas numeradas do wireframe (1 a 10). A tela "Escolha o seu curso" é a **Tela 2b**, sub-tela da Autenticação.

**Estado extra**:
Variação de uma tela além do caminho principal (sincronizando, renda insuficiente, orçamento vazio, aviso de teto, Desfazer, apagar dados, nova subcategoria).
