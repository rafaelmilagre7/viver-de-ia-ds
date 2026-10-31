import { Check, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './pricing.css';

const tiers = [
  {
    name: 'Standard',
    price: '[valor]',
    desc: 'Acesso aos [N] dias da conferência.',
    items: ['Coffee & almoço', 'Materiais digitais', 'Networking aberto'],
    cta: 'Comprar',
  },
  {
    name: 'Pro',
    price: '[valor]',
    desc: 'Standard + workshops + jantar.',
    items: ['3 workshops práticos', 'Jantar de networking', 'Gravações pós-evento', 'Material impresso'],
    cta: 'Comprar Pro',
    feat: true,
    badge: 'Mais escolhido',
  },
  {
    name: 'VIP',
    price: '[valor]',
    desc: 'Pro + mesa redonda fechada.',
    items: ['Mesa VIP com palestrantes', 'Encontro com mentores', 'After-party', 'Lounge exclusivo'],
    cta: 'Comprar VIP',
  },
];

export default function Pricing() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · preços"
        title={<>Três tiers, <em>um destaque</em>.</>}
        lede="Pricing canônico — 3 tiers, o do meio em navy sólido marcado 'Mais escolhido'. R$ menor em Geist, número grande tabular, lista com check Lucide stroke. Botão é o da library: pílula navy nos laterais; branca no destaque."
      />

      <Section title="Conferência · 3 tiers" meta="featured no meio · preço de ingresso só com dado do evento">
        <div className="vds-price-grid">
          {tiers.map((t) => (
            <div key={t.name} className={`vds-tier ${t.feat ? 'feat' : ''}`}>
              {t.badge && <span className="badge">{t.badge}</span>}
              <span className="tag">{t.name}</span>
              <div className="price">
                <span className="cur">R$</span>
                <span className="num">{t.price}</span>
              </div>
              <p className="desc">{t.desc}</p>
              <ul>
                {t.items.map((i) => (
                  <li key={i}>
                    <Check size={16} strokeWidth={1.75} className="ck" />
                    {i}
                  </li>
                ))}
              </ul>
              <Button size="lg" fullWidth variant={t.feat ? 'secondary' : 'primary'} className="vds-tier-cta">
                {t.cta}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <ComparisonTableSection />
    </>
  );
}

/* ---------- Pricing comparison · side-by-side feature matrix ---------- */
function ComparisonTableSection() {
  const plans = [
    { name: 'Starter', price: '2.580', period: '/mês', desc: 'Plataforma, soluções, formações e comunidade' },
    { name: 'Pro', price: '3.780', period: '/mês', desc: 'Starter + mentoria em grupo ao vivo', highlight: true },
    { name: 'Enterprise', price: '6.180', period: '/mês', desc: 'Pro + 1 hora por mês de mentoria individual + AI Builder' },
  ];

  const groups = [
    {
      title: 'Plataforma & formações',
      rows: [
        { feat: 'Todas as soluções Plug-and-Play', vals: [true, true, true] },
        { feat: 'Formações práticas', vals: [true, true, true] },
        { feat: 'Consultor IA dentro da plataforma', vals: [true, true, true] },
        { feat: 'Trilha personalizada com IA', vals: [true, true, true] },
      ],
    },
    {
      title: 'Mentoria & implementação',
      rows: [
        { feat: 'Mentoria em grupo ao vivo', vals: [false, '10 / mês', true] },
        { feat: 'Mentoria individual', vals: [false, false, '1h / mês'] },
        { feat: 'Implementação assistida', vals: [false, false, true] },
        { feat: 'Arquiteto de soluções AI Builder', vals: [false, false, true] },
      ],
    },
    {
      title: 'Comunidade & garantia',
      rows: [
        { feat: 'Comunidade de empresários e líderes', vals: [true, true, true] },
        { feat: 'Imersão presencial na sede', vals: [true, true, true] },
        { feat: 'Garantia de 90 dias · 3 requisitos', vals: [true, true, true] },
      ],
    },
    {
      title: 'Suporte',
      rows: [
        { feat: 'Soluções premium', vals: [false, true, true] },
        { feat: 'Suporte prioritário', vals: [false, true, true] },
        { feat: 'SLA dedicado', vals: [false, false, true] },
      ],
    },
  ];

  return (
    <Section title="Comparação completa · 3 planos lado a lado" meta="14 recursos agrupados · plano destacado em navy">
      <div className="vds-cmp">
        {/* Sticky header com plans */}
        <header className="vds-cmp-head">
          <div className="vds-cmp-spacer">
            <span className="vds-cmp-eyebrow">Comparação completa</span>
            <p>Veja exatamente o que muda entre os 3 planos · sem letrinha miúda.</p>
          </div>
          {plans.map((p) => (
            <div key={p.name} className={`vds-cmp-plan ${p.highlight ? 'highlight' : ''}`}>
              {p.highlight && <span className="vds-cmp-plan-tag">Mais escolhido</span>}
              <span className="vds-cmp-plan-name">{p.name}</span>
              <div className="vds-cmp-plan-price">
                {p.price === 'sob medida' ? (
                  <span className="custom">sob medida</span>
                ) : (
                  <>
                    <span className="cur">R$</span>
                    <span className="num">{p.price}</span>
                    <span className="per">{p.period}</span>
                  </>
                )}
              </div>
              <p className="vds-cmp-plan-desc">{p.desc}</p>
              {p.price === 'sob medida' ? (
                <Button size="sm" variant="secondary" iconLeft={<MessageCircle size={16} strokeWidth={1.75} />}>
                  Falar com o time
                </Button>
              ) : (
                <Button size="sm" variant={p.highlight ? 'primary' : 'secondary'} iconRight={<ArrowRight size={16} strokeWidth={1.75} />}>
                  Começar
                </Button>
              )}
            </div>
          ))}
        </header>

        {/* Groups */}
        {groups.map((g) => (
          <div key={g.title} className="vds-cmp-group">
            <h4 className="vds-cmp-group-title">{g.title}</h4>
            <div className="vds-cmp-rows">
              {g.rows.map((r) => (
                <div key={r.feat} className="vds-cmp-row">
                  <div className="vds-cmp-feat">{r.feat}</div>
                  {r.vals.map((v, j) => (
                    <div
                      key={j}
                      className={`vds-cmp-cell ${j === 1 ? 'highlight' : ''} ${typeof v === 'string' && v !== '' ? 'text' : ''}`}
                    >
                      {v === true ? (
                        <span className="vds-cmp-mark">
                          <Check size={16} strokeWidth={1.75} />
                        </span>
                      ) : v === false ? (
                        <span className="vds-cmp-no">
                          <Minus size={16} strokeWidth={1.75} />
                        </span>
                      ) : (
                        <span className="vds-cmp-text mono">{v}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer note */}
        <footer className="vds-cmp-foot">
          <p>
            Todos os planos em contratação anual · upgrade a qualquer momento, mediante a diferença de valor. Enterprise inclui SLA dedicado e implementação assistida.
          </p>
        </footer>
      </div>
    </Section>
  );
}
