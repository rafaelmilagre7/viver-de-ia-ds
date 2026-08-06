/**
 * Guarda-corpo de distribuição · o pacote do time não pode derivar da fonte.
 *
 * O plugin carrega CÓPIAS de arquivos que vivem em src/. Copiar é manual, então
 * derivam calados (já aconteceu: tokens em Jul, folhas de acabamento/dados em Ago).
 * Este check quebra o CI quando alguém edita a fonte e esquece a cópia.
 *
 * A skill local (~/.claude/skills) vive fora do repo — não dá pra verificar aqui;
 * o pareamento dela é com o plugin, que este check mantém honesto.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PLUGIN = 'plugins/viver-de-ia/skills/viver-de-ia-design';

const PAIRS = [
  ['src/styles/tokens.css', `${PLUGIN}/colors_and_type.css`],
  ['src/styles/surfaces.css', `${PLUGIN}/surfaces.css`],
  ['src/styles/data.css', `${PLUGIN}/data.css`],
];

const drift = PAIRS.filter(([src, copy]) => {
  const a = readFileSync(resolve(root, src), 'utf8');
  const b = readFileSync(resolve(root, copy), 'utf8');
  return a !== b;
});

if (drift.length === 0) {
  console.log(`✓ pacote do time em dia (${PAIRS.length} arquivos)`);
  process.exit(0);
}

console.error('\n✖ o pacote do time derivou da fonte:\n');
for (const [src, copy] of drift) console.error(`  ${src}\n  → ${copy}\n`);
console.error('Copie a fonte por cima da cópia e commite as duas.');
console.error('Lembre da skill local também: ~/.claude/skills/viver-de-ia-design/\n');
process.exit(1);
