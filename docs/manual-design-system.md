# Manual de Construção — Design System de Nível Mundial (operado por IA)

**Template replicável para qualquer marca.** Preencha os campos `[ preencher ]` com as diretrizes da sua marca. Os exemplos marcados como *Viver de IA* são reais — mostram como cada peça foi resolvida num DS de verdade, do zero ao deploy, operado por IA.

> **Como usar este documento**
> 1. Leia a Parte 0 (como dirigir a IA) e a Parte 1 (anatomia) pra ter o mapa.
> 2. Crave as 5 decisões da Parte 2 — é o único trabalho que **não** dá pra delegar.
> 3. Use as Partes 3–9 como especificação: cada uma diz **o que decidir**, **o que pedir pra IA** e **como saber que ficou bom**.
> 4. Preencha o **prompt-mestre** da Parte 11 com a sua marca e cole na sua IA — é o que faz o time inteiro produzir no padrão.
> 5. Siga o roadmap em ondas (Parte 10). Não tente fazer tudo de uma vez.
>
> Este manual serve tanto pra um time humano quanto pra ser entregue a uma IA (Claude, Cursor, Lovable, ChatGPT) como contexto de construção.

---

## Parte 0 — Os 4 princípios de operação (leia antes de tudo)

Um Design System de nível mundial não nasce de uma ferramenta — nasce de uma **postura**. Estes quatro princípios valem mais que qualquer técnica:

1. **A IA executa, você dirige o gosto.** A IA gera dez opções em segundos; o trabalho humano é ter o olho pra escolher a certa e pedir o ajuste fino. Use a IA como um time inteiro sob a sua direção, não como um truque.
2. **Só é "pronto" quando está impecável.** Não "pronto pra testar" — pronto. A régua é Linear, Stripe, Notion. Abaixo disso, volta pra mesa. O "quase bom" não constrói marca, e o cliente sente a diferença mesmo sem saber nomear.
3. **Meça tudo, confie em pouco.** Número acima de opinião. Contraste, performance, acessibilidade — tudo verificado, não no "tá bom assim". O que não se mede é só achismo bem-vestido.
4. **Bloco a bloco, um de cada vez.** Nunca gere em massa sem revisar. Cada peça é um bloco: a IA monta, você corrige, só então segue pra próxima. Velocidade vem da ordem, não da pressa.

---

## Parte 1 — Anatomia de um Design System completo

### As 4 camadas

Todo DS, do menor ao mais robusto, tem quatro camadas. Guarde essa imagem — o resto do manual se apoia nela.

| Camada | O que é | Quem decide |
|---|---|---|
| **1. Princípios & identidade** | A alma da marca: cor, tipografia, voz, o "jeito". | Só o dono (Parte 2). |
| **2. Tokens** | As decisões viram valores nomeados e reutilizáveis. O vocabulário do sistema. | IA constrói, você revisa (Parte 3). |
| **3. Componentes** | Botões, cards, formulários, emails — montados com os tokens. | IA constrói (Parte 6). |
| **4. Distribuição** | O que faz o sistema sair do papel e o time usar todo dia. | IA + processo (Parte 8). |

> A camada 1 é **trabalho humano**. As camadas 2–4 a IA constrói pra você. Por isso o manual começa pelas decisões.

### A superfície real: um DS não é só o seu app

O erro mais comum é achar que Design System é "as telas do produto". Um DS completo é um **sistema operacional de marca** — cobre **tudo** que a marca toca:

- **Produto** — app, web, dashboards
- **Relacionamento** — emails (que não podem quebrar no Outlook)
- **Aquisição** — social, anúncios pagos
- **Conversão** — pitch deck, proposta, one-pager
- **Operação** — guias, contratos, apresentações, PDFs
- **Presença** — eventos, sinalização

Quando **toda** superfície fala a mesma língua, a marca vira maior que a soma das peças. Quando não fala, cada área dilui as outras. Um DS completo não é estética — é **alavanca de percepção, de confiança e, no fim, de receita**.

---

## Parte 2 — As 5 decisões de marca (o trabalho do dono)

A IA executa lindamente, mas alguém precisa dizer o que é "lindo" para esta marca. Aqui está o que não dá pra delegar. Crave **poucas decisões, com convicção** — toda restrição aqui é uma decisão que ninguém (nem a IA) precisa tomar de novo depois.

### 1 · A cor
- **A pergunta:** Qual é a ÚNICA cor que é a sua marca? E o que você corta pra ela respirar?
- **Regra de ouro:** premium é menos. Paleta restrita > paleta larga. 1 cor dominante + neutros + 1 cor de destaque (geralmente só pra destrutivo/erro).
- *Viver de IA:* navy `#0A1F3B` dominante; branco/off-white/cinza; coral só pra destrutivo. **Zero** dourado, neon, roxo, cyan.
- **`[ preencher ]`** Cor principal (hex): ___ · Neutros: ___ · Cor de destaque e onde usar: ___ · Cores **proibidas**: ___

### 2 · A tipografia
- **A pergunta:** Uma fonte que aguente título e corpo e que diga o tom da marca.
- **Regra:** uma família só. Nada de misturar quatro fontes.
- *Viver de IA:* Geist pra tudo.
- **`[ preencher ]`** Família principal: ___ · (opcional) mono pra dados/código: ___

### 3 · A assinatura visual
- **A pergunta:** Qual é o seu detalhe memorável — o elemento que faz alguém saber que é você sem ver o logo?
- *Viver de IA:* o *liquid glass* — superfícies de vidro, profundidade, luz. (A "receita" técnica está na Parte 4.)
- **`[ preencher ]`** A assinatura da marca: ___ (ex: vidro, sombras longas, traço, grão, brutalismo, gradiente específico...)

### 4 · A voz
- **A pergunta:** Como a sua marca SOA? Liste 3 coisas que ela diz — e 3 que ela nunca diria.
- *Viver de IA:* operador, direto, número antes de adjetivo. Sem hype, sem clichê de IA.
- **`[ preencher ]`** Diz: ___ / ___ / ___ · Nunca diz: ___ / ___ / ___

### 5 · O princípio-mãe
- **A pergunta:** Qual é a única frase que, em caso de dúvida, decide tudo no seu design?
- *Viver de IA:* simplicidade radical — a IA carrega o peso, o usuário sente valor em minutos, complexidade é inimiga.
- **`[ preencher ]`** O princípio-mãe: ___

---

## Parte 3 — Arquitetura de tokens (3 camadas)

Tokens são o que faz o DS escalar. O segredo é que eles têm **gramática**, não só palavras — vivem em três camadas. Isso é o que deixa você trocar algo num lugar e a marca inteira se atualizar sozinha.

| Camada | O que é | Exemplo (Viver de IA) |
|---|---|---|
| **Primitivo** | O valor cru. | `--navy: #0A1F3B` |
| **Semântico** | O papel do valor. | `--color-action: var(--navy)` · `--color-text: #0A1F3B` |
| **Componente** | O uso na peça. | `--button-bg: var(--color-action)` |

**Convenção de nomes (sugestão):**
```
/* primitivo */     --brand: #______;  --brand-deep: #______;  --ink: #______;  --line: #______;
/* semântico */     --color-action: var(--brand);  --color-text: var(--ink);  --color-surface: #FFF;
/* componente */    --button-bg: var(--color-action);  --card-border: var(--line);
```

**O que pedir pra IA:** *"Transforme estas 5 decisões em tokens em três camadas (valor → papel → uso). Inclua claro **e** escuro desde o início — o modo escuro é a mesma regra (os tokens) respondendo ao contexto, não um remendo depois."*

**Como saber que ficou bom:** trocar 1 primitivo atualiza a marca inteira sem caçar cor em mil arquivos. Cada token tem nome óbvio. Existe versão clara e escura de tudo.

---

## Parte 4 — A assinatura visual (a receita do efeito)

A assinatura (decisão 3) é o que torna a marca reconhecível num piscar. Defina-a como uma **receita reaplicável**, não um enfeite pontual.

*Viver de IA — a receita do liquid glass* (serve de modelo pra qualquer efeito de profundidade):
```css
.glass {
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,.14), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,.9), rgba(246,249,252,.55)), #fff;
  border: 1px solid rgba(10,31,59,.09);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.95),   /* brilho no topo */
    0 16px 36px -20px rgba(10,31,59,.20);  /* sombra suave e profunda */
}
```
Os três ingredientes de profundidade — **gradiente + brilho interno no topo + sombra longa** — valem pra quase qualquer assinatura premium. Adapte os valores pra marca.

**`[ preencher ]`** Descreva a receita da sua assinatura (efeito + valores) pra IA reaplicar em todo componente.

---

## Parte 5 — Tipografia & escala

Defina uma escala fixa (não tamanhos soltos). Sugestão de pontos de partida:

| Papel | Peso | Tamanho (web) |
|---|---|---|
| Display / hero | 600 | 40–48px |
| Título (h2) | 600 | 26–30px |
| Subtítulo (h3) | 600 | 15–17px |
| Corpo | 400 | 14–16px |
| Etiqueta / eyebrow | 600, maiúscula, espaçada | 10–11px |

Regras: line-height confortável (1.5–1.65 no corpo), tracking levemente negativo nos títulos grandes, uma família só.

---

## Parte 6 — Inventário de componentes

Construa **bloco a bloco**, na ordem de uso. Cada componente precisa nascer com: **todos os estados** (normal/hover/foco/ativo/desabilitado), **claro + escuro**, e **acessibilidade** (contraste, teclado, leitor de tela).

**Ordem sugerida (Onda 1 — os que você mais usa):**
`Botão · Campo de texto · Card · Tipografia/heading · Link · Badge/Pill`

**Base & formulário:** Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker, Combobox, Upload, Form field.
**Overlay & navegação:** Modal/Dialog, Drawer, Tooltip, Popover, DropdownMenu, Tabs, Breadcrumb, Pagination, Command (Cmd+K).
**Dados & feedback:** Table, Card, Badge/Pill, Avatar, Toast, Alert, Banner, Progress, Skeleton, Spinner, EmptyState, Accordion, Stepper.

> *Viver de IA:* ~47 componentes, publicados como biblioteca instalável e versionada (`@marca/design-system`). Quem constrói o produto puxa a peça pronta; não recria. É o que mantém o padrão mesmo com gente nova entrando.

**O que pedir pra IA:** *"Construa o componente [X] usando os tokens, com todos os estados, claro e escuro, e acessível (contraste AA, navegável por teclado). Mostre numa página de referência ao lado das regras."*

---

## Parte 7 — As superfícies (o sistema operacional de marca)

Padronize cada superfície com os mesmos tokens e componentes. Pontos de atenção por superfície:

- **Produto:** telas, formulários, dashboards. É a base.
- **Email — atenção, tem regras próprias.** Email quebra fácil. Regras à prova de bala:
  - Layout em **tabelas** + estilos **inline** (nada de classes externas).
  - Largura ~600px, peso < 102KB.
  - Botão (CTA) com **cor sólida de fundo** — degradê sozinho some no Outlook. Todo `background-image` precisa de um `background-color` de fallback.
  - Travar modo claro (`color-scheme: light only`), logo hospedada em URL absoluta, preheader definido.
  - **Teste numa caixa de entrada real**, não só no preview.
- **Social & anúncios:** templates por canal, no mesmo padrão visual.
- **Vendas:** pitch deck, proposta, one-pager — material comercial coeso.
- **Documentos:** guias, contratos, PDFs (como este). Dica: monte em HTML com o DS e **renderize pra PDF com um navegador headless** (Chromium/Playwright) — sai fiel, com gradiente, vidro e fonte certa.
- **Eventos:** palco, crachá, sinalização.

---

## Parte 8 — Distribuição (o multiplicador)

Um DS que só o designer sabe usar é refém, não sistema. A jogada que muda o jogo: empacotar a marca pra **qualquer pessoa, em qualquer ferramenta**, produzir no padrão.

1. **Site de referência vivo** — não um PDF morto: uma página navegável com cada peça renderizada (claro + escuro) e as regras ao lado. É a fonte da verdade.
2. **O kit** — tudo num pacote: tokens, peças, logos, fontes e as regras escritas. O "comece aqui" pra qualquer ferramenta.
3. **O prompt-mestre** — um texto que ensina a marca pra qualquer IA (Parte 11). Cola no ChatGPT/Lovable/Cursor e a IA passa a gerar no seu padrão.
4. **O plugin (avançado)** — comandos prontos ("gere um email", "uma landing") que já saem na régua. O padrão deixa de depender de disciplina e vira o caminho mais fácil.

---

## Parte 9 — Qualidade medida (não confie no olho)

O que separa amador de nível mundial é trocar opinião por evidência. Meça:

- **Contraste & acessibilidade** — cada combinação texto/fundo no padrão WCAG AA. (Cuidado: ferramenta automática não enxerga contraste sobre vidro/gradiente — confira no olho também.)
- **Performance** — peso e velocidade com teto definido.
- **Regressão visual** — compare cada mudança com o "antes" automaticamente, pra nada quebrar sem alguém ver.
- **Teste no mundo real** — email enviado pra caixa real; componente aberto no navegador de verdade.

---

## Parte 10 — O método em ondas (a sequência)

Não tente construir tudo de uma vez. Cada onda entrega valor sozinha e prepara a próxima.

- **Onda 1 · Fundação.** As 5 decisões → tokens → os 5–10 componentes mais usados → uma página viva mostrando tudo. No fim, você já produz no padrão.
- **Onda 2 · Superfícies.** Leve o padrão pras superfícies que mais convertem: email, landing, social, vendas. A marca começa a parecer uma só em todo lugar.
- **Onda 3 · Distribuição & qualidade.** Empacote o kit + o prompt-mestre, meça tudo, lance pro time. O sistema vira autônomo: cresce sem depender de uma pessoa.

---

## Parte 11 — O prompt-mestre (template pronto pra IA)

Preencha com a sua marca e cole no início de qualquer conversa com a IA. É o que faz o time inteiro (e a IA) produzir no padrão.

```
Você é o guardião do Design System da [ MARCA ]. Toda peça que gerar segue estas regras, SEM exceção. Quando em dúvida, decida pela frase-princípio.

PALETA (restrita): [ cor principal ] domina. Neutros: [ neutros ]. [ cor de destaque ] só para [ uso, ex: erro/destrutivo ]. NUNCA usar: [ cores proibidas ].

TIPOGRAFIA: [ fonte ] para tudo. Escala: display 600/44px · título 600/28px · corpo 400/15px · etiqueta 600 maiúscula espaçada/11px.

ASSINATURA VISUAL: [ efeito ] — receita: [ descreva: gradiente + brilho + sombra, ou o seu ]. Aplique em cards, painéis e destaques.

VOZ: fala como [ 3 adjetivos ]. Diz coisas como "[ exemplos ]". NUNCA diz "[ o que evitar ]". Sem hype, sem clichê.

PRINCÍPIO-MÃE: [ frase ]. Em qualquer bifurcação, escolha o caminho que honra essa frase.

REGRAS INVIOLÁVEIS:
- Componentes nascem com todos os estados, claro + escuro, e acessíveis (contraste AA, teclado).
- Email: tabelas + inline, CTA com cor sólida, < 102KB, testado em caixa real.
- Nada de [ liste o que a marca proíbe: emojis aleatórios, ícones X, etc. ].
- Só entregue quando estiver impecável. "Quase bom" volta pra mesa.

FORMATO DE SAÍDA: [ ex: HTML+CSS / React + tokens / etc. ].
```

---

## Parte 12 — Checklist "está pronto?" + erros que afundam

**Está pronto quando:**
- [ ] As 5 decisões estão cravadas e escritas.
- [ ] Tokens em 3 camadas, claro + escuro.
- [ ] Os componentes da Onda 1 existem, com todos os estados e acessíveis.
- [ ] Existe uma página de referência viva mostrando tudo.
- [ ] O prompt-mestre está preenchido e o time consegue gerar no padrão.
- [ ] Contraste, performance e (se houver email) renderização foram **medidos**, não chutados.

**Erros que afundam um DS:**
- **Paleta larga demais** — 10 cores "porque pode". Restrinja, ou nada vira marca.
- **Manual morto** — PDF num drive que ninguém abre. Faça vivo e distribuível.
- **Depender de 1 pessoa** — se só o designer sabe aplicar, é refém, não sistema.
- **Parar em "bonito"** — sem medir contraste/acessibilidade, "bonito" quebra na vida real.
- **Fazer tudo de uma vez** — comece pela Onda 1. Ela já entrega valor.

---

*Manual baseado no método e na arquitetura do Design System do Viver de IA — construído do zero ao deploy, operado por IA e dirigido por gosto humano. Adapte cada `[ preencher ]` à sua marca e a estrutura se mantém de pé.*
