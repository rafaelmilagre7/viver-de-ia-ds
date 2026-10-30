# 08 · Aplicar o DS numa solução

Passo a passo para levar uma solução (Lovable/Vite/TanStack/Next + shadcn) ao DS SUBIDO.
Tudo **local**: sem commit, sem push, sem tocar no banco de produção, salvo pedido explícito.

## 0. Preparar o ambiente local

1. Clonar o repositório numa pasta própria (`~/<nome-da-solucao>`), `npm ci`.
2. Backend local quando houver Supabase (`supabase/migrations`):
   - Docker/OrbStack rodando; `supabase start` na pasta.
   - Migração que usa `cron.*`/`net.*` falha no local (pg_cron/pg_net vêm ligados na Lovable Cloud, não
     no local) → criar `supabase/migrations/00000000000000_local_extensoes.sql` com
     `create extension if not exists pg_cron; create extension if not exists pg_net;` e colocar esse
     arquivo em `.git/info/exclude`.
   - Dois projetos ao mesmo tempo: as portas padrão (5432x) colidem; mude `[api] [db] [studio]
     [inbucket] [analytics] [db.pooler]` de um deles para 5532x no `config.toml` (só local).
   - `.env.local` apontando para o local (`VITE_SUPABASE_URL=http://127.0.0.1:54321`, chave publicável
     de `supabase status -o env`). Nunca imprimir chaves no chat.
3. Conta de teste: criar pelo admin API local (`/auth/v1/admin/users`, `email_confirm: true`), guardar
   e-mail/senha num arquivo ignorado (`supabase/conta-teste.local` + `.git/info/exclude`). Entrar
   injetando a sessão no `localStorage` (chave `sb-<host>-auth-token`) — nunca digitar senha em campo.
4. Dev server pela ferramenta de preview (porta própria por projeto).

## 1. Varredura inicial

Rodar `scripts/auditar-ds.js` em **todas** as rotas, nos dois estados (vazio e com dado), mais o checklist
manual (07-auditoria.md §3). Entregar o relatório de desvios ao usuário antes de mexer.

## 2. Moldura (corrige o app inteiro)

Copiar o kit para o projeto:

| Kit | Destino sugerido |
|---|---|
| `kit/css/tokens.css`, `revenue.css`, `subido.css`, `auth.css` | `src/styles/ds/` |
| `kit/css/base.css` (Tailwind v4) **ou** `kit/css/tailwind3.css` + `kit/tailwind.preset.cjs` (Tailwind v3) | `src/styles/ds/` |
| `kit/ui/*` | `src/components/ui/` (substitui os do shadcn; mesma API) |
| `kit/brand/*` | `src/components/brand/` (+ `npm i simple-icons@15`) |
| `kit/layout/*`, `kit/patterns/*`, `kit/auth/*` | `src/components/layout|patterns|auth/` |
| `kit/public/brand/*` | `public/brand/` |

**Tailwind v4** (`@import "tailwindcss"` no CSS):
```css
@import "tailwindcss";
@import "./styles/ds/tokens.css" layer(base);
@import "tw-animate-css";
@import "./styles/ds/base.css";
@import "./styles/ds/revenue.css";
@import "./styles/ds/subido.css";
```
**Tailwind v3** (`tailwind.config.ts` + `@tailwind base`): no `main.tsx`, depois do `index.css` do projeto:
```ts
import "./index.css";
import "./styles/ds/tokens.css";
import "./styles/ds/tailwind3.css";
import "./styles/ds/revenue.css";
import "./styles/ds/subido.css";
```
e no `tailwind.config.ts`: `presets: [require("./src/styles/ds/tailwind.preset.cjs")]`.

Fonte Geist no `<head>` (ver 01-fundamentos §3). Depois, a moldura:
- trocar o shell/layout do app pelo `AppShell` (ou ajustar o existente às specs de 02-moldura.md):
  sidebar branca 264px com grupos em eyebrow, item 40px com pílula navy, **sem barra de topo**,
  container `max-w-6xl` com respiro de 40px, canvas `--via-gray-50`;
- marca: logo SUBIDO + nome do produto em caps (respeitando o white-label, se houver);
- conferir que as variáveis pegaram (`getComputedStyle(document.body).backgroundColor`).

> Armadilha vista no Flow CRM: regra `:root { --background: … }` declarada depois do bloco escuro com a
> mesma especificidade **sobrescreve o tema escuro**. Escreva o claro como
> `:root:not([data-theme="dark"]):not(.dark), [data-theme="light"]`. E sempre meça depois de aplicar.

## 3. Componentes

- Botão, card, campo, select, selo, abas, tabela, diálogo: os do `kit/ui` já estão no DS.
- Projeto com componentes próprios (ex.: `KPI`, `EmptyState`, `IntegrationCard`, `via-card`):
  alinhar às specs de 03-componentes.md ou trocar pelos do `kit/patterns`.
- Logos: mapear todo provedor/canal/ferramenta do produto para o `brand-icon` (simple-icons cobre
  WhatsApp, Instagram, Gmail, Google, OpenAI, Anthropic, Gemini, Twilio, Stripe, HubSpot, Meta, n8n, Make,
  Zapier, Cal.com, Salesforce…). O que não estiver lá: pedir autorização ao usuário para baixar o ícone
  oficial do site da marca, conferir o arquivo e salvar em `public/brand/marcas`.

## 4. Montagem das telas

Tela por tela, pela ordem de uso (acesso → onboarding → home → listas → detalhe → configurações →
integrações → ajuda), aplicando 04-telas.md e o checklist de 05-revenue-centric.md:
- `PageTitle` em toda tela interna (eyebrow = grupo da sidebar, descrição = resultado);
- telas de acesso no `AuthShell` com o `LoginStage` do produto (título-promessa, lead, 3 cards);
- home vazia = `HomeHero` + `FirstSteps` (sem KPIs zerados, filtros, exportação, chat);
- uma ação navy por tela; lista vazia faz o "Novo" do topo recuar;
- integrações com logo, em uma coluna; configurações com nav lateral e pendência escrita.

**Preserve a lógica**: mude marcação e estilo, não regras de negócio, rotas, chamadas ou validações.

## 5. Verificar

- Auditoria de novo em todas as rotas e estados → 0 graves.
- Checklist manual (escuro, celular, deslogado, vazio, erro).
- Testes do projeto (`npm test`). Teste que verificava o visual antigo (texto de título, classe) pode ser
  atualizado para o novo; teste de regra de negócio não.
- Screenshots das telas principais para o usuário comparar com o My Dashboard.

## 6. Entregar

Relatório antes × depois (graves por tela), lista do que mudou por arquivo, o que ficou de fora e por quê
(ex.: logos aguardando autorização), e o que é dívida do próprio produto. Nada commitado.

## Armadilhas conhecidas

| Sintoma | Causa | Correção |
|---|---|---|
| Card com o nome sumido em Integrações | grid de 2 colunas a ~1000px + selos na mesma linha | 1 coluna até 2xl; selos embaixo do nome |
| Grid continua com 2 colunas | item com `lg:col-span-2` cria coluna implícita | trocar para `2xl:col-span-2` junto |
| Card com respiro dobrado | `.via-card` com padding + filho com `p-4` | `p-0` no contêiner |
| Link dentro do botão colapsável | `<a>` dentro de `<button>` é inválido | link abaixo do cabeçalho do card |
| Teste "sem 'Viver de IA' fixo" quebra | `<title>` do SVG do logo diz "by Viver de IA" | `title="subido AI"` |
| CSS do login não carrega (tela branca) | chave `}` faltando ao extrair o bloco | contar `{` e `}` ao copiar CSS |
| Tema escuro com sidebar clara | override claro sem `:not([data-theme=dark])` | ver armadilha da §2 |
