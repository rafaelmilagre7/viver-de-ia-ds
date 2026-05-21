---
description: Gera landing page Viver de IA usando hero variants + elementos reutilizáveis (CTA, trust, FAQ, countdown, lead magnet, compare concorrente).
---

# /via-landing · landing page editorial

## Entrada

O usuário descreveu contexto em `$ARGUMENTS`. Identifica que tipo de landing:

| Contexto | Hero variant a usar |
|---|---|
| Turma abrindo amanhã/hoje | `Lançamento` |
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
<div className="hero via-mesh-navy via-noise">
  <span className="eyebrow">{contexto · data · vagas}</span>
  <h2>Headline editorial em 2 linhas · <em>palavra emphasized italic</em>.</h2>
  <p>Sub editorial · 1-2 linhas · contextualiza sem repetir</p>
  <div className="actions">
    <a className="cta">{Verbo no infinitivo · 2-4 palavras}</a>
    <a className="ghost">{CTA secundário · ghost}</a>
  </div>
  <img src="monogram_white" className="hero-mono" />
</div>
```

## CTAs por contexto (sentence-case sempre)

| Contexto | CTA correto | CTA errado |
|---|---|---|
| Navegação descoberta | "Ver programa" | "Conheça mais!!!" |
| Conversão decisão | "Entrar na turma" | "GARANTA JÁ" |
| Consultoria alto-ticket | "Falar com mentor" | "Receba uma demonstração" |
| Lead magnet | "Baixar guia gratuito" | "Quero o material agora" |
| Evento | "Confirmar presença" | "INSCREVA-SE AGORA" |
| Objection handling | "Conversar antes" (ghost) | "Fale conosco" |

## Trust signals · 3 padrões

**Prova com número:**
```
+220 operadores formados desde 2024
R$ 1,8M destravado por alunos em 12 meses
11.920 conversas/mês rodando via Nina
90 dias até primeiro agente em produção
```

**Prova atribuída** (depoimento):
```
"Ela fez isso com pouquíssimas horas. Sem saber nada."
— Márisson Lage · CTO Efizi · turma 2025.3
```

**Casos reais nominais:**
```
Caio Ribeiro · construiu a Nina · 11.920 conversas/mês
Camila Moraes · agente proposta · 73% menos token
Daniel Pinheiro · onboarding agente · 2h → 20min
```

## FAQ canônico (6 categorias)

1. Pré-requisito (preciso programar?)
2. Tempo (quantas horas/semana?)
3. Garantia (e se não chegar em 90 dias?)
4. Devolução (tem reembolso?)
5. Mentoria (com quem é?)
6. Operação (e se minha operação for específica?)

Resposta sempre direta · sem rodeio · sem "consulte nosso time".

## Countdown editorial

**Regra crítica:** só mostra countdown se urgência é REAL (turma realmente fecha, evento realmente começa, preço realmente sobe). Nunca "criar urgência" inventando deadline. Se a turma sempre abre, não mostra countdown.

## Comparativo concorrente

**Nunca cita concorrente pelo nome.** Use "Curso de prompt engineering genérico" como categoria. Honestidade competitiva é mostrar diferença real, não atacar pessoa.

## Reference completa

`/Users/rafaelmilagre/viver-de-ia-ds/src/pages/patterns/LandingElements.tsx` tem:
- 5 hero variants
- 8 CTA variants com contexto
- 3 padrões trust signals
- FAQ 6 categorias
- Lead magnet inline form
- Countdown editorial
- Comparativo concorrente

## Output

Para landing completa: gere HTML/JSX estruturado com todas as seções, citando paleta restrita + Geist + atmospheric mesh em hero.

Para elemento isolado (só hero, só FAQ): foca naquele e cita onde encaixa.

**Sempre lembre: 1 CTA principal por section. Sem countdown se urgência não é real. Sem trash-talk de concorrente.**
