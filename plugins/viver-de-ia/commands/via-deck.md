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
| 03 | Mercado | 521 cases reais de implementação de IA · 29 setores já transformados com IA · prova com número da ficha |
| 04 | Método | 3 atos overview (estuda · constrói · opera) |
| 05 | Ato 1 · Estuda | formações da plataforma + stack real (Claude SDK, OpenAI) |
| 06 | Ato 2 · Constrói | 157 soluções de IA prontas para usar + comunidade + mentoria (em grupo no Pro · individual no Enterprise) |
| 07 | Ato 3 · Opera | Agente em produção · responsabilidade do operador |
| 08 | Caso 1 | [nome · cargo · empresa] · [resultado do caso] · só com dado fornecido |
| 09 | Caso 2 | [nome · cargo · empresa] · [resultado do caso] · só com dado fornecido |
| 10 | Planos + garantia | Starter, Pro e Enterprise com o preço da ficha (contratação anual) · garantia na frase pronta da ficha (3 requisitos · cláusula 7 dos termos) |
| 11 | Próximo passo | "30min de call · [data] · audito seu caso" |
| 12 | Thank-you | Lockup + contato (`[email]` · `[@perfil]`) · único slide que pode ter fundo navy |

## Regras canônicas do deck

- **16:9 · Google Slides 1920×1080** · exporta como tema reutilizável
- **1 ideia por slide** · headline + 1 frase suporte (não 5 bullets)
- **Número como protagonista** · Geist Display peso 500 · tabular
- **Monogram bottom-right** · 24px em slide 1920×1080 (≈1,25% da largura) · opacidade 0.5 · marca a sequência
- **Pill em slide** · os 11px da pill são pra tela · em 1920×1080 escale ~2× (≈24px de texto, padding proporcional) · fundo em token de superfície (`var(--via-glass-card)` / `var(--via-surface)`), não branco fixo
- **Light-first** · fundo claro (branco/off-white + atmosfera radial navy suave) em todos os slides, capa inclusive · navy de fundo só se o usuário pedir ou no thank-you (regra zero)
- **Sem foto stock** · tipografia + atmosfera carregam o slide
- **Capa + thank-you · lockup central** (monograma + wordmark juntos · nunca wordmark solto) · só esses 2 slides têm o lockup; nos internos, monograma no canto
- **Números do negócio só da ficha de fatos** (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) · leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual) · sem acesso à internet, use o `fatos.md` da skill viver-de-ia-design (ou do kit) e cite a data dele · use a frase pronta · o que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu
- **Nunca invente preço (só o da ficha) nem número de alunos/operadores** · pergunte ou use o placeholder `R$ [valor]` / `[N] alunos`
- **Nunca invente garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local** · só o que está na ficha ou o que a pessoa informou · senão `[condições da garantia]` / `[prazo de devolução]` / `[data]` / `[local]` ou pergunte

## Deck de palestra (evento) · estrutura curta

| # | Slide | Conteúdo |
|---|---|---|
| 01 | Capa | Fundo claro · lockup + título da palestra + `[nome do evento] · [data] · [seu nome]` |
| 02 | Tese | 1 frase que a palestra defende |
| 03-05 | Método | 2–3 slides de cards (um passo por card) |
| 06 | Caso | 1 caso com número · só fatos dados pela pessoa ou da ficha de fatos |
| 07 | Métrica / próximo passo | o número que a plateia deve acompanhar ou a ação de amanhã |
| 08 | Encerramento | contato · fundo navy permitido |

Mesmas regras do pitch deck: 1 ideia por slide · monograma no canto dos internos · nada de data/local inventado.

## One-pager B2B (PDF A4)

```
Header · lockup + tag editorial
Hero · "Operadores formando operadores · método codificado em [N] alunos"
4 stats grid (cases reais · soluções prontas · setores, da ficha de fatos · [N]% só com dado fornecido)
3 colunas:
  · Pra quem é (perfil operador PME)
  · O que recebe (checklist 6 itens)
  · Garantia (frase pronta da ficha de fatos, com os 3 requisitos e a cláusula 7 · [prazo de devolução] só se a pessoa informou)
Footer · planos (ficha de fatos) + CTA url
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
3. Garantia (frase pronta da ficha de fatos · cláusula 7 dos termos de uso)
4. Devolução ([prazo de devolução])
5. Propriedade intelectual (licença vitalícia)

2 assinaturas · localização + data · 2 vias.

## Reference completa

`viver-de-ia-ds/src/pages/patterns/Commercial.tsx` tem (atenção: a capa de lá ainda está em navy mesh com wordmark, anterior à regra light-first · para cor de fundo e logo vale este comando):
- 12 slides do deck visualmente renderizados
- one-pager A4 PDF-ready
- case study editorial completo (nome e números de lá são ilustrativos, não fatos)
- proposta com todos os blocos
- contract visual minimalista

## Output

Para deck: gere os 12 slides numerados com conteúdo + nota visual (qual layout · claro por padrão, navy só no thank-you ou se pedirem · monogram position).

Para palestra: siga o `Deck de palestra` (8 slides) com a mesma nota visual.

Para one-pager: gere conteúdo completo dos 3 blocos (perfil · benefícios · garantia).

Para case: estrutura completa com 5 sections + quote atribuído.

Para proposta/contract: documento legal-formatted com todos os campos identificados.

**Sempre lembrar:** voz consultivo-objetivo (custo do cliente → solução → prova → próximo passo). Sem "Olá! Somos uma empresa líder em soluções inovadoras". Sem "ficamos à disposição".
