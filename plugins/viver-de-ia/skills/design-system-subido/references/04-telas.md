# 04 · Telas

Como montar cada tipo de tela no DS SUBIDO. Cada seção tem: **estrutura**, **regras** e a
**implementação de referência** (em `exemplos/`). Adapte o conteúdo ao produto; mantenha a estrutura.

> Antes de montar qualquer tela, responda: **qual é a ÚNICA coisa que a pessoa deve fazer aqui agora?**
> Ela vira o botão navy. Todo o resto recua (texto, outline, menu).

---

## 1. Telas de acesso (login, cadastro, senha, aprovação)

Moldura única `AuthShell` (`kit/auth/AuthShell.tsx`) + CSS `kit/css/auth.css`:

```
┌───────────────────────────────┬───────────────────────────────────┐
│ ENTRAR                        │  ╭─ palco navy (LoginStage) ────╮ │
│ Entre no seu CRM.  ← 44px/500 │  │ subido /AI  (56px, intro)    │ │
│ Contatos, negócios e conversas│  │ Cada conversa vira negócio.  │ │
│ da sua equipe, no mesmo lugar.│  │ ───── curva que se desenha   │ │
│ ( Entrar | Criar conta )  pill│  │ [Vendas · 30 dias R$ 482 mil]│ │
│ E-mail  [✉ voce@empresa.com ] │  │ [Conversas 11.920] [Etapas 6]│ │
│ Senha   [🔒 Sua senha        ] │  ╰──────────────────────────────╯ │
│ [          Entrar          ]  │                                   │
│ Esqueci minha senha           │                                   │
└───────────────────────────────┴───────────────────────────────────┘
```

- Duas colunas ≥ 1024px (form `1fr`, palco `1.08fr`, palco sticky com 16px de margem e raio 40px);
  abaixo disso, só o form com o logo no topo.
- Coluna do form: eyebrow (ENTRAR / CRIAR CONTA / PRIMEIRO ACESSO / REDEFINIR SENHA / AGUARDANDO ACESSO),
  título com ponto final, lead de 1–2 linhas, abas segmentadas (thumb navy desliza), campos com ícone
  (54px, raio 14), botão navy de 58px largura total, link de texto embaixo.
- Entrada em cascata (`lsf-in` com `--i`), troca de aba refaz a entrada.
- **Palco** (`LoginStage`): título-promessa do produto, lead, 3 cards de vidro com números decorativos que
  contam, gráfico que se desenha e recebe "dado novo" a cada 5s. Troque os textos por produto
  (props `titulo`, `lead`, `cards`). Números plausíveis e redondos; `aria-hidden`.
- Variações: **primeiro acesso** (instância sem usuário) abre na aba "Criar administrador"; **convite**
  (`?cadastro=1`) abre em "Criar conta"; **redefinir senha** (2 campos, mínimo de caracteres no rótulo;
  link expirado → título "Este link expirou." + botão "Voltar para o login"); **aguardando aprovação**
  (uma ação "Verificar novamente" + "Sair e entrar com outra conta" em texto).
- Sempre tema claro. Login com Google = botão branco com borda e logo do Google, abaixo de "ou".

Ref.: `exemplos/my-dashboard/components_auth_login-signup-form.tsx`, `exemplos/flow-crm/AuthLayout.tsx`,
`LoginForm.tsx`, `SignupForm.tsx`, `ResetPasswordPage.tsx`, `PendingApprovalPage.tsx`.

## 2. Onboarding (configuração inicial)

Modal grande (wizard premium) com **painel narrativo navy à esquerda** e conteúdo à direita:

- Painel: marca, título do que o usuário vai conseguir ("Seus números num painel só"), descrição,
  **steps verticais** (ícone em círculo 40px, título + subtítulo, linha de progresso entre eles);
  no celular vira stepper horizontal compacto.
- Conteúdo: **uma pergunta/tarefa por passo**, título 24px/500, apoio 14px, opções em cartões com logo
  (fontes, provedores), recomendação destacada ("Comece por aqui" / "mais rápido").
- Rodapé: "Voltar" em texto à esquerda, ação principal navy à direita ("Continuar", "Conectar"),
  **"Pular e ir para o painel"** sempre disponível (as respostas ficam salvas).
- Progresso começa **acima de zero** (a conta criada já conta como passo: 20%) — endowed progress.
- Cada passo concluído celebra curto (`Celebration`: "Fontes conectadas!") e avança sozinho.
- Ordem dos passos = caminho até o **primeiro momento de valor** (aha). No My Dashboard: IA → fontes →
  conectar cada fonte → primeiro dashboard. Num CRM com IA: canal (WhatsApp) → IA de atendimento →
  funil → equipe. Burocracia (dados da empresa) por último ou opcional.
- Sem dado real ainda: ofereça **dados de exemplo** como caminho secundário, sempre marcados (`SampleFlag`).

Ref.: `exemplos/my-dashboard/components_onboarding_onboarding-wizard.tsx`,
`components_onboarding_onboarding-gate.tsx` (abre sozinho, banner de progresso).

## 3. Home / Início

### Sem dado (ou ativação incompleta)
- `HomeHero` centralizado: **promessa** (36px/500) + **instrução** (15px muted).
  Ex.: "Seus números num painel só." / "Comece pela fonte que você já usa. O painel nasce dela."
- `FirstSteps` é a tela inteira: "2 de 3 · Falta 1 passo", barra, passos com o atual destacado e **um**
  botão navy, link secundário "Antes, veja como fica … pronto →".
- **Não mostra**: KPIs zerados, filtros, exportação, gráfico vazio, chat flutuante, banner de configuração.

### Com dado
- PageTitle ("Painéis" / "Analytics" + nome) e ações (filtro de período à esquerda das ações).
- Fileira de KPIs: **1º = North Star** (receita/resultado), 3–4 no total.
- Abaixo: o que mudou e **o que fazer** (insight acionável: "2 parcelas acabam em agosto — guarde o que
  sobrar"), depois gráficos e listas. Informar não basta: direcionar.
- Painel personalizado por papel (dono ≠ vendedor) quando o produto tiver papéis.

Ref.: `exemplos/my-dashboard/routes_index.tsx`.

## 4. Listas (Contatos, Negócios, Fontes, Alertas…)

- PageTitle com eyebrow do grupo + descrição + ação "Novo X" (navy).
- Barra: busca (ícone de lupa, placeholder com exemplos do que dá para buscar) + filtros em select/chip.
- Conteúdo: tabela em card (dado tabular) ou grade de cards (itens visuais). Kanban para funil.
- **Vazia**: `EmptyState` (ícone em círculo, título "Nenhum contato ainda", porquê ter, **uma** ação) e o
  "Novo X" do topo recua para outline. Importar/Exportar viram texto.
- Pré-requisito faltando (sem fonte para criar painel, sem painel para criar alerta): o formulário mostra
  o link do pré-requisito ("Conectar minha primeira fonte →") e o botão primário da tela recua.
- Opções recomendadas: no máximo uma com selo "Comece por aqui" e contorno navy.

Ref.: `exemplos/my-dashboard/routes_dashboards.index.tsx`, `routes_sources.tsx`,
`components_sources_quick-sources.tsx`.

## 5. Detalhe (contato, negócio, painel)

- Cabeçalho com eyebrow = tipo do item ("Contato", "Negócio"), título = nome, metadados em linha 13px
  muted, ação principal à direita (a próxima coisa a fazer com o item).
- Duas colunas ≥ 1024px: conteúdo principal (timeline, gráfico) à esquerda; ficha/propriedades à direita
  em card.
- Dados de exemplo sempre com `SampleFlag`.

## 6. Criação / formulários longos

- Uma coluna de 640–720px, seções em `SettingsCard`, rótulo acima, ajuda abaixo, Salvar fixo no fim
  (habilita só com mudança). Pré-preencha o que o sistema já sabe. Peça só o essencial (cada campo
  custa conversão).

## 7. Configurações

`SettingsLayout`: nav lateral (Perfil, IA/Integrações, Conta e segurança…) com linha de apoio que vira
pendência em navy ("Falta a chave de IA"); conteúdo em cards; e-mail travado com cadeado; ações de conta
em `ActionRow`; `DangerZone` no fim. Provedor escolhido por cartões com logo (`ProviderChoice`).

Ref.: `exemplos/my-dashboard/routes_settings.tsx`.

## 8. Integrações / Instalação (credenciais)

- Resumo no topo: "X de N prontas" + logos (pendentes em cinza 40%).
- `IntegrationCard` por provedor, **com logo oficial**, "o que destrava" em 1 frase, selos embaixo do
  nome, colapsável; dentro: passo 1 (URL de retorno com botão copiar), passo 2 (credenciais), salvar por
  provedor. **Uma coluna.**

Ref.: `exemplos/my-dashboard/components_connections_app-integrations.tsx`, `exemplos/flow-crm/IntegrationCard.tsx`.

## 9. Usuários / equipe

Resumo ("4 pessoas · 1 convite pendente") + "Adicionar pessoa" (abre diálogo). Lista com avatar, nome,
meta, selo de papel, "Acessos" e `⋯`. Convites pendentes separados. "Sem nome cadastrado" em muted no
lugar do vazio.

Ref.: `exemplos/my-dashboard/routes_admin.usuarios.tsx`.

## 10. Ajuda

PageTitle (Conta · Ajuda) + **busca** que filtra seções (sem diferenciar acento) + 4 atalhos para as
perguntas mais comuns + sumário lateral que marca a seção visível + seções em cards (ícone em tile,
h2 18px, corpo 14px com listas com recuo) + "Não achou o que procurava?" com ação.

Ref.: `exemplos/my-dashboard/routes_help.tsx`.

## 11. Telas técnicas (SQL, API, webhooks)

Mesmo cabeçalho; sem pré-requisito → `EmptyState`/card "Conecte uma fonte para consultar" com a ação;
editor com exemplo que **roda** com os dados reais; resultado em tabela com números pt-BR à direita;
dica ao lado do botão dizendo por que está desabilitado.

Ref.: `exemplos/my-dashboard/routes_sql.tsx`.

## 12. Modo apresentação / TV

Tela cheia, canvas claro, KPIs maiores (o North Star ainda maior), subtítulo "dados de exemplo · não são da
sua empresa" quando for o caso. Sem sidebar.

## 13. Chat de IA

Painel lateral/flutuante; mensagem do usuário em bolha navy à direita, IA à esquerda em superfície; três
pontos (`dc-dots`) enquanto pensa; sugestões em chips; erro com próximo passo. Só aparece com dado.
