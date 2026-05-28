import { ChevronRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './breadcrumb.css';

export default function Breadcrumb() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · breadcrumb"
        title={<>Caminho <em>discreto</em>, chevron fino.</>}
        lede="Breadcrumb fica acima do título da página, em cinza. Separador é chevron fino, nunca '/'. Último item — a página atual — vira navy sem virar link."
      />

      <Section title="Padrão" meta="cinza · chevron · 11px">
        <nav className="via-bc">
          <a>Mentoria</a>
          <ChevronRight size={12} strokeWidth={2} className="sep" />
          <a>Cases</a>
          <ChevronRight size={12} strokeWidth={2} className="sep" />
          <a>E-commerce</a>
          <ChevronRight size={12} strokeWidth={2} className="sep" />
          <span className="current">Efizi · +11.920 conversas</span>
        </nav>
      </Section>

      <Section title="Em página" meta="acima do título">
        <div className="via-bc-frame">
          <nav className="via-bc">
            <a>Cases</a>
            <ChevronRight size={12} strokeWidth={2} className="sep" />
            <span className="current">Balzani &amp; Zimbel</span>
          </nav>
          <h2 style={{ marginTop: 16, fontFamily: 'var(--via-font-display)', fontWeight: 500, fontSize: 36, letterSpacing: '-0.025em', color: 'var(--via-text-primary)' }}>
            Balzani & Zimbel: <em style={{ color: 'var(--via-text-muted)' }}>R$ 4.600/mês</em> em economia
          </h2>
        </div>
      </Section>
    </>
  );
}
