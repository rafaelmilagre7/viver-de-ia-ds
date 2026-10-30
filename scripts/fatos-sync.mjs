#!/usr/bin/env node
/**
 * Ficha de fatos do negócio · lê o site oficial (viverdeia.ai) e grava:
 *   public/fatos.json   · máquina (servido em viver-de-ia-ds.vercel.app/fatos.json)
 *   public/fatos.md     · pra IA ler (servido em viver-de-ia-ds.vercel.app/fatos.md)
 *   plugins/viver-de-ia/skills/viver-de-ia-design/fatos.md · cópia que vai no plugin e no kit
 *
 * Fonte única dos números que as IAs podem usar em peça. Roda todo dia pela
 * GitHub Action `fatos.yml`. Só grava quando algum fato muda (data = última mudança).
 * Se uma frase sumir do site, o fato antigo fica marcado "conferir" (nunca inventa valor).
 *
 * Uso: node scripts/fatos-sync.mjs [--check]   (--check só lê e mostra, não grava)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://viverdeia.ai';
const JSON_OUT = resolve(root, 'public/fatos.json');
const MD_OUTS = [resolve(root, 'public/fatos.md'), resolve(root, 'plugins/viver-de-ia/skills/viver-de-ia-design/fatos.md')];
const CHECK = process.argv.includes('--check');

async function page(path) {
  const res = await fetch(SITE + path, { headers: { 'user-agent': 'viver-de-ia-ds/fatos-sync' } });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  const html = await res.text();
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, ' ');
  return { html, text };
}

const num = (s) => Number(String(s).replace(/\./g, ''));
const brl = (n) => 'R$ ' + n.toLocaleString('pt-BR');

/** Cada fato: de qual página, como achar e como vira frase pronta pra peça. */
const FATOS = [
  { id: 'cases', rotulo: 'Cases reais de implementação', pagina: '/cases',
    achar: (t) => t.match(/(\d[\d.]*)\s+cases reais/)?.[1], valor: num,
    frase: (v) => `${v} cases reais de implementação de IA em empresas brasileiras` },
  { id: 'solucoes', rotulo: 'Soluções prontas na plataforma', pagina: '/',
    achar: (t) => t.match(/(\d+)\s+soluções prontas/)?.[1], valor: num,
    frase: (v) => `${v} soluções de IA prontas para usar` },
  { id: 'setores', rotulo: 'Setores com implementação', pagina: '/experiencia',
    achar: (t) => t.match(/(\d+)\s+setores já transformados/)?.[1], valor: num,
    frase: (v) => `${v} setores já transformados com IA` },
  { id: 'plano-starter', rotulo: 'Plano Starter', pagina: '/planos',
    achar: (t) => t.match(/Starter\s*—\s*R\$\s?([\d.]+) por mês/)?.[1], valor: num,
    frase: (v) => `Starter: ${brl(v)} por mês, em contratação anual` },
  { id: 'plano-pro', rotulo: 'Plano Pro', pagina: '/planos',
    achar: (t) => t.match(/Pro\s*—\s*R\$\s?([\d.]+) por mês/)?.[1], valor: num,
    frase: (v) => `Pro: ${brl(v)} por mês, em contratação anual · inclui mentoria em grupo` },
  { id: 'plano-enterprise', rotulo: 'Plano Enterprise', pagina: '/planos',
    achar: (t) => t.match(/Enterprise\s*—\s*R\$\s?([\d.]+) por mês/)?.[1], valor: num,
    frase: (v) => `Enterprise: ${brl(v)} por mês, em contratação anual · inclui mentoria individual` },
  { id: 'mentoria-grupo-pro', rotulo: 'Mentoria em grupo no Pro', pagina: '/planos',
    achar: (t) => [...t.matchAll(/(\d+) check-ins\/mês de mentoria em grupo/g)][0]?.[1], valor: num,
    frase: (v) => `${v} check-ins por mês de mentoria em grupo no plano Pro` },
  { id: 'mentoria-individual-enterprise', rotulo: 'Mentoria individual no Enterprise', pagina: '/planos',
    achar: (t) => t.match(/(\d+) hora por mês de mentoria individual/)?.[1], valor: num,
    frase: (v) => `${v} hora por mês de mentoria individual no plano Enterprise` },
  { id: 'garantia', rotulo: 'Garantia', pagina: '/faq',
    achar: (t) => t.match(/(Devolvemos 100% do investimento se, em \d+ dias,[^.]+\.\s*Para ter direito,[^.]+\.)/)?.[1], valor: (s) => s.trim(),
    frase: (v) => `${v} Condições completas na cláusula 7 dos termos de uso.` },
  { id: 'meta', rotulo: 'Meta pública (não é resultado)', pagina: '/experiencia',
    achar: (t) => t.match(/R\$ ?1 bilhão em receita e economia/)?.[0], valor: (s) => s,
    frase: () => 'Meta: gerar R$ 1 bilhão em receita e economia para empresas com IA (é meta, não resultado)' },
];

/** Divergências do próprio site · aparecem na ficha pra alguém corrigir lá. */
const DIVERGENCIAS = [
  { pagina: '/experiencia', achar: (t) => t.match(/(\d[\d.]*)\s+cases reais/)?.[1],
    comparar: (v, f) => f.cases && num(v) !== f.cases.valor ? `/experiencia diz ${v} cases; /cases diz ${f.cases.valor}` : null },
  { pagina: '/faq', achar: (t) => (/ilimitada no Enterprise/.test(t) ? 'ilimitada' : null),
    comparar: (v, _f, t) => (v && /50 check-ins\/mês/.test(t) ? 'mentoria em grupo do Enterprise: /planos diz 50 check-ins/mês, /faq diz ilimitada' : null), precisa: '/planos' },
];

async function liderança(html) {
  const pessoas = [];
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const walk = (o) => {
        if (Array.isArray(o)) return o.forEach(walk);
        if (o && typeof o === 'object') {
          if (o['@type'] === 'Person' && o.name && o.jobTitle) pessoas.push(`${o.name} · ${o.jobTitle}`);
          Object.values(o).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch { /* bloco inválido: ignora */ }
  }
  return [...new Set(pessoas)];
}

const anterior = existsSync(JSON_OUT) ? JSON.parse(readFileSync(JSON_OUT, 'utf8')) : { fatos: [] };
const antes = Object.fromEntries((anterior.fatos ?? []).map((f) => [f.id, f]));
const hoje = new Date().toISOString().slice(0, 10);
const cache = {};
const ler = async (p) => (cache[p] ??= await page(p).catch((e) => ({ erro: e.message })));

const fatos = [];
const avisos = [];
for (const f of FATOS) {
  const pg = await ler(f.pagina);
  const bruto = pg.erro ? null : f.achar(pg.text);
  if (bruto != null) {
    const valor = f.valor(bruto);
    const mudou = antes[f.id] && antes[f.id].valor !== valor;
    fatos.push({ id: f.id, rotulo: f.rotulo, valor, frase: f.frase(valor), fonte: SITE + f.pagina,
      lido_em: hoje, desde: mudou || !antes[f.id] ? hoje : antes[f.id].desde ?? hoje, status: 'ok' });
  } else if (antes[f.id]) {
    fatos.push({ ...antes[f.id], status: 'conferir' });
    avisos.push(`${f.id}: não achei a frase em ${f.pagina}${pg.erro ? ` (${pg.erro})` : ''} — mantive o valor de ${antes[f.id].lido_em}`);
  } else {
    avisos.push(`${f.id}: não achei a frase em ${f.pagina}${pg.erro ? ` (${pg.erro})` : ''}`);
  }
}
const porId = Object.fromEntries(fatos.map((f) => [f.id, f]));
const divergencias = [];
for (const d of DIVERGENCIAS) {
  const pg = await ler(d.pagina);
  const extra = d.precisa ? (await ler(d.precisa)).text ?? '' : '';
  const v = pg.erro ? null : d.achar(pg.text);
  const msg = v != null ? d.comparar(v, porId, extra) : null;
  if (msg) divergencias.push(msg);
}
const home = await ler('/');
const pessoas = home.erro ? anterior.lideranca ?? [] : await liderança(home.html);

const json = { atualizado_em: hoje, fonte: SITE, lideranca: pessoas, fatos, divergencias, avisos };

const md = `# Fatos do negócio · Viver de IA

Fonte única dos números que podem ir numa peça (post, anúncio, email, landing, deck).
Lido automaticamente do site oficial (${SITE}) todo dia · última mudança: **${hoje}**.
Versão sempre atual: https://viver-de-ia-ds.vercel.app/fatos.md

**Regra:** número, preço, prazo, garantia ou condição comercial só se estiver nesta ficha
(use a frase pronta). Fora dela → placeholder (\`[N]\`, \`R$ [valor]\`, \`[condições da garantia]\`)
ou pergunte. Item marcado "conferir" não vai em peça até alguém confirmar.

## Fatos

${fatos.map((f) => `- **${f.rotulo}** — ${f.frase}${f.status !== 'ok' ? ' · ⚠ conferir' : ''}  \n  fonte: ${f.fonte} · lido em ${f.lido_em}`).join('\n')}

## Liderança (site oficial)

${pessoas.map((p) => `- ${p}`).join('\n') || '- (não encontrada na última leitura)'}
${divergencias.length ? `\n## Divergências no próprio site (corrigir lá antes de usar)\n\n${divergencias.map((d) => `- ${d}`).join('\n')}\n` : ''}
## Fora desta ficha (não use como fato)

Números de casos individuais, conversas da Nina, alunos formados, vagas, datas e locais de evento:
só com o dado vindo de quem pediu a peça.
`;

console.log(`fatos: ${fatos.filter((f) => f.status === 'ok').length}/${FATOS.length} lidos · ${divergencias.length} divergência(s) · ${avisos.length} aviso(s)`);
for (const a of avisos) console.log('  aviso:', a);
for (const d of divergencias) console.log('  divergência:', d);
const essencia = (j) => JSON.stringify([j.lideranca, (j.fatos ?? []).map((f) => [f.id, f.valor, f.status]), j.divergencias]);
const mudou = essencia(json) !== essencia(anterior);
if (CHECK) {
  for (const f of fatos) console.log(`  ${f.id}: ${f.frase}`);
  console.log(mudou ? 'mudou em relação à ficha gravada' : 'igual à ficha gravada');
} else if (!mudou) {
  console.log('nada mudou no site · ficha mantida');
} else {
  writeFileSync(JSON_OUT, JSON.stringify(json, null, 2) + '\n');
  for (const p of MD_OUTS) writeFileSync(p, md);
}
