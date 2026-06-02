# Viver de IA · Claude Code Plugin

Plugin completo do Viver de IA Design System pra Claude Code. Use pra gerar qualquer artefato editorial da marca com 1 comando.

## Instalação · 2 comandos (qualquer um do time)

No seu Claude Code, rode:

```
/plugin marketplace add rafaelmilagre7/viver-de-ia-ds
/plugin install viver-de-ia@viver-de-ia-ds
```

Pronto — `/via` e os outros comandos aparecem no autocomplete, e a skill `viver-de-ia-design` fica disponível. Pra atualizar quando o DS evoluir: `/plugin marketplace update viver-de-ia-ds`.

## Comandos disponíveis

| Comando | Quando usar |
|---|---|
| `/via` | Entrada geral · descreva o que quer construir, ela direciona |
| `/via-email` | Email · 5 templates de **produção à prova de bala** (react-email · `/patterns/email`) + 13 editoriais |
| `/via-social` | Social media · 6 canais (IG, LinkedIn, YT, X, TikTok, podcast) |
| `/via-landing` | Landing page · 5 hero variants + 7 elementos reutilizáveis |
| `/via-brand` | Brand book · logo correta · voice por contexto · personality |
| `/via-deck` | Pitch deck + one-pager + case study + proposta + contract |
| `/via-paid` | Meta Ads + Google Display · 12 creatives canônicos |
| `/via-check` | Auditoria editorial · 12 pontos · verde/amarelo/vermelho |

## Skill incluída

`viver-de-ia-design` · skill base com paleta + tipografia + regras invioláveis + 107 páginas do reference site. Carregada automaticamente por todos os comandos.

## Sub-agent incluído

`via-auditor` · roda auditoria proativa depois de qualquer geração de artefato. Usa Read/Grep/Glob pra checar conformidade contra os 12 pontos canônicos.

## Workflow típico

```
1. /via gerar email de welcome pra aluno novo
   → carrega skill, identifica categoria "email/welcome", invoca /via-email
   → gera subject + body + footer com voz caloroso-operacional
   → roda via-auditor proativamente

2. Reviso resultado · ajusto se necessário

3. /via-check [colo o resultado]
   → reporta verde/amarelo/vermelho
   → se vermelho, refaço com correções
```

## Reference site canônico

107 páginas em `/Users/rafaelmilagre/viver-de-ia-ds`. `bun dev` → http://localhost:5173.

Quando o comando cita "ver /patterns/email-coverage", essa página tem todos os 13 templates renderizados ao vivo com chrome de email autêntico + notas de aplicação.

## Atualizações

Plugin versionado junto com o DS. Quando reference site atualiza, plugin atualiza junto. Pull no repo + reinicia Claude Code pra refresh.

## Suporte

Issues em https://github.com/rafaelmilagre7/viver-de-ia-ds/issues · ou direto pro Rafael.
