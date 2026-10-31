import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './testimonial.css';

const testis = [
  {
    quote: '[Depoimento em primeira pessoa · frase real do cliente, com autorização por escrito e uma expressão em destaque.]',
    em: 'frase real do cliente',
    who: '[Nome]',
    role: '[cargo] · Place Dreams · Tecnologia',
    initials: 'N',
    outcome: { k: 'Economia', v: 'R$ 42.000', em: '/ano' },
  },
  {
    quote: '[Frase curta dita pelo cliente, sem retoque.]',
    em: 'sem retoque',
    who: '[Nome do cliente]',
    role: '[cargo] · Trivia Studio · Agência',
    initials: 'N',
    outcome: { k: 'Economia', v: 'R$ 120.000', em: '/ano' },
  },
];

export default function Testimonial() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · depoimento"
        title={<>Citação <em>em Geist 24</em>, outcome ao lado.</>}
        lede="Depoimento canônico: aspas decorativas em Geist Display gigantes e cinza claro no canto. Frase em primeira pessoa, destaque de cor numa expressão. Atribuição com avatar de iniciais. Outcome numérico encosta na direita, dividido por hairline."
      />

      <Section title="Card · com resultado" meta="formato editorial">
        <div className="vds-testi-stack">
          {testis.map((t) => (
            <div key={t.who} className="vds-testi">
              <span className="quote-mark">&rdquo;</span>
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
