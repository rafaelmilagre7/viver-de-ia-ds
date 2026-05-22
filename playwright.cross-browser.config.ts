import { defineConfig, devices } from '@playwright/test';

/**
 * Cross-browser smoke tests · opcional · roda em Firefox + WebKit.
 *
 * Por padrão a suite de visual regression usa só Chromium (determinístico).
 * Este config é separado pra evitar requerer browsers extras na rotina
 * principal de dev. Quando quiser validar cross-browser:
 *
 *   bun playwright install firefox webkit   (uma vez)
 *   bun run test:cross-browser              (cobre Chromium + FF + WK)
 *
 * Foco: smoke (home renderiza · Cmd+K abre · sidebar navega).
 * Não compara screenshots — só comportamento.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: 'cross-browser-smoke.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
