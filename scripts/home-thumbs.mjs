#!/usr/bin/env bun
/**
 * home-thumbs · miniaturas das páginas-modelo da home
 * ---------------------------------------------------
 * Abre cada página de src/pages/home/showcases.ts em tela cheia (1440×900,
 * sem header/sidebar do site), nos temas claro e escuro, e grava
 * public/home/<slug>-<tema>.webp (1120×700, ~50-90 KB).
 *
 * A home escolhe a do tema atual — só uma imagem por cartão é baixada.
 * Rode de novo sempre que uma página-modelo mudar de cara.
 *
 * Uso (com o site rodando):
 *   bun dev                                  # outro terminal
 *   bun scripts/home-thumbs.mjs              # padrão: http://localhost:5173
 *   bun scripts/home-thumbs.mjs http://localhost:4418
 *
 * Roda com bun (importa o .ts da lista direto). O webp é codificado pelo
 * próprio Chromium (canvas.toDataURL) — nenhuma dependência nova.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { SHOWCASES, THUMB } from '../src/pages/home/showcases.ts';

const BASE = process.argv[2] ?? 'http://localhost:5173';
const OUT = path.join(process.cwd(), 'public', 'home');
const QUALITY = 0.8;

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const encoder = await browser.newPage();

/** PNG (1440×900) → webp no tamanho da miniatura, com reamostragem do Chromium */
async function toWebp(png) {
  const dataUrl = await encoder.evaluate(
    async ({ src, w, h, q }) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      return c.toDataURL('image/webp', q);
    },
    { src: `data:image/png;base64,${png.toString('base64')}`, w: THUMB.width, h: THUMB.height, q: QUALITY },
  );
  return Buffer.from(dataUrl.split(',')[1], 'base64');
}

for (const theme of ['light', 'dark']) {
  // reducedMotion: entradas e loops já no estado final (sem foto no meio do fade)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript((t) => localStorage.setItem('via-theme', t), theme);
  const page = await ctx.newPage();
  for (const { slug } of SHOWCASES) {
    await page.goto(`${BASE}/showcase/${slug}?tela-cheia`, { waitUntil: 'networkidle' });
    // o botão "Sair da tela cheia" é do site, não da página-modelo
    await page.addStyleTag({ content: '.vds-fullscreen-exit { display: none !important; }' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    const file = path.join(OUT, `${slug}-${theme}.webp`);
    const webp = await toWebp(await page.screenshot());
    fs.writeFileSync(file, webp);
    console.log(`${path.relative(process.cwd(), file)} · ${Math.round(webp.length / 1024)} KB`);
  }
  await ctx.close();
}

await browser.close();
