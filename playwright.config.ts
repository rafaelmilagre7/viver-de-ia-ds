import { defineConfig, devices } from '@playwright/test';

/**
 * Visual regression suite · Viver de IA Design System
 *
 * - 49+ rotas testadas em 2 viewports (desktop 1440, mobile 375)
 * - threshold de diff 0.5% (sensível o suficiente pra detectar regressões
 *   editoriais sem flackear em sub-pixel rendering)
 * - dev server (vite) start automático em :5173
 *
 * Comandos:
 *   bun run test:visual                · roda testes contra baselines
 *   bun run test:visual:update         · regenera baselines (use depois de
 *                                        polish/refactor visual intencional)
 *   bun run test:visual:report         · abre report HTML do último run
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? 'github' : 'html',
  timeout: 30_000,
  expect: {
    // Tolerância visual: 0.5% pixels diferentes, threshold per pixel 0.2
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005,
      threshold: 0.2,
      animations: 'disabled',
      caret: 'hide',
    },
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    // Reduzir variabilidade: desliga animações via CSS injection
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      // Mobile usa Chromium (não WebKit) pra evitar dependência extra
      // e manter renderização determinística entre os dois projects.
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 812 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
