#!/usr/bin/env node
/**
 * motion-drift · guard-rail de movimento da library
 * -------------------------------------------------
 * A lib tem UMA escala de movimento (tokens.css): --via-dur-{press,quick,
 * base,panel,page} e --via-ease-{enter,exit,snap} (+ molas --via-spring-*).
 * Duração ou curva escrita à mão em src/lib volta a espalhar 20 durações e
 * 10 curvas — este check barra isso no CI (roda junto do lint:tokens).
 *
 * Olha só as declarações de movimento (transition*, animation*) dos CSS de
 * src/lib e acusa:
 *   - duração literal (120ms, .2s…)            → var(--via-dur-*)
 *   - ease / ease-in / ease-out / ease-in-out  → var(--via-ease-*)
 *   - cubic-bezier(…) / linear(…) solto         → var(--via-ease-*) / var(--via-spring-*)
 *   - scale(0.x) solto numa regra :active       → var(--via-press-scale[-sm])
 *
 * Exceções legítimas:
 *   - loop ambiente (`infinite`): spinner, shimmer, pulso — não é gesto,
 *     não entra na escala;
 *   - `linear` e `steps()` (progresso contínuo, loop);
 *   - 0s / 0ms (desligar).
 *
 * Uso:   node scripts/motion-drift.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LIB = path.join(ROOT, 'src', 'lib');

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.css')) out.push(p);
  }
  return out;
}

/** Remove comentários preservando as quebras de linha (número da linha bate) */
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

const DECL = /(?<=[\s{;])(transition(?:-duration|-timing-function)?|animation(?:-duration|-timing-function)?)\s*:\s*([^;{}]+?)\s*(?=;|})/g;
const DURATION = /(?<![\w.-])(\d*\.?\d+)(ms|s)\b/g;
const KEYWORD = /(?<![\w-])(ease-in-out|ease-in|ease-out|ease)(?![\w-])/g;
const FUNC = /(?<![\w-])(cubic-bezier|linear)\(/g;
const RULE = /([^{}]+)\{([^{}]*)\}/g;
const PRESS = /scale\(\s*(0?\.\d+)\s*\)/g;

const findings = [];
for (const file of walk(LIB)) {
  const rel = path.relative(ROOT, file);
  const css = stripComments(fs.readFileSync(file, 'utf8'));
  for (const m of css.matchAll(DECL)) {
    const [, prop, value] = m;
    if (/\binfinite\b/.test(value)) continue; // loop ambiente fica fora da escala
    const line = css.slice(0, m.index).split('\n').length;
    // duração/curva dentro de var(--…) é token; tira os var() antes de procurar
    const bare = value.replace(/var\(--[\w-]+\)/g, ' ');
    for (const d of bare.matchAll(DURATION)) {
      if (Number(d[1]) === 0) continue;
      findings.push({ rel, line, prop, what: `${d[1]}${d[2]}`, hint: 'var(--via-dur-*)' });
    }
    for (const k of bare.matchAll(KEYWORD)) {
      findings.push({ rel, line, prop, what: k[1], hint: 'var(--via-ease-{enter,exit,snap})' });
    }
    for (const f of bare.matchAll(FUNC)) {
      findings.push({ rel, line, prop, what: `${f[1]}(…)`, hint: 'var(--via-ease-*) ou var(--via-spring-*)' });
    }
  }
  // apertar: uma escala só (2 degraus) — antes eram 7 valores entre 0.90 e 0.99
  for (const r of css.matchAll(RULE)) {
    if (!/:active\b/.test(r[1])) continue;
    const bodyAt = r.index + r[1].length + 1;
    for (const p of r[2].matchAll(PRESS)) {
      const line = css.slice(0, bodyAt + p.index).split('\n').length;
      findings.push({ rel, line, prop: 'transform', what: `scale(${p[1]})`, hint: 'scale(var(--via-press-scale)) ou -sm' });
    }
  }
}

if (findings.length === 0) {
  console.log('✓ motion-drift: 0 duração, curva ou escala de apertar solta em src/lib. Escala única.');
  process.exit(0);
}

console.error(`✗ motion-drift: ${findings.length} duração/curva/escala escrita à mão em src/lib:\n`);
for (const f of findings) {
  console.error(`  ${f.rel}:${f.line}  ${f.prop}: … ${f.what} …  ->  ${f.hint}`);
}
console.error(
  '\nUse a escala de tokens.css (press 100 · quick 160 · base 220 · panel 320 · page 400;' +
    ' enter / exit / snap; apertar --via-press-scale / -sm). Loop `infinite` e `linear` ficam de fora.',
);
process.exit(1);
