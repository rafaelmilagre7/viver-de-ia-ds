---
description: Auditoria editorial Viver de IA · valida se uma peça segue padrão · 12 pontos de checagem.
---

# /via-check · auditoria editorial Viver de IA

## Entrada

O usuário colou conteúdo (HTML, JSX, copy, screenshot description) em `$ARGUMENTS`. Sua tarefa é auditar contra os padrões canônicos Viver de IA e reportar:

## Checklist canônico de 12 pontos

### 1. Paleta restrita
- [ ] Sem gold (`#C7A559`), amarelo, amber, dourado em qualquer nível
- [ ] Sem roxo "IA", cyan, magenta, neon, gradient quente
- [ ] Coral usado SÓ pra destrutivo real
- [ ] Tons usados: branco · cinza · azul-escuro · navy · preto
- [ ] Sem hex hardcoded em production code (exceto: brand colors externas, syntax highlight, lib fallback)

### 2. Pill canônica
- [ ] `padding: 4px 11px`
- [ ] `border-radius: 999px`
- [ ] `font-size: 11px`
- [ ] `font-weight: 500` (não 700)
- [ ] `letter-spacing: -0.004em` (não 0.10em+)
- [ ] `white-space: nowrap`
- [ ] SEM `text-transform: uppercase`
- [ ] SEM bolinha decorativa antes do texto (exceto se status real)

### 3. Tipografia
- [ ] Geist Display + Geist + Geist Mono (single family)
- [ ] Sem mistura de famílias
- [ ] Zero itálico · ênfase = peso + cor (`<em>` reto, inclusive em h2 e blockquote)
- [ ] Letterspacing negativo em corpo (`-0.005em` a `-0.018em`)
- [ ] Pesos: body 400-500 · heading 500-600 · CTA 500 (não 700)

### 4. Voz editorial
- [ ] Sem clichê IA ("revolucione", "transforme", "futuro chegou", "potencialize")
- [ ] Sem urgência fabricada ("GARANTA JÁ", "ÚLTIMAS HORAS", "OPORTUNIDADE ÚNICA")
- [ ] Sem emoji decorativo no corpo (✨🚀💪🔥)
- [ ] Número específico quando possível (não "centenas", "muito mais")
- [ ] Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) batem com a ficha de fatos · leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual) · sem acesso à internet, use o `fatos.md` da skill viver-de-ia-design e cite a data dele · frase pronta da ficha · número do negócio fora da ficha, defasado ou reescrito com outro sentido (ex.: garantia sem os 3 requisitos) é vermelho · o que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu · senão placeholder
- [ ] Nada inventado: preço, nº de alunos/vagas, garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local · o que não está na ficha nem veio da pessoa é placeholder (`R$ [valor]`, `[N] vagas`, `[condições da garantia]`, `[prazo de devolução]`, `[data]`, `[local]`) · número/termo sem fonte é vermelho
- [ ] Ação concreta no fim (não "ficamos à disposição")
- [ ] "Você" sempre em UI de produto e email transacional/de ciclo de vida · qualquer tu, teu, tua, teus, tuas ou contigo é vermelho
- [ ] Microcopy de produto (erro, estado vazio, confirmação, toast, carregamento, onboarding, botão, ajuda de campo) reusa o texto canônico de `microcopy.md` (skill viver-de-ia-design) quando a situação bate · troca só os {campos} · texto próprio pra situação que já tem canônico é amarelo

### 5. CTAs
- [ ] Sentence-case (não caps lock)
- [ ] Verbo no infinitivo
- [ ] 2-4 palavras
- [ ] Variant accent só pra 1 CTA principal por section

### 6. Sparkles & ícones
- [ ] Sem Sparkles (✨ ou ícone)
- [ ] Lucide stroke 1.5-2px · currentColor
- [ ] Ícone navy default (sem gold)

### 7. Surfaces & glass
- [ ] Glass quando aplicável, sempre pela receita (`--via-glass-*` · `-webkit-backdrop-filter` antes do `backdrop-filter`), nunca número solto
- [ ] Atmospheric mesh em hero/featured cards
- [ ] Não usar glass em dashboard denso ou tabela de dados

### 8. Hover signatures
- [ ] Hover = o elemento sobe e a luz aumenta (sombra `--via-glass-shadow-lift` / atmosfera mais presente) · zero barra lateral (banida nos 3 mecanismos)
- [ ] Lift `translateY(-1px/-2px/-3px)` em cards
- [ ] Gap animation em text links

### 9. Logo
- [ ] Logo correta por contexto (lockup por padrão · monograma sozinho só em espaço mínimo · nunca wordmark solto · app icon em profile · Leaders AI em material de evento · e-mail com `lockup-navy.png`, nunca SVG)
- [ ] Clear space respeitado (X/2 monogram · 1X wordmark)
- [ ] Tamanho mínimo (16px monogram · 96px wordmark)
- [ ] Cor correta por surface (navy em light · white em dark · scrim em foto)
- [ ] Sem `filter:invert()` · sempre arquivo dedicado

### 10. Tabelas
- [ ] Se sortable/filterable → usa `<DataTable>` da library
- [ ] Scroll horizontal em viewport <980px com mask fade
- [ ] Cells de pill com `white-space: nowrap`

### 11. Status indicators
- [ ] Sem semáforo verde/vermelho em pills genéricas
- [ ] Live broadcast em minúsculas sem exclamação ("ao vivo"), não caps lock "AO VIVO"
- [ ] Eyebrows uppercase mono com `--via-ls-label` (0.18em)

### 12. Princípios de cobertura
- [ ] Bate com a página de referência mais próxima (cite qual)
- [ ] Voz alinhada com contexto (transacional vs editorial vs comercial)
- [ ] Material de evento usa Leaders AI mark (não monogram VIA principal) · arquivo branco no fundo escuro, navy no fundo claro (sem faixa navy só pra segurar a logo)

## Formato de resposta

Reporte em 3 partes:

### 1. Pontos VERDES (passou)
Liste o que está dentro do padrão · 1 linha cada.

### 2. Pontos AMARELOS (atenção)
O que está borderline · explique por que · sugira ajuste opcional.

### 3. Pontos VERMELHOS (corrigir)
O que viola padrão · cite a regra · sugira correção concreta · cite a página de referência canônica.

## Exemplo de output

```
Auditoria · social post LinkedIn pessoal

✓ Verdes
  · Voz editorial 1ª pessoa correta · gancho com número
  · Fundo claro (light-first) · paleta restrita respeitada · sem gold
  · Sem emoji decorativo · sem clichê IA

⚠ Amarelos
  · CTA "Saiba mais aqui →" tem 3 palavras + arrow · enxuto seria "Ver case"
  · Headline com 8 palavras · poderia comprimir pra 5-6

✗ Vermelhos
  · Pill "AO VIVO!" usa caps lock + exclamação · trocar pra
    "ao vivo" em minúsculas, sem exclamação. Ver /foundations/voice-extended live pill rule.
  · Logo monogram dimensionado em 12px no rodapé · abaixo do mínimo 16px.
    Ver /foundations/logo-usage sizing canônico.
```

## Reference

Quando reportar violação, sempre cite a página canônica:
- `/foundations/philosophy` · 6 regras não-negociáveis
- `/foundations/voice-extended` · 9 contextos de voz
- `/guidelines/microcopy` · textos canônicos de interface (espelho: `microcopy.md` na skill)
- `/foundations/logo-usage` · sizes + clear space + surface
- `/foundations/color` · paleta restrita
- `/patterns/email-coverage` · email coverage 13
- `/patterns/social-coverage` · social coverage 18
- `/patterns/landing-elements` · landing patterns
- `/patterns/paid-ads` · paid ads patterns
- `/patterns/commercial` · sales material
- `/patterns/editorial-content` · content formats
- `/patterns/event-collateral` · event guidelines

## Output

Reporte com cores semânticas (✓ verde · ⚠ amarelo · ✗ vermelho) e cite a regra + página canônica em cada violação. Termine com "score" geral · se houver vermelho, recomenda refazer a peça com as correções.
