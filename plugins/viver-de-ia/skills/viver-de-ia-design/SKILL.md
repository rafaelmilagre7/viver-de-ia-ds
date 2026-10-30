---
name: viver-de-ia-design
description: Use para gerar interfaces e artefatos da marca Viver de IA — mentoria + comunidade + Leaders AI Conference (PT-BR). Inclui design tokens (paleta RESTRITA navy-dominant + cinza secundário + coral só pra destrutivo · sem gold/amarelo/roxo/cyan em nenhum nível), assinatura liquid glass + atmosphere radial + spring physics, library React interna `@viverdeia/design-system` v0.6.1 (não publicada no npm · DS interno) (**46 componentes de UI + ThemeProvider** em src/lib · 46 API docs Radix-style), theming system 3-camadas (ThemeProvider + useTheme + createThemeOverride), Cmd+K indexado PT-BR/EN, starter interno `create-viverdeia-app` (só no repo), **sistema de email de produção à prova de bala** (14 templates react-email em emails/), brand book completo + cobertura email/social/paid ads/landing/commercial/editorial/event + patterns avançados (2FA, pricing comparison, error pages, billing). Use sempre que produzir landing, dashboard, app, plataforma de aluno, deck, mock, e-mail, post social, ad creative, ou qualquer artefato visual da marca.
user-invocable: true
---

# Viver de IA · Design System

Reference site canônico: `viver-de-ia-ds` · `bun dev` → http://localhost:5173
Repo público: https://github.com/rafaelmilagre7/viver-de-ia-ds · site vivo: https://viver-de-ia-ds.vercel.app
Library: `@viverdeia/design-system` v0.6.1 (46 componentes de UI + ThemeProvider · ESM+CJS+types+CSS+tokens)
Starter: `create-viverdeia-app` (scaffold Vite + React 19 + TS com ThemeProvider) · só roda dentro do repo do DS — não está no npm

## ⚠️ REGRA ZERO · LIGHT-FIRST (a mais violada — leia antes de tudo)

**A marca é CLARA. Fundo branco/off-white é o padrão de TUDO** — landing, app, dashboard, card, email, post. Branco + off-white = ~85% de qualquer tela. Navy é a cor da MARCA (texto, CTA, detalhe), **não o fundo da página**.

- **NUNCA entregue peça de fundo escuro por padrão.** Escuro só se o usuário pedir ("versão dark") ou no respiro canônico: **1 seção full-bleed navy por página** (hero imersivo, CTA de fechamento, footer) — o resto claro.
- Dark mode é **modo alternativo do usuário** (ele aperta o botão), não a estética de partida. Em dúvida: claro.
- `<ThemeProvider>` já nasce **claro** por padrão. Só passe `defaultMode="system"` se o usuário quiser seguir o SO.
- O `colors_and_type.css` cru (HTML sem React · no kit ZIP o mesmo arquivo é `tokens/tokens.css`) também nasce **claro**, mesmo com o SO em escuro: escuro só com `data-theme="dark"` no `<html>`.
- Liquid glass **funciona lindamente sobre claro** — é a assinatura da casa. Não escureça a peça "pra o glass aparecer" (ver receita de glass card claro na seção 5).

**Estado atual:** 100% WCAG AA de contraste nos 2 temas · 0 violação séria de a11y. Em código, use SEMPRE tokens semânticos que adaptam claro↔escuro (`var(--via-text-primary|body|muted|soft)`, `var(--via-surface)`, `var(--via-border-soft)`) — nunca hardcode navy/branco em texto/superfície. Link em texto corrido = sublinhado (o `colors_and_type.css` já sublinha `<a>` sem classe dentro de `<p>`). De-ênfase por cor (token mais suave), não opacity. E-mail trava tudo em claro.

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
  background: var(--via-material-control-fill);          /* material CONTROL · adapta no escuro */
  -webkit-backdrop-filter: var(--via-material-control-blur);  /* -webkit- SEMPRE primeiro */
  backdrop-filter: var(--via-material-control-blur);
  border: var(--via-material-control-ring);
}
```

- **PROIBIDO:** bolinha decorativa em pill que NÃO é status real
- **PROIBIDO:** uppercase 0.10em+ em pills, chips, badges
- **PROIBIDO:** `letter-spacing: 0.16em+ + uppercase + font-weight: 700` (trio bootstrap)
- **Canvas grande:** os 11px são pra tela. Em arte de 1080px (social/ads) e slide 1920×1080, escale ~2× (≈22px / 24px de texto, padding proporcional). Fundo da pill em token de material (`var(--via-material-control-fill)`) ou superfície (`var(--via-surface)`), não branco fixo, pra funcionar no dark.

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
- Letterspacing: corpo `-0.005 a -0.018em` · headings `-0.022 a -0.04em` · eyebrows uppercase mono com `--via-ls-label` (0.18em) (não pill!)
- Pesos: body 400-500 · subtítulo 500-600 · heading 500-600 · CTA 500 (NÃO 700)

### Eyebrow vs Pill (distinção crítica)

| Elemento | Permitido | Proibido |
|---|---|---|
| **Eyebrow** (label sem padding/radius) | uppercase mono com `--via-ls-label` (0.18em) · cor ink-3 | uppercase em pill com padding+radius999 |
| **Pill** (chip arredondado com padding) | lowercase 11px peso 500 · `-0.004em` | uppercase 0.10em+ peso 600/700 |

### Voz editorial (operador, não guru)

- PT-BR direto · "você" infinitivo
- **Tratamento:** interface/microcopy fala "você" no imperativo (confira, tente) · email e social podem usar o imperativo coloquial (responde, marca, faz) · nunca tu/teu/tua/contigo
- Sempre número ou citação atribuída · sem "centenas" genérico
- **Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos** — leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual); sem acesso à internet, use o `fatos.md` desta skill e cite a data dele. Use a frase pronta. O que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu — senão placeholder. Número da ficha que aparece em exemplo (aqui e nos `/via-*`) é foto de 30/out/2026: na peça, vale a ficha atual.
- **Nunca invente preço nem número de alunos/operadores/vagas** · preço só da ficha · o resto, pergunte ou use o placeholder `R$ [valor]` / `[N] alunos`
- **Nunca invente termo comercial:** garantia, prazo de devolução/reembolso, cláusula de contrato, condição de pagamento, política, data nem local de evento · só vale o que está na ficha de fatos ou o que a pessoa informou · senão pergunte ou use `[condições da garantia]` / `[prazo de devolução]` / `[data]` / `[local]`
- Sem clichê IA ("revolucione", "transforme", "o futuro chegou")
- Sem emoji decorativo (✨🚀💪🔥) · sem urgência fabricada
- Sentence-case em CTAs · não caps lock

### Sparkles banido

Não use Sparkles, ✨, "AI sparkle". Substituir contextualmente: Compass · Award · Crown · Layers · MessageCircle · Gauge (Rocket também não: clichê de "launch" → ArrowRight · Calendar · Target).

---

## Padrões editoriais avançados (consolidados em rounds de polish)

### 1. Reflexo que segue o ponteiro (interativos premium)

Em buttons / cards hoverable — uma mancha de luz que acompanha o mouse. Anda por **`transform`** e acende por **`opacity`** (nunca animar `left`/`background`: a varredura antiga repintava o vidro inteiro a cada hover). Na lib já vem pronto (`useSpecular`); em HTML cru:

```css
.elem { position: relative; overflow: hidden; isolation: isolate; }
.elem::before {
  content: ''; position: absolute; top: 0; left: 0; width: 240px; height: 240px;
  border-radius: 50%; background: var(--via-specular); pointer-events: none; z-index: -1;
  transform: translate(calc(var(--mx, -9999px) - 120px), calc(var(--my, -9999px) - 120px));
  opacity: 0; transition: opacity var(--via-dur) var(--via-ease-out);
}
.elem:hover::before { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .elem::before { display: none; } }
/* JS: no pointermove (só pointerType "mouse"), 1x por quadro (rAF),
   el.style.setProperty('--mx', x + 'px') / ('--my', y + 'px') relativos ao elemento */
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

**Toda sombra que você escreve usa `--via-shadow-ink-03..60`** (navy no claro, PRETO mais denso no escuro — sombra navy sobre fundo navy não eleva nada) **ou a pilha pronta do material** (`--via-material-<chrome|regular|thick|control>-shadow` e `-lift` · os apelidos antigos `--via-glass-shadow` / `-lift` = regular). **NUNCA** escreva token de cor que inverte (`--via-navy-XX`, `--via-white`) num `box-shadow` composto à mão — no dark ele vira **halo branco** em volta do card (o defeito nº 1 que a auditoria matou em 453 camadas). Exceções que NÃO são sombra e ficam como estão: `inset 0 1px 0 var(--via-edge-hi)` (linha de luz do vidro) e anéis `0 0 0 Npx` (focus/pulse).

Overlay (Modal/Drawer/Popover/Command/menus) = `box-shadow: var(--via-material-thick-shadow)` — brilho interno no topo + linha de tinta na base + drop duplo, já nos 2 temas. Não monte a pilha à mão.

### 5. Liquid glass — 4 MATERIAIS por elevação (não faça blur à mão)

Vidro é **material escolhido pelo nível da peça**, não blur solto. Cada material junta 5 partes — `--via-material-<nome>-fill` · `-blur` · `-ring` · `-rim` (aro especular) · `-shadow` (+ `-lift` no hover):

| Material | Onde | Claro | Escuro |
|---|---|---|---|
| `chrome` | header, sidebar, tab bar | branco .82→.72 · `blur(24px) saturate(180%)` | navy .84→.76 · `+ brightness(.8)` |
| `regular` | card/painel no conteúdo | branco .90→.80 + tinta navy-02 · `blur(24px) saturate(170%)` | navy .80→.86 · `blur(28px) saturate(130%) brightness(.75)` |
| `thick` | Modal, Sheet, Drawer, Popover, menus, Select/Combobox, Command, Toast, Tooltip, HoverCard | **piso ≥ .90** + navy-02 + **grão 2-3%** · `blur(32px) saturate(160%)` | navy .88→.92 · `brightness(.7)` |
| `control` | pill, botão secundário, input/segmented sobre vidro | branco .90→.72 · `blur(12px) saturate(170%)` | controle escuro de verdade (nunca laje branca) |

Peças compartilhadas: `--via-scrim` / `--via-scrim-blur` (overlay · navy .26-.36 no claro, **tinta preta** no escuro) · `--via-rim-mask` · `--via-grain` · `--via-specular`. Os nomes antigos seguem como apelido: `--via-glass-card`/`-blur`/`-ring`/`-shadow`(`-lift`) = regular · `--via-glass-bar`/`-blur-bar` = chrome. Utilitários pra HTML cru: `.via-glass` (regular) · `.via-glass-strong` (thick) · `.via-liquid` (control) · `.via-bar-glass` (chrome) · `.via-glass-dark` (momento navy fixo).

**Escuro = camada que ESCURECE, não inversão.** O vidro escuro é navy denso com `brightness < 1` no blur: conteúdo movimentado atrás não atravessa o texto (medido sobre foto: legenda de card 1,7:1 → 7,2:1). Nada de branco 2-10% sobre escuro.

**Aro especular (o que faz parecer vidro, não plástico):** gradiente do material pintado só no anel de 1px — forte no canto de cima à esquerda, some no meio da lateral, volta fraco na base. Fica por DENTRO do ring hairline: sobre branco quem desenha a borda é o ring; sobre foto, acende o aro.

```css
.peca { position: relative; }
.peca::after {
  content: ''; position: absolute; inset: 0; padding: 1px; border-radius: inherit;
  background: var(--via-material-regular-rim);
  -webkit-mask: var(--via-rim-mask); -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
```

Regra de aplicação: **vidro em card/painel/barra/metric — NUNCA em tabela densa** (o `<DataTable>` é sólido de propósito; o vidro fica nos cards de métrica ao redor). **`<Card>` padrão é PAPEL (sólido)** — vidro é `variant="glass" | "atmospheric" | "featured"`.

#### ⭐ Glass card sobre fundo CLARO (a receita canônica — use por padrão)

Glass **não precisa de fundo escuro**. Card de vidro sobre claro é a assinatura nº1 da marca. Página com atmosfera + material regular completo:

```css
/* 1. a PÁGINA precisa de atmosfera (senão o vidro não tem o que refletir) */
.page { background:
  radial-gradient(ellipse 80% 50% at 15% 0%, var(--via-navy-05), transparent 60%),
  radial-gradient(ellipse 60% 50% at 100% 100%, var(--via-navy-03), transparent 65%),
  var(--via-bg); }

/* 2. o CARD = material regular inteiro */
.glass-card {
  position: relative; isolation: isolate;
  border-radius: var(--via-radius-lg);                       /* 20px · card padrão */
  padding: 24px;
  background: var(--via-material-regular-fill);              /* piso de leitura + tinta navy-02 */
  -webkit-backdrop-filter: var(--via-material-regular-blur); /* -webkit- SEMPRE primeiro */
  backdrop-filter: var(--via-material-regular-blur);         /* ordem inversa = o minify do Vite 8/Next apaga o vidro */
  border: var(--via-material-regular-ring);                  /* hairline · desenha a borda sobre branco */
  box-shadow: var(--via-material-regular-shadow);            /* brilho interno + linha de base + drop */
  transition: transform .26s var(--via-ease-snap), box-shadow .26s ease;
}
/* 3. aro especular (receita acima, com --via-material-regular-rim) */
/* 4. hover: sobe e a luz aumenta */
.glass-card:hover { transform: translateY(-2px); box-shadow: var(--via-material-regular-lift); }
```

O dark se resolve sozinho (os materiais têm valor próprio no escuro). **Erros que matam o efeito:** vidro sobre página branca lisa (use o Card padrão, que é papel) · blur/opacidade à mão · borda grossa em vez de hairline · sombra preta genérica · esquecer o aro. Em React, `<Card variant="glass">` já entrega tudo isso.

**Reflexo que segue o ponteiro** (Button e `Card hoverable`, automático na lib): mancha de luz que anda por `transform` e acende por `opacity` — só mouse, desliga em reduced-motion e no toque. Não anime `left`/`background` (o brilho antigo varria `left` a cada hover).

**Lente (opt-in · só Chromium):** `enableGlassLens()` (lib) + classe `.via-glass--lens` numa peça-assinatura (no máximo 1-2 por tela). Refração SVG só na faixa da borda — o centro fica neutro, o texto não perde leitura. Safari/Firefox, menos transparência e mais contraste ficam com o blur normal do material. Não ponha em barra que rola (com o blur da barra a refração não aparece e custa ~15% de tempo de quadro na rolagem).

### 6. SVG em containers dark + headings

- `<em>` dentro de h1-h4 em container dark (`.via-mesh-navy`, `.via-glass-dark`, `[data-on-dark]`) ganha gradient white automaticamente — regra catch-all em `tokens.css`. Você não precisa se preocupar.
- Ícones SVG dentro de tiles navy: `color: var(--via-white)` (não accent, que vira navy).
- Headings globais usam `:where(h1,h2,h3,h4) { color: var(--via-text-primary) }` (specificity 0) — qualquer container que declare `color:#fff` ganha por cascata. Não precisa override h2 em cards dark.

### 7. prefers-reduced-motion

Sempre respeitar — animações de entrada/pulse e o reflexo que segue o ponteiro desligam sob `@media (prefers-reduced-motion: reduce)`.

### 8. Cantos generosos — escala de raio (parente > filho)

`--via-radius-xs` 6 · `-sm` 10 · `-md` 14 · `-lg` 20 (**card padrão**) · `-xl` 28 · `-2xl` 40 · `-pill` 999. Regras: **filho um degrau abaixo do pai** (card lg → chip interno md); **canto concêntrico = raio do pai − padding do pai** pro filho que encosta na borda (Command: painel 20 − lista 8 = item 12 → `calc(var(--via-radius-lg) - var(--via-space-2))`; menu 10 − padding 6 = item 4); anel de foco dentro de painel arredondado acompanha o raio (nunca anel quadrado); e-mail mantém px cru (cliente de e-mail não resolve `var()`).

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

Pra artefato HTML sem React (Lovable, protótipo, relatório), esta skill traz duas folhas prontas — importe junto com `colors_and_type.css` (no kit ZIP: `tokens/surfaces.css` + `tokens/data.css` junto com `tokens/tokens.css`):

- **`data.css`** (tabelas/números/finanças): `.via-table-wrap` + `.via-table` (variações `--sticky/--compact/--roomy`) · `.via-num` (tabular, alinhado à direita) · `.via-row-total` / `.via-row-group` · `.via-cell-sub` · `.via-delta--up/down/flat` · `.via-bar` · `.via-metric` (+`--atmos`) · `.via-metric-grid` · `.via-spark` (+`--down/--projected`). Regra: **tabela densa SEM vidro; vidro nos cards de métrica ao redor**.
- **`surfaces.css`** (controles/acabamento): `.via-pill-link` (+`--solid/--on-dark`) · `.via-row-card` · `.via-tile` (+`--atmos/--lift`) · `.via-meta-chip` (+`--mono`) · `.via-bar-glass`. Todo controle tem `:hover/:active/:focus-visible` prontos.

### 12. Fluidez e material (doutrina Apple/WWDC adotada 29/Jul)

- **Feedback no apertar, não no soltar** — todo interativo tem `:active` instantâneo (`transform: scale(0.97)` ou tom mais fundo). Esperar o clique completar pra reagir = interface morta.
- **Vidro claro NUNCA empilha sobre vidro claro** — legibilidade colapsa. Card de vidro dentro de painel de vidro: o de dentro vira superfície sólida (`--via-surface`) ou tinta rasa.
- **Vibrancy: texto sobre vidro pede mais contraste** — peso um passo acima e token de texto mais forte do que usaria em superfície sólida; cor de destaque mora em camada sólida (pill/botão), nunca solta no vidro.
- **Materializar, não só aparecer** — vidro que entra em cena (modal, popover) chega por **escala + opacidade** (o material "chega"), não fade seco. **Nunca anime `backdrop-filter`** (repinta o blur da tela inteira a cada quadro) nem `left`/`top`: só `transform` e `opacity`.
- **Borda de rolagem, não régua dura** — onde conteúdo passa por baixo de chrome sticky, prefira máscara de fade/blur no encontro em vez de `border-bottom` de 1px permanente.
- **Acessibilidade de material é AUTOMÁTICA nos tokens**: `prefers-reduced-transparency` deixa os 4 materiais sólidos (sem blur, sem grão), o scrim chapado e desliga a lente; `prefers-contrast: more` solidifica e engrossa o ring pra 0.4/0.45 — já resolvido em `colors_and_type.css`, nenhum componente precisa tratar. Não desfaça isso com `backdrop-filter` literal fora dos tokens (na lib o CI barra `blur(` cru).

**Física de gesto (motor canônico da library — 29/Jul):**
- A library tem motor de mola próprio (`src/lib/_shared/spring.ts` + `useDragDismiss.ts`) na linguagem da Apple: **damping ratio** (1.0 = sem quique · ~0.8 = quica leve, SÓ após gesto com embalo) + **response** (segundos até o alvo; não é "duração" — o assentar emerge). Valores que a Apple usa e o DS adotou: mover = 1.0/0.4 · drawer/sheet = 0.8/0.3.
- **Drawer, Sheet, Lightbox e Toast já vêm com o gesto completo**: arrasto 1:1 respeitando onde agarrou, histerese de 10px (clique continua clique), soltura decidida pela PROJEÇÃO do momentum (flick curto fecha; arrasto lento e curto volta), mola recebe a velocidade do dedo (sem emenda), rubber-band no sentido contrário, agarrar no meio da animação re-captura do valor vivo, saída por X/ESC animada pela mesma mola. Não reimplemente nada disso à mão.
- Em app React FORA da library (Lovable etc.), a tradução pra Framer Motion/Motion: `type: 'spring'` com `bounce: 0` por padrão e `bounce: 0.2` só após flick; `duration` ≈ response. Nunca anime gesto com transition CSS de duração fixa — não dá pra agarrar no meio.
- Anime SÓ `transform` e `opacity` (compositor); nunca `left/top/width/height` em keyframe.
- Menus/balões escalam DA ORIGEM (transform-origin apontando pro gatilho conforme o lado), nunca do próprio centro.

### 13. Mockup dentro de peça — interior FIXA as próprias cores

Mockup de tela/post/papel/QR/e-mail dentro de uma página **pina as próprias cores** (hex/rgba fixos) — nunca herda tokens adaptativos do tema, senão o interior "vira dark" junto com a página e o texto some. Chrome de plataforma de terceiros (WhatsApp/Instagram/YouTube) fica **fiel à plataforma** (verde do WhatsApp é do WhatsApp); só o conteúdo VIA dentro segue a marca.

---

## Library `@viverdeia/design-system` v0.6.1 (interna · não publicada no npm)

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
<script>(function(){var s=localStorage.getItem('via-theme');document.documentElement.dataset.theme=s==='light'||s==='dark'?s:s==='system'&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';})();</script>
<!-- sem preferência salva: CLARO (padrão da marca) · o tokens.css cru também abre claro, mesmo com o SO em escuro -->
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
- **Logo = `lockup-navy.png`** (~18px de altura · PNG porque o Gmail não renderiza SVG) em URL absoluta (`https://viver-de-ia-ds.vercel.app/logos/lockup-navy.png`). Trava modo claro (`color-scheme: light only`). Preheader sempre.
- A IA escreve só o **editorial** (assunto, headline, corpo); o motor renderiza o HTML.

```ts
import { render } from '@react-email/render';
import WelcomeEmail from 'emails/welcome';
const html = await render(<WelcomeEmail firstName="Marina" turma={turma} daysToStart={diasParaComecar} platformUrl="https://app.viverdeia.ai" />);
await resend.emails.send({ from: 'Viver de IA <oi@viverdeia.ai>', to, subject: 'sua vaga tá confirmada · bora começar?', html });
```

---

## Patterns canônicos avançados

Em `/patterns/*` — todos com fluxo interativo + princípios editoriais:

- **`/patterns/two-factor`** · 2FA setup · 4 steps (método → verify → backup → done) · OTPInput de 6 dígitos
- **`/patterns/pricing-comparison`** · 3 tiers × features agrupadas · recommended sem grito · CTA por coluna
- **`/patterns/errors`** · 404 · 403 · 500 · maintenance · copy honesta (sem 🤖 oops · sem dark pattern)
- **`/patterns/billing`** · checkout em steps · resumo lateral sticky · sem countdown manipulativo

**Princípios herdados:** resumo sempre visível (`<aside sticky>`) · voltar não perde dados · sem dark pattern (countdown/scarcity falsa/defaults manipulativos) · confirmação textual antes de submit. Junto com os patterns anteriores: `cancellation`, `auth-flow`, `onboarding`, `dashboard`, `lesson`, `curriculum`, etc.

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

**Só funciona dentro do repo do DS** (`packages/create-viverdeia-app`): não está no npm e o template depende de `file:../../viver-de-ia-ds`. Fora dele, `bunx` falha — comece um Vite + React + TS e consuma o `dist/lib` ou o kit.

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
- **Microcopy de produto** (`/guidelines/microcopy` · `microcopy.md` nesta skill) — 65 frases canônicas pra erro, tela vazia, confirmação, sucesso, carregamento, onboarding, botão e ajuda de campo. Produto e email transacional falam **"você"** (nunca tu/teu/tua/contigo). Situação coberta = use a frase canônica.
- **Logo usage** (`/foundations/logo-usage`) — clear space, min size, variants (white/dark/reverse/single-color), do/don't. Sempre `BrandLogo` component com `variant` prop.

**REGRA INVIOLÁVEL DA LOGO:** a logo é SEMPRE o **lockup composto = monograma VIA + wordmark "VIVER DE IA" juntos**. ❌ NUNCA entregue só o wordmark "VIVER DE IA" solto (sem monograma) — é meio logo, não a marca. ❌ NUNCA desenhe o wordmark como texto estilizado; use os arquivos oficiais **em vetor** (`lockup-navy.svg` / `lockup-white.svg`; monograma `monogram-navy.svg` / `monogram-white.svg` — em `assets/logos/` desta skill, em `logos/` do kit ou em `https://viver-de-ia-ds.vercel.app/logos/…`) ou `<BrandLogo>` da library (SVG inline nítido — `variant` muda só a COR: `black` | `white` | `auto`; `monoOnly` pro monograma). PNG só se a ferramenta não aceitar SVG — **e-mail é sempre PNG** (`lockup-navy.png` / `lockup-white.png`, 720px de largura · o Gmail não renderiza SVG). ✅ Monograma sozinho só em espaço mínimo onde o wordmark não caberia legível: favicon, app/profile icon, canto de slide interior. **Leaders AI** (material de evento): arquivo branco (`leaders-ai-conference-logo.png`) sobre fundo escuro, navy (`leaders-ai-conference-logo-navy.png`) sobre fundo claro — não crie faixa navy só pra segurar a logo.

---

## Marketing assets completos

| Bloco | Cobertura |
|---|---|
| **Email Coverage** | galeria editorial de templates (welcome, billing, churn, digest, urgent ops, drip, event invite, recap, lançamento, NPS, oferta, win-back) — mockups; os **enviáveis** ficam em `emails/` (14 de produção) |
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
7. Vidro por um dos 4 materiais (`--via-material-<chrome|regular|thick|control>-*`, com aro) · sombras SÓ em `--via-shadow-ink-*` ou na pilha do material (zero token que inverte em box-shadow escrito à mão) · conferido nos 2 temas sobre fundo movimentado
8. Spring physics via tokens (`--via-ease-out`, `--via-ease-spring`) · reflexo por transform/opacity (nunca animar `left` ou `backdrop-filter`)
9. Tabelas sortable → `<DataTable>` da library · tabela/finanças em HTML cru → classes do `data.css` (tabela densa SEM vidro)
10. Eyebrows uppercase mono com `--via-ls-label` (0.18em) · ZERO itálico (`<em>` reto · ênfase = peso + cor)
11. Sparkles banido (Compass/Award/Crown/etc.) · **zero barra lateral colorida** (3 mecanismos) · zero anel colorido em avatar
12. Contraste WCAG AA garantido em dark mode (tokens semânticos) · `prefers-reduced-motion` respeitado
13. App React com `<ThemeProvider>` no root (+ anti-FOUC script no `index.html`)
14. Sem dark pattern em fluxos críticos (cancellation, billing, errors)
15. Email: tabela + inline + CTA navy sólido + fallback de background sólido + `lockup-navy.png` ~18px (PNG, nunca SVG)
16. Raio na escala (card 20 · filho um degrau abaixo) · dataviz na régua (séries `--via-data-*`, UM eixo, zero-anchored, projeção tracejada)
17. Mockup interno pina as próprias cores (não herda tema) · testar a peça nos 2 temas ANTES de entregar (o dark é onde tudo quebra)
18. Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos, na frase pronta · zero termo comercial inventado (vagas, devolução, contrato, pagamento, política, data, local) · o que não está na ficha nem veio da pessoa vira placeholder

---

## Métricas verificadas (v0.6.0)

- **46 componentes de UI** em 9 categorias + `ThemeProvider` (47 símbolos exportados no barrel)
- **46 API docs** Radix-style (um por componente)
- **14 templates de email de produção** (react-email · enviáveis)
- **204 tokens** `--via-*` únicos · navy alpha = **18 stops** (02→80) · tinta de sombra 03→60 · receitas glass · escala de raio · paleta dataviz
- **18 templates social** · **6 canais** · cobertura paid/landing/commercial/editorial/event
- Dark mode completo · 100% WCAG AA de contraste (claro + escuro) · 0 violação séria de a11y
- **Auditoria visual 100% (28/Jul/2026):** todas as telas do reference site revisadas uma a uma, em claro E escuro, com medição de pixel — as regras deste manifesto saem dessa auditoria, não de teoria
- Vidro em 4 materiais por elevação (rodada 2 · 30/out) · CI: build + typecheck + lint + Vitest + axe-core a11y + visual regression Playwright (`ci.yml`)

---

## Conteúdo desta skill

- `SKILL.md` — este manifesto
- `colors_and_type.css` — tokens prontos pra `@import` (cópia fiel do `tokens.css` da fonte)
- `surfaces.css` — controles/acabamento pra HTML cru (pill-link, tile, row-card, meta-chip, bar-glass)
- `data.css` — tabelas, números e métricas (via-table, via-num, via-metric, via-delta, via-spark)
- `guidelines.md` — aprofundamento: voz, copy, do's & don'ts com cite de página canônica
- `microcopy.md` — frases canônicas de produto (erro, vazio, confirmação, sucesso, botão…) · gerado de `src/content/microcopy.ts`
- `fatos.md` — ficha de fatos do negócio (cases, soluções, setores, planos e preços, mentoria, garantia, liderança) lida do site oficial · única fonte de número do negócio numa peça · versão sempre atual: https://viver-de-ia-ds.vercel.app/fatos.md
- `assets/logos/` — logo oficial em vetor (`lockup-navy.svg`, `lockup-white.svg`, `monogram-navy.svg`, `monogram-white.svg`, extraídos do arquivo original do designer) + `lockup-navy.png` / `lockup-white.png` (720px · só pra e-mail) + PNGs legados + Leaders AI mark em PNG (`leaders-ai-conference-logo.png` branco pra fundo escuro · `leaders-ai-conference-logo-navy.png` pra fundo claro)

## Fontes & ícones (CDN)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" />
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```
