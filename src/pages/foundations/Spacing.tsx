import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import '../pages.css';

const scale = [
  { tok: '--via-space-1', px: 4 },
  { tok: '--via-space-2', px: 8 },
  { tok: '--via-space-3', px: 12 },
  { tok: '--via-space-4', px: 16 },
  { tok: '--via-space-5', px: 20 },
  { tok: '--via-space-6', px: 24 },
  { tok: '--via-space-8', px: 32 },
  { tok: '--via-space-10', px: 40 },
  { tok: '--via-space-12', px: 48 },
  { tok: '--via-space-16', px: 64 },
  { tok: '--via-space-20', px: 80 },
  { tok: '--via-space-24', px: 96 },
  { tok: '--via-space-32', px: 128 },
];

export default function Spacing() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · espaçamento"
        title={
          <>
            Quatro em quatro <em>até</em> respirar.
          </>
        }
        lede="A escala de espaçamento dobra a cada salto importante. O ritmo dos saltos grandes — 32 / 64 / 96 / 128 — é o que dá ao layout a calma editorial. Cuidado com 'preencher branco' — o branco é a maioria."
      />

      <Section title="Escala" meta="base 4px">
        <div className="vds-spacing-scale">
          {scale.map((s) => (
            <div key={s.tok} className="vds-spacing-row">
              <span className="vds-spacing-token">{s.tok}</span>
              <span className="vds-spacing-px">{s.px}px</span>
              <div className="vds-spacing-bar" style={{ width: Math.min(s.px * 4, 100) + '%' }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Contêineres" meta="layout">
        <table className="vds-token-table">
          <thead>
            <tr><th>Token</th><th>Valor</th><th>Uso</th></tr>
          </thead>
          <tbody>
            <tr><td className="tok">--via-container</td><td className="val">1280px</td><td className="use">Largura máxima do layout principal</td></tr>
            <tr><td className="tok">--via-content</td><td className="val">760px</td><td className="use">Coluna de leitura · artigos editoriais</td></tr>
            <tr><td className="tok">--via-narrow</td><td className="val">560px</td><td className="use">Coluna estreita · forms, dialog</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Ritmo entre sections" meta="o ar é a estética">
        <p>
          Seções verticais respiram com saltos de <em>64–96–128</em>. Subseções com 32–48.
          Elementos dentro de uma section: 16–24. Não comprime espaçamento pra "caber mais
          coisa". Se algo não cabe, remova, não amasse.
        </p>
      </Section>
    </>
  );
}
