import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Layers, Terminal } from 'lucide-react';
import { navigation } from '../data/nav';
import { buildSearchIndex } from '../data/searchIndex';
import { useTheme } from '../lib/theming/theming-core';
import HeroStage from './home/HeroStage';
import SystemBento from './home/SystemBento';
import { SHOWCASES, THUMB } from './home/showcases';
import '../lib/_shared/material.css';
import '../lib/Button/Button.css';
import './home/home.css';

/* Números do sistema · contados da navegação e do índice de busca (a mesma
   fonte da barra lateral e do ⌘K). Página nova entra na conta sozinha. */
const INDEX = buildSearchIndex();
const pagesOf = (group: string) => navigation.find((g) => g.label === group)?.items ?? [];
const API_DOCS = INDEX.filter((e) => e.group === 'API docs').length;
const STATS = [
  { n: pagesOf('Fundamentos').length, label: 'fundamentos' },
  { n: API_DOCS, label: 'componentes com API' },
  { n: pagesOf('Padrões').length, label: 'padrões' },
  { n: pagesOf('Páginas-modelo').length, label: 'páginas-modelo' },
];
const SHOWCASE_LABEL = new Map(pagesOf('Páginas-modelo').map((i) => [i.to, i.label]));

export default function Home() {
  // miniatura no tema da página · só a do tema atual é baixada
  const { theme } = useTheme();

  return (
    <div className="vds-home">
      <section className="vds-home-hero" aria-labelledby="home-titulo">
        <div className="vds-home-hero-copy">
          <span className="vds-home-hero-pill via-liquid">
            <Layers size={16} strokeWidth={1.75} aria-hidden="true" />
            {INDEX.length} páginas vivas, nos dois temas
          </span>
          <h1 id="home-titulo" className="vds-home-hero-title">
            Marca editorial, <span>engenharia de precisão.</span>
          </h1>
          <p className="vds-home-hero-lede">
            O sistema de design da Viver de IA: navy profundo, vidro líquido e Geist, em
            componentes React prontos pra usar. Esta página é feita com eles.
          </p>
          <div className="vds-home-hero-actions">
            <Link to="/foundations/brand" viewTransition className="via-btn via-btn--primary via-btn--lg">
              <span className="via-btn__label">Começar pelos fundamentos</span>
              <span className="via-btn__icon"><ArrowRight size={16} strokeWidth={1.75} /></span>
            </Link>
            <a href="#paginas-modelo" className="via-btn via-btn--secondary via-btn--lg">
              <span className="via-btn__label">Ver páginas-modelo</span>
              <span className="via-btn__icon"><ArrowDown size={16} strokeWidth={1.75} /></span>
            </a>
          </div>
        </div>

        <HeroStage />

        <dl className="vds-home-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="paginas-modelo" className="vds-home-section" aria-labelledby="home-modelos">
        <header className="vds-home-section-head">
          <p className="vds-home-eyebrow">Páginas-modelo</p>
          <h2 id="home-modelos">O sistema montado em produto.</h2>
          <p>Telas inteiras e navegáveis, feitas só com os tokens e componentes daqui. Abra, clone, adapte.</p>
        </header>
        <ul className="vds-home-mosaic">
          {SHOWCASES.map((s) => {
            const to = `/showcase/${s.slug}`;
            return (
              <li key={s.slug} className={`vds-home-shot vds-home-shot--${s.slug}`}>
                <Link to={to} viewTransition className="vds-home-shot-link">
                  <span className="vds-home-shot-frame">
                    <img
                      src={`/home/${s.slug}-${theme === 'dark' ? 'dark' : 'light'}.webp`}
                      alt={s.alt}
                      width={THUMB.width}
                      height={THUMB.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="vds-home-shot-copy">
                    <span className="vds-home-shot-text">
                      <h3>{SHOWCASE_LABEL.get(to) ?? s.slug}</h3>
                      <p>{s.blurb}</p>
                    </span>
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="vds-home-section" aria-labelledby="home-sistema">
        <header className="vds-home-section-head">
          <p className="vds-home-eyebrow">O sistema</p>
          <h2 id="home-sistema">Cada camada, documentada.</h2>
          <p>Da cor ao componente: regra, exemplo e código, conferidos no claro e no escuro.</p>
        </header>
        <SystemBento apiDocs={API_DOCS} />
      </section>

      <section className="vds-home-ai via-mesh-navy" aria-labelledby="home-ia" data-on-dark>
        <div>
          <p className="vds-home-eyebrow">Usar com IA</p>
          <h2 id="home-ia">A marca inteira, em qualquer IA.</h2>
          <p className="vds-home-ai-lede">
            Prompt-mestre, kit com tokens e logos, e o plugin do Claude Code. O que a IA gerar já
            sai na paleta, na voz e no contraste da marca.
          </p>
          <div className="vds-home-ai-actions">
            <Link to="/ai" viewTransition className="via-pill-link vds-home-ai-cta">
              Ver o guia de uso com IA
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <a href="/viver-de-ia-kit.zip" download className="via-pill-link via-pill-link--on-dark">
              <Download size={16} strokeWidth={1.75} aria-hidden="true" />
              Baixar o kit (.zip)
            </a>
          </div>
          <ul className="vds-home-ai-files">
            <li><a className="vds-home-ai-file" href="/viver-de-ia-system-prompt.md" target="_blank" rel="noreferrer">prompt-mestre.md</a></li>
            <li><a className="vds-home-ai-file" href="/llms.txt" target="_blank" rel="noreferrer">llms.txt</a></li>
            <li><a className="vds-home-ai-file" href="/fatos.md" target="_blank" rel="noreferrer">fatos.md · números do negócio</a></li>
          </ul>
        </div>
        <figure className="vds-home-term">
          <figcaption>
            <Terminal size={14} strokeWidth={1.75} aria-hidden="true" />
            Claude Code · 2 comandos
          </figcaption>
          {/* cada linha quebra só nos espaços: comando nunca parte no meio */}
          <pre>
            <code>
              <span className="ln"><span className="p">&gt; </span>/plugin marketplace add <span className="nw">rafaelmilagre7/viver-de-ia-ds</span></span>
              <span className="ln"><span className="p">&gt; </span>/plugin install <span className="nw">viver-de-ia@viver-de-ia-ds</span></span>
              <span className="ln c"># os comandos /via-* já seguem a marca</span>
            </code>
          </pre>
        </figure>
      </section>
    </div>
  );
}
