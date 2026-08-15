---
name: viver-de-ia-design
description: Use para gerar interfaces e artefatos da marca Viver de IA — mentoria + comunidade + Leaders AI Conference (PT-BR). Inclui design tokens (paleta RESTRITA navy-dominant + cinza secundário + coral só pra destrutivo · sem gold/amarelo/roxo/cyan em nenhum nível), assinatura liquid glass + atmosphere radial + spring physics, library React interna `@viverdeia/design-system` v0.6.0 (não publicada no npm · DS interno) (**46 componentes de UI + ThemeProvider** em src/lib · 46 API docs Radix-style), theming system 3-camadas (ThemeProvider + useTheme + createThemeOverride), Cmd+K indexado PT-BR/EN, starter `bunx create-viverdeia-app`, **sistema de email de produção à prova de bala** (14 templates react-email em emails/), brand book completo + cobertura email/social/paid ads/landing/commercial/editorial/event + patterns avançados (2FA, pricing comparison, error pages, billing). Use sempre que produzir landing, dashboard, app, plataforma de aluno, deck, mock, e-mail, post social, ad creative, ou qualquer artefato visual da marca.
user-invocable: true
---

# Viver de IA · Design System

Reference site canônico: `viver-de-ia-ds` · `bun dev` → http://localhost:5173
Repo público: https://github.com/rafaelmilagre7/viver-de-ia-ds · site vivo: https://viver-de-ia-ds.vercel.app
Library: `@viverdeia/design-system` v0.6.0 (46 componentes de UI + ThemeProvider · ESM+CJS+types+CSS+tokens)
Starter: `bunx create-viverdeia-app meu-app` (scaffold Vite + React 19 + TS pré-configurado com ThemeProvider)

## ⚠️ REGRA ZERO · LIGHT-FIRST (a mais violada — leia antes de tudo)

**A marca é CLARA. Fundo branco/off-white é o padrão de TUDO** — landing, app, dashboard, card, email, post. Branco + off-white = ~85% de qualquer tela. Navy é a cor da MARCA (texto, CTA, detalhe), **não o fundo da página**.

- **NUNCA entregue peça de fundo escuro por padrão.** Escuro só se o usuário pedir ("versão dark") ou no respiro canônico: **1 seção full-bleed navy por página** (hero imersivo, CTA de fechamento, footer) — o resto claro.
- Dark mode é **modo alternativo do usuário** (ele aperta o botão), não a estética de partida. Em dúvida: claro.
- `<ThemeProvider>` já nasce **claro** por padrão. Só passe `defaultMode="system"` se o usuário quiser seguir o SO.
- Liquid glass **funciona lindamente sobre claro** — é a assinatura da casa. Não escureça a peça "pra o glass aparecer" (ver receita de glass card claro na seção 5).

**Estado atual:** 100% WCAG AA de contraste nos 2 temas · 0 violação séria de a11y. Em código, use SEMPRE tokens semânticos que adaptam claro↔escuro (`var(--via-text-primary|body|muted|soft)`, `var(--via-surface)`, `var(--via-border-soft)`) — nunca hardcode navy/branco em texto/superfície. Link em texto corrido = sublinhado. De-ênfase por cor (token mais suave), não opacity. E-mail trava tudo em claro.

Quando em dúvida, navegue o reference site — é o gabarito visual mais atualizado. Cmd+K abre busca real com keywords PT-BR/EN.

---

## Princípios não-negociáveis

### Cor — paleta RESTRITA navy-dominant editorial

**Os 6 tons permitidos · e SÓ esses:**

1. **Branco** `#FFFFFF` — canvas principal (~85% do peso visual)
2. **Off-white / gray-50** `#F7F8FA` — surfaces alt, paper editorial
3. **Cinzas** gray-100 → gray-900 — hairlines, borders, body text, secondary
4. **Azul escuro / blue** `#1E3A5F` — bordas sobre navy, gradient mid-tone
5. **Navy** `#0A1F3B` — **a única cor de marca** · texto, CTA, surfaces dark (~80% do peso de cor)
6. **Preto** `#000000` — tipografia editorial de peso máximo

**Status semânticos (uso parcimonioso):**

- **Coral** `#B85C5C` — destrutivo real (cancel, payment failed, error 500, churn risk). Nunca decorativo.
- **Success** `#1F8A5B` — só presence dot (online), uptime real, checkmark. Navy-adjacent. Nunca decorativo.

**Token de acento:** `--via-accent` é alias semântico de navy intensificado (não é uma terceira cor). Variantes reais: `--via-accent-deep`, `--via-accent-light`, `--via-accent-soft`, `--via-accent-warm`. Sempre `accent`, nunca `gold` (rename feito em 0.3.0).

**Tokens alpha navy (18 stops reais):**
```
--via-navy-02 -03 -04 -05 -06 -08 -10 -12 -14 -16 -18 -20 -22 -25 -30 -40 -60 -80
```
Use em vez de `rgba(10, 31, 59, X)` hardcoded.

**BANIDO em qualquer nível:**
- ❌ Gold, dourado, amber, amarelo, mostarda, ocre, cream amarelado, bege saturado
- ❌ Gradients "premium" com qualquer stop quente
- ❌ Roxo "IA" (`#7B61FF`), cyan (`#00BCD4`), magenta, neon
- ❌ Verde vibrante de "sucesso" — use navy + ícone check
- ❌ Vermelho saturado — coral suave só pra destrutivo

**Hardcoded hexes proibidos em production**, exceto: brand colors externos (WhatsApp, Google Sign-In), syntax highlighting em code blocks, e library fallback `var(--via-X, #hex)` pra retro-compat. Em SVG, use `style={{ fill: 'var(--via-navy)' }}` (CSS vars funcionam em inline style React), nunca `fill="#0A1F3B"` direto.

### Tokens semânticos pra dark mode (CRÍTICO)

Use tokens semânticos que adaptam automaticamente entre light/dark:

| ❌ NÃO use (hardcoded) | ✅ Use (semântico · adapta dark mode) |
|---|---|
| `var(--via-gray-700)` em text | `var(--via-text-body)` |
| `var(--via-gray-500)` em label | `var(--via-text-muted)` |
| `var(--via-navy)` em link/heading | `var(--via-text-primary)` |
| `var(--via-white)` em bg | `var(--via-bg)` |
| `var(--via-gray-50)` em surface | `var(--via-bg-2)` ou `var(--via-surface)` |

Tokens semânticos reais de texto: `--via-text-primary`, `--via-text-body`, `--via-text-muted`, `--via-text-soft`, `--via-text-faint`, `--via-text-inverse`. Surfaces: `--via-surface`, `--via-surface-elev`, `--via-surface-onnavy`, `--via-bg`, `--via-bg-2`, `--via-bg-3`, `--via-bg-soft`. Bordas: `--via-border-soft`, `--via-border-hairline`, `--via-border-fine`, `--via-border-strong`. Layout (sidebar/header/footer) usando gray hardcoded vira navy-on-navy no dark mode — sempre semântico.

### Pill / chip canônica (regra MÁXIMA)

```css
.vds-pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.004em;
  white-space: nowrap;
  line-height: 1.4;
  background: linear-gradient(180deg, rgba(255,255,255,0.62), rgba(247,248,250,0.42));
  backdrop-filter: blur(8px);
}
```

- **PROIBIDO:** bolinha decorativa em pill que NÃO é status real
- **PROIBIDO:** uppercase 0.10em+ em pills, chips, badges
- **PROIBIDO:** `letter-spacing: 0.16em+ + uppercase + font-weight: 700` (trio bootstrap)

### Live broadcast pill

```jsx
<span className="vds-live-pill">
  <span className="vds-live-rec-dot" /> {/* coral pulsante + ring expansivo */}
  <em>ao vivo</em>
</span>
```

Live minúsculo "ao vivo" — nunca caps lock "AO VIVO". O `<em>` fica RETO (guarda global `em { font-style: normal }` — Geist não tem itálico verdadeiro; ênfase = peso + cor). Dot tem 2 animations simultâneas: scale e ring com opacity fade.

### Tipografia — Geist single family

- **Geist** (variable 100-900) pra TUDO · **Geist Mono** pra código/tokens/timestamps/números
- **ITÁLICO BANIDO** — Geist não tem itálico real; o navegador inclina à força ("Italic morto"). Ênfase editorial = **peso + cor** (`<em>` fica RETO via guarda global `em { font-style: normal }`; em heading, `em` ganha cor mais suave). Nunca escreva `font-style: italic`.
- Letterspacing: corpo `-0.005 a -0.018em` · headings `-0.022 a -0.04em` · mono eyebrows em `0.04-0.08em` (não pill!)
- Pesos: body 400-500 · subtítulo 500-600 · heading 500-600 · CTA 500 (NÃO 700)

### Eyebrow vs Pill (distinção crítica)

| Elemento | Permitido | Proibido |
|---|---|---|
| **Eyebrow** (label sem padding/radius) | uppercase mono 0.04-0.08em · cor ink-3 | uppercase em pill com padding+radius999 |
| **Pill** (chip arredondado com padding) | lowercase 11px peso 500 · `-0.004em` | uppercase 0.10em+ peso 600/700 |

### Voz editorial (operador, não guru)

- PT-BR direto · "você" infinitivo
- Sempre número ou citação atribuída · sem "centenas" genérico
- Sem clichê IA ("revolucione", "transforme", "o futuro chegou")
- Sem emoji decorativo (✨🚀💪🔥) · sem urgência fabricada
- Sentence-case em CTAs · não caps lock

### Sparkles banido

Não use Sparkles, ✨, "AI sparkle". Substituir contextualmente: Compass · Award · Crown · Layers · MessageCircle · Rocket · Gauge.

---

## Padrões editoriais avançados (consolidados em rounds de polish)

### 1. Shine sweep líquido (interativos premium)

Em buttons / cards hoverable / progress / skeleton — light sweep diagonal que cruza no hover:

```css
.elem::after {
  content: '';
  position: absolute;
  top: 0; left: -120%;
  width: 50-65%; height: 100%;
  background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.18-0.22) 50%, transparent 100%);
  transition: left .65-.8s cubic-bezier(.2, .7, .2, 1);
}
.elem:hover::after { left: 120-130%; }
```

### 2. Spring physics (animações orgânicas) — use os tokens de motion

Tokens reais em `tokens.css`:

- `--via-ease-out: cubic-bezier(0.16, 1, 0.3, 1)` — spring suave sem overshoot (transitions · 0.22-0.36s)
- `--via-ease-spring: cubic-bezier(.34, 1.56, .64, 1)` — overshoot (entrada de elementos, checkmarks, radio dots)
- `--via-ease-snap: cubic-bezier(.2, .7, .2, 1)` — resposta rápida (hover/press)
- `--via-ease: cubic-bezier(0.32, 0.08, 0.24, 1)` · durações `--via-t-fast` (120ms) · `--via-t` (180ms) · `--via-t-slow` (360ms)

```css
@keyframes via-modal-in {
  0%   { opacity: 0; transform: translateY(20px) scale(0.94); }
  60%  { opacity: 1; transform: translateY(-2px) scale(1.005); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

### 3. Atmosphere radial (signature do DS)

Cards e cards de componente sempre ganham `::before` com radial gradient sutil:

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(540px 240px at 0% 0%, var(--via-navy-04), transparent 60%),
    radial-gradient(420px 220px at 100% 100%, var(--via-navy-03), transparent 60%);
  pointer-events: none;
  z-index: -1;
  opacity: 0.6;
  transition: opacity .26s ease;
}
.card:hover::before { opacity: 1; }
```

### 4. Sombras — SEMPRE tinta de sombra `--via-shadow-ink-*` (regra dura)

**Toda sombra usa `--via-shadow-ink-03..60`** (navy no claro, PRETO mais denso no escuro — sombra navy sobre fundo navy não eleva nada). **NUNCA** use token de cor que inverte (`--via-navy-XX`, `--via-white`) dentro de `box-shadow` — no dark ele vira **halo branco** em volta do card (o defeito nº 1 que a auditoria matou em 453 camadas). Exceções que NÃO são sombra e ficam como estão: `inset 0 1px 0 var(--via-edge-hi)` (linha de luz do vidro) e anéis `0 0 0 Npx` (focus/pulse).

Stack canônico pra overlays (Modal/Drawer/Popover/Command):

```css
box-shadow:
  0 1px 0 var(--via-edge-hi) inset,                     /* linha de luz no topo */
  0 0 0 0.5px var(--via-navy-10),                        /* hairline (anel, não sombra) */
  0 22-32px 56-72px -16px var(--via-shadow-ink-30),      /* drop deep */
  0 8-16px 18-36px -10px var(--via-shadow-ink-14);       /* drop close */
```

### 5. Liquid glass — receitas CANÔNICAS por token (não faça blur à mão)

**Nunca escreva `blur(Npx) saturate(N%)` com números soltos** — a auditoria achou dezenas de receitas à mão divergindo entre si. Use os tokens-receita:

| Token | Valor | Uso |
|---|---|---|
| `--via-glass-blur` | `blur(24px) saturate(175%)` | cards, painéis, overlays — o padrão de TUDO |
| `--via-glass-blur-bar` | `blur(26px) saturate(185%)` | barras chrome (nav sticky, header, toolbar) |
| `--via-glass-bar` | fundo translúcido real (branco .6 claro / navy .55 escuro) | o `background` das barras |
| `--via-glass-ring` | hairline de vidro | a "borda" do card — nunca borda grossa |
| `--via-glass-shadow` / `--via-glass-shadow-lift` | pilha pronta repouso/hover | sombra do vidro |
| `--via-glass-card`, `--via-glass-card-2`, `--via-glass-sheen` | gradientes de superfície | fundo do vidro |

Regra de aplicação: **vidro em card/painel/barra/metric — NUNCA em tabela densa** (linha de dado pede superfície sólida e leitura; o vidro fica nos cards de métrica ao redor).

#### ⭐ Glass card sobre fundo CLARO (a receita canônica — use por padrão)

Glass **não precisa de fundo escuro**. Card de vidro sobre claro é a assinatura nº1 da marca e o que mais falta nas peças geradas. São **5 camadas** — sem elas vira retângulo branco chapado:

```css
/* 1. a PÁGINA precisa de atmosfera (senão o vidro não tem o que refletir) */
.page { background:
  radial-gradient(ellipse 80% 50% at 15% 0%, var(--via-navy-05), transparent 60%),
  radial-gradient(ellipse 60% 50% at 100% 100%, var(--via-navy-03), transparent 65%),
  var(--via-bg); }

/* 2-4. o CARD: gradiente 3-stop + hairline quase invisível + luz no topo + sombra navy-tinted */
.glass-card {
  position: relative; isolation: isolate;
  border-radius: var(--via-radius-lg);             /* 20px · card padrão */
  padding: 24px;
  background: var(--via-glass-card);               /* gradiente 96→84→58% */
  backdrop-filter: var(--via-glass-blur);          /* receita canônica 24px/175% */
  -webkit-backdrop-filter: var(--via-glass-blur);
  border: var(--via-glass-ring);                   /* hairline de vidro · o card se define pela LUZ */
  box-shadow: 0 1px 0 var(--via-edge-hi) inset,    /* linha de luz no topo */
              0 10px 24px -16px var(--via-shadow-ink-14); /* tinta de sombra, nunca token que inverte */
  transition: transform .26s var(--via-ease-snap), box-shadow .26s ease;
}
/* 5. atmosfera PRÓPRIA do card — é o que dá profundidade */
.glass-card::before {
  content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  background: radial-gradient(540px 240px at 0% 0%, var(--via-navy-04), transparent 60%);
  opacity: .6; transition: opacity .26s ease; pointer-events: none;
}
.glass-card:hover { transform: translateY(-2px); }
.glass-card:hover::before { opacity: 1; }
```

Usando os tokens acima, o dark se resolve sozinho. **Erros que matam o efeito:** página branca chapada sem atmosfera · `background:#fff` sólido sem gradiente · borda grossa/escura em vez de hairline · sombra preta genérica em vez de navy-tinted · esquecer o `inset` de luz e o `::before` radial. Card premium = **luz + profundidade**, não borda. (Em React, `<Card>` já entrega tudo isso.)

### 6. SVG em containers dark + headings

- `<em>` dentro de h1-h4 em container dark (`.via-mesh-navy`, `.via-glass-dark`, `[data-on-dark]`) ganha gradient white automaticamente — regra catch-all em `tokens.css`. Você não precisa se preocupar.
- Ícones SVG dentro de tiles navy: `color: var(--via-white)` (não accent, que vira navy).
- Headings globais usam `:where(h1,h2,h3,h4) { color: var(--via-text-primary) }` (specificity 0) — qualquer container que declare `color:#fff` ganha por cascata. Não precisa override h2 em cards dark.

### 7. prefers-reduced-motion

Sempre respeitar — animações de entrada/pulse/shine desligam sob `@media (prefers-reduced-motion: reduce)`.

### 8. Cantos generosos — escala de raio (parente > filho)

`--via-radius-xs` 6 · `-sm` 10 · `-md` 14 · `-lg` 20 (**card padrão**) · `-xl` 28 · `-2xl` 40 · `-pill` 999. Regras: **filho um degrau abaixo do pai** (card lg → chip interno md); canto concêntrico = `calc(raio-do-pai - 1px)` quando encostado na borda; e-mail mantém px cru (cliente de e-mail não resolve `var()`).

### 9. PADRÕES BANIDOS (cara de IA — tolerância zero)

1. **Barra/linha lateral colorida** em card/box/item — nos 3 mecanismos: `border-left` colorido, `::before` de 2-4px à esquerda, `box-shadow inset` horizontal. É o padrão que o Rafael mais odeia. A ênfase vem do vidro + tipografia, nunca de barrinha.
2. **Anel/halo colorido em avatar** — status mora SÓ no dot (online = verde sóbrio `--via-success`, demais = navy; offline recua por opacidade), nunca em anel ao redor da foto.
3. **Semáforo verde/vermelho genérico** em pills/badges que não são status real.
4. **Bolinha decorativa** em pill que não é status.
5. **CAPS LOCK + tracking largo em botão** (botão = sentence case peso 500).
6. **Superfície chapada** onde cabe vidro · **borda grossa** como contorno de card (hairline + luz).
7. Sparkles/emoji decorativo · dourado/amarelo/roxo/cyan · fundo escuro como superfície de trabalho (light-first!).
8. **Itálico sintético** (seção Tipografia) · gradiente em barra de série única · 3D/gloss em gráfico.

### 10. Dataviz — régua de leitura (contraste perfeito entre séries)

Paleta de série própria (navy puro não sustenta 2+ séries — vira cinza): **`--via-data-1`** `#2E6FC4` e **`--via-data-2`** `#7FB0EE` no claro; no escuro usam `--via-data-1-dark` `#5C9BEA` / `--via-data-2-dark` `#2E6FC4`. Grade/eixo/tinta: `--via-data-grid/axis/ink`.

- **1 série** = sem legenda (título já diz o quê).
- **2 séries** = cor + **segundo canal obrigatório** (tracejado/hachura/marcador) + rótulo direto na linha — nunca só cor.
- **3+ séries** = small multiples (painéis pareados), não espaguete.
- **UM eixo só** — eixo duplo é banido (inclusive escala dupla escondida entre direções).
- Barra **ancorada no zero** · projeção **tracejada** · texto SEMPRE em token de texto (nunca na cor da série) · verde/vermelho reservado pra status real, não pra "subiu/desceu" decorativo (delta usa `.via-delta--up/down/flat` do data.css).
- Fill de progresso no DARK: rampa clara `--via-data-2-dark → --via-data-1-dark` (navy fixo lê INVERTIDO — feito parece faltante).

### 11. Camadas prontas pra HTML cru — `surfaces.css` + `data.css` (nesta skill)

Pra artefato HTML sem React (Lovable, protótipo, relatório), esta skill traz duas folhas prontas — importe junto com `colors_and_type.css`:

- **`data.css`** (tabelas/números/finanças): `.via-table-wrap` + `.via-table` (variações `--sticky/--compact/--roomy`) · `.via-num` (tabular, alinhado à direita) · `.via-row-total` / `.via-row-group` · `.via-cell-sub` · `.via-delta--up/down/flat` · `.via-bar` · `.via-metric` (+`--atmos`) · `.via-metric-grid` · `.via-spark` (+`--down/--projected`). Regra: **tabela densa SEM vidro; vidro nos cards de métrica ao redor**.
- **`surfaces.css`** (controles/acabamento): `.via-pill-link` (+`--solid/--on-dark`) · `.via-row-card` · `.via-tile` (+`--atmos/--lift`) · `.via-meta-chip` (+`--mono`) · `.via-bar-glass`. Todo controle tem `:hover/:active/:focus-visible` prontos.

### 12. Fluidez e material (doutrina Apple/WWDC adotada 29/Jul)

- **Feedback no apertar, não no soltar** — todo interativo tem `:active` instantâneo (`transform: scale(0.97)` ou tom mais fundo). Esperar o clique completar pra reagir = interface morta.
- **Vidro claro NUNCA empilha sobre vidro claro** — legibilidade colapsa. Card de vidro dentro de painel de vidro: o de dentro vira superfície sólida (`--via-surface`) ou tinta rasa.
- **Vibrancy: texto sobre vidro pede mais contraste** — peso um passo acima e token de texto mais forte do que usaria em superfície sólida; cor de destaque mora em camada sólida (pill/botão), nunca solta no vidro.
- **Materializar, não só aparecer** — vidro que entra em cena (modal, popover) anima blur + scale juntos (o material "chega"), não fade de opacidade seco.
- **Borda de rolagem, não régua dura** — onde conteúdo passa por baixo de chrome sticky, prefira máscara de fade/blur no encontro em vez de `border-bottom` de 1px permanente.
- **Acessibilidade de material é AUTOMÁTICA nos tokens**: `prefers-reduced-transparency` solidifica todo o vidro (blur off + superfície sólida) e `prefers-contrast: more` engrossa a borda pra 0.4/0.45 — já resolvido em `colors_and_type.css`, nenhum componente precisa tratar. Não desfaça isso com `backdrop-filter` literal fora dos tokens.

**Física de gesto (motor canônico da library — 29/Jul):**
- A library tem motor de mola próprio (`src/lib/_shared/spring.ts` + `useDragDismiss.ts`) na linguagem da Apple: **damping ratio** (1.0 = sem quique · ~0.8 = quica leve, SÓ após gesto com embalo) + **response** (segundos até o alvo; não é "duração" — o assentar emerge). Valores que a Apple usa e o DS adotou: mover = 1.0/0.4 · drawer/sheet = 0.8/0.3.
- **Drawer, Sheet, Lightbox e Toast já vêm com o gesto completo**: arrasto 1:1 respeitando onde agarrou, histerese de 10px (clique continua clique), soltura decidida pela PROJEÇÃO do momentum (flick curto fecha; arrasto lento e curto volta), mola recebe a velocidade do dedo (sem emenda), rubber-band no sentido contrário, agarrar no meio da animação re-captura do valor vivo, saída por X/ESC animada pela mesma mola. Não reimplemente nada disso à mão.
- Em app React FORA da library (Lovable etc.), a tradução pra Framer Motion/Motion: `type: 'spring'` com `bounce: 0` por padrão e `bounce: 0.2` só após flick; `duration` ≈ response. Nunca anime gesto com transition CSS de duração fixa — não dá pra agarrar no meio.
- Anime SÓ `transform` e `opacity` (compositor); nunca `left/top/width/height` em keyframe.
- Menus/balões escalam DA ORIGEM (transform-origin apontando pro gatilho conforme o lado), nunca do próprio centro.

### 13. Mockup dentro de peça — interior FIXA as próprias cores

Mockup de tela/post/papel/QR/e-mail dentro de uma página **pina as próprias cores** (hex/rgba fixos) — nunca herda tokens adaptativos do tema, senão o interior "vira dark" junto com a página e o texto some. Chrome de plataforma de terceiros (WhatsApp/Instagram/YouTube) fica **fiel à plataforma** (verde do WhatsApp é do WhatsApp); só o conteúdo VIA dentro segue a marca.

---

## Library `@viverdeia/design-system` v0.6.0 (interna · não publicada no npm)

### Como consumir em projeto interno

O DS é **referência interna · não publica no npm** (decisão de marca · `package.json` raiz é `private`). Pra usar em outro projeto: clone o repo e gere o bundle local com `bun run build:lib` (produz o dist `@viverdeia/design-system` via `finalize-lib.mjs`), depois referencie por caminho local (`file:../viver-de-ia-ds/dist`). `lucide-react` é peer dependency. Alternativa leve: copie só `tokens.css` + `style.css`, ou use o kit universal (`bun run kit`).

```tsx
import '@viverdeia/design-system/styles.css';
import { ThemeProvider, Button, Pill, Card, DataTable, useToasts } from '@viverdeia/design-system';

// Em React, sempre envelopar o root com ThemeProvider (anti-FOUC + persiste tema)
<ThemeProvider>
  <App />
</ThemeProvider>
```

Tokens em JS:

```ts
import { tokens, cssVar, type TokenName } from '@viverdeia/design-system';
tokens['via-navy'];          // '#0A1F3B'
cssVar('via-radius-lg');     // 'var(--via-radius-lg)'
```

> Nota de distribuição: a lib **não vai pro npm por decisão de marca** (DS interno · sem release workflow). Os exemplos de import acima valem depois de linkar o dist local gerado por `bun run build:lib`.

### 46 componentes de UI (9 categorias) + ThemeProvider

- **Base (6):** Button · Pill · Card · Input · Avatar · Icon
- **Overlay (5):** Toast · Tooltip · Modal · Tabs · Popover
- **Form (5):** Switch · Checkbox · RadioGroup · Select · Progress
- **Utility (5):** Drawer · Spinner · Skeleton · Breadcrumb · Pagination
- **Composto (5):** Accordion · Stepper · EmptyState · Combobox · DropdownMenu
- **Avançados (5):** Command (Cmd+K) · DatePicker (pt-BR) · Slider (range) · Alert (banner) · DataTable (sortable)
- **Premium (5):** HoverCard · OTPInput (2FA · paste detect) · TagInput · Calendar (markers) · Carousel (touch swipe)
- **Mobile-first (5):** MultiSelect · DateRangePicker · TimePicker · ContextMenu (right-click) · Sheet (bottom sheet)
- **Especializados (5):** TreeView (ARIA tree) · Splitter · VirtualList (10000+ rows) · Lightbox · ColorPicker

Mais `ThemeProvider` (componente exportado) = **47 símbolos de componente** no barrel. Cada um dos 46 componentes de UI tem rota `/api/{nome-em-kebab}` no reference site (46 API docs · estilo Radix com anatomy + props + examples + a11y).

### Variantes canônicas

- `Button.variant`: `primary | secondary | ghost | destructive | accent`
- `Pill.variant`: `default | attn | churn | live | success`
- `Icon.tone`: `default | soft | navy | accent | coral | inverse` · `Icon.surface`: `none | glass | navy | accent`
- `Progress.tone` / `Slider.tone`: `navy | accent | coral`
- `Alert.tone`: `info | attn | danger | success`
- `Skeleton.variant`: `text | circle | rect`

Sempre `accent`, nunca `gold`.

---

## Theming system (3 camadas)

CSS-first · tokens `--via-*` respondem a `[data-theme]` no `<html>`.

**Camada 1 · Tokens diretos:**
```css
.my-card { background: var(--via-surface); color: var(--via-text-primary); }
```

**Camada 2 · anti-FOUC inline (no `<head>` antes do bundle):**
```html
<script>(function(){var s=localStorage.getItem('via-theme');var sys=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=s&&s!=='system'?s:sys;})();</script>
```
```ts
import { applyTheme } from '@viverdeia/design-system';
applyTheme('dark');
```

**Camada 3 · React-aware:**
```tsx
import { ThemeProvider, useTheme } from '@viverdeia/design-system';
<ThemeProvider><App /></ThemeProvider>
// useTheme() → { theme, mode, setMode, toggle } · funciona até sem Provider (lê DOM via MutationObserver)
```

**Camada 4 · white-label (raro):**
```ts
import { createThemeOverride } from '@viverdeia/design-system';
const css = createThemeOverride({ '--via-navy': '#0F2A4E' }, { scope: 'light' });
```
**ATENÇÃO:** paleta restrita é contrato de marca. Override pra gold/yellow/purple **viola o DS**. Só pra cliente white-label legítimo ou ajuste sutil de sub-brand.

---

## Sistema de email de PRODUÇÃO (à prova de bala · v0.6)

Emails de verdade que **não quebram no inbox** (Gmail, Outlook, Apple Mail). Vivem em `emails/` (react-email), renderizam pra `public/emails/*.html` via `bun run build:emails`, e aparecem ao vivo em `/patterns/email`. Distinto da galeria editorial de mockups — estes são os **enviáveis**.

**14 templates de produção:** `welcome` · `welcome-plataforma` (primeiro acesso à plataforma) · `enrollment` (confirmação de turma) · `billing` (fatura · coral só em atraso) · `nps` · `digest` (resumo semanal) · `event-invite` · `recap` (pós-evento) · `drip` (nurture) · `lancamento` · `oferta` · `churn` (sumiço) · `winback` (recuperação) · `urgent-ops` (alerta de sistema). Voz por contexto, sem dark pattern.

**Regras invioláveis de email (≠ web):**
- **Tabela + estilo inline**, ~600px, `<102KB`. Zero flex/grid/`backdrop-filter` (clientes descartam).
- **CTA navy SÓLIDO** (`background-color`) — degradê puro some no Outlook.
- **Liquid glass simulado** OK (hero navy + painéis frosted + CTA glossy), mas **todo `background-image: gradient` precisa de `background-color` sólido de fallback** na mesma regra → Outlook mostra sólido, Apple Mail/Gmail mostram o brilho.
- **Logo = lockup pequeno** (~18px) em URL absoluta. Trava modo claro (`color-scheme: light only`). Preheader sempre.
- A IA escreve só o **editorial** (assunto, headline, corpo); o motor renderiza o HTML.

```ts
import { render } from '@react-email/render';
import WelcomeEmail from 'emails/welcome';
const html = await render(<WelcomeEmail firstName="Marina" turma="Operadores · T08" daysToStart={14} platformUrl="https://app.viverdeia.ai" />);
await resend.emails.send({ from: 'Viver de IA <oi@viverdeia.ai>', to, subject: 'tua vaga tá confirmada · bora começar?', html });
```

---

## Patterns canônicos avançados

Em `/patterns/*` — todos com fluxo interativo + princípios editoriais:

- **`/patterns/two-factor`** · 2FA setup · 4 steps (método → verify → backup → done) · OTPInput de 6 dígitos
- **`/patterns/pricing-comparison`** · 3 tiers × features agrupadas · recommended sem grito · CTA por coluna
- **`/patterns/errors`** · 404 · 403 · 500 · maintenance · copy honesta (sem 🤖 oops · sem dark pattern)
- **`/patterns/billing`** · checkout em steps · resumo lateral sticky · sem countdown manipulativo

**Princípios herdados:** resumo sempre visível (`<aside sticky>`) · voltar não perde dados · sem dark pattern (countdown/scarcity falsa/defaults manipulativos) · confirmação textual antes de submit. Junto com os patterns anteriores: `cancellation`, `auth-flow`, `onboarding`, `dashboard`, `lesson-player`, `cohort`, `curriculum`, etc.

---

## Cmd+K real · indexação + recents

`src/data/searchIndex.ts` — busca de verdade sobre o nav + 46 API docs:
- Keywords aliases PT-BR + EN ("paleta", "dropdown", "2fa", "sortable", "preço" → color, select, two-factor, data-table, pricing)
- Scoring token-AND com pesos (label exato > startsWith > contains > keyword > description)
- Recents em localStorage · agrupamento por categoria · ARIA combobox/listbox · accent/case insensitive

```ts
import { buildSearchIndex, searchIndex, pushRecent, getRecentEntries } from './data/searchIndex';
const results = searchIndex(buildSearchIndex(), 'paleta');
```

---

## Starter `bunx create-viverdeia-app`

```bash
bunx create-viverdeia-app meu-app
cd meu-app && bun install && bun dev
```

Gera: `index.html` com anti-FOUC inline · `package.json` (React 19 + Vite 6 + TS 5 + `@viverdeia/design-system`) · `main.tsx` com `ThemeProvider` (claro por padrão) · `App.tsx` landing editorial · `index.css` com tokens `--via-*` · README com regras editoriais. Template parametrizado (`{{PROJECT_NAME}}` / `{{YEAR}}`), valida package name kebab-case, bloqueia pasta não-vazia.

---

## Brand book completo

- **Manifesto / mission / vision** (`/foundations/brand-story`) — hero navy + cards editoriais com mission, vision, values, promessa, contrato com aluno.
- **Personality** (`/foundations/personality`) — 7 atributos: Operador-experiente · Editorial · Denso · Sem guru-bro · Pragmático · Navy-protagonista · Número-sobre-adjetivo.
- **Voice estendida** (`/foundations/voice-extended`) — contextos: marketing landing · email transacional · email editorial · comunidade · suporte 1:1 · paid ads · social orgânico · sales B2B. Cada um com do/don't.
- **Logo usage** (`/foundations/logo-usage`) — clear space, min size, variants (white/dark/reverse/single-color), do/don't. Sempre `BrandLogo` component com `variant` prop.

**REGRA INVIOLÁVEL DA LOGO:** a logo é SEMPRE o **lockup composto = monograma VIA + wordmark "VIVER DE IA" juntos**. ❌ NUNCA entregue só o wordmark "VIVER DE IA" solto (sem monograma) — é meio logo, não a marca. ❌ NUNCA desenhe o wordmark como texto estilizado; use os arquivos oficiais de `assets/logos/` ou `<BrandLogo>` (que já renderiza o lockup completo — a prop `variant` muda só a COR: `black` | `white` | `auto`). ✅ Monograma sozinho só em espaço mínimo onde o wordmark não caberia legível: favicon, app/profile icon, canto de slide interior.

---

## Marketing assets completos

| Bloco | Cobertura |
|---|---|
| **Email Coverage** | galeria editorial de templates (welcome, billing, churn, digest, urgent ops, drip, event invite, recap, lançamento, NPS, oferta, win-back) — mockups; os **enviáveis** ficam em `emails/` (13 de produção) |
| **Social Coverage** | Instagram (post + story + reel cover + highlight) · LinkedIn pessoal/empresa · YouTube · X · TikTok · Podcast cover · **18 templates** |
| **Paid Ads** | Meta Ads (single + carousel + video + story + reel) · Google Display (6 sizes) · headlines + descrições editoriais |
| **Landing Elements** | Hero variants · CTAs · Trust signals · FAQ · Pricing comparison · Lead magnet · Countdown · Comparativo concorrente |
| **Commercial / Sales** | Pitch deck Google Slides · One-pager B2B · Case study · Proposta · Contract visual |
| **Editorial / Content** | Newsletter · Blog post · Podcast notes · YouTube description · Tutorial · Case study editorial |
| **Event Collateral** | Save-the-date · Badge · Signage · Program book · Speaker kit · After-event recap (Leaders AI) |

---

## Comandos deste plugin (`/via-*`)

- `/via` · entrada geral · descreve o que vai construir e direciona pro pattern certo
- `/via-email` · email · 14 templates de PRODUÇÃO (react-email · à prova de bala) ou rascunho editorial
- `/via-social` · social media · 6 canais · 18 templates
- `/via-landing` · landing page · hero variants + elementos reutilizáveis
- `/via-brand` · brand book · logo usage · voice por contexto
- `/via-deck` · pitch deck · slides Google Slides canônicos
- `/via-paid` · Meta Ads + Google Display
- `/via-check` · auditoria editorial · verifica se a peça segue o padrão (verde/amarelo/vermelho)

Mais o sub-agente **via-auditor** (auditoria autônoma antes de marcar pronto).

---

## Como distribuir (3 modos)

**Modo 1 · Plugin Claude Code** — quem usa Claude Code instala o marketplace + plugin:
```
/plugin marketplace add rafaelmilagre7/viver-de-ia-ds
/plugin install viver-de-ia@viver-de-ia-ds
```
Ganha os comandos `/via-*`, o sub-agente auditor e esta skill (carrega sozinha).

**Modo 2 · ZIP universal** (Claude.ai / Cursor / Lovable / ChatGPT) — gere com `bun run kit` no repo e suba o ZIP (tokens + logos + templates + system-prompt).

**Modo 3 · system-prompt** — cole o conteúdo condensado nas custom instructions quando upload não é possível.

---

## Validação · checklist final pré-pronto

1. Paleta restrita respeitada (sem gold/amarelo/cyan/roxo em qualquer nível)
2. Tokens semânticos em texto/bg (`text-primary/body/muted/soft`, `surface`, `bg`) — não gray hardcoded
3. Pill canônica (11px · 500 · `-0.004em` · nowrap · sem dot · sem caps lock)
4. Hardcoded hexes só em exceções documentadas
5. Sem semáforo verde/vermelho em pills genéricas · sem bolinha decorativa em chip que não é status real
6. Buttons sentence-case (não `letter-spacing: 0.10em + uppercase`)
7. Glass pelas receitas canônicas (`--via-glass-blur/-ring/-bar`) · sombras SÓ em `--via-shadow-ink-*` (zero token que inverte em box-shadow)
8. Spring physics via tokens (`--via-ease-out`, `--via-ease-spring`) · shine sweep em interativos
9. Tabelas sortable → `<DataTable>` da library · tabela/finanças em HTML cru → classes do `data.css` (tabela densa SEM vidro)
10. Eyebrows em mono small caps 0.04-0.08em · ZERO itálico (`<em>` reto · ênfase = peso + cor)
11. Sparkles banido (Compass/Award/Crown/etc.) · **zero barra lateral colorida** (3 mecanismos) · zero anel colorido em avatar
12. Contraste WCAG AA garantido em dark mode (tokens semânticos) · `prefers-reduced-motion` respeitado
13. App React com `<ThemeProvider>` no root (+ anti-FOUC script no `index.html`)
14. Sem dark pattern em fluxos críticos (cancellation, billing, errors)
15. Email: tabela + inline + CTA navy sólido + fallback de background sólido + lockup ~18px
16. Raio na escala (card 20 · filho um degrau abaixo) · dataviz na régua (séries `--via-data-*`, UM eixo, zero-anchored, projeção tracejada)
17. Mockup interno pina as próprias cores (não herda tema) · testar a peça nos 2 temas ANTES de entregar (o dark é onde tudo quebra)

---

## Métricas verificadas (v0.6.0)

- **46 componentes de UI** em 9 categorias + `ThemeProvider` (47 símbolos exportados no barrel)
- **46 API docs** Radix-style (um por componente)
- **14 templates de email de produção** (react-email · enviáveis)
- **206 tokens** `--via-*` únicos · navy alpha = **18 stops** (02→80) · tinta de sombra 03→60 · receitas glass · escala de raio · paleta dataviz
- **18 templates social** · **6 canais** · cobertura paid/landing/commercial/editorial/event
- Dark mode completo · 100% WCAG AA de contraste (claro + escuro) · 0 violação séria de a11y
- **Auditoria visual 100% (28/Jul/2026):** todas as telas do reference site revisadas uma a uma, em claro E escuro, com medição de pixel — as regras deste manifesto saem dessa auditoria, não de teoria
- Glass pervasivo · CI: build + typecheck + lint + Vitest + axe-core a11y + visual regression Playwright (`ci.yml`)

---

## Conteúdo desta skill

- `SKILL.md` — este manifesto
- `colors_and_type.css` — tokens prontos pra `@import` (cópia fiel do `tokens.css` da fonte)
- `surfaces.css` — controles/acabamento pra HTML cru (pill-link, tile, row-card, meta-chip, bar-glass)
- `data.css` — tabelas, números e métricas (via-table, via-num, via-metric, via-delta, via-spark)
- `guidelines.md` — aprofundamento: voz, copy, do's & don'ts com cite de página canônica
- `assets/logos/` — VIA monogram + wordmark + Leaders AI mark

## Fontes & ícones (CDN)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" />
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```
