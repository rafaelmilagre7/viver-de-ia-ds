# 07 · Auditoria (varredura antes e depois)

Aplicar o DS sem medir foi o erro da primeira rodada no Flow CRM: padrões aplicados um a um, moldura
esquecida, uma regra de CSS que não pegou e ninguém viu. **Toda aplicação começa e termina medindo.**

## 1. O script

`scripts/auditar-ds.js` roda dentro da página aberta e devolve `{ rota, medidas, desvios[], total, graves }`.

Como rodar:
- **Agente com navegador** (javascript_tool / page.evaluate): sirva o arquivo em `public/__auditar.js`
  do app local e rode `eval(await fetch('/__auditar.js').then(r => r.text()))`. Apague o arquivo no fim.
- **Console do navegador**: cole o conteúdo do arquivo.
- **Várias rotas**: troque de rota com `history.pushState` + `popstate` (SPAs) ou navegue e rode de novo;
  espere 2–4s por rota para os dados carregarem.

Rode **cada rota em dois estados**: sem dado (conta nova/vazia) e com dado (conta com exemplo).

## 2. O que ele mede

| Regra | Grave | Referência |
|---|---|---|
| `moldura.canvas` | sim | fundo `rgb(247,248,250)` |
| `moldura.barra-topo` | sim | sem header horizontal acima do conteúdo |
| `moldura.respiro` | sim | padding do container ≥ 32px (ref. 40) |
| `moldura.largura-max` | não | ≤ 1280px (ref. 1152) |
| `cabecalho.h1` / `-tamanho` / `-peso` / `-cor` | sim/não | 1 h1, 30–36px, 500, navy |
| `cabecalho.eyebrow` | sim* | rótulo em caps acima do h1 (*home com hero é exceção) |
| `cabecalho.icone-no-titulo` | sim | sem svg ao lado do h1 |
| `tipo.familia` | sim | Geist |
| `tipo.escala` | não | ≤ 7 tamanhos na tela |
| `tipo.minimo` | não | ≥ 13px no conteúdo (11px só caps/selo/chip) |
| `superficie.borda` | sim | nada de cinza opaco (#D1D1D1, #D0D5DD); navy translúcido |
| `superficie.respiro-card` | não | card ≥ 20px de padding |
| `superficie.sombra` | não | card sem sombra |
| `acao.uma-dominante` | sim | ≤ 1 botão navy visível |
| `acao.botao-medidas` / `-pill` | não | 13px, 32–44px de altura, raio 999 |
| `nav.altura-item` | não | item de menu ≥ 36px (ref. 40) |
| `nav.sidebar-clara` | sim | sidebar branca |
| `revenue.painel-em-branco` | sim | ≥ 2 números zerados em destaque |
| `revenue.aviso-duplicado` | sim | ≥ 2 avisos de "sem dados" |

Calibração (28/10/2026): no My Dashboard, as telas redesenhadas na Revenue++ — Configurações, Ajuda,
Consulta SQL, Usuários — dão **0 desvios**. A home acusa só `cabecalho.eyebrow` (exceção do hero).

> Dívida do próprio My Dashboard (a corrigir lá também): Alertas, Modelos e Instalação ainda usam
> cabeçalho h2 de 24px e container de 16px; Dashboards, Fontes e Templates não têm eyebrow; a barra de
> progresso do painel do onboarding usa verde (`--via-success`) — pelo DS deveria ser branco/azul SUBIDO
> claro sobre o navy. Ao aplicar em outra solução, siga a regra, não a dívida.

## 3. O que o script NÃO pega (checagem manual obrigatória)

Passe a lista de 05-revenue-centric.md em cada tela e confira:
- logos de marca (provedor com ícone genérico);
- ordem dos passos do onboarding/checklist (caminho até o aha);
- texto (resultado vs. função, botão verbo + objeto, erro com saída);
- estados: vazio, carregando, erro, sem permissão, dados de exemplo;
- tema escuro (alterne `data-theme` e olhe sidebar, cards, campos);
- celular (375px): drawer, grids em 1 coluna, nada rolando de lado;
- telas de acesso (deslogado): login, cadastro, senha, aprovação.

## 4. Relatório de desvios

Antes de aplicar, entregue ao usuário uma tabela por tela:

| Tela | Estado | Graves | Desvios | Tipo |
|---|---|---|---|---|
| /dashboard | vazio | 4 | barra-topo, borda, painel-em-branco, uma-dominante | moldura · revenue |

Classifique cada desvio em **moldura** (corrige tudo de uma vez: tokens, shell, base CSS),
**componente** (corrige onde o componente aparece: botão, card, campo, selo) ou **montagem** (caso a
caso: home vazia, ordem do checklist, ação dominante). Aplique nessa ordem.

## 5. Pronto quando

- Auditoria com **0 graves** em todas as rotas, nos dois estados;
- não graves explicados (exceção documentada) ou corrigidos;
- checklist manual passado;
- testes do projeto passando (atualizar os que testavam o visual antigo, sem afrouxar regra de negócio).
