#!/usr/bin/env node
/**
 * build-tokens.mjs
 *
 * Parses `src/styles/tokens.css` and emits:
 *
 *   src/lib/tokens.ts          · typed runtime API (TOKENS object + TokenName type)
 *   dist/lib/tokens.json       · machine-readable token map (post-lib-build)
 *
 * Token shape:
 *   {
 *     name:  "via-navy",         // canonical CSS variable name (no leading --)
 *     css:   "--via-navy",       // ready to splice into a CSS var() call
 *     value: "#0A1F3B",          // raw literal value as written in tokens.css
 *     category: "color"          // color | spacing | radius | shadow | font | motion | other
 *   }
 *
 * Why split runtime (`.ts`) from build output (`.json`)?
 * - `.ts` ships with the library so consumers get autocomplete: `tokens['via-navy']`
 *   and the `TokenName` type without touching JSON.
 * - `.json` is for tools (Style Dictionary, Figma plugins, scripts) that don't
 *   want to evaluate JS — they read the same data shape.
 *
 * Re-run on every `bun run build` (already wired via the npm script).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const tokensCss = resolve(root, 'src/styles/tokens.css');
const outTs = resolve(root, 'src/lib/tokens.ts');
const outDistJson = resolve(root, 'dist/lib/tokens.json');

if (!existsSync(tokensCss)) {
  console.error(`tokens.css not found at ${tokensCss}`);
  process.exit(1);
}

const css = readFileSync(tokensCss, 'utf8');

// Strip CSS comments to avoid false matches.
const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');

// Match `--name: value;` lines. Value can contain anything but `;`.
const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;

const seen = new Map();
let m;
while ((m = re.exec(stripped)) !== null) {
  const fullName = m[1].trim();
  const value = m[2].trim();
  // Last definition wins (mirrors CSS cascade for the same selector).
  seen.set(fullName, value);
}

function categorize(name, value) {
  const n = name.toLowerCase();
  const v = value.toLowerCase();
  if (n.includes('font') || n.includes('display') || n.includes('mono')) return 'font';
  if (n.includes('radius')) return 'radius';
  if (n.includes('shadow')) return 'shadow';
  if (n.includes('space') || n.includes('gap') || n.includes('padding')) return 'spacing';
  if (n.includes('motion') || n.includes('ease') || n.includes('duration') || n === '--via-t') return 'motion';
  if (n.includes('noise') || n.includes('mesh') || n.includes('bg-')) return 'surface';
  if (
    /^#[0-9a-f]{3,8}$/i.test(value) ||
    v.startsWith('rgb') ||
    v.startsWith('hsl') ||
    v.startsWith('var(--via-')
  ) {
    return 'color';
  }
  return 'other';
}

const tokens = [...seen.entries()].map(([fullName, value]) => {
  const name = fullName.replace(/^--/, '');
  return {
    name,
    css: fullName,
    value,
    category: categorize(fullName, value),
  };
});

tokens.sort((a, b) =>
  a.category === b.category ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category),
);

// 1. emit TypeScript runtime
const tsHeader = `/**
 * Design tokens. Auto-generated from src/styles/tokens.css.
 * DO NOT EDIT by hand. Regenerate via \`bun run build:tokens\`.
 *
 * @example
 *   import { tokens, type TokenName } from '@viverdeia/design-system/tokens';
 *   const navy = tokens['via-navy']; // => '#0A1F3B'
 *   tokens['via-radius-lg'];          // => '16px'
 */
`;

const tsBody = `
export interface Token {
  /** Token name without the leading '--' (e.g. 'via-navy') */
  name: string;
  /** Full CSS variable name (e.g. '--via-navy') */
  css: string;
  /** Raw literal value as written in tokens.css */
  value: string;
  /** Coarse category for tooling and docs */
  category: 'color' | 'spacing' | 'radius' | 'shadow' | 'font' | 'motion' | 'surface' | 'other';
}

export const tokensList: readonly Token[] = ${JSON.stringify(tokens, null, 2)} as const;

export const tokens = Object.freeze(
  tokensList.reduce<Record<string, string>>((acc, t) => {
    acc[t.name] = t.value;
    return acc;
  }, {}),
) as Readonly<Record<TokenName, string>>;

export type TokenName =
${tokens.map((t) => `  | '${t.name}'`).join('\n')};

/** CSS var() reference for a token. Returns 'var(--via-navy)' for 'via-navy'. */
export function cssVar(name: TokenName): string {
  return \`var(--\${name})\`;
}
`;

writeFileSync(outTs, tsHeader + tsBody);
console.log(`wrote ${outTs}  (${tokens.length} tokens)`);

// 2. emit JSON to dist/lib if the lib was already built
if (existsSync(resolve(root, 'dist/lib'))) {
  writeFileSync(
    outDistJson,
    JSON.stringify(
      {
        $version: JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).version,
        $generated: new Date().toISOString(),
        $source: 'src/styles/tokens.css',
        tokens,
      },
      null,
      2,
    ),
  );
  console.log(`wrote ${outDistJson}`);
}

console.log(`\n${tokens.length} tokens total. By category:`);
const byCat = {};
for (const t of tokens) byCat[t.category] = (byCat[t.category] || 0) + 1;
for (const [cat, n] of Object.entries(byCat).sort()) {
  console.log(`  ${cat.padEnd(10)} ${String(n).padStart(3)}`);
}
