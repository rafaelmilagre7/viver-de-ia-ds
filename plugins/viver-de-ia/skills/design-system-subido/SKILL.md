---
name: design-system-subido
description: >-
  Aplica o Design System SUBIDO (a UI do My Dashboard na versão "Flat SUBIDO · Revenue++", sobre os tokens
  do DS Viver de IA) em qualquer solução da Viver de IA / SUBIDO AI — React + Tailwind + shadcn (Lovable,
  Vite, TanStack, Next). Faz varredura medida contra a referência, entrega o relatório de desvios, aplica
  moldura → componentes → telas (login, onboarding, home, listas, configurações, integrações, ajuda) com o
  kit pronto e mede de novo até zerar os desvios graves. Use quando pedirem "aplicar o DS", "deixar igual
  ao My Dashboard", "padronizar a UI da solução X", "colocar no design system SUBIDO", "auditar o design
  de [app]", "por que essa tela não parece com as outras", ou mandarem um repositório pedindo para ficar
  no mesmo padrão visual e de experiência das outras soluções.
---

# Design System SUBIDO

Objetivo: **todas as soluções com a mesma UI e a mesma experiência** — mesmos componentes, mesma moldura,
mesma lógica de tela — mudando só o que cada produto tem de próprio (recursos, textos, dados).

Referência viva: o **My Dashboard** (`MindOpsTeam/remix-my-dashboard`, variação Flat SUBIDO · Revenue++).
Fundamentos de marca: <https://viver-de-ia-ds.vercel.app>. Lógica de produto: skill
**revenue-centric-design** (heliocosta-dev).

## Conteúdo

| Pasta | O quê |
|---|---|
| `references/01-fundamentos.md` | marca, cor, tipografia, espaço, raio, sombra, movimento, ícones e logos, tema escuro |
| `references/02-moldura.md` | sidebar, canvas, container, sem barra de topo, cabeçalho de página, banner, celular |
| `references/03-componentes.md` | botões, campos, cards, KPI, selos, abas, tabela, listas, diálogos, estados, integrações |
| `references/04-telas.md` | acesso, onboarding, home (vazia/com dado), listas, detalhe, formulários, configurações, integrações, usuários, ajuda, telas técnicas, TV, chat |
| `references/05-revenue-centric.md` | os princípios da skill viram regra de tela + checklist por tela |
| `references/06-copy.md` | voz e texto de interface |
| `references/07-auditoria.md` | como medir, o que o script mede, calibração, relatório, critério de pronto |
| `references/08-aplicacao.md` | passo a passo (ambiente local, Tailwind v3/v4, armadilhas conhecidas) |
| `kit/` | CSS (tokens, base v4, adaptador v3 + preset, revenue, subido, auth), componentes shadcn no DS, marca, moldura, padrões, telas de acesso, logos |
| `scripts/auditar-ds.js` | auditoria que roda na página e compara com a referência |
| `exemplos/` | implementações reais (My Dashboard e Flow CRM) e capturas das telas de referência |

## Fluxo (siga na ordem — não pule a varredura)

1. **Preparar** — clonar, rodar local com backend local e conta de teste (08-aplicacao §0). Nada de
   commit/push nem banco de produção sem pedido explícito.
2. **Varrer** — `scripts/auditar-ds.js` em todas as rotas, sem dado e com dado, + checklist manual
   (07-auditoria §3). Ler as capturas em `exemplos/telas/` para comparar.
3. **Relatar** — tabela de desvios por tela, classificados em moldura / componente / montagem. Mostrar ao
   usuário antes de aplicar.
4. **Aplicar** nesta ordem:
   1. moldura (kit de CSS, AppShell, sem barra de topo, canvas, container) — 02-moldura;
   2. componentes (kit/ui, kit/patterns, logos de marca) — 03-componentes;
   3. montagem de cada tela (04-telas + checklist 05-revenue-centric), preservando a lógica.
5. **Medir de novo** — auditoria com 0 graves em todas as rotas e estados; escuro; celular; deslogado;
   testes do projeto.
6. **Entregar** — antes × depois, o que mudou, o que ficou de fora e por quê.

## Regras que não se negociam

- Uma ação navy por tela. Secundárias em texto/outline.
- Sem dado não existe KPI zerado: existe progresso + próximo passo.
- Toda tela interna: eyebrow (grupo da sidebar) + título 30px/500 + descrição de resultado. Sem ícone no título.
- Canvas `#F7F8FA`, card branco plano, hairline navy translúcido. Nada de borda cinza opaca.
- Provedor/ferramenta sempre com o logo oficial. Logo novo só com autorização do usuário para baixar.
- Sem semáforo, sem dourado, sem emoji decorativo, sem texto < 13px (exceto caps/selo).
- Telas de acesso na moldura `AuthShell` com o palco do produto.
- Medir antes e depois. Teste passando não prova DS aplicado.
