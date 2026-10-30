# 02 · Moldura do app

A moldura é o que faz todas as soluções parecerem **o mesmo produto**: sidebar, canvas, container e
cabeçalho de página. É a primeira coisa a aplicar e a que mais muda a percepção. Componente pronto:
`kit/layout/AppShell.tsx` + `kit/layout/PageTitle.tsx`.

```
┌──────────────┬─────────────────────────────────────────────────────────┐
│ subido /AI   │   (canvas --via-gray-50, sem barra de topo)             │
│ FLOW CRM     │                                                         │
│              │   CRM                          ← eyebrow 11px caps      │
│ ANALYTICS    │   Contatos                     ← h1 30px/500            │
│ ▣ Dashboard  │   Pessoas que falam com a sua empresa…  ← 14px muted   │
│ ○ Metas      │                                          [+ Novo]  ←1 navy│
│ CRM          │   ┌───────────────────────────────────────────────┐     │
│ ▣ Contatos ◀ │   │ card branco · hairline navy 5% · p-6 · r-20   │     │
│ ○ Empresas   │   └───────────────────────────────────────────────┘     │
│              │                                                         │
│ ─────────────│          max-w 1152px · respiro 40px                    │
│ voce@emp.com │                                                         │
│ ⎋ Sair       │                                                         │
└──────────────┴─────────────────────────────────────────────────────────┘
   264px branca
```

## 1. Sidebar

| Item | Spec |
|---|---|
| Largura | 264px, `sticky top-0 h-screen`, some abaixo de 768px (vira drawer) |
| Fundo | **branco** (`--sidebar` = `--via-surface`). Nunca navy cheia. |
| Borda | direita, `--via-border-soft` |
| Marca | topo, `px-6 py-5`: logo SUBIDO 24px + nome do produto em caps |
| Grupos | eyebrow 11px · 500 · caps · tracking 0.18em · `--via-text-soft`; `space-y-6` entre grupos |
| Item | **40px** (`px-3 py-2.5`), 14px · 500, ícone 18px traço 2, raio `--via-radius-md`, `gap-3` |
| Item inativo | texto `--via-text-primary`, ícone `--via-text-soft` (um passo mais quieto); hover lavagem navy 6% |
| **Item ativo** | **pílula navy** (`bg-sidebar-primary`), texto `#F4F6FA`, ícone na cor do texto, sombra `0 6px 16px -10px ink-20` |
| Rodapé | `border-t`, e-mail 12px `--via-text-muted` + "Sair" como item |
| Ordem dos grupos | do dia a dia ao administrativo: **uso principal → dados/cadastros → conta (Configurações, Ajuda) → Administração (só admin)** |
| Rótulos | substantivo curto (Contatos, Fontes, Alertas). Nada de "Gerenciar X". |

Agrupe pelo **assunto na cabeça de quem usa**, não pela tabela do banco. Ex.: "Alertas" fica com Painéis
(é saída), não com Dados (encanamento).

## 2. Canvas e container

- Fundo da área de conteúdo: **`--via-gray-50` (#F7F8FA)**. Card branco sobre canvas cinza é o que separa
  as superfícies sem precisar de sombra. Canvas branco + card branco = tela "lavada".
- Container: `mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10`, `overflow-x-hidden`
  (a página nunca rola de lado; tabela rola dentro do próprio card).
- Telas de leitura/formulário estreitam dentro dele: `max-w-5xl` (Configurações, Ajuda), `max-w-4xl`
  (Usuários).

## 3. Sem barra de topo

No desktop **não existe header horizontal** acima do conteúdo (nem só para o botão de recolher a sidebar
ou o sino). O cabeçalho da página é o topo. Notificações e ações globais vão para a sidebar (rodapé) ou
para o cabeçalho da própria tela. No celular existe uma barra fina com o botão do menu e a marca compacta.

## 4. Cabeçalho da página (`PageTitle`)

Toda tela interna começa igual:

| Parte | Spec |
|---|---|
| Eyebrow | o **mesmo rótulo do grupo na sidebar** (CRM, Dados, Conta…). 11px · 500 · caps · 0.08em · muted. `mb-2` |
| Título (h1) | 30px · 500 · -0.025em · primary. **Um h1 por tela.** **Sem ícone ao lado.** |
| Descrição | 1 linha, 14px muted, diz **para que serve a tela / o resultado** ("Pessoas que falam com a sua empresa, de onde vieram e em que pé estão."), não "Gerencie seus contatos". |
| Ações | à direita, alinhadas pela base: **no máximo 1 botão navy** + secundárias como texto/outline. Quando a tela está vazia, o botão do topo recua para outline (o estado vazio vira a ação). |
| Espaço até o conteúdo | 32px |

Exceção: a **home** sem dado usa o `HomeHero` centralizado (promessa + instrução) no lugar do PageTitle.

Selo de papel ("Administrador") ao lado do título só se mudar o que a pessoa vê; senão é ruído.

## 5. Banner de configuração

Enquanto a ativação não terminou, um banner discreto no topo das telas internas
(`SetupBanner`, `kit/patterns/Estados.tsx`): "Você já começou: 2 de 3 passos · Próximo: …" com barrinha de
progresso, "Continuar configuração" em texto e fechar. Tracejado, sem preenchimento (não compete).

- **Não aparece** na home (o checklist já é o progresso), em telas que já mostram o aviso do mesmo
  pré-requisito, em Ajuda e em Configurações.
- O texto do "Próximo" é **contextual à tela** quando der ("Escolha uma fonte abaixo. Planilha ou CSV é o
  mais rápido." na tela de Fontes).

## 6. Flutuantes

Chat de IA ("Fale com seus dados" / assistente) é botão redondo navy no canto inferior direito,
com o anel `dc-orbit`. **Só aparece quando há dado para conversar** — sem dado, ele é mais uma ação
competindo com o próximo passo.

## 7. Celular

Abaixo de 768px: sidebar vira drawer (`Sheet` à esquerda, 17rem) que **fecha ao navegar**; barra fina no
topo com menu + marca compacta; grids caem para 1 coluna; tabelas rolam dentro do card.
