# 03 · Componentes

Os componentes de `kit/ui/` são os do shadcn/ui **já no DS** (substituem os do projeto, mesma API).
Cada um carrega uma classe-gancho `ds-*` que a camada `kit/css/revenue.css` usa. Os padrões compostos
estão em `kit/patterns/`.

---

## Botões (`kit/ui/button.tsx`)

Base: pill (999), 13px · 500 · tracking -0.008em, `gap-2`, ícone 16px, `active:scale-[0.985]` em 110ms,
foco `--via-shadow-focus`, desabilitado 50%.

| Variante | Visual | Quando |
|---|---|---|
| `default` (primário) | gradiente navy → navy-deep, texto branco, sombra de tinta | **A ação dominante da tela. Uma só.** |
| `outline` / `secondary` | **texto sublinhado** (`decoration navy-25`, offset 4px), sem caixa; hover lavagem navy 4% | Ações secundárias (Importar, Exportar, Cancelar, Ver detalhes) — a camada Revenue transforma em texto para não competir (Von Restorff) |
| `ghost` | só texto body, hover lavagem | Ação terciária em barra/linha |
| `destructive` | coral cheio | Confirmação final de exclusão (dentro do diálogo) |
| `link` | navy sublinhado no hover | Navegação em meio de texto |

Na tela (fora do diálogo) o botão destrutivo é **outline coral**, não coral cheio.

Tamanhos: `sm` 32px (barra de filtro), `default` 36px (`px-[18px]`), `lg` 44px (CTA do próximo passo,
login), `icon` 36×36.

Rótulo = **verbo + objeto** ("Conectar minha primeira fonte", "Criar alerta"), nunca "OK", "Enviar",
"Clique aqui". Seta `→` só em ação que avança para outro lugar.

**Uma ação dominante por tela.** Se há dois botões navy visíveis, um deles tem que virar outline/texto.
Botão do cabeçalho que leva ao mesmo lugar do estado vazio recua quando a lista está vazia.

## Campos (`input`, `textarea`, `select`)

| Spec | Valor |
|---|---|
| Altura | 36px (`h-9`); no login 54px (`.lsf-control input`) |
| Raio | `--via-radius-md` (14px) |
| Borda | `--via-border` (navy 16%); hover `--via-navy-20`; foco `--via-navy-40` + `--via-shadow-focus` |
| Fundo | superfície (branco/vidro claro). **Nunca cinza preenchido.** |
| Texto | 14px (16px no celular para não dar zoom no iOS), placeholder `--via-text-soft` |
| Rótulo | acima, 14px · 500 · primary; ajuda abaixo 13px muted; erro 13px `--via-coral-dark` |

Formulário: um campo por linha no celular; 2 colunas só para pares curtos (nome/sobrenome, cidade/UF).
Valor pré-selecionado sempre que houver uma única opção (uma fonte, um painel) — "default é a decisão que
você tomou pelo usuário". Botão Salvar só habilita quando algo mudou ("Nada para salvar." ao lado).

Escolha entre **provedores/ferramentas** nunca é `<select>` de texto: use cartões com logo
(`ProviderChoice`, `kit/patterns/Integracoes.tsx`).

## Cards (`kit/ui/card.tsx` e padrões)

| Spec | Valor |
|---|---|
| Fundo | `--via-surface` (branco) sobre canvas `--via-gray-50` |
| Borda | `--via-border-soft` (navy 5%) |
| Raio | 20px |
| Sombra | **nenhuma** (a camada Revenue zera) |
| Respiro | 24–32px (`p-6`/`p-8`); card de lista 20px |
| Título | 16px · 500 · primary; apoio 14px muted |

Card clicável: hover borda `--via-navy-20` + lavagem `--via-navy-02`, nunca "levitar" com sombra.

## KPI / stat tile (`kit/patterns/Metricas.tsx`)

Ver regras no arquivo: rótulo 13px muted sentence case; **1º KPI = North Star** (maior, borda navy-20);
sem ícone decorativo; ≥10 mil compacto; sem valor "—"; variação contra período **nomeado**;
**sem dado → não renderize a fileira** (nada de "R$ 0,00" gigante).

## Selos, pills e chips (`kit/ui/badge.tsx`)

| Tipo | Visual | Uso |
|---|---|---|
| Selo de estado | pill 11px · 500 · **lowercase**, navy 6% + texto navy (forte: navy cheio + branco) | status (ativo, pronto, rascunho) |
| Selo neutro | cinza 100 + muted | metadado |
| Selo destrutivo | coral 10% + coral-dark | erro, cancelado |
| Chip de sugestão/filtro | pill outline `--via-border-soft`, texto muted 11–13px, hover navy-30 | opções ("Financeiro", "Vendas"); **opção, não ação** — peso mínimo |
| Selo de recomendação | "Comece por aqui" navy cheio sobre o card recomendado + contorno navy no card | Von Restorff: destacar UMA opção |

Nunca semáforo (verde/amarelo/vermelho) em selo. "Conectado/Ativo" = navy.

## Abas

Segmentadas: trilho `--via-gray-100` pill, aba ativa branca (ou navy no login), 14px · 500, altura 36px.
Para 2–4 vistas da mesma coisa (Kanban/Lista, Lista/Grupos/Tags). Mais que 5 → nav lateral
(`SettingsLayout`).

## Tabela (`kit/ui/table.tsx`)

- Dentro de card, `overflow-x-auto` no card (a página não rola de lado).
- Cabeçalho: 13px · 500 · muted, fundo `--via-navy-04`, sem caps.
- Linhas: 14px, hairline `--via-border-soft`, hover `--via-navy-02`, altura ≥ 44px.
- **Números alinhados à direita**, `tabular-nums`, formato pt-BR. Texto à esquerda.
- Coluna na ordem em que a pessoa lê (a do `SELECT`, a do formulário), não a do banco.
- Ações da linha: menu `⋯` (DropdownMenu) + no máximo 1 ação visível em texto.

## Listas de pessoas/itens (padrão de Usuários)

Linha = avatar com iniciais (navy 6%) + nome 14px/500 + meta 13px muted ("entrou 12/10") + selo de papel
+ ação em texto ("Acessos") + `⋯` com o resto (Editar, Tornar administrador, Excluir). Pendências
(convites) em seção separada, abaixo.

## Diálogos, menus, popovers, toasts, tooltips

- Modal: raio 20px, `p-6`, sombra lg, overlay preto 80% → use `--via-navy-deep`/60% se o projeto permitir;
  título 18px/500; **ação primária à direita**, cancelar em texto à esquerda dela.
- Confirmação destrutiva diz a consequência ("Apaga seus painéis, fontes e alertas. Não dá para desfazer.")
  e o botão repete o verbo ("Excluir conta").
- Menu/popover: raio 14px, sombra md, item 14px com hover `--via-navy-04`.
- Toast (sonner): canto inferior direito, 14px, uma frase; erro diz o que fazer agora.
- Tooltip: navy cheio, texto branco 12–13px; obrigatório em botão só-ícone.

## Progresso e passos

- Barra: trilho `--via-navy-08`, preenchimento navy, pill, 8px (home) ou 4px (banner).
- Contador grande "2 de 3" 36px/600 + "Falta 1 passo" à direita.
- Stepper vertical (onboarding): círculo 24px — feito = navy cheio com check; atual = borda navy 2px com
  número; futuro = borda `--via-border` com número muted.

## Avatar

Círculo, iniciais 2 letras em 13px/500, fundo navy 6%, texto navy. Foto quando houver.

## Estados (`kit/patterns/Estados.tsx`)

`NextStep` (bloco navy do próximo passo), `EmptyState` (vazio de lista), `SetupBanner` (progresso da
ativação), `SampleFlag` (dados de exemplo). Regras completas no próprio arquivo e em 04-telas.md.

## Carregamento

Skeleton com o **formato do conteúdo** (linhas, cards), shimmer cinza 100→50. Spinner só em botão
(`Loader2` 16px no lugar do rótulo) e em tela inteira enquanto a sessão resolve.

## Erro

Card com borda coral 30%, fundo coral 5%, título do que falhou + **o que fazer** ("Recarregue a página; se
persistir, avise um administrador."). Erro de IA/integração vira texto amigável com link para corrigir
("Configurar a IA →"), nunca a mensagem crua da API.

## Integrações (`kit/patterns/Integracoes.tsx`)

`IntegrationCard` (colapsável: logos + nome + o que destrava + selos embaixo do nome + status),
`ProviderLogo` (logotipo por extenso), `ProviderChoice` (escolha com logo). Resumo no topo da página:
"X de N prontas" em 30px/600 + fileira de logos (pendente em cinza 40%).

## Configurações (`kit/patterns/Configuracoes.tsx`)

`SettingsLayout` (nav lateral de seções com linha de apoio que vira pendência), `SettingsCard`,
`ActionRow`, `DangerZone`.

## Celebração (`kit/patterns/Celebration.tsx`)

Ao concluir um marco (primeira fonte, primeiro painel): check que se desenha + faíscas curtas
(`ob-check`, `ob-burst` em `subido.css`). Uma vez, curto, nunca bloqueando a próxima ação.
