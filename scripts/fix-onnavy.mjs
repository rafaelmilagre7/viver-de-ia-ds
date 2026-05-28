#!/usr/bin/env node
/**
 * fix-onnavy.mjs
 *
 * Corrige regressão da migração glass: elementos com background
 * var(--via-glass-card) MAS texto color var(--via-navy[-deep]) são
 * superfícies brancas FIXAS (botão sobre hero navy, badge sobre dark).
 *
 * Lógica: se o texto é navy escuro FIXO, o fundo TEM que ser claro fixo
 * — senão o texto some quando o card adapta pra dark. Logo, esses
 * blocos devem usar var(--via-surface-onnavy) (sempre branco), não
 * var(--via-glass-card) (que adapta).
 *
 * Processa bloco-a-bloco: se um seletor tem AMBOS
 *   background: var(--via-glass-card)
 *   color: var(--via-navy) | var(--via-navy-deep)
 * troca o background pra var(--via-surface-onnavy).
 *
 * Run: node scripts/fix-onnavy.mjs
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

let totalFixed = 0;
let filesChanged = 0;

for (const file of findCss(srcDir)) {
  if (file === tokensFile) continue;
  let css = readFileSync(file, 'utf8');
  const before = css;

  // Processa cada bloco { ... } isoladamente
  css = css.replace(/\{[^{}]*\}/g, (block) => {
    const hasGlass = block.includes('var(--via-glass-card)');
    const hasNavyText = /color:\s*var\(--via-navy(?:-deep)?\)/.test(block);
    if (hasGlass && hasNavyText) {
      const fixed = block.replace(
        /background:\s*var\(--via-glass-card\)/g,
        'background: var(--via-surface-onnavy)'
      );
      if (fixed !== block) totalFixed++;
      return fixed;
    }
    return block;
  });

  if (css !== before) {
    writeFileSync(file, css, 'utf8');
    filesChanged++;
  }
}

console.log(`✓ fix-onnavy concluído`);
console.log(`  ${totalFixed} blocos branco-sobre-navy → var(--via-surface-onnavy)`);
console.log(`  ${filesChanged} arquivos alterados`);
