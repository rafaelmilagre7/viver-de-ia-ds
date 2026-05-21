---
description: Gera email editorial Viver de IA. Use pra qualquer dos 13 templates (welcome, billing, churn, newsletter, drip, event, lançamento, NPS, oferta, win-back, etc.).
---

# /via-email · gerar email editorial Viver de IA

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
| Transacional billing | concierge-direto | "Cobrança em 2 dias · R$ 2.400 · mentoria mensal" |
| Editorial newsletter | crônica-pessoal | "A Nina passou de 11k pra 13k conversas · 2 detalhes mudaram tudo" |
| Editorial drip | stand-alone editorial | "O agente que paga a mentoria" |
| Concierge ops | timeline-tecnico | "Webhook timeout · 504 desde 14:08 · provider embedding" |
| Concierge NPS | pessoal-curioso | "Como tá indo a mentoria? 1 pergunta direta" |
| Comercial evento | factual-editorial | "Sex 14h · auditoria de 3 prompts ao vivo" |
| Comercial lançamento | fato + condição | "Turma 2026.3 abre amanhã 9h · 30 vagas · 4 meses" |
| Comercial oferta | observacional | "Pelo que vi no teu agente, faria sentido conversar" |
| Lifecycle churn | curioso-humano | "Tu sumiu há 19 dias · tô curioso, o que rolou" |
| Lifecycle win-back | observa-mudanças | "3 coisas mudaram desde que tu saiu · acho que faz sentido voltar" |

## Estrutura canônica

```
[email header com BrandLogo black sm]

[email body · max 600px]
  - subject (frase de amigo · sem "Olá" · sem emoji · sem urgência fabricada)
  - first frase = entrega o assunto direto
  - corpo editorial (parágrafos curtos · sem listas decorativas)
  - 1 CTA principal (pílula navy · sentence-case · 2-4 palavras)
  - fine print opcional (cinza · 12.5px · contextualiza prazo/limite)
  - assinatura humana (Caio · time Viver de IA)

[email footer]
  - monogram pequeno
  - "Viver de IA · operadores formando operadores · São Paulo, BR"
  - "Atualizar preferências" · "Não quero mais" (links)
```

## Regras editoriais

- **Subject** = frase de amigo, sem "Olá", sem emoji, sem urgência fabricada
- **Primeira frase do body** = já entrega o fato · sem "esperamos que esteja bem"
- **Sempre 1 ação concreta** · não só informe
- **Variáveis dinâmicas** · use `{aluno_first_name}`, `{cobranca_valor}`, etc.
- **Hero plate em emails editoriais** · navy mesh com 1 número grande
- **Width 600px** · Litmus baseline · funciona em qualquer cliente

## Reference completa

`/Users/rafaelmilagre/viver-de-ia-ds/src/pages/patterns/EmailCoverage.tsx` tem todos os 13 templates com:
- subject + preview + body completo
- notas: quando enviar, voz, variáveis dinâmicas
- chrome de email (header logo · footer · unsubscribe)

## Output

Gere o email completo com:
1. Subject + preview
2. Body editorial (HTML email-safe ou markdown · pergunta se não souber)
3. Notas de aplicação (quando enviar · voice · variáveis)

Se o usuário pediu múltiplos emails (drip series), entrega todos numa única response com cadência clara.
