import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import './not-found.css';

export default function NotFound() {
  return (
    <section className="vds-404 via-mesh-navy via-noise">
      <div className="vds-404-inner">
        <span className="vds-404-pill">
          <Compass size={12} strokeWidth={2} />
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
        <Link to="/" className="vds-btn primary">
          Voltar ao começo
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>

      {/* Big floating "404" — display tipográfico */}
      <div className="vds-404-big" aria-hidden="true">404</div>
    </section>
  );
}
