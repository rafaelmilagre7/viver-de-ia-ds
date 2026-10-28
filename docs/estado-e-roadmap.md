# Estado do DS e roadmap — 28/out/2026

Levantamento completo feito na retomada do projeto (último commit antes dela: 15/ago).
Tudo abaixo foi medido no repo ou no site, não estimado.

## Onde o DS está

| | |
|---|---|
| Histórico | 198 commits · 18/mai → 15/ago · v0.6.1 · plugin `viver-de-ia` 1.4.1 |
| Site | 166 rotas (109 cobertas pelos testes de rota) · 46 páginas de API |
| Library | 46 componentes + ThemeProvider · motor de mola próprio · 519 testes unitários |
| Tokens | 195 `--via-*` em `src/styles/tokens.css` |
| Emails | 14 templates react-email de produção |
| Distribuição | plugin Claude Code · kit ZIP (Claude.ai/Lovable/Cursor/ChatGPT) · system-prompt · llms.txt · guia PDF · manual |
| Tamanho | 169 folhas CSS (~79 mil linhas) · ~55 mil linhas TS/TSX |

### Saúde verificada (28/out)

| Checagem | Resultado |
|---|---|
| lint · lint:tokens · lint:sync · lint:glass | verde · 0 warnings |
| build · build:lib · kit | verde |
| test:unit | 519/519 |
| a11y (axe, WCAG 2.1 AA, todas as rotas) | 109/109 |
| contraste (axe, claro + escuro, fora do CI) | 211/218 rota×tema limpas (96,8%) — ver P1 |
| visual (Playwright, no Mac do Rafael, após o merge) | 218/218 — os consertos da retomada não mudaram pixel |
| a11y + unit + build + kit repetidos no Mac | 109/109 · 519/519 · verde · ZIP idêntico byte a byte |

### Site no ar

`viver-de-ia-ds.vercel.app` republicado em 28/out com o `main` atual (antes estava no estado
de ~6/ago, 83 dias sem deploy, sem o email 14). Time `viver-de-ia` na Vercel.
Deploy é manual (`vercel --prod` a partir do Mac, projeto já linkado em `.vercel/`).

### Ferramentas do Rafael (Mac)

- Plugin `viver-de-ia` instalado estava no **1.2.0** (25/jul) — os `/via-*` rodavam sem a lei
  pós-auditoria (1.3.0) nem a física de gesto (1.4.0). Atualizado pro 1.4.1 em 28/out.
- A skill local `~/.claude/skills/viver-de-ia-design/` é uma **segunda cópia** da mesma skill
  (carrega junto com a do plugin). Estava sem o email 14 e com o vidro na ordem velha;
  ressincronizada em 28/out. Enquanto existirem as duas, toda mudança na skill precisa ser
  copiada pra lá (ou a cópia local é aposentada e fica só o plugin).

## Consertado na retomada

1. **Vidro sumia no build minificado** — 595 regras escreviam `backdrop-filter` antes do
   `-webkit-backdrop-filter`; o lightningcss (Vite 8 / Next.js) apaga o padrão e Chrome/Firefox
   ficam sem blur. No `style.css` da lib só 7 de 61 regras de vidro mantinham o blur (Card glass e Modal saíam com
   `backdrop-filter: none`). Ordem invertida (zero diferença de pixel no site, conferido em
   10 rotas × 2 temas) + guarda `lint:glass` no CI. É a causa provável do "vidro sumiu" no
   Subido e no Builder, que consomem esse CSS.
2. **Tokens em JS/JSON com valores do tema escuro** — `tokens.ts`, `dist/lib/tokens.json` e o
   `tokens.json` do kit pegavam o último valor do arquivo inteiro: 56 tokens saíam com o valor
   do dark ou do `prefers-reduced-transparency` (`via-bg` = `#0B1220`, `via-glass-blur` = `none`)
   e os 6 half-steps de espaçamento faltavam. Eram 3 parsers copiados; virou 1
   (`scripts/parse-tokens.mjs`) + teste.
3. Kit ZIP regenerado (entra o email 14, o vidro e os tokens corrigidos).
4. Lint de volta a 0 warnings; sondas de auditoria removidas da raiz.
5. `CLAUDE.md` + este documento + CHANGELOG cobrindo jul–ago.

## Achados em aberto

### P0 · colocar no ar
- ~~Mergear esta branch~~ (PR #1), ~~republicar o site~~ e ~~push do plugin 1.4.2~~ — feitos em 28/out
  (site conferido no ar: email 14 publicado, mesmo pacote do build local).
- **Rollout pros produtos pausado pelo Rafael (28/out):** este repo é o DS da **marca**; o Subido
  (e o que mais for do time de produto) vai ter um DS de produto próprio. Não atualizar produto
  sem ele confirmar quem é o dono. O que o DS de produto herda da marca está em aberto.
- **Nenhum consumidor tem o conserto do vidro** (levantamento no Mac, 28/out — tabela no fim).
  Só `claude-viverdeia` e `via-talentos` linkam o `dist/lib` vivo (pedem reinstalar); o resto
  vendoriza ou copiou tokens e precisa re-vendorizar ou corrigir a ordem no próprio CSS.
- O rótulo "0.6.1" cobre `b17f062`, `ed6fb6b` e o HEAD — não distingue quem tem o conserto.
  Subir a versão do pacote (0.6.2) junto com o aviso aos produtos.

### P1 · bugs e incoerências pequenas
Rodada de correção feita em 28/out (CHANGELOG `[Não lançado]`), aprovada pelo Rafael:
- ~~`--via-border-strong` muda de tipo~~ → shorthand removido; é cor nos dois temas (o único uso
  no site é no escuro, então não muda pixel aqui; protege quem usa o token no claro).
- ~~Legenda do mockup de Instagram some no escuro~~ (1,47:1) → mockup fixa a cor. Contraste agora:
  216/218 rota×tema limpas; as 2 restantes são o cinza de horário do próprio Instagram.
- ~~Verde de texto abaixo de AA na camada de dados~~ → token `--via-success-text`
  (`#18744C` claro · `#4FBF8B` escuro); notas do DRE em `--via-text-soft`.
- ~~Rodapé dos 14 emails ilegível~~ → `#4F596B` / `#636D80` sobre o `pageBg` (6,2 e 4,6:1).
- ~~`/via-paid` manda fundo navy~~ → claro por padrão; navy só a pedido ou no card de
  fechamento do carrossel. **Pendente:** os criativos de `/patterns/paid-ads` ainda são navy
  (anteriores à regra) — redesenhar em claro é trabalho de design, não conserto.
- ~~Prompts das outras IAs atrasados~~ → `docs/system-prompt.md` reescrito onde contradizia a
  skill (ensinava **barra lateral no hover**, itálico no checklist, vidro com número solto e na
  ordem que o minify apaga, sombra com navy literal; faltavam tinta de sombra e escala de raio).
  `public/llms.txt` (era cópia de maio, sem light-first e com `defaultMode="system"`) e a cópia
  pública agora são cópias exatas, guardadas pelo `lint:sync`. Skill: v0.6.1 e starter honesto.

Ainda aberto (decisão do Rafael):
- **Light-first só vale com ThemeProvider**: o `tokens.css` cru vira escuro sozinho quando o SO
  está em dark (`@media (prefers-color-scheme: dark) :root:not([data-theme])`). Quem usa o CSS
  sem React (Aurora) teve que travar `data-theme="light"`. Decidir se o CSS cru deve nascer claro.
- **Endereço oficial**: canonical/OG/sitemap apontam pra `viverdeia.ai/design` (404) e a imagem
  de prévia não existe — levar o site pra lá ou assumir `viver-de-ia-ds.vercel.app`.

### P2 · fundação (a "Onda 3")
- Tipografia: 97% tokenizada (2.361 vs 76 px crus).
- **Espaçamento interno**: 4.516 `padding/margin` em px cru contra 1.563 tokenizados.
  **3.826 têm token exato** (troca sem mudar pixel, 153 arquivos) e 514 estão fora da escala
  (3, 5, 7, 9, 11, 13, 26, 44px…) e pedem decisão de design. Depois, estender o `token-drift`
  pra padding/margin.
- Raio: 1.382 tokenizados, 138 crus. Literais de cor no CSS: 428 hex, 2.574 rgba.

### P3 · produto e distribuição
- **Três fontes de verdade da marca**: o DS (navy `#0A1F3B`, Geist), o doc do Drive
  "🎨 Design System - Viver de IA" (2025, ciano/teal, escuro — tudo que hoje é banido) e o
  "Manual de Identidade Visual" do Notion de Marketing (`#02162A`/`#2081E3`/`#0A4F95`, Avenir;
  Design.json com Inter, `#0F172A`, azul `#3B82F6`, verde `#10B981`). Apontar os dois pro DS
  ou arquivar.
- Uso real mostrou lacunas: regras de legibilidade do vidro medidas contra o fundo real (o
  Builder criou guarda ≥4,5:1), vidro nunca visto em Safari/iPhone, falta camada de tema por
  produto/sub-marca (o Subido está saindo do DS: Poppins, `#0B91F8`, sem vidro).
- `bunx create-viverdeia-app` não existe no npm e o template depende de `file:../../viver-de-ia-ds`.
- Canonical, OG e sitemap apontam pra `viverdeia.ai/design` (404) e `og-cover.png` não existe.
- Visual regression só no macOS; deploy manual (avaliar Vercel ligado ao `main`).

## Quem consome o DS hoje

Levantamento no Mac do Rafael em 28/out (só leitura). "Vidro velho" = blocos com
`backdrop-filter` antes do `-webkit-` no CSS próprio do projeto (contagem aproximada).

| Projeto | Como consome | Fixado em | Vidro velho | Último commit | Fora do DS? |
|---|---|---|---|---|---|
| Subido (`~/Developer/Subido-Claude` + clone `subido-reunioes-capacidade-0930`) | lib + CSS vendorizados em `src/design-system/via/` + gate de drift | `ed6fb6b` (0.6.1) | 62 | 22/out | `main` segue Geist + vidro; branch `claude/redesign-1021` traz Poppins e `#0B91F8` |
| Viver de IA Builder (`~/Developer/VIA-Builder` + worktrees `VIA-Builder-*`; 2º clone em `~/.cache/claude/builder-work`) | `vendor/viverdeia-design-system-0.6.1.tgz` + tokens próprios | `b17f062` (08/jul, mais velho que o Subido) | 4–20 por worktree; o `style.css` do tgz tem 7 de 61 regras de vidro com o blur padrão | 28/out | tokens bem forkados no `-Claude`; Poppins em 2 pontos |
| claude-viverdeia (treinamento gratuito) | `file:../viver-de-ia-ds/dist/lib` | 0.6.1 (cópia de 06/jul) | 9 | 20/out | não |
| via-talentos (recrutamento) | `file:` absoluto pro `dist/lib` | 0.6.1 (cópia de 17/jul) | 0 | 17/jul | não |
| viver-de-ia-os (plataforma Íris) | cópia do `dist/lib` em `vendor/` | **0.4.0** (20/mai) — `style.css` sem nenhum blur padrão | 13 | 03/jun | leve (Inter) |
| Aurora / CRM de vendas (`~/Projects/crm-pay-notification`, `~/iris-via-crm-notify-20260916`) | tokens portados à mão (`via-tokens.css`) | não dá pra fixar | 54–57 | 14/out | sim, de propósito: páginas públicas com Poppins e ciano |
| Pessoas (`~/Projects/viver-people`, v0.28.0) | lib + tokens vendorizados em `src/vendor/via/` | ≈`92379bc` (0.6.1) | 64 | 22/set | não |
| Site institucional (`~/site-viver-de-ia`) | tokens copiados | ≈`4932250` (22/jun) | 59 | 09/set | não |
| Landing de proposta (`~/Developer/via-landing-proposta`) | 4 cópias de tokens | — | 77 | 10/set | keyframes "aurora" |
| via-dossie, via-safra (páginas confidenciais) | `tokens.css` copiado | ≈`6dfb511` (30/mai) | 11 / 14 | ago / jul | não |
| Dose Diária de IA (`~/Developer/dose-*`) | tokens próprios com `--via-*` | — | 0 | 28/out | não |
| quebra-objecao, nina-connect-ai (+ worktrees) | cópia parcial de tokens | ≈`4dae03c` | 5 / 12 | jun / 24/out | não |
| Emails, anúncios, peças | plugin `/via-*` e skill local | plugin 1.4.1 | — | — | — |

Leitura: o desvio real de marca está só em 2 lugares (redesign do Subido, ainda fora do `main`,
e as páginas públicas do Aurora). O resto ainda é Geist + navy + vidro, só que em versões
velhas e sem o conserto do vidro. Builder, Subido e o CRM têm clones duplicados — atualização
precisa chegar em todos.
