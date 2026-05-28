import { test } from '@playwright/test';
import { routes, routeSlug } from './routes';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Layout lint · varredura de bugs de espaçamento/sobreposição.
 *
 * Detecta, em TODAS as rotas (geometria é igual nos 2 temas, roda só 1):
 *  A) badge/ícone "empilhável" (inline + margin-bottom) colado no irmão à direita
 *     — o bug do ícone+eyebrow grudados (Brand Story)
 *  B) elementos irmãos visíveis que se SOBREPÕEM (texto por cima de ícone, etc.)
 *
 * Escopo: conteúdo de <main> (ignora header/sidebar/footer chrome).
 * Não faz parte do CI — ferramenta sob demanda.
 *   bunx playwright test layout-lint.spec.ts --project=desktop
 */

const OUT = path.join(process.cwd(), 'layout-out');
fs.mkdirSync(OUT, { recursive: true });

for (const r of routes) {
  test(`layout · ${r.path}`, async ({ page }) => {
    await page.goto(r.path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    if (r.settleMs) await page.waitForTimeout(r.settleMs);

    const findings = await page.evaluate(() => {
      const out: Array<{ type: string; a: string; b: string; detail: string }> = [];
      const desc = (el: Element) => {
        const cls = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean).slice(0, 2).join('.');
        const txt = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30);
        return `${el.tagName.toLowerCase()}${cls ? '.' + cls : ''}${txt ? ` "${txt}"` : ''}`;
      };
      const visible = (el: Element, cs: CSSStyleDeclaration, r: DOMRect) =>
        cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) !== 0 &&
        r.width > 1 && r.height > 1;
      const flowing = (cs: CSSStyleDeclaration) =>
        cs.position !== 'absolute' && cs.position !== 'fixed' && cs.position !== 'sticky';

      const main = document.querySelector('main') || document.body;
      const els = Array.from(main.querySelectorAll<HTMLElement>('*'));

      for (const el of els) {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (!visible(el, cs, r)) continue;

        const sib = el.nextElementSibling as HTMLElement | null;
        if (!sib) continue;
        const scs = getComputedStyle(sib);
        const sr = sib.getBoundingClientRect();
        if (!visible(sib, scs, sr)) continue;

        // ---- A: stacked-intent badge rendered inline (margin-bottom desperdiçado)
        const mb = parseFloat(cs.marginBottom) || 0;
        const isInline = cs.display.startsWith('inline');
        const squareBadge = Math.abs(r.width - r.height) < 12 && r.width <= 72 && r.width >= 16;
        const iconNamed = /ico(n)?\b/i.test(el.getAttribute('class') || '');
        if (isInline && mb >= 8 && (squareBadge || iconNamed) && flowing(scs)) {
          // irmão à direita e na mesma faixa vertical => não desceu (colado)
          if (sr.top < r.bottom - 3 && sr.left >= r.left - 2) {
            out.push({ type: 'cramp', a: desc(el), b: desc(sib), detail: `badge ${Math.round(r.width)}×${Math.round(r.height)} inline, mb=${mb} mas irmão fica ao lado (top ${Math.round(sr.top)} < bottom ${Math.round(r.bottom)})` });
          }
        }

        // ---- B: irmãos que se sobrepõem (colisão visual real)
        // ignora SVG internals e texto puro inline (overlaps de fluxo de linha são normais)
        const inSvg = !!el.closest('svg') || !!sib.closest('svg');
        const pureInline = cs.display === 'inline' || scs.display === 'inline';
        if (flowing(cs) && flowing(scs) && !inSvg && !pureInline) {
          const ox = Math.max(0, Math.min(r.right, sr.right) - Math.max(r.left, sr.left));
          const oy = Math.max(0, Math.min(r.bottom, sr.bottom) - Math.max(r.top, sr.top));
          const overlap = ox * oy;
          const minArea = Math.min(r.width * r.height, sr.width * sr.height);
          // só conta colisão "de verdade": >35% da menor área e ambos com conteúdo
          const elHasText = (el.textContent || '').trim().length > 0;
          const sibHasText = (sib.textContent || '').trim().length > 0;
          if (minArea > 0 && overlap / minArea > 0.35 && (elHasText || sibHasText)) {
            out.push({ type: 'overlap', a: desc(el), b: desc(sib), detail: `sobreposição ${Math.round((overlap / minArea) * 100)}% da menor área` });
          }
        }
      }
      return out;
    });

    fs.writeFileSync(
      path.join(OUT, `${routeSlug(r)}.json`),
      JSON.stringify({ path: r.path, count: findings.length, findings }, null, 2),
    );
  });
}
