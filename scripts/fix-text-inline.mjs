#!/usr/bin/env node
/**
 * fix-text-inline.mjs
 *
 * As migrações anteriores eram só de .css. Sobraram estilos INLINE no JSX
 * (style={{ color: 'var(--via-navy)' }}) em páginas de demo/foundations
 * (Typography, Icons, Glass, etc.) → texto navy/cinza-escuro invisível no dark.
 *
 * Troca a COR DE TEXTO inline por tokens semânticos que adaptam:
 *   color: 'var(--via-navy|navy-deep)'  → 'var(--via-text-primary)'
 *   color: 'var(--via-gray-700|600)'    → 'var(--via-text-body)'
 *   color: 'var(--via-gray-500)'        → 'var(--via-text-muted)'
 *   color: 'var(--via-gray-400)'        → 'var(--via-text-faint)'
 * No-op no light · adapta no dark. (aspas simples ou duplas)
 *
 * Run: node scripts/fix-text-inline.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '../src');

function findTsx(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...findTsx(p));
    else if (entry.endsWith('.tsx')) out.push(p);
  }
  return out;
}

const map = [
  [/color:\s*(['"])var\(--via-navy-deep\)\1/g, 'text-primary'],
  [/color:\s*(['"])var\(--via-navy\)\1/g, 'text-primary'],
  [/color:\s*(['"])var\(--via-gray-700\)\1/g, 'text-body'],
  [/color:\s*(['"])var\(--via-gray-600\)\1/g, 'text-body'],
  [/color:\s*(['"])var\(--via-gray-500\)\1/g, 'text-muted'],
  [/color:\s*(['"])var\(--via-gray-400\)\1/g, 'text-faint'],
];

let count = 0, filesChanged = 0;
for (const file of findTsx(srcDir)) {
  let src = readFileSync(file, 'utf8');
  const before = src;
  for (const [re, sem] of map) {
    src = src.replace(re, (_m, q) => { count++; return `color: ${q}var(--via-${sem})${q}`; });
  }
  if (src !== before) { writeFileSync(file, src, 'utf8'); filesChanged++; }
}

console.log(`✓ fix-text-inline concluído (no-op no light · adapta no dark)`);
console.log(`  ${count} cores de texto inline → tokens semânticos · ${filesChanged} arquivos`);
