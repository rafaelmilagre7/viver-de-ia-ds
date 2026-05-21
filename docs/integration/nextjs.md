# Consumindo `@viverdeia/design-system` em Next.js

Cobre Next.js 14+ (App Router) e Pages Router · server-rendered ou estático. Ambiente real testado: Nina-connect-ai (plataforma Vercel).

---

## 1 · Instalar

```bash
bun add @viverdeia/design-system lucide-react
# ou
pnpm add @viverdeia/design-system lucide-react
```

`react` e `react-dom` já são peers · se você tem Next.js, já tem.

## 2 · Importar o CSS uma vez

A library traz **dois arquivos CSS** que precisam carregar antes dos seus estilos:

- `tokens.css` — variáveis (paleta, tipografia, espaçamentos, radii, shadows)
- `style.css` — CSS de todos os componentes

### App Router (Next.js 14+)

```ts
// app/layout.tsx
import '@viverdeia/design-system/tokens.css';
import '@viverdeia/design-system/style.css';
import './globals.css'; // os seus depois

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

### Pages Router

```ts
// pages/_app.tsx
import '@viverdeia/design-system/tokens.css';
import '@viverdeia/design-system/style.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Carregar a fonte Geist

A library espera Geist · pode vir do `next/font` (recomendado) ou do CDN do Google.

```ts
// app/layout.tsx
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

E no seu CSS global:

```css
:root {
  --via-font:         var(--font-geist-sans);
  --via-font-display: var(--font-geist-sans);
  --via-font-mono:    var(--font-geist-mono);
}
```

> Os tokens `--via-font*` em `tokens.css` ficam intencionalmente sem fallback assumindo que o projeto consumidor define a fonte. Override no seu CSS local (acima) tem precedência por causa da ordem de import.

## 3 · Usar componentes

```tsx
// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Button, DatePicker, Alert, useToasts, ToastStack } from '@viverdeia/design-system';

export default function Dashboard() {
  const [date, setDate] = useState<Date | null>(null);
  const { toasts, push, dismiss } = useToasts();

  return (
    <>
      <Alert tone="info" title="Janela de manutenção · sex 22h">
        Pausa programada de até 8 minutos.
      </Alert>

      <DatePicker value={date} onChange={setDate} label="Data da live" />

      <Button onClick={() => push({ title: 'Salvo', variant: 'success' })}>
        Salvar
      </Button>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
```

### `'use client'` é necessário?

Sim, **para qualquer componente que usa state ou ref** (Modal, Drawer, Tabs, Popover, Command, DatePicker, Slider, DataTable, useToasts).

`Button`, `Pill`, `Card`, `Icon`, `Avatar`, `Skeleton`, `Spinner`, `Breadcrumb`, `EmptyState` são server-component-friendly — sem `'use client'` rodam direto no servidor.

## 4 · Theming · override do navy / cinza

Os tokens são CSS custom properties em `:root`. Override no seu `globals.css`:

```css
:root {
  /* deixar a marca um pouco mais clara */
  --via-navy:       #142849;
  --via-navy-deep:  #0c1d3a;

  /* trocar a accent (rebadged): */
  --via-accent:       var(--via-navy);
  --via-accent-deep:  var(--via-navy-deep);
}
```

## 5 · Tokens em JS · autocomplete + tipo

```ts
import { tokens, cssVar, type TokenName } from '@viverdeia/design-system/tokens';

// objeto JS direto
const navy = tokens['via-navy']; // → '#0A1F3B'

// CSS var helper
const css = cssVar('via-radius-lg'); // → 'var(--via-radius-lg)'

// como union type
function paintCanvas(color: TokenName) { /* ... */ }
```

JSON estruturado também disponível:

```ts
import data from '@viverdeia/design-system/tokens.json' assert { type: 'json' };
// { $version, $generated, $source, tokens: Token[] }
```

## 6 · SSR · cuidados

- **Toasts em SSR:** o stack vive em estado de cliente · monte `<ToastStack>` em um Client Component ancestral.
- **`useId()`:** todos os componentes da library usam `useId` (não `Math.random()`) então hydration é estável.
- **CSS-in-JS conflito:** a library usa CSS plano · não tem conflito com styled-components, Tailwind etc.

## 7 · Gotchas comuns

| Sintoma | Causa | Fix |
|---|---|---|
| Tipografia "errada" no canvas | Geist não carregada | Carregue via `next/font` e mapeie `--via-font*` no CSS |
| Glass não tem blur | `backdrop-filter` bloqueado por algum CSS | Garanta `isolation: isolate` no parent · sem `overflow: hidden` quebrando layer |
| Cores sumiram após `--via-navy` override | Você sobrescreveu sem ter importado `tokens.css` antes | Ordem importa: `tokens.css` → seu CSS global |
| Componente "client-only" quebra em static export | DatePicker/Modal sendo importados em RSC | Marque o arquivo consumidor com `'use client'` |
