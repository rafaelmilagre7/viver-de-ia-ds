#!/usr/bin/env node
/**
 * build-kit.mjs
 *
 * Gera dist/kit/ · pacote universal pra IAs externas (Claude.ai, ChatGPT,
 * Cursor, Lovable, v0) que aceitam upload de arquivos.
 *
 * Pra empacotar em ZIP depois: cd dist && zip -r viver-de-ia-kit.zip kit/
 *
 * Conteúdo:
 *   /                           README
 *   /system-prompt.md           prompt geral
 *   /system-prompts/            sub-prompts por contexto
 *   /tokens/                    tokens.json + tokens.css + style.css
 *   /logos/                     logo oficial em SVG + PNGs renomeados
 *   /examples/                  HTML specimens prontos
 *
 * Run: bun run build:kit
 */
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { parseTokens } from './parse-tokens.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'dist/kit');

// Limpa output dir
if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
mkdirSync(resolve(out, 'system-prompts'), { recursive: true });
mkdirSync(resolve(out, 'tokens'), { recursive: true });
mkdirSync(resolve(out, 'logos'), { recursive: true });
mkdirSync(resolve(out, 'fonts'), { recursive: true });
mkdirSync(resolve(out, 'examples'), { recursive: true });

// ---------- 1. README ----------
writeFileSync(resolve(out, 'README.md'), `# Viver de IA · design kit pra IAs externas

Pacote pra colar em **Claude.ai · ChatGPT · Cursor · Lovable · v0 · qualquer outra IA**
que aceite upload de arquivos ou ZIP.

## Como usar

### 1. Em Claude.ai / ChatGPT (aceita upload)
1. Abre chat novo
2. Anexa este ZIP inteiro (ou pasta descompactada)
3. Diz: "Use este design system para gerar o que eu pedir."
4. Pede o que quiser ("crie um email de welcome", "monta um post pra LinkedIn", etc.)

### 2. Em Lovable / v0 / Cursor (system prompt)
1. Cola o conteúdo de \`lovable-system-prompt.md\` no campo de Knowledge / custom instructions
2. Pede o que quiser
3. A IA vai seguir as regras do design system automaticamente

### 3. Em Codex (OpenAI) e agentes que leem AGENTS.md
1. Copia \`AGENTS.md\` deste kit pra RAIZ do projeto (o Codex lê sozinho, sem prompt)
2. Copia \`tokens/tokens.css\` pra \`src/styles/via-tokens.css\` e importa no entrypoint
3. Pede o que quiser — vale também pra qualquer agente que siga a convenção AGENTS.md

### 4. Em IDE com Claude Code instalado
Use o **plugin completo** com comandos slash em vez deste ZIP:
\`\`\`
git clone https://github.com/rafaelmilagre7/viver-de-ia-ds.git
ln -s viver-de-ia-ds/plugins/viver-de-ia ~/.claude/plugins/
\`\`\`

## O que tem no kit

\`\`\`
/
├── README.md                ← este arquivo
├── system-prompt.md         ← prompt geral · cola em qualquer LLM
├── lovable-system-prompt.md ← denso · Knowledge do Lovable / custom instructions
├── AGENTS.md                ← pro Codex · copia pra raiz do projeto (lê sozinho)
├── microcopy.md             ← frases canônicas de produto (erro, vazio, confirmação, botão…)
├── fatos.md                 ← números do negócio que podem ir em peça (lidos do site oficial · versão viva: viver-de-ia-ds.vercel.app/fatos.md)
├── system-prompts/          ← sub-prompts por contexto
│   ├── email.md
│   ├── social.md
│   ├── landing.md
│   ├── brand.md
│   ├── deck.md
│   └── paid.md
├── tokens/                  ← design tokens
│   ├── tokens.json          ← machine-readable
│   ├── tokens.css           ← CSS variables
│   └── style.css            ← CSS completo da library (quando lib foi buildada)
├── logos/                   ← logo oficial em vetor (use estes) + PNGs legados
│   ├── lockup-navy.svg      ← logo completo · fundo claro
│   ├── lockup-white.svg     ← logo completo · fundo escuro
│   ├── monogram-navy.svg    ← só o monograma (favicon, canto de slide)
│   ├── monogram-white.svg
│   ├── lockup-navy.png      ← só pra E-MAIL (720px · o Gmail não renderiza SVG)
│   ├── lockup-white.png
│   ├── leaders-ai-conference-logo.png       ← Leaders AI · fundo escuro
│   ├── leaders-ai-conference-logo-navy.png  ← Leaders AI · fundo claro
│   ├── monogram-navy.png
│   ├── monogram-white.png
│   ├── wordmark-navy.png
│   ├── wordmark-white.png
│   ├── app-icon.png
│   └── ...
├── fonts/                   ← Geist self-hosted (OFL/MIT)
│   ├── fonts.css            ← @font-face pronto · @import e usa
│   ├── Geist-Variable.woff2          (100–900 · só reto · itálico é banido)
│   ├── GeistMono-Variable.woff2
│   └── LICENSE.txt
└── examples/                ← HTML specimens prontos
    ├── email-welcome.html
    └── social-ig-post.html
\`\`\`

## Princípios não-negociáveis (resumo · system-prompt.md tem completo)

1. **Paleta restrita** · branco · cinza · navy · preto · coral só destrutivo · sem gold/amarelo
2. **Pill canônica** · 11px · 500 · letter-spacing -0.004em · nowrap · sem dot · sem caps lock
3. **Geist single family** · ZERO itálico (\`<em>\` reto · ênfase = peso + cor) · letterspacing negativo em corpo
4. **Voz editorial** · operador-experiente · número ou citação · sem clichê IA · números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos: leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual); sem acesso à internet, use o \`fatos.md\` deste kit e cite a data dele · use a frase pronta · o que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu · fora isso, nunca invente preço, nº de alunos/vagas, garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local (pergunte ou use \`R$ [valor]\` / \`[N] alunos\` / \`[condições da garantia]\` / \`[prazo de devolução]\` / \`[data]\` / \`[local]\`)
5. **Sparkles banido** · usar Compass · Award · Crown · Layers · MessageCircle
6. **Light-first** · fundo claro (branco/off-white) é o padrão de tudo · navy é cor da marca, não do fundo
7. **Logo = lockup** · monograma + wordmark SEMPRE juntos (\`logos/lockup-*.svg\` em vetor, nunca redesenhar nem usar o wordmark solto) · monograma sozinho só em espaço mínimo (favicon, app/profile icon, canto de slide) · versão navy sobre claro, branca só sobre navy · e-mail usa \`logos/lockup-navy.png\` (o Gmail não renderiza SVG)

## Reference site canônico

Quando em dúvida sobre como algo deve parecer, consulte:
**https://github.com/rafaelmilagre7/viver-de-ia-ds** · quase 100 rotas vivas · 46 componentes de UI + ThemeProvider · dark mode + WCAG AA completos.

## Suporte

Issues / dúvidas: https://github.com/rafaelmilagre7/viver-de-ia-ds/issues
`);

// ---------- 2. Tokens ----------
const tokensCss = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
writeFileSync(resolve(out, 'tokens/tokens.css'), tokensCss);

// Camada de acabamento (classes utilitarias) — serve pra HTML cru gerado por IA
const surfacesCss = readFileSync(resolve(root, 'src/styles/surfaces.css'), 'utf8');
writeFileSync(resolve(out, 'tokens/surfaces.css'), surfacesCss);

// Camada de DADOS (tabela/numero/metrica) — faz qualquer <table> cru nascer no padrao
const dataCss = readFileSync(resolve(root, 'src/styles/data.css'), 'utf8');
writeFileSync(resolve(out, 'tokens/data.css'), dataCss);

// Gera tokens.json (parse de tokens.css)
const tokens = parseTokens(tokensCss);
writeFileSync(resolve(out, 'tokens/tokens.json'), JSON.stringify({
  $version: JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).version,
  // sem timestamp de build: mantém o artefato determinístico (a data fica no git).
  $source: 'src/styles/tokens.css',
  tokens,
}, null, 2));

// Copia style.css se já tiver sido buildada
const styleCss = resolve(root, 'dist/lib/style.css');
if (existsSync(styleCss)) {
  copyFileSync(styleCss, resolve(out, 'tokens/style.css'));
}

console.log(`  wrote tokens/ (${tokens.length} tokens · ${existsSync(styleCss) ? 'incl style.css' : 'no style.css · run build:lib first'})`);

// ---------- 3. Logos ----------
const logoSrc = resolve(root, 'src/assets/logos');
const logoMap = {
  'lockup-navy.svg': 'lockup-navy.svg',
  'lockup-navy.png': 'lockup-navy.png',
  'lockup-white.png': 'lockup-white.png',
  'leaders-ai-conference-logo-navy.png': 'leaders-ai-conference-logo-navy.png',
  'lockup-white.svg': 'lockup-white.svg',
  'monogram-navy.svg': 'monogram-navy.svg',
  'monogram-white.svg': 'monogram-white.svg',
  'VIA_monogram_hq.png': 'monogram-navy.png',
  'VIA_monogram_hq_white.png': 'monogram-white.png',
  'VIVER_DE_IA_black.png': 'wordmark-navy.png',
  'VIVER_DE_IA_white.png': 'wordmark-white.png',
  'VIA_app_icon.png': 'app-icon.png',
  'VIA_app_icon_white.png': 'app-icon-white.png',
  'icon_black.png': 'favicon-black.png',
  'icon_white.png': 'favicon-white.png',
  'leaders-ai-conference-logo.png': 'leaders-ai-conference-logo.png',
  'VIA_black.png': 'mark-black.png',
  'VIA_white.png': 'mark-white.png',
};
let copiedLogos = 0;
for (const [src, dst] of Object.entries(logoMap)) {
  const srcPath = resolve(logoSrc, src);
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, resolve(out, `logos/${dst}`));
    copiedLogos++;
  }
}
console.log(`  wrote logos/ (${copiedLogos} files)`);

// ---------- 3b. Fonts (Geist · self-hosted · OFL/MIT) ----------
const fontSrc = resolve(root, 'src/assets/fonts');
const fontFiles = [
  'Geist-Variable.woff2',
  'GeistMono-Variable.woff2',
  'LICENSE.txt',
];
let copiedFonts = 0;
for (const f of fontFiles) {
  const srcPath = resolve(fontSrc, f);
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, resolve(out, `fonts/${f}`));
    copiedFonts++;
  }
}
// fonts.css · @font-face self-hosted (variável · 100-900 · só normal: itálico é banido na marca)
const fontsCss = `/* Geist · self-hosted · variável (100–900) · só normal (itálico é banido na marca)
   Geist é open-source (SIL OFL 1.1 / MIT) da Vercel — ver LICENSE.txt.
   Importe este arquivo OU use o CDN do Google Fonts (ver system-prompt.md).
   Casa com os tokens --via-font ('Geist') e --via-font-mono ('Geist Mono'). */
@font-face {
  font-family: 'Geist';
  src: url('./Geist-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('./GeistMono-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
`;
writeFileSync(resolve(out, 'fonts/fonts.css'), fontsCss);
console.log(`  wrote fonts/ (${copiedFonts} woff2/license + fonts.css)`);

// ---------- 4. System prompts ----------
const promptGeneral = readFileSync(resolve(root, 'plugins/viver-de-ia/skills/viver-de-ia-design/SKILL.md'), 'utf8');
writeFileSync(resolve(out, 'system-prompt.md'), promptGeneral);
copyFileSync(resolve(root, 'plugins/viver-de-ia/skills/viver-de-ia-design/microcopy.md'), resolve(out, 'microcopy.md'));
copyFileSync(resolve(root, 'plugins/viver-de-ia/skills/viver-de-ia-design/fatos.md'), resolve(out, 'fatos.md'));

// Versão denso pra Lovable (cola direto em custom instructions)
const lovablePath = resolve(root, 'docs/system-prompt.md');
if (existsSync(lovablePath)) {
  copyFileSync(lovablePath, resolve(out, 'lovable-system-prompt.md'));

  // AGENTS.md pronto pro Codex (OpenAI) e qualquer agente que lê a convenção:
  // mesmo prompt denso, com preâmbulo de repo em vez de "cole em custom
  // instructions". Uso: copiar pra RAIZ do projeto — o agente lê sozinho.
  const dense = readFileSync(lovablePath, 'utf8');
  const marker = '\n---\n';
  const body = dense.includes(marker) ? dense.slice(dense.indexOf(marker) + marker.length) : dense;
  writeFileSync(resolve(out, 'AGENTS.md'), `# AGENTS.md · Viver de IA Design System

Este projeto segue o **Viver de IA Design System**. Aplique as regras abaixo em TUDO que gerar aqui (UI, email, copy, assets) — sem precisar perguntar.

Setup obrigatório do projeto (se ainda não existir): crie \`src/styles/via-tokens.css\` com o conteúdo de \`tokens/tokens.css\` deste kit e importe no entrypoint; carregue as fontes Geist + Geist Mono (Google Fonts). Logos oficiais em vetor em \`logos/\` (\`lockup-navy.svg\`, \`lockup-white.svg\`, \`monogram-*.svg\`) — nunca recriar · em e-mail use \`lockup-navy.png\` (o Gmail não renderiza SVG). Números do negócio (cases, soluções, setores, preços, planos, mentoria, garantia, liderança) só da ficha de fatos — leia https://viver-de-ia-ds.vercel.app/fatos.md (sempre atual); sem acesso à internet, use o \`fatos.md\` deste kit e cite a data dele. Use a frase pronta. O que não está na ficha (números de casos individuais, conversas da Nina, alunos formados, vagas, datas, locais, depoimentos) só com dado fornecido por quem pediu — senão placeholder. Fora isso, nunca invente preço, nº de alunos/vagas, garantia, prazo de devolução, termos de contrato, condição de pagamento, política, data ou local de evento — use placeholder (\`R$ [valor]\`, \`[N] vagas\`, \`[condições da garantia]\`, \`[prazo de devolução]\`, \`[data]\`, \`[local]\`) ou pergunte. Referência visual viva: https://viver-de-ia-ds.vercel.app

${body}`);
}

const subPrompts = ['via-email', 'via-social', 'via-landing', 'via-brand', 'via-deck', 'via-paid'];
let copiedPrompts = 0;
for (const sp of subPrompts) {
  const cmdPath = resolve(root, `plugins/viver-de-ia/commands/${sp}.md`);
  if (existsSync(cmdPath)) {
    const name = sp.replace('via-', '');
    copyFileSync(cmdPath, resolve(out, `system-prompts/${name}.md`));
    copiedPrompts++;
  }
}
console.log(`  wrote system-prompt.md + system-prompts/ (${copiedPrompts} files)`);

// ---------- 5. Examples ----------
const examples = {
  'email-welcome.html': `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>Email · welcome · Viver de IA</title>
<style>
  body { margin:0; background:#F0F2F5; font-family:'Geist',system-ui,sans-serif; padding:24px; }
  .email { max-width:600px; margin:0 auto; background:#fff; border:0.5px solid rgba(10,31,59,0.08); border-radius:12px; overflow:hidden; }
  .hdr { padding:22px 32px; border-bottom:0.5px solid rgba(10,31,59,0.08); }
  .hdr img { height:18px; width:auto; }
  .body { padding:28px 32px; font-size:15px; line-height:1.65; color:#344054; }
  .body strong { color:#0A1F3B; font-weight:500; }
  .cta { display:inline-flex; align-items:center; gap:8px; padding:12px 22px; background:linear-gradient(180deg,#0A1F3B,#02162A); color:#fff; border-radius:999px; text-decoration:none; font-weight:500; margin:14px 0; }
  ol { padding-left:24px; }
  ol li { margin-bottom:10px; }
</style>
</head>
<body>
  <article class="email">
    <header class="hdr">
      <img src="../logos/lockup-navy.png" alt="Viver de IA" />
    </header>
    <div class="body">
      <p>Oi <strong>{aluno_first_name}</strong>,</p>
      <p>seu acesso à plataforma tá liberado · plano <strong>{plano}</strong>.</p>
      <ol>
        <li><strong>Acessa a plataforma</strong> app.viverdeia.ai · login com esse email</li>
        <li><strong>Faz a trilha de onboarding</strong> · contextualiza o método</li>
        <li><strong>Começa pelas 3 soluções</strong> que você escolheu na adesão</li>
      </ol>
      <p>se travar em algo, responde esse email.</p>
      <a class="cta" href="#">Acessar a plataforma</a>
      <p style="margin-top:24px;padding-top:14px;border-top:0.5px solid rgba(10,31,59,0.08);font-size:13.5px;">
        <!-- assinatura humana real · liderança oficial na ficha de fatos (fatos.md) -->
        <strong>[nome]</strong> · [cargo]
      </p>
    </div>
  </article>
</body>
</html>`,

  'social-ig-post.html': `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>Instagram post · Viver de IA</title>
<style>
  body { margin:0; background:#F0F2F5; padding:24px; display:flex; justify-content:center; }
  .post { width:480px; aspect-ratio:1/1; background:radial-gradient(ellipse 80% 60% at 0% 0%,rgba(10,31,59,0.06),transparent 60%),linear-gradient(180deg,#FFFFFF,#F5F7FA); padding:48px; color:#0A1F3B; display:flex; flex-direction:column; justify-content:center; position:relative; border-radius:12px; overflow:hidden; font-family:'Geist',sans-serif; }
  .eyebrow { font-family:'Geist Mono',monospace; font-size:13px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#4F596B; margin-bottom:22px; }
  h2 { font-size:72px; font-weight:500; line-height:1.02; letter-spacing:-0.025em; margin:0 0 14px; }
  em { font-style:normal; font-weight:400; color:#5E6B82; }
  p { font-size:14px; color:#4F596B; margin:0; max-width:320px; line-height:1.5; }
  img { position:absolute; bottom:30px; left:48px; height:16px; width:auto; }
</style>
</head>
<body>
  <div class="post">
    <!-- número da ficha de fatos (fatos.md · 30/out/2026) · confira o valor atual antes de publicar -->
    <span class="eyebrow">viver de ia · cases</span>
    <h2><em>521</em><br />cases reais.</h2>
    <p>de implementação de IA em empresas brasileiras</p>
    <img src="../logos/lockup-navy.svg" alt="Viver de IA" />
  </div>
</body>
</html>`,

  'landing-evergreen.html': `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>Landing evergreen · Viver de IA</title>
<style>
  body { margin:0; background:#fff; font-family:'Geist',system-ui,sans-serif; color:#344054; }
  .hero { padding:80px 40px; background:radial-gradient(ellipse 80% 60% at 15% 0%,rgba(10,31,59,0.06),transparent 60%),linear-gradient(180deg,#FFFFFF,#F7F8FA); color:#0A1F3B; text-align:center; }
  .eyebrow { font-family:'Geist Mono',monospace; font-size:13px; letter-spacing:0.18em; text-transform:uppercase; color:#5F6981; margin-bottom:20px; }
  h1 { font-size:60px; font-weight:500; line-height:1.05; letter-spacing:-0.025em; margin:0 0 16px; }
  h1 em { font-style:normal; font-weight:400; color:#5E6B82; }
  .lede { font-size:18px; color:#4F596B; max-width:600px; margin:0 auto 32px; line-height:1.55; }
  .cta { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; background:#0A1F3B; background-image:linear-gradient(180deg,#0A1F3B,#02162A); color:#fff; border-radius:999px; text-decoration:none; font-weight:500; }
  .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; padding:48px 40px; background:#F7F8FA; max-width:1200px; margin:0 auto; }
  .stat strong { display:block; font-size:32px; font-weight:500; color:#0A1F3B; font-family:'Geist Mono',monospace; }
  .stat em { display:block; font-style:normal; font-size:12px; color:#6B7891; margin-top:4px; }
</style>
</head>
<body>
  <section class="hero">
    <span class="eyebrow">formação técnico-operativa em IA</span>
    <h1>Viver de IA, <em>não de prompt</em>.</h1>
    <p class="lede">521 cases reais de implementação de IA em empresas brasileiras · 157 soluções de IA prontas para usar</p>
    <a class="cta" href="#">Conhecer o método</a>
  </section>
  <!-- números da ficha de fatos (fatos.md · 30/out/2026) · confira o valor atual antes de publicar · R$ [valor] só com dado fornecido -->
  <section class="stats">
    <div class="stat"><strong>521</strong><em>cases reais de implementação de IA</em></div>
    <div class="stat"><strong>157</strong><em>soluções de IA prontas para usar</em></div>
    <div class="stat"><strong>29</strong><em>setores já transformados com IA</em></div>
    <div class="stat"><strong>R$ [valor]</strong><em>destravado em [N] meses</em></div>
  </section>
</body>
</html>`,
};

for (const [filename, html] of Object.entries(examples)) {
  writeFileSync(resolve(out, `examples/${filename}`), html);
}
console.log(`  wrote examples/ (${Object.keys(examples).length} files)`);

// Emails REAIS (react-email · à prova de bala · gerados por build:emails) → kit/emails/
// Também sobrescreve o specimen examples/email-welcome.html com o HTML de verdade.
const emailsDir = resolve(root, 'public/emails');
if (existsSync(emailsDir)) {
  mkdirSync(resolve(out, 'emails'), { recursive: true });
  const emailFiles = readdirSync(emailsDir).filter((f) => /\.(html|txt|json)$/.test(f));
  for (const f of emailFiles) copyFileSync(resolve(emailsDir, f), resolve(out, `emails/${f}`));
  const welcome = resolve(emailsDir, 'welcome.html');
  if (existsSync(welcome)) copyFileSync(welcome, resolve(out, 'examples/email-welcome.html'));
  console.log(`  wrote emails/ (${emailFiles.length} arquivos · HTML real à prova de bala)`);
} else {
  console.log('  ⚠ public/emails/ ausente — rode build:emails antes (kit não tem os emails reais)');
}

console.log(`\nKit pronto em dist/kit/`);

// Empacota o .zip direto em public/ (servido em /viver-de-ia-kit.zip) — sem passo manual.
// Isso garante que `bun run build:kit` já entrega o kit pronto pro deploy, sem drift.
const distDir = resolve(root, 'dist');
const publicZip = resolve(root, 'public/viver-de-ia-kit.zip');
try {
  // Zip 100% determinístico cross-OS via Python zipfile · STORED (sem zlib → sem
  // variância de compressão) · ordem sortada · date_time fixo · create_system/attr
  // fixos. O `zip` CLI gravava bytes de header dependentes do SO (macOS ≠ Linux) →
  // o CI recommitava o .zip a cada push mesmo com conteúdo idêntico. STORED + Python
  // (posix igual nos dois) dá os MESMOS bytes em qualquer máquina. Custo: ~+360KB.
  const pyZip = [
    'import os, zipfile',
    'base = os.environ["VIA_DIST"]; out = os.environ["VIA_OUT"]',
    'items = []',
    'for root, dirs, fs in os.walk(os.path.join(base, "kit")):',
    '    for f in fs:',
    '        full = os.path.join(root, f)',
    '        items.append((full, os.path.relpath(full, base)))',
    'items.sort(key=lambda x: x[1])',
    'z = zipfile.ZipFile(out, "w", zipfile.ZIP_STORED)',
    'for full, arc in items:',
    '    zi = zipfile.ZipInfo(arc, date_time=(2000, 1, 1, 0, 0, 0))',
    '    zi.create_system = 3',
    '    zi.external_attr = 0o644 << 16',
    '    with open(full, "rb") as fh:',
    '        z.writestr(zi, fh.read())',
    'z.close()',
  ].join('\n');
  execSync('python3 -', {
    input: pyZip,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, VIA_DIST: distDir, VIA_OUT: publicZip },
  });
  const kb = Math.round(readFileSync(publicZip).length / 1024);
  console.log(`  wrote public/viver-de-ia-kit.zip (${kb} KB)`);
} catch (err) {
  console.error(`  ⚠ falha ao zipar o kit: ${err.message}`);
  process.exitCode = 1;
}
console.log(`Anexa o .zip em Claude.ai / ChatGPT / Cursor. Ou cola system-prompt.md em Lovable.`);
