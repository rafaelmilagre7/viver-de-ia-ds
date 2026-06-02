---
description: Gera post de social media Viver de IA · Instagram, LinkedIn, YouTube, X, TikTok, Podcast cover · 18 templates canônicos.
---

# /via-social · social media editorial

## Entrada

O usuário descreveu canal + formato em `$ARGUMENTS`. Identifica:

| Canal | Formatos |
|---|---|
| Instagram | post (1080×1080) · story (1080×1920) · reel cover · highlight |
| LinkedIn | post pessoal · post empresa · carousel 10 cards · page banner |
| YouTube | thumbnail (1280×720) · channel art (2560×1440) · end card |
| X / Twitter | header (1500×500) · post simples · quote tweet com card |
| TikTok | cover (1080×1920) · text overlay variations |
| Podcast | cover (3000×3000) · episode card (1080×1080) |

## Voz por canal

| Canal | Registro |
|---|---|
| Instagram | atmosfera navy + 1 número grande + 1 atribuição |
| LinkedIn pessoal | crônica-pessoal 1ª pessoa · gancho com número |
| LinkedIn empresa | institucional · sem 1ª pessoa · número como protagonista |
| YouTube | texto grande sem foto literal · contexto pra clicar |
| X | frase curta + número · sem thread compulsiva · sem emoji |
| TikTok | hook visual + texto bold · "pt 1/3" pra série |
| Podcast | wordmark big + tagline · episode count |

## Estrutura visual canônica

**Canvas formato**: aspect ratio correto pra cada plataforma · navy mesh background · sem foto literal · headline editorial centralizada ou centrada esquerda

**Logo correta**:
- Instagram profile pic → `VIA_app_icon.png` (não monogram)
- Canvas post navy → `monogram_white` canto inferior esquerdo 36px
- LinkedIn page → `app_icon` no card empresa
- YouTube thumbnail → `monogram_white` canto inferior esquerdo 32px
- Podcast cover → `monogram_white` canto inferior direito 200px
- Banner LinkedIn/YouTube → `wordmark_white` central
- Material Leaders AI → `leaders-ai-conference-logo` no lugar do monogram VIA

## Específico por formato

### Instagram feed post (1080×1080)
```
- safe area 60px de cada lado
- headline Geist Display 56-72px (não 200px)
- 1 número editorial protagonista
- caption editorial 60% transparency
- logo canto inferior esquerdo · 40px
```

### LinkedIn carousel (10 cards 1080×1350)
```
Card 1 (hook): número grande + sub curta + monogram inferior direito
Cards 2-9: contexto → problema → solução → resultado
Card 10 (CTA): "vou ensinar isso" + data turma + monogram

Cada card: portrait 1080×1350 · headline 38-52px Geist Display
```

### YouTube thumbnail (1280×720)
```
- texto grande (80-120px) sem foto literal
- duração badge mono canto inferior direito
- monogram_white inferior esquerdo 32px
- contraste navy + white · evitar cinza médio que some
```

## Regras invioláveis

- **Sem emoji decorativo** · ✨🚀💪🔥 banidos
- **Sem "5 dicas infalíveis"** · primeira linha sempre = gancho com número OU pergunta operacional
- **Sempre case próprio** · não reproduzir tweet de IA influencer
- **CTA discreto no fim** · texto natural ("se quiser ver o código, comenta aqui")
- **Paleta restrita** · navy + cinza + branco · zero gold/amarelo
- **Hashtags** · poucas e relevantes · não 30 hashtags genéricas

## Reference completa

`viver-de-ia-ds/src/pages/patterns/SocialCoverage.tsx` tem todos os 18 templates com chrome authentic do app (profile pic, like, comment count).

## Output

Para post simples: gere caption + descrição visual do canvas (HTML/CSS conceitual).

Para carousel: liste todos os 10 cards com hook → contexto → resultado → CTA.

Para múltiplos formatos: separe por canal e formato com spec de tamanho.

**Sempre cite logo correta + tamanhos canônicos + voz específica do canal.**
