---
description: Gera pitch deck Google Slides Viver de IA · 12 slides canônicos · one-pager · case study · proposta · contract.
---

# /via-deck · commercial / sales material

## Entrada

O usuário descreveu o tipo de material em `$ARGUMENTS`. Identifica:

| Tipo | Use |
|---|---|
| Pitch deck completo | `12 slides canônicos` |
| Palestra em evento | `Deck de palestra` |
| Apresentação para audiência X | `Deck adaptado` |
| One-pager B2B | `One-pager A4` |
| Case study | `Case study editorial` |
| Proposta / orçamento | `Proposal format` |
| Contrato | `Contract minimalista` |

## Pitch deck · 12 slides canônicos

| # | Slide | Conteúdo |
|---|---|---|
| 01 | Capa | Lockup central (monograma + wordmark) · tagline curta · fundo claro + atmosfera radial navy suave |
| 02 | Problema | "Operador médio brasileiro não opera IA" · declaração forte |
| 03 | Mercado | +[N] operadores · R$ [valor] · prova com número |
| 04 | Método | 3 atos overview (estuda · constrói · opera) |
| 05 | Ato 1 · Estuda | 18 aulas + stack real (Claude SDK, OpenAI) |
| 06 | Ato 2 · Constrói | 4 lives + 2 estudos de caso + mentoria 1:1 mensal |
| 07 | Ato 3 · Opera | Agente em produção · responsabilidade do operador |
| 08 | Caso 1 | Caio Ribeiro · Nina · 11.920 conversas/mês |
| 09 | Caso 2 | Camila Moraes · proposta · 73% menos token |
| 10 | Preço + garantia | R$ [valor]/mês · 4 meses · 90 dias até produção · [condições da garantia] |
| 11 | Próximo passo | "30min de call · [data] · audito seu caso" |
| 12 | Thank-you | Lockup + contato (caio@viverdeia.ai · @caioribeiro) · único slide que pode ter fundo navy |

## Regras canônicas do deck

- **16:9 · Google Slides 1920×1080** · exporta como tema reutilizável
- **1 ideia por slide** · headline + 1 frase suporte (não 5 bullets)
- **Número como protagonista** · Geist Display peso 500 · tabular
- **Monogram bottom-right** · 24px em slide 1920×1080 (≈1,25% da largura) · opacidade 0.5 · marca a sequência
- **Pill em slide** · os 11px da pill são pra tela · em 1920×1080 escale ~2× (≈24px de texto, padding proporcional) · fundo em token de superfície (`var(--via-glass-card)` / `var(--via-surface)`), não branco fixo
- **Light-first** · fundo claro (branco/off-white + atmosfera radial navy suave) em todos os slides, capa inclusive · navy de fundo só se o usuário pedir ou no thank-you (regra zero)
- **Sem foto stock** · tipografia + atmosfera carregam o slide
- **Capa + thank-you · lockup central** (monograma + wordmark juntos · nunca wordmark solto) · só esses 2 slides têm o lockup; nos internos, monograma no canto
- **Nunca invente preço nem número de alunos/operadores** · pergunte ou use o placeholder `R$ [valor]` / `[N] alunos`
- **Nunca invente garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local** · só o que a pessoa informou · senão `[condições da garantia]` / `[prazo de devolução]` / `[data]` / `[local]` ou pergunte

## Deck de palestra (evento) · estrutura curta

| # | Slide | Conteúdo |
|---|---|---|
| 01 | Capa | Fundo claro · lockup + título da palestra + `[nome do evento] · [data] · [seu nome]` |
| 02 | Tese | 1 frase que a palestra defende |
| 03-05 | Método | 2–3 slides de cards (um passo por card) |
| 06 | Caso | 1 caso com número · só fatos dados pela pessoa ou já documentados |
| 07 | Métrica / próximo passo | o número que a plateia deve acompanhar ou a ação de amanhã |
| 08 | Encerramento | contato · fundo navy permitido |

Mesmas regras do pitch deck: 1 ideia por slide · monograma no canto dos internos · nada de data/local inventado.

## One-pager B2B (PDF A4)

```
Header · lockup + tag editorial
Hero · "Operadores formando operadores · método codificado em [N] alunos"
4 stats grid ([N] · R$ [valor] · [N]% · 90 dias)
3 colunas:
  · Pra quem é (perfil operador PME)
  · O que recebe (checklist 6 itens)
  · Garantia (90 dias até produção · [condições da garantia] · [prazo de devolução] · só o que a pessoa informou)
Footer · próxima turma + CTA url
```

## Case study editorial

Estrutura:
1. **Contexto** (quem é cliente · setup inicial · dados base)
2. **Desafio** (problema específico · tentou X · não funcionou)
3. **Método aplicado** (3 ações concretas · cada uma testada isolada)
4. **Resultado mensurado** (números específicos · contra mesma cohort)
5. **Quote atribuído** (depoimento real · cargo + empresa)

## Proposta / orçamento

```
Header · lockup + número (PRO-YYYY-NNNNN)
"Emitida" · "Válida até" (data clara)
"Para" · razão social + CNPJ + endereço + att
Escopo · lista checklist do que está incluído
Custo · tabela com subtotal + total grandes
Footer · "Próximo passo" + CTA "Aceitar proposta"
```

## Contract visual

5 cláusulas mínimas:
1. Partes (contratante + contratada)
2. Objeto (período + escopo)
3. Garantia (90 dias até produção · [condições da garantia])
4. Devolução ([prazo de devolução])
5. Propriedade intelectual (licença vitalícia)

2 assinaturas · localização + data · 2 vias.

## Reference completa

`viver-de-ia-ds/src/pages/patterns/Commercial.tsx` tem (atenção: a capa de lá ainda está em navy mesh com wordmark, anterior à regra light-first · para cor de fundo e logo vale este comando):
- 12 slides do deck visualmente renderizados
- one-pager A4 PDF-ready
- case study editorial completo (Camila Moraes)
- proposta com todos os blocos
- contract visual minimalista

## Output

Para deck: gere os 12 slides numerados com conteúdo + nota visual (qual layout · claro por padrão, navy só no thank-you ou se pedirem · monogram position).

Para palestra: siga o `Deck de palestra` (8 slides) com a mesma nota visual.

Para one-pager: gere conteúdo completo dos 3 blocos (perfil · benefícios · garantia).

Para case: estrutura completa com 5 sections + quote atribuído.

Para proposta/contract: documento legal-formatted com todos os campos identificados.

**Sempre lembrar:** voz consultivo-objetivo (custo do cliente → solução → prova → próximo passo). Sem "Olá! Somos uma empresa líder em soluções inovadoras". Sem "ficamos à disposição".
