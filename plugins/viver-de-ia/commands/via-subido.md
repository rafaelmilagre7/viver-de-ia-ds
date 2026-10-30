---
description: Aplica o Design System SUBIDO (UI do My Dashboard · Flat SUBIDO · Revenue++) numa solução da Viver de IA / SUBIDO AI · varre, relata, aplica e mede de novo.
---

# /via-subido · Design System SUBIDO nas soluções

Use quando a peça é **produto** (app de uma Solução VIA / SUBIDO AI em React + Tailwind + shadcn — Lovable,
Vite, TanStack, Next) e precisa ficar com a mesma moldura, os mesmos componentes e a mesma lógica de tela
das outras soluções. Para artefato editorial da marca (email, post, landing, deck) use `/via`.

## Entrada

`$ARGUMENTS` traz o repositório, a pasta ou a tela a padronizar (ou o pedido de auditoria).

## O que fazer

1. Carregue a skill `design-system-subido` (`skills/design-system-subido/SKILL.md`) e siga o fluxo dela:
   preparar → varrer → relatar → aplicar → medir de novo → entregar.
2. Fundamentos (tokens `--via-*`, paleta, tipografia) vêm da skill `viver-de-ia-design`; o SUBIDO só
   acrescenta a camada de produto (moldura, componentes, telas, Revenue-Centric).
3. Use o `kit/` da skill como fonte do código (seguindo `references/08-aplicacao.md`) e meça cada tela com
   `scripts/auditar-ds.js` até zerar os desvios graves.
4. Referência viva: `MindOpsTeam/remix-my-dashboard` · capturas em `exemplos/telas/`.
