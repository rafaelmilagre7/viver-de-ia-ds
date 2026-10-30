# 05 · Revenue-Centric Design aplicado

O DS SUBIDO não é só visual: ele carrega a skill **Revenue-Centric Design**
(github.com/heliocosta-dev/revenue-centric-design, princípios de Richard · @richardrx). Design que serve o
usuário **e** o negócio: ativar, reter, expandir. Abaixo, cada princípio vira regra de tela.

> Uso vetado pela skill: produtos de aposta, cassino ou jogos de azar.

| # | Princípio (mecanismo) | Regra no DS | Onde verificar |
|---|---|---|---|
| 1 | **Neutralidade é omissão** — interface que não direciona perde conversão | Toda tela tem UMA ação dominante (navy); o resto recua. | auditoria `acao.uma-dominante` |
| 2 | **Von Restorff** (o diferente é lembrado) | Destaque só em 1 coisa: a ação, a opção recomendada ("Comece por aqui"), o KPI principal. Se tudo destaca, nada destaca. | olho + `acao.uma-dominante` |
| 3 | **"Noise is a cognitive tax"** | Menos tinta: card plano, hairline, sem sombra, sem ícone decorativo no KPI, sem selo que não muda decisão. | `superficie.*` |
| 4 | **Padrão F** — o olho começa no topo-esquerda | O 1º KPI é o North Star (maior número). Título no topo-esquerda. | `revenue.*`, olho |
| 5 | **Never ship a blank dashboard** | Sem dado: progresso + próximo passo. Nunca KPI zerado, gráfico vazio, filtro sem efeito. | `revenue.painel-em-branco` |
| 6 | **Dê significado ao número** ("500 tickets" → "15% acima da meta") | KPI com comparação contra período nomeado; card de insight que diz o que fazer. | olho |
| 7 | **Zeigarnik / goal gradient** — tarefa incompleta puxa | Checklist "2 de 3 · falta 1 passo", barra de progresso, banner "Você já começou". | olho |
| 8 | **Endowed progress** | O 1º passo já vem feito (conta criada); progresso do onboarding começa em ~20%. | olho |
| 9 | **Default é a decisão que você tomou** | Pré-selecione a única fonte/painel; exemplo de consulta que roda; recomendação marcada. | olho |
| 10 | **Valor antes, pedido depois** — TTV curto | Onboarding vai direto ao primeiro momento de valor; dados da empresa e burocracia por último/opcional. | ordem dos passos |
| 11 | **Aha moment / ativação** | Ordem do checklist = caminho mais curto até o produto funcionar (no CRM: canal + IA respondendo). | ordem dos passos |
| 12 | **Expectation debt** — prometer só o que se prova | Dados de exemplo sempre marcados; mensagens não dizem que algo funciona quando não funciona. | `SampleFlag` |
| 13 | **Retenção é construída** | A home com dado diz o que mudou e o que fazer (razão para voltar), não só repete números. | olho |
| 14 | **Feature discipline / Swiss Knife** | Recurso secundário (exportar, verificar duplicatas, SQL) não ganha botão navy nem lugar de destaque. | olho |
| 15 | **Erro com saída** | Toda falha diz o próximo passo e linka para ele (Configurar a IA →). | olho |

## Checklist por tela (rode mentalmente antes de entregar)

1. Qual é a única ação desta tela? Ela é o único navy?
2. A tela funciona **vazia**? (sem dado / sem pré-requisito / primeiro acesso)
3. Tem algum número zero em destaque? Algum aviso repetido? Algum bloco que leva ao mesmo lugar que outro?
4. O topo-esquerda tem a informação mais importante?
5. Cada número tem significado (comparação, meta, contexto)?
6. O texto diz o resultado para a pessoa, não a função do sistema?
7. Os defaults estão escolhidos? A recomendação está marcada (uma só)?
8. Provedores aparecem com logo?
9. Erros e bloqueios dizem o que fazer e linkam?
10. Tem algo que dá para tirar sem perder nada? Tire.
