#!/usr/bin/env node
/**
 * token-drift · guard-rail de tokens
 * ----------------------------------
 * Detecta DRIFT: uma declaração hardcoded que tem um token EXATO já definido
 * em src/styles/tokens.css. Não força snapping de valores off-scale — só pega
 * o caso "escreveu 8px mas existe --via-space-2".
 *
 * Escopo (o que já foi tokenizado no sistema, valor único):
 *   - gap: Npx;            → --via-space-*
 *   - font-size: Npx;      → --via-fs-*
 *   - letter-spacing: Nem; → --via-ls-*
 *
 * Uso:   node scripts/token-drift.mjs
 * CI:    sai com código 1 se achar drift (mantém a base tokenizada).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const TOKENS = path.join(SRC, 'styles', 'tokens.css');

/* ---- 1. Constrói os mapas valor→token a partir de tokens.css ---- */
const tokensCss = fs.readFileSync(TOKENS, 'utf8');

const spaceMap = new Map(); // "8px" → "--via-space-2"
for (const m of tokensCss.matchAll(/(--via-space-[0-9_]+):\s*([0-9.]+px)\s*;/g)) {
  spaceMap.set(m[2], m[1]);
}
const lsMap = new Map(); // "0.18em" → "--via-ls-label"
for (const m of tokensCss.matchAll(/(--via-ls-[a-z0-9]+):\s*(-?[0-9.]+em)\s*;/g)) {
  lsMap.set(m[2], m[1]);
}
const fsMap = new Map(); // "16px" → "--via-fs-body"  (px lido do comentário)
for (const m of tokensCss.matchAll(/(--via-fs-[a-z0-9]+):\s*[^;]+;\s*\/\*\s*([0-9]+px)/g)) {
  fsMap.set(m[2], m[1]);
}

/* ---- 2. Varre os CSS ---- */
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules') continue;
      out.push(...walk(p));
    } else if (e.name.endsWith('.css')) {
      out.push(p);
    }
  }
  return out;
}

const CHECKS = [
  { prop: 'gap', re: /gap:\s*([0-9.]+px);/g, map: spaceMap },
  { prop: 'font-size', re: /font-size:\s*([0-9.]+px);/g, map: fsMap },
  { prop: 'letter-spacing', re: /letter-spacing:\s*(-?[0-9.]+em);/g, map: lsMap },
];

const findings = [];
for (const file of walk(SRC)) {
  const rel = path.relative(ROOT, file);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const { prop, re, map } of CHECKS) {
      for (const m of line.matchAll(re)) {
        const token = map.get(m[1]);
        if (token) {
          findings.push({ rel, line: i + 1, prop, value: m[1], token });
        }
      }
    }
  });
}

/* ---- 3. Reporta ---- */
if (findings.length === 0) {
  console.log('✓ token-drift: 0 valores hardcoded com token exato. Base tokenizada.');
  process.exit(0);
}

console.error(`✗ token-drift: ${findings.length} valor(es) hardcoded que ja tem token exato:\n`);
for (const f of findings) {
  console.error(`  ${f.rel}:${f.line}  ${f.prop}: ${f.value};  ->  var(${f.token})`);
}
console.error('\nUse o token (drop-in, mesmo px). Off-scale sem token pode ficar hardcoded.');
process.exit(1);
