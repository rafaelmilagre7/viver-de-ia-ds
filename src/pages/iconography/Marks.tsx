import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { Link } from 'react-router-dom';

export default function IconographyMarks() {
  return (
    <>
      <DocsHeader
        eyebrow="Iconografia · marcas"
        title={
          <>
            Marcas <em>são</em> ícones.
          </>
        }
        lede="A marca VIA, o wordmark, o app icon e o mark da conferência são os únicos 'ícones' proprietários do sistema. Tudo o resto vem do Lucide. Para uso, anatomia e do's & don'ts, vá em Fundamentos · Marca."
      />

      <Section title="Atalho" meta="ver na seção de fundamentos">
        <p>
          A documentação completa das marcas — variantes, plates oficiais, clearance, do's
          & don'ts — está em <Link to="/foundations/brand" style={{ color: 'var(--via-navy)', textDecoration: 'underline' }}>Fundamentos · Marca</Link>.
        </p>
      </Section>
    </>
  );
}
