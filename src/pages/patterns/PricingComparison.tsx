import { Check, X, Crown } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Pill } from '../../lib/Pill/Pill';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

interface Tier {
  id: string;
  name: string;
  price: string;
  billing: string;
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
  { id: 'free', name: 'Free', price: 'R$ 0', billing: '/sempre', description: 'Pra começar a entender', cta: 'Começar agora' },
  { id: 'pro', name: 'Pro', price: 'R$ 290', billing: '/mês', description: 'Pra praticar com depth', recommended: true, cta: 'Assinar Pro' },
  { id: 'team', name: 'Team', price: 'R$ 890', billing: '/mês', description: 'Pra mentorar quem aprende', cta: 'Falar com vendas' },
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

export default function PricingComparison() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · pricing comparison table"
        title={<>Comparar é confiável — <em>quando o lado a lado conta a verdade.</em></>}
        lede="Tabela de comparação de planos com 12+ features agrupadas. Mostra check/X explícito · valores numéricos quando relevante (4 por mês). Tier recomendado com destaque sutil (não amarelo). Header sticky em scroll. CTA por coluna."
      />

      <Section
        meta="comparação completa"
        title="3 tiers · 12 features agrupadas">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Free · Pro · Team. Cada feature é binária (check/X) ou tem valor (4 por mês, 8 horas). Grupos visuais separam Comunidade · Mentoria · Conteúdo · Suporte.</p>
        <div style={{ overflow: 'auto', borderRadius: 14, border: '1px solid var(--via-border)', background: 'var(--via-surface-1)' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: 720,
            }}
          >
            <thead>
              <tr>
                <th style={thStyle('feature')} />
                {TIERS.map((t) => (
                  <th key={t.id} style={thStyle('tier', t.recommended)}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '24px 16px 20px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <strong style={{ fontSize: 16, color: 'var(--via-text-primary)' }}>{t.name}</strong>
                        {t.recommended && <Pill variant="default" size="sm" iconLeft={<Crown size={11} />}>recomendado</Pill>}
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--via-text-muted)', fontWeight: 400 }}>{t.description}</p>
                      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: 28, color: 'var(--via-text-primary)', letterSpacing: -0.5, fontWeight: 600 }}>{t.price}</span>
                        <span style={{ fontSize: 12, color: 'var(--via-text-muted)' }}>{t.billing}</span>
                      </div>
                      <Button size="sm" variant={t.recommended ? 'primary' : 'secondary'} style={{ marginTop: 8, width: 'fit-content' }}>
                        {t.cta}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderGrouped(ROWS, TIERS.map((t) => t.recommended))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section meta="princípios" title="como construir tabela de pricing honesta">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="vds-card vds-card--glass" style={{ padding: 20 }}>
              <Pill variant="default" size="sm">{p.code}</Pill>
              <h3 style={{ margin: '12px 0 6px', fontSize: 15, color: 'var(--via-text-primary)' }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--via-text-muted)', lineHeight: 1.65 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

const PRINCIPLES = [
  { code: 'i', title: 'Diga quem é o tier', body: 'Cada plano tem 1 frase de descrição clara · "pra praticar com depth" > "tier intermediário".' },
  { code: 'ii', title: 'Valores absolutos antes de check', body: 'Quando faz diferença, mostre "4 por mês" em vez de só check · usuário compara melhor.' },
  { code: 'iii', title: 'Recommended sem grito', body: 'Pill discreta + bg ligeiramente diferente · nunca cor gritante (amarelo, neon).' },
  { code: 'iv', title: 'Sticky header no scroll', body: 'Tabela longa preserva contexto do tier ativo · header de planos fica visível.' },
  { code: 'v', title: 'CTA por coluna · não no fim', body: 'User decide na linha do tier · não precisa rolar pra baixo pra encontrar botão.' },
];

function thStyle(kind: 'feature' | 'tier', recommended?: boolean): React.CSSProperties {
  return {
    background: recommended ? 'linear-gradient(180deg, var(--via-navy-04, rgba(10,31,59,0.04)) 0%, var(--via-surface-1) 100%)' : 'var(--via-surface-1)',
    textAlign: 'left',
    padding: kind === 'feature' ? '24px 20px' : 0,
    borderBottom: '1px solid var(--via-border)',
    borderLeft: kind === 'tier' && recommended ? '1px solid var(--via-text-primary, var(--via-navy))' : undefined,
    borderRight: kind === 'tier' && recommended ? '1px solid var(--via-text-primary, var(--via-navy))' : undefined,
    fontWeight: 600,
    fontSize: 13,
    color: 'var(--via-text-primary)',
    verticalAlign: 'top',
    position: 'sticky',
    top: 0,
    zIndex: 2,
  };
}

function renderGrouped(rows: FeatureRow[], recommendedFlags: (boolean | undefined)[]) {
  const grouped = rows.reduce<Record<string, FeatureRow[]>>((acc, r) => {
    (acc[r.group] = acc[r.group] || []).push(r);
    return acc;
  }, {});

  return Object.entries(grouped).flatMap(([group, items]) => [
    <tr key={`g-${group}`}>
      <td colSpan={4} style={{ padding: '20px 20px 8px', textTransform: 'uppercase', letterSpacing: 0.6, fontSize: 11, color: 'var(--via-text-muted)' }}>
        {group}
      </td>
    </tr>,
    ...items.map((r, idx) => (
      <tr key={`${group}-${idx}`}>
        <td style={{ padding: '12px 20px', fontSize: 13, color: 'var(--via-text-body)', borderBottom: '1px solid var(--via-border)' }}>
          {r.feature}
        </td>
        {r.values.map((v, j) => (
          <td
            key={j}
            style={{
              padding: '12px 20px',
              fontSize: 13,
              color: v === false ? 'var(--via-text-muted)' : 'var(--via-text-body)',
              borderBottom: '1px solid var(--via-border)',
              borderLeft: recommendedFlags[j] ? '1px solid var(--via-text-primary, var(--via-navy))' : undefined,
              borderRight: recommendedFlags[j] ? '1px solid var(--via-text-primary, var(--via-navy))' : undefined,
              background: recommendedFlags[j] ? 'var(--via-navy-02, rgba(10,31,59,0.025))' : undefined,
            }}
          >
            {v === true ? (
              <Check size={15} strokeWidth={2.2} color="var(--via-text-primary)" />
            ) : v === false ? (
              <X size={14} strokeWidth={1.6} color="var(--via-text-muted)" />
            ) : (
              <span>{v}</span>
            )}
          </td>
        ))}
      </tr>
    )),
  ]);
}
