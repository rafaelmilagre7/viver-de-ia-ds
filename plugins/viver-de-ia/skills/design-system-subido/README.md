# Design System SUBIDO

A UI do **My Dashboard** (versão *Flat SUBIDO · Revenue++*) transformada em design system para todas as
soluções da Viver de IA / SUBIDO AI: mesma moldura, mesmos componentes, mesma lógica de tela.

- Fundamentos de marca: [viver-de-ia-ds.vercel.app](https://viver-de-ia-ds.vercel.app) (tokens `--via-*`).
- Lógica de produto: Revenue-Centric Design (heliocosta-dev/revenue-centric-design).
- Referência viva: `MindOpsTeam/remix-my-dashboard`.

## Usar como skill do Claude Code

```bash
git clone <este-repo> ~/.claude/skills/design-system-subido
```

Depois peça, por exemplo: "aplica o design system SUBIDO na solução <repo>". O fluxo está no
[`SKILL.md`](SKILL.md): preparar → varrer → relatar → aplicar → medir de novo → entregar.

## Usar à mão

1. Leia `references/01` a `06` (o que é o DS).
2. Copie o `kit/` para o projeto seguindo `references/08-aplicacao.md`.
3. Rode `scripts/auditar-ds.js` no console de cada tela e corrija até zerar os desvios graves.

## Estrutura

```
SKILL.md
references/   01-fundamentos · 02-moldura · 03-componentes · 04-telas · 05-revenue-centric
              06-copy · 07-auditoria · 08-aplicacao
kit/          css/ (tokens, base v4, tailwind3 + preset, revenue, subido, auth)
              ui/ (shadcn no DS) · brand/ (logo SUBIDO, logos de marcas) · layout/ (AppShell, PageTitle)
              patterns/ (FirstSteps, Estados, Metricas, Integracoes, Configuracoes, Celebration)
              auth/ (AuthShell, LoginStage) · public/brand/ (SVG/PNG de marcas)
scripts/      auditar-ds.js
exemplos/     my-dashboard/ · flow-crm/ · telas/ (capturas de referência)
```

Versão 1.0 · 28/10/2026.
