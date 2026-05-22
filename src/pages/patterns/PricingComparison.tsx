import { Check, X, Crown } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './pricing-comparison.css';

interface Tier {
  id: string;
  name: string;
  amount: string;
  per: string;
  description: string;
  recommended?: boolean;
  cta: string;
}

interface FeatureRow {
  group: string;
  feature: string;
  values: (boolean | string)[];
}

const TIERS: Tier[] = [
  { id: 'free', name: 'Free', amount: 'R$ 0', per: '/sempre', description: 'Pra começar a entender', cta: 'Começar agora' },
  { id: 'pro', name: 'Pro', amount: 'R$ 290', per: '/mês', description: 'Pra praticar com depth', recommended: true, cta: 'Assinar Pro' },
  { id: 'team', name: 'Team', amount: 'R$ 890', per: '/mês', description: 'Pra mentorar quem aprende', cta: 'Falar com vendas' },
];

const ROWS: FeatureRow[] = [
  { group: 'Comunidade', feature: 'Acesso ao Discord editorial', values: [true, true, true] },
  { group: 'Comunidade', feature: 'Encontros mensais ao vivo', values: ['1 por mês', '4 por mês', 'ilimitado'] },
  { group: 'Comunidade', feature: 'Convites pra eventos presenciais', values: [false, true, true] },
  { group: 'Mentoria', feature: 'Sessões 1:1 com mentor sênior', values: [false, '4 por mês', '8 por mês'] },
  { group: 'Mentoria', feature: 'Mentor dedicado fixo', values: [false, false, true] },
  { group: 'Mentoria', feature: 'Replay + notas das sessões', values: [false, true, true] },
  { group: 'Conteúdo', feature: 'Biblioteca de cursos completos', values: ['preview', true, true] },
  { group: 'Conteúdo', feature: 'Cases de implementação reais', values: [false, true, true] },
  { group: 'Conteúdo', feature: 'Workshops práticos hands-on', values: [false, '2 por mês', '6 por mês'] },
  { group: 'Suporte', feature: 'Suporte por email · 48h', values: [true, true, true] },
  { group: 'Suporte', feature: 'Suporte prioritário · 4h', values: [false, true, true] },
  { group: 'Suporte', feature: 'Concierge 1:1 no WhatsApp', values: [false, false, true] },
];

const PRINCIPLES = [
  { code: 'i', title: 'Diga quem é o tier', body: 'Cada plano tem 1 frase de descrição clara · "pra praticar com depth" > "tier intermediário".' },
  { code: 'ii', title: 'Valores absolutos antes de check', body: 'Quando faz diferença, mostre "4 por mês" em vez de só check · usuário compara melhor.' },
  { code: 'iii', title: 'Recommended sem grito', body: 'Card eleva e atmosphere navy intensifica · nunca cor gritante (amarelo, neon).' },
  { code: 'iv', title: 'CTA por coluna · não no fim', body: 'User decide na linha do tier · não precisa rolar pra baixo pra encontrar botão.' },
];

export default function PricingComparison() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · pricing comparison table"
        title={<>Comparar é confiável — <em>quando o lado a lado conta a verdade.</em></>}
        lede="Tabela de comparação de planos com 12+ features agrupadas. Mostra check/X explícito · valores numéricos quando relevante (4 por mês). Tier recomendado eleva o card e intensifica atmosphere navy — sem cor gritante. CTA por coluna."
      />

      <Section meta="comparação completa" title="3 tiers · 12 features agrupadas">
        <p style={{ margin: '0 0 32px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.65 }}>
          Free · Pro · Team. Cada feature é binária (check/X) ou tem valor (4 por mês, 8 horas). Grupos visuais separam Comunidade · Mentoria · Conteúdo · Suporte.
        </p>

        <div className="vds-pricing">
          <PricingTable />
        </div>
      </Section>

      <Section meta="princípios" title="como construir tabela de pricing honesta">
        <div className="vds-pricing-principles">
          {PRINCIPLES.map((p) => (
            <article key={p.code} className="vds-pricing-principle">
              <span className="vds-pricing-principle__code">{p.code}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function PricingTable() {
  const grouped: Record<string, FeatureRow[]> = {};
  for (const r of ROWS) {
    (grouped[r.group] = grouped[r.group] || []).push(r);
  }

  return (
    <div className="vds-pricing-table" role="table" aria-label="Comparação de planos">
      {/* Header row · tier cards */}
      <div className="vds-pricing-tier-spacer" aria-hidden="true" />
      {TIERS.map((t) => (
        <header key={t.id} className={`vds-pricing-tier ${t.recommended ? 'is-recommended' : ''}`}>
          <div className="vds-pricing-tier__head">
            <span className="vds-pricing-tier__name">{t.name}</span>
            {t.recommended && (
              <span className="vds-pricing-tier__badge">
                <Crown size={11} strokeWidth={2.2} />
                recomendado
              </span>
            )}
          </div>
          <p className="vds-pricing-tier__desc">{t.description}</p>
          <div className="vds-pricing-tier__price">
            <span className="vds-pricing-tier__amount">{t.amount}</span>
            <span className="vds-pricing-tier__per">{t.per}</span>
          </div>
          <div className="vds-pricing-tier__cta">
            <Button size="md" variant={t.recommended ? 'primary' : 'secondary'}>
              {t.cta}
            </Button>
          </div>
        </header>
      ))}

      {/* Feature rows agrupadas */}
      {Object.entries(grouped).map(([group, rows]) => (
        <div key={group} className="vds-pricing-group" role="rowgroup">
          <div className="vds-pricing-group__title">{group}</div>
          {rows.map((r, idx) => (
            <div key={`${group}-${idx}`} className="vds-pricing-row" role="row">
              <div className="vds-pricing-feature">{r.feature}</div>
              {r.values.map((v, j) => (
                <div
                  key={j}
                  className={`vds-pricing-cell ${TIERS[j].recommended ? 'is-recommended' : ''}`}
                  role="cell"
                >
                  {v === true ? (
                    <span className="vds-pricing-mark vds-pricing-mark--check" aria-label="incluído">
                      <Check size={13} strokeWidth={2.6} />
                    </span>
                  ) : v === false ? (
                    <span className="vds-pricing-mark vds-pricing-mark--x" aria-label="não incluído">
                      <X size={13} strokeWidth={1.8} />
                    </span>
                  ) : (
                    <span className="vds-pricing-value">{v}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
