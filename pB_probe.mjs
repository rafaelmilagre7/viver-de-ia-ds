import { chromium } from 'playwright';

const BASE = 'http://localhost:5361';
const CASES = [
  ['/patterns/achievement', '.vds-streak-stage'],
  ['/patterns/mentor-matching', '.vds-mm'],
  ['/patterns/curriculum', '.vds-course-hero'],
  ['/patterns/live', '.vds-live-hero'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

for (const [route, sel] of CASES) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(500);
  const info = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, missing: true };
    const cs = getComputedStyle(el);
    return { sel, shadow: cs.boxShadow };
  }, sel);
  if (info.missing) { console.log('MISSING', route, sel); continue; }

  // amostra de luminancia LOGO ACIMA do elemento (onde o halo branco aparecia)
  const box = await page.locator(sel).first().boundingBox();
  const strip = { x: Math.max(0, box.x - 6), y: Math.max(0, box.y - 34), width: Math.min(box.width + 12, 1400), height: 30 };
  const buf = await page.screenshot({ clip: strip });
  // luminancia media via canvas no browser
  const b64 = buf.toString('base64');
  const lum = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let sum = 0, max = 0, n = 0;
    for (let i = 0; i < d.length; i += 4) {
      const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      sum += l; n++; if (l > max) max = l;
    }
    return { avg: +(sum / n).toFixed(1), max: +max.toFixed(1) };
  }, b64);

  // luminancia do fundo da pagina longe do elemento
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log(route, sel);
  console.log('   box-shadow(dark):', info.shadow.slice(0, 160));
  console.log('   faixa 30px acima  -> lum media', lum.avg, '| lum max', lum.max, '| body bg', bg);
}

await browser.close();
