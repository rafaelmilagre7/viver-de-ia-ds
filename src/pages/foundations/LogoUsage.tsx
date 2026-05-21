import { X, Check } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramNavy from '../../assets/logos/VIA_monogram_hq.png';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import wordmarkNavy from '../../assets/logos/VIVER_DE_IA_black.png';
import wordmarkWhite from '../../assets/logos/VIVER_DE_IA_white.png';
import viaBlack from '../../assets/logos/VIA_black.png';
import viaWhite from '../../assets/logos/VIA_white.png';
import iconBlack from '../../assets/logos/icon_black.png';
import iconWhite from '../../assets/logos/icon_white.png';
import appIcon from '../../assets/logos/VIA_app_icon.png';
import appIconWhite from '../../assets/logos/VIA_app_icon_white.png';
import leadersAI from '../../assets/logos/leaders-ai-conference-logo.png';
import './logo-usage.css';

export default function LogoUsage() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · logo"
        title={
          <>
            Logo é <em>identidade</em>, não decoração.
          </>
        }
        lede="O monogram VIA + wordmark Viver de IA + Leaders AI mark formam o sistema. Cada um tem contexto certo de uso, clear space mínima, tamanho mínimo, e variants pra cada surface. Sem improvisar — sempre o arquivo certo, no tamanho certo."
      />

      <AnatomySection />
      <VariantsSection />
      <ClearSpaceSection />
      <SizingSection />
      <SurfaceSection />
      <ContextSection />
      <DontsSection />
    </>
  );
}

/* ---------- Anatomy · 3 logos do sistema ---------- */
function AnatomySection() {
  return (
    <Section
      title="Anatomia · 3 marcas do sistema"
      meta="monogram · wordmark · sub-brand Leaders AI"
    >
      <div className="vds-lu-anatomy">
        <article>
          <div className="vds-lu-spec vds-lu-spec--light">
            <img src={monogramNavy} alt="Monogram VIA" />
          </div>
          <h4>Monogram <em>VIA</em></h4>
          <p>
            O símbolo. Carrega a marca sozinho quando o espaço é apertado (favicon, app icon, avatar).
            Usado em hover/loading, watermark, social profile pic, qualquer contexto onde o wordmark
            não cabe.
          </p>
          <span className="vds-lu-spec-meta mono">
            VIA_monogram_hq.png · 1024×1024 · PNG transparente
          </span>
        </article>

        <article>
          <div className="vds-lu-spec vds-lu-spec--light">
            <img src={wordmarkNavy} alt="Wordmark Viver de IA" />
          </div>
          <h4>Wordmark <em>Viver de IA</em></h4>
          <p>
            A leitura completa. Sempre que tem espaço (header, footer, OG image, slide capa, deck).
            Comunica a marca sem precisar de contexto. Em footer pode aparecer monogram + wordmark
            lado a lado pra ancorar.
          </p>
          <span className="vds-lu-spec-meta mono">
            VIVER_DE_IA_black.png · 2048×512 · PNG transparente
          </span>
        </article>

        <article>
          <div className="vds-lu-spec vds-lu-spec--light">
            <img src={leadersAI} alt="Leaders AI Conference" />
          </div>
          <h4>Sub-brand <em>Leaders AI</em></h4>
          <p>
            Evento próprio derivado do VIA. Identidade visual quase independente — mantém paleta
            navy + tipografia editorial, mas tem mark própria. Não substitui o monogram em
            superfície institucional — só em material do evento.
          </p>
          <span className="vds-lu-spec-meta mono">
            leaders-ai-conference-logo.png · 1024×512 · PNG transparente
          </span>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Variants · cada logo em todas as variantes ---------- */
function VariantsSection() {
  return (
    <Section
      title="Variants · cada logo em todas as superfícies"
      meta="navy + white + reverse · use o arquivo certo, não inverte com CSS"
    >
      <div className="vds-lu-variants">
        <article>
          <h4>Monogram</h4>
          <div className="vds-lu-var-grid">
            <figure className="light">
              <img src={monogramNavy} alt="Monogram navy" />
              <figcaption>Navy · em light</figcaption>
            </figure>
            <figure className="dark">
              <img src={monogramWhite} alt="Monogram white" />
              <figcaption>White · em dark</figcaption>
            </figure>
            <figure className="light">
              <img src={viaBlack} alt="VIA black" />
              <figcaption>VIA mark · 1 cor</figcaption>
            </figure>
            <figure className="dark">
              <img src={viaWhite} alt="VIA white" />
              <figcaption>VIA mark · reverse</figcaption>
            </figure>
          </div>
        </article>

        <article>
          <h4>Wordmark</h4>
          <div className="vds-lu-var-grid wide">
            <figure className="light">
              <img src={wordmarkNavy} alt="Wordmark navy" />
              <figcaption>Navy · em light</figcaption>
            </figure>
            <figure className="dark">
              <img src={wordmarkWhite} alt="Wordmark white" />
              <figcaption>White · em dark</figcaption>
            </figure>
          </div>
        </article>

        <article>
          <h4>App icon · iOS/Android-style</h4>
          <div className="vds-lu-var-grid">
            <figure className="light">
              <img src={appIcon} alt="App icon navy" className="rounded" />
              <figcaption>App icon · navy bg</figcaption>
            </figure>
            <figure className="dark">
              <img src={appIconWhite} alt="App icon white" className="rounded" />
              <figcaption>App icon · white reverse</figcaption>
            </figure>
          </div>
        </article>

        <article>
          <h4>Favicon · single color</h4>
          <div className="vds-lu-var-grid small">
            <figure className="light">
              <img src={iconBlack} alt="Favicon black" />
              <figcaption>16-32px favicon</figcaption>
            </figure>
            <figure className="dark">
              <img src={iconWhite} alt="Favicon white" />
              <figcaption>16-32px reverse</figcaption>
            </figure>
          </div>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Clear space ---------- */
function ClearSpaceSection() {
  return (
    <Section
      title="Clear space · espaço mínimo ao redor"
      meta="meio-X de cada lado para o monogram, 1X para o wordmark"
    >
      <article className="vds-lu-clear">
        <div className="vds-lu-clear-demo">
          <div className="vds-lu-clear-monogram">
            <span className="vds-lu-clear-tag top">X / 2</span>
            <span className="vds-lu-clear-tag right">X / 2</span>
            <span className="vds-lu-clear-tag bottom">X / 2</span>
            <span className="vds-lu-clear-tag left">X / 2</span>
            <img src={monogramNavy} alt="Monogram com clear space" />
          </div>
          <p className="vds-lu-clear-cap mono">
            Monogram · "X" = altura do símbolo · espaçamento mínimo = X/2
          </p>
        </div>

        <div className="vds-lu-clear-demo">
          <div className="vds-lu-clear-wordmark">
            <span className="vds-lu-clear-tag top">X</span>
            <span className="vds-lu-clear-tag right">X</span>
            <span className="vds-lu-clear-tag bottom">X</span>
            <span className="vds-lu-clear-tag left">X</span>
            <img src={wordmarkNavy} alt="Wordmark com clear space" />
          </div>
          <p className="vds-lu-clear-cap mono">
            Wordmark · "X" = altura do "V" · espaçamento mínimo = 1X em todos os lados
          </p>
        </div>

        <p className="vds-lu-clear-note">
          <strong>Por quê.</strong> Clear space evita que outros elementos visuais "encostem" no
          logo e quebrem a legibilidade. Em peças com muita densidade (cartão de visita, OG image,
          rodapé editorial), o clear space é frequentemente esquecido e o logo perde peso —
          parece "espremido" mesmo quando tecnicamente cabe.
        </p>
      </article>
    </Section>
  );
}

/* ---------- Sizing ---------- */
function SizingSection() {
  const sizes = [
    { px: 16, label: 'favicon', use: 'tab do browser, sitemap, OG' },
    { px: 24, label: 'avatar mínimo', use: 'chat list, member row dense' },
    { px: 32, label: 'avatar padrão', use: 'header, nav, footer profile' },
    { px: 48, label: 'header marca', use: 'shell header desktop' },
    { px: 80, label: 'hero pequeno', use: 'card featured, modal logo' },
    { px: 128, label: 'hero médio', use: 'login screen, OG image' },
    { px: 200, label: 'hero grande', use: 'landing splash, deck capa' },
  ];

  return (
    <Section
      title="Sizing · tamanhos canônicos"
      meta="monogram quadrado · sempre múltiplos de 8px"
    >
      <div className="vds-lu-sizing">
        {sizes.map((s) => (
          <article key={s.px}>
            <div
              className="vds-lu-size-demo"
              style={{ width: s.px, height: s.px }}
            >
              <img src={monogramNavy} alt={`Monogram ${s.px}px`} />
            </div>
            <strong className="mono">{s.px}px</strong>
            <em>{s.label}</em>
            <span className="vds-lu-size-use">{s.use}</span>
          </article>
        ))}
      </div>

      <article className="vds-lu-size-min">
        <span className="vds-lu-min-eyebrow">Tamanho mínimo absoluto</span>
        <h4>
          Monogram nunca abaixo de <em>16px</em> · wordmark nunca abaixo de <em>96px</em> de largura
        </h4>
        <p>
          Abaixo desses pisos, o miolo do "V" e "A" colapsa visualmente. Quando precisar de algo
          menor (badge, watermark muito pequeno), prefira só o miolo "VIA" ou use o icon
          single-color (`icon_black.png`) que é otimizado pra escala pequena.
        </p>
      </article>
    </Section>
  );
}

/* ---------- Surface compatibility ---------- */
function SurfaceSection() {
  return (
    <Section
      title="Surface · qual logo em qual fundo"
      meta="navy em light · white em dark · sempre arquivo dedicado, nunca CSS invert"
    >
      <div className="vds-lu-surface">
        <article className="vds-lu-surf-light">
          <span className="vds-lu-surf-eyebrow">Surface light</span>
          <div className="vds-lu-surf-demo">
            <img src={monogramNavy} alt="Monogram navy em light" />
            <img src={wordmarkNavy} alt="Wordmark navy em light" className="word" />
          </div>
          <ul>
            <li>Cor: <strong className="mono">#0A1F3B navy</strong> (single asset)</li>
            <li>Fundo: branco, off-white, gray-50/100/200</li>
            <li>Arquivos: <code className="mono">VIA_monogram_hq.png</code>, <code className="mono">VIVER_DE_IA_black.png</code></li>
          </ul>
        </article>

        <article className="vds-lu-surf-dark">
          <span className="vds-lu-surf-eyebrow">Surface dark</span>
          <div className="vds-lu-surf-demo via-mesh-navy via-noise">
            <img src={monogramWhite} alt="Monogram white em dark" />
            <img src={wordmarkWhite} alt="Wordmark white em dark" className="word" />
          </div>
          <ul>
            <li>Cor: <strong className="mono">#FFFFFF white</strong> (single asset)</li>
            <li>Fundo: navy, navy-deep, navy-darker, mesh-navy</li>
            <li>Arquivos: <code className="mono">VIA_monogram_hq_white.png</code>, <code className="mono">VIVER_DE_IA_white.png</code></li>
          </ul>
        </article>

        <article className="vds-lu-surf-photo">
          <span className="vds-lu-surf-eyebrow">Surface foto / colorida</span>
          <div className="vds-lu-surf-demo photo">
            <img src={monogramWhite} alt="Monogram white com scrim" />
          </div>
          <ul>
            <li>Cor: <strong className="mono">white</strong> sempre · com scrim navy 60% se foto for clara</li>
            <li>Fundo: foto, paisagem, mockup, qualquer surface não-canônica</li>
            <li>Nunca: monogram navy direto sobre foto (perde contraste)</li>
          </ul>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Context usage table ---------- */
function ContextSection() {
  const contexts = [
    { context: 'Shell header (app/site)', logo: 'Monogram navy 32px · clica volta pra /' },
    { context: 'Shell footer', logo: 'Monogram + wordmark stacked · centralizado' },
    { context: 'Tab do browser', logo: 'Favicon icon_black.png 32×32' },
    { context: 'OG image (preview link)', logo: 'Wordmark navy centralizado sobre off-white' },
    { context: 'Email header', logo: 'Wordmark navy 200px width, centralizado' },
    { context: 'WhatsApp profile pic', logo: 'App icon VIA_app_icon.png · navy bg' },
    { context: 'Slide deck capa', logo: 'Wordmark white sobre mesh-navy hero' },
    { context: 'Slide deck interior', logo: 'Monogram white 16px canto inferior direito' },
    { context: 'Invoice', logo: 'Wordmark navy 120px header + monogram 24px footer' },
    { context: 'Cert/diploma', logo: 'Wordmark navy hero + selo monogram circular' },
    { context: 'Avatar de mentor (chat)', logo: 'Iniciais do mentor, NÃO o monogram VIA' },
    { context: 'Loading state', logo: 'Monogram navy 80px pulsando opacity 0.4-1' },
    { context: 'Social profile pic', logo: 'App icon (não monogram) · navy bg cheio' },
    { context: 'Social post cover', logo: 'Monogram white canto · não centralizado massivo' },
    { context: 'Material Leaders AI', logo: 'Sub-brand leaders-ai-conference-logo · não substitui monogram' },
  ];

  return (
    <Section
      title="Context · onde usar qual logo"
      meta="tabela de referência canônica"
    >
      <div className="vds-lu-context">
        <table>
          <thead>
            <tr>
              <th>Contexto</th>
              <th>Logo correto</th>
            </tr>
          </thead>
          <tbody>
            {contexts.map((c) => (
              <tr key={c.context}>
                <td>{c.context}</td>
                <td>{c.logo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ---------- Don'ts ---------- */
function DontsSection() {
  const dos = [
    'Use o arquivo PNG transparente original em alta resolução',
    'Mantém clear space mínimo (X/2 monogram · 1X wordmark)',
    'Usa navy em surface light · white em surface dark',
    'Em foto com cores variadas, white + scrim navy 60%',
    'Em material Leaders AI, sub-brand pode aparecer junto, não sobre',
  ];

  const donts = [
    'Não inverte cor via CSS filter:invert() · sempre o arquivo dedicado',
    'Não tilta, rota, distorce ou aplica perspective no logo',
    'Não troca o "I" de "IA" por ícone · marca não tem variação literária',
    'Não coloca sombra forte ou glow no logo · ele é flat por design',
    'Não escala monogram abaixo de 16px ou wordmark abaixo de 96px',
    'Não usa logo navy sobre fundo escuro · contraste insuficiente',
    'Não usa logo white sobre fundo claro · sumirá',
    'Não recorta o monogram (ex: usar só metade) · marca é integral',
    'Não usa em paleta off-brand (gold, amarelo, roxo, gradient quente)',
    'Não combina 2 logos diferentes na mesma peça (ex: monogram + wordmark + Leaders AI todos juntos sem hierarquia)',
  ];

  return (
    <Section
      title="Do's & Don'ts · regras visuais"
      meta="5 dos + 10 don'ts · cada um com razão"
    >
      <div className="vds-lu-dosdonts">
        <article className="vds-lu-do">
          <header>
            <span className="vds-lu-dd-eyebrow">
              <Check size={11} strokeWidth={2.6} />
              Use
            </span>
          </header>
          <ul>
            {dos.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </article>
        <article className="vds-lu-dont">
          <header>
            <span className="vds-lu-dd-eyebrow alt">
              <X size={11} strokeWidth={2.6} />
              Não use
            </span>
          </header>
          <ul>
            {donts.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </article>
      </div>
    </Section>
  );
}
