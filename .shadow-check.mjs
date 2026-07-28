import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext();
const p = await ctx.newPage();
const out = {};
const cases = [
  ['avatar',   '.via-avatar'],
  ['slider',   '[class*="via-slider"] [class*="thumb"]'],
  ['tooltip',  '[class*="via-tip"]'],
  ['stepper',  '[class*="via-step"]'],
  ['dropdown', '.via-dd-trigger'],
];
for (const theme of ['light','dark']) {
  for (const [r, sel] of cases) {
    await p.goto(`http://localhost:5377/components/${r}`, { waitUntil: 'domcontentloaded' });
    await p.evaluate(t => localStorage.setItem('via-ds-theme', t), theme);
    await p.reload({ waitUntil: 'networkidle' });
    await p.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
    await p.waitForTimeout(200);
    const v = await p.evaluate(s => {
      const els = [...document.querySelectorAll(s)].filter(e => getComputedStyle(e).boxShadow !== 'none');
      const el = els[0];
      if (!el) return null;
      return { theme: document.documentElement.dataset.theme, cls: el.className, shadow: getComputedStyle(el).boxShadow };
    }, sel);
    out[`${r} · ${theme}`] = v;
  }
}
console.log(JSON.stringify(out, null, 1));
await b.close();
