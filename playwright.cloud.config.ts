import { defineConfig } from '@playwright/test';
import base from './playwright.config';

/**
 * Mesmo setup do playwright.config.ts, apontando pro Chromium já instalado
 * na máquina. Serve pra sessão em nuvem (claude.ai/code), onde o
 * @playwright/test do projeto pede uma revisão de navegador que não está lá.
 *
 *   bunx playwright test a11y.spec.ts --config=playwright.cloud.config.ts --project=desktop
 *
 * Caminho do binário: env PW_CHROMIUM, senão /opt/pw-browsers/chromium.
 * Visual regression NÃO roda aqui — as baselines são do macOS (darwin).
 */
const executablePath = process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium';

export default defineConfig({
  ...base,
  projects: base.projects?.map((p) => ({
    ...p,
    use: { ...p.use, launchOptions: { ...p.use?.launchOptions, executablePath } },
  })),
});
