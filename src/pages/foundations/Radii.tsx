import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { tokens, type TokenName } from '../../lib/tokens';
import '../pages.css';

/**
 * Fonte única: os valores vêm de `tokens` (gerado de src/styles/tokens.css).
 * Nada de px escrito à mão aqui — se o token mudar, a página muda junto.
 */
const radii: { name: TokenName; use: string }[] = [
  { name: 'via-radius-xs', use: 'kbd, item de menu (dropdown, command)' },
  { name: 'via-radius-sm', use: 'Tooltips, tags, chips' },
  { name: 'via-radius-md', use: 'Inputs, toasts, skeletons' },
  { name: 'via-radius-lg', use: 'Cards (default), modais, sheets' },
  { name: 'via-radius-xl', use: 'Painéis de vidro (hero, seções)' },
  { name: 'via-radius-2xl', use: 'Superfícies full-bleed (pricing, marketing)' },
  { name: 'via-radius-pill', use: 'Botões (sempre), pills, switches, progresso' },
];

const shortName = (name: TokenName) => name.replace('via-radius-', '');

export default function Radii() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · raios"
        title={
          <>
            Cards <em>arredondam</em>, botões viram <em>pílula</em>.
          </>
        }
        lede={`Cards em ${tokens['via-radius-lg']}, inputs em ${tokens['via-radius-md']}, botões sempre em pill. Painéis de hero podem ir até ${tokens['via-radius-xl']} ou ${tokens['via-radius-2xl']} pra render o efeito 'folha líquida'. Não misture raios sem razão.`}
      />

      <Section title="Escala" meta={`${radii.length} níveis`}>
        <div className="vds-radii-grid" style={{ marginTop: 16 }}>
          {radii.map((r) => (
            <div
              key={r.name}
              className="vds-radii-tile"
              style={{ borderRadius: `var(--${r.name})` }}
            >
              <span className="vds-radii-label">{shortName(r.name)}</span>
              <span className="vds-radii-value">{tokens[r.name]}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Quando usar" meta="regra de polegar">
        <table className="vds-token-table">
          <thead>
            <tr><th>Token</th><th>Valor</th><th>Onde usar</th></tr>
          </thead>
          <tbody>
            {radii.map((r) => (
              <tr key={r.name}>
                <td className="tok">--{r.name}</td>
                <td className="val">{tokens[r.name]}</td>
                <td className="use">{r.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Aninhamento" meta="o filho desce um degrau">
        <p>
          Elemento dentro de outro usa o degrau abaixo do pai. Se o filho iguala o
          raio do pai, o canto interno encosta na curva externa e o encaixe fica
          torto. Exemplo real deste repositório: a grade de preços usa{' '}
          <code className="vds-code-inline">--via-radius-2xl</code> e os cards dentro
          dela usam <code className="vds-code-inline">--via-radius-xl</code>, um degrau
          abaixo.
        </p>

        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p>
              Painel <code className="vds-code-inline">2xl</code> → card{' '}
              <code className="vds-code-inline">xl</code> → campo{' '}
              <code className="vds-code-inline">md</code>. Para uma borda ou sheen de
              1px por dentro, o raio concêntrico sai de{' '}
              <code className="vds-code-inline">calc(var(--via-radius-xl) - 1px)</code>,
              nunca de um número novo.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p>
              Px cru no lugar do token, e degraus vizinhos demais no mesmo layout —
              a escala salta de propósito para que cada nível seja perceptível.
              Ficam em px por necessidade: círculo (avatar, dot, ≤16px) e e-mail,
              onde o cliente não resolve <code className="vds-code-inline">var()</code>{' '}
              e o raio precisa ser literal.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
