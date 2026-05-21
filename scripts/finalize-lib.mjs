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
    './tokens.json': './tokens.json',
    './tokens': {
      types: './types/tokens.d.ts',
      import: './index.js',
      require: './index.cjs',
    },
  },
  files: [
    'index.js', 'index.cjs', 'index.js.map', 'index.cjs.map',
    'style.css', 'tokens.css', 'tokens.json',
    'types', 'README.md',
  ],
  peerDependencies: {
    react: '^18.0.0 || ^19.0.0',
    'react-dom': '^18.0.0 || ^19.0.0',
    'lucide-react': '*',
  },
  publishConfig: {
    access: 'public',
    provenance: true,
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/rafaelmilagre7/viver-de-ia-ds.git',
    directory: 'src/lib',
  },
  bugs: {
    url: 'https://github.com/rafaelmilagre7/viver-de-ia-ds/issues',
  },
  homepage: 'https://github.com/rafaelmilagre7/viver-de-ia-ds#readme',
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

// 2.5 · gerar tokens.json (machine-readable) a partir de tokens.css
const tokensCssPath = resolve(root, 'src/styles/tokens.css');
if (existsSync(tokensCssPath)) {
  const css = readFileSync(tokensCssPath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const declRe = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  const seen = new Map();
  for (const match of css.matchAll(declRe)) {
    seen.set(match[1].trim(), match[2].trim());
  }

  const cat = (n, v) => {
    const ln = n.toLowerCase(); const lv = v.toLowerCase();
    if (ln.includes('font') || ln.includes('display') || ln.includes('mono')) return 'font';
    if (ln.includes('radius')) return 'radius';
    if (ln.includes('shadow')) return 'shadow';
    if (ln.includes('space') || ln.includes('gap') || ln.includes('padding')) return 'spacing';
    if (ln.includes('motion') || ln.includes('ease') || ln.includes('duration') || ln === '--via-t') return 'motion';
    if (ln.includes('noise') || ln.includes('mesh') || ln.includes('bg-')) return 'surface';
    if (/^#[0-9a-f]{3,8}$/i.test(v) || lv.startsWith('rgb') || lv.startsWith('hsl') || lv.startsWith('var(--via-')) return 'color';
    return 'other';
  };

  const tokens = [...seen.entries()].map(([full, value]) => ({
    name: full.replace(/^--/, ''),
    css: full,
    value,
    category: cat(full, value),
  }));
  tokens.sort((a, b) => a.category === b.category ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category));

  writeFileSync(resolve(out, 'tokens.json'), JSON.stringify({
    $version: version,
    $generated: new Date().toISOString(),
    $source: 'src/styles/tokens.css',
    tokens,
  }, null, 2) + '\n');
  console.log(`✓ dist/lib/tokens.json (${tokens.length} tokens)`);
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
