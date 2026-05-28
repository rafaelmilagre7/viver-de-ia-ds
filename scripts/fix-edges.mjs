#!/usr/bin/env node
/**
 * fix-edges.mjs
 *
 * O "edge highlight" (linha de luz no topo dos cards glass):
 *   inset 0 1px 0 rgba(255, 255, 255, 0.95)
 * fica ótimo no light, mas vira moldura branca berrante no dark.
 *
 * Troca por var(--via-edge-hi) que é forte no light (0.95) e sutil
 * no dark (0.08). Também troca bordas brancas fortes (>=0.8) de card.
 *
 * Run: node scripts/fix-edges.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '../src');
const tokensFile = resolve(srcDir, 'styles/tokens.css');

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

// inset 0 1px 0 rgba(255,255,255, X) → inset 0 1px 0 var(--via-edge-hi)
const insetHiRe = /inset\s+0\s+1px\s+0\s+rgba\(255,\s*255,\s*255,\s*(?:1|0\.\d+)\)/g;
// border: 1px solid rgba(255,255,255, X>=0.8) → border: 1px solid var(--via-edge-hi)
const borderWhiteRe = /(border(?:-color)?:\s*(?:1(?:\.5)?px\s+solid\s+)?)rgba\(255,\s*255,\s*255,\s*(0\.[89]\d?|1)\)/g;

let totalInset = 0;
let totalBorder = 0;
let filesChanged = 0;

for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;

  css = css.replace(insetHiRe, () => {
    totalInset++;
    return 'inset 0 1px 0 var(--via-edge-hi)';
  });

  css = css.replace(borderWhiteRe, (_m, prefix) => {
    totalBorder++;
    return `${prefix}var(--via-edge-hi)`;
  });

  if (css !== before) {
    writeFileSync(file, css, 'utf8');
    filesChanged++;
  }
}

console.log(`✓ fix-edges concluído`);
console.log(`  ${totalInset} inset highlights → var(--via-edge-hi)`);
console.log(`  ${totalBorder} bordas brancas fortes → var(--via-edge-hi)`);
console.log(`  ${filesChanged} arquivos alterados`);
