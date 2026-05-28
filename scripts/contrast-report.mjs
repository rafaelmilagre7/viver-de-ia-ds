import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'contrast-out');
if (!fs.existsSync(OUT)) {
  console.log('Sem contrast-out/ — rode a suite primeiro.');
  process.exit(0);
}

const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
let totalRoutes = 0;
let routesWithFails = 0;
let totalFails = 0;
const byTheme = { light: { routes: 0, fails: 0 }, dark: { routes: 0, fails: 0 } };
const offenders = [];

for (const f of files) {
  const data = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
  totalRoutes++;
  if (data.fails > 0) {
    routesWithFails++;
    totalFails += data.fails;
    byTheme[data.theme].routes++;
    byTheme[data.theme].fails += data.fails;
    offenders.push(data);
  }
}

offenders.sort((a, b) => b.fails - a.fails);

console.log('\n══════════ CONTRAST AUDIT (axe-core color-contrast) ══════════');
console.log(`Auditorias (rota×tema): ${totalRoutes}`);
console.log(`Aprovadas (0 fails):    ${totalRoutes - routesWithFails}`);
console.log(`Com falhas:             ${routesWithFails}`);
console.log(`Total de elementos:     ${totalFails}`);
console.log(`  · light: ${byTheme.light.fails} fails em ${byTheme.light.routes} rotas`);
console.log(`  · dark:  ${byTheme.dark.fails} fails em ${byTheme.dark.routes} rotas`);
const pct = totalRoutes ? (((totalRoutes - routesWithFails) / totalRoutes) * 100).toFixed(2) : '0';
console.log(`Score (rotas limpas):   ${pct}%`);
console.log('───────────────────────────────────────────────────────────');

for (const o of offenders) {
  console.log(`\n● ${o.theme.toUpperCase()} ${o.path} — ${o.fails} fail(s)`);
  for (const it of o.items) {
    console.log(`    ${it.target}`);
    console.log(`      ${it.html}`);
    const m = it.summary.match(/contrast of [\d.]+:1.*?(?=\bExpected|$)/i);
    console.log(`      ${m ? m[0].trim() : it.summary}`);
  }
}
console.log('\n═══════════════════════════════════════════════════════════\n');
