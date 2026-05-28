#!/usr/bin/env node
/**
 * migrate-glass.mjs
 *
 * Substitui backgrounds de card hardcoded por tokens semânticos que
 * adaptam light/dark automaticamente.
 *
 * 1. Gradientes brancos glass (primeiro stop ≥ 0.6) → var(--via-glass-card)
 * 2. background: var(--via-white) / background-color: var(--via-white) → var(--via-surface)
 *
 * NÃO toca em gradientes de alpha baixo (< 0.6 no primeiro stop) porque
 * esses são elementos brancos translúcidos SOBRE navy (intencional).
 *
 * Run: node scripts/migrate-glass.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '../src');

// Coleta todos os .css recursivamente
function findCss(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...findCss(p));
    else if (entry.endsWith('.css')) out.push(p);
  }
  return out;
}

// Regex: linear-gradient(180deg, rgba(255,255,255, X) [pos], rgba(R,G,B, Y) [pos])
// onde X (primeiro alpha) >= 0.6 → card glass claro
// aceita posições opcionais (ex: " 0%", " 100%") após cada cor
const gradientRe = /linear-gradient\(180deg,\s*rgba\(255,\s*255,\s*255,\s*(0\.\d+)\)(?:\s+\d+%)?,\s*rgba\(2\d{1,2},\s*2\d{1,2},\s*2\d{1,2},\s*0\.\d+\)(?:\s+\d+%)?\)/g;

// Gradientes brancos que começam com var(--via-white), rgba(...,1), ou #fff:
// - var(--via-white) → var(--via-gray-50/100)
// - var(--via-white) → rgba(255,255,255, X)
// - rgba(255,255,255, 1) → rgba(255,255,255, X)
const tokenGradientRe = new RegExp(
  'linear-gradient\\(180deg,\\s*' +
  '(?:var\\(--via-white\\)|rgba\\(255,\\s*255,\\s*255,\\s*1\\))' +  // primeiro stop branco sólido
  '(?:\\s+\\d+%)?,\\s*' +
  '(?:var\\(--via-gray-(?:50|100)\\)|rgba\\(2\\d{1,2},\\s*2\\d{1,2},\\s*2\\d{1,2},\\s*0\\.\\d+\\))' + // segundo stop
  '(?:\\s+\\d+%)?\\)',
  'g'
);

// background: var(--via-white) → var(--via-surface)  (em backgrounds só)
const whiteBackgroundRe = /(background(?:-color)?:\s*)var\(--via-white\)/g;

// background: rgba(255,255,255, X) standalone (X >= 0.6) → var(--via-surface)
// card branco sólido-ish · vira surface adaptável. Alpha < 0.6 fica (sobre navy).
const soloWhiteRe = /(background(?:-color)?:\s*)rgba\(255,\s*255,\s*255,\s*(0\.\d+)\)(\s*;)/g;

let totalGradients = 0;
let totalWhites = 0;
let filesChanged = 0;

// NÃO migrar o próprio tokens.css (onde os tokens são definidos)
const tokensFile = resolve(srcDir, 'styles/tokens.css');

for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;

  // 1. Gradientes glass claros (primeiro stop >= 0.6)
  css = css.replace(gradientRe, (match, firstAlpha) => {
    const a = parseFloat(firstAlpha);
    if (a >= 0.6) {
      totalGradients++;
      return 'var(--via-glass-card)';
    }
    return match; // alpha baixo = sobre navy, mantém
  });

  // 1b. Gradientes brancos com tokens sólidos (var(--via-white) → gray)
  css = css.replace(tokenGradientRe, () => {
    totalGradients++;
    return 'var(--via-glass-card)';
  });

  // 2. background: var(--via-white) → var(--via-surface)
  css = css.replace(whiteBackgroundRe, (_m, prefix) => {
    totalWhites++;
    return `${prefix}var(--via-surface)`;
  });

  // 2b. background: rgba(255,255,255, X≥0.6) standalone → var(--via-surface)
  css = css.replace(soloWhiteRe, (match, prefix, alpha, semi) => {
    if (parseFloat(alpha) >= 0.6) {
      totalWhites++;
      return `${prefix}var(--via-surface)${semi}`;
    }
    return match;
  });

  if (css !== before) {
    writeFileSync(file, css, 'utf8');
    filesChanged++;
  }
}

console.log(`✓ migrate-glass concluído`);
console.log(`  ${totalGradients} gradientes glass → var(--via-glass-card)`);
console.log(`  ${totalWhites} background var(--via-white) → var(--via-surface)`);
console.log(`  ${filesChanged} arquivos alterados`);
