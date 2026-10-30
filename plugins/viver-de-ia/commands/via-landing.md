---
description: Gera landing page Viver de IA usando hero variants + elementos reutilizáveis (CTA, trust, FAQ, countdown, lead magnet, compare concorrente).
---

# /via-landing · landing page editorial

## Entrada

O usuário descreveu contexto em `$ARGUMENTS`. Identifica que tipo de landing:

| Contexto | Hero variant a usar |
|---|---|
| Lançamento abrindo amanhã/hoje (data fornecida por quem pediu) | `Lançamento` |
| Landing principal sempre no ar | `Evergreen sales` |
| Leaders AI Conference / live / mentoria coletiva | `Evento` |
| Captura de email / lead magnet / ebook | `Opt-in` |
| Pós-conversão / confirmação | `Thank-you` |

## Estrutura canônica de landing

```
1. Hero (variant correto por contexto)
2. Trust signals (3 padrões: números · prova atribuída · cases nominais)
3. Programa / o que tem dentro
4. FAQ avançado (6 categorias frequentes)
5. Lead magnet inline OU countdown editorial (se aplicável)
6. Comparativo concorrente honesto (se early-funnel)
7. CTA principal repetido no fim
8. Footer Viver de IA
```

## Hero canônico (estrutura)

```jsx
{/* fundo CLARO: branco/off-white + atmosfera radial navy suave · hero navy só se o usuário pedir */}
<div className="hero">
  <span className="eyebrow">{contexto · [data] · [N] vagas}</span>
  <h2>Headline editorial em 2 linhas · <em>palavra em destaque</em>.</h2>  {/* em RETO: ênfase = peso + cor, nunca itálico */}
  <p>Sub editorial · 1-2 linhas · contextualiza sem repetir</p>
  <div className="actions">
    <a className="cta">{Verbo no infinitivo · 2-4 palavras}</a>
    <a className="ghost">{CTA secundário · ghost}</a>
  </div>
</div>
{/* logo: lockup navy no header da página (lockup-navy.svg / <BrandLogo>) · sem monograma solto no hero */}
```

## CTAs por contexto (sentence-case sempre)

| Contexto | CTA correto | CTA errado |
|---|---|---|
| Navegação descoberta | "Ver programa" | "Conheça mais!!!" |
| Conversão decisão | "Escolher plano" | "GARANTA JÁ" |
| Consultoria alto-ticket | "Falar com mentor" | "Receba uma demonstração" |
| Lead magnet | "Baixar guia gratuito" | "Quero o material agora" |
| Evento | "Confirmar presença" | "INSCREVA-SE AGORA" |
| Objection handling | "Conversar antes" (ghost) | "Fale conosco" |

## Trust signals · 3 padrões

**Prova com número:**
```
521 cases reais de implementação de IA em empresas brasileiras
157 soluções de IA prontas para usar
29 setores já transformados com IA
R$ [valor] destravado por [empresa] em [N] meses   ← só com dado fornecido
```

Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos · leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual) · sem acesso à internet, use o `fatos.md` da skill viver-de-ia-design (ou do kit) e cite a data dele · use a frase pronta. O que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu · senão placeholder.
Nunca invente preço (só o da ficha) nem número de alunos/vagas · pergunte ou use o placeholder `R$ [valor]` / `[N]`.
Nunca invente garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local de evento · só o que está na ficha ou o que a pessoa informou · senão `[condições da garantia]` / `[prazo de devolução]` / `[data]` / `[local]` ou pergunte.

**Prova atribuída** (depoimento):
```
"[frase curta, primeira pessoa, na fala da pessoa]"
— [nome · cargo · empresa]
```

**Casos reais nominais:**
```
[nome · cargo · empresa] · [resultado do caso]
[nome · cargo · empresa] · [resultado do caso]
```

Depoimento e caso nominal não estão na ficha: só com texto, nome e número fornecidos por quem pediu.

## FAQ canônico (6 categorias)

1. Pré-requisito (preciso programar?)
2. Tempo (quantas horas/semana?)
3. Garantia (e se em 90 dias não tiver resultado?)
4. Devolução (tem reembolso?)
5. Mentoria (com quem é?)
6. Operação (e se minha operação for específica?)

Resposta sempre direta · sem rodeio · sem "consulte nosso time".

**Garantia, planos e preço: a resposta vem SÓ da ficha de fatos, na frase pronta** (garantia inteira, com os 3 requisitos e a cláusula 7 dos termos). **Devolução e pagamento** (como pedir, prazo, parcelamento) **vêm SÓ do texto da pessoa**. Se não está na ficha nem a pessoa informou, a resposta é o placeholder (`[condições da garantia]`, `[prazo de devolução]`, `R$ [valor]`, `[condições de pagamento]`) ou uma pergunta a ela — nunca um prazo "plausível" inventado.

## Countdown editorial

**Regra crítica:** só mostra countdown se urgência é REAL (inscrição realmente fecha, evento realmente começa, preço realmente sobe). Nunca "criar urgência" inventando deadline. Se a oferta está sempre aberta (planos), não mostra countdown.

## Comparativo concorrente

**Nunca cita concorrente pelo nome.** Use "Curso de prompt engineering genérico" como categoria. Honestidade competitiva é mostrar diferença real, não atacar pessoa.

## Reference completa

`viver-de-ia-ds/src/pages/patterns/LandingElements.tsx` tem:
- 5 hero variants
- 8 CTA variants com contexto
- 3 padrões trust signals
- FAQ 6 categorias
- Lead magnet inline form
- Countdown editorial
- Comparativo concorrente

## Output

Para landing completa: gere HTML/JSX estruturado com todas as seções, citando paleta restrita + Geist + hero claro com atmosfera radial navy suave (navy de fundo só a pedido).

Para elemento isolado (só hero, só FAQ): foca naquele e cita onde encaixa.

**Sempre lembre: 1 CTA principal por section. Sem countdown se urgência não é real. Sem trash-talk de concorrente.**
