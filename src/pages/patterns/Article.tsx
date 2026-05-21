import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './article.css';

const items = [
  { tag: 'Manifesto', time: '8 min', title: 'O fim da era do prompt', em: 'prompt', desc: 'Por que times de IA pararam de "prompt-engineer" e começaram a operar.', author: 'Caio Ribeiro', initials: 'CR', date: '15 mai', cover: 'navy' },
  { tag: 'Tutorial', time: '12 min', title: 'Como medir um Superagente em produção', em: 'produção', desc: '3 métricas para saber se sua IA está vendendo, não só conversando.', author: 'Equipe VIA', initials: 'EQ', date: '10 mai', cover: 'light' },
  { tag: 'Análise', time: '6 min', title: 'O Superagente que aprendeu a vender', em: 'vender', desc: 'Da hipótese ao primeiro mês em produção — o caminho da Efizi.', author: 'Caio Ribeiro', initials: 'CR', date: '02 mai', cover: 'navy' },
  { tag: 'Bastidores', time: '14 min', title: 'A semana que reescrevemos a mentoria', em: 'mentoria', desc: 'Como a turma 2026.2 forçou três decisões editoriais.', author: 'Equipe VIA', initials: 'EQ', date: '24 abr', cover: 'light' },
];

export default function Article() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · artigo"
        title={<>Capa <em>limpa</em>, headline em Geist, atribuição abaixo.</>}
        lede="Card de artigo é a unidade do diretório editorial. Capa em gradient navy ou plate cinza claro. Tag uppercase no canto, tempo de leitura. Título em Geist 19 com italic em uma palavra. Atribuição com avatar de iniciais."
      />

      <Section title="Grid de artigos" meta="2 variantes de capa">
        <div className="vds-article-grid">
          {items.map((a) => (
            <article key={a.title} className="vds-article">
              <div className={`cover ${a.cover}`}>
                <div className="cover-mark">
                  <span className="tag">{a.tag}</span>
                  <span className="time">{a.time}</span>
                </div>
              </div>
              <div className="body">
                <h3>{a.title.split(a.em)[0]}<em>{a.em}</em>{a.title.split(a.em)[1] || ''}</h3>
                <p>{a.desc}</p>
                <footer>
                  <span className="av">{a.initials}</span>
                  <span className="author">{a.author}</span>
                  <span className="date">{a.date}</span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
