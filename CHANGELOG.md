# Changelog

Todas as mudanças notáveis no Viver de IA Design System são documentadas aqui.

Padrão: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Design · rodada 3 — movimento (30/out · plugin 1.11.0)

- **Escala de movimento por papel** em `tokens.css`: 5 durações (`--via-dur-press` 100 · `-quick` 160 · `-base` 220 · `-panel` 320 · `-page` 400ms) e a saída sempre um degrau abaixo da entrada; 3 curvas (`--via-ease-enter`, `--via-ease-exit`, `--via-ease-snap`); molas em `linear()` geradas pela física do `spring.ts` (`--via-spring-smooth`, `--via-spring-bounce` — overshoot só em check/radio/switch); distâncias `--via-enter-scale` (.97) e `--via-enter-shift` (8px). Os nomes antigos (`--via-dur`, `--via-ease`, `--via-ease-out`, `--via-ease-spring`, `--via-t*`) seguem como apelido da escala nova. A lib saiu de ~20 durações e ~10 curvas soltas (o `ease` padrão era o mais usado) para a escala; troca de cor em hover passou a `quick`.
- **Guarda no CI**: `scripts/motion-drift.mjs` (roda no `lint:tokens`) barra duração ou curva escrita à mão nas declarações de `transition`/`animation` do CSS da lib (loop `infinite` e `linear` ficam de fora).
- **Tudo que aparece também sai animado**: Modal, Select, DropdownMenu, Popover, Tooltip, Combobox, Command, MultiSelect, ContextMenu, HoverCard e DatePicker ficam montados durante a saída (`usePresence` em `_shared/motion.ts` · `data-state="open|closed"` + `inert`) e saem por opacidade + escala .97 rumo ao gatilho, acelerando (menus ~100ms, diálogos ~160ms). Entrada por transição + `@starting-style`, sem keyframe: ESC no meio da entrada ou reabrir no meio da saída reverte do ponto atual. Foco volta ao gatilho no início da saída; a trava de rolagem dos diálogos segue até desmontar; a pilha de Escape não muda. Modal e Toast perderam o overshoot. A escala dos popups nasce no centro do gatilho e acompanha o flip.
- **Painéis num motor só**: Sheet e Drawer entram na mesma mola em que saem e são arrastados (entrada de 100%, `SPRING.panel` damping 1.0 · response .35; o Drawer entrava 24px por CSS); agarrar no meio da entrada continua do ponto vivo. Fechar por fora (`open` → false, ex.: botão "Aplicar") também sai pela mola, sem chamar `onClose` de novo; Lightbox idem.
- **Toasts**: o tempo esgotado fecha pelo mesmo caminho animado do X; toast removido pelo consumidor (`clear()`) sai animado sem segundo `onDismiss`; os vizinhos deslizam por transform (FLIP) em vez de pular; toast novo entra pela borda da pilha (de baixo nas posições `bottom-*`). A pilha tem largura fixa `min(380px, 100vw − 48px)` — antes um toast mais largo empurrava os outros pro lado.
- **Layout que anima**: Tabs com um indicador único (sublinhado e pill) que desliza na mola só por transform (translateX + scaleX, raio corrigido por quadro, nítido em repouso); Accordion abre/fecha por `grid-template-rows` 0fr→1fr e o item de baixo desliza em vez de pular 40px (DOM ganhou `.via-accordion__clip`); Carousel arrastado 1:1 (toque e mouse) com projeção de embalo, rubber-band e a mesma mola nas setas/dots/teclado (o arrasto não dá a volta do último pro primeiro; setas e autoplay continuam em loop); dots, Progress, Slider, Breadcrumb e Input sem animar `width`/`left`/`right`.
- **Reduzir movimento = crossfade curto**: a rede global não mata mais o fade das camadas com fase de presença; escala e deslocamento viram neutros, a opacidade fica. Sheet/Drawer trocam o deslize por fade.
- **Rota e tema no site**: router de dados (`createBrowserRouter`) pra usar View Transitions — página velha sai em 120ms, nova entra em 220ms subindo 8px, cabeçalho e sidebar parados, o marcador do link ativo desliza e o título faz crossfade; sem suporte, o fade antigo. Troca de tema (site e `ThemeProvider` da lib) vira um crossfade da página inteira com as transições por elemento desligadas durante a troca — acabou o texto escuro sobre escuro por 130ms. ⌘K do site também sai animado.
- **`/foundations/motion` refeita**: escala, curvas e molas ao vivo, com os números lidos do código; sem as afirmações antigas que o código não cumpria.
- **Instruções das IAs** (SKILL, guidelines, system prompt, `llms.txt`) ensinam a escala, a saída animada e o reduced-motion como crossfade.

### Design · rodada 2 — vidro líquido (30/out · plugin 1.10.0)

- **4 materiais por elevação** em `tokens.css`: `chrome` (header, sidebar, tab bar), `regular` (card/painel), `thick` (Modal, Sheet, Drawer, Popover, menus, Select/Combobox, Command, Toast, Tooltip, HoverCard) e `control` (pill, botão secundário, input/segmented). Cada um junta fill, blur, ring, aro especular e sombra (+ lift) — `--via-material-<nome>-*`. Os nomes antigos (`--via-glass-card`, `-blur`, `-bar`, `-ring`, `-shadow`…) seguem valendo como apelido do material certo. Novos: `--via-scrim`/`-blur`, `--via-rim-mask`, `--via-grain`, `--via-specular`, `--via-lens-blur`.
- **Escuro com piso de leitura**: vidro escuro virou camada que escurece (navy .80-.92 + `brightness(.7-.8)` no blur), não branco 2-10%. Medido sobre fundo movimentado (mesmo script da auditoria): legenda de card 1,7:1 → 7,2:1, rótulo 2,8 → 7,4, corpo do modal 3,4 → 10,1; no claro, corpo do modal 7,7 → 9,7 e legenda de card sobre foto 4,8 → 5,4. Botão secundário, pill, OTP e ícone de vidro deixam de ser laje branca no escuro.
- **Material de verdade**: aro especular (gradiente mascarado no anel de 1px, forte no canto de cima à esquerda), brilho interno no topo, linha de tinta na base; thick com piso ≥ .90 + tinta navy-02 + grão de 2-3% (rodapé de modal/drawer não acinzenta); scrim mais leve (.26-.36 navy, tinta preta no escuro) e mais desfocado.
- **Library inteira num sistema só**: as regras de vidro da lib saem de 15 receitas de blur diferentes para 4 valores (materiais regular, thick e control + o blur do scrim); nenhum `blur(` cru no CSS da lib (`lint:glass` agora barra). `DataTable` virou sólido (regra da marca); `Card` padrão virou papel sólido e `glass`/`atmospheric`/`featured` ficaram distinguíveis sobre branco; `Tooltip` deixou de ser chip navy que sumia no escuro; o `Calendar` dentro do `DateRangePicker` deixou de ser vidro sobre vidro. APIs dos componentes não mudam.
- **Movimento barato**: a varredura de brilho que animava `left` (Button a cada hover, Card) virou reflexo que segue o ponteiro (`useSpecular` · só transform/opacity, só mouse, desliga em reduced-motion); keyframes de Modal, Drawer, Command e Lightbox não animam mais `backdrop-filter`.
- **Raio concêntrico**: itens do Command 10 → 12px (painel 20 − lista 8), itens do DropdownMenu/ContextMenu pela mesma conta; foco do campo do Command sem anel quadrado dentro do painel arredondado; rodapé do Command na mesma tinta do vidro.
- **Lente (opt-in · só Chromium)**: `enableGlassLens()` (exportado pela lib) + classe `.via-glass--lens`. Refração SVG (`feDisplacementMap` em unidades da caixa) só na faixa da borda; Safari/Firefox, menos transparência e mais contraste ficam com o blur normal. Ligada só no card arrastável de `/glass/anatomy` — no header ela não aparece com o blur da barra e custava ~15% de tempo de quadro na rolagem.
- **Utilitários no mesmo sistema**: `.via-glass` (regular), `.via-glass-strong` (thick), `.via-liquid` (control), `.via-glass-dark`, `.via-pill-link`, `.via-row-card`, `.via-tile`, `.via-bar-glass` usam os materiais e respeitam menos transparência.
- **Páginas `/glass` refeitas**: hero claro com vidro arrastável sobre conteúdo real, os 4 materiais em contexto (barra sobre conteúdo que rola, cards e controles sobre uma fotografia de palco gerada pra isso — `scripts/gen-palco-foto.py`, sem foto de terceiros —, overlay com scrim) e ficha com o valor vivo de cada token no tema atual.
- **Instruções das IAs** (SKILL, guidelines, system prompt, `llms.txt`) ensinam os 4 materiais, o aro, o escuro que escurece, a lente opt-in e o raio concêntrico.

### Design · rodada 1 — defeitos visíveis (30/out)

- **Header e sidebar fixos de verdade**: `html, body, #root { height: 100% }` prendia o shell em uma tela e o header/sidebar sticky soltavam depois de ~600px de rolagem (inclusive em produção). Agora só `html, body` têm altura fixa; `#root` cresce com o conteúdo.
- **Etiqueta "Design System" do header**: herdava `line-height: 0` do logo e colapsava (texto vazando da borda em todas as páginas).
- **Botão primary no escuro**: navy sobre o palco escuro dava 1,03:1 — agora invertido (branco com texto navy).
- **Foco**: `border-radius: inherit` no `:focus-visible` tirava o raio próprio de links/itens arredondados; e o anel some no alto contraste do sistema — ganha `outline` em `forced-colors`.
- **Mola sem tranco**: o 1º quadro do `animateSpring` podia ter tempo negativo e o painel solto andava pra trás antes de seguir; `dt` travado em [0, 32ms] + teste.

### Ficha de fatos do negócio (30/out · plugin 1.9.0)

- **Números das peças vêm do site oficial**: `scripts/fatos-sync.mjs` lê viverdeia.ai (cases, soluções, setores, planos e preços, mentoria por plano, garantia real, meta, liderança) e grava `public/fatos.json`, `public/fatos.md` (viva em `viver-de-ia-ds.vercel.app/fatos.md`) e `fatos.md` na skill e no kit. Só grava quando algum fato muda; frase que some do site vira "conferir", nunca valor inventado. Divergências do próprio site são listadas (hoje: 515 × 521 cases; Enterprise 50 check-ins × ilimitada).
- **Leitura diária automática**: GitHub Action `fatos.yml` (08:00 BRT + manual) commita a ficha quando o site muda — o push republica o site.
- **Assinatura dos emails aos alunos** (decisão do Rafael, 30/out): os 6 templates que assinavam "Caio Ribeiro · fundador" (o site oficial lista Rafael Milagre como fundador e Yago Martins como cofundador) agora assinam **Rafael Milagre · fundador · Viver de IA**; vitrine `/patterns/email-coverage` acompanha (o email de comunidade "operador da semana" mantém o Caio).
- **Instruções das IAs sem a oferta antiga**: SKILL, guidelines, system prompt, comandos `/via-*` e kit diziam "mentoria de 4 meses", "turma", "18 aulas", "90 dias até produção", "1:1", "R$ 2.400/6.000" e números de casos sem fonte (11.920, 73%, depoimentos nominais). Agora: fatos só da ficha (frase pronta), o resto vira placeholder; assinatura de email = liderança real.

### IA criando na marca (30/out · plugin 1.8.0)

- **Logo oficial em vetor**: o lockup e o monograma foram extraídos do arquivo original do designer (BrandBook, dez/2025 — formas vetoriais da capa) e viram `lockup-navy.svg`, `lockup-white.svg`, `monogram-navy.svg`, `monogram-white.svg` (+ `lockup-*.png` 720px pra email, que não renderiza SVG). Ficam em `public/logos/` (servidos em `viver-de-ia-ds.vercel.app/logos/…`), na skill e no kit. Tinta oficial do logo = `#010F1D` (a do arquivo do designer).
- **`BrandLogo` na library** (SVG inline, `variant` black/white/auto, `size`, `monoOnly`): a skill mandava usar `<BrandLogo>` mas ele não era exportado. Página `/api/brand-logo`.
- **Logo do site na proporção do livro**: o cabeçalho montava monograma + wordmark em PNG com o wordmark grande demais (0,79 da altura do monograma; no livro é 0,43). Agora usa o lockup oficial; no mobile segue só o monograma.
- **Leaders AI em fundo claro**: versão escura da marca (`leaders-ai-conference-logo-navy.png`) — antes só existia branca e as IAs criavam faixa navy só pra segurar o logo.
- **Prova real com IAs** (Claude com o plugin × outra IA só com o kit, 5 peças: post, anúncio, email, landing, deck): as peças saíram claras, com lockup e "você", mas as IAs **inventaram termos de garantia e devolução** (a landing pedia as perguntas sem dar as respostas) e apontaram 14 contradições. Corrigido: "nunca invente" passa a cobrir garantia, devolução, contrato, pagamento, política, data e local (com placeholders); `/via-social` sem fundo navy nem wordmark solto e com 1080×1350; capa social com lockup; monograma do deck unificado (24px a 1920, opacidade .5); itálico e barra lateral que ainda eram ensinados em `/via`, `/via-landing`, `guidelines` e `/via-check`; sombra pelos tokens; eyebrow em `--via-ls-label` (0,18em, o que o site usa); botão preset da Meta × chamada do criativo; "30 vagas"/"R$ 1,8M" viram placeholder; email usa o lockup PNG; estrutura de deck de palestra; pill escalada em arte grande; tratamento "você" (interface no imperativo de você, email/social podem usar o coloquial). `em { font-style: normal }` agora vem no `tokens.css` (antes só no site).

### Corrigido (28/out · auditoria do DS · plugin 1.7.0)

- **Camada única de sobreposição na lib** (`_shared/overlay.ts` + `Portal`): os 14 overlays/popups (Modal, Drawer, Sheet, Lightbox, Command, Select, MultiSelect, Combobox, DropdownMenu, ContextMenu, Popover, HoverCard, Tooltip, DatePicker/DateRangePicker) vão pra um portal no `body` — Select dentro de Card/Modal não corta mais; pilha de Esc (só o de cima fecha); trava de scroll com contagem que devolve o `overflow` anterior; foco volta pro gatilho; popup fecha ao perder o foco. z-index vira escala `--via-z-*` (196 → 203 tokens).
- **Gestos de fechar**: `useDragDismiss` guarda os callbacks em ref — re-render do pai não cancela mais a animação de saída (Sheet ficava meio fechado com a página travada; Toast idem). Drawer/Sheet/Lightbox voltam ao lugar se o consumidor mantém `open` (antes ficava um scrim invisível bloqueando a tela).
- **Acessibilidade das peças compostas** (nada disso aparecia no axe, que não renderizava a lib): Select/DatePicker no padrão combobox (leitor de tela anuncia o valor escolhido); chips do MultiSelect fora do botão; grade do Calendar/DatePicker com linhas e células; grupos do Command; DropdownMenu com `aria-haspopup/expanded/controls`; TreeView com foco no `treeitem`; Icon com `role="img"`; Modal liga a descrição; Stepper anuncia etapa concluída; Toast pausa no hover/foco e usa uma região viva só; Carousel com pausa (WCAG 2.2.2) e slides escondidos fora do Tab; Tooltip/HoverCard fecham com Esc.
- **Comportamento**: OTPInput não embaralha dígitos; "Últimos 7 dias" = 7; "Hoje" respeita min/max; TimePicker respeita min/max; TagInput com label ligado e foco mantido no máximo; Input com `useId` (sem id novo a cada tecla); Button `loading` não derruba o foco; ColorPicker com setas; Splitter no toque; Avatar cai pras iniciais se a foto falha; ThemeProvider não quebra com `localStorage` bloqueado e `useTheme` sem provider responde claro.
- **Docs que prometiam o que não existe**: `/api/modal` documentava `dismissOnScrim` (agora existe), Pill `icon` era `iconLeft`, Slider sem 8 props, Drawer sem `footer`/`hideClose`, defaults errados (Tooltip 500 → 200 ms, Card `as`, Drawer `side`…).
- **Busca**: as ~180 rotas serviam o mesmo título, descrição e canonical da home; agora cada rota tem os seus (`RouteMeta`), e 404/placeholder levam `noindex`.
- **`/guia` sem barra final** carregava capa, monograma e botão de PDF quebrados (caminho relativo) — caminhos absolutos.
- **Segurança**: `react-router-dom` 7.15.1 → 7.18.4 (5 alertas, 2 altos); `bun audit --prod` zerado.
- **Coerência com a própria regra**: link em texto corrido sublinhado; seletores de páginas do site saíram do `tokens.css` (vazavam pra lib, kit e plugin com `!important`); kit para de levar Geist Italic; README do kit e `/via-deck` com logo e capa light-first; `/via-check` não manda mais usar itálico; preços e contagens de alunos de exemplo viram `R$ [valor]` / `[N]` com a regra "nunca invente".
- **Travas**: `dist/lib/package.json` com `"private": true` (sem `publishConfig` público); starter usava `--via-surface-1/2` (não existem).
- `heading-order` em `/patterns/paid-ads`; changelog apontava pro repositório errado.

### Melhorado (28/out · auditoria do DS)

- **Velocidade no celular**: CSS do site minificado (lightningcss, vidro conferido), Geist servida pelo próprio site com preload (sem Google Fonts), React/roteador em chunk próprio, logos com tamanho e cópias leves, capa do `/guia` em WebP. Lighthouse mobile: home 85 → 95, `/guia` 69 → 93 (LCP 7,7 → 2,6 s).
- **Docs geradas do código**: `scripts/gen-props.mjs` lê os tipos da lib e alimenta as tabelas das 46 páginas `/api` (roda no `build`; `--check` barra arquivo velho); teste de drift falha se a página descreve prop que não existe ou deixa prop sem descrição. Botão **Copiar** em todo bloco de código e **playground** ao vivo em 14 componentes.
- **Microcopy de produto**: `/guidelines/microcopy` com 65 frases canônicas (erro, vazio, confirmação, sucesso, carregamento, onboarding, botão, ajuda), fonte única em `src/content/microcopy.ts`, espelhada em `microcopy.md` da skill e no kit. Produto e emails em **"você"**: 7 templates que usavam tu/teu/tua corrigidos; `/via-check` passa a cobrar.
- **Testes**: axe passa a rodar nas 46 páginas `/api` (a lib nunca era renderizada); 519 → 793 testes unitários; cobertura da lib 87 → 93% (piso de 30 → 80%).

### Adicionado

- Lib: `Modal.dismissOnScrim`, `DataTable.rowKey`, `DataTable.onSortStateChange`, `DataTable.sortBy` aceita `null`, tokens `--via-z-*`.

### Melhorado (28/out · rodada de melhorias)

- **Marca abre clara também no CSS cru**: saiu o bloco `@media (prefers-color-scheme: dark) :root:not([data-theme])` — ele virava um escuro PARCIAL (só fundo e texto principal) em quem usava o `tokens.css` sem React. Escuro agora só com `data-theme="dark"`. Site e `<ThemeProvider>` não mudam (sempre setam o tema). O anti-FOUC do starter e o snippet da skill seguiam o SO por padrão — agora claro, igual ao Provider.
- **Vitrine de anúncios em fundo claro** (`/patterns/paid-ads`): os 9 formatos (Meta, carrossel, story, reel, LinkedIn, carrossel LinkedIn, Google Display, YouTube, A/B) passam a seguir a regra zero — fundo claro com atmosfera navy, lockup e CTA navy; navy de fundo só no card de fechamento do carrossel. Cores fixas no mockup (igual nos 2 temas da página).
- **Espaçamento tokenizado**: 3.820 `padding`/`margin` em px viraram `var(--via-space-*)` em 153 folhas (mesmo px, zero diff visual). 553 valores fora da escala (3, 5, 7, 9, 11, 26px…) ficam crus — pedem decisão de design. `token-drift` passa a barrar padding/margin em px que já têm token.
- **Endereço oficial e prévia de link**: canonical, OG, sitemap e robots apontavam pra `viverdeia.ai/design` (404) e a imagem de prévia não existia. Agora `viver-de-ia-ds.vercel.app` é o endereço oficial (até a marca ganhar o domínio próprio) e há `og-cover.png` 1200×630 no padrão claro. Descrições de compartilhamento atualizadas (eram "49 páginas · 15 componentes").
- **Vidro conferido no Safari e no iPhone** (WebKit 26.4 via Playwright, Desktop Safari + iPhone 15 Pro): mesma contagem de superfícies com vidro ativo que o Chrome em 5 rotas; `style.css` minificado da lib com 61/61 regras de vidro com o blur padrão (eram 7/61 antes do conserto de ordem).

### Corrigido

- **Rodada pós-retomada (28/out)** — erros medidos no Mac, todos com verificação de contraste:
  - **Verde de "positivo" ilegível** na camada de dados e no FP&A (4,33:1 no branco, 3,9:1 no card escuro): novo token `--via-success-text` (`#18744C` claro · `#4FBF8B` escuro) em `.via-delta--up` e nos números de meta batida; notas do DRE saem do `--via-text-faint` (2,5:1) pro `--via-text-soft`.
  - **Rodapé dos 14 emails** com texto a 2,25:1 sobre o fundo cinza: `#4F596B` / `#636D80` (mesmos tons de `--via-text-muted` / `--via-text-soft`).
  - **`--via-border-strong`** virava shorthand `1px solid …` no claro (3º `:root`) e invalidava o `border-color` da tela de mentor: agora é cor nos dois temas.
  - **Prompt das outras IAs** (`docs/system-prompt.md`): ensinava barra lateral no hover (banida), itálico no checklist, vidro com número solto e na ordem que o minify apaga, sombra com navy literal; faltavam tinta de sombra e escala de raio. `public/llms.txt` era a versão de maio (sem light-first, `defaultMode="system"`) e virou cópia exata.
  - **`/via-paid`** mandava fundo navy por padrão: agora claro (regra zero).
  - **Legenda do post de Instagram** em `/patterns/social-coverage` sumia no tema escuro (1,47:1 — o `p` do docs herdava `--via-text-body`): o mockup agora fixa a própria cor. O cinza do horário fica (é o da plataforma).
  - **Kit ZIP**: o resumo de princípios e os 2 exemplos HTML ensinavam itálico; o post de Instagram de exemplo era navy (post é claro por padrão) — agora em reto e claro.
  - Exemplos de vidro na skill e em `/glass/anatomy` na ordem certa (`-webkit-` primeiro); skill diz v0.6.1 e que o starter só roda dentro do repo.
- **Vidro sumia no build minificado** (lib, kit e quem vendoriza o CSS): 595 regras tinham `backdrop-filter` antes de `-webkit-backdrop-filter`; o lightningcss (Vite 8 / Next.js) trata o prefixado como sobrescrita e apaga o padrão → Chrome/Firefox sem blur (no `style.css` da lib, só 7 de 61 regras de vidro mantinham o blur padrão). Ordem invertida em todo o CSS + plugin (zero diff de pixel no site).
- **Tokens em JS/JSON com valores do tema escuro**: `tokens.ts`, `dist/lib/tokens.json` e o `tokens.json` do kit pegavam a última definição do arquivo inteiro — 56 tokens saíam com o valor do dark/`prefers-reduced-transparency` (`via-bg` = `#0B1220`, `via-glass-blur` = `none`) e os 6 half-steps (`--via-space-0_5`…`5_5`) faltavam. Os 3 parsers duplicados viraram 1 (`scripts/parse-tokens.mjs`), lendo só o `:root` padrão. 189 → 195 tokens.
- Kit ZIP regenerado (passa a levar o email 14, o vidro e os tokens corrigidos).
- Lint volta a 0 warnings (`Philosophy` lia o CSS com `setState` dentro de effect).

### Adicionado

- Guarda `lint:glass` (`scripts/glass-order.mjs`) no CI.
- `lint:sync` passa a guardar as cópias do prompt das IAs (`public/viver-de-ia-system-prompt.md`, `public/llms.txt`).
- Teste dos tokens gerados (`src/lib/tokens.test.ts`).
- `CLAUDE.md` (mapa e regras pra quem trabalha no repo), `docs/estado-e-roadmap.md`, `playwright.cloud.config.ts` (Playwright com o Chromium da máquina, pra sessão em nuvem).

### Removido

- Sondas da auditoria esquecidas na raiz (`__shadowcheck.mjs`, `__shadowcheck2.mjs`, `.shadow-check.mjs`).

### Plugin

- `viver-de-ia` **1.5.0 → 1.6.0**: `colors_and_type.css` nasce claro sem `data-theme`, `surfaces.css`/`data.css` com espaçamento em token, skill com anti-FOUC claro por padrão.
- `viver-de-ia` **1.4.2 → 1.5.0**: token `--via-success-text`, `data.css` e `colors_and_type.css` atualizados, `/via-paid` light-first, skill com exemplos de vidro na ordem certa.
- `viver-de-ia` **1.4.1 → 1.4.2**: leva a ordem do vidro corrigida nas 3 folhas empacotadas e o email 14 na skill. O conteúdo tinha mudado sem bump, então quem já estava no 1.4.1 não recebia.

### Jul–ago (sem release)

- **Fluidez Apple** (04/ago): motor de mola próprio (`_shared/spring.ts` + `useDragDismiss`) com arrasto-pra-fechar em Drawer/Sheet/Lightbox/Toast, saída animada, origem espacial, materialização, resposta no apertar (`--via-dur-press` 110ms) e borda de rolagem. Plugin 1.4.0.
- **Material acessível** (04/ago): `prefers-reduced-transparency` solidifica o vidro e `prefers-contrast: more` engrossa bordas, resolvido nos tokens.
- **Auditoria visual completa** (27–28/jul): as 108 rotas revisadas em claro e escuro, em 6 lotes + passada final (~550 correções): texto invisível, barras laterais, superfície chapada, dark quebrado, 15 tokens do escuro anulados, 453 sombras migradas pra tinta `--via-shadow-ink-*`, fim do itálico sintético. Plugin 1.3.0 com a lei pós-auditoria.
- **Camada de dados** (`src/styles/data.css`) e pattern **FP&A** (DRE · ponte · caixa · runway); gráficos com paleta validada por script e sem eixo duplo; gráficos interativos com `role=group`.
- **Acabamento**: liquid glass em 112 superfícies e 252 controles (hover/active/focus), cantos na escala de raio, fim da linha lateral em cards, avatar de vidro sem anel colorido.
- **Marca** (25/jul): light-first de verdade, logo sempre em lockup, glass card como padrão.
- **Distribuição**: `AGENTS.md` pro Codex no kit (08/jul), system-prompt atualizado (19/jul), guarda `lint:sync` (06/ago) e plugin 1.4.1.

### Adicionado (ago)

- **Email `welcome-plataforma`** (Boas-vindas à plataforma · 14º template de produção): disparado quando o acesso do aluno à plataforma é liberado (primeiro login). Variáveis `firstName`, `loginEmail`, `platformUrl` · 3 passos (login → trilha de início → apresentação na comunidade) · CTA "Acessar a plataforma". Distinto do `welcome` (que confirma vaga em turma). Registrado no motor (`build-emails.mjs`) e no mostruário `/patterns/email` · 27.5KB, checagens bulletproof ✓.

## [0.6.1] · 2026-07-01

Passe world-class: auditoria multi-agente (120 agentes · 157 folhas de estilo · verificação adversarial) → 109 achados confirmados, tudo corrigido e verificado. Nenhuma mudança breaking.

### Corrigido

- **Dark mode sistematicamente reparado** (85 dos 109 achados). Causa nº1 (~200 lugares): brilho branco de topo hardcoded (`rgba(255,255,255,0.9x) inset`) virava "moldura branca berrante" no escuro → migrado pro token `--via-edge-hi` (idêntico no light, 0.08 no dark). Causa nº2: navy/claros literais em ícone/ponto/borda/superfície que sumiam ou viravam mancha no dark → tokens adaptáveis (regra: valor light preservado). Verificado no navegador (dashboard/table/states/onboarding/form limpos nos 2 temas).
- **Contraste**: eyebrow do wizard (navy invisível sobre aside navy → gray-300), calendário `is-out` (2.6:1 → 4.97:1), watermarks e helpers de baixo contraste.
- **Paleta** (vazamentos fora da marca restrita): roxo `#6A2BC2` no code-block → azul; verde-menta e verde-neon nos checkmarks → `--via-success` sóbrio; vermelho `#FF5F57` (REC) → coral sancionado.
- **Bordas** 2px opacas → hairline adaptável; **motion**: pulse infinito do Stepper removido.
- Selo de versão do hero desatualizado (0.5·107 → 0.6·108).

### Adicionado

- **Fundação de tokens** (tudo drop-in · 0 diff em 214 snapshots visuais): escala de espaçamento com half-steps estilo Tailwind (`--via-space-0_5`..`-5_5`, `-7`, `-9`, `-14`); escala de tipo fechada com os 2 tamanhos mais usados que faltavam — `--via-fs-micro` (10px) e `--via-fs-caption` (13px); letter-spacing largo/tight ligado aos tokens canônicos. **169 tokens `--via-*`** no total.
- **Guard-rail `token-drift`** no CI (`scripts/token-drift.mjs` · `bun run lint:tokens`): barra reintroduzir valor hardcoded que já tem token exato. Já pegou 49 casos na estreia.

### Plugin

- `viver-de-ia` **1.1.0 → 1.2.0**: `colors_and_type.css` empacotado agora é a fonte completa (inclui o bloco de dark mode + tokens novos) — o time recebe o DS atual, não um snapshot.

## [0.6.0] · 2026-06-02

### Adicionado

- **Sistema de email de PRODUÇÃO à prova de bala** (`emails/` · react-email):
  - 13 templates de produção: `welcome`, `enrollment`, `billing`, `nps`, `digest`, `event-invite`, `recap`, `drip`, `lancamento`, `oferta`, `churn`, `winback`, `urgent-ops` — todos table-based + estilo inline, &lt;30KB, testáveis em Gmail/Outlook/Apple Mail.
  - Motor token-driven (`emails/theme.ts`) com a identidade destilada pro que email renderiza: navy-dominant, fios finos, tipografia editorial. **Liquid glass simulado** (hero navy + painéis frosted + CTA glossy) com **degradê SEMPRE pareado com `background-color` sólido de fallback** → Outlook mostra sólido, Apple Mail/Gmail mostram o brilho.
  - **CTA navy sólido** (sobrevive ao Outlook), **lockup correto** (monograma + wordmark), travado em modo claro, preheader, logo hospedada absoluta.
  - `scripts/build-emails.mjs` renderiza pra `public/emails/*.html` (+ `.txt` + `manifest.json`) com checagem automática de bulletproof (tabela/inline/fallback).
  - `/patterns/email` reescrita: faz **iframe do HTML real** (o mostruário deixou de simular) + explica o motor e o envio via Resend.
  - Kit universal passa a empacotar `kit/emails/` com os 5 HTMLs reais.

### Corrigido

- **Botão `accent`** (lib): degradê navy→cinza embarrado + texto navy-sobre-navy (1.5:1) → navy intensificado glossy + texto branco (16.5:1). Mesma família corrigida em `Icon` (`surface-accent`, `surface-navy`).
- **Glifo itálico cortado** em gradient-text (`background-clip: text`): `padding-right` na caixa + `margin-right` negativo (zero deslocamento) cobre o overhang. Fix sistêmico em todos os `hN em`.
- **Kit determinístico cross-OS**: zip gerado via Python `ZIP_STORED` (ordem sortada + date_time/atributos fixos) → bytes idênticos em macOS e Linux. O `zip` CLI gravava headers dependentes do SO, o que fazia o CI recommitar o .zip a cada push; resolvido de vez.

### Automação

- Workflow `kit.yml`: regenera lib + emails + kit a cada push que toca a fonte do DS e commita de volta (desacoplado do deploy).

## [0.4.0] · 2026-05-20

### Adicionado

- **Tokens em JSON + TypeScript types** (`@viverdeia/design-system/tokens`):
  - `scripts/build-tokens.mjs` parseia `tokens.css` → `src/lib/tokens.ts` (132 tokens · runtime + `TokenName` union)
  - `dist/lib/tokens.json` machine-readable com `$version`, `$generated`, categorização (color/spacing/radius/shadow/font/motion/surface)
  - Helpers: `tokens['via-navy']`, `cssVar('via-radius-lg')`, type-safe `TokenName`
  - Subpath exports: `./tokens` (TS), `./tokens.json` (raw), `./tokens.css` (CSS)
- **Vitest + RTL · unit tests dos hooks e behaviors:**
  - 28 testes em 4 suites: Modal (ESC/scroll lock/close button), useToasts (CRUD + actions), Tabs (keyboard nav/wrap/Home-End/controlled), DataTable (sort cycle/accessor/empty/onRowClick)
  - `vitest.config.ts` + jsdom + jest-dom matchers · coverage v8 com threshold 30%
  - CI workflow roda `test:unit` entre lint e build
- **Lighthouse CI · perf budget enforcement:**
  - `.lighthouserc.cjs` com targets desktop (LCP <2.5s · CLS <0.05 · TBT <200ms · perf ≥0.90 · a11y ≥0.95)
  - `.github/workflows/lighthouse.yml` em push/PR/manual dispatch
  - Bundle size budget (<600KB total)
- **Integration guides** (`docs/integration/`):
  - `nextjs.md` · App Router + Pages Router + `next/font` Geist
  - `vite.md` · SPA + Geist via CDN + dark mode toggle
  - `remix.md` · SSR + `links()` export + dark mode sem flash via cookie
  - `README.md` · índice + quick start universal
- **Skill `/viver-de-ia-design` atualizada** com regras consolidadas (paleta restrita endurecida, library 31 componentes, CI/CD)

### Removido

- `examples/vite-starter/`, `.github/workflows/release.yml`, `RELEASE.md`, `scripts/smoke-test-lib.mjs`, tag `v0.4.0` no remote — todos focavam em publicar `@viverdeia/design-system` no npm público. **DS é referência interna** · não publica pro mundo. Mantemos `finalize-lib.mjs` pra gerar o bundle local, mas sem release workflow npm.

### Modificado

- `tsconfig.lib.json` exclui `*.test.*` e `*.stories.tsx` do declaration build
- `tsconfig.app.json` adiciona `vitest/globals` e `@testing-library/jest-dom` aos types
- `package.json` scripts: `test:unit` + `test:unit:watch` + `test:unit:coverage` + `test:perf` + `test:smoke` + `build:tokens`

## [0.3.0] · 2026-05-20

### Adicionado

- **Library +6 componentes** (25 → 31 total · "DS de verdade"):
  - `<Popover>` · floating panel · 4 sides × 3 alignments · ARIA dialog · ESC + outside-click closes
  - `<Command>` · paleta Cmd+K keyboard-first · filtragem live · groups + shortcuts · ARIA listbox
  - `<DatePicker>` · single date · month grid editorial · pt-BR · weekStartsOn · min/max · footer Limpar/Hoje
  - `<Slider>` · range editorial · 3 tones × 3 sizes · marks opcionais · native input pra ARIA valuetext
  - `<Alert>` · banner persistente · 4 tons (info/attn/danger/success) · dismissible · action inline
  - `<DataTable>` · sortable · accessor pra derived sort · render pra ReactNode cells · ARIA sort
- **Fundação git + CI/CD:**
  - `git init` + 4 commits estruturados (bootstrap → tooling → docs → source)
  - GitHub Actions `ci.yml`: build · lint · typecheck · visual regression (192) · a11y (96 routes)
  - GitHub Actions `release.yml`: publish `@viverdeia/design-system` to npm em tag `v*` com provenance
  - Repo público: https://github.com/rafaelmilagre7/viver-de-ia-ds
- **Showcase Library** atualizada com 6 novas seções demonstrando os componentes

### Modificado

- `--via-gold*` tokens renomeados pra `--via-accent*` (149 usos em 27 arquivos) · semântica limpa
- Class names `.gold` → `.accent` em CSS + TSX (variants Button, Pill, Icon, Progress + 13 pages)
- `Philosophy.tsx` corrigido: function name `RuleGoldSection` → `RulePaletteRestritaSection`, texto contraditório removido, tokens stale na paleta atualizados
- `DosDonts.tsx` linha "Cor": "Gold só como acento ÚNICO" → "navy protagonista · cinza estrutura"
- Centenas de hexes hardcoded tokenizados:
  - `#000`/`#FFFFFF` → `var(--via-black)`/`var(--via-white)`
  - `#0A1F3B` em SVG attrs → `style={{ fill: 'var(--via-navy)' }}` (CSS vars via inline style)
  - Fine-tunes navy (`#051C36`, `#0E2C57`, `#2A5388`, `#2E4C76`, `#244569`) → tokens existentes
  - Achievement `Ring` component refatorado pra usar `style` prop em vez de SVG attribute
- 2 hexes intencionais preservados em production: `#5BC0FA` (WhatsApp check) + `#4285F4` (Google Sign-In)

## [0.2.0] · 2026-05-20

### Adicionado

- **Library expandida 6 → 20 componentes core:**
  - `<Toast>` + `useToasts()` hook · stack editorial com 4 variants e auto-dismiss
  - `<Tooltip>` · 4 sides · hover + focus aware · ARIA describedby
  - `<Modal>` · 3 sizes · ESC fecha · focus trap · scroll lock
  - `<Tabs>` · underline + pills · keyboard arrow/Home/End · ARIA tablist
  - `<Switch>` · toggle on/off · 2 sizes · `role="switch"`
  - `<Checkbox>` · estado indeterminate suportado
  - `<RadioGroup>` · escolha única com options · ARIA radiogroup
  - `<Select>` · combobox custom · ESC + click outside fecha
  - `<Progress>` · barra 3 tones × 3 sizes · ARIA progressbar
  - `<Drawer>` · sheet right/left/bottom · ESC fecha · focus trap
  - `<Spinner>` · loader inline 3 sizes 3 tones · reduce-motion aware
  - `<Skeleton>` · placeholder shimmer · text/rect/circle
  - `<Breadcrumb>` · navegação hierárquica · ARIA nav
  - `<Pagination>` · numerada editorial · prev/next + elipses
- **Catálogo Ladle** (`bun run story`) com 16 stories cobrindo todos os componentes
- **Visual regression suite** Playwright (`bun run test:visual`) · 192 testes (96 rotas × desktop + mobile)
- **Dark mode global** via `data-theme="dark"` + auto-detect `prefers-color-scheme` + toggle em `<Header>`
- **Code-splitting** por rota via `React.lazy` + `<Suspense>` + RouteLoader editorial
- **Library publicável** `@viverdeia/design-system` (`bun run build:lib`) com ESM + CJS + types + tokens.css standalone
- **SEO completo:** OG tags, Twitter cards, robots.txt, manifest.json, sitemap.xml auto-gerado com 96 URLs
- **Mobile responsiveness:** drawer hamburger, hero stats wrap, grids 1-col em ≤720px, wordmark esconde em ≤560px
- **Acessibilidade:** focus-visible rings, reduce-motion respect, aria-labels em icon-only buttons
- README do repo (visão completa) + README publicável da library (363 linhas com prop tables)
- Filosofia editorial cristalizada em `src/pages/foundations/Philosophy.tsx`
- 49 páginas vivas no site de referência cobrindo fundamentos, glass, iconografia, componentes, padrões, showcase, guidelines

### Modificado

- Sidebar group icons: 11px → 14px com stroke 1.8 · container 22px → 26px com gradient navy-12→navy-04 (visibilidade real)
- Tokens semânticos consolidados em 3 camadas (atomic → semantic → component)
- 800+ usos de `--via-border-soft`, `--via-ink-2/3`, `--via-gold`, `--via-coral` agora têm tokens correspondentes em `:root`

### Corrigido

- **CRÍTICO** · `tokens.css` tinha `@media (prefers-color-scheme: dark)` envolvendo 140 variáveis órfãs (typography, spacing, radii, shadows, blur, motion, mesh). No modo claro o site renderizava branco-em-branco. Fix: fechar `@media` no lugar correto + abrir novo `:root` pras 140 vars
- 37 imports não-usados varridos (Curriculum, EditorialBlocks, LocationCard, MentorMatching, StatusPage, etc) bloqueavam build estrito
- Roadmap.tsx tinha type discrimination quebrado entre cards "now/next" e "later" — refatorado pra interface `RoadmapCard` única com props opcionais
- Settings.tsx usava classe `.al-nav` mas não importava `aluno.css` — nav editorial não tinha gap em dev
- Vite 8 cssMinify (lightningcss) falhava em multi-line custom property `--via-glow-navy-strong` — desligado, JS continua minify oxc

## [0.1.0] · 2026-05-18

### Adicionado

- Setup inicial do projeto: Vite 8 + React 19 + TypeScript estrito + bun
- 49 páginas de referência (foundations, glass, iconography, components, patterns, showcase, guidelines)
- Library inicial de 6 componentes: `<Button>`, `<Pill>`, `<Card>`, `<Input>`, `<Avatar>`, `<Icon>`
- Tokens CSS com 300+ variáveis em 4 camadas semânticas
- Mesh navy + noise texture + glow navy como assinatura visual
- Tipografia Geist + Geist Mono (migração de Fraunces+Inter)
- 7 não-negociáveis editoriais cristalizados (light-first, glass intencional, gold singular, pills canônicas, coral só destrutivo, sparkles banido, voz operador)
- Skill `/viver-de-ia-design` em `~/.claude/skills/`

---

## Tipos de mudança (referência rápida)

- **Adicionado** — nova feature ou componente
- **Modificado** — mudança em comportamento ou API existente
- **Depreciado** — feature ainda funciona mas será removida em próxima major
- **Removido** — feature que foi removida
- **Corrigido** — bug fix
- **Segurança** — vulnerabilidade resolvida

## Sobre versionamento

Estamos em `0.x` durante adoção interna (Nina, Iris, ExecSeats, plataforma). Breaking changes podem ocorrer em minors até `1.0.0`. Após estabilização, semver estrito (breaking em major).

[0.2.0]: https://github.com/rafaelmilagre7/viver-de-ia-ds/releases/tag/v0.2.0
[0.1.0]: https://github.com/rafaelmilagre7/viver-de-ia-ds/releases/tag/v0.1.0
