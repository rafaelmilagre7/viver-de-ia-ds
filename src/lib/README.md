# @viverdeia/design-system

A library React do design system da Viver de IA. 47 componentes core com TypeScript types, ARIA correto, dark mode aware, sem dependências runtime além de React + lucide-react.

Drop-in pra qualquer projeto Viver de IA: Nina, Iris, ExecSeats, plataforma. Mesmo visual editorial, zero copy-paste.

---

## Instalação

```bash
bun add @viverdeia/design-system
# ou: npm install @viverdeia/design-system
```

Importe os tokens CSS uma única vez no root da aplicação (`main.tsx`/`App.tsx`):

```ts
import '@viverdeia/design-system/tokens.css';
```

Isso ativa as 300+ variáveis CSS `--via-*` (cores, type, spacing, glass, mesh, motion). Sem isso, os componentes caem em fallbacks razoáveis mas perdem a assinatura visual.

---

## Componentes

### Base

| Componente | Para que serve |
|---|---|
| [`<Button>`](#button) | CTA primário/secondary/ghost/destructive/accent · 3 sizes · loading · iconLeft/Right |
| [`<Pill>`](#pill) | Tag/badge editorial 11px lowercase · 5 variants (default · attn · churn · success · live) |
| [`<Card>`](#card) | Container glass · 5 variants (default · glass · featured · atmospheric · dark) |
| [`<Input>`](#input) | Field editorial · 3 variants × 3 sizes · label + hint + error + aria-invalid |
| [`<Avatar>`](#avatar) | Iniciais auto-derivadas · 5 sizes · status dot (online · away · busy · offline) |
| [`<Icon>`](#icon) | Wrapper consistente pra Lucide · tones × surfaces |

### Overlay

| Componente | Para que serve |
|---|---|
| [`<Toast>` + `useToasts()`](#toast) | Stack de notificações · 4 variants · auto-dismiss · action |
| [`<Tooltip>`](#tooltip) | Tooltip editorial · 4 lados · hover + focus aware · ARIA describedby |
| [`<Modal>`](#modal) | Dialog · 3 sizes · ESC + focus trap + scroll lock + scrim glass |
| [`<Tabs>`](#tabs) | underline | pills · controlled/uncontrolled · keyboard arrow + Home/End · ARIA tablist |

### Form (recém-adicionados)

| Componente | Para que serve |
|---|---|
| [`<Switch>`](#switch) | Toggle on/off · `role="switch"` · 2 sizes |
| [`<Checkbox>`](#checkbox) | Boolean + estado indeterminate |
| [`<RadioGroup>`](#radiogroup) | Escolha única com options[] · ARIA radiogroup |
| [`<Select>`](#select) | Combobox editorial · listbox custom · ESC + click outside fecha |
| [`<Progress>`](#progress) | Barra de progresso · 3 tones × 3 sizes · ARIA progressbar |

---

## Reference

### `<Button>`

```tsx
import { Button } from '@viverdeia/design-system';
import { ArrowRight, Mail } from 'lucide-react';

<Button variant="primary" size="md" iconRight={<ArrowRight size={13} />}>
  Continuar
</Button>

<Button variant="destructive" loading>
  Cancelando…
</Button>

<Button variant="ghost" iconLeft={<Mail size={13} />}>
  Email-first
</Button>
```

**Props essenciais:** `variant: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'accent'` · `size: 'sm' | 'md' | 'lg'` · `loading?: boolean` · `iconLeft?: ReactNode` · `iconRight?: ReactNode` · `fullWidth?: boolean` · todos os `ButtonHTMLAttributes`.

### `<Pill>`

```tsx
<Pill variant="default">em produção</Pill>
<Pill variant="attn">requer atenção</Pill>
<Pill variant="churn">cancelado</Pill>
<Pill variant="success">concluído</Pill>
<Pill variant="live">ao vivo</Pill>
```

Canônica: 11px lowercase, padding 4px 11px, nowrap, sem caps lock, sem dot. `live` ganha italic Geist Display + coral pulse. **Semântica:** `attn` (accent) = atenção/warning · `churn` (coral) = destrutivo/perda · `success` (navy + check) = concluído.

### `<Card>`

```tsx
<Card variant="default" hoverable>
  <h3>Tokens da marca</h3>
  <p>Cores, tipografia, espaçamento…</p>
</Card>

<Card variant="featured" as="article">
  <h3>O DS em produto</h3>
  <p>Marketing site, Leaders AI, área do aluno.</p>
</Card>

<Card variant="dark">
  <h3>Conteúdo em superfície escura</h3>
</Card>
```

**Variants:** `default` (white hairline) · `glass` (translucent blur) · `featured` (accent strip) · `atmospheric` (mesh navy bg) · `dark` (full navy).

### `<Input>`

```tsx
<Input
  label="Email"
  type="email"
  placeholder="você@empresa.com"
  hint="Usamos só pra confirmar a inscrição."
/>

<Input
  label="CNPJ"
  variant="solid"
  size="lg"
  error="CNPJ não encontrado na Receita."
/>
```

### `<Avatar>`

```tsx
<Avatar alt="Bruno Lemos" size="md" status="online" />
<Avatar alt="Mateus Garcia" size="lg" src="/photos/mateus.jpg" />
```

Iniciais derivadas automaticamente do `alt` se sem `src`. Status dot navy/accent/coral/grey conforme `online | away | busy | offline`.

### `<Icon>`

```tsx
import { Award } from 'lucide-react';

<Icon tone="navy" surface="soft"><Award /></Icon>
<Icon tone="inverse" surface="navy"><Award /></Icon>
```

Wrapper que mantém consistência visual em todos os ícones Lucide do sistema. Passa o ícone como `children`. **Tones:** `default | soft | navy | accent | coral | inverse`. **Surfaces:** `none | soft | glass | navy | accent`.

### `<Toast>` + `useToasts()`

```tsx
import { ToastStack, useToasts, Button } from '@viverdeia/design-system';

function App() {
  const { toasts, push, dismiss } = useToasts();

  return (
    <>
      <Button onClick={() => push({
        variant: 'success',
        title: 'Mentoria confirmada',
        message: 'Quinta 22 · 14h BRT · adicionada ao seu calendário.',
        action: { label: 'Ver agenda', onClick: () => navigate('/agenda') },
      })}>
        Confirmar
      </Button>

      <ToastStack toasts={toasts} onDismiss={dismiss} position="top-right" />
    </>
  );
}
```

**Variants:** `default | success | warning | destructive`. **Position:** `top-right | top-center | bottom-right | bottom-center`. **Duration:** default 4500ms, `0` = sticky.

### `<Tooltip>`

```tsx
<Tooltip content="Adicionar ao calendário" side="top">
  <Button iconLeft={<Calendar size={13} />} />
</Tooltip>
```

`side`: `top | bottom | left | right`. Hover + focus aware (keyboard accessible).

### `<Modal>`

```tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  size="md"
  title="Renovar plano Mentoria"
  description="Próximas 3 cobranças de R$ 6.000"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant="primary">Confirmar renovação</Button>
    </>
  }
>
  <p>Você está prestes a renovar o plano Mentoria por 1 trimestre.</p>
</Modal>
```

ESC fecha · scrim clicável · focus trap · scroll lock. `size: sm | md | lg`.

### `<Tabs>`

```tsx
<Tabs
  variant="underline"
  items={[
    { id: 'overview', label: 'Visão geral', content: <Overview /> },
    { id: 'history', label: 'Histórico', badge: <Pill>12</Pill>, content: <History /> },
    { id: 'settings', label: 'Configurações', content: <Settings /> },
  ]}
/>
```

Controlled (`activeId` + `onChange`) ou uncontrolled (`defaultActiveId`). Keyboard arrow/Home/End. `variant: underline | pills`.

### `<Switch>`

```tsx
<Switch
  label="Notificações por email"
  description="Digest semanal de domingo às 18h."
  checked={notif}
  onChange={(e) => setNotif(e.target.checked)}
/>

<Switch label="Modo compact" size="sm" />
```

Renderiza um `<input type="checkbox" role="switch">` invisível por debaixo, com label + thumb visíveis.

### `<Checkbox>`

```tsx
<Checkbox
  label="Aceito os termos da Mentoria"
  description="Trimestre de 12 sessões, cancelamento livre."
  checked={terms}
  onChange={(e) => setTerms(e.target.checked)}
/>

<Checkbox label="Selecionar todos" indeterminate />
```

Estado `indeterminate` aceito (útil pra "selecionar todos" parcial). Suporta forwardRef.

### `<RadioGroup>`

```tsx
<RadioGroup
  ariaLabel="Plano"
  value={plan}
  onValueChange={setPlan}
  options={[
    { value: 'mensal', label: 'Mensal', description: 'R$ 290/mês' },
    { value: 'anual',  label: 'Anual · 2 meses grátis', description: 'R$ 2.900/ano' },
    { value: 'corp',   label: 'Corporate', description: 'Sob consulta' },
  ]}
/>
```

Controlled (`value` + `onValueChange`) ou uncontrolled (`defaultValue`). `name` opcional pra forms HTML.

### `<Select>`

```tsx
<Select
  label="Mentor primário"
  value={mentor}
  onValueChange={setMentor}
  placeholder="Selecione um mentor"
  options={[
    { value: 'bruno',  label: 'Bruno Lemos · estratégia' },
    { value: 'mateus', label: 'Mateus Garcia · técnico' },
  ]}
  error={mentor === undefined ? 'Campo obrigatório' : undefined}
/>
```

Custom listbox (não nativo) pra controle visual completo. ESC fecha. Click outside fecha. Focus volta pro trigger ao fechar. `size: sm | md`.

### `<Progress>`

```tsx
<Progress value={72} label="Onboarding · módulo 03" showValue />
<Progress value={40} label="Streak" tone="accent" size="lg" />
<Progress value={95} label="Uso de plano" tone="coral" />
```

**Tones:** `navy | accent | coral`. **Sizes:** `sm (4px) | md (6px) | lg (10px)`. `value` clamped a 0-100. ARIA `role="progressbar"` correto.

---

## Tokens disponíveis

Importando `tokens.css` você ganha acesso direto a:

- **Cores:** `--via-navy`, `--via-navy-deep`, `--via-accent`, `--via-coral`, `--via-gray-50` até `--via-gray-900`
- **Transparências navy:** `--via-navy-04` até `--via-navy-80` (alpha stops)
- **Texto:** `--via-text-primary`, `--via-text-body`, `--via-text-muted`, `--via-ink-2`, `--via-ink-3`
- **Type:** `--via-font` (Geist), `--via-font-display`, `--via-font-mono`, type scale 11/12/14/16/24/40/56/80px
- **Spacing:** `--via-space-1` (4px) até `--via-space-32` (128px)
- **Radii:** `--via-radius-xs` (4px) até `--via-radius-pill` (999px)
- **Sombras:** `--via-shadow-xs` até `--via-shadow-xl`, `--via-shadow-glass-light`, `--via-shadow-glass-dark`
- **Glass:** `--via-blur-sm/md/lg/xl` (combina blur + saturate)
- **Mesh:** `--via-mesh-light`, `--via-mesh-navy` (signature atmospheres)
- **Motion:** `--via-ease`, `--via-t-fast/t/t-slow`

Use sempre `var(--via-*)` em CSS — nunca hard-code o valor.

---

## Dark mode

Toggle pelo `data-theme="dark"` no `<html>`:

```ts
document.documentElement.dataset.theme = 'dark'; // ou 'light'
```

Auto-detecta via `prefers-color-scheme` quando não há `data-theme` setado.

Componentes da library reagem automaticamente — todas as cores semânticas viram pelos tokens.

---

## Filosofia editorial

Os 7 não-negociáveis estão no [README do repo](https://github.com/viverdeia/design-system/tree/main#filosofia-não-negociável). TL;DR:

1. **Light-first** · navy + greys + black
2. **Glass com intenção** · não decorativo
3. **Accent como acento singular** · max 1-3 por section
4. **Pills canônicas** · 11px lowercase, sem caps lock, sem dot
5. **Coral só pra destrutivo real**
6. **Sparkles banido** · cliché global de IA desde 2023
7. **Voz de operador, não guru-bro** · PT-BR direto

---

## Versionamento

`0.x` durante a fase de adoção interna em Nina/Iris/ExecSeats/plataforma. `1.0.0` quando estável e usado por 2+ produtos em produção.

Breaking changes em minors até `1.0.0`. Após isso, semver estrito.

---

## License

MIT · Viver de IA · 2026
