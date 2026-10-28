/* Gera o espelho pras IAs da biblioteca de microcopy.
   Fonte: src/content/microcopy.ts → plugins/.../viver-de-ia-design/microcopy.md
   Rode com bun (resolve .ts): `bun scripts/build-microcopy-md.mjs` */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { microcopyMarkdown } from '../src/content/microcopy.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'plugins/viver-de-ia/skills/viver-de-ia-design/microcopy.md');
writeFileSync(out, microcopyMarkdown());
console.log(`✓ microcopy.md → ${out}`);
