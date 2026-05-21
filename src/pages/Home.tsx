import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Layers } from 'lucide-react';
import './pages.css';

const sections = [
  {
    eyebrow: 'Fundamentos',
    title: 'Tokens da marca',
    body: 'Cores, tipografia, espaçamento, raios, sombras e movimento — a base de tudo.',
    to: '/foundations/brand',
  },
  {
    eyebrow: 'Liquid Glass',
    title: 'Textura assinatura',
    body: 'A camada de vidro líquido que dá à marca seu acabamento — anatomia, variantes, contexto.',
    to: '/glass/anatomy',
  },
  {
    eyebrow: 'Iconografia',
    title: 'Marcas, ícones, foto',
    body: 'O monograma VIA, o sistema Lucide e a direção fotográfica fria-editorial.',
    to: '/iconography/marks',
  },
  {
    eyebrow: 'Componentes',
    title: '24 blocos vivos',
    body: 'Botões, cards, modais, formulários, tabelas — cada um com variantes, estados e código.',
    to: '/components/buttons',
  },
  {
    eyebrow: 'Padrões',
    title: 'Composições editoriais',
    body: 'Patterns recorrentes: artigo, pricing, depoimento, dashboard, onboarding.',
    to: '/patterns/article',
  },
  {
    eyebrow: 'Páginas-modelo',
    title: 'O DS em produto',
    body: 'Marketing site, conferência Leaders AI e área do aluno — full-screen, navegáveis.',
    to: '/showcase/marketing',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO atmosférica navy com mesh + noise + glow */}
      <section className="vds-home-hero via-mesh-navy via-noise">
        <span className="vds-home-hero-pill">
          <Layers size={12} strokeWidth={2} />
          Versão 0.1 · 49 páginas vivas
        </span>
        <h1 className="vds-home-hero-title">
          Marca editorial,<br />
          engenharia <em>de precisão</em>.
        </h1>
        <p className="vds-home-hero-lede">
          O sistema de design da Viver de IA. Navy profundo, vidro líquido e tipografia Geist
          compõem o tom: especialista, acessível, sem ruído. Use como referência — ou copie
          direto pro código.
        </p>
        <div className="vds-home-hero-actions">
          <Link to="/foundations/brand" className="vds-btn primary">
            Começar pelos fundamentos <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
          <Link to="/showcase/marketing" className="vds-btn ghost-light">
            Ver páginas-modelo <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Stats inline glass-dark */}
        <div className="vds-home-hero-stats">
          {[
            { n: '11', l: 'Fundamentos' },
            { n: '24', l: 'Componentes' },
            { n: '8', l: 'Padrões' },
            { n: '3', l: 'Páginas-modelo' },
          ].map((s) => (
            <div key={s.l} className="vds-home-hero-stat">
              <span className="num">{s.n}</span>
              <span className="lbl">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sections grid em liquid glass */}
      <div className="vds-home-grid via-noise">
        {sections.map((s) => (
          <Link key={s.to} to={s.to} className="vds-home-card vds-reveal">
            <p className="vds-eyebrow">{s.eyebrow}</p>
            <h3 className="vds-home-card-title">{s.title}</h3>
            <p className="vds-home-card-body">{s.body}</p>
            <span className="vds-home-card-arrow" aria-hidden="true">
              <ArrowRight size={14} strokeWidth={2.4} />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
