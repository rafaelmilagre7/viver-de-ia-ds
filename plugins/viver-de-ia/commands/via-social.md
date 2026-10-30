---
description: Gera post de social media Viver de IA · Instagram, LinkedIn, YouTube, X, TikTok, Podcast cover · 18 templates canônicos.
---

# /via-social · social media editorial

## Entrada

O usuário descreveu canal + formato em `$ARGUMENTS`. Identifica:

| Canal | Formatos |
|---|---|
| Instagram | post (1080×1080) · feed retrato (1080×1350 · 4:5) · story (1080×1920) · reel cover · highlight |
| LinkedIn | post pessoal · post empresa · carousel 10 cards · page banner |
| YouTube | thumbnail (1280×720) · channel art (2560×1440) · end card |
| X / Twitter | header (1500×500) · post simples · quote tweet com card |
| TikTok | cover (1080×1920) · text overlay variations |
| Podcast | cover (3000×3000) · episode card (1080×1080) |

## Voz por canal

| Canal | Registro |
|---|---|
| Instagram | fundo claro com atmosfera radial navy suave + 1 número grande + 1 atribuição |
| LinkedIn pessoal | crônica-pessoal 1ª pessoa · gancho com número |
| LinkedIn empresa | institucional · sem 1ª pessoa · número como protagonista |
| YouTube | texto grande sem foto literal · contexto pra clicar |
| X | frase curta + número · sem thread compulsiva · sem emoji |
| TikTok | hook visual + texto bold · "pt 1/3" pra série |
| Podcast | lockup + tagline · episode count |

## Estrutura visual canônica

**Canvas formato**: aspect ratio correto pra cada plataforma · **fundo claro por padrão** (branco/off-white + atmosfera radial navy suave) · navy de fundo só se o usuário pedir (regra zero · light-first) · sem foto literal · headline editorial centralizada ou centrada esquerda

**Logo correta** (arquivos oficiais: `lockup-navy.svg` / `lockup-white.svg` / `monogram-navy.svg` / `monogram-white.svg` · em `logos/` do kit ou `https://viver-de-ia-ds.vercel.app/logos/…`):
- Instagram profile pic → app icon (`VIA_app_icon.png` · no kit `app-icon.png`) · não monogram
- Post / carousel / story → **lockup** pequeno no rodapé ou canto · `lockup-navy.svg` no fundo claro (`lockup-white.svg` só sobre navy) · ~40px de altura em canvas 1080
- LinkedIn page → app icon no card empresa
- YouTube thumbnail → **lockup** canto inferior esquerdo · ~32px de altura
- Podcast cover → **lockup** canto inferior direito · ~200px de altura em 3000×3000
- Banner LinkedIn/YouTube → **lockup** (navy sobre fundo claro) · nunca wordmark solto
- Material Leaders AI → mark do Leaders AI no lugar do VIA · navy (`leaders-ai-conference-logo-navy.png` · no kit `leaders-ai-conference-logo-navy.png`) no fundo claro, branco (`leaders-ai-conference-logo.png` · no kit `leaders-ai-conference-logo.png`) no escuro · sem faixa navy só pra segurar a logo

## Específico por formato

### Instagram feed post (1080×1080 · ou retrato 1080×1350 · 4:5)
```
- fundo claro (branco/off-white + atmosfera radial navy suave) · navy só a pedido
- safe area 60px de cada lado
- headline Geist Display 56-72px (não 200px)
- 1 número editorial protagonista
- caption editorial em `--via-text-muted` (de-ênfase por cor, nunca por opacity)
- lockup navy canto inferior esquerdo · ~40px de altura
```

### LinkedIn carousel (10 cards 1080×1350)
```
Card 1 (hook): número grande + sub curta + lockup pequeno no rodapé
Cards 2-9: contexto → problema → solução → resultado · monograma no canto (como slide interior)
Card 10 (CTA): "vou ensinar isso" + [data] da turma + lockup · único card que pode ter fundo navy

Cada card: portrait 1080×1350 · headline 38-52px Geist Display
```

### YouTube thumbnail (1280×720)
```
- texto grande (80-120px) sem foto literal
- duração badge mono canto inferior direito
- lockup inferior esquerdo · ~32px de altura (navy no fundo claro)
- contraste navy + white · evitar cinza médio que some
```

## Regras invioláveis

- **Sem emoji decorativo** · ✨🚀💪🔥 banidos
- **Sem "5 dicas infalíveis"** · primeira linha sempre = gancho com número OU pergunta operacional
- **Sempre case próprio** · não reproduzir tweet de IA influencer
- **CTA discreto no fim** · texto natural ("se quiser ver o código, comenta aqui")
- **Paleta restrita** · navy + cinza + branco · zero gold/amarelo
- **Pill em arte grande** · os 11px da pill são pra tela · em canvas de 1080px escale ~2× (≈22px de texto, padding proporcional) · fundo em token de superfície (`var(--via-glass-card)` / `var(--via-surface)`), não branco fixo
- **Nunca invente** preço, vagas, data, local ou condição comercial · use `[N] vagas` / `[data]` / `[local]` ou pergunte
- **Hashtags** · poucas e relevantes · não 30 hashtags genéricas

## Reference completa

`viver-de-ia-ds/src/pages/patterns/SocialCoverage.tsx` tem todos os 18 templates com chrome authentic do app (profile pic, like, comment count).

## Output

Para post simples: gere caption + descrição visual do canvas (HTML/CSS conceitual).

Para carousel: liste todos os 10 cards com hook → contexto → resultado → CTA.

Para múltiplos formatos: separe por canal e formato com spec de tamanho.

**Sempre cite logo correta + tamanhos canônicos + voz específica do canal.**
