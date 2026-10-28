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
| visual (Playwright) | não roda fora do macOS (baselines darwin) |

### Site no ar

`viver-de-ia-ds.vercel.app` está no estado de ~6/ago: falta o email 14 (`welcome-plataforma`),
e a partir desta branch faltam os consertos abaixo. Deploy é manual.

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
- Mergear esta branch, **republicar o site** e avisar os produtos que vendorizam o CSS da lib
  (Subido fixou no commit `ed6fb6b`) pra atualizar — o conserto do vidro só chega neles assim.

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

| Produto | Como |
|---|---|
| Subido | CSS da lib vendorizado em `src/design-system/via/` (0.6.1, `ed6fb6b`) + gate de drift; 19 dos 47 componentes; redesign paralelo saindo do DS |
| Viver de IA Builder | pacote DS interno próprio, vidro forte estilo iOS 26 |
| Aurora (painel) | tokens copiados à mão da skill local |
| Emails, anúncios, peças | plugin `/via-*` e skill local |
