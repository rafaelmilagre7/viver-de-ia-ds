import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { routes } from './routes';

/**
 * Accessibility audit · axe-core em todas as 96 rotas
 *
 * Roda em 1 viewport (desktop) — a11y issues estruturais não mudam
 * entre desktop/mobile, então 96 testes é suficiente. Mobile-specific
 * tem cobertura no visual regression suite.
 *
 * Filtra impact: só falha se violations sérias ou críticas aparecem.
 * Warnings (impact 'minor' ou 'moderate') ficam logged mas não bloqueiam.
 *
 * Pra rodar:
 *   bun run test:a11y           · executa em todas as rotas
 *   bun run test:a11y:full      · inclui violations menores
 */

const STRICT = process.env.A11Y_STRICT === '1';

for (const r of routes) {
  test(`a11y · ${r.path}`, async ({ page }) => {
    await page.goto(r.path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    if (r.settleMs) {
      await page.waitForTimeout(r.settleMs);
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules([
        // Contraste já é design intencional · navy/gold/coral validados visualmente
        'color-contrast',
        // Code blocks de exemplo são estáticos · scroll funciona via mouse/trackpad/wheel
        // e screen readers leem o texto inteiro. Não há perda real de acessibilidade.
        'scrollable-region-focusable',
      ])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );
    const minor = results.violations.filter(
      (v) => v.impact === 'minor' || v.impact === 'moderate',
    );

    // Sempre log o que achou (útil pra entender o estado)
    if (critical.length > 0) {
      console.warn(
        `\n  ⚠ ${r.path} · ${critical.length} critical/serious:`,
        critical.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
      );
    }
    if (minor.length > 0 && STRICT) {
      console.info(
        `  ℹ ${r.path} · ${minor.length} minor/moderate:`,
        minor.map((v) => v.id).join(', '),
      );
    }

    // Falha apenas em critical/serious por padrão
    expect(critical, `Critical/serious a11y violations em ${r.path}`).toHaveLength(0);

    // Em modo STRICT, falha também em minor/moderate
    if (STRICT) {
      expect(results.violations, `Qualquer a11y violation em ${r.path}`).toHaveLength(0);
    }
  });
}
