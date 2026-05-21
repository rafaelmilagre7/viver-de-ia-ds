import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import Swatch from '../../components/docs/Swatch';
import CodeBlock from '../../components/docs/CodeBlock';

const navy = [
  { name: 'Navy', hex: '#0A1F3B', token: '--via-navy' },
  { name: 'Navy deep', hex: '#02162A', token: '--via-navy-deep' },
  { name: 'Navy darker', hex: '#010B1A', token: '--via-navy-darker' },
  { name: 'Blue', hex: '#1E3A5F', token: '--via-blue' },
  { name: 'Blue soft', hex: '#2A4A6E', token: '--via-blue-soft' },
];

const grays = [
  { name: 'Gray 50', hex: '#F7F8FA', token: '--via-gray-50', border: true },
  { name: 'Gray 100', hex: '#F0F2F5', token: '--via-gray-100', border: true },
  { name: 'Gray 200', hex: '#E4E7EC', token: '--via-gray-200', border: true },
  { name: 'Gray 300', hex: '#D0D5DD', token: '--via-gray-300' },
  { name: 'Gray 400', hex: '#98A2B3', token: '--via-gray-400' },
  { name: 'Gray 500', hex: '#667085', token: '--via-gray-500' },
  { name: 'Gray 600', hex: '#475467', token: '--via-gray-600' },
  { name: 'Gray 700', hex: '#344054', token: '--via-gray-700' },
  { name: 'Gray 800', hex: '#1D2939', token: '--via-gray-800' },
  { name: 'Gray 900', hex: '#101828', token: '--via-gray-900' },
];

const status = [
  { name: 'Success', hex: '#1F8A5B', token: '--via-success' },
  { name: 'Warning', hex: '#0A1F3B', token: '--via-warning' },
  { name: 'Danger',  hex: '#B83A3A', token: '--via-danger' },
];

const noGo = [
  { name: 'Gold / dourado', hex: '#C7A559' },
  { name: 'Amarelo / mostarda', hex: '#E8C770' },
  { name: 'AI gradient roxo', hex: '#7B61FF' },
  { name: 'Cyan accent', hex: '#00BCD4' },
  { name: 'Hot pink', hex: '#FF4D8D' },
  { name: 'Neon green', hex: '#39FF14' },
];

export default function Color() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · cor"
        title={
          <>
            Light-first com <em>um navy</em> que carrega tudo.
          </>
        }
        lede="Branco e off-white ocupam ~85% de qualquer superfície. Cor é usada homeopaticamente. O navy #0A1F3B é a única cor de marca. Cinza é a paleta secundária. Status existe, mas é dessaturado, navy-adjacente."
      />

      <Section title="Navy — a marca" meta="primária">
        <p>
          Toda hierarquia do produto se apoia no navy. Texto principal, botões primários,
          a única seção escura por página. O <em>deep</em> e <em>darker</em> aparecem em
          momentos full-bleed (footer, CTA escuro).
        </p>
        <div className="vds-swatch-grid" style={{ marginTop: 24 }}>
          {navy.map((c) => <Swatch key={c.token} {...c} />)}
        </div>
      </Section>

      <Section title="Cinza — secundária" meta="50 → 900">
        <p>
          Toda hairline, divider, muted text, hover-state sai daqui. Não use preto puro
          em texto de corpo — use <em>gray 700</em>.
        </p>
        <div className="vds-swatch-grid" style={{ marginTop: 24 }}>
          {grays.map((c) => <Swatch key={c.token} {...c} />)}
        </div>
      </Section>

      <Section title="Status" meta="usar com parcimônia">
        <p>
          Cores de status são dessaturadas para não competir com o navy. Use só quando o
          significado é necessário — não como decoração.
        </p>
        <div className="vds-swatch-grid" style={{ marginTop: 24 }}>
          {status.map((c) => <Swatch key={c.token} {...c} />)}
        </div>
      </Section>

      <Section title="Transparências de navy" meta="hairlines, hover, soft">
        <p>
          Usar variantes alpha do navy em vez de cinza puro mantém todo o sistema coerente.
        </p>
        <CodeBlock>{`--via-navy-04   /* var(--via-navy-04)  — hover background light */
--via-navy-08   /* var(--via-navy-08)  — section bg subtle      */
--via-navy-12   /* var(--via-navy-12)  — hairline border         */
--via-navy-20   /* var(--via-navy-20)  — divider                 */
--via-navy-40   /* var(--via-navy-40)  — strong border           */
--via-navy-60   /* var(--via-navy-60)  — muted scrim             */
--via-navy-80   /* var(--via-navy-80)  — solid scrim             */`}</CodeBlock>
      </Section>

      <Section title="O que não usar" meta="off-brand">
        <p>
          A paleta é intencionalmente austera. Não tem light blues, cyan, roxo, magenta, neon.
          Se você sentiu vontade de adicionar uma cor "pra dar vida", recue.
        </p>
        <div className="vds-swatch-grid" style={{ marginTop: 24, opacity: 0.5 }}>
          {noGo.map((c) => (
            <div key={c.hex} style={{ position: 'relative' }}>
              <Swatch name={c.name} hex={c.hex} token="banido" />
              <div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '57%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--via-font)',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: '#fff', background: 'rgba(184,58,58,0.92)', padding: '4px 10px',
                    borderRadius: 999,
                  }}
                >
                  off-brand
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
