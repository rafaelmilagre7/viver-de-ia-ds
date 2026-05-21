---
description: Aplica brand book Viver de IA · logo correta por contexto · voice estendida por canal · personality 7 atributos.
---

# /via-brand · brand book + logo + voice estendida

## Entrada

O usuário fez pergunta sobre brand em `$ARGUMENTS`. Identifica o tipo:

| Pergunta | Use seção |
|---|---|
| Qual logo usar em X? | `Logo usage por contexto` |
| Qual voz pra Y? | `Voice estendida por contexto` |
| Como é a personalidade? | `7 atributos personality` |
| Tem mission/vision? | `Brand story` |

## Logo usage · qual logo em qual contexto

| Contexto | Logo correta |
|---|---|
| Shell header (app/site) | Monogram navy 32px · clica volta pra / |
| Shell footer | Monogram + wordmark stacked |
| Tab do browser | Favicon `icon_black.png` 32×32 |
| OG image | Wordmark navy centralizado sobre off-white |
| Email header | Wordmark navy 200px width |
| WhatsApp profile pic | `VIA_app_icon.png` · navy bg |
| Slide deck capa | Wordmark white sobre mesh-navy |
| Slide deck interior | Monogram white 16px canto inferior direito |
| Invoice | Wordmark navy 120px header + monogram 24px footer |
| Cert/diploma | Wordmark navy hero + selo monogram |
| Avatar mentor (chat) | Iniciais do mentor, **NÃO** monogram VIA |
| Loading | Monogram navy 80px pulsando opacity 0.4-1 |
| Social profile pic | App icon (não monogram) · navy bg |
| Social post cover | Monogram white canto · não centralizado massivo |
| Material Leaders AI | Sub-brand `leaders-ai-conference-logo` |

## Clear space

- **Monogram** · clear space mínimo = altura do símbolo / 2
- **Wordmark** · clear space mínimo = altura do "V" × 1

## Tamanho mínimo

- **Monogram** nunca abaixo de **16px**
- **Wordmark** nunca abaixo de **96px** de largura

## Surface correta (qual cor de logo em qual fundo)

| Fundo | Logo |
|---|---|
| Branco / off-white / gray-50-200 | Navy (`VIA_monogram_hq.png`, `VIVER_DE_IA_black.png`) |
| Navy / mesh-navy / dark | White (`VIA_monogram_hq_white.png`, `VIVER_DE_IA_white.png`) |
| Foto com cores variadas | White + scrim navy 60% |

**NUNCA:** inverter via CSS `filter:invert()` · sempre arquivo dedicado.

## Voice estendida por contexto (9 contextos)

| Contexto | Registro | Sample bom |
|---|---|---|
| Marketing landing | editorial-comercial | "+220 operadores. 90 dias até o primeiro agente em produção." |
| Email transacional | concierge-direto | "Cobrança em 2 dias · R$ 6.000 · mentoria mensal" |
| Email editorial | crônica-operacional | "Essa semana vi a Nina passar de 11k pra 13k conversas" |
| Comunidade Discord | mentor-presente | "oi pessoal, esse caso do João é exatamente o que conversei" |
| Suporte 1:1 | pragmático-humano | "vi aqui que o webhook tá retornando 504 desde ontem 14h" |
| Paid ads | editorial-comprimido | "Em 2026, operador que não opera IA, não opera." |
| Social orgânico | crônica-pessoal | "7 meses atrás a Nina perdia 40% das conversas no primeiro turno" |
| Sales B2B | consultivo-objetivo | "Vocês perdem ~4h/semana só com triagem de leads no Meta" |
| Eventos palco | palco-operacional | "Vou contar 3 erros que cometi construindo a Nina" |

## Personality · 7 atributos

1. **Operador-experiente** · fala de cima do palco com cicatriz
2. **Editorial** · tipografia/ritmo/espaço como ferramentas
3. **Denso** · cada parágrafo carrega informação única
4. **Sem guru-bro** · confiante sem ser estridente
5. **Pragmático** · sempre a coisa menor que resolve
6. **Navy-protagonista** · atmosfera navy + branco · sem dourado
7. **Número-sobre-adjetivo** · "11.920 conversas/mês", não "muito mais conversas"

## Esqueleto invariante (5 regras)

Independente de contexto:

1. **Número sempre que possível** · sem "centenas"
2. **Sem clichê de IA** · "revolucione", "transforme", "futuro chegou" banidos
3. **Sem urgência fabricada** · "GARANTA JÁ" banido
4. **Sem emoji decorativo** · ✨🚀💪🔥 banidos
5. **Sempre ação concreta no fim** · não "ficamos à disposição"

## Reference completa

- `/foundations/brand-story` · mission/vision/values
- `/foundations/personality` · 7 atributos detalhados
- `/foundations/voice-extended` · voice por 9 contextos
- `/foundations/logo-usage` · clear space, variants, do/don'ts visuais

## Output

Responde com:
1. Direto ao ponto se a pergunta for específica (qual logo / qual voz)
2. Cita a página de reference pra detalhe completo
3. Se identificar conflito (ex: usuário quer usar monogram VIA em material de evento), corrige citando regra
