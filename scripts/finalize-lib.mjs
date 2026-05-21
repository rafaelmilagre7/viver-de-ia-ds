#!/usr/bin/env node
/**
 * finalize-lib.mjs
 *
 * Roda depois do `vite build --config vite.config.lib.ts` pra:
 *   1. Gerar `dist/lib/package.json` publicável
 *   2. Copiar `src/styles/tokens.css` como `dist/lib/tokens.css`
 *      (consumidor importa: `import '@viverdeia/ds/tokens.css'`)
 *   3. Gerar README curto explicando uso
 *
 * Output final em `dist/lib/`:
 *   index.js          (ESM bundle)
 *   index.cjs         (CommonJS bundle)
 *   style.css         (CSS de todos componentes, único arquivo)
 *   tokens.css        (CSS variables · paleta · tipografia)
 *   types/            (declarações .d.ts de cada componente)
 *   package.json      (exports map + peerDeps + types)
 *   README.md
 */

import { writeFileSync, copyFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'dist/lib');

if (!existsSync(out)) {
  console.error('✗ dist/lib não existe — rode `vite build --config vite.config.lib.ts` primeiro.');
  process.exit(1);
}

// Lê versão atual do root package.json (fallback "0.1.0")
const rootPkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const version = rootPkg.version === '0.0.0' ? '0.1.0' : rootPkg.version;

// 1 · publishable package.json
const pkg = {
  name: '@viverdeia/design-system',
  version,
  description: 'Design System Viver de IA — navy editorial + liquid glass + 80+ patterns. React + TypeScript.',
  keywords: ['design-system', 'viver-de-ia', 'react', 'typescript', 'editorial', 'navy', 'liquid-glass'],
  author: 'Viver de IA',
  license: 'UNLICENSED',
  type: 'module',
  main: './index.cjs',
  module: './index.js',
  types: './types/index.d.ts',
  sideEffects: ['*.css'],
  exports: {
    '.': {
      types: './types/index.d.ts',
      import: './index.js',
      require: './index.cjs',
    },
    './style.css': './style.css',
    './tokens.css': './tokens.css',
  },
  files: ['index.js', 'index.cjs', 'index.js.map', 'index.cjs.map', 'style.css', 'tokens.css', 'types', 'README.md'],
  peerDependencies: {
    react: '^18.0.0 || ^19.0.0',
    'react-dom': '^18.0.0 || ^19.0.0',
    'lucide-react': '*',
  },
  publishConfig: {
    access: 'restricted',
  },
};

writeFileSync(resolve(out, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
console.log('✓ dist/lib/package.json');

// 2 · copiar tokens.css
const tokensSrc = resolve(root, 'src/styles/tokens.css');
if (existsSync(tokensSrc)) {
  copyFileSync(tokensSrc, resolve(out, 'tokens.css'));
  console.log('✓ dist/lib/tokens.css');
} else {
  console.warn('⚠ src/styles/tokens.css não encontrado · skip');
}

// 3 · README · prefere src/lib/README.md (full); fallback pra README curto inline
const libReadmePath = resolve(root, 'src/lib/README.md');
if (existsSync(libReadmePath)) {
  copyFileSync(libReadmePath, resolve(out, 'README.md'));
  console.log('✓ dist/lib/README.md (de src/lib/README.md)');
} else {
  // Fallback caso o README full não exista ainda
  const fallback = `# @viverdeia/design-system\n\nDesign System Viver de IA — React + TypeScript.\n\nReferência viva: https://viverdeia.ai/design-system\n`;
  writeFileSync(resolve(out, 'README.md'), fallback);
  console.log('✓ dist/lib/README.md (fallback)');
}

console.log('\n✓ Library empacotada em dist/lib/');
console.log(`  Versão: ${version}`);
console.log('  Para publicar: cd dist/lib && npm publish');
