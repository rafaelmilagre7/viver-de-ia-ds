import { ArrowUpRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './case-card.css';

const cases = [
  {
    company: 'Viva Nexo',
    sector: 'Saúde',
    headline: 'De 6h para cliques: Viva Nexo economiza R$ 162.000 com IA',
    stat: { v: 'R$ 162.000', l: 'economia' },
    quote: '“[Trecho do depoimento, nas palavras do cliente]”',
    author: '[Nome] · [cargo]',
  },
  {
    company: 'Trivia Studio',
    sector: 'Agência',
    headline: 'De processos manuais a R$ 120.000 de economia anual',
    stat: { v: 'R$ 120.000', l: '/ano' },
    quote: '“[Frase curta do cliente sobre o resultado]”',
    author: '[Nome] · [cargo]',
  },
];

export default function CaseCard() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · case card"
        title={<>Headline <em>com métrica</em>, citação no rodapé.</>}
        lede="Case card é o cartão-âncora do diretório de cases. Headline em Geist 24, métrica em destaque, citação atribuída em reto — ênfase por peso e cor. Hover lift discreto, link 'Ler case' com seta."
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
                Ler case <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
