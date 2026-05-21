# Changelog

Todas as mudanças notáveis no Viver de IA Design System são documentadas aqui.

Padrão: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [0.3.0] · 2026-05-20

### Adicionado

- **Library +6 componentes** (25 → 31 total · "DS de verdade"):
  - `<Popover>` · floating panel · 4 sides × 3 alignments · ARIA dialog · ESC + outside-click closes
  - `<Command>` · paleta Cmd+K keyboard-first · filtragem live · groups + shortcuts · ARIA listbox
  - `<DatePicker>` · single date · month grid editorial · pt-BR · weekStartsOn · min/max · footer Limpar/Hoje
  - `<Slider>` · range editorial · 3 tones × 3 sizes · marks opcionais · native input pra ARIA valuetext
  - `<Alert>` · banner persistente · 4 tons (info/attn/danger/success) · dismissible · action inline
  - `<DataTable>` · sortable · accessor pra derived sort · render pra ReactNode cells · ARIA sort
- **Fundação git + CI/CD:**
  - `git init` + 4 commits estruturados (bootstrap → tooling → docs → source)
  - GitHub Actions `ci.yml`: build · lint · typecheck · visual regression (192) · a11y (96 routes)
  - GitHub Actions `release.yml`: publish `@viverdeia/design-system` to npm em tag `v*` com provenance
  - Repo público: https://github.com/rafaelmilagre7/viver-de-ia-ds
- **Showcase Library** atualizada com 6 novas seções demonstrando os componentes

### Modificado

- `--via-gold*` tokens renomeados pra `--via-accent*` (149 usos em 27 arquivos) · semântica limpa
- Class names `.gold` → `.accent` em CSS + TSX (variants Button, Pill, Icon, Progress + 13 pages)
- `Philosophy.tsx` corrigido: function name `RuleGoldSection` → `RulePaletteRestritaSection`, texto contraditório removido, tokens stale na paleta atualizados
- `DosDonts.tsx` linha "Cor": "Gold só como acento ÚNICO" → "navy protagonista · cinza estrutura"
- Centenas de hexes hardcoded tokenizados:
  - `#000`/`#FFFFFF` → `var(--via-black)`/`var(--via-white)`
  - `#0A1F3B` em SVG attrs → `style={{ fill: 'var(--via-navy)' }}` (CSS vars via inline style)
  - Fine-tunes navy (`#051C36`, `#0E2C57`, `#2A5388`, `#2E4C76`, `#244569`) → tokens existentes
  - Achievement `Ring` component refatorado pra usar `style` prop em vez de SVG attribute
- 2 hexes intencionais preservados em production: `#5BC0FA` (WhatsApp check) + `#4285F4` (Google Sign-In)

## [0.2.0] · 2026-05-20

### Adicionado

- **Library expandida 6 → 20 componentes core:**
  - `<Toast>` + `useToasts()` hook · stack editorial com 4 variants e auto-dismiss
  - `<Tooltip>` · 4 sides · hover + focus aware · ARIA describedby
  - `<Modal>` · 3 sizes · ESC fecha · focus trap · scroll lock
  - `<Tabs>` · underline + pills · keyboard arrow/Home/End · ARIA tablist
  - `<Switch>` · toggle on/off · 2 sizes · `role="switch"`
  - `<Checkbox>` · estado indeterminate suportado
  - `<RadioGroup>` · escolha única com options · ARIA radiogroup
  - `<Select>` · combobox custom · ESC + click outside fecha
  - `<Progress>` · barra 3 tones × 3 sizes · ARIA progressbar
  - `<Drawer>` · sheet right/left/bottom · ESC fecha · focus trap
  - `<Spinner>` · loader inline 3 sizes 3 tones · reduce-motion aware
  - `<Skeleton>` · placeholder shimmer · text/rect/circle
  - `<Breadcrumb>` · navegação hierárquica · ARIA nav
  - `<Pagination>` · numerada editorial · prev/next + elipses
- **Catálogo Ladle** (`bun run story`) com 16 stories cobrindo todos os componentes
- **Visual regression suite** Playwright (`bun run test:visual`) · 192 testes (96 rotas × desktop + mobile)
- **Dark mode global** via `data-theme="dark"` + auto-detect `prefers-color-scheme` + toggle em `<Header>`
- **Code-splitting** por rota via `React.lazy` + `<Suspense>` + RouteLoader editorial
- **Library publicável** `@viverdeia/design-system` (`bun run build:lib`) com ESM + CJS + types + tokens.css standalone
- **SEO completo:** OG tags, Twitter cards, robots.txt, manifest.json, sitemap.xml auto-gerado com 96 URLs
- **Mobile responsiveness:** drawer hamburger, hero stats wrap, grids 1-col em ≤720px, wordmark esconde em ≤560px
- **Acessibilidade:** focus-visible rings, reduce-motion respect, aria-labels em icon-only buttons
- README do repo (visão completa) + README publicável da library (363 linhas com prop tables)
- Filosofia editorial cristalizada em `src/pages/foundations/Philosophy.tsx`
- 49 páginas vivas no site de referência cobrindo fundamentos, glass, iconografia, componentes, padrões, showcase, guidelines

### Modificado

- Sidebar group icons: 11px → 14px com stroke 1.8 · container 22px → 26px com gradient navy-12→navy-04 (visibilidade real)
- Tokens semânticos consolidados em 3 camadas (atomic → semantic → component)
- 800+ usos de `--via-border-soft`, `--via-ink-2/3`, `--via-gold`, `--via-coral` agora têm tokens correspondentes em `:root`

### Corrigido

- **CRÍTICO** · `tokens.css` tinha `@media (prefers-color-scheme: dark)` envolvendo 140 variáveis órfãs (typography, spacing, radii, shadows, blur, motion, mesh). No modo claro o site renderizava branco-em-branco. Fix: fechar `@media` no lugar correto + abrir novo `:root` pras 140 vars
- 37 imports não-usados varridos (Curriculum, EditorialBlocks, LocationCard, MentorMatching, StatusPage, etc) bloqueavam build estrito
- Roadmap.tsx tinha type discrimination quebrado entre cards "now/next" e "later" — refatorado pra interface `RoadmapCard` única com props opcionais
- Settings.tsx usava classe `.al-nav` mas não importava `aluno.css` — nav editorial não tinha gap em dev
- Vite 8 cssMinify (lightningcss) falhava em multi-line custom property `--via-glow-navy-strong` — desligado, JS continua minify oxc

## [0.1.0] · 2026-05-18

### Adicionado

- Setup inicial do projeto: Vite 8 + React 19 + TypeScript estrito + bun
- 49 páginas de referência (foundations, glass, iconography, components, patterns, showcase, guidelines)
- Library inicial de 6 componentes: `<Button>`, `<Pill>`, `<Card>`, `<Input>`, `<Avatar>`, `<Icon>`
- Tokens CSS com 300+ variáveis em 4 camadas semânticas
- Mesh navy + noise texture + glow navy como assinatura visual
- Tipografia Geist + Geist Mono (migração de Fraunces+Inter)
- 7 não-negociáveis editoriais cristalizados (light-first, glass intencional, gold singular, pills canônicas, coral só destrutivo, sparkles banido, voz operador)
- Skill `/viver-de-ia-design` em `~/.claude/skills/`

---

## Tipos de mudança (referência rápida)

- **Adicionado** — nova feature ou componente
- **Modificado** — mudança em comportamento ou API existente
- **Depreciado** — feature ainda funciona mas será removida em próxima major
- **Removido** — feature que foi removida
- **Corrigido** — bug fix
- **Segurança** — vulnerabilidade resolvida

## Sobre versionamento

Estamos em `0.x` durante adoção interna (Nina, Iris, ExecSeats, plataforma). Breaking changes podem ocorrer em minors até `1.0.0`. Após estabilização, semver estrito (breaking em major).

[0.2.0]: https://github.com/viverdeia/design-system/releases/tag/v0.2.0
[0.1.0]: https://github.com/viverdeia/design-system/releases/tag/v0.1.0
