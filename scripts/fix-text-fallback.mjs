#!/usr/bin/env node
/**
 * fix-text-fallback.mjs
 *
 * O fix-text-dark casava `color: var(--via-navy)` EXATO e deixou passar a
 * forma com fallback: `color: var(--via-navy, #0A1F3B)`. Os 34 componentes
 * da LIBRARY (src/lib/*, os exportados que Nina/Iris/ExecSeats usam) usam
 * essa forma → texto navy invisível no dark.
 *
 * Troca color: var(--via-navy[-deep], <fallback>) → var(--via-text-primary).
 * No-op no light (text-primary = navy), adapta no dark.
 *
 * ink-2/ink-3 já adaptam no dark (definidos no bloco dark) → não mexe.
 *
 * Run: node scripts/fix-text-fallback.mjs
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

// color: var(--via-navy[-deep], qualquer-fallback) → var(--via-text-primary)
const re = /(?<![-\w])color:\s*var\(\s*--via-navy(?:-deep)?\s*,[^)]*\)/g;

let count = 0, filesChanged = 0;
for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;
  css = css.replace(re, () => { count++; return 'color: var(--via-text-primary)'; });
  if (css !== before) { writeFileSync(file, css, 'utf8'); filesChanged++; }
}

console.log(`✓ fix-text-fallback concluído (no-op no light · adapta no dark)`);
console.log(`  color: var(--via-navy*, fallback) → text-primary  ·  ${count}x · ${filesChanged} arquivos`);
