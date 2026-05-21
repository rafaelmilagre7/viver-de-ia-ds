import { ArrowRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './empty.css';

function EditorialMark() {
  return (
    <svg className="vds-empty-mark" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="emp-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--via-navy)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--via-blue)" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="78" fill="none" stroke="url(#emp-g)" strokeWidth="1.5" opacity="0.32" />
      <circle cx="100" cy="100" r="56" fill="none" style={{ stroke: "var(--via-navy)" }} strokeWidth="1" strokeDasharray="3 5" opacity="0.30" />
      <line x1="100" y1="40" x2="100" y2="160" style={{ stroke: "var(--via-navy)" }} strokeWidth="1" opacity="0.40" />
      <line x1="40" y1="100" x2="160" y2="100" style={{ stroke: "var(--via-navy)" }} strokeWidth="1" opacity="0.40" />
      <polygon points="100,72 108,100 100,128 92,100" fill="url(#emp-g)" />
      <polygon points="72,100 100,92 128,100 100,108" fill="url(#emp-g)" opacity="0.7" />
      <circle cx="100" cy="40" r="2.5" style={{ fill: "var(--via-navy)" }} />
      <circle cx="100" cy="160" r="2.5" style={{ fill: "var(--via-navy)" }} opacity="0.40" />
      <circle cx="40" cy="100" r="2.5" style={{ fill: "var(--via-navy)" }} opacity="0.40" />
      <circle cx="160" cy="100" r="2.5" style={{ fill: "var(--via-navy)" }} opacity="0.40" />
    </svg>
  );
}

export default function Empty() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · empty state"
        title={<>Vazio também é <em>resposta</em>.</>}
        lede="Empty states ocupam o espaço inteiro do componente. Uma marca editorial geométrica navy, headline em Geist, descrição em Inter, e um CTA pílula. Sem ilustração desenhada, sem mascote — só geometria precisa da marca."
      />

      <Section title="Padrão · feedback" meta="marca geométrica · headline · cta">
        <div className="vds-empty">
          <EditorialMark />
          <h3>Nenhum case com esse filtro.</h3>
          <p>Tente outro setor, remova um filtro, ou veja os 206 cases publicados sem filtro.</p>
          <button className="cta">
            Ver todos os cases
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </Section>

      <Section title="Sem dados ainda" meta="cenário inicial">
        <div className="vds-empty soft">
          <EditorialMark />
          <h3>Você ainda não publicou um case.</h3>
          <p>Quando publicar o primeiro, ele aparece aqui. Dura ~10 minutos: empresa, setor, headline com métrica e quote do operador.</p>
          <button className="cta">
            Publicar primeiro case
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </Section>
    </>
  );
}
