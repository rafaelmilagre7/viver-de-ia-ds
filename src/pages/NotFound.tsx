import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import '../lib/_shared/material.css';
import '../lib/Button/Button.css';
import './not-found.css';

export default function NotFound() {
  return (
    <section className="vds-404">
      {/* O servidor responde 200 em qualquer URL (SPA) — o noindex tira a página do Google */}
      <title>Página não encontrada · Viver de IA Design System</title>
      <meta name="robots" content="noindex" />
      <div className="vds-404-inner">
        <span className="vds-404-pill via-liquid">
          <Compass size={14} strokeWidth={1.75} />
          404 · página não encontrada
        </span>
        <h1>
          Esse <em>caminho</em><br />
          não existe.
        </h1>
        <p>
          Talvez a seção tenha sido renomeada, ou você digitou direto. Use a barra lateral
          para voltar — todo o sistema continua exatamente onde você lembra.
        </p>
        <Link to="/" className="via-btn via-btn--primary via-btn--lg">
          <span className="via-btn__label">Voltar ao começo</span>
          <span className="via-btn__icon"><ArrowRight size={16} strokeWidth={1.75} /></span>
        </Link>
      </div>

      {/* Big floating "404" — display tipográfico */}
      <div className="vds-404-big" aria-hidden="true">404</div>
    </section>
  );
}
