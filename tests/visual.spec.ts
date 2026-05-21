import { test, expect } from '@playwright/test';
import { routes, routeSlug } from './routes';

/**
 * Visual regression — Viver de IA Design System
 *
 * Para cada rota declarada em `routes.ts`, tira screenshot full-page
 * e compara com baseline em `tests/visual.spec.ts-snapshots/`.
 *
 * Falhas comuns:
 *   - Token CSS quebrou (ex: tokens.css com @media engolindo declarations)
 *   - Componente novo introduziu shift de layout
 *   - Fonte não carregou em tempo (aumentar settleMs da rota)
 *
 * Pra regenerar baselines após mudança visual intencional:
 *   bun run test:visual:update
 */

for (const r of routes) {
  test(`visual · ${r.path}`, async ({ page }) => {
    // Bloqueia o noise SVG turbulence (pode variar por GPU/renderer)
    // sem afetar o layout — só evita falsos positivos por sub-pixel
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        /* Esconde noise overlay turbulence — varia entre engines */
        .via-noise::after { opacity: 0 !important; }
      `,
    });

    await page.goto(r.path, { waitUntil: 'networkidle' });

    // Garante que fontes carregaram antes do snapshot
    await page.evaluate(() => document.fonts.ready);

    if (r.settleMs) {
      await page.waitForTimeout(r.settleMs);
    }

    await expect(page).toHaveScreenshot(`${routeSlug(r)}.png`, {
      fullPage: true,
      ...(r.maxDiffPixelRatio !== undefined && { maxDiffPixelRatio: r.maxDiffPixelRatio }),
    });
  });
}
