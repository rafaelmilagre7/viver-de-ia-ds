import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Compass, Search } from 'lucide-react';
import { Button } from '../lib/Button/Button';
import { microcopy } from '../content/microcopy';
import '../lib/_shared/material.css';
import '../lib/Button/Button.css';
import './not-found.css';

/* Texto canônico do 404 (src/content/microcopy.ts) · 1ª frase vira título */
const texto404 = microcopy.find((m) => m.id === 'erro-nao-encontrado')!.texto;
const corte = texto404.indexOf('. ');
const titulo = texto404.slice(0, corte + 1);
const lede = texto404.slice(corte + 2);

/* A busca (⌘K) vive no Shell, que escuta o atalho no window: o botão dispara
   o mesmo atalho em vez de duplicar a paleta aqui. */
function abrirBusca() {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
}

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <section className="vds-404">
      {/* O servidor responde 200 em qualquer URL (SPA) — o noindex tira a página do Google */}
      <title>Página não encontrada · Viver de IA Design System</title>
      <meta name="robots" content="noindex" />
      <div className="vds-404-inner">
        <span className="vds-404-pill via-liquid">
          <Compass size={16} strokeWidth={1.75} />
          404 · página não encontrada
        </span>
        <h1>{titulo}</h1>
        <p className="vds-404-lede">{lede}</p>
        <p className="vds-404-path">
          <span>endereço</span>
          <code>{pathname}</code>
        </p>
        <div className="vds-404-actions">
          <Link to="/" className="via-btn via-btn--primary via-btn--lg">
            <span className="via-btn__label">Voltar pro início</span>
            <span className="via-btn__icon"><ArrowRight size={16} strokeWidth={1.75} /></span>
          </Link>
          <Button variant="secondary" size="lg" iconLeft={<Search size={16} strokeWidth={1.75} />} onClick={abrirBusca}>
            Buscar no sistema
          </Button>
        </div>
      </div>

      {/* Big floating "404" — display tipográfico */}
      <div className="vds-404-big" aria-hidden="true">404</div>
    </section>
  );
}
