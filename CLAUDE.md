# Viver de IA · Design System — guia de trabalho

Repo do DS da Viver de IA: site de referência (Vite + React) + library React interna
`@viverdeia/design-system` + plugin Claude Code + kit pra outras IAs + emails de produção.
Dono: Rafael Milagre. Idioma do projeto: PT-BR (código, commits, docs).

- Site: https://viver-de-ia-ds.vercel.app (deploy **manual** na Vercel — não segue o `main` sozinho)
- Regras de marca (fonte canônica): `plugins/viver-de-ia/skills/viver-de-ia-design/SKILL.md`
- Estado atual, achados e roadmap: `docs/estado-e-roadmap.md`

## Comandos

```bash
bun install
bun dev                    # :5173
bun run lint               # ESLint — meta é 0 warnings
bun run lint:tokens        # token-drift: valor cru que já tem token exato
bun run lint:sync          # plugin espelha src/styles (tokens/surfaces/data)
bun run lint:glass         # -webkit-backdrop-filter ANTES do backdrop-filter
bun run build              # tokens → sitemap → tsc → vite build
bun run test:unit          # vitest (515+ testes)
bun run build:lib          # dist/lib (pacote interno, não vai pro npm)
bun run kit                # lib + emails + public/viver-de-ia-kit.zip
bun run test:a11y          # axe-core em todas as rotas (Playwright)
bun run test:visual        # regressão visual — só bate no macOS (baselines darwin)
```

CI (`.github/workflows/ci.yml`) roda lint, lint:tokens, lint:sync, lint:glass, build, test:unit,
build:lib, a11y (ubuntu) e visual (macOS). Lighthouse roda à parte.

## Mapa

```
src/styles/tokens.css      FONTE de todos os tokens --via-* (light no :root, dark em [data-theme="dark"])
src/styles/surfaces.css    acabamento pra HTML cru (pill-link, tile, row-card…)
src/styles/data.css        camada de dados (via-table, via-num, via-metric, via-delta)
src/lib/                   46 componentes + ThemeProvider + _shared (spring.ts, useDragDismiss, useDialogFocus)
src/lib/tokens.ts          GERADO (scripts/build-tokens.mjs) — não editar
src/pages/                 páginas do site: foundations, glass, iconography, components, api (46), patterns, showcase, guidelines
src/App.tsx                rotas (lazy) · tests/routes.ts = rotas cobertas por visual/a11y/contraste
emails/                    14 templates react-email → public/emails/*.html (CI kit.yml re-renderiza)
plugins/viver-de-ia/       plugin Claude Code: skill + 8 comandos /via-* + agente via-auditor
packages/create-viverdeia-app/  starter (NÃO está no npm — o `bunx` dos docs não funciona fora daqui)
docs/                      system-prompt.md (= public/viver-de-ia-system-prompt.md), manual, integração
public/guia, public/manual lead magnet PDF + manual de construção de DS
scripts/                   build/guard scripts · fix-*.mjs e migrate-glass.mjs são codemods históricos (já rodados)
```

## O que deriva de quê (atualize a cadeia inteira)

| Mudou… | Atualize também |
|---|---|
| `src/styles/tokens.css`, `surfaces.css`, `data.css` | cópia em `plugins/.../viver-de-ia-design/` (`colors_and_type.css`, `surfaces.css`, `data.css`) — `lint:sync` barra |
| tokens | `bun run build:tokens` regenera `src/lib/tokens.ts` (parser único: `scripts/parse-tokens.mjs`) |
| regra editorial/visual | `SKILL.md` + `guidelines.md` do plugin, `docs/system-prompt.md` **e** `public/viver-de-ia-system-prompt.md`, bump em `plugins/viver-de-ia/.claude-plugin/plugin.json` |
| lib, emails ou tokens | `bun run kit` e commitar `public/viver-de-ia-kit.zip` (o CI não faz isso) |
| pixel de alguma rota | baseline visual (`test:visual:update`, no Mac) |
| componente da lib | página `/components/*` ou `/api/*` + teste ao lado (`*.test.tsx`) |
| qualquer coisa notável | `CHANGELOG.md` em `[Não lançado]` |

A skill local do Rafael (`~/.claude/skills/viver-de-ia-design/`) vive fora do repo e deriva calada — avisar quando a do plugin mudar.
No Mac dele, depois de push com bump do plugin: `claude plugin marketplace update viver-de-ia-ds && claude plugin update viver-de-ia@viver-de-ia-ds`,
e copiar `SKILL.md`, `guidelines.md` e as 3 folhas CSS do plugin pra skill local (o resto da pasta local é só dela).

## Regras que mais quebram (detalhe na SKILL.md)

- **Light-first.** Fundo claro é o padrão; navy é cor de marca, não de fundo. Dark é modo do usuário.
- **Só token.** Nunca hex/px cru quando existe `--via-*`. Texto/superfície sempre em token semântico (`--via-text-*`, `--via-surface`, `--via-bg*`) pra o dark se resolver sozinho.
- **Paleta restrita:** navy + cinzas + branco + preto. Coral só destrutivo, success só status real. Gold/amarelo/roxo/cyan banidos.
- **Vidro pelas receitas** (`--via-glass-*`), sombras só `--via-shadow-ink-*`. Nada de barra lateral colorida, anel em avatar, itálico, Sparkles, CAPS em botão.
- **Vidro + minify:** em todo bloco, `-webkit-backdrop-filter` primeiro e `backdrop-filter` por último. Na ordem inversa o lightningcss (Vite 8/Next) apaga o padrão e o vidro some no Chrome/Firefox.
- **Mockup interno fixa as próprias cores** (não herda o tema). Testar toda peça nos 2 temas.

## Armadilhas do ambiente

- `bun run build` reescreve `public/sitemap.xml` com a data do dia — descarte (`git checkout public/sitemap.xml`) se não for intencional.
- Bun mais novo reordena o `bun.lock` sem mudar versões; não commite esse ruído.
- O site builda com `cssMinify: false` (vite.config.ts); a lib minifica com lightningcss — por isso o `lint:glass`.
- Sessão em nuvem (claude.ai/code): use `--config=playwright.cloud.config.ts` (Chromium pré-instalado). Visual regression não roda fora do macOS.
- Canonical/OG/sitemap apontam pra `https://viverdeia.ai/design`, que hoje não responde (ver `docs/estado-e-roadmap.md`).

## Definição de pronto

Lint 0 warnings · lint:tokens/sync/glass verdes · build + test:unit verdes · a11y verde ·
peça conferida em claro **e** escuro · cadeia de derivação acima atualizada · CHANGELOG.
