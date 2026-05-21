---
description: Entrada geral do Viver de IA Design System. Descreve o que vai construir e este comando direciona pro pattern certo.
---

# /via · ponto de entrada do Viver de IA Design System

Use este comando quando estiver começando algo novo da marca Viver de IA e não tiver certeza de qual pattern aplicar.

## O que fazer com o argumento

O usuário descreveu o que precisa em `$ARGUMENTS`. Identifica a categoria e direciona:

| Se o usuário pediu… | Use o comando específico |
|---|---|
| email, transacional, newsletter, drip, churn | `/via-email` |
| post, story, reel, LinkedIn, Instagram, YouTube, TikTok, X, podcast | `/via-social` |
| landing, hero, lead magnet, FAQ, countdown, opt-in | `/via-landing` |
| brand book, logo usage, voice, identidade | `/via-brand` |
| pitch deck, slides, apresentação, proposta, one-pager, case study | `/via-deck` |
| anúncio, ad, paid, Meta, Google Display | `/via-paid` |
| auditar, revisar, está dentro do padrão? | `/via-check` |

Se a categoria não bate em nenhuma, gere direto seguindo os princípios canônicos:

## Princípios canônicos (resumo · skill carregada tem mais detalhes)

1. **Paleta restrita** · branco · cinza · navy · preto · coral só destrutivo · success só presence
2. **Sem gold, amarelo, amber, roxo, cyan, magenta, neon, gradient quente**
3. **Pill canônica** · 11px · peso 500 · letter-spacing -0.004em · nowrap · sem dot · sem caps lock
4. **Tipografia Geist** single family · italic em ênfase
5. **Voz editorial** · operador-experiente · número ou citação · sem clichê IA · sem emoji decorativo
6. **Sparkles banido** · usar Compass · Award · Crown · Layers · MessageCircle
7. **Logo correta por contexto** · monogram pequeno, wordmark grande, app icon em profile, leaders AI mark em material de evento

## Reference site canônico

Quando em dúvida sobre como algo deve parecer, consulte uma das 107 páginas em `/Users/rafaelmilagre/viver-de-ia-ds/src/pages/`.

Páginas chave por contexto:
- **Brand book completo** · `/foundations/brand-story` · `/foundations/personality` · `/foundations/voice-extended` · `/foundations/logo-usage`
- **Email** · `/patterns/email-coverage` (13 templates)
- **Social** · `/patterns/social-coverage` (6 canais · 18 templates)
- **Paid ads** · `/patterns/paid-ads` (Meta + Google · 12 creatives)
- **Landing** · `/patterns/landing-elements` (hero · CTA · trust · FAQ · countdown · compare)
- **Commercial** · `/patterns/commercial` (deck + one-pager + case + proposta + contract)
- **Editorial** · `/patterns/editorial-content` (newsletter + blog + podcast + YT + tutorial)
- **Event** · `/patterns/event-collateral` (Leaders AI guidelines)

## Fluxo

1. Lê o que está em `$ARGUMENTS`
2. Identifica a categoria · invoca o comando específico se houver match
3. Se não houver, gera seguindo princípios + cita a página de referência mais próxima
4. Sugere ao usuário rodar `/via-check` no resultado pra validar conformidade
