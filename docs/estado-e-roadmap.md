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

`viver-de-ia-ds.vercel.app` está no estado de ~6/ago (último deploy de produção há 83 dias,
time `viver-de-ia` na Vercel): falta o email 14 (`welcome-plataforma`) e os consertos abaixo.
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
- ~~Mergear esta branch~~ (PR #1, 28/out). Falta **republicar o site** e dar push do plugin 1.4.2.
- **Nenhum consumidor tem o conserto do vidro** (levantamento no Mac, 28/out — tabela no fim).
  Só `claude-viverdeia` e `via-talentos` linkam o `dist/lib` vivo (pedem reinstalar); o resto
  vendoriza ou copiou tokens e precisa re-vendorizar ou corrigir a ordem no próprio CSS.
- O rótulo "0.6.1" cobre `b17f062`, `ed6fb6b` e o HEAD — não distingue quem tem o conserto.
  Subir a versão do pacote (0.6.2) junto com o aviso aos produtos.

### P1 · bugs e incoerências pequenas
- **`--via-border-strong` muda de tipo**: cor no tema escuro, shorthand `1px solid …` no claro
  (redefinido no 3º `:root` de `tokens.css`). O único uso (`showcase/mentor.css`, `border-color`)
  fica inválido no claro. Conserto: tirar a redefinição shorthand (muda pixel em /showcase/mentor →
  rebaseline no Mac).
- **Contraste na camada de dados**: verde `--via-success` como texto dá 4,33:1 no branco e
  3,7–3,9:1 no escuro (AA pede 4,5); notas em gray-400 no DRE dão 2,48:1. Afeta
  `/patterns/fpa` e `/foundations/dados` (e o `data.css` distribuído). Precisa de um tom de
  texto pro success. Os outros casos são mockups de Instagram/email (cor da plataforma).
- **Light-first só vale com ThemeProvider**: o `tokens.css` cru vira escuro sozinho quando o SO
  está em dark (`@media (prefers-color-scheme: dark) :root:not([data-theme])`). Quem usa o CSS
  sem React (Aurora) teve que travar `data-theme="light"`. Decidir se o CSS cru deve nascer claro.
- **`/via-paid` manda fundo navy** (`commands/via-paid.md`), contra a regra zero light-first.
- Prompts distribuídos atrasados: `public/llms.txt` é de 28/mai; `docs/system-prompt.md` não tem
  tinta de sombra, receitas de vidro nem escala de raio. A skill diz "v0.6.0" (pacote é 0.6.1).

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
