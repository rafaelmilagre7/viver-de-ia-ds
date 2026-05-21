# `@viverdeia/example-vite-starter`

Proof of consumption real · esta app consome a library `@viverdeia/design-system` **como dependency externa**, via `file:../../dist/lib`.

Se este app builda e renderiza igual ao reference site (mesma paleta navy, mesmos tokens, mesmos componentes interativos), o publish artifact tá pronto pra npm.

---

## Por que existe

Antes de publicar a library no npm pública, queremos garantir que:

1. O bundle ESM (`dist/lib/index.js`) carrega sem erros
2. Os CSS (`tokens.css` + `style.css`) cobrem todos os componentes
3. Os types (`dist/lib/types/`) resolvem em TypeScript estrito
4. As 35 named exports estão acessíveis
5. O subpath export `/tokens` resolve corretamente
6. Componentes interativos (Modal, Command, DatePicker, Popover) funcionam fora do reference site

Esse starter testa todos os 6 pontos.

## Rodar

A partir da raiz do repo:

```bash
# 1. Build a library primeiro
bun run build:lib

# 2. Install + dev
cd examples/vite-starter
bun install
bun run dev          # → http://localhost:5174

# Build de produção pra validar
bun run build
```

## O que o app demonstra

| Seção | Componentes |
|---|---|
| Buttons | `Button` (5 variants) |
| Pills | `Pill` (4 variants incl. live italic) |
| Avatar | `Avatar` com presence dots |
| Alert | `Alert` (info/danger/success) com dismissible |
| DatePicker | `DatePicker` pt-BR month grid |
| Slider | `Slider` com marks |
| DataTable | `DataTable` sortable com Pill cells |
| Overlays | `Modal`, `Popover`, `Command` (Cmd+K), `Tooltip` |
| Card | `Card` variant featured |
| Tokens | Runtime `tokens['via-navy']` + `cssVar()` |

## Re-build após mudança na library

Mudou algo em `src/lib/`? Re-build a lib pra refletir aqui:

```bash
# da raiz
bun run build:lib

# o file: protocol já aponta pra dist/lib · só refresh o dev server
```
