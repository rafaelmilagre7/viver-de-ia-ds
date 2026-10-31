import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Maximize2, Settings, Heart, Shuffle, Repeat, Headphones,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './media-players.css';

export default function MediaPlayers() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · media players"
        title={
          <>
            Áudio e vídeo <em>na assinatura da marca</em>.
          </>
        }
        lede="Players autorais — mini player compacto pra rodar no canto da página, player full do podcast com waveform navy editorial, video player com chrome dark glass. Cada controle desenhado peça por peça, sem dependência de bibliotecas externas."
      />

      <MiniAudioSection />
      <FullEpisodeSection />
      <VideoPlayerSection />
    </>
  );
}

/* ---- Mini audio player ---- */
function MiniAudioSection() {
  const [playing, setPlaying] = useState(true);
  const [pos] = useState(0.42);
  return (
    <Section title="Audio player · mini compacto" meta="canto da página · sticky bottom">
      <div className="vds-media-stage">
        <div className="vds-mini">
          <div className="vds-mini-cover">
            <img src={monogramWhite} alt="" />
          </div>
          <div className="vds-mini-meta">
            <p className="ep">Episódio 042</p>
            <h3>De 6h para cliques: o case Viva Nexo</h3>
            <div className="vds-mini-track">
              <span className="bar"><span style={{ width: `${pos * 100}%` }} /></span>
              <span className="time">17:32 / 42:18</span>
            </div>
          </div>
          <div className="vds-mini-controls">
            <button aria-label="Faixa anterior" className="ctrl"><SkipBack size={16} strokeWidth={1.75} /></button>
            <button className="play" aria-label={playing ? 'Pausar' : 'Tocar'} onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={16} strokeWidth={0} style={{ fill: 'currentColor' }} /> : <Play size={16} strokeWidth={0} style={{ fill: 'currentColor' }} />}
            </button>
            <button aria-label="Próxima faixa" className="ctrl"><SkipForward size={16} strokeWidth={1.75} /></button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---- Full episode player ---- */
function FullEpisodeSection() {
  const [playing, setPlaying] = useState(true);

  // Waveform: 80 bars with varied heights
  const wave = Array.from({ length: 80 }, (_, i) => {
    const t = i / 80;
    return 0.3 + 0.7 * Math.abs(Math.sin(t * Math.PI * 4) * Math.cos(t * Math.PI * 7));
  });
  const played = 0.42;

  return (
    <Section title="Audio player · full episode" meta="podcast Viver de IA · waveform editorial">
      <div className="vds-media-stage">
        <div className="vds-fullep via-mesh-navy via-noise">
          <header>
            <div className="ep-cover">
              <img src={monogramWhite} alt="" />
            </div>
            <div className="ep-meta">
              <p className="eyebrow"><Headphones size={14} strokeWidth={1.75} /> Episódio 042 · 42min</p>
              <h2>De 6h para cliques,<br /><em>o case Viva Nexo</em>.</h2>
              <p className="lede">
                Episódio sobre o case Viva Nexo, publicado em viverdeia.ai/cases: de um relatório de 6 horas para poucos cliques, com R$&nbsp;162.000 de economia.
              </p>
              <div className="ep-attrs">
                <span className="ep-attr">
                  <span className="av">AP</span>
                  [Apresentador]
                </span>
                <span className="ep-attr">
                  <span className="av">CV</span>
                  [Convidado]
                </span>
                <span className="ep-date">[data]</span>
              </div>
            </div>
          </header>

          {/* Waveform */}
          <div className="ep-wave">
            {wave.map((h, i) => (
              <span
                key={i}
                className={`bar ${i / wave.length < played ? 'played' : ''}`}
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
          <div className="ep-times">
            <span className="now">17:32</span>
            <span className="dur">42:18</span>
          </div>

          {/* Controls */}
          <div className="ep-controls">
            <button aria-label="Aleatório" className="ctrl"><Shuffle size={16} strokeWidth={1.75} /></button>
            <button aria-label="Faixa anterior" className="ctrl"><SkipBack size={20} strokeWidth={1.75} /></button>
            <button className="play" aria-label={playing ? 'Pausar' : 'Tocar'} onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={24} strokeWidth={0} style={{ fill: 'currentColor' }} /> : <Play size={24} strokeWidth={0} style={{ fill: 'currentColor' }} />}
            </button>
            <button aria-label="Próxima faixa" className="ctrl"><SkipForward size={20} strokeWidth={1.75} /></button>
            <button aria-label="Repetir" className="ctrl"><Repeat size={16} strokeWidth={1.75} /></button>
          </div>

          {/* Secondary controls */}
          <div className="ep-secondary">
            <div className="ep-speed">
              {['0.75×', '1×', '1.25×', '1.5×', '2×'].map((s, i) => (
                <button key={s} className={i === 1 ? 'active' : ''}>{s}</button>
              ))}
            </div>
            <div className="ep-extras">
              <button aria-label="Curtir"><Heart size={16} strokeWidth={1.75} /></button>
              <button aria-label="Volume · 70%">
                <Volume2 size={16} strokeWidth={1.75} />
                <span className="vol-bar"><span style={{ width: '70%' }} /></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---- Video player ---- */
function VideoPlayerSection() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const pos = 0.28;
  return (
    <Section title="Video player · chrome dark glass" meta="aula gravada · 16:9">
      <div className="vds-media-stage">
        <div className="vds-video">
          {/* Thumbnail background */}
          <div className="vid-bg via-mesh-navy via-noise" />

          {/* Glass overlay no idle */}
          {!playing && (
            <div className="vid-idle">
              <div className="vid-idle-meta">
                <p className="eyebrow"><Headphones size={14} strokeWidth={1.75} /> Módulo 03 · Aula 04</p>
                <h2>Modelagem do seu<br /><em>primeiro agente</em>.</h2>
                <p className="lede">Caio Ribeiro · 48 min · sessão ao vivo gravada</p>
              </div>
              <button className="vid-play-big" onClick={() => setPlaying(true)} aria-label="Tocar">
                <span className="ring">
                  <Play size={32} strokeWidth={0} style={{ fill: 'currentColor' }} />
                </span>
              </button>
            </div>
          )}

          {/* Controls overlay */}
          <div className="vid-controls">
            <div className="vid-bar">
              <span className="vid-played" style={{ width: `${pos * 100}%` }} />
              <span className="vid-loaded" style={{ width: `${(pos + 0.18) * 100}%` }} />
              {/* Chapter markers */}
              <span className="vid-chapter" style={{ left: '22%' }} />
              <span className="vid-chapter" style={{ left: '48%' }} />
              <span className="vid-chapter" style={{ left: '74%' }} />
            </div>

            <div className="vid-row">
              <div className="vid-row-l">
                <button className="vid-ctrl play" aria-label={playing ? 'Pausar' : 'Tocar'} onClick={() => setPlaying(!playing)}>
                  {playing ? <Pause size={16} strokeWidth={0} style={{ fill: 'currentColor' }} /> : <Play size={16} strokeWidth={0} style={{ fill: 'currentColor' }} />}
                </button>
                <button aria-label="Faixa anterior" className="vid-ctrl"><SkipBack size={16} strokeWidth={1.75} /></button>
                <button aria-label="Próxima faixa" className="vid-ctrl"><SkipForward size={16} strokeWidth={1.75} /></button>
                <button className="vid-ctrl vol" aria-label={muted ? 'Desmutar' : 'Mutar'} onClick={() => setMuted(!muted)}>
                  {muted ? <VolumeX size={16} strokeWidth={1.75} /> : <Volume2 size={16} strokeWidth={1.75} />}
                </button>
                <span className="vid-time">13:42 / 48:24</span>
              </div>
              <div className="vid-row-r">
                <button className="vid-quality">1080p</button>
                <button aria-label="Configurações" className="vid-ctrl"><Settings size={16} strokeWidth={1.75} /></button>
                <button aria-label="Tela cheia" className="vid-ctrl"><Maximize2 size={16} strokeWidth={1.75} /></button>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="vid-watermark">
            <img src={monogramWhite} alt="" />
            <span>Viver de IA</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
