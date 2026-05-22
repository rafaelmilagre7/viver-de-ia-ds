---
name: viver-de-ia-design
description: Use para gerar interfaces e artefatos da marca Viver de IA — mentoria + comunidade + Leaders AI Conference (PT-BR). Inclui design tokens (paleta RESTRITA navy-dominant + cinza secundário + coral só pra destrutivo · sem gold/amarelo em nenhum nível), assinatura liquid glass, 110+ páginas/patterns canônicos, library React publicável `@viverdeia/design-system` v0.5.0 (**46 componentes** em src/lib), API docs Radix-style por componente, theming system 3-camadas (ThemeProvider + useTheme + createThemeOverride), Cmd+K real indexado com keywords PT-BR/EN, starter `bunx create-viverdeia-app`, brand book completo, email/social/paid ads/landing/commercial/editorial/event coverage + 4 advanced patterns (2FA setup, pricing comparison, error pages, billing checkout). Use sempre que produzir landing, dashboard, app, plataforma de aluno, deck, mock, e-mail, post social, ou qualquer artefato visual da marca.
user-invocable: true
---

# Viver de IA · Design System

Reference site canônico: `/Users/rafaelmilagre/viver-de-ia-ds` · **110+ páginas · 46 componentes · 46 API docs** · `bun dev` → http://localhost:5173
Repo público: https://github.com/rafaelmilagre7/viver-de-ia-ds · **v0.5.0**
Starter: `bunx create-viverdeia-app meu-app` (scaffold Vite + React + TS pré-configurado com ThemeProvider)

## Princípios não-negociáveis

### Paleta restrita (6 tons + 2 semânticos)

1. **Branco** `#FFFFFF` — 85% do canvas
2. **Off-white** `#F7F8FA` (gray-50) — surfaces alt
3. **Cinzas** gray-100 → gray-900
4. **Azul escuro** `#1E3A5F` (blue) — gradient stops
5. **Navy** `#0A1F3B` — única cor de marca · 80% peso visual
6. **Preto** `#000000` — tipografia editorial peso máximo

**Semânticos parcimoniosos:**
- **Coral** `#B85C5C` — só destrutivo real (cancel, churn, error)
- **Success** `#1F8A5B` — só presence online · navy-adjacent

**BANIDO em qualquer nível:** gold, dourado, amber, amarelo, mostarda, ocre, roxo "IA", cyan, magenta, neon, gradient quente.

### Pill canônica (regra máxima)

```css
.via-pill {
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.004em;
  white-space: nowrap;
  /* NO uppercase · NO bolinha decorativa · NO peso 700 */
}
```

### Tipografia · Geist single family

- Geist (variable 100-900) pra tudo · Geist Mono pra código/timestamps/números
- Italic editorial em ênfase (h2 em, blockquote, live pill)
- Letterspacing: corpo `-0.005em` a `-0.018em` · headings `-0.022em` a `-0.04em`
- Pesos: body 400-500 · subtítulo 500-600 · heading 500-600 · CTA 500 (NÃO 700)

### Voz editorial (operador, não guru)

- PT-BR direto · "você" infinitivo
- Sempre número ou citação atribuída · sem "centenas" genérico
- Sem clichê IA ("revolucione", "transforme", "o futuro chegou")
- Sem emoji decorativo (✨🚀💪🔥) · sem urgência fabricada
- Sentence-case em CTAs · não caps lock

### Sparkles banido

Não use Sparkles, ✨, "AI sparkle". Substituir contextualmente: Compass · Award · Crown · Layers · MessageCircle · Rocket.

## Library publicável (v0.5.0)

```bash
bun add @viverdeia/design-system lucide-react
```

```tsx
import '@viverdeia/design-system/styles.css';
import { ThemeProvider, Button, Pill, Card, DataTable, useToasts } from '@viverdeia/design-system';

// Em React, sempre envelopar com ThemeProvider
<ThemeProvider defaultMode="system">
  <App />
</ThemeProvider>
```

**46 componentes core (9 categorias):**

- **Base (6):** Button · Pill · Card · Input · Avatar · Icon
- **Overlay (5):** Toast · Tooltip · Modal · Tabs · Popover
- **Form (5):** Switch · Checkbox · RadioGroup · Select · Progress
- **Utility (5):** Drawer · Spinner · Skeleton · Breadcrumb · Pagination
- **Composto (5):** Accordion · Stepper · EmptyState · Combobox · DropdownMenu
- **Avançados (5):** Command (Cmd+K) · DatePicker · Slider · Alert · DataTable
- **Premium (5) NOVO v0.5:** HoverCard · OTPInput · TagInput · Calendar · Carousel
- **Mobile-first (5) NOVO v0.5:** MultiSelect · DateRangePicker · TimePicker · ContextMenu · Sheet
- **Especializados (5) NOVO v0.5:** TreeView · Splitter · VirtualList · Lightbox · ColorPicker

**Theming exportado:** `ThemeProvider`, `useTheme`, `applyTheme`, `createThemeOverride`.

**API docs:** cada componente tem `/api/{nome}` no reference site com anatomy + props + examples + a11y.

## Cobertura completa (110+ páginas)

- **Fundamentos** (14): Manifesto · Brand · BrandStory · Personality · VoiceExtended · LogoUsage · Cores · Tipografia · Espaçamento · Raios · Sombras · Movimento · Filosofia · Library · **Theming (NOVO v0.5)**
- **Glass** (3): Anatomia · Variantes · In-context
- **Iconography** (3): Marks · Icons · Photography
- **API docs** (46): `/api/{nome}` por componente · Radix-style
- **Components** (35+): páginas de showcase legacy por categoria
- **Patterns editorial** (40+): Article, Pricing, Dashboard, Onboarding, Achievement, Mentor Matching, Cohort, Lesson Player, Curriculum, etc.
- **Patterns marketing/commercial** (8): EmailCoverage (13 templates), SocialCoverage (18 templates), PaidAds (12 creatives), LandingElements (7 elementos), Commercial (deck+one-pager+case+proposta+contract), Editorial (newsletter+blog+podcast+YT+tutorial), EventCollateral (Leaders AI guidelines)
- **Patterns advanced (4) NOVO v0.5:** TwoFactor (2FA setup flow) · PricingComparison (3 tiers × 12 features) · ErrorPages (404/403/500/maintenance) · Billing (4-step checkout)
- **Showcase** (5): Marketing, Leaders AI, Aluno, Login, Settings
- **Guidelines** (3): Voice, Copy, DosDonts

## Checklist canônico antes de marcar pronto

1. Paleta restrita respeitada (sem gold/amarelo/cyan/roxo)
2. Pill canônica (11px · 500 · `-0.004em` · nowrap · sem dot · sem caps lock)
3. Buttons sentence-case (não caps lock alérgico)
4. Sem semáforo verde/vermelho em pills genéricas
5. Sem bolinha decorativa em chip que não é status real
6. Hover signatures (bar lateral navy fade, lift)
7. Surface glass + atmospheric quando aplicável
8. Tabelas sortable → `<DataTable>` da library
9. Eyebrows preservados em mono small caps 0.04-0.08em
10. Live broadcast em italic editorial *"ao vivo"*
11. Sparkles banido (Compass/Award/Crown/etc.)
12. Voz operador-experiente · número ou citação · sem clichê IA

## Comandos disponíveis (este plugin)

- `/via` · entrada geral · descreve o que vai construir e ela direciona
- `/via-email` · email editorial · qualquer dos 13 templates
- `/via-social` · social media · qualquer dos 6 canais
- `/via-landing` · landing page · variants + elementos reutilizáveis
- `/via-brand` · brand book · logo usage · voice por contexto
- `/via-deck` · pitch deck · slides Google Slides canônicos
- `/via-paid` · Meta Ads + Google Display
- `/via-check` · auditoria editorial · verifica se peça segue padrão
