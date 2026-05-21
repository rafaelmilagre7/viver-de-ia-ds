---
description: Gera anúncios pagos Viver de IA · Meta Ads (single, carousel, story, reel) + Google Display Network 6 sizes.
---

# /via-paid · Meta Ads + Google Display Network

## Entrada

O usuário descreveu plataforma + formato em `$ARGUMENTS`. Identifica:

**Meta Ads:**
- Single image 1080×1080 (Feed)
- Carousel 5 cards 1080×1080
- Story 1080×1920 (9:16)
- Reel ad cover frame

**Google Display:**
- Medium rectangle 300×250
- Large rectangle 336×280
- Leaderboard 728×90
- Half page 300×600
- Mobile banner 320×100
- Billboard 970×250

## Voz comprimida pra paid

| Componente | Regra |
|---|---|
| Headline | 1 linha · ≤40 chars · afirmação NÃO pergunta |
| Body / primary text | Hook + razão · até 125 chars antes do "Ver mais" |
| CTA button | Verbal infinitivo · 2-4 palavras |
| Image | Navy editorial · zero foto literal · sem gold |

## Headlines canônicas (4 categorias)

**Provocação editorial** (use quando funil top):
- "Em 2026, operador que não opera IA, não opera."
- "IA não te aposenta. Operador que não usa IA aposenta."

**Prova com número** (use quando funil mid):
- "220 operadores. R$ 1,8M destravado. 90 dias."
- "11.920 conversas/mês rodando. Eu te ensino como."

**Convite direto** (use quando funil bottom):
- "Turma 2026.3 · 30 vagas · 4 meses"
- "Próxima turma é em outubro. Ou agora."

**Identificação** (use pra targeting específico):
- "Pra fundador que já tentou prompt sozinho e travou."
- "Operador que precisa fazer IA gerar resultado essa semana."

## Banidos

- ❌ "🚀 OPORTUNIDADE ÚNICA EM IA!"
- ❌ "Aprenda IA do ZERO em 7 dias!!!"
- ❌ "Garanta sua vaga AGORA!"
- ❌ "Não perca essa CHANCE ÚNICA!"
- ❌ "ÚLTIMAS HORAS!!!"
- ❌ Caps lock + 3 exclamações
- ❌ Emoji decorativo em qualquer parte

## Estrutura por formato

### Meta single image
```
Page card: Viver de IA · Patrocinado · 🌐
Primary text: hook editorial + razão (até 125 chars)
Image: 1080×1080 navy mesh + monogram_white canto + headline editorial
Footer: VIVERDEIA.AI · "Ver programa" · sub-headline
CTA button: "Saiba mais"
```

### Meta carousel 5 cards
```
Card 1: HOOK (número grande · ex: +220 operadores)
Card 2: contexto (90 dias até produção)
Card 3: contexto (4 meses · mentoria 1:1)
Card 4: resultado (R$ 1,8M destravado)
Card 5: CTA (Ver programa · próxima turma)
```

### Google Display Banner
Texto adaptativo: short (≤25 chars) + long (≤90 chars). Sizes pequenos mostram só short.

```
Layout horizontal (728×90 · 320×100): texto à esquerda + CTA à direita
Layout vertical (300×600): texto centro + CTA inferior + logo
Layout grande (970×250 billboard): texto esquerda + CTA central + logo direita
```

## Reference completa

`/Users/rafaelmilagre/viver-de-ia-ds/src/pages/patterns/PaidAds.tsx` tem:
- Todos os formatos Meta + Google renderizados
- Specs canônicas (safe area, texto length, CTA wording)
- Headline library com 16 exemplos (4 cats × 4 hooks)

## Output

Para 1 anúncio: gere headline + primary text + image description + CTA.

Para campanha: gere variações por canal + indique segmentação/funil.

**Sempre lembre:** sentence-case · número específico · sem urgência fabricada · sem emoji · CTA verbo infinitivo 2-4 palavras.
