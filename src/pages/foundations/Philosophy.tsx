import {
  Award, AlertCircle, Compass, Layers,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './philosophy.css';

export default function Philosophy() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · filosofia"
        title={
          <>
            As 6 regras <em>não negociáveis</em> do design system.
          </>
        }
        lede="Não é decoração — é coerência editorial. Toda decisão visual no Viver de IA passa por estas regras. Quando bater dúvida, volta aqui."
      />

      <RulePaletteRestritaSection />
      <RulePillSection />
      <RulePaletteSection />
      <RuleSignaturesSection />
      <RuleNoBolinhaSection />
      <RuleVoiceSection />
    </>
  );
}

/* ---------- Regra 1 · Paleta restrita · navy + cinza + branco + preto ---------- */
function RulePaletteRestritaSection() {
  return (
    <Section title="Regra 1 · Paleta restrita" meta="navy domina · cinza estrutura · branco respira · preto pontua">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">01</span>
          <div>
            <h3>Paleta restrita: <em>navy, cinza, branco, preto</em>. Nada de accent.</h3>
            <p>
              Cor da marca é navy profundo. Surfaces são branco/off-white/cinza. Texto e detalhes editoriais em preto. <strong>Não usamos accent, amarelo, dourado, amber ou tons quentes</strong> — em nenhum elemento, em nenhum nível. Tom premium vem de tipografia Geist, peso editorial e contraste navy/branco, não de saturação cromática.
            </p>
          </div>
        </header>

        <div className="vds-phil-rule-grid">
          <article className="vds-phil-allow">
            <span className="vds-phil-allow-eyebrow">Os 6 tons permitidos</span>
            <ul>
              <li>
                <div className="vds-phil-allow-icon"><AlertCircle size={13} strokeWidth={1.8} /></div>
                <div>
                  <strong>Branco · #FFFFFF</strong>
                  <em>canvas principal, surfaces de card light, contraste em hero navy</em>
                </div>
              </li>
              <li>
                <div className="vds-phil-allow-icon"><Award size={13} strokeWidth={1.8} /></div>
                <div>
                  <strong>Off-white · #F7F8FA</strong>
                  <em>page bg alternativo, surface elev, peso visual sem ruído</em>
                </div>
              </li>
              <li>
                <div className="vds-phil-allow-icon"><Layers size={13} strokeWidth={1.8} /></div>
                <div>
                  <strong>Cinzas · gray-100 → gray-900</strong>
                  <em>hairlines, borders, body text · 9 stops do gray-50 ao quase-preto</em>
                </div>
              </li>
              <li>
                <div className="vds-phil-allow-icon"><Compass size={13} strokeWidth={1.8} /></div>
                <div>
                  <strong>Azul escuro · #1E3A5F</strong>
                  <em>borders sobre navy, hover state, mid-tone em gradients</em>
                </div>
              </li>
              <li>
                <div className="vds-phil-allow-icon"><Award size={13} strokeWidth={1.8} /></div>
                <div>
                  <strong>Navy · #0A1F3B</strong>
                  <em>cor primária, hero atmosphere, CTAs, marca · 80% do peso visual</em>
                </div>
              </li>
              <li>
                <div className="vds-phil-allow-icon"><AlertCircle size={13} strokeWidth={1.8} /></div>
                <div>
                  <strong>Preto · #000000</strong>
                  <em>tipografia editorial de peso máximo · monogram, headers fortes</em>
                </div>
              </li>
            </ul>
          </article>

          <article className="vds-phil-forbid">
            <span className="vds-phil-forbid-eyebrow">Nunca usar</span>
            <ul>
              <li>Accent, dourado, amber — toda a família banida em todo nível</li>
              <li>Amarelo, mostarda, ocre — toda a família quente proibida</li>
              <li>Marrom, terracota, bege saturado, cream amarelado</li>
              <li>Gradients "premium" com qualquer stop quente</li>
              <li>Roxo "IA", cyan, magenta, neon — tons saturados banidos</li>
              <li>Verde vibrante de "sucesso" (use navy + ícone check)</li>
              <li>Vermelho saturado — coral suave só pra destrutivo real</li>
            </ul>
          </article>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Regra 2 · Pill canônica ---------- */
function RulePillSection() {
  return (
    <Section title="Regra 2 · Pill canônica" meta="11px · weight 500 · letter-spacing -0.004em · nowrap · sem dot · sem caps lock">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">02</span>
          <div>
            <h3>Toda pill segue <em>a mesma forma</em>.</h3>
            <p>
              Não tem versão "small caps" para alguns lugares e "lowercase" para outros — caps lock + letter-spacing alto é cliché de bootstrap. O padrão editorial é discreto: lowercase, peso modesto, sem decoração antes do texto.
            </p>
          </div>
        </header>

        <div className="vds-phil-pill-demo">
          <div className="vds-phil-pill-row">
            <span className="vds-phil-pill-lbl">Padrão</span>
            <span className="vds-phil-pill default">em produção</span>
            <span className="vds-phil-pill default">corporate</span>
            <span className="vds-phil-pill default">há 4 min</span>
          </div>
          <div className="vds-phil-pill-row">
            <span className="vds-phil-pill-lbl">Atenção <em>(semântico)</em></span>
            <span className="vds-phil-pill attn">requer atenção</span>
            <span className="vds-phil-pill attn">expira em 8 dias</span>
          </div>
          <div className="vds-phil-pill-row">
            <span className="vds-phil-pill-lbl">Crítico <em>(coral)</em></span>
            <span className="vds-phil-pill churn">risco churn</span>
            <span className="vds-phil-pill churn">fora do ar</span>
          </div>
        </div>

        <pre className="vds-phil-code mono">{`.vds-pill {
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.004em;
  white-space: nowrap;
  line-height: 1.4;
  /* NÃO: text-transform: uppercase */
  /* NÃO: letter-spacing: 0.10em+ */
  /* NÃO: font-weight: 700 */
  /* NÃO: bolinha decorativa antes do texto */
}`}</pre>
      </article>
    </Section>
  );
}

/* ---------- Regra 3 · Paleta restrita ---------- */
function RulePaletteSection() {
  const tokens = [
    { name: 'navy',        hex: 'var(--via-navy)',        role: 'protagonista · texto, CTA, surfaces dark · 80% do peso visual',  bg: 'var(--via-navy)',        fg: 'var(--via-white)' },
    { name: 'navy-deep',   hex: 'var(--via-navy-deep)',   role: 'gradient bottom · hover state em surfaces dark',                  bg: 'var(--via-navy-deep)',   fg: 'var(--via-white)' },
    { name: 'navy-darker', hex: 'var(--via-navy-darker)', role: 'mesh bottom · footers · bordas escuras',                           bg: 'var(--via-navy-darker)', fg: 'var(--via-white)' },
    { name: 'blue',        hex: 'var(--via-blue)',        role: 'mid azul-escuro · gradient stops · bordas sobre navy',            bg: 'var(--via-blue)',        fg: 'var(--via-white)' },
    { name: 'ink-2',       hex: 'var(--via-ink-2)',       role: 'texto secundário editorial · meta lines',                          bg: 'var(--via-ink-2)',       fg: 'var(--via-white)' },
    { name: 'ink-3',       hex: 'var(--via-ink-3)',       role: 'texto terciário · timestamps · captions',                          bg: 'var(--via-ink-3)',       fg: 'var(--via-white)' },
    { name: 'gray-50',     hex: 'var(--via-gray-50)',     role: 'page bg alt · surface elev sem ruído',                             bg: 'var(--via-gray-50)',     fg: 'var(--via-navy)', border: true },
    { name: 'gray-100',    hex: 'var(--via-gray-100)',    role: 'subtle surface · paper editorial',                                 bg: 'var(--via-gray-100)',    fg: 'var(--via-navy)', border: true },
    { name: 'gray-300',    hex: 'var(--via-gray-300)',    role: 'border stronger · gradient highlights · accent-light',             bg: 'var(--via-gray-300)',    fg: 'var(--via-navy)' },
    { name: 'white',       hex: 'var(--via-white)',       role: 'canvas principal · superfície primária',                           bg: 'var(--via-white)',       fg: 'var(--via-navy)', border: true },
    { name: 'coral',       hex: 'var(--via-coral)',       role: 'destrutivo only · cancel / error real',                            bg: 'var(--via-coral)',       fg: 'var(--via-white)' },
    { name: 'success',     hex: 'var(--via-success)',     role: 'só pra presence dot · uptime · checkmark · navy-adjacent',         bg: 'var(--via-success)',     fg: 'var(--via-white)' },
  ];

  return (
    <Section title="Regra 3 · Tokens canônicos" meta="12 tokens · navy + cinza + branco + 2 semânticos">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">03</span>
          <div>
            <h3>12 tokens no total — <em>navy domina 80% do canvas</em>.</h3>
            <p>
              Fora dessa lista, nada. Cores de marca terceiros (logos parceiros, syntax highlighting em code blocks) aparecem só nos contextos próprios deles, nunca como acento decorativo. Sem cyan, sem magenta, sem neon, sem roxo "IA", sem dourado, sem amarelo.
            </p>
          </div>
        </header>

        <div className="vds-phil-tokens">
          {tokens.map((t) => (
            <div key={t.name} className="vds-phil-token">
              <span
                className="vds-phil-token-swatch"
                style={{
                  background: t.bg,
                  color: t.fg,
                  border: t.border ? '1px solid var(--via-navy-12)' : 'none',
                }}
              >
                {t.hex}
              </span>
              <div>
                <strong className="mono">--via-{t.name}</strong>
                <em>{t.role}</em>
              </div>
            </div>
          ))}
        </div>
      </article>
    </Section>
  );
}

/* ---------- Regra 4 · Assinaturas comportamentais ---------- */
function RuleSignaturesSection() {
  return (
    <Section title="Regra 4 · Assinaturas comportamentais" meta="hover signatures · atmospheric radials · sombras navy-tinted">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">04</span>
          <div>
            <h3>O design system tem <em>uma assinatura sutil</em> no comportamento.</h3>
            <p>
              Cada elemento interativo respira do mesmo jeito. Hover sempre revela a mesma bar lateral navy fade. Cards sobem 2px na entrada. Atmosphere radial no canto superior esquerdo. Sombras navy-tinted, nunca pretas puras. Você reconhece "isso é Viver de IA" sem precisar ver o logo.
            </p>
          </div>
        </header>

        <div className="vds-phil-sigs">
          <article className="vds-phil-sig">
            <div className="vds-phil-sig-demo bar">
              <div className="row">Hover em mim</div>
              <div className="row">E em mim</div>
              <div className="row">E em mim também</div>
            </div>
            <h4>Bar lateral fade navy</h4>
            <p>2px gradient navy → transparente, aparece à esquerda no hover de rows, cards, items de lista.</p>
          </article>

          <article className="vds-phil-sig">
            <div className="vds-phil-sig-demo lift">
              <div className="card">Hover pra subir</div>
            </div>
            <h4>Lift translateY</h4>
            <p>-1px a -3px no hover · transition cubic-bezier(.2,.7,.2,1) · acompanhado de shadow expand.</p>
          </article>

          <article className="vds-phil-sig">
            <div className="vds-phil-sig-demo atmos">
              <div className="card">Atmosphere radial</div>
            </div>
            <h4>Radial atmosphere</h4>
            <p><code>radial-gradient(...) at 0% 0%, rgba(10,31,59,0.04), transparent 60%</code> no top-left dos cards principais.</p>
          </article>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Regra 5 · Sem bolinha ---------- */
function RuleNoBolinhaSection() {
  return (
    <Section title="Regra 5 · Sem bolinha decorativa" meta="dot só é legítimo em status real ao vivo">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">05</span>
          <div>
            <h3>Bolinha em pill que <em>não é status real</em> está banida.</h3>
            <p>
              Aquela bolinha cinzinha antes do texto em todo chip "Verificado · Pago · Production" é cliché bootstrap. O peso da tipografia comunica o mesmo. Bolinha só vive quando é estado <strong>realmente live</strong> — presence online, broadcast ao vivo, recording em andamento.
            </p>
          </div>
        </header>

        <div className="vds-phil-dot-demo">
          <div className="vds-phil-dot-row">
            <span className="vds-phil-dot-lbl">❌ Banido</span>
            <span className="vds-phil-pill-bad">
              <span className="bolinha" />
              Pago
            </span>
            <span className="vds-phil-pill-bad">
              <span className="bolinha" />
              Production
            </span>
            <span className="vds-phil-pill-bad">
              <span className="bolinha" />
              Verificado
            </span>
          </div>
          <div className="vds-phil-dot-row">
            <span className="vds-phil-dot-lbl">✓ Editorial</span>
            <span className="vds-phil-pill default">Pago</span>
            <span className="vds-phil-pill default">Production</span>
            <span className="vds-phil-pill default">Verificado</span>
          </div>
          <div className="vds-phil-dot-row">
            <span className="vds-phil-dot-lbl">✓ Live real</span>
            <span className="vds-phil-pill-live">
              <span className="dot" />
              <em>ao vivo agora</em>
            </span>
          </div>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Regra 6 · Voz editorial ---------- */
function RuleVoiceSection() {
  return (
    <Section title="Regra 6 · Voz editorial" meta="operador experiente · português direto · número ou citação sempre">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">06</span>
          <div>
            <h3>Voz de operador, <em>não de vendedor de curso</em>.</h3>
            <p>
              Confiante, calmo, com números. Não "guru-bro", não "revolucionário", não exclamação. Cada afirmação carrega métrica ou citação atribuída. PT-BR direto.
            </p>
          </div>
        </header>

        <div className="vds-phil-voice-grid">
          <article className="vds-phil-voice good">
            <span className="vds-phil-voice-tag">Editorial</span>
            <p className="quote">"Viver de IA, não de prompt."</p>
            <em>Hero · headline curta · sem exclamação</em>
          </article>
          <article className="vds-phil-voice good">
            <span className="vds-phil-voice-tag">Métrica seca</span>
            <p className="quote">"+11.920 conversas analisadas em 90 dias"</p>
            <em>Stat card · número + período + ação</em>
          </article>
          <article className="vds-phil-voice good">
            <span className="vds-phil-voice-tag">Atribuída</span>
            <p className="quote">"Ela fez isso com pouquíssimas horas. Sem saber nada." — Márisson Lage</p>
            <em>Depoimento · primeira pessoa · nome</em>
          </article>
          <article className="vds-phil-voice bad">
            <span className="vds-phil-voice-tag">Banido</span>
            <p className="quote">"Revolucione seu negócio com IA! O futuro chegou ✨"</p>
            <em>Clichê · vago · sem número · emoji</em>
          </article>
        </div>
      </article>
    </Section>
  );
}
