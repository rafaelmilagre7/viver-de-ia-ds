#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 *
 * Lê `tests/routes.ts` e gera `public/sitemap.xml` com todas as rotas
 * do design system. Roda automaticamente via `bun run sitemap` ou
 * pode ser integrado ao `bun run build`.
 *
 * Domínio base lido de SITE_URL env ou fallback `https://viverdeia.ai/design`.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SITE_URL = (process.env.SITE_URL || 'https://viverdeia.ai/design').replace(/\/$/, '');

// Parse routes.ts via regex — sem precisar transpilar TS
const routesSrc = readFileSync(resolve(root, 'tests/routes.ts'), 'utf8');
const matches = [...routesSrc.matchAll(/path:\s*['"]([^'"]+)['"]/g)];
const paths = matches.map((m) => m[1]);

if (paths.length === 0) {
  console.error('✗ Nenhuma rota encontrada em tests/routes.ts');
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

const urlEntries = paths
  .map((path) => {
    const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
    const priority = path === '/' ? '1.0' : '0.7';
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
console.log(`✓ public/sitemap.xml · ${paths.length} URLs · ${SITE_URL}`);
