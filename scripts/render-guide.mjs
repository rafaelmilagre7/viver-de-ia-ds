// Renderiza o guia HTML (no DS da marca) para PDF de alta fidelidade via Chromium (Playwright).
// Uso: node scripts/render-guide.mjs
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'public', 'guia', 'index.html');
const pdfOut = path.join(root, 'public', 'guia', 'guia-design-system-viver-de-ia.pdf');
const shotDir = process.env.SHOT_DIR || '/tmp/guia-shots';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(400);

await page.pdf({
  path: pdfOut,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
});

mkdirSync(shotDir, { recursive: true });
const sections = await page.$$('.page');
for (let i = 0; i < sections.length; i++) {
  await sections[i].screenshot({ path: path.join(shotDir, `p${String(i + 1).padStart(2, '0')}.png`) });
}
console.log('PDF gerado:', pdfOut);
console.log('Seções (páginas):', sections.length);
console.log('Screenshots em:', shotDir);
await browser.close();
