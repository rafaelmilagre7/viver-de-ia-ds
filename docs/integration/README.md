# Distribuição do Viver de IA Design System

3 formatos pra time interno usar IA pra aplicar o DS — escolha conforme a ferramenta:

## A · Claude Code plugin (recomendado pra devs)

```bash
ln -s viver-de-ia-ds/plugins/viver-de-ia ~/.claude/plugins/viver-de-ia
```

Comandos disponíveis após reiniciar Claude Code:
- `/via` · entrada geral
- `/via-email` · 13 templates editorial
- `/via-social` · 6 canais · 18 templates
- `/via-landing` · 5 hero variants + 7 elementos
- `/via-brand` · logo · voice · personality
- `/via-deck` · pitch deck + one-pager + case + proposta
- `/via-paid` · Meta + Google Display
- `/via-check` · auditoria editorial 12 pontos
- Sub-agent `via-auditor` roda proativamente

## B · ZIP universal (Claude.ai, ChatGPT, Cursor)

Gera com:
```bash
bun run build:kit
cd dist && zip -r viver-de-ia-kit.zip kit/
```

ZIP fica em `dist/viver-de-ia-kit.zip` (~215KB). Anexa em chat novo e diz "Use este design system pra gerar o que eu pedir."

Conteúdo do ZIP:
- `README.md` · instruções de uso
- `system-prompt.md` · prompt geral
- `system-prompts/` · sub-prompts por contexto (email, social, landing, brand, deck, paid)
- `tokens/` · tokens.json + tokens.css + style.css (132 tokens)
- `logos/` · 11 assets de logo PNG renomeados
- `examples/` · 3 HTML specimens prontos

## C · system-prompt.md denso (Lovable, v0, custom GPT)

Cola o conteúdo de `docs/system-prompt.md` (1.728 palavras) no campo de:
- **Lovable** · system prompt na config do projeto
- **v0** · system instructions
- **ChatGPT custom GPT** · custom instructions
- **Cursor** · system prompt

A IA vai seguir as 12 regras canônicas em qualquer geração subsequente sem precisar perguntar.

## Quando NÃO usar este DS

Library `@viverdeia/design-system` (lib publicada em `dist/lib/`) é peers `react@^18 || ^19` + DOM real. Não suporta:
- React Native (web only)
- Vue / Svelte / Solid (React-only)
- SSR sem client hydration (componentes interativos quebram)

Pra esses casos, importe só os **tokens** (CSS vars ou JSON) e construa seus próprios componentes.

## Integration guides por stack

Quando integrar a library em projeto novo:

| Stack | Guia |
|---|---|
| **Next.js 14+** | [`nextjs.md`](./nextjs.md) |
| **Vite + React** | [`vite.md`](./vite.md) |
| **Remix v2+** | [`remix.md`](./remix.md) |

## Reporte problemas

Issues em https://github.com/rafaelmilagre7/viver-de-ia-ds/issues
