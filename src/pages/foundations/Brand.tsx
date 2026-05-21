import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import wordmark from '../../assets/logos/VIVER_DE_IA_black.png';
import wordmarkWhite from '../../assets/logos/VIVER_DE_IA_white.png';
import monogram from '../../assets/logos/VIA_black.png';
import monogramWhite from '../../assets/logos/VIA_white.png';
import appIcon from '../../assets/logos/VIA_app_icon.png';
import appIconWhite from '../../assets/logos/VIA_app_icon_white.png';
import leadersAI from '../../assets/logos/leaders-ai-conference-logo.png';
import frame32 from '../../assets/brand/Frame_32_blue.png';
import frame33 from '../../assets/brand/Frame_33_navy.png';
import frame34 from '../../assets/brand/Frame_34_light.png';
import '../pages.css';

const tiles = [
  { name: 'Wordmark — preto', desc: 'Marca principal em fundo claro', img: wordmark, dark: false },
  { name: 'Wordmark — branco', desc: 'Marca principal em fundo escuro', img: wordmarkWhite, dark: true },
  { name: 'Monograma VIA — preto', desc: 'Marca compacta, espaços pequenos', img: monogram, dark: false },
  { name: 'Monograma VIA — branco', desc: 'Compacta em fundo escuro', img: monogramWhite, dark: true },
  { name: 'App icon', desc: 'Favicon, produto, app', img: appIcon, dark: false },
  { name: 'App icon — branco', desc: 'App icon em fundo escuro', img: appIconWhite, dark: true },
  { name: 'Leaders AI Conference', desc: 'Marca do evento (sub-brand)', img: leadersAI, dark: true },
];

const frames = [
  { name: 'Frame 32 — azul', desc: 'Wordmark sobre fundo azul claro', img: frame32 },
  { name: 'Frame 33 — navy', desc: 'Wordmark sobre fundo navy', img: frame33 },
  { name: 'Frame 34 — claro', desc: 'Wordmark sobre fundo light', img: frame34 },
];

export default function Brand() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · marca"
        title={
          <>
            Três marcas, <em>uma assinatura</em>.
          </>
        }
        lede="O sistema da Viver de IA tem três marcas: o monograma VIA, o wordmark VIVER DE IA, e o app icon. Mais a marca do evento Leaders AI Conference. Todas compartilham o mesmo DNA — traços finos, geométricos, espaçamento generoso."
      />

      <Section title="Marcas oficiais" meta="PNG · preto e branco">
        <p>
          Use o <em>wordmark completo</em> sempre que houver espaço para respirar. Quando
          o espaço apertar, recuar para o <em>monograma VIA</em>. O <em>app icon</em> é
          reservado para superfícies onde a marca precisa "parecer um produto" — favicons,
          ícones de app, avatars sistêmicos.
        </p>
        <div className="vds-brand-grid" style={{ marginTop: 24 }}>
          {tiles.map((t) => (
            <div key={t.name} className="vds-brand-tile">
              <div className={`vds-brand-tile-img ${t.dark ? 'dark' : ''}`}>
                <img src={t.img} alt={t.name} />
              </div>
              <div className="vds-brand-tile-meta">
                <span className="vds-brand-tile-name">{t.name}</span>
                <span className="vds-brand-tile-desc">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Brand frames" meta="Plates oficiais">
        <p>
          Três plates oficiais para usos editoriais: capa de slide, cover de PDF, splash
          de produto. Use-os intactos — não recolore, não recrop.
        </p>
        <div className="vds-brand-grid" style={{ marginTop: 24 }}>
          {frames.map((f) => (
            <div key={f.name} className="vds-brand-tile">
              <div className="vds-brand-tile-img" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={f.img} alt={f.name} style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="vds-brand-tile-meta">
                <span className="vds-brand-tile-name">{f.name}</span>
                <span className="vds-brand-tile-desc">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Clearance" meta="Respiração mínima">
        <p>
          A marca precisa de respiração. Mantenha um espaço mínimo equivalente à
          <em> altura do "V"</em> em volta de qualquer marca. Nada — texto, ícone, borda — entra
          dentro dessa zona.
        </p>
        <div
          style={{
            marginTop: 24,
            padding: 64,
            border: '0.5px solid var(--via-navy-12)',
            borderRadius: 'var(--via-radius-lg)',
            display: 'flex',
            justifyContent: 'center',
            background: 'var(--via-gray-50)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative', padding: 36, border: '1px dashed var(--via-navy-40)' }}>
            <img src={wordmark} alt="" style={{ height: 44, display: 'block' }} />
            <span
              style={{
                position: 'absolute',
                top: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--via-bg)',
                padding: '0 8px',
                fontFamily: 'var(--via-font-mono)',
                fontSize: 10,
                color: 'var(--via-gray-500)',
              }}
            >
              clearance · 1x
            </span>
          </div>
        </div>
      </Section>

      <Section title="Não faça" meta="Do's & Don'ts">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              Use wordmark em PNG preto sobre fundos claros, branco sobre escuros. Mantenha
              clearance. Mantenha proporções.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              Recolorir, alongar, comprimir, rotacionar, adicionar gradiente, drop-shadow ou
              outline. Nunca coloque ícone/texto dentro da zona de clearance.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
