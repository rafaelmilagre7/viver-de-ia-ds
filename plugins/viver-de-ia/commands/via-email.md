---
description: Gera email Viver de IA — produção à prova de bala (react-email · emails/) ou rascunho editorial (13 templates de voz). Use pra welcome, billing, churn, newsletter, drip, event, lançamento, NPS, oferta, win-back, etc.
---

# /via-email · gerar email Viver de IA

## Dois modos

1. **Produção (à prova de bala)** — quando o email vai ser ENVIADO de verdade. Use o motor `emails/` (react-email) do DS. **14 templates prontos**: `welcome`, `welcome-plataforma`, `enrollment`, `billing`, `nps`, `digest`, `event-invite`, `recap`, `drip`, `lancamento`, `oferta`, `churn`, `winback`, `urgent-ops`. Render via `@react-email/render` → HTML que não quebra no Gmail/Outlook/Apple Mail. Ao vivo em `/patterns/email`.
2. **Editorial (rascunho)** — quando o usuário só quer o conteúdo (subject/headline/corpo) pra revisar ou colar. Use as regras de voz abaixo.

### Regras invioláveis de email de produção (≠ web)

- **Tabela + estilo inline**, ~600px, `<102KB`. NUNCA flex/grid/`backdrop-filter`/`position`/CSS vars em email.
- **CTA navy SÓLIDO** (`background-color`). Degradê puro de fundo SOME no Outlook → botão invisível.
- **Cabeçalho claro é o padrão** (logo + eyebrow + título no cartão branco, sem faixa). **Faixa navy só em lançamento e convite de evento** (`<Layout variant="brand">`). Urgência = eyebrow de alerta (`hero.tone: 'alert'`), nunca painel/fundo coral.
- **Vidro simulado OK** (painéis frosted, CTA glossy) MAS todo `background-image: gradient` precisa de `background-color` sólido de fallback na mesma regra.
- **Celular:** layout inline aceitável em 375px por si só; `@media (max-width: 480px)` só refina (respiro 20px, chave–valor empilhado, botão largura total).
- **Logo = `lockup-navy.png`** (monograma + wordmark · ~18px de altura · PNG porque o Gmail não renderiza SVG) em URL absoluta (`https://viver-de-ia-ds.vercel.app/logos/lockup-navy.png`). Trava em claro (`color-scheme: light only`). Preheader sempre.
- A IA escreve só o editorial; o motor renderiza. Pra enviar: `render(<WelcomeEmail .../>)` → `resend.emails.send({ from, to, subject, html })`.

## Entrada

O usuário descreveu o tipo de email em `$ARGUMENTS`. Identifica em qual das 5 categorias se encaixa:

- **Transacional** · welcome, billing próxima, billing falhou
- **Editorial** · weekly digest (newsletter), drip nurture (5 touches), recap pós-evento
- **Concierge** · urgent ops alert, NPS / feedback
- **Comercial** · event invite, lançamento, oferta sutil
- **Lifecycle** · churn alert, win-back

## Princípios de voz por contexto

| Categoria | Voz | Sample subject |
|---|---|---|
| Transacional welcome | caloroso-operacional | "Bem-vindo. Próximos passos em 3 atos." |
| Transacional billing | concierge-direto | "Cobrança em 2 dias · R$ [valor] · plano [nome]" |
| Editorial newsletter | crônica-pessoal | "A Nina passou de [N] pra [N] conversas · 2 detalhes mudaram tudo" |
| Editorial drip | stand-alone editorial | "O agente que paga o plano" |
| Concierge ops | timeline-tecnico | "Webhook timeout · 504 desde 14:08 · provider embedding" |
| Concierge NPS | pessoal-curioso | "Como tá indo a plataforma? 1 pergunta direta" |
| Comercial evento | factual-editorial | "[dia] [hora] · auditoria de 3 prompts ao vivo" |
| Comercial lançamento | fato + condição | "[o que abre] abre [data] às [hora] · [condição fornecida]" |
| Comercial oferta | observacional | "Pelo que vi no seu agente, faria sentido conversar" |
| Lifecycle churn | curioso-humano | "Você sumiu há 19 dias · tô curioso, o que rolou" |
| Lifecycle win-back | observa-mudanças | "3 coisas mudaram desde que você saiu · acho que faz sentido voltar" |

Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos · leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual) · sem acesso à internet, use o `fatos.md` da skill viver-de-ia-design (ou do kit) e cite a data dele · use a frase pronta. O que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu · senão placeholder.
Nunca invente preço (só o da ficha) nem número de alunos/vagas · pergunte ou use o placeholder `R$ [valor]` / `[N] vagas`.
Nunca invente garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local de evento · só o que está na ficha ou o que a pessoa informou · senão `[condições da garantia]` / `[prazo de devolução]` / `[data]` / `[local]` ou pergunte.

## Estrutura canônica

```
[email header com lockup-navy.png · ~18px de altura · URL absoluta (SVG e <BrandLogo> não aparecem no Gmail)]

[email body · max 600px]
  - subject (frase de amigo · sem "Olá" · sem emoji · sem urgência fabricada)
  - first frase = entrega o assunto direto
  - corpo editorial (parágrafos curtos · sem listas decorativas)
  - 1 CTA principal (pílula navy · sentence-case · 2-4 palavras)
  - fine print opcional (cinza · 12.5px · contextualiza prazo/limite)
  - assinatura humana real: [nome] · [cargo] (liderança oficial na ficha de fatos)

[email footer]
  - monograma pequeno (`monogram-navy.png` · URL absoluta `https://viver-de-ia-ds.vercel.app/logos/monogram-navy.png`)
  - "Viver de IA · operadores formando operadores · São Paulo, BR"
  - "Atualizar preferências" · "Não quero mais" (links)
```

## Regras editoriais

- **Subject** = frase de amigo, sem "Olá", sem emoji, sem urgência fabricada
- **Primeira frase do body** = já entrega o fato · sem "esperamos que esteja bem"
- **Tratamento** · "você" sempre · imperativo coloquial liberado (responde, marca, faz) · nunca tu/teu/tua/contigo
- **Sempre 1 ação concreta** · não só informe
- **Variáveis dinâmicas** · use `{aluno_first_name}`, `{cobranca_valor}`, etc.
- **Hero plate em emails editoriais** · navy mesh com 1 número grande
- **Width 600px** · Litmus baseline · funciona em qualquer cliente

## Reference completa

**Produção:** `emails/` (templates react-email) + `/patterns/email` no reference site (iframe do HTML real + como enviar via Resend). Renderize com `bun run build:emails`.

**Editorial:** `viver-de-ia-ds/src/pages/patterns/EmailCoverage.tsx` tem todos os 13 templates com:
- subject + preview + body completo
- notas: quando enviar, voz, variáveis dinâmicas
- chrome de email (header logo · footer · unsubscribe)

## Output

Gere o email completo com:
1. Subject + preview
2. Body editorial (HTML email-safe ou markdown · pergunta se não souber)
3. Notas de aplicação (quando enviar · voice · variáveis)

Se o usuário pediu múltiplos emails (drip series), entrega todos numa única response com cadência clara.
