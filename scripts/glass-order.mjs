#!/usr/bin/env node
/**
 * glass-order · guarda-corpo do vidro
 * -----------------------------------
 * O minificador de CSS (lightningcss · Vite 8, Next.js) lê
 *
 *   backdrop-filter: X;
 *   -webkit-backdrop-filter: X;
 *
 * como "o prefixado sobrescreve o padrão" e APAGA o `backdrop-filter`.
 * Chrome e Firefox ignoram o `-webkit-` → o vidro some no build de produção
 * (aconteceu no style.css da lib · 54 de 61 regras de vidro sem blur no Chrome).
 * Na ordem prefixo → padrão o minificador mantém os dois.
 *
 * Regra: em todo bloco com os dois, o `-webkit-backdrop-filter` vem ANTES.
 *
 * Uso:   node scripts/glass-order.mjs
 * CI:    sai com código 1 se achar a ordem invertida.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIRS = ['src', 'plugins'];

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

const STD = /(?<![-\w])backdrop-filter\s*:/g;
const PREFIXED = /-webkit-backdrop-filter\s*:/g;

const findings = [];
for (const file of DIRS.flatMap((d) => walk(path.join(ROOT, d)))) {
  const rel = path.relative(ROOT, file);
  // comentários viram espaço (preserva offsets pra calcular a linha)
  const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  for (const block of css.matchAll(/\{([^{}]*)\}/g)) {
    const body = block[1];
    const std = [...body.matchAll(STD)].map((m) => m.index);
    const pre = [...body.matchAll(PREFIXED)].map((m) => m.index);
    if (std.length && pre.length && Math.max(...std) < Math.max(...pre)) {
      const line = css.slice(0, block.index + 1 + Math.max(...std)).split('\n').length;
      findings.push(`${rel}:${line}`);
    }
  }
}

if (findings.length === 0) {
  console.log('✓ glass-order: todo -webkit-backdrop-filter vem antes do backdrop-filter.');
  process.exit(0);
}

console.error(`✗ glass-order: ${findings.length} bloco(s) com backdrop-filter ANTES do -webkit-:\n`);
for (const f of findings) console.error(`  ${f}`);
console.error('\nInverta: -webkit-backdrop-filter primeiro, backdrop-filter por último (senão o minify apaga o vidro).');
process.exit(1);
