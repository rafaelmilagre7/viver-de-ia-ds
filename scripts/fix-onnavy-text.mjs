#!/usr/bin/env node
/**
 * fix-onnavy-text.mjs
 *
 * Efeito colateral do fix-text-dark: superfícies SEMPRE-brancas (botões CTA
 * brancos, cards "onnavy", tiers em destaque) tinham texto navy hardcoded
 * que virou var(--via-text-primary). No dark, text-primary = quase-branco →
 * texto branco sobre fundo branco = invisível.
 *
 * Correção: em TODA regra cujo background é sempre-branco, re-pina os tokens
 * de texto pros valores CLAROS (navy/gray). Como custom properties herdam,
 * todo texto descendente que usa os tokens semânticos volta a ser escuro.
 * No LIGHT é no-op (os tokens já são esses valores).
 *
 * "Sempre-branco" = usa var(--via-surface-onnavy) OU gradiente literal
 * #FFFFFF→#F5F7FA OU rgba(255,255,255,>=.85)→....
 *
 * Exclui .vds-home-card-arrow (esse virou chip ESCURO no dark de propósito).
 *
 * Run: node scripts/fix-onnavy-text.mjs
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

const REPIN =
  '\n  --via-text-primary: var(--via-navy); --via-text-body: var(--via-gray-700);' +
  ' --via-text-muted: var(--via-gray-500); --via-text-faint: var(--via-gray-400);';

// branco fixo no fundo da regra?
function isWhiteBg(body) {
  if (/--via-surface-onnavy/.test(body)) return true;
  if (/linear-gradient\([^;]*#f{3,6}\b[^;]*#f5f7fa/i.test(body)) return true;
  if (/linear-gradient\([^;]*rgba\(255,\s*255,\s*255,\s*0\.(8[5-9]|9\d?)\)[^;]*rgba\(255,\s*255,\s*255,\s*0\.[5-9]/i.test(body)) return true;
  return false;
}

const EXCLUDE = /home-card-arrow/;
const blockRe = /([^{}]*)\{([^{}]*)\}/g;

let rules = 0, filesChanged = 0;

for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;

  css = css.replace(blockRe, (m, sel, body) => {
    if (EXCLUDE.test(sel)) return m;
    if (/--via-text-primary\s*:/.test(body)) return m; // já re-pinado
    if (!isWhiteBg(body)) return m;
    rules++;
    return `${sel}{${REPIN}${body}}`;
  });

  if (css !== before) {
    writeFileSync(file, css, 'utf8');
    filesChanged++;
  }
}

console.log('✓ fix-onnavy-text concluído (no-op no light · re-pina texto escuro em superfícies sempre-brancas)');
console.log(`  ${rules} regras re-pinadas · ${filesChanged} arquivos`);
