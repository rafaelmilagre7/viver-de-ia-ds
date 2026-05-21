import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './testimonial.css';

const testis = [
  {
    quote: 'Aqui eu consigo ver rapidamente onde estou perdendo venda, onde posso subir margem e onde preciso agir primeiro.',
    em: 'ver rapidamente',
    who: 'Guilherme Delorenzo',
    role: 'Founder · Efizi · E-commerce',
    initials: 'GD',
    outcome: { k: 'Decisão', v: '5×', em: 'mais rápida' },
  },
  {
    quote: 'Ela fez isso com pouquíssimas horas. Sem saber nada de código.',
    em: 'pouquíssimas horas',
    who: 'Márisson Lage Gonçalves',
    role: 'CEO · Balzani & Zimbel · Construção',
    initials: 'ML',
    outcome: { k: 'Economia', v: 'R$ 4.600', em: '/mês' },
  },
];

export default function Testimonial() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · depoimento"
        title={<>Citação <em>em Geist 24</em>, outcome ao lado.</>}
        lede="Depoimento canônico: aspas decorativas em Geist italic gigante e cinza claro no canto. Frase em primeira pessoa, italic numa palavra. Atribuição com avatar de iniciais. Outcome numérico encosta na direita, dividido por hairline."
      />

      <Section title="Card · com outcome" meta="formato editorial">
        <div className="vds-testi-stack">
          {testis.map((t) => (
            <div key={t.who} className="vds-testi">
              <span className="quote-mark">"</span>
              <p className="quote">
                {t.quote.split(t.em)[0]}<em>{t.em}</em>{t.quote.split(t.em)[1] || ''}
              </p>
              <div className="attrib">
                <span className="av">{t.initials}</span>
                <div>
                  <div className="who">{t.who}</div>
                  <div className="role">{t.role}</div>
                </div>
                <div className="outcome">
                  <span className="k">{t.outcome.k}</span>
                  <span className="v">{t.outcome.v} <em>{t.outcome.em}</em></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
