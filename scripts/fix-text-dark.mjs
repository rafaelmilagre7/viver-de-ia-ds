#!/usr/bin/env node
/**
 * fix-text-dark.mjs
 *
 * A RAIZ do "muito erro de contraste no escuro": o design system foi
 * construído light-first com ~1046 `color: var(--via-navy)` + centenas de
 * `color: var(--via-gray-600/700/...)` hardcoded. Em light ficam lindos
 * (texto navy/cinza escuro sobre fundo claro). Em dark, como o navy/gray
 * escuro NÃO adapta, viram texto escuro sobre fundo escuro = invisível.
 *
 * A correção é trocar TEXTO hardcoded por tokens semânticos que já adaptam:
 *   color: var(--via-navy)       → var(--via-text-primary)
 *   color: var(--via-navy-deep)  → var(--via-text-primary)
 *   color: var(--via-gray-900/800) → var(--via-text-primary)
 *   color: var(--via-gray-700/600) → var(--via-text-body)
 *   color: var(--via-gray-500)   → var(--via-text-muted)
 *
 * SEGURANÇA: no LIGHT é no-op exato — os tokens semânticos são DEFINIDOS
 * como esses mesmos valores no :root (text-primary=navy, text-body=gray-700,
 * text-muted=gray-500). Só muda o DARK (passa a clarear o texto). Logo,
 * zero risco no tema claro.
 *
 * Único risco no dark: texto navy sobre superfície SEMPRE-branca (onnavy).
 * Esses viram branco-sobre-branco → caçados depois com o scan visual de
 * "light patch + texto claro" e re-fixados caso a caso.
 *
 * Regex: casa SÓ `color:` standalone (lookbehind nega `-color`, então
 * border-color / background-color / fill-color / caret-color ficam intactos).
 *
 * Run: node scripts/fix-text-dark.mjs
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

// [rawToken, semanticToken]
const map = [
  ['navy-deep', 'text-primary'],
  ['navy', 'text-primary'],
  ['gray-900', 'text-primary'],
  ['gray-800', 'text-primary'],
  ['gray-700', 'text-body'],
  ['gray-600', 'text-body'],
  ['gray-500', 'text-muted'],
];

// (?<![-\w]) → "color" não precedido de "-" nem letra → ignora border-color etc.
function reFor(raw) {
  return new RegExp(`(?<![-\\w])color:\\s*var\\(--via-${raw}\\)`, 'g');
}

const counts = {};
let filesChanged = 0;

for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;
  for (const [raw, sem] of map) {
    css = css.replace(reFor(raw), () => {
      counts[raw] = (counts[raw] || 0) + 1;
      return `color: var(--via-${sem})`;
    });
  }
  if (css !== before) {
    writeFileSync(file, css, 'utf8');
    filesChanged++;
  }
}

console.log('✓ fix-text-dark concluído (no-op no light · adapta no dark)');
for (const [raw, sem] of map) {
  if (counts[raw]) console.log(`  color:${raw.padEnd(10)} → ${sem}  ·  ${counts[raw]}x`);
}
console.log(`  ${filesChanged} arquivos alterados`);
