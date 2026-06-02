/* ============================================================
   Renderiza os templates react-email → HTML estático real.
   Saída: public/emails/<id>.html (+ .txt) + manifest.json
   Rode com bun (resolve .tsx): `bun scripts/build-emails.mjs`
   ------------------------------------------------------------
   O mostruário do site faz <iframe> desses HTMLs — então o que
   o time vê é EXATAMENTE o que cai no inbox (tabela + inline),
   não um mockup de navegador.
   ============================================================ */
import React from 'react';
import { render } from '@react-email/render';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import Welcome, { meta as welcomeMeta } from '../emails/welcome.tsx';
import Enrollment, { meta as enrollmentMeta } from '../emails/enrollment.tsx';
import Billing, { meta as billingMeta } from '../emails/billing.tsx';
import Nps, { meta as npsMeta } from '../emails/nps.tsx';
import Digest, { meta as digestMeta } from '../emails/digest.tsx';
import EventInvite, { meta as eventInviteMeta } from '../emails/event-invite.tsx';
import Recap, { meta as recapMeta } from '../emails/recap.tsx';
import Drip, { meta as dripMeta } from '../emails/drip.tsx';
import Lancamento, { meta as lancamentoMeta } from '../emails/lancamento.tsx';
import Oferta, { meta as ofertaMeta } from '../emails/oferta.tsx';
import Churn, { meta as churnMeta } from '../emails/churn.tsx';
import Winback, { meta as winbackMeta } from '../emails/winback.tsx';
import UrgentOps, { meta as urgentOpsMeta } from '../emails/urgent-ops.tsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'public/emails');

const templates = [
  [Welcome, welcomeMeta],
  [Enrollment, enrollmentMeta],
  [Billing, billingMeta],
  [Nps, npsMeta],
  [Digest, digestMeta],
  [EventInvite, eventInviteMeta],
  [Recap, recapMeta],
  [Drip, dripMeta],
  [Lancamento, lancamentoMeta],
  [Oferta, ofertaMeta],
  [Churn, churnMeta],
  [Winback, winbackMeta],
  [UrgentOps, urgentOpsMeta],
];

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const manifest = [];
let warned = false;

for (const [Comp, meta] of templates) {
  const el = React.createElement(Comp, Comp.PreviewProps);
  const html = await render(el, { pretty: true });
  const text = await render(el, { plainText: true });
  writeFileSync(resolve(out, `${meta.id}.html`), html);
  writeFileSync(resolve(out, `${meta.id}.txt`), text);

  const kb = Math.round((Buffer.byteLength(html, 'utf8') / 1024) * 10) / 10;
  const clip = kb > 102;
  if (clip) warned = true;
  // checagens de "à prova de bala"
  const hasTable = /<table/i.test(html);
  const inlineStyled = /style="/.test(html);
  // liquid glass seguro: TODO style com gradiente precisa de background-color (fallback Outlook)
  const styleAttrs = html.match(/style="[^"]*"/gi) || [];
  const grads = styleAttrs.filter((st) => /(linear|radial)-gradient/i.test(st));
  const badGlass = grads.filter((st) => !/background-color:/i.test(st));
  if (badGlass.length) warned = true;
  console.log(
    `  ${meta.id}.html · ${kb}KB${clip ? ' ⚠ >102KB' : ''} · ` +
      `tabela:${hasTable ? '✓' : '✗'} inline:${inlineStyled ? '✓' : '✗'} ` +
      `glass:${grads.length} · ${badGlass.length === 0 ? 'todos com fallback sólido ✓' : `⚠ ${badGlass.length} SEM fallback`}`,
  );

  manifest.push({ id: meta.id, name: meta.name, subject: meta.subject, when: meta.when, bytes: Buffer.byteLength(html, 'utf8') });
}

writeFileSync(resolve(out, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n✓ ${templates.length} emails → public/emails/ (+ manifest.json)`);
if (warned) console.log('⚠ algum email passou de 102KB — Gmail vai cortar.');
