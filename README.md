# Viver de IA · Design System

Site de referência + library React do design system da Viver de IA. Marca editorial, engenharia de precisão.

- **49 páginas vivas** documentando fundamentos, glass, iconografia, componentes, padrões e páginas-modelo.
- **15 componentes core** exportáveis como `@viverdeia/design-system` — drop-in em Nina, Iris, ExecSeats, plataforma.
- **Visual regression suite** com 96 rotas × 2 viewports (192 testes Playwright).
- **TypeScript estrito** + dark mode + code-splitting por rota.

---

## Stack

- **Vite 8** + React 19 + TypeScript 6
- **react-router-dom 7** com lazy routes
- **lucide-react** pra iconografia (sparkles banido)
- **bun** como package manager + runner
- **Playwright** pra visual regression

---

## Scripts

| comando | o que faz |
|---|---|
| `bun dev` | dev server em `:5173` com HMR |
| `bun run build` | tsc + vite build → `dist/` |
| `bun run build:lib` | gera o pacote `@viverdeia/design-system` em `dist/lib/` |
| `bun run preview` | serve a build de produção localmente |
| `bun run lint` | ESLint estrito (`noUnusedLocals` + `noUnusedParameters`) |
| `bun run test:visual` | roda 192 testes de regressão visual contra baselines |
| `bun run test:visual:update` | regenera baselines depois de mudança intencional |
| `bun run test:visual:report` | abre HTML report do último run |

---

## Estrutura

```
src/
  layout/        · Shell + Header + Sidebar + Footer
  components/    · Pieces auxiliares (BrandLogo, ThemeToggle, RouteLoader, docs/)
  pages/         · 49 páginas (Home, foundations, glass, iconography,
                   components, patterns, showcase, guidelines)
  lib/           · 15 componentes publicáveis (Button, Pill, Card, Input,
                   Avatar, Icon, Toast, Tooltip, Modal, Tabs, Switch,
                   Checkbox, RadioGroup, Select, Progress)
  styles/        · tokens.css (variáveis CSS · 4 camadas semânticas)
  data/          · nav.tsx, dados estáticos
  assets/        · logos (PNG VIA monograma + wordmark)

tests/           · Visual regression suite (Playwright)
  routes.ts        · lista declarativa de 96 rotas testadas
  visual.spec.ts   · 1 test por rota × 2 viewports
  visual.spec.ts-snapshots/  · baselines PNG

scripts/
  finalize-lib.mjs   · pós-build da library: gera package.json publicável

tokens.css         · 300+ tokens semânticos (cores, type, spacing, glass, mesh)
```

---

## Filosofia (não-negociável)

1. **Light-first** · navy + greys + black. Dark mode é override, não default visual.
2. **Liquid glass usado com intenção** · `backdrop-filter: blur(20px) saturate(140%)` só em surfaces que pedem profundidade real.
3. **Gold é acento singular** · max 1-3 elementos por section. Justificado como semântico (premium/destaque), singular (só um por viewport), ou sistêmico (chart accent).
4. **Pills canônicas** · 11px lowercase, padding 4px 11px, nowrap, sem caps lock, sem dot decorativo, sem bolinha verde de status.
5. **Coral só pra destrutivo real** · cancelar plano, error 500, dialog destructive. Nunca pra warning casual.
6. **Sparkles banido** · cliché global de IA desde 2023. Use Award · Compass · Crown · Rocket · Layers conforme o contexto.
7. **Voz de operador experiente, não guru-bro** · PT-BR direto, "você", infinitivo, sempre com número ou citação. Sem exclamações, emoji, unicode decorativo.

Mais detalhes em [`src/pages/foundations/Philosophy.tsx`](src/pages/foundations/Philosophy.tsx) e na skill `/viver-de-ia-design`.

---

## Library publicável

A pasta `src/lib/` é a fundação de produção. Roda `bun run build:lib` pra gerar `dist/lib/` com:

- ESM + CJS bundles
- `index.d.ts` com tipos TypeScript
- `tokens.css` standalone
- `package.json` configurado como `@viverdeia/design-system`

Importação consumidora:

```ts
import { Button, Pill, Modal, Switch, Progress } from '@viverdeia/design-system';
import '@viverdeia/design-system/tokens.css';

function App() {
  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Renovar plano">
      <Switch label="Notificações" defaultChecked />
      <Progress value={72} label="Onboarding" showValue />
      <Button variant="primary">Confirmar</Button>
    </Modal>
  );
}
```

Documentação completa de cada componente em [`src/lib/README.md`](src/lib/README.md).

---

## Visual regression — como usar

A suite protege o sistema contra regressões silenciosas (tipo o bug do `tokens.css` que rebentou tudo branco-em-branco em mai/26).

**Fluxo de trabalho:**

```bash
# 1. Antes de mexer
bun run test:visual          # confirma que está limpo

# 2. Mexe no design (CSS, tokens, componentes…)

# 3. Roda de novo
bun run test:visual

#    Se falhar e era intencional:
bun run test:visual:update   # regenera baselines

#    Se falhar e era acidente:
bun run test:visual:report   # abre diff lado-a-lado pra debug
```

**Adicionando uma rota nova:** edita `tests/routes.ts` adicionando ao array. Próximo `:update` cria a baseline.

---

## Filosofia de manutenção

- **Editor de pull request** > revisor. Cada mudança no DS implica:
  - Atualizar a página de referência (`src/pages/*`)
  - Atualizar a library (`src/lib/*`) se o componente core mudou
  - Atualizar a baseline visual (`test:visual:update`) se mudou pixel
  - Atualizar a skill `/viver-de-ia-design` se mudou regra editorial

- **Tokens primeiro, componentes depois.** Nunca hard-code valor. Sempre `var(--via-*)`.

- **Polish é a especificação.** Padrão Linear/Stripe/Notion/Vercel. Se não chegou nesse nível, não tá pronto.

---

## Histórico

- Inicializado em maio/2026 como fundação compartilhada pra todos os produtos Viver de IA.
- Cristalizado na skill `/viver-de-ia-design` (`~/.claude/skills/viver-de-ia-design/`).

---

São Paulo · Established 2023 · Geist (Vercel) + Liquid Glass
