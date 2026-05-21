#!/usr/bin/env node
/**
 * smoke-test-lib.mjs
 *
 * Sanity-checks the published artifact in `dist/lib/` before tagging
 * a release. Catches obvious breakage:
 *
 *   - every file declared in package.json `files` exists and is non-empty
 *   - `exports` paths all resolve
 *   - the ESM bundle parses + has the expected named exports
 *   - tokens.json is valid JSON and has > 100 tokens
 *   - types/index.d.ts has the main re-exports
 *
 * Exits with code 1 if anything's off, 0 otherwise.
 *
 * Run with: `node scripts/smoke-test-lib.mjs`
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist/lib');

const fails = [];
const passes = [];

function check(label, fn) {
  try {
    const detail = fn();
    passes.push(`  ok   ${label}${detail ? `  (${detail})` : ''}`);
  } catch (err) {
    fails.push(`  FAIL ${label}\n       ${err.message}`);
  }
}

// 0 · dist/lib exists
if (!existsSync(dist)) {
  console.error('dist/lib/ not found · run `bun run build:lib` first');
  process.exit(1);
}

// 1 · package.json
const pkg = JSON.parse(readFileSync(resolve(dist, 'package.json'), 'utf8'));
check('package.json · name + version', () => {
  if (pkg.name !== '@viverdeia/design-system') throw new Error(`name = ${pkg.name}`);
  if (!/^\d+\.\d+\.\d+/.test(pkg.version)) throw new Error(`version = ${pkg.version}`);
  return `${pkg.name}@${pkg.version}`;
});

// 2 · every file in pkg.files exists + non-empty
for (const f of pkg.files) {
  check(`file exists · ${f}`, () => {
    const p = resolve(dist, f);
    if (!existsSync(p)) throw new Error('missing');
    const st = statSync(p);
    if (!st.isDirectory() && st.size === 0) throw new Error('empty');
    return st.isDirectory() ? 'dir' : `${Math.round(st.size / 1024)} KB`;
  });
}

// 3 · exports paths resolve
const exportPaths = [];
function collectPaths(obj) {
  for (const v of Object.values(obj)) {
    if (typeof v === 'string') exportPaths.push(v);
    else if (typeof v === 'object' && v) collectPaths(v);
  }
}
collectPaths(pkg.exports);
for (const p of [...new Set(exportPaths)]) {
  check(`exports path resolves · ${p}`, () => {
    const full = resolve(dist, p.replace(/^\.\//, ''));
    if (!existsSync(full)) throw new Error('not found');
    return null;
  });
}

// 4 · tokens.json valid + has tokens
check('tokens.json valid · 100+ tokens', () => {
  const tk = JSON.parse(readFileSync(resolve(dist, 'tokens.json'), 'utf8'));
  if (!Array.isArray(tk.tokens)) throw new Error('no tokens[] array');
  if (tk.tokens.length < 100) throw new Error(`only ${tk.tokens.length} tokens`);
  return `${tk.tokens.length} tokens · v${tk.$version}`;
});

// 5 · ESM bundle parses + has expected named exports
const expected = [
  'Button', 'Pill', 'Card', 'Input', 'Avatar', 'Icon',
  'ToastStack', 'useToasts', 'Tooltip', 'Modal', 'Tabs',
  'Switch', 'Checkbox', 'RadioGroup', 'Select', 'Progress',
  'Drawer', 'Spinner', 'Skeleton', 'Breadcrumb', 'Pagination',
  'Accordion', 'Stepper', 'EmptyState', 'Combobox', 'DropdownMenu',
  'Popover', 'Command', 'DatePicker', 'Slider', 'Alert', 'DataTable',
  'tokens', 'tokensList', 'cssVar',
];
await (async () => {
  try {
    const mod = await import(pathToFileURL(resolve(dist, 'index.js')).href);
    const missing = expected.filter((name) => !(name in mod));
    if (missing.length) {
      fails.push(`  FAIL ESM bundle · missing exports\n       ${missing.join(', ')}`);
    } else {
      passes.push(`  ok   ESM bundle · all ${expected.length} named exports present`);
    }
  } catch (err) {
    fails.push(`  FAIL ESM bundle · import failed\n       ${err.message}`);
  }
})();

// 6 · types/index.d.ts has main re-exports
check('types/index.d.ts has main types', () => {
  const dts = readFileSync(resolve(dist, 'types/index.d.ts'), 'utf8');
  const missing = ['Button', 'Modal', 'DataTable', 'TokenName'].filter(
    (t) => !dts.includes(t),
  );
  if (missing.length) throw new Error(`missing types: ${missing.join(', ')}`);
  return `${(dts.split('\n').length)} lines`;
});

// 7 · print report
console.log('Smoke test · @viverdeia/design-system\n');
for (const p of passes) console.log(p);
if (fails.length) {
  console.log('');
  for (const f of fails) console.log(f);
  console.log(`\nFAILED · ${fails.length} check(s) failed.`);
  process.exit(1);
}
console.log(`\nOK · all ${passes.length} checks passed. Ready to publish.`);
