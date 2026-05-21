# Integration guides

Guias práticos pra consumir `@viverdeia/design-system` em projetos reais.

| Stack | Guia |
|---|---|
| **Next.js 14+** (App + Pages Router) | [`nextjs.md`](./nextjs.md) |
| **Vite + React** (SPA) | [`vite.md`](./vite.md) |
| **Remix v2+** (SSR) | [`remix.md`](./remix.md) |

Todos os guides cobrem:

- Instalação + CSS imports (`tokens.css` antes de `style.css`)
- Setup da fonte Geist (next/font, CDN, ou Vite plugin)
- Theming · override de tokens via CSS custom properties
- Tokens em JS (`@viverdeia/design-system/tokens`)
- Dark mode (data-theme + prefers-color-scheme)
- SSR · client-only components · hydration
- Gotchas comuns + diagnose

## Quick start (qualquer stack)

```bash
bun add @viverdeia/design-system lucide-react
```

```ts
// entrypoint
import '@viverdeia/design-system/tokens.css';
import '@viverdeia/design-system/style.css';
```

```tsx
import { Button, Alert, useToasts } from '@viverdeia/design-system';
```

## Quando NÃO usar a library

A library é peers `react@^18 || ^19` + DOM real. Não suporta:

- React Native (web only)
- Vue / Svelte / Solid (React-only)
- Server-only rendering sem client hydration (componentes interativos quebram)

Pra esses casos, importe só os **tokens** (CSS vars ou JSON) e construa seus próprios componentes.

## Reportar problemas

Issues em https://github.com/rafaelmilagre7/viver-de-ia-ds/issues
