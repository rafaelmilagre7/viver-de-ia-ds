# Viver de IA — Diretrizes editoriais

Consolidação operacional de voz, copy patterns, do's & don'ts e regras de design system. Use como checklist antes de marcar qualquer tela como pronta.

---

## 1. Voz & tom

A voz da Viver de IA é a de um operador experiente compartilhando o que funciona. Não acadêmico, não "guru-bro" com promessas instantâneas, não vendedor de curso. Confiante, calmo, com números.

### Princípios

- **Transformação maior que ferramenta.** Toda história é sobre o que o operador consegue depois — receita, margem, autonomia. A stack é meio, nunca fim.
- **Toda afirmação carrega número ou citação.** "+11.920 conversas", "R$ 4.600/mês", "100% automatizado". Sem isso é blog, não é cases.
- **Pontos finais, não exclamações.** Confiante sem ser estridente.
- **Brasilidade quente, sem clichê.** PT-BR direto, "você" infinitivo, nunca "o senhor". Sem emoji, sem unicode decorativo.

### Quatro tons em que escrever

| Tom | Quando usar | Exemplo |
|---|---|---|
| Editorial calmo | Hero, manifesto | "Viver de IA, não de prompt." |
| Operacional direto | Botão, label, alerta | "Entrar na turma" · "Inscrições fecham em 3 dias" |
| Atribuído humano | Depoimentos | "Sem saber nada. Em pouquíssimas horas." — Márisson |
| Métrica seca | Stat card, KPI, headline de case | "+11.920 conversas analisadas em 90 dias" |

### Comprimento

| Elemento | Limite |
|---|---|
| Display headline | 3 linhas |
| Lede | 2 frases |
| Body em card | 3 linhas |
| Botão | 3 palavras |
| Eyebrow | 4 palavras |

---

## 2. Copy patterns

### Headlines de case

Padrão: **`<Empresa>: <outcome com métrica>`**.

✅ "Efizi: +11.920 conversas analisadas em 90 dias"
❌ "Como a Efizi revolucionou as vendas com IA"

### Depoimentos

Curtas, primeira pessoa, sempre atribuídas. Mantenha a oralidade. **Sem italic** (Geist não tem italic real) — peso 500 + cor navy.

✅ "Ela fez isso com pouquíssimas horas. Sem saber nada." — Márisson Lage

### Números & moeda

| Caso | Formato | Exemplo |
|---|---|---|
| Reais | R$ + espaço + ponto | R$ 4.600 · R$ 2,5M |
| Porcentagem | sem espaço | 100% · +42% |
| Plus | com sinal | +11.920 |
| Tempo | sem espaço · slash | 24/7 · 16 semanas |

### Botões

| Função | Padrão | Errado |
|---|---|---|
| Conversão | Entrar na turma | Saiba mais / Quero saber |
| Navegação | Ver cases | Clique aqui |
| Confirmação | Confirmar inscrição | OK / Sim |

---

## 3. Do's & Don'ts — design system

Checklist obrigatório antes de marcar tela como pronta.

### Cor — paleta navy-dominant

✅ Branco/off-white dominando ~80% · navy `#0A1F3B` protagoniza texto, CTA, surfaces dark · cinza como secundária · coral `#B85C5C` SÓ pra destrutivo real (cancel, failure, error 500, dialog destructive) · verde sóbrio `--via-success #1F8A5B` SÓ pra sucesso/online (check, presence dot), discreto e nunca berrante
❌ **QUALQUER dourado/amarelo** (gold border, gold gradient, gold accent, accent corner, text-gradient gold) — é a queixa #1 de Rafael; a paleta é **navy-only** · roxo/cyan/magenta/neon · gradient bluish-purple "AI" · cores quentes saturadas · semáforo verde/vermelho genérico em pills · "Verificado"/"Pago"/"Ativo" em verde berrante (são NAVY + check)
❌ **ANEL COLORIDO em avatar/ícone** (`box-shadow: 0 0 0 2px verde/coral` em volta do avatar pra indicar status) — é semáforo, grita, e ainda DUPLICA o que a bolinha de presença já diz. Avatar = **vidro limpo** (superfície de vidro + borda branca + sombra macia); o status vive **só na bolinha**, discreta: **online = verde sóbrio, todos os outros = navy**; offline recua por **opacidade**, não por anel cinza. Halo colorido só é legítimo em **foco de botão destrutivo** e **aviso de segurança**.

❌ **LINHA LATERAL em QUALQUER card/box** (`border-left`/`border-inline-start` de 2–4px colorido) — em callout, alert, pull-quote, blockquote, destaque, do/don't, item de lista, linha de tabela, faixa "recomendado". Estilo bootstrap/alert, tem **cara de IA**; o Rafael chamou de "horrível" e pediu varredura total. **REGRA: card/box NUNCA tem barra colorida num lado só.**
   ✅ No lugar: **liquid glass sem linha** — `var(--via-glass-card)` + `var(--via-glass-blur)` + `var(--via-glass-ring)` (hairline **uniforme nos 4 lados**) + `var(--via-glass-shadow)`. O destaque vem de **vidro + elevação + tipografia** (label, peso), nunca de cor num canto.
   ⚠️ Em **e-mail** (sem suporte a glass): tire a barra do mesmo jeito e use **borda fina uniforme nos 4 lados + fundo sutil**, em px/hex cru.
   Exceções que NÃO são "linha lateral de card" (mantêm): o `::after` rotacionado que **desenha o ✓** (checkmark), marcador de linha em **código/diff**, e `border-bottom` de divisor.

**Como destacar SEM cor de acento** (substitui o antigo "quando gold é OK" — não existe mais gold): pra dar protagonismo a UM elemento por section (1 plano em pricing, 1 keynote em agenda, "major" em changelog) use **peso/escala tipográfica, navy intensificado (`--via-accent` = navy), borda navy ou elevação** — nunca uma cor nova. Atenção/warning real = navy forte ou coral (se for destrutivo). Premium = restrição, não ornamento.

### Tipografia — Geist single family

✅ Geist (variable 100-900) pra display + UI + corpo · Geist Mono pra código/tokens/timestamps · ênfase em palavra = peso reduzido (400 vs 500/600) + cor `text-soft`, NÃO inclinação · letterspacing `-0.005em` a `-0.04em` em texto · uppercase chips/eyebrows entre 0.16-0.2em
❌ Italic (Geist não tem italic real) · Inter/Fraunces (legados removidos) · mistura de famílias · letterspacing positivo em corpo · uppercase em texto corrente · `letter-spacing: 0.22em+`

### Buttons & CTAs

✅ Pill 999 · sentence-case 13-14px peso 500 · gradient navy → navy-deep + inset highlight `0 1px 0 rgba(255,255,255,0.15) inset` + shadow `0 8px 18px -6px rgba(10,31,59,0.4)` + lift `translateY(-1px)` no hover
❌ `letter-spacing: 0.10em + text-transform: uppercase` (caps lock alérgico de framework) · botões quadrados · cor de semáforo no primary · verbos genéricos ("Clique aqui")

### Surfaces — glass + atmospheric

✅ Glass base: `linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.7))` + `backdrop-filter: blur(16-28px) saturate(140-180%)` + border + inset highlight · atmospheric: `radial-gradient at 0% 0%, rgba(10,31,59,0.04), transparent 60%` (signature) · liquid glass aparece em nav sticky, hero stat, modal, overlays
❌ Bg branco flat sem hierarquia · glass em dashboard denso ou tabela de dados · sombras pretas puras (devem ser navy-tinted)

### Status indicators — quando dot é legítimo

✅ Presence dots (online/away/busy/offline em chat, member list, drawer nav · online = verde sóbrio `--via-success`, os demais navy) · live pulse navy (incident = coral) · active line navy em transcript · unread bar navy em inbox
❌ **Bolinha decorativa** (`width:5px; height:5px; border-radius:50%; background:currentColor`) em pill que NÃO é status real (audit log tag, plan pill, diff stats, badge "Pago", sheet note signature, etc.) — pano comum bootstrap. Substituir por: traço horizontal tipográfico de 1.5×8px, peso da typography, ou remover de vez

### Iconografia

✅ Lucide stroke 2-2.4px, currentColor, tamanho proporcional · ícone em chip glass quando relevante
❌ **SPARKLES BANIDO** em toda identidade VIA (`Sparkles`, ✨) — cliché de IA desde 2023. Substituir contextualmente: Compass, Award, Crown, MessageCircle, Rocket, Layers, etc. · brand icons removidos do lucide-react (Linkedin, Twitter) — usar Link2, AtSign, Globe genéricos · emoji ★ ✓ → como ícone · outlined + filled juntos

### Hover signatures (assinatura comportamental do DS)

✅ **Bar lateral 2-3px** fade navy aparecendo à esquerda do item em hover (rows, cards, lessons, articles, audit log, billing, member list) · lift `translateY(-1px/-2px/-3px)` em cards interativos · gap animation em text links com chevron · underline animation 50%→0% em tabs (abre do meio)
❌ Spring bouncy · parallax · partículas · ripple · autoplay infinito · zoom-em-hover gritante

### Fotografia

✅ Cool/neutro, levemente dessaturada · preto-e-branco ou duotone navy · pessoas trabalhando
❌ AI stock — cérebros, neurônios, mãos androides · hipersaturada · "Silicon Valley"

### Densidade

✅ Branco respira · saltos 32/64/96/128 entre seções
❌ "Preencher" branco com decoração · comprimir espaço

### Sombras

✅ Navy-tinted sempre (`rgba(10,31,59,...)`) · inner highlight `0 1px 0 rgba(255,255,255,...) inset` + outer drop
❌ Preto puro · sombra material-design pesada

---

## 4. Components & patterns canônicos (65+ páginas vivas)

Reference: `/Users/rafaelmilagre/viver-de-ia-ds` (`bun dev` → :5173)

**Componentes editoriais world-class:**
- Charts (area + bar + donut + funnel) — SVG autoral navy
- Code block (light + dark) + Terminal + Diff viewer
- Form avançado (date picker editorial · combobox · tag input · range duplo · rating · color picker)
- Data viz extra (heatmap 52×7 GitHub-style · sparklines · gauge radial)
- Media players (mini áudio · full episode com waveform · video chrome dark)
- System states (errors 500/403/manut · loaders · empty · success)
- Overlays (drawer · sheet · popovers · dialogs · lightbox)
- Notifications (panel · banners 4 niveis · status · inbox completo)

**Patterns canônicos:**
- Curriculum (módulos+aulas+progresso) · Lesson player (vídeo+transcript+notas+quiz)
- Editorial blocks (hero variants · logo wall · timeline · FAQ · comparison · process)
- People (mentor card · team grid · member list · user popover)
- Admin (settings · API keys · billing · audit log timeline)
- Invoice/recibo (A4 editorial) · Slides deck (6 canônicos 16:9)
- Article · Dashboard · Onboarding · Pricing · Testimonial · KPI · Email · WhatsApp · Social · Podcast

---

## 5. Tokens canônicos

```css
--via-navy: #0A1F3B;
--via-navy-deep: #082341;
--via-text: #1A2B47;
--via-text-soft: #5E6B82;
--via-border: rgba(10, 31, 59, 0.18);
--via-border-soft: rgba(10, 31, 59, 0.08);

/* Acento = navy intensificado · NÃO existe gold nem 3ª cor */
--via-accent: var(--via-navy);

/* Sucesso/online · sóbrio, uso restrito (check, presence dot) */
--via-success: #1F8A5B;

/* Destructive only */
--via-coral: #B85C5C;
--via-coral-dark: #8C2C2C;
```

### Borda de card/superfície — evita o card "sumindo no fundo claro"
- Card / painel / menu flutuante em **fundo CLARO** → borda externa **`1px solid var(--via-border-soft)`** (hairline navy 0.08, visível). **NUNCA** use `var(--via-edge-hi)` como borda externa no claro: ela é branca (~`rgba(255,255,255,.95)`) e some no off-white — o card fica sem contorno, "flutuando no leite".
- `var(--via-edge-hi)` é só pro **brilho interno do topo** (`box-shadow: inset 0 1px 0 var(--via-edge-hi)` — o sheen do liquid glass) e pra **borda externa de card sobre fundo NAVY/escuro** (aí a borda clara é o contorno de vidro correto).
- Receita do card de vidro claro: `background: var(--via-glass-card)` + `border: 1px solid var(--via-border-soft)` + `box-shadow: inset 0 1px 0 var(--via-edge-hi), 0 12px 32px var(--via-navy-08), 0 2px 8px var(--via-navy-04)`.
### Cantos (border-radius) — escala generosa, SEMPRE token
Nunca px cru. Cada degrau é perceptivelmente diferente do vizinho (nada de 14 vs 16 vs 18, que só tira o ritmo):
```css
--via-radius-xs: 6px;    /* chip/tag minúsculo */
--via-radius-sm: 10px;   /* badge, input pequeno, thumb, ícone-caixa */
--via-radius-md: 14px;   /* input, toast, card pequeno — botão NÃO: botão é sempre pill */
--via-radius-lg: 20px;   /* CARD PADRÃO */
--via-radius-xl: 28px;   /* card grande, modal, drawer */
--via-radius-2xl: 40px;  /* painel hero, seção full-bleed */
--via-radius-pill: 999px;
```
- **Hierarquia obrigatória:** elemento DENTRO de outro usa um degrau ABAIXO do pai (painel 2xl → card lg → campo md → ícone sm). Se o filho igualar o raio do pai, o canto "vaza" e fica torto. Ex. real da home: hero 40 → grade 28 → card 20.
- Raio interno concêntrico (sheen/borda de 1px por dentro): `calc(var(--via-radius-X) - 1px)`.
- Exceção (mantém px/50%): círculo (avatar, dot), elemento ≤16px, e **e-mail** (cliente não suporta `var()` — px cru lá).

### ⚠️ FUNDO CLARO É O PADRÃO — regra inviolável
Toda superfície de trabalho nasce **CLARA** (branco/off-white). Escuro é **exceção deliberada**: hero, faixa de destaque, seção imersiva pontual — **nunca** a tela inteira, nunca o app inteiro, **nunca a tela de login**. Só entregue produto de fundo escuro se o usuário **pedir explicitamente**. `<ThemeProvider>` já nasce claro — não passe `defaultMode="dark"` por conta própria. (Erro real observado numa plataforma interna: app financeiro inteiro em dark por default — some a marca, some o vidro, e vira "template genérico".)

### Dados & finanças (tabela, gráfico, DRE, KPI)
- **NUNCA vidro em tabela densa** — mata a leitura. Tabela = superfície limpa + hairline entre linhas (sem zebra pesada). O vidro fica nos **cards ao redor** (KPI, resumo, nota).
- Número **sempre** `font-variant-numeric: tabular-nums` e **alinhado à direita** em coluna numérica. Formato BR: `R$ 1.234.567` · `12,4%`.
- **Hierarquia por indentação + peso**, nunca por cor de fundo. Linha de total/resultado = peso maior + tom levemente mais forte (e régua horizontal superior, convenção contábil — **nunca** barra lateral).
- **Cor só como semântica:** coral = desfavorável/negativo · `--via-success` (verde sóbrio) = meta batida/favorável · navy = neutro. Nada de verde/vermelho de framework.
- **O número tem que FECHAR.** Receita − custos = margem; margem − despesas = EBITDA; saldo anterior + fluxo = saldo; Σ das pontes do waterfall = variação total. Derive no código a partir de uma **fonte única** — nunca digite o mesmo número em dois lugares (duas seções da mesma tela discordando destrói a credibilidade).
- Projeção/estimativa tem que ser **visualmente distinta** do realizado (tracejado/opacidade) + legenda dizendo que é projetado.
- **CAMADA DE DADOS pronta (`src/styles/data.css`, global)** — use estas classes em `<table>` CRU em vez de reinventar CSS. É o que faz qualquer tabela nascer no padrão (inclusive a que a IA gera):

| classe | pra quê |
|---|---|
| `.via-table-wrap` | moldura: cantos arredondados + scroll horizontal seguro |
| `.via-table` | tabela base (+ `--sticky` cabeçalho fixo, `--compact`, `--roomy`) |
| `.via-num` | **número: tabular + à direita** — a regra que carrega o resto |
| `.via-mono` | id/código/timestamp |
| `.via-row-total` | linha de total: peso + régua superior (convenção contábil) |
| `.via-row-group` | cabeçalho de grupo dentro do corpo |
| `.via-cell-sub` / `--sub-2` | hierarquia por **indentação** |
| `.via-delta--up/--down/--flat` | variação com cor semântica |
| `.via-bar` + `.via-bar__fill` | micro-barra de proporção |
| `.via-metric` (+`--atmos`) · `.via-metric-grid` | **card de métrica — aqui o vidro é bem-vindo** |
| `.via-spark` (+`--down`, `--projected`) | sparkline |
| `.via-projected` | projeção/estimativa (tracejado) |

### 📊 GRÁFICOS — régua validada por script (não decida cor no olho)
A paleta navy-only **não suporta gráfico de 3+ séries por cor** — isso foi *medido* com validador de daltonismo/contraste, não opinado: navy puro "lê como cinza"; azul×petróleo dá ΔE 4.9 pra deuteranopia (indistinguível; mínimo é 8). O que passou em todos os checks virou token:
```css
--via-data-1: #2E6FC4;  --via-data-2: #7FB0EE;        /* claro (validado) */
--via-data-1-dark: #5C9BEA;  --via-data-2-dark: #2E6FC4; /* passos PRÓPRIOS do dark, nunca inverter */
--via-data-grid / --via-data-axis / --via-data-ink       /* grade e eixo recessivos · rótulo em token de TEXTO */
```
**Régua de série (inviolável):** 1 série → `--via-data-1`, **sem legenda** (o título nomeia) · 2 séries → data-1 + data-2 **e obrigatoriamente um 2º canal** (tracejado, hachura ou marcador) + rótulo direto · **3+ séries → NÃO invente 3ª cor: small multiples** (um gráfico por série) ou agrupe em "Outros" · **status (verde/coral) é reservado — nunca vira série.**

**Não-negociáveis:** **UM eixo — nunca eixo duplo** (é o erro nº1: faz escalas diferentes parecerem comparáveis; use 2 gráficos no mesmo eixo x, ou indexe a uma base). Escala **única** também entre direções (entrada pra cima e saída pra baixo com tetos diferentes é eixo duplo escondido — distorce o dado). Barra ancorada em **zero**. Cor segue a **entidade**, nunca o rank (filtrar não repinta). Sequencial = 1 hue claro→escuro; divergente = 2 polos + cinza no meio; **nunca arco-íris**. Legenda sempre com ≥2 séries. **Texto usa token de texto, nunca a cor da série.** Rótulo direto **seletivo** (nunca número em todo ponto). Projeção sempre tracejada + legenda dizendo. Marcas finas: linha 2px, marcador ≥8px, grade hairline, 2px de respiro entre fills.
**Proibido:** 3D/gloss/sombra em barra · gradiente numa série única (cor que varia sem significar nada) · legenda com dois itens da mesma cor · pizza com muitas fatias · eixo y que não começa em zero em barra.
Referência viva: **`/components/charts`** e **`/patterns/fpa`**.

- Referências vivas: **`/foundations/dados`** (a camada explicada, com código pra copiar) e **`/patterns/fpa`** (DRE vs plano · ponte de resultado · fluxo de caixa · burn & runway).

### Camada de acabamento — classes prontas (HTML cru, sem React)
Existem classes utilitárias globais (`src/styles/surfaces.css`, importado no `index.css`). **Use-as em vez de estilizar controle/superfície na mão** — trazem vidro, cantos e os 3 estados prontos. Servem também pro que IA gera (Lovable/v0/Cursor), que é HTML/CSS, não React:
| classe | pra quê |
|---|---|
| `.via-pill-link` | link/ação em pill (+ `--solid` pra ação principal, `--on-dark` sobre navy) |
| `.via-row-card` | linha de lista com corpo (timestamp, item de agenda, recurso) |
| `.via-tile` | card/painel de conteúdo em vidro (+ `--atmos` radial navy, `--lift` hover) |
| `.via-meta-chip` | rótulo/meta NÃO-clicável (+ `--mono` pra número) |
| `.via-bar-glass` | barra/chrome flutuante (nav sticky, toolbar) |

**Todo controle precisa dos 3 estados** — `:hover` (sobe 1px + sombra + borda mais presente), `:active` (volta a 0), `:focus-visible` (`var(--via-shadow-focus)`, com `outline:none`). Controle sem hover é design morto. **Elemento decorativo (rótulo, badge não-clicável) NÃO leva hover** — não invente interação onde não há ação.
**Controle sobre fundo navy/escuro:** não use vidro branco (some) nem `var(--via-surface)` (no dark ele fica escuro e o botão desaparece) — use `rgba(255,255,255,0.10)` + borda `0.20` (hover `.16`/`.34`), ou `var(--via-surface-onnavy)` com texto navy fixo.

### Liquid glass — receitas prontas (use a receita INTEIRA, não só o fundo)
```css
/* CARD/painel de conteúdo — mais sólido, texto legível */
background: var(--via-glass-card);
backdrop-filter: var(--via-glass-blur); -webkit-backdrop-filter: var(--via-glass-blur);
border: var(--via-glass-ring);
box-shadow: var(--via-glass-shadow);        /* hover/elevado: --via-glass-shadow-lift */

/* BARRA/chrome (nav sticky, toolbar, menu flutuante) — translúcido DE VERDADE */
background: var(--via-glass-bar);
backdrop-filter: var(--via-glass-blur-bar); -webkit-backdrop-filter: var(--via-glass-blur-bar);
```
- Vidro só "aparece" com algo atrás pra desfocar (fundo atmosférico/escuro/conteúdo rolando). Sobre branco liso ele **some** — ali use card sólido + hairline.
- **NUNCA** glass em: tabela/dashboard denso (mata a leitura), card DENTRO de card (vira sopa de vidro), fundo de e-mail (sem suporte), e nunca ao custo do contraste AA.

- **Espessura — borda elegante é FINA.** Card/superfície = `1px` (ou `0.5px`) — NUNCA `1.5–2px solid navy` (pesado, "caixa desenhada"). Destaque/selecionado = fio fino + **halo navy** (`box-shadow: 0 0 0 3px var(--via-navy-08)` ou glow) + a linha de luz interna, NÃO uma borda navy mais grossa. Borda grossa (`2px`) é legítima SÓ em: anel de avatar/foto (`2px solid var(--via-white)`), alça de slider/controle, e dot de status — nunca como contorno de card.

---

## 6. Vibe (uma frase)

> *Editorial calm + engineering precision + Brazilian warmth. Imagine o Financial Times redesenhado para o manual de operação de uma sócia IA.*
