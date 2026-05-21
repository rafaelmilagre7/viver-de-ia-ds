---
description: Gera pitch deck Google Slides Viver de IA · 12 slides canônicos · one-pager · case study · proposta · contract.
---

# /via-deck · commercial / sales material

## Entrada

O usuário descreveu o tipo de material em `$ARGUMENTS`. Identifica:

| Tipo | Use |
|---|---|
| Pitch deck completo | `12 slides canônicos` |
| Apresentação para audiência X | `Deck adaptado` |
| One-pager B2B | `One-pager A4` |
| Case study | `Case study editorial` |
| Proposta / orçamento | `Proposal format` |
| Contrato | `Contract minimalista` |

## Pitch deck · 12 slides canônicos

| # | Slide | Conteúdo |
|---|---|---|
| 01 | Capa | Wordmark central · tagline curta · navy mesh |
| 02 | Problema | "Operador médio brasileiro não opera IA" · declaração forte |
| 03 | Mercado | +220 operadores · R$ 1,8M · prova com número |
| 04 | Método | 3 atos overview (estuda · constrói · opera) |
| 05 | Ato 1 · Estuda | 18 aulas + stack real (Claude SDK, OpenAI) |
| 06 | Ato 2 · Constrói | 4 lives + 2 estudos de caso + mentoria 1:1 mensal |
| 07 | Ato 3 · Opera | Agente em produção · responsabilidade do operador |
| 08 | Caso 1 | Caio Ribeiro · Nina · 11.920 conversas/mês |
| 09 | Caso 2 | Camila Moraes · proposta · 73% menos token |
| 10 | Preço + garantia | R$ 2.400/mês · 4 meses · 90 dias até produção |
| 11 | Próximo passo | "30min de call · sex 22/mai · audito teu caso" |
| 12 | Thank-you | Monogram big + contato (caio@viverdeia.ai · @caioribeiro) |

## Regras canônicas do deck

- **16:9 · Google Slides 1920×1080** · exporta como tema reutilizável
- **1 ideia por slide** · headline + 1 frase suporte (não 5 bullets)
- **Número como protagonista** · Geist Display peso 500 · tabular
- **Monogram bottom-right** · 24px · opacity 0.5 · marca a sequência
- **Sem foto stock** · navy mesh + tipografia carrega o slide
- **Capa + thank-you · wordmark central** · só esses 2 slides têm wordmark

## One-pager B2B (PDF A4)

```
Header · wordmark + tag editorial
Hero · "Operadores formando operadores · método codificado em 220 alunos"
4 stats grid (220 · R$ 1,8M · 92% · 90 dias)
3 colunas:
  · Pra quem é (perfil operador PME)
  · O que recebe (checklist 6 itens)
  · Garantia (90 dias até produção · 60 dias devolução)
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
Header · wordmark + número (PRO-YYYY-NNNNN)
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
3. Garantia (90 dias até produção)
4. Devolução (60 dias)
5. Propriedade intelectual (licença vitalícia)

2 assinaturas · localização + data · 2 vias.

## Reference completa

`/Users/rafaelmilagre/viver-de-ia-ds/src/pages/patterns/Commercial.tsx` tem:
- 12 slides do deck visualmente renderizados
- one-pager A4 PDF-ready
- case study editorial completo (Camila Moraes)
- proposta com todos os blocos
- contract visual minimalista

## Output

Para deck: gere os 12 slides numerados com conteúdo + nota visual (qual layout · navy mesh ou light · monogram position).

Para one-pager: gere conteúdo completo dos 3 blocos (perfil · benefícios · garantia).

Para case: estrutura completa com 5 sections + quote atribuído.

Para proposta/contract: documento legal-formatted com todos os campos identificados.

**Sempre lembrar:** voz consultivo-objetivo (custo do cliente → solução → prova → próximo passo). Sem "Olá! Somos uma empresa líder em soluções inovadoras". Sem "ficamos à disposição".
