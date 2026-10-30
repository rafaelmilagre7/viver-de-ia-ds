# 01 · Fundamentos

Marca, cor, tipografia, espaço, raio, sombra, movimento e ícones do DS SUBIDO.
Os valores vêm de `kit/css/tokens.css` (os tokens `--via-*` do DS Viver de IA,
<https://viver-de-ia-ds.vercel.app>) e das medições do My Dashboard na versão
**Flat SUBIDO · Revenue++**, em 28/10/2026.

> Regra de ouro: **nunca escreva cor, tamanho ou raio solto** (`#0A1F3B`, `14px`, `rounded-xl`).
> Use o token (`var(--via-navy)`, `text-sm`, `rounded-[var(--via-radius-md)]`). Assim o tema escuro e
> os próximos ajustes do DS chegam sozinhos.

---

## 1. Marca

| Elemento | Regra |
|---|---|
| Logo | **SUBIDO AI** vetorial e animado (`kit/brand/subido-logo.tsx`). Na sidebar: 24px de altura, `animate="hover"`. No palco do login: 56px, `animate="intro"`, `tone="inverse"`. |
| Nome do produto | Fica **embaixo** do logo, em caps: 11px · 500 · tracking `--via-ls-mark` (0.22em) · `--via-text-muted`. Ex.: `MY DASHBOARD`, `FLOW CRM`. A marca é a SUBIDO AI; o app é o produto. |
| Azul do "AI" | `--subido-blue #2b6cf0` (claro) / `#4a86f7` (escuro). **É cor da logo, não da interface.** Nunca use em botão, link ou gráfico. |
| "by Viver de IA" | Só no lockup grande (`SubidoLockup`), fora do app. Em produto instalado com a marca do cliente (white-label), não use "Viver de IA" fixo na tela. |
| Recolhido | Sidebar recolhida (ícones) usa só o símbolo; não espreme a palavra. |
| Proibido | Inverter a logo por CSS (use `tone="inverse"`), sombra/brilho na logo, logo como papel de parede. |

## 2. Cor

O DS é **white-first**: branco e cinza-claro ocupam ~85% da tela; **navy é a única cor de marca** (tinta,
não enfeite). Destaque vem de **peso, tamanho e contraste**, não de cor nova.

### Paleta

| Token | Valor | Uso |
|---|---|---|
| `--via-navy` | `#0A1F3B` | Botão primário, item ativo da sidebar, título, número principal, barra de progresso |
| `--via-navy-deep` | `#02162A` | Fim do gradiente do botão primário e do palco |
| `--via-blue` | `#1E3A5F` | Hover sobre navy, 2ª série de gráfico |
| `--via-navy-02…80` | navy translúcido | Lavagens (hover `-04/-06`, seleção `-06/-08`, trilho de progresso `-08`), bordas (`-05` card, `-16` controle, `-20` destaque) |
| `--via-gray-50` | `#F7F8FA` | **Canvas do app** (fundo atrás dos cards) |
| `--via-gray-100` | `#F0F2F5` | Superfície sutil (secundário, selo cinza, trilho) |
| `--via-gray-200` | `#E4E7EC` | Hairline em documento (não no app — no app a borda é navy translúcido) |
| `--via-white` | `#FFFFFF` | Card, sidebar, campos, modal |
| `--via-coral` | `#B85C5C` | **Só destrutivo e queda** (excluir, erro, variação negativa). Único tom quente permitido. |
| `--via-coral-dark` | `#8C2C2C` | Texto de erro/destrutivo |
| `--via-success` | `#1F8A5B` | **Só presença online** (bolinha "online"). Status "ativo/conectado" é navy, não verde. |

### Texto (escada de 4 passos — de-ênfase por COR, nunca por opacity)

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--via-text-primary` | `#0A1F3B` | `#F4F6FA` | Título, valor, rótulo de item, texto em foco |
| `--via-text-body` | `#344054` | `#D0D5DD` | Corpo de texto |
| `--via-text-muted` | `#4F596B` | `#AEB8C6` | Descrição, rótulo de KPI, eyebrow, apoio |
| `--via-text-soft` | `#636D80` | `#98A2B3` | Placeholder, metadado, ícone quieto |

### Bordas

| Token | Valor | Onde |
|---|---|---|
| `--via-border-soft` | navy 5% | **Card, sidebar, divisória** (hairline quase invisível — a sombra/fundo definem o card) |
| `--via-border` | navy 16% | **Controle**: input, select, botão outline, chip |
| `--via-navy-20` | navy 20% | Destaque (KPI principal, hover de controle) |
| `--via-border-strong` | navy 40% | Foco de input |

> ❌ Borda cinza opaca (`#D1D1D1`, `#D0D5DD`, `border-gray-300`) no app. É o que mais faz uma tela parecer
> "de outro sistema". A auditoria acusa como grave.

### Status sem semáforo

Chip de estado é **navy em 3 tons** — forte (navy cheio, texto branco), suave (navy 8%), neutro (cinza).
Ganho = forte · aberto = suave · perdido = neutro. Variação de KPI: alta navy, queda coral, estável cinza.
**Nunca** verde/amarelo/vermelho de semáforo, nunca dourado/âmbar (banido no DS).

### Dados (gráficos)

Rampa monocromática `--via-chart-1…5` (navy → azul-cinza). Uma série dominante em `--via-chart-ink`;
grade `--via-data-grid` (navy 8%), eixo `--via-data-axis`, rótulos com token de TEXTO (`--via-data-ink`),
nunca com a cor da série. Nada de arco-íris.

## 3. Tipografia

**Geist** (texto e display) + **Geist Mono** (números em selo, código, kbd). Família única:
hierarquia por **tamanho, peso e cor**, nunca por outra fonte.

Carregamento: `<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet">`

### Escala do app (o que existe numa tela — até 7 tamanhos)

| Papel | Tamanho | Peso | Tracking | Cor |
|---|---|---|---|---|
| Eyebrow / rótulo de grupo | 11px (`text-[0.6875rem]`) | 500 | 0.08em (página) · 0.18em (sidebar) · **CAPS** | muted |
| Selo / pill / chip | 11px | 500 | -0.004em · **sem caps** (selo é lowercase) | conforme tom |
| Mínimo de conteúdo | **13px** (`text-[0.8125rem]`) | 400 | — | muted |
| Botão | 13px | 500 | -0.008em | — |
| UI / corpo de card | 14px (`text-sm`) | 400–500 | — | body/primary |
| Lead / item de lista | 15px (`text-[0.9375rem]`) | 400 | — | muted |
| Título de card | 16px (`text-base`) | 500 | — | primary |
| Título de seção (h2) | 20px (`text-xl`) | 500 | -0.015em | primary |
| **Título da página (h1)** | **30px** (`text-3xl`) | **500** | **-0.025em** | primary |
| Título da home / hero | 36px (`text-4xl`) | 500 | -0.025em | primary |
| KPI comum | 20–24px (`clamp(1.25rem,11cqi,1.5rem)`) | 500 | -0.02em | muted |
| KPI principal | até 44px (`clamp(1.5rem,14cqi,2.75rem)`) | 600 | -0.035em | primary |
| Progresso "2 de 3" | 36px | 600 | -0.03em | primary |

Regras:
- Títulos **peso 500**. Nada de 700/800/900 nem gradiente no texto.
- **Mínimo 13px** em conteúdo. 11px só para texto em CAPS (eyebrow) ou selo/chip — rótulo, não leitura.
- Sentence case em tudo (botão, título, aba). CAPS só no eyebrow.
- Números: `tabular-nums` em tabela e KPI; formato pt-BR (`1.234,56`, `R$ 482,6 mil`).
- Destaque editorial em texto longo: itálico, não cor.

## 4. Espaço

Grade de 4px (`--via-space-1…32`). Medidas da moldura:

| Onde | Valor |
|---|---|
| Respiro do conteúdo | **40px** desktop (`md:px-10 md:py-10`), 24px tablet, 16px celular |
| Largura máxima do conteúdo | **1152px** (`max-w-6xl`); telas de leitura/form: 1024px (`max-w-5xl`) ou 896px (`max-w-4xl`) |
| Eyebrow → título | 8px |
| Título → descrição | 4px |
| Cabeçalho → conteúdo | 32px (`mb-8`) |
| Entre cards | 12–16px (`gap-3`/`gap-4`) |
| Respiro de card | **24–32px** (`p-6`/`p-8`); card de lista compacto 20px (`p-5`); banner de 1 linha 12–16px |
| Item de menu | 40px de altura (`px-3 py-2.5`) |

## 5. Raio

| Token | Valor | Onde |
|---|---|---|
| `--via-radius-xs` | 6px | Botãozinho de ícone dentro de card |
| `--via-radius-sm` | 10px | Tile de logo, ícone em quadrado |
| `--via-radius-md` | 14px | **Input, select, item de menu, linha selecionada** |
| `--via-radius-lg` | 20px | **Card, modal, banner** |
| `--via-radius-xl` | 28px | Painel grande |
| `--via-radius-2xl` | 40px | Palco do login |
| `--via-radius-pill` | 999px | **Botão, selo, chip, abas segmentadas, trilho de progresso** |

## 6. Sombra (menos tinta)

No app, **card é plano**: hairline `--via-border-soft` e nenhuma sombra de elevação.
Sombra só onde comunica camada ou ação:
- botão primário: `0 1px 0 rgba(255,255,255,.15) inset, 0 10px 22px -10px var(--via-shadow-ink-60)`;
- item ativo da sidebar: `0 6px 16px -10px var(--via-shadow-ink-20)`;
- flutuantes (modal, menu, popover, toast): `--via-shadow-md`/`-lg`;
- foco: `--via-shadow-focus` (anel de 3px navy 15%).

Sombra sempre com tinta navy (`--via-shadow-ink-*`), nunca preto puro no claro.

## 7. Movimento

| Token | Valor | Uso |
|---|---|---|
| `--via-dur` | 220ms | Hover, troca de estado |
| `--via-dur-press` | 110ms | Apertar (resposta no pointer-down) |
| `--via-ease-snap` | `cubic-bezier(.2,.7,.2,1)` | Hover/press |
| `--via-ease-out` | `cubic-bezier(.16,1,.3,1)` | Entrada de elemento |
| `--via-ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | Check/toggle (overshoot leve) |

Botão: `active:scale-[0.985]`. Entradas sobem 10–16px com fade. Tudo respeita `prefers-reduced-motion`.
Movimento com significado: o check do passo concluído se desenha, o número conta até o valor, a barra de
progresso cresce. Nada de animação decorativa contínua no app (o palco do login é a exceção).

**Acabamento pronto no `kit/css/subido.css`** (só por classe-gancho; o componente do kit já traz a dele):

| Gancho | O que faz |
|---|---|
| `.ds-content` (AppShell) | os blocos de 1º nível da tela sobem em cascata de 50ms (teto 300ms) |
| `.ds-kpi-row` (KpiRow) | os KPIs entram um a um logo depois |
| `[data-ds-stagger]` | opcional: cascata nos filhos de qualquer grade (cards de lista, galeria) |
| `.ds-progress-fill` | a barra de progresso se enche ao chegar (FirstSteps, SetupBanner) |
| `.ds-reveal` | conteúdo que abre (IntegrationCard) desce no lugar |
| `.ds-grow-y` + `--i` | barra de gráfico próprio cresce da base (Recharts já anima, não aplique lá) |
| `.ds-nav-link` | foco de teclado visível, ícone acende no hover, cede no clique, pílula ativa assenta |
| cards (`.ds-card`, `.ds-metric`, `.ds-integration`) | hover escurece a hairline para navy-10 (North Star fica no navy-20) |

## 8. Ícones e logos de marca

- **Lucide**, traço 2 (menu) ou 1.75 (estado vazio), 16px em botão/linha, 18px no menu, 20px em estado vazio.
- Ícone acompanha rótulo; ícone sozinho precisa de `aria-label` e tooltip.
- **Ícone não vai ao lado do título da página** (já está na sidebar).
- **Provedor ou ferramenta = logo oficial**, sempre. WhatsApp, Google, OpenAI, Bling, Pipedrive, Stripe…
  aparecem com o logo da marca (`BrandTile`/`BrandIcon`, `kit/brand/brand-icon.tsx`). Ícone genérico só
  para o que não é marca (Webhook, CSV, SQL, Planilha genérica).
  - Ícone de app/símbolo → tile quadrado (`BrandTile`, 32–44px, fundo branco).
  - Marca que só existe por extenso (Bling, Conta Azul) → espaço largo (`ProviderLogo`, 104×44px).
  - Marca nova: baixar do site oficial da marca, conferir o arquivo (SVG sem `<script>`/href externo),
    salvar em `public/brand/marcas` e registrar no `brand-icon`.

## 9. Tema escuro

Por `data-theme="dark"` no `<html>` (e `.dark` para compatibilidade). Os tokens já trazem o par escuro —
use sempre token e o escuro vem junto. No escuro o item ativo inverte (pílula clara, texto navy).
**Tinta é `--via-text-primary`, não `--via-navy`**: ícone, texto de estado, círculo de passo, barra de
progresso e selo "pronto" usam `--via-text-primary` (navy no claro, quase-branco no escuro), e o texto
sobre esse preenchimento usa `--via-surface`. `--via-navy` cru fica para fundo de marca (próxima ação,
palco). O botão primário inverte no escuro do mesmo jeito que o item ativo.
Telas de acesso (login etc.) ficam sempre no claro (`data-theme="light"` na raiz delas).
