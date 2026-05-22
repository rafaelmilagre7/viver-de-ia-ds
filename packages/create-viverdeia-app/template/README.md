# {{PROJECT_NAME}}

Starter editorial · Viver de IA design system.

## Stack

- **Vite 6** · dev server e build
- **React 19** · runtime
- **TypeScript 5** · strict
- **@viverdeia/design-system** · tokens, library, theming, glass

## Começar

```bash
bun install  # ou npm/pnpm/yarn
bun dev
```

Abra <http://localhost:5173>.

## Estrutura

```
src/
  main.tsx     · entrypoint · monta ThemeProvider
  App.tsx      · hello world editorial
  index.css    · CSS local (usa --via-* tokens)
```

## O que vem pronto

- Tokens CSS (`--via-*`) ativos via import em `main.tsx`
- `ThemeProvider` com `defaultMode="system"` (segue prefers-color-scheme)
- Anti-FOUC script no `index.html` (tema aplicado antes do React montar)
- TypeScript strict + Vite + React 19

## Próximos passos

1. **Use componentes da library**

   ```tsx
   import { Button, Card, Modal, useTheme } from '@viverdeia/design-system';
   ```

2. **Use tokens em CSS**

   ```css
   .my-card {
     background: var(--via-surface-1);
     color: var(--via-text-primary);
     border-radius: var(--via-radius-md);
   }
   ```

3. **Veja o DS completo**

   O projeto principal (`viver-de-ia-ds`) tem 46 componentes documentados,
   foundations, glass anatomy, patterns canônicos e guidelines. Rode lá:

   ```bash
   cd ../viver-de-ia-ds  # ou onde está o DS
   bun dev
   ```

## Regras editoriais

- **Paleta restrita** · navy / gray / white / blue / black. Sem gold/yellow/purple.
- **Coral** só pra estado destrutivo
- **Sparkles ✨ banidos** · use Compass, Award, Crown, Layers, Rocket (anti-cliché IA)
- **Liquid glass** é a assinatura · use blur + saturate(140-180%)

## Comandos

```bash
bun dev       # dev server
bun build     # build produção
bun preview   # preview do build
bun lint      # eslint
```
