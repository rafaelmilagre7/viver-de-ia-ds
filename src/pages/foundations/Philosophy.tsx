import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { Pill, useTheme } from '../../lib';
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
      <RuleTokensSection />
      <RuleSignaturesSection />
      <RuleNoBolinhaSection />
      <RuleVoiceSection />
    </>
  );
}

/* ---------- lê o valor REAL do token no tema atual ----------
   Fonte de verdade = CSS computado, não string escrita à mão.
   Assim a página não consegue mentir: se tokens.css mudar, o
   valor exibido muda junto — e no dark mostra o valor do dark. */
function useTokenValues(names: readonly string[]): Record<string, string> {
  const { theme } = useTheme();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const n of names) next[n] = cs.getPropertyValue(n).trim().toUpperCase();
    setValues(next);
  }, [theme, names]);

  return values;
}

/* ---------- Regra 1 · Paleta restrita · navy + cinza + branco + preto ---------- */
const TONES = [
  {
    name: 'Branco · #FFFFFF',
    role: 'canvas principal, surfaces de card light, contraste em hero navy',
    chip: 'var(--via-white)',
  },
  {
    name: 'Off-white · #F7F8FA',
    role: 'page bg alternativo, surface elev, peso visual sem ruído · --via-gray-50',
    chip: '#F7F8FA',
  },
  {
    name: 'Cinzas · gray-50 → gray-900',
    role: 'hairlines, borders, body text · 10 stops, do #F7F8FA ao quase-preto #101828',
    chip: 'linear-gradient(135deg, #F7F8FA 0%, #D0D5DD 45%, #101828 100%)',
  },
  {
    name: 'Azul escuro · #1E3A5F',
    role: 'borders sobre navy, hover state, mid-tone em gradients · --via-blue',
    chip: '#1E3A5F',
  },
  {
    name: 'Navy · #0A1F3B',
    role: 'cor primária, hero atmosphere, CTAs, marca · 80% do peso visual',
    chip: '#0A1F3B',
  },
  {
    name: 'Preto · #000000',
    role: 'tipografia editorial de peso máximo · monogram, headers fortes · --via-black',
    chip: '#000000',
  },
] as const;

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
              {TONES.map((t) => (
                <li key={t.name}>
                  <span className="vds-phil-allow-chip" style={{ background: t.chip }} aria-hidden="true" />
                  <div>
                    <strong>{t.name}</strong>
                    <em>{t.role}</em>
                  </div>
                </li>
              ))}
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
              Não tem versão "small caps" para alguns lugares e "lowercase" para outros — caps lock + letter-spacing alto é cliché de bootstrap. O padrão editorial é discreto: lowercase, peso modesto, sem decoração antes do texto. As pills abaixo são o componente <code>&lt;Pill&gt;</code> da library, não uma cópia: o que você vê é literalmente o que o produto renderiza.
            </p>
          </div>
        </header>

        <div className="vds-phil-pill-demo">
          <div className="vds-phil-pill-row">
            <span className="vds-phil-pill-lbl">Padrão</span>
            <Pill>em produção</Pill>
            <Pill>corporate</Pill>
            <Pill>há 4 min</Pill>
          </div>
          <div className="vds-phil-pill-row">
            <span className="vds-phil-pill-lbl">Atenção <em>(semântico)</em></span>
            <Pill variant="attn">requer atenção</Pill>
            <Pill variant="attn">expira em 8 dias</Pill>
          </div>
          <div className="vds-phil-pill-row">
            <span className="vds-phil-pill-lbl">Crítico <em>(coral)</em></span>
            <Pill variant="churn">risco churn</Pill>
            <Pill variant="churn">fora do ar</Pill>
          </div>
        </div>

        <pre className="vds-phil-code mono">{`/* src/lib/Pill/Pill.css · a forma canônica */
.via-pill {
  border-radius: var(--via-radius-pill);  /* 999px */
  letter-spacing: -0.004em;
  white-space: nowrap;
  line-height: 1.4;
  border: 1px solid;
}
.via-pill--md {
  padding: 4px 11px;
  font-size: var(--via-fs-label);         /* 11px */
  font-weight: var(--via-fw-medium);      /* 500 */
}
/* NÃO: text-transform: uppercase */
/* NÃO: letter-spacing: 0.10em+ */
/* NÃO: font-weight: 700 */
/* NÃO: bolinha decorativa antes do texto */`}</pre>
      </article>
    </Section>
  );
}

/* ---------- Regra 3 · Tokens canônicos ---------- */
const TOKENS = [
  { name: '--via-navy',        role: 'protagonista · texto, CTA, surfaces dark · 80% do peso visual' },
  { name: '--via-navy-deep',   role: 'gradient bottom · hover state em surfaces dark' },
  { name: '--via-navy-darker', role: 'mesh bottom · footers · bordas escuras' },
  { name: '--via-blue',        role: 'mid azul-escuro · gradient stops · bordas sobre navy' },
  { name: '--via-ink-2',       role: 'texto secundário editorial · meta lines' },
  { name: '--via-ink-3',       role: 'texto terciário · timestamps · captions' },
  { name: '--via-gray-50',     role: 'page bg alt · surface elev sem ruído' },
  { name: '--via-gray-100',    role: 'subtle surface · paper editorial' },
  { name: '--via-gray-300',    role: 'border stronger · gradient highlights' },
  { name: '--via-white',       role: 'canvas principal · superfície primária' },
  { name: '--via-coral',       role: 'destrutivo only · cancel / error real' },
  { name: '--via-success',     role: 'só pra presence dot · uptime · checkmark · navy-adjacent' },
] as const;

const TOKEN_NAMES = TOKENS.map((t) => t.name);

function RuleTokensSection() {
  const { theme } = useTheme();
  const values = useTokenValues(TOKEN_NAMES);

  return (
    <Section title="Regra 3 · Tokens canônicos" meta="12 tokens de cor · navy + cinza + branco + 2 semânticos">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">03</span>
          <div>
            <h3>12 tokens de cor — <em>navy domina 80% do canvas</em>.</h3>
            <p>
              Este é o roster de cor da marca: os 12 tokens abaixo mais a rampa de cinza (gray-50 → gray-900), que é estrutura, não cor. Fora disso, nada. Cores de terceiros (logos parceiros, syntax highlighting em code block) aparecem só nos contextos próprios deles, nunca como acento decorativo. Sem cyan, sem magenta, sem neon, sem roxo "IA", sem dourado, sem amarelo.
            </p>
            <p className="vds-phil-note">
              Os valores abaixo são lidos do CSS em tempo de execução, no tema <strong>{theme === 'dark' ? 'escuro' : 'claro'}</strong> — não são texto digitado. Quatro deles trocam de valor entre os temas: ink-2, ink-3, gray-50 e gray-100.
            </p>
          </div>
        </header>

        <div className="vds-phil-tokens">
          {TOKENS.map((t) => (
            <div key={t.name} className="vds-phil-token">
              <span
                className="vds-phil-token-swatch"
                style={{ background: `var(${t.name})` }}
                aria-hidden="true"
              />
              <div>
                <strong className="mono">{t.name}</strong>
                <span className="vds-phil-token-val mono">{values[t.name] || '—'}</span>
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
    <Section title="Regra 4 · Assinaturas comportamentais" meta="row wash · lift translateY · atmosphere radial">
      <article className="vds-phil-rule">
        <header>
          <span className="vds-phil-num mono">04</span>
          <div>
            <h3>O design system tem <em>uma assinatura sutil</em> no comportamento.</h3>
            <p>
              Cada elemento interativo respira do mesmo jeito. Row de lista lava de navy no hover. Cards sobem 3px e a atmosphere radial do canto superior esquerdo acende junto. Sombra sempre pela tinta <code>--via-shadow-ink-*</code> — navy no tema claro, preta no escuro — nunca <code>--via-navy-*</code> cru em <code>box-shadow</code>, que inverte pra branco no dark e vira halo. Você reconhece "isso é Viver de IA" sem precisar ver o logo.
            </p>
          </div>
        </header>

        <div className="vds-phil-sigs">
          <article className="vds-phil-sig">
            <div className="vds-phil-sig-demo rows">
              <div className="row">Hover em mim</div>
              <div className="row is-selected">Row selecionada</div>
              <div className="row">E em mim também</div>
            </div>
            <h4>Row wash navy</h4>
            <p>Hover pinta <code>--via-navy-04</code>; selecionada pinta <code>--via-navy-08</code> + marcador de 2px à esquerda. O marcador só é legítimo como <strong>estado de seleção em row</strong> — barra lateral colorida em card é banida.</p>
          </article>

          <article className="vds-phil-sig">
            <div className="vds-phil-sig-demo lift">
              <div className="card">Hover pra subir</div>
            </div>
            <h4>Lift translateY</h4>
            <p>-3px no hover · <code>transition .26s cubic-bezier(.2,.7,.2,1)</code> · acompanhado de shadow expand em <code>--via-shadow-ink-20</code>.</p>
          </article>

          <article className="vds-phil-sig">
            <div className="vds-phil-sig-demo atmos">
              <div className="card">Atmosphere radial</div>
            </div>
            <h4>Radial atmosphere</h4>
            <p>Canônico: <code>radial-gradient(540px 240px at 0% 0%, var(--via-navy-04), transparent 60%)</code> no top-left. A demo acima usa <code>--via-navy-08</code> só pra ler em card pequeno.</p>
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
            <span className="vds-phil-dot-lbl bad">
              <X size={13} strokeWidth={2.2} aria-hidden="true" /> Banido
            </span>
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
            <span className="vds-phil-dot-lbl">
              <Check size={13} strokeWidth={2.2} aria-hidden="true" /> Editorial
            </span>
            <Pill>Pago</Pill>
            <Pill>Production</Pill>
            <Pill>Verificado</Pill>
          </div>
          <div className="vds-phil-dot-row">
            <span className="vds-phil-dot-lbl">
              <Check size={13} strokeWidth={2.2} aria-hidden="true" /> Live real
            </span>
            <Pill variant="live">ao vivo agora</Pill>
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
