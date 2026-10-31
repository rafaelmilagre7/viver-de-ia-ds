import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Compass, Gauge, Layers, MessageCircle, Target, X } from 'lucide-react';
import { BrandLogo } from '../../lib/BrandLogo/BrandLogo';
import { Pill } from '../../lib/Pill/Pill';
import { Progress } from '../../lib/Progress/Progress';
import { navigation } from '../../data/nav';

/* Bento das camadas do sistema · cada peça com um detalhe visual próprio,
   em tamanho próprio. Contagem e destino vêm da navegação (nav.ts). */

// tons da paleta restrita · a cor vem do token (home.css), o rótulo é o nome dele
const SWATCHES = ['navy', 'blue', 'gray-500', 'gray-200', 'white'];

type Tile = { group: string; area: string; title: string; body: string; extra?: string; visual: ReactNode };

export default function SystemBento({ apiDocs }: { apiDocs: number }) {
  const tiles: Tile[] = [
    {
      group: 'Fundamentos',
      area: 'fund',
      title: 'Fundamentos',
      body: 'Cor, tipografia, espaço, raio, sombra e movimento: os tokens que todo o resto herda.',
      visual: (
        <div className="vds-home-vis-fund">
          <div className="vds-home-vis-type">
            <span className="vds-home-vis-aa">Aa</span>
            <span className="vds-home-vis-mono">Geist · 100–900</span>
          </div>
          <ul className="vds-home-vis-swatches">
            {SWATCHES.map((s) => (
              <li key={s}>
                <span className={`vds-home-swatch vds-home-swatch--${s}`} />
                <span className="vds-home-vis-mono">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      group: 'Liquid Glass',
      area: 'glass',
      title: 'Liquid Glass',
      body: 'Materiais por elevação, com aro especular: claros por padrão, densos no escuro.',
      visual: (
        <div className="vds-home-vis-glass">
          <span className="vds-home-shape vds-home-shape--disk" />
          <span className="vds-home-shape vds-home-shape--ring" />
          <div className="vds-home-vis-pane">
            <span className="vds-home-vis-mono">material</span>
            <strong>chrome</strong>
          </div>
        </div>
      ),
    },
    {
      group: 'Componentes',
      area: 'comp',
      title: 'Componentes',
      body: 'Peças React com variantes, estados, acessibilidade e código.',
      extra: `${apiDocs} com API`,
      visual: (
        <div className="vds-home-vis-comp">
          <div className="vds-home-vis-comp-row">
            <span className="via-btn via-btn--primary via-btn--sm"><span className="via-btn__label">Salvar</span></span>
            <span className="via-btn via-btn--secondary via-btn--sm"><span className="via-btn__label">Cancelar</span></span>
            <Pill>rascunho</Pill>
          </div>
          <Progress value={64} size="sm" ariaLabel="Exemplo de barra de progresso" />
        </div>
      ),
    },
    {
      group: 'Iconografia',
      area: 'icon',
      title: 'Iconografia',
      body: 'Monograma, ícones Lucide e direção de foto.',
      visual: (
        <div className="vds-home-vis-icons">
          <span className="vds-home-vis-ico vds-home-vis-ico--mark"><BrandLogo monoOnly variant="white" size={18} /></span>
          {[Compass, Layers, Gauge, Target, MessageCircle].map((I, i) => (
            <span key={i} className="vds-home-vis-ico"><I size={18} strokeWidth={1.75} /></span>
          ))}
        </div>
      ),
    },
    {
      group: 'Padrões',
      area: 'padr',
      title: 'Padrões',
      body: 'Composições prontas: artigo, preços, painel, onboarding, e-mail, fluxos de conta.',
      visual: (
        <div className="vds-home-vis-patterns">
          <span className="vds-home-wire vds-home-wire--article"><i /><i /><i /><i /></span>
          <span className="vds-home-wire vds-home-wire--pricing"><i /><i /><i /></span>
          <span className="vds-home-wire vds-home-wire--dash"><i /><i /><i /><i /></span>
        </div>
      ),
    },
    {
      group: 'Diretrizes',
      area: 'dire',
      title: 'Diretrizes',
      body: 'Voz, copy e microcopy: como a marca fala.',
      visual: (
        <ul className="vds-home-vis-voice">
          <li><Check size={14} strokeWidth={2} /> “Sem conexão. O que você fez fica salvo.”</li>
          <li className="is-dont"><X size={14} strokeWidth={2} /> “Ops! Você está offline.”</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="vds-home-bento">
      {tiles.map((t) => {
        const items = navigation.find((g) => g.label === t.group)?.items ?? [];
        if (!items.length) return null;
        return (
          <Link key={t.area} to={items[0].to} viewTransition className={`vds-home-tile vds-home-tile--${t.area}`}>
            <div className="vds-home-tile-visual" aria-hidden="true">{t.visual}</div>
            <div className="vds-home-tile-copy">
              <h3 className="vds-home-tile-title">
                {t.title}
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </h3>
              <p className="vds-home-tile-body">{t.body}</p>
              <p className="vds-home-tile-meta">
                {items.length} {items.length === 1 ? 'página' : 'páginas'}
                {t.extra && ` · ${t.extra}`}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
