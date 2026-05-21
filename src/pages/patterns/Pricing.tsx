import { Check, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './pricing.css';

const tiers = [
  {
    name: 'Standard',
    price: '1.490',
    desc: 'Acesso aos 2 dias da conferência.',
    items: ['Coffee & almoço', 'Materiais digitais', 'Networking aberto'],
    cta: 'Comprar',
  },
  {
    name: 'Pro',
    price: '2.890',
    desc: 'Standard + workshops + jantar.',
    items: ['3 workshops práticos', 'Jantar de networking', 'Gravações pós-evento', 'Material impresso'],
    cta: 'Comprar Pro',
    feat: true,
    badge: 'Mais escolhido',
  },
  {
    name: 'VIP',
    price: '5.490',
    desc: 'Pro + mesa redonda fechada.',
    items: ['Mesa VIP com Caio', 'Mentoria 1-a-1', 'After-party', 'Lounge exclusivo'],
    cta: 'Comprar VIP',
  },
];

export default function Pricing() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · pricing"
        title={<>Três tiers, <em>um destaque</em>.</>}
        lede="Pricing canônico — 3 tiers, o do meio em navy sólido marcado 'Mais escolhido'. R$ em itálico Geist, número grande tabular, lista com check Lucide stroke. Botão pílula navy nos laterais; branco no destaque."
      />

      <Section title="Conferência · 3 tiers" meta="featured no meio">
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
                    <Check size={12} strokeWidth={3} className="ck" />
                    {i}
                  </li>
                ))}
              </ul>
              <button className={t.feat ? 'btn light' : 'btn'}>{t.cta}</button>
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
    { name: 'Comunidade', price: '197', period: '/mês', desc: 'Acesso ao conteúdo + comunidade aberta' },
    { name: 'Mentoria', price: '6K', period: '/tri', desc: 'Mentoria 1:1 + acesso completo', highlight: true },
    { name: 'Corporate', price: 'sob medida', period: '', desc: 'Plano da empresa · time + Nina dedicada' },
  ];

  const groups = [
    {
      title: 'Conteúdo & comunidade',
      rows: [
        { feat: 'Acesso a todas as aulas gravadas', vals: [true, true, true] },
        { feat: 'Discord da comunidade aberta', vals: [true, true, true] },
        { feat: 'Atualizações mensais do programa', vals: [true, true, true] },
        { feat: 'Discord privado dos alunos Mentoria', vals: [false, true, true] },
      ],
    },
    {
      title: 'Mentoria & 1:1',
      rows: [
        { feat: 'Sessões 1:1 com mentor', vals: [false, '12 / tri', 'ilimitado'] },
        { feat: 'Análise do seu cenário', vals: [false, true, true] },
        { feat: 'Plano de 90 dias customizado', vals: [false, true, true] },
        { feat: 'Acompanhamento do squad', vals: [false, false, true] },
      ],
    },
    {
      title: 'Nina · seu agente',
      rows: [
        { feat: 'Nina compartilhada (Viver de IA)', vals: [true, true, true] },
        { feat: 'Nina configurada pro seu canal', vals: [false, true, true] },
        { feat: 'Nina white-label · domínio próprio', vals: [false, false, true] },
        { feat: 'Integração com seu CRM', vals: [false, false, true] },
      ],
    },
    {
      title: 'Suporte',
      rows: [
        { feat: 'Resposta no Discord da turma', vals: ['72h', '24h', '4h'] },
        { feat: 'Slack interno com Caio', vals: [false, false, true] },
        { feat: 'SLA contratual com penalidade', vals: [false, false, true] },
      ],
    },
  ];

  return (
    <Section title="Comparação completa · 3 planos side-by-side" meta="14 features agrupadas · plano destacado em navy">
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
              <button className={`vds-cmp-plan-cta ${p.highlight ? 'primary' : ''}`}>
                {p.price === 'sob medida' ? (
                  <>
                    <MessageCircle size={12} strokeWidth={2.4} />
                    Falar com o time
                  </>
                ) : (
                  <>
                    Começar
                    <ArrowRight size={12} strokeWidth={2.4} />
                  </>
                )}
              </button>
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
                          <Check size={12} strokeWidth={3} />
                        </span>
                      ) : v === false ? (
                        <span className="vds-cmp-no">
                          <Minus size={11} strokeWidth={2.4} />
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
            Trocar de plano não tem multa · faturamento pro-rata. Plano Corporate inclui contrato com SLA — falar com nosso time pra desenhar a operação.
          </p>
        </footer>
      </div>
    </Section>
  );
}
