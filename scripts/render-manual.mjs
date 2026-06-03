// Converte docs/manual-design-system.md -> HTML no DS da marca -> PDF (Chromium/Playwright).
// Uso: node scripts/render-manual.mjs
import { chromium } from 'playwright';
import { marked } from 'marked';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const mdPath = path.join(root, 'docs', 'manual-design-system.md');
const outDir = path.join(root, 'public', 'manual');
mkdirSync(outDir, { recursive: true });
copyFileSync(path.join(root, 'public', 'logos', 'monogram-white.png'), path.join(outDir, 'monogram-white.png'));

marked.setOptions({ gfm: true });
const bodyHtml = marked.parse(readFileSync(mdPath, 'utf8'));

const css = `
  :root { --navy:#0A1F3B; --navy-deep:#02162A; --navy-darker:#010B1A; --navy-lift:#16335C;
    --ink:#0A1F3B; --body:#344056; --muted:#647088; --faint:#9AA5B8; --line:#E4E8EF; --line-soft:#EEF1F6; --tint:#F6F8FB;
    --font:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; --mono:'Geist Mono',ui-monospace,SFMono-Regular,Menlo,monospace; }
  * { box-sizing: border-box; }
  @page { size: A4; margin: 17mm 16mm 16mm; }
  @page:first { margin: 0; }
  html, body { margin: 0; padding: 0; }
  body { font-family: var(--font); color: var(--body); font-size: 10.7pt; line-height: 1.62; -webkit-font-smoothing: antialiased; }

  .cover { height: 297mm; box-sizing: border-box; padding: 30mm 24mm; color: #fff; display: flex; flex-direction: column; page-break-after: always; position: relative; overflow: hidden;
    background-color: var(--navy);
    background-image: radial-gradient(115% 80% at 100% -5%, rgba(120,160,225,0.20), transparent 52%), radial-gradient(90% 65% at -10% 105%, rgba(40,80,150,0.30), transparent 60%), linear-gradient(158deg, #0A1F3B 0%, #02162A 62%, #010B1A 100%); }
  .cover .bleed { position: absolute; top: -90px; right: -110px; width: 460px; opacity: 0.05; }
  .cover .lk { display: flex; align-items: center; gap: 11px; }
  .cover .lk img { width: 26px; }
  .cover .lk span { font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.62); font-weight: 500; }
  .cover .eg { margin: auto 0 0; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.55); font-weight: 500; }
  .cover h1.ct { font-size: 40px; line-height: 1.12; font-weight: 600; letter-spacing: -0.03em; margin: 14px 0 0; max-width: 15em; }
  .cover h1.ct em { font-style: italic; font-weight: 400; color: rgba(255,255,255,0.82); }
  .cover .cs { margin: 20px 0 0; font-size: 15px; line-height: 1.55; color: rgba(255,255,255,0.74); max-width: 30em; }
  .cover .by { margin-top: 34px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.16); font-size: 13px; color: rgba(255,255,255,0.74); }
  .cover .by strong { color: #fff; font-weight: 600; }

  main { display: block; }
  main > h1:first-child { display: none; }  /* título já está na capa */
  h1, h2, h3, h4 { color: var(--ink); letter-spacing: -0.015em; }
  h2 { font-size: 19pt; font-weight: 600; margin: 30px 0 12px; padding-top: 15px; border-top: 1px solid var(--line); page-break-after: avoid; }
  h2 + p, h2 + blockquote { page-break-before: avoid; }
  h3 { font-size: 13pt; font-weight: 600; margin: 20px 0 7px; page-break-after: avoid; }
  h4 { font-size: 11pt; font-weight: 600; margin: 16px 0 6px; }
  p { margin: 0 0 9px; }
  strong { color: var(--ink); font-weight: 600; }
  em { font-style: italic; }
  a { color: var(--navy); text-decoration: none; border-bottom: 1px solid rgba(10,31,59,0.25); word-break: break-all; }
  ul, ol { margin: 0 0 11px; padding-left: 20px; }
  li { margin: 0 0 4px; }
  li::marker { color: var(--faint); }
  ul li input[type=checkbox] { margin-right: 7px; transform: translateY(1px); }
  hr { border: 0; border-top: 1px solid var(--line); margin: 22px 0; }

  table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 9.3pt; page-break-inside: avoid; border-radius: 8px; overflow: hidden; box-shadow: 0 0 0 1px var(--line); }
  th { background: linear-gradient(160deg, var(--navy-lift), var(--navy-deep)); color: #fff; text-align: left; padding: 8px 11px; font-weight: 600; }
  td { border-bottom: 1px solid var(--line); padding: 7px 11px; vertical-align: top; }
  tr:nth-child(even) td { background: var(--tint); }
  table code { font-size: 0.86em; }

  pre { background: linear-gradient(165deg, #102a4a, #02162A); color: #E9EEF6; border: 1px solid var(--navy-deep);
    border-radius: 10px; padding: 14px 16px; margin: 12px 0; font-family: var(--mono); font-size: 8.6pt; line-height: 1.5; overflow: auto; white-space: pre-wrap; word-break: break-word; page-break-inside: avoid;
    box-shadow: 0 14px 30px -18px rgba(10,31,59,0.5); }
  code { font-family: var(--mono); background: var(--line-soft); color: var(--navy); padding: 1.5px 5px; border-radius: 4px; font-size: 0.85em; }
  pre code { background: none; color: inherit; padding: 0; font-size: 1em; }

  blockquote { border-left: 2px solid var(--navy); background: linear-gradient(180deg, #fff, var(--tint)); padding: 13px 17px; margin: 14px 0; border-radius: 0 9px 9px 0; color: #46526A;
    box-shadow: 0 12px 28px -20px rgba(10,31,59,0.2); page-break-inside: avoid; }
  blockquote p { margin: 0 0 6px; } blockquote p:last-child { margin: 0; }
  blockquote strong { color: var(--navy); }

  .docfoot { margin-top: 30px; padding-top: 14px; border-top: 1px solid var(--line); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--faint); display: flex; align-items: center; gap: 7px; }
  .docfoot img { width: 13px; opacity: 0.8; }
`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
<title>Manual de Construção — Design System de Nível Mundial</title>
<style>${css}</style></head><body>
<section class="cover">
  <img class="bleed" src="./monogram-white.png" alt="" />
  <div class="lk"><img src="./monogram-white.png" alt="Viver de IA" /><span>Viver de IA</span></div>
  <p class="eg">Manual de construção · Marca + IA</p>
  <h1 class="ct">Design System de <em>nível mundial</em>, operado por IA.</h1>
  <p class="cs">Manual replicável pra qualquer marca — todo o método e a arquitetura, com campos pra preencher e o Viver de IA como exemplo em cada parte.</p>
  <p class="by"><strong>Template aberto</strong> · cortesia Viver de IA · viverdeia.ai</p>
</section>
<main>${bodyHtml}
  <div class="docfoot"><img src="./monogram-white.png" style="filter:invert(10%) sepia(40%) saturate(1200%) hue-rotate(190deg);" alt="" />Manual de Construção de Design System · Viver de IA · template aberto</div>
</main>
</body></html>`;

const htmlPath = path.join(outDir, 'index.html');
writeFileSync(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(400);
await page.pdf({ path: path.join(outDir, 'manual-design-system.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });

const shotDir = process.env.SHOT_DIR || '/tmp/manual-shots';
mkdirSync(shotDir, { recursive: true });
const total = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total && i < 10; y += 1123) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(120);
  await page.screenshot({ path: path.join(shotDir, `s${String(i).padStart(2, '0')}.png`) });
  i++;
}
console.log('PDF gerado:', path.join(outDir, 'manual-design-system.pdf'));
console.log('scrollHeight:', total, '| screenshots:', i, '->', shotDir);
await browser.close();
