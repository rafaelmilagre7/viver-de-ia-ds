import BrandLogo from '../components/BrandLogo';

export default function Footer() {
  return (
    <footer className="vds-footer">
      <div className="vds-footer-inner">
        <div className="vds-footer-brand-col">
          <BrandLogo variant="auto" size="sm" />
          <p className="vds-footer-tag">
            Design System · uma marca editorial,<br />engenharia de precisão.
          </p>
        </div>

        <div className="vds-footer-cols">
          <div className="vds-footer-col">
            <p className="vds-footer-h">Sistema</p>
            <ul>
              <li><a href="/foundations/brand">Fundamentos</a></li>
              <li><a href="/glass/anatomy">Liquid Glass</a></li>
              <li><a href="/iconography/marks">Iconografia</a></li>
              <li><a href="/components/buttons">Componentes</a></li>
              <li><a href="/patterns/article">Padrões</a></li>
            </ul>
          </div>

          <div className="vds-footer-col">
            <p className="vds-footer-h">Marca</p>
            <ul>
              <li><a href="/manifesto">Manifesto</a></li>
              <li><a href="/guidelines/voice">Voz &amp; tom</a></li>
              <li><a href="/guidelines/copy">Copy patterns</a></li>
              <li><a href="/guidelines/dos-donts">Do's &amp; Don'ts</a></li>
            </ul>
          </div>

          <div className="vds-footer-col">
            <p className="vds-footer-h">Produto</p>
            <ul>
              <li><a href="/showcase/marketing">Marketing site</a></li>
              <li><a href="/showcase/leaders-ai">Leaders AI</a></li>
              <li><a href="/showcase/aluno">Área do aluno</a></li>
              <li><a href="https://viverdeia.ai" target="_blank" rel="noreferrer">viverdeia.ai ↗</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="vds-footer-bottom">
        <span>Versão 0.5 · em evolução</span>
        <span className="vds-footer-bottom-dot">·</span>
        <span>107 páginas vivas</span>
        <span className="vds-footer-bottom-dot">·</span>
        <span>Geist (Vercel) + Liquid Glass</span>
        <span className="vds-footer-bottom-meta">
          São Paulo · Estabelecida 2023
        </span>
      </div>
    </footer>
  );
}
