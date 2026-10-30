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
| Shell header (app/site) | **Lockup** navy (`lockup-navy.svg` / `<BrandLogo>`) · clica volta pra / · monograma sozinho só em barra estreita (mobile) |
| Shell footer | Lockup |
| Tab do browser | Favicon `icon_black.png` 32×32 (monograma) |
| OG image | **Lockup** navy centralizado sobre off-white |
| Email header | **`lockup-navy.png`** pequeno (~18px de altura · letterhead · PNG porque o Gmail não renderiza SVG) |
| WhatsApp profile pic | `VIA_app_icon.png` · navy bg |
| Slide deck capa | **Lockup** navy sobre fundo claro · white sobre navy só a pedido ou no encerramento |
| Slide deck interior | Monograma 24px em slide 1920×1080 (≈1,25% da largura) · opacidade 0.5 · canto inferior direito (cor conforme o fundo) |
| Invoice | Lockup navy no header + monograma 24px no footer |
| Cert/diploma | Lockup navy no hero + selo monograma |
| Avatar mentor (chat) | Iniciais do mentor, **NÃO** monogram VIA |
| Loading | Monogram navy 80px pulsando opacity 0.4-1 |
| Social profile pic | App icon (não monogram) · navy bg |
| Social post cover | **Lockup** pequeno no canto/rodapé · navy sobre fundo claro (white só sobre navy) · não centralizado massivo |
| Material Leaders AI | Sub-brand Leaders AI no lugar do monogram VIA · cor do arquivo pelo fundo (ver tabela de surface abaixo) |

## Clear space

- **Monogram** · clear space mínimo = altura do símbolo / 2
- **Wordmark** · clear space mínimo = altura do "V" × 1

## Tamanho mínimo

- **Monogram** nunca abaixo de **16px**
- **Wordmark** nunca abaixo de **96px** de largura

## Surface correta (qual cor de logo em qual fundo)

| Fundo | Logo |
|---|---|
| Branco / off-white / gray-50-200 | Navy (`lockup-navy.svg`, `monogram-navy.svg` · `<BrandLogo variant="black">`) |
| Navy / mesh-navy / dark | White (`lockup-white.svg`, `monogram-white.svg` · `<BrandLogo variant="white">`) |
| Foto com cores variadas | White + scrim navy 60% |
| Leaders AI · fundo claro | `leaders-ai-conference-logo-navy.png` · sem faixa navy só pra segurar a logo |
| Leaders AI · fundo escuro | `leaders-ai-conference-logo.png` |

**NUNCA:** inverter via CSS `filter:invert()` · sempre arquivo dedicado.

## Voice estendida por contexto (9 contextos)

| Contexto | Registro | Sample bom |
|---|---|---|
| Marketing landing | editorial-comercial | "521 cases reais de implementação de IA em empresas brasileiras." |
| Email transacional | concierge-direto | "Cobrança em 2 dias · R$ [valor] · plano [nome]" |
| Email editorial | crônica-operacional | "Essa semana vi a Nina passar de [N] pra [N] conversas" |
| Comunidade Discord | mentor-presente | "oi pessoal, esse caso do João é exatamente o que conversei" |
| Suporte 1:1 | pragmático-humano | "vi aqui que o webhook tá retornando 504 desde ontem 14h" |
| Paid ads | editorial-comprimido | "Em 2026, operador que não opera IA, não opera." |
| Social orgânico | crônica-pessoal | "[N] meses atrás a Nina perdia [N]% das conversas no primeiro turno" |
| Sales B2B | consultivo-objetivo | "Vocês perdem ~4h/semana só com triagem de leads no Meta" |
| Eventos palco | palco-operacional | "Vou contar 3 erros que cometi construindo a Nina" |

Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos · leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual) · sem acesso à internet, use o `fatos.md` da skill viver-de-ia-design (ou do kit) e cite a data dele · use a frase pronta. O que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu · senão placeholder.
Nunca invente preço (só o da ficha) nem número de alunos/operadores/vagas · pergunte ou use o placeholder `R$ [valor]` / `[N] alunos`.
Nunca invente garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local de evento · só o que está na ficha ou o que a pessoa informou · senão `[condições da garantia]` / `[prazo de devolução]` / `[data]` / `[local]` ou pergunte.

## Personality · 7 atributos

1. **Operador-experiente** · fala de cima do palco com cicatriz
2. **Editorial** · tipografia/ritmo/espaço como ferramentas
3. **Denso** · cada parágrafo carrega informação única
4. **Sem guru-bro** · confiante sem ser estridente
5. **Pragmático** · sempre a coisa menor que resolve
6. **Navy-protagonista** · atmosfera navy + branco · sem dourado
7. **Número-sobre-adjetivo** · "521 cases reais de implementação de IA", não "centenas de cases"

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
