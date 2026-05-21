import { Award, TrendingUp, Compass, Type, Globe } from 'lucide-react';
import './manifesto.css';

const principles = [
  {
    n: '01',
    I: TrendingUp,
    title: 'Transformação maior que ferramenta',
    body:
      'A história nunca é sobre o modelo, a stack, o framework. É sobre o que o operador consegue depois — receita, margem, autonomia. Quando precisar escolher entre mostrar a ferramenta ou mostrar o resultado humano, mostre o resultado.',
  },
  {
    n: '02',
    I: Award,
    title: 'Especialista, nunca guru',
    body:
      'A voz é a de um operador experiente compartilhando o que funciona. Não acadêmico. Não guru-bro com promessas de transformação instantânea. Confiante, sem ser estridente. Pontos finais, raramente exclamações.',
  },
  {
    n: '03',
    I: Type,
    title: 'Resultado vem com número',
    body:
      'Toda afirmação carrega uma métrica ou uma citação. +11.920 conversas, R$ 4.600/mês em economia, 100% automatizado. Números são tipografia de primeira classe — Geist 500, tabular, navy.',
  },
  {
    n: '04',
    I: Compass,
    title: 'Calma editorial, precisão técnica',
    body:
      'O ritmo lembra um caderno editorial: muito branco, hairlines em vez de bordas pesadas, espaçamento generoso. A precisão técnica aparece nos detalhes — o navy exato, o letter-spacing certo, a sombra navy-tinted.',
  },
  {
    n: '05',
    I: Globe,
    title: 'Brasilidade quente, sem clichê',
    body:
      'PT-BR é a língua-mãe. Conversa direta, "você" infinitivo, nunca "o senhor". Sem emoji, sem unicode decorativo, sem clichê visual de IA (sem cérebros brilhando, sem mãos androides, sem espaguete neural).',
  },
];

export default function Manifesto() {
  return (
    <>
      <section className="vds-manifesto-hero via-mesh-navy via-noise">
        <span className="eyebrow">Manifesto · cinco princípios</span>
        <h1>
          O que <em>nunca</em> mudou<br />desde o dia 1.
        </h1>
        <p className="lede">
          Princípios duráveis que orientam todo design da Viver de IA — antes da paleta,
          antes do código, antes do roadmap.
        </p>
      </section>

      <div className="vds-manifesto-grid">
        {principles.map((p) => (
          <article key={p.n} className="vds-principle vds-reveal">
            <header>
              <span className="num">{p.n}</span>
              <span className="ico"><p.I size={18} strokeWidth={1.8} /></span>
            </header>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
