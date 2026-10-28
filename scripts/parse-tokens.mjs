/**
 * parse-tokens.mjs
 *
 * Parser único de src/styles/tokens.css → lista de tokens. Usado por
 * build-tokens.mjs (src/lib/tokens.ts) e finalize-lib.mjs (dist/lib/tokens.json)
 * — os dois tinham cópias próprias e herdaram o mesmo bug.
 *
 * Só os blocos `:root` de topo carregam o valor padrão (light-first). Os
 * overrides de `:root[data-theme="dark"]` e dos @media (dark, reduced-
 * transparency, contrast) não podem vazar pro export — antes o "último vence"
 * global fazia `tokens['via-bg']` devolver o fundo do escuro.
 */

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

/** @returns {{ name: string, css: string, value: string, category: string }[]} */
export function parseTokens(css) {
  // Strip CSS comments to avoid false matches.
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');

  const rootBodies = [];
  let depth = 0;
  let selector = '';
  let bodyStart = -1;
  for (let i = 0; i < stripped.length; i++) {
    const ch = stripped[i];
    if (ch === '{') {
      if (depth === 0) {
        if (selector.trim() === ':root') bodyStart = i + 1;
        selector = '';
      }
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && bodyStart !== -1) {
        rootBodies.push(stripped.slice(bodyStart, i));
        bodyStart = -1;
      }
    } else if (depth === 0) {
      selector += ch;
    }
  }

  // Match `--name: value;`. Nome aceita `_` (half-steps tipo --via-space-0_5).
  const re = /(--[a-z0-9_-]+)\s*:\s*([^;]+);/gi;

  const seen = new Map();
  for (const body of rootBodies) {
    for (const m of body.matchAll(re)) {
      // Last definition wins (mirrors CSS cascade for the same selector).
      seen.set(m[1].trim(), m[2].trim());
    }
  }

  const tokens = [...seen.entries()].map(([fullName, value]) => ({
    name: fullName.replace(/^--/, ''),
    css: fullName,
    value,
    category: categorize(fullName, value),
  }));

  tokens.sort((a, b) =>
    a.category === b.category ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category),
  );

  return tokens;
}
