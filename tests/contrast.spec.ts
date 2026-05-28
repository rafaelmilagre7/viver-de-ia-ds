import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { routes, routeSlug } from './routes';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Contrast audit · axe-core color-contrast em TODAS as rotas × light + dark.
 *
 * Não faz parte do CI — é uma ferramenta de varredura sob demanda.
 * Cada teste escreve um JSON próprio em contrast-out/ (paraleliza seguro);
 * depois `node scripts/contrast-report.mjs` agrega.
 *
 *   bunx playwright test contrast.spec.ts --project=desktop
 */

const OUT = path.join(process.cwd(), 'contrast-out');
fs.mkdirSync(OUT, { recursive: true });

const THEMES = ['light', 'dark'] as const;

for (const r of routes) {
  for (const theme of THEMES) {
    test(`contrast · ${theme} · ${r.path}`, async ({ page }) => {
      await page.addInitScript((t) => {
        try {
          localStorage.setItem('via-theme', t);
        } catch {
          /* ignore */
        }
      }, theme);

      await page.goto(r.path, { waitUntil: 'networkidle' });
      // garante o data-theme no <html> (CSS vars dependem disso)
      await page.evaluate((t) => {
        document.documentElement.dataset.theme = t;
      }, theme);
      await page.evaluate(() => document.fonts.ready);
      if (r.settleMs) await page.waitForTimeout(r.settleMs);

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      const v = results.violations.find((x) => x.id === 'color-contrast');
      const nodes = v ? v.nodes : [];

      const out = {
        path: r.path,
        theme,
        fails: nodes.length,
        items: nodes.map((n) => ({
          target: n.target?.[0] ?? '',
          html: (n.html || '').replace(/\s+/g, ' ').slice(0, 160),
          summary: (n.failureSummary || '').replace(/\s+/g, ' ').slice(0, 260),
        })),
      };

      fs.writeFileSync(
        path.join(OUT, `${theme}__${routeSlug(r)}.json`),
        JSON.stringify(out, null, 2),
      );
    });
  }
}
