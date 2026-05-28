#!/usr/bin/env node
/**
 * fix-sheen.mjs
 *
 * Terceira (e última) onda da migração glass pro dark mode.
 *
 * Dois resíduos brancos hardcoded que sobraram do fix-edges e que deixam
 * cards "lavados de branco" no tema escuro:
 *
 * 1) SHEEN (::before): o brilho que desce do topo do card —
 *      background: linear-gradient(180deg, rgba(255,255,255, 0.45–0.7), transparent)
 *    fica lindo no light (vidro pega luz) mas no dark vira um lavado branco
 *    no topo do card. Troca por var(--via-glass-sheen) que é 0.6 no light e
 *    0.05 no dark.
 *
 * 2) EDGE-LO (inset inferior): a linha de luz na base do card —
 *      inset 0 -1px 0 rgba(255,255,255, 0.4 | 0.5)
 *    vira hairline branca berrante no dark. Troca por var(--via-edge-lo)
 *    (0.4 light / 0.05 dark).
 *
 * Só toca alphas FORTES (sheen >= 0.45, inset 0.4/0.5). Os sutis já tunados
 * pro dark (0.05–0.18) ficam intactos.
 *
 * Run: node scripts/fix-sheen.mjs
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

// linear-gradient(180deg, rgba(255,255,255, 0.45-0.9), transparent[ NN%]) → var(--via-glass-sheen)
const sheenRe = /linear-gradient\(\s*180deg\s*,\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0?\.[4-9]\d?\s*\)\s*,\s*transparent(?:\s+\d+%)?\s*\)/g;
// inset 0 -1px 0 rgba(255,255,255, 0.4|0.5) → inset 0 -1px 0 var(--via-edge-lo)
const edgeLoRe = /inset\s+0\s+-1px\s+0\s+rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0?\.[45]\d?\s*\)/g;

let totalSheen = 0;
let totalEdgeLo = 0;
let filesChanged = 0;

for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;

  css = css.replace(sheenRe, () => {
    totalSheen++;
    return 'var(--via-glass-sheen)';
  });

  css = css.replace(edgeLoRe, () => {
    totalEdgeLo++;
    return 'inset 0 -1px 0 var(--via-edge-lo)';
  });

  if (css !== before) {
    writeFileSync(file, css, 'utf8');
    filesChanged++;
  }
}

console.log(`✓ fix-sheen concluído`);
console.log(`  ${totalSheen} sheens brancos → var(--via-glass-sheen)`);
console.log(`  ${totalEdgeLo} insets inferiores → var(--via-edge-lo)`);
console.log(`  ${filesChanged} arquivos alterados`);
