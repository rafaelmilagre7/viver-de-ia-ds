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
 *   /logos/                     logos PNG renomeados
 *   /examples/                  HTML specimens prontos
 *
 * Run: bun run build:kit
 */
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

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
1. Cola o conteúdo de \`system-prompt.md\` no campo de system prompt ou custom instructions
2. Pede o que quiser
3. A IA vai seguir as regras do design system automaticamente

### 3. Em IDE com Claude Code instalado
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
├── logos/                   ← assets de marca PNG
│   ├── monogram-navy.png
│   ├── monogram-white.png
│   ├── wordmark-navy.png
│   ├── wordmark-white.png
│   ├── app-icon.png
│   ├── leaders-ai-conference.png
│   └── ...
├── fonts/                   ← Geist self-hosted (OFL/MIT)
│   ├── fonts.css            ← @font-face pronto · @import e usa
│   ├── Geist-Variable.woff2          (100–900)
│   ├── Geist-Italic-Variable.woff2
│   ├── GeistMono-Variable.woff2
│   ├── GeistMono-Italic-Variable.woff2
│   └── LICENSE.txt
└── examples/                ← HTML specimens prontos
    ├── email-welcome.html
    └── social-ig-post.html
\`\`\`

## Princípios não-negociáveis (resumo · system-prompt.md tem completo)

1. **Paleta restrita** · branco · cinza · navy · preto · coral só destrutivo · sem gold/amarelo
2. **Pill canônica** · 11px · 500 · letter-spacing -0.004em · nowrap · sem dot · sem caps lock
3. **Geist single family** · italic em ênfase · letterspacing negativo em corpo
4. **Voz editorial** · operador-experiente · número ou citação · sem clichê IA
5. **Sparkles banido** · usar Compass · Award · Crown · Layers · MessageCircle
6. **Logo correta por contexto** · monogram pequeno · wordmark grande · app icon em profile

## Reference site canônico

Quando em dúvida sobre como algo deve parecer, consulte:
**https://github.com/rafaelmilagre7/viver-de-ia-ds** · 107 rotas vivas · 47 componentes · dark mode + WCAG AA completos.

## Suporte

Issues / dúvidas: https://github.com/rafaelmilagre7/viver-de-ia-ds/issues
`);

// ---------- 2. Tokens ----------
const tokensCss = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
writeFileSync(resolve(out, 'tokens/tokens.css'), tokensCss);

// Gera tokens.json (parse de tokens.css)
const cssStripped = tokensCss.replace(/\/\*[\s\S]*?\*\//g, '');
const tokenDecl = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
const tokenMap = new Map();
for (const match of cssStripped.matchAll(tokenDecl)) {
  tokenMap.set(match[1].trim(), match[2].trim());
}
const cat = (n, v) => {
  const ln = n.toLowerCase(); const lv = v.toLowerCase();
  if (ln.includes('font') || ln.includes('display') || ln.includes('mono')) return 'font';
  if (ln.includes('radius')) return 'radius';
  if (ln.includes('shadow')) return 'shadow';
  if (ln.includes('space') || ln.includes('gap') || ln.includes('padding')) return 'spacing';
  if (ln.includes('motion') || ln.includes('ease') || ln.includes('duration') || ln === '--via-t') return 'motion';
  if (ln.includes('noise') || ln.includes('mesh') || ln.includes('bg-')) return 'surface';
  if (/^#[0-9a-f]{3,8}$/i.test(v) || lv.startsWith('rgb') || lv.startsWith('hsl') || lv.startsWith('var(--via-')) return 'color';
  return 'other';
};
const tokens = [...tokenMap.entries()].map(([full, value]) => ({
  name: full.replace(/^--/, ''),
  css: full,
  value,
  category: cat(full, value),
}));
tokens.sort((a, b) => a.category === b.category ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category));
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
  'VIA_monogram_hq.png': 'monogram-navy.png',
  'VIA_monogram_hq_white.png': 'monogram-white.png',
  'VIVER_DE_IA_black.png': 'wordmark-navy.png',
  'VIVER_DE_IA_white.png': 'wordmark-white.png',
  'VIA_app_icon.png': 'app-icon.png',
  'VIA_app_icon_white.png': 'app-icon-white.png',
  'icon_black.png': 'favicon-black.png',
  'icon_white.png': 'favicon-white.png',
  'leaders-ai-conference-logo.png': 'leaders-ai-conference.png',
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
  'Geist-Italic-Variable.woff2',
  'GeistMono-Variable.woff2',
  'GeistMono-Italic-Variable.woff2',
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
// fonts.css · @font-face self-hosted (variável · 100-900 · normal + italic)
const fontsCss = `/* Geist · self-hosted · variável (100–900) · normal + italic
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
  font-family: 'Geist';
  src: url('./Geist-Italic-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('./GeistMono-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('./GeistMono-Italic-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
`;
writeFileSync(resolve(out, 'fonts/fonts.css'), fontsCss);
console.log(`  wrote fonts/ (${copiedFonts} woff2/license + fonts.css)`);

// ---------- 4. System prompts ----------
const promptGeneral = readFileSync(resolve(root, 'plugins/viver-de-ia/skills/viver-de-ia-design/SKILL.md'), 'utf8');
writeFileSync(resolve(out, 'system-prompt.md'), promptGeneral);

// Versão denso pra Lovable (cola direto em custom instructions)
const lovablePath = resolve(root, 'docs/system-prompt.md');
if (existsSync(lovablePath)) {
  copyFileSync(lovablePath, resolve(out, 'lovable-system-prompt.md'));
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
  .hdr img { width:100px; }
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
      <img src="../logos/wordmark-navy.png" alt="Viver de IA" />
    </header>
    <div class="body">
      <p>Oi <strong>{aluno_first_name}</strong>,</p>
      <p>tua vaga na turma <strong>{turma_codename}</strong> tá confirmada. começa em <strong>14 dias</strong>.</p>
      <ol>
        <li><strong>Acessa a plataforma</strong> app.viverdeia.ai · login com esse email</li>
        <li><strong>Assiste o intro de 12min</strong> · contextualiza o método</li>
        <li><strong>Marca a primeira mentoria 1:1</strong> · 30min pra alinhar caso real teu</li>
      </ol>
      <p>não tem prazo apertado nem nada · só ajuda a chegar na semana 1 com contexto.</p>
      <a class="cta" href="#">Acessar a plataforma</a>
      <p style="margin-top:24px;padding-top:14px;border-top:0.5px solid rgba(10,31,59,0.08);font-size:13.5px;">
        <strong>Caio Ribeiro</strong> · fundador
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
  .post { width:480px; aspect-ratio:1/1; background:linear-gradient(135deg,#0A1F3B,#02162A); padding:48px; color:#fff; display:flex; flex-direction:column; justify-content:center; position:relative; border-radius:12px; overflow:hidden; font-family:'Geist',sans-serif; }
  .eyebrow { font-size:13px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-bottom:22px; }
  h2 { font-size:72px; font-weight:500; line-height:1.02; letter-spacing:-0.025em; margin:0 0 14px; }
  em { font-style:italic; font-weight:400; color:rgba(255,255,255,0.78); }
  p { font-size:14px; color:rgba(255,255,255,0.6); margin:0; max-width:320px; line-height:1.5; }
  img { position:absolute; bottom:30px; left:48px; width:38px; opacity:0.7; }
</style>
</head>
<body>
  <div class="post">
    <span class="eyebrow">turma 2026.2 · 45 dias dentro</span>
    <h2>+<em>11.920</em><br />conversas/mês.</h2>
    <p>operação real · auditada · método codificado em 18 aulas</p>
    <img src="../logos/monogram-white.png" alt="" />
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
  .hero { padding:80px 40px; background:linear-gradient(135deg,#0A1F3B,#02162A); color:#fff; text-align:center; }
  .eyebrow { font-size:13px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.65); margin-bottom:20px; }
  h1 { font-size:60px; font-weight:500; line-height:1.05; letter-spacing:-0.025em; margin:0 0 16px; }
  h1 em { font-style:italic; font-weight:400; color:rgba(255,255,255,0.75); }
  .lede { font-size:18px; color:rgba(255,255,255,0.7); max-width:600px; margin:0 auto 32px; line-height:1.55; }
  .cta { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; background:#fff; color:#0A1F3B; border-radius:999px; text-decoration:none; font-weight:500; }
  .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; padding:48px 40px; background:#F7F8FA; max-width:1200px; margin:0 auto; }
  .stat strong { display:block; font-size:32px; font-weight:500; color:#0A1F3B; font-family:'Geist Mono',monospace; }
  .stat em { display:block; font-style:normal; font-size:12px; color:#6B7891; margin-top:4px; }
</style>
</head>
<body>
  <section class="hero">
    <span class="eyebrow">formação técnico-operativa em IA</span>
    <h1>Viver de IA, <em>não de prompt</em>.</h1>
    <p class="lede">220 operadores formados · R$ 1,8M destravado em 12 meses · método codificado em 18 aulas</p>
    <a class="cta" href="#">Conhecer o método</a>
  </section>
  <section class="stats">
    <div class="stat"><strong>+220</strong><em>operadores formados</em></div>
    <div class="stat"><strong>R$ 1,8M</strong><em>destravado em 12 meses</em></div>
    <div class="stat"><strong>11.920</strong><em>conversas/mês via Nina</em></div>
    <div class="stat"><strong>90 dias</strong><em>até agente em produção</em></div>
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
