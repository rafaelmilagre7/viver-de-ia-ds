import { ArrowUpRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './case-card.css';

const cases = [
  {
    company: 'Efizi',
    sector: 'E-commerce',
    headline: '+11.920 conversas analisadas para elevar performance comercial',
    stat: { v: '+11.920', l: 'conversas' },
    quote: '"Ela fez isso com pouquíssimas horas. Sem saber nada."',
    author: 'Márisson Lage Gonçalves',
  },
  {
    company: 'Balzani & Zimbel',
    sector: 'Construção',
    headline: 'R$ 4.600/mês em economia e 100% da operação centralizada',
    stat: { v: 'R$ 4.600', l: '/mês' },
    quote: '"A operação já dá conta de duplicar."',
    author: 'Guilherme Delorenzo',
  },
];

export default function CaseCard() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · case card"
        title={<>Headline <em>com métrica</em>, citação no rodapé.</>}
        lede="Case card é o cartão-âncora do diretório de cases. Headline em Geist 22, métrica em destaque, citação atribuída em itálico. Hover lift discreto, link 'Ler case' uppercase."
      />

      <Section title="Padrão" meta="company · sector · headline · stat · quote">
        <div className="via-case-grid">
          {cases.map((c) => (
            <article key={c.company} className="via-case">
              <header>
                <span className="company">{c.company}</span>
                <span className="sector">{c.sector}</span>
              </header>
              <h3>{c.headline}</h3>
              <div className="stat">
                <span className="v">{c.stat.v}</span>
                <span className="l">{c.stat.l}</span>
              </div>
              <blockquote>
                {c.quote}
                <cite>— {c.author}</cite>
              </blockquote>
              <a className="link">
                Ler case <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
