# Consumindo `@viverdeia/design-system` em Remix

Cobre Remix v2+ (Vite-based) e o legacy classic compiler. SSR-first · cuidados específicos abaixo.

---

## 1 · Instalar

```bash
bun add @viverdeia/design-system lucide-react
```

## 2 · Servir o CSS · `links()` export

Remix carrega CSS via convenção `links()`. Em `app/root.tsx`:

```tsx
// app/root.tsx
import type { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import tokensHref from '@viverdeia/design-system/tokens.css?url';
import dsHref from '@viverdeia/design-system/style.css?url';
import globalsHref from './globals.css?url';

export const links: LinksFunction = () => [
  // ordem importa · tokens primeiro, library depois, seus globals por último
  { rel: 'stylesheet', href: tokensHref },
  { rel: 'stylesheet', href: dsHref },
  { rel: 'stylesheet', href: globalsHref },
];

export default function App() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

> No classic compiler (sem Vite), pode importar como string path `/build/style.css` direto.

## 3 · Geist via `<link>` preconnect

```tsx
// app/root.tsx · adicionar mais entries no links()
export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap',
  },
  // ...os 3 stylesheets de antes
];
```

E em `app/globals.css`:

```css
:root {
  --via-font:         'Geist', system-ui, sans-serif;
  --via-font-display: 'Geist', system-ui, sans-serif;
  --via-font-mono:    'Geist Mono', ui-monospace, monospace;
}
```

## 4 · SSR · client-only components

Componentes com state (Modal, Drawer, DatePicker, Command, useToasts) renderizam no servidor mas só ficam interativos no cliente. Não precisa de `ClientOnly`, mas:

- **Toasts em loaders/actions:** não dá pra criar toast no servidor — o estado é do cliente. Padrão Remix: use `useActionData()` + `<Alert>` para feedback persistente, e `useToasts()` só pra ações cliente-side.

```tsx
// app/routes/dashboard.tsx
import { json, type ActionFunctionArgs } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import { Alert, Button } from '@viverdeia/design-system';

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const ok = await saveSomething(form);
  return json({ ok, message: ok ? 'Salvo' : 'Falhou ao salvar' });
}

export default function Dashboard() {
  const data = useActionData<typeof action>();
  return (
    <Form method="post">
      {data?.message && (
        <Alert tone={data.ok ? 'success' : 'danger'}>{data.message}</Alert>
      )}
      <Button type="submit">Salvar</Button>
    </Form>
  );
}
```

## 5 · `useToasts` em layout

Coloque o `ToastStack` no `root.tsx` ou num layout shared, e exponha `push` via context se múltiplas rotas precisarem disparar toasts.

```tsx
// app/components/ToastProvider.tsx
import { createContext, useContext } from 'react';
import { useToasts, ToastStack } from '@viverdeia/design-system';

const Ctx = createContext<ReturnType<typeof useToasts> | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const t = useToasts();
  return (
    <Ctx.Provider value={t}>
      {children}
      <ToastStack toasts={t.toasts} onDismiss={t.dismiss} />
    </Ctx.Provider>
  );
}

export const useToast = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useToast outside ToastProvider');
  return c;
};
```

Wrap no root:

```tsx
// app/root.tsx
<body>
  <ToastProvider>
    <Outlet />
  </ToastProvider>
  ...
</body>
```

## 6 · Tokens em JS

```ts
import { tokens, cssVar } from '@viverdeia/design-system/tokens';

export async function loader() {
  return json({
    themeColor: tokens['via-navy'], // ok no server, valor literal estático
  });
}
```

JSON puro também funciona pra loaders:

```ts
import data from '@viverdeia/design-system/tokens.json' assert { type: 'json' };

export async function loader() {
  return json({ tokens: data.tokens });
}
```

## 7 · Dark mode (sem flash)

Remix tem o pattern `theme cookie` · combine com `data-theme`:

```tsx
// app/root.tsx
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: { request: Request }) {
  const cookie = request.headers.get('cookie') ?? '';
  const match = /theme=(light|dark)/.exec(cookie);
  return { theme: (match?.[1] as 'light' | 'dark') ?? 'light' };
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  return (
    <html lang="pt-BR" data-theme={theme}>
      ...
    </html>
  );
}
```

Zero flash · o HTML já vem com o tema correto.

## 8 · Build · `remix vite:build`

A library é puro ESM + CSS · sem compilation steps Remix-specific. Build padrão funciona:

```bash
bunx remix vite:build
```

## 9 · Gotchas comuns

| Sintoma | Causa | Fix |
|---|---|---|
| Hydration mismatch | `useId` vs server timing | A library usa `useId()` nativo · se mismatch acontecer, é problema no seu código consumidor (Date.now, Math.random) |
| CSS quebrando ordem após HMR | Vite plugin ordering | Garanta que `links()` mantém a ordem · tokens → ds → seu |
| Imports `?url` falham em classic compiler | Sem Vite | Use `links: [{ rel: 'stylesheet', href: '/build/style.css' }]` ou migre pra Vite |
| Fontes piscando | Geist carrega depois | Use `display=swap` + preconnect (acima) |
