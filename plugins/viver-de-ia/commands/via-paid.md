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
| CTA button | Verbal infinitivo · 2-4 palavras · o botão-padrão da plataforma (preset do Meta: "Saiba mais", "Inscreva-se") é escolha de menu, não copy · no criativo e no texto a chamada é verbo concreto ("Ver os planos", "Ver programa", "Confirmar presença") · nunca "saiba mais" nem "Garanta sua vaga" (hype) |
| Pill/chip na arte | os 11px são pra tela · em 1080px escale ~2× (≈22px de texto, padding proporcional) · fundo em token de superfície, não branco fixo |
| Image | **Fundo claro** (branco/off-white + atmosfera radial navy suave) · tipografia navy · zero foto literal · sem gold. Navy de fundo só se o usuário pedir ou no card de fechamento do carrossel (regra zero · light-first) |

## Headlines canônicas (4 categorias)

**Provocação editorial** (use quando funil top):
- "Em 2026, operador que não opera IA, não opera."
- "IA não te aposenta. Operador que não usa IA aposenta."

**Prova com número** (use quando funil mid):
- "521 cases reais de implementação de IA."
- "157 soluções de IA prontas para usar."

Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos · leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual) · sem acesso à internet, use o `fatos.md` da skill viver-de-ia-design (ou do kit) e cite a data dele · use a frase pronta. O que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu · senão placeholder.
Nunca invente preço (só o da ficha) nem número de alunos/vagas · pergunte ou use o placeholder `R$ [valor]` / `[N]`.
Nunca invente garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local de evento · só o que está na ficha ou o que a pessoa informou · senão `[condições da garantia]` / `[prazo de devolução]` / `[data]` / `[local]` ou pergunte.

**Convite direto** (use quando funil bottom):
- "Pro: R$ 3.780 por mês, em contratação anual"
- "Starter, Pro ou Enterprise. Contratação anual."

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
Image: 1080×1080 fundo claro + atmosfera radial navy suave + lockup navy no canto + headline editorial navy
Footer: VIVERDEIA.AI · "Ver programa" · sub-headline
CTA button: preset do Meta ("Saiba mais" / "Inscreva-se") · é o botão da plataforma, a chamada do criativo continua verbo concreto
```

### Meta carousel 5 cards
```
Card 1: HOOK (número grande da ficha · ex: 521 cases reais de implementação de IA)
Card 2: contexto (157 soluções de IA prontas para usar)
Card 3: contexto (formações · comunidade · mentoria em grupo no Pro, individual no Enterprise)
Card 4: resultado (R$ [valor] destravado · só com número fornecido)
Card 5: CTA (Ver os planos) · único card que pode ter fundo navy (respiro canônico)
```

### Google Display Banner
Texto adaptativo: short (≤25 chars) + long (≤90 chars). Sizes pequenos mostram só short.

```
Layout horizontal (728×90 · 320×100): texto à esquerda + CTA à direita
Layout vertical (300×600): texto centro + CTA inferior + logo
Layout grande (970×250 billboard): texto esquerda + CTA central + logo direita
```

## Reference completa

`viver-de-ia-ds/src/pages/patterns/PaidAds.tsx` tem (atenção: os criativos de lá ainda estão em fundo navy, anteriores à regra light-first · para cor de fundo vale este comando):
- Todos os formatos Meta + Google renderizados
- Specs canônicas (safe area, texto length, CTA wording)
- Headline library com 16 exemplos (4 cats × 4 hooks)

## Output

Para 1 anúncio: gere headline + primary text + image description + CTA.

Para campanha: gere variações por canal + indique segmentação/funil.

**Sempre lembre:** sentence-case · número específico · sem urgência fabricada · sem emoji · CTA verbo infinitivo 2-4 palavras.
