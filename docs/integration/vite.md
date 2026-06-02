# Consumindo `@viverdeia/design-system` em Vite + React

Cobre Vite 5+ com React 18 ou 19. Ambiente real testado: este próprio repo (`viver-de-ia-ds`).

---

## 1 · Instalar

```bash
bun add @viverdeia/design-system lucide-react
```

`react` e `react-dom` já são peers.

## 2 · Importar CSS no entrypoint

```ts
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@viverdeia/design-system/tokens.css';
import '@viverdeia/design-system/style.css';
import './index.css'; // seus globais depois

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## 3 · Carregar a fonte Geist

Maneira mais simples · no `index.html`:

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

E no `src/index.css`:

```css
:root {
  --via-font:         'Geist', system-ui, -apple-system, sans-serif;
  --via-font-display: 'Geist', system-ui, sans-serif;
  --via-font-mono:    'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;
}
```

## 4 · Usar componentes

```tsx
// src/App.tsx
import { useState } from 'react';
import { Button, Alert, DatePicker, useToasts, ToastStack } from '@viverdeia/design-system';

export default function App() {
  const [date, setDate] = useState<Date | null>(null);
  const { toasts, push, dismiss } = useToasts();

  return (
    <main style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Alert tone="info" title="Bem-vindo">
        Tudo funcionando. Próximo passo é montar a UI.
      </Alert>

      <DatePicker value={date} onChange={setDate} label="Quando?" />

      <Button onClick={() => push({ title: 'Salvo', variant: 'success' })}>
        Salvar
      </Button>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </main>
  );
}
```

## 5 · Tree-shaking · bundle size

Vite + Rollup já fazem tree-shaking nativo via ESM. Importe nominal:

```ts
// ✓ bom · só Button entra no bundle
import { Button } from '@viverdeia/design-system';

// ✗ evitar · namespace import quebra tree-shaking
import * as DS from '@viverdeia/design-system';
```

## 6 · Tokens em JS

```ts
import { tokens, cssVar } from '@viverdeia/design-system/tokens';

console.log(tokens['via-navy']); // → '#0A1F3B'
console.log(cssVar('via-radius-md')); // → 'var(--via-radius-md)'
```

## 7 · Dark mode

A library suporta `data-theme="dark"` no `<html>`:

```tsx
// detectar preferência do sistema
useEffect(() => {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  document.documentElement.dataset.theme = mq.matches ? 'dark' : 'light';

  const onChange = (e: MediaQueryListEvent) =>
    (document.documentElement.dataset.theme = e.matches ? 'dark' : 'light');
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}, []);
```

Ou um toggle manual com `localStorage`:

```tsx
function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
}
```

## 8 · Vite config (sem ajustes necessários)

```ts
// vite.config.ts · default funciona
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

A library traz ESM + CJS + `types/` · Vite escolhe ESM automaticamente.

## 9 · Build · validação

```bash
bun run build
# → o bundle final inclui só os componentes que você importou
```

Se quiser confirmar:

```bash
bunx vite-bundle-visualizer
# ou
bunx source-map-explorer dist/assets/index-*.js
```

## 10 · Gotchas comuns

| Sintoma | Causa | Fix |
|---|---|---|
| Estilos não aparecem | Esqueceu de importar `style.css` no main.tsx | `import '@viverdeia/design-system/style.css'` antes dos seus globals |
| Cores em fallback (`#0A1F3B`) e não dos tokens | `tokens.css` não foi carregado | Importe `tokens.css` *antes* de `style.css` |
| Fonte fallback (system) em vez de Geist | Geist não foi carregada | `<link>` no index.html + mapear `--via-font*` em CSS |
| Imports failing com "Cannot find module" | TS não resolveu types | Adicione `"types": ["@viverdeia/design-system"]` em tsconfig se necessário (raro) |
