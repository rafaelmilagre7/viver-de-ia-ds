#!/usr/bin/env node
/**
 * fix-stage-bg.mjs
 *
 * gray-200/300/400 são usados em DOIS papéis:
 *  - como TEXTO claro (em contexto escuro) → NÃO pode adaptar
 *  - como FUNDO (palcos/wells/avatares/tracks) → PRECISA escurecer no dark
 *
 * Este script troca gray-200/300/400 por tokens de "stage" (que adaptam)
 * SÓ dentro de declarações de background — deixando `color: …` intactos.
 *   background … var(--via-gray-200) → var(--via-stage-soft)
 *   background … var(--via-gray-300) → var(--via-stage-1)
 *   background … var(--via-gray-400) → var(--via-stage-2)
 *
 * No light os stage tokens valem o mesmo cinza (no-op); no dark viram
 * superfície escura. Resolve os "painéis claros" que sobravam no escuro
 * (palco do form, avatares, demo stages dos componentes, etc.).
 *
 * Run: node scripts/fix-stage-bg.mjs
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

// declaração de background até ; ou } (gradientes não têm ; nem } dentro)
const bgDeclRe = /background(?:-color|-image)?\s*:[^;}]*/g;
const map = [
  ['gray-200', 'stage-soft'],
  ['gray-300', 'stage-1'],
  ['gray-400', 'stage-2'],
];

const counts = {};
let filesChanged = 0;

for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;

  css = css.replace(bgDeclRe, (decl) => {
    let d = decl;
    for (const [raw, sem] of map) {
      const re = new RegExp(`var\\(--via-${raw}\\)`, 'g');
      d = d.replace(re, () => {
        counts[raw] = (counts[raw] || 0) + 1;
        return `var(--via-${sem})`;
      });
    }
    return d;
  });

  if (css !== before) {
    writeFileSync(file, css, 'utf8');
    filesChanged++;
  }
}

console.log('✓ fix-stage-bg concluído (no-op no light · escurece backgrounds no dark)');
for (const [raw, sem] of map) {
  if (counts[raw]) console.log(`  bg ${raw} → ${sem}  ·  ${counts[raw]}x`);
}
console.log(`  ${filesChanged} arquivos alterados`);
