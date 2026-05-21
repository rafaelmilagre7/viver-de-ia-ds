import { Play, Pause } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './podcast.css';

const episodes = [
  { n: '042', date: '17 mai 2026', dur: '42min', title: 'Quando a IA vira receita: lições da Efizi', em: 'vira receita', playing: true },
  { n: '041', date: '10 mai 2026', dur: '38min', title: 'O Superagente que aprendeu a vender', em: '' },
  { n: '040', date: '03 mai 2026', dur: '51min', title: 'Por que governança separa Superagente de brinquedo', em: 'governança' },
  { n: '039', date: '26 abr 2026', dur: '46min', title: 'A semana que reescrevemos a mentoria', em: 'semana' },
];

export default function Podcast() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · podcast"
        title={<>Episódios em <em>lista</em>, número em itálico.</>}
        lede="Listing de podcast: número do episódio em Geist italic à esquerda, data + duração + título no meio, botão play à direita. O atual fica em navy@04 com border navy. Sem player embedded no listing — só toggle visual."
      />

      <Section title="Listing" meta="episode 042 tocando">
        <div className="vds-pod-stack">
          {episodes.map((e) => (
            <div key={e.n} className={`vds-pod ${e.playing ? 'playing' : ''}`}>
              <span className="num">{e.n}</span>
              <div className="meta">
                <span className="eyebrow">
                  <span>{e.date}</span><span className="sep">·</span><span>{e.dur}</span>
                </span>
                <span className="title">
                  {e.em
                    ? <>{e.title.split(e.em)[0]}<em>{e.em}</em>{e.title.split(e.em)[1] || ''}</>
                    : e.title}
                </span>
              </div>
              <span className="vds-pod-wave" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </span>
              <button className="play" aria-label={e.playing ? `Pausar ${e.title}` : `Tocar ${e.title}`}>
                {e.playing
                  ? <Pause size={14} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
                  : <Play size={14} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />}
              </button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
