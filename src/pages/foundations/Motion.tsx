import { useEffect, useRef, useState, type CSSProperties } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Button } from '../../lib/Button/Button';
import { tokens, type TokenName } from '../../lib/tokens';
import { DUR, EASE, prefersReducedMotion, usePresence } from '../../lib/_shared/motion';
import {
  SPRING,
  animateSpring,
  springSettled,
  springStep,
  type SpringParams,
  type SpringState,
} from '../../lib/_shared/spring';
import '../pages.css';
import './motion.css';

/* Tudo nesta página sai do código: durações de DUR (espelho testado de
   tokens.css), curvas de EASE, molas de SPRING. Nada de número digitado à
   mão aqui — se a escala mudar, a página muda junto. */

const vars = (o: Record<string, string>) => o as CSSProperties;

/* ---------- Durações ---------- */

const scale: Array<{ tok: TokenName; ms: number; role: string; exit: TokenName }> = [
  { tok: 'via-dur-press', ms: DUR.press, role: 'Apertar · resposta no pointer-down', exit: 'via-dur-press' },
  { tok: 'via-dur-quick', ms: DUR.quick, role: 'Hover, cor, borda · menu e tooltip entrando', exit: 'via-dur-press' },
  { tok: 'via-dur-base', ms: DUR.base, role: 'Modal, popover, aba, acordeão, toast', exit: 'via-dur-quick' },
  { tok: 'via-dur-panel', ms: DUR.panel, role: 'Painel grande, deslize de conteúdo', exit: 'via-dur-base' },
  { tok: 'via-dur-page', ms: DUR.page, role: 'Rota, troca de contexto', exit: 'via-dur-panel' },
];

/* ---------- Curvas ---------- */

const curves: Array<{ tok: TokenName; value: string; use: string }> = [
  {
    tok: 'via-ease-enter',
    value: EASE.enter,
    use: 'Tudo que ENTRA · chega rápido e assenta. Menu, modal, toast, página nova.',
  },
  {
    tok: 'via-ease-exit',
    value: EASE.exit,
    use: 'Tudo que SAI · acelera pra fora. Some sem pedir atenção.',
  },
  {
    tok: 'via-ease-snap',
    value: EASE.snap,
    use: 'Interação · hover, press, troca de estado no lugar. Na dúvida, é esta.',
  },
];

const bezier = (v: string) => (v.match(/-?\d*\.?\d+/g) ?? []).map(Number) as [number, number, number, number];

/** Gráfico da curva (tempo → progresso) desenhado dos números do token */
function CurvePlot({ value }: { value: string }) {
  const [x1, y1, x2, y2] = bezier(value);
  const W = 120;
  const H = 64;
  const p = (x: number, y: number) => `${(x * W).toFixed(1)},${((1 - y) * H).toFixed(1)}`;
  return (
    <svg className="vds-mo-plot" viewBox={`-4 -4 ${W + 8} ${H + 8}`} aria-hidden="true">
      <line x1={0} y1={H} x2={W} y2={0} className="vds-mo-plot__diag" />
      <line x1={0} y1={H} x2={x1 * W} y2={(1 - y1) * H} className="vds-mo-plot__handle" />
      <line x1={W} y1={0} x2={x2 * W} y2={(1 - y2) * H} className="vds-mo-plot__handle" />
      <path d={`M${p(0, 0)} C${p(x1, y1)} ${p(x2, y2)} ${p(1, 1)}`} className="vds-mo-plot__curve" />
    </svg>
  );
}

/* ---------- Molas ---------- */

const springRole: Record<string, string> = {
  move: 'Reposicionar · arrastar e soltar algo no lugar',
  sheet: 'Gesto com embalo · saída de Sheet/Drawer e o arrasto',
  panel: 'Entrada de painel · chega da borda sem quicar',
};

/** Settle e overshoot calculados com o MESMO integrador da library (0 → 100px) */
function springStats(params: SpringParams) {
  let s: SpringState = { value: 0, velocity: 0 };
  let peak = 0;
  let t = 0;
  const dt = 1 / 240;
  while (t < 3 && !springSettled(s, 100)) {
    s = springStep(s, 100, params, dt);
    peak = Math.max(peak, s.value);
    t += dt;
  }
  return { settle: Math.round(t * 1000), overshoot: Math.max(0, peak - 100) };
}

/** Pista com a mola de verdade: clicar no meio do caminho inverte levando a velocidade */
function SpringLane({ params, label }: { params: SpringParams; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const pos = useRef(0);
  const target = useRef<'start' | 'end'>('start');
  const anim = useRef<{ cancel: () => SpringState } | null>(null);

  useEffect(() => () => void anim.current?.cancel(), []);

  const fire = () => {
    const track = trackRef.current;
    const dot = dotRef.current;
    if (!track || !dot) return;
    const end = track.clientWidth - dot.offsetWidth - 8;
    const paint = (v: number) => {
      pos.current = v;
      dot.style.transform = `translateX(${v}px)`;
    };
    const live = anim.current?.cancel();
    anim.current = null;
    target.current = target.current === 'start' ? 'end' : 'start';
    const to = target.current === 'end' ? end : 0;
    if (prefersReducedMotion()) {
      paint(to);
      return;
    }
    anim.current = animateSpring({
      from: live ? live.value : pos.current,
      velocity: live?.velocity ?? 0,
      to,
      params,
      onFrame: paint,
    });
  };

  return (
    <div className="vds-mo-spring">
      <button type="button" className="vds-mo-fire" onClick={fire} aria-label={`Disparar a mola ${label}`}>
        {label}
      </button>
      <div ref={trackRef} className="vds-mo-lane vds-mo-lane--js">
        <span ref={dotRef} className="vds-mo-lane__dot" />
      </div>
    </div>
  );
}

/** Pista de CSS: ida com a duração/curva de entrada, volta com as de saída */
function Lane({ on, style, wide }: { on: boolean; style: CSSProperties; wide?: boolean }) {
  return (
    <div className={`vds-mo-lane${wide ? ' vds-mo-lane--overshoot' : ''}`} data-on={on || undefined} style={style}>
      <span className="vds-mo-lane__dot" />
    </div>
  );
}

/* ---------- Presença (entra, fica, sai) ---------- */

function PresenceDemo() {
  const [open, setOpen] = useState(false);
  const [slow, setSlow] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { mounted, state } = usePresence(open, ref);
  return (
    <div
      className="vds-mo-stage"
      data-slow={slow || undefined}
      data-reduced={reduced || undefined}
    >
      <div className="vds-mo-stage__bar">
        <Button size="sm" variant="secondary" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Fechar' : 'Abrir'} menu
        </Button>
        <label className="vds-mo-check">
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} />
          Câmera lenta (5×)
        </label>
        <label className="vds-mo-check">
          <input type="checkbox" checked={reduced} onChange={(e) => setReduced(e.target.checked)} />
          Simular menos movimento
        </label>
      </div>
      <div className="vds-mo-stage__area">
        {mounted && (
          <div ref={ref} className="vds-mo-pop" data-state={state}>
            <p className="vds-mo-pop__item">Duplicar</p>
            <p className="vds-mo-pop__item">Mover para…</p>
            <p className="vds-mo-pop__item">Arquivar</p>
          </div>
        )}
      </div>
      <p className="vds-mo-stage__hint">
        Estado: <strong>{mounted ? (state === 'open' ? 'aberto' : 'saindo') : 'desmontado'}</strong>
        {' · '}clique de novo no meio da saída — a camada volta do ponto onde está.
      </p>
    </div>
  );
}

export default function Motion() {
  const [play, setPlay] = useState(false);
  const [cssSpring, setCssSpring] = useState(false);
  const presets = Object.entries(SPRING) as Array<[string, SpringParams]>;

  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · movimento"
        title={
          <>
            Confiante, <em>desacelerando</em>.
          </>
        }
        lede="Movimento tem escala, como cor e espaço: cinco durações por papel, três curvas e molas pra gesto. Tudo que entra também sai — um degrau mais rápido do que chegou. Overshoot só na marca de um controle. Quem pede menos movimento ganha crossfade, não tela travada."
      />

      <Section title="Durações" meta="5 papéis · saída um degrau abaixo">
        <div className="vds-mo-scale">
          <div className="vds-mo-scale__head">
            <Button size="sm" variant="secondary" onClick={() => setPlay((p) => !p)}>
              {play ? 'Voltar (saída)' : 'Tocar (entrada)'}
            </Button>
            <span className="vds-mo-scale__legend">
              A ida usa a duração do papel + <code className="vds-code-inline">--via-ease-enter</code>;
              a volta, o degrau de baixo + <code className="vds-code-inline">--via-ease-exit</code>.
            </span>
          </div>
          {scale.map((d) => (
            <div key={d.tok} className="vds-mo-row">
              <div className="vds-mo-row__meta">
                <p className="vds-motion-tok">--{d.tok}</p>
                <p className="vds-mo-row__ms">
                  {d.ms}ms <span>· sai em {tokens[d.exit]}</span>
                </p>
              </div>
              <Lane
                on={play}
                style={vars({ '--lane-in': `var(--${d.tok})`, '--lane-out': `var(--${d.exit})` })}
              />
              <p className="vds-motion-use">{d.role}</p>
            </div>
          ))}
        </div>
        <p className="vds-motion-note">
          A saída fica entre <strong>0,6× e 0,8×</strong> da entrada (teste automatizado garante).
          Na library, duração e curva escritas à mão não passam: o{' '}
          <code className="vds-code-inline">lint:tokens</code> barra{' '}
          <code className="vds-code-inline">120ms</code>, <code className="vds-code-inline">ease</code> e{' '}
          <code className="vds-code-inline">cubic-bezier(…)</code> soltos — loop{' '}
          <code className="vds-code-inline">infinite</code> (spinner, shimmer) fica de fora. Os nomes
          antigos (<code className="vds-code-inline">--via-dur</code>,{' '}
          <code className="vds-code-inline">--via-t*</code>,{' '}
          <code className="vds-code-inline">--via-ease</code>,{' '}
          <code className="vds-code-inline">--via-ease-out</code>,{' '}
          <code className="vds-code-inline">--via-ease-spring</code>) seguem valendo como apelidos
          da escala nova.
        </p>
      </Section>

      <Section title="Curvas" meta="3 curvas">
        <div className="vds-motion-grid vds-mo-curves">
          {curves.map((c) => (
            <div key={c.tok} className="vds-motion-card">
              <div className="vds-mo-curve-head">
                <div>
                  <p className="vds-motion-tok">--{c.tok}</p>
                  <p className="vds-motion-curve">{c.value}</p>
                </div>
                <CurvePlot value={c.value} />
              </div>
              <div className="vds-motion-track">
                <div className="vds-motion-dot" style={{ animationTimingFunction: `var(--${c.tok})` }} />
              </div>
              <p className="vds-motion-use">{c.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Molas" meta="física, não duração">
        <p className="vds-mo-lede">
          Gesto (arrastar, soltar, jogar) não tem duração fixa: a mola parte da velocidade do dedo,
          pode ser interrompida no meio e o tempo emerge da física. Clique de novo durante o
          movimento — a bola inverte levando o embalo, sem recomeçar.
        </p>
        <table className="vds-token-table vds-mo-springs-table">
          <thead>
            <tr>
              <th>Preset</th>
              <th>Damping · response</th>
              <th>Assenta em</th>
              <th>Overshoot</th>
              <th>Papel</th>
            </tr>
          </thead>
          <tbody>
            {presets.map(([name, p]) => {
              const st = springStats(p);
              return (
                <tr key={name}>
                  <td className="tok">SPRING.{name}</td>
                  <td className="val">
                    {p.damping.toFixed(2)} · {p.response}s
                  </td>
                  <td className="val">~{st.settle}ms</td>
                  <td className="val">{st.overshoot < 0.5 ? 'nenhum' : `${st.overshoot.toFixed(1)}%`}</td>
                  <td className="use">{springRole[name] ?? '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="vds-mo-springs">
          {presets.map(([name, p]) => (
            <SpringLane key={name} params={p} label={name} />
          ))}
        </div>

        <div className="vds-mo-css-springs">
          <div className="vds-mo-scale__head">
            <Button size="sm" variant="secondary" onClick={() => setCssSpring((s) => !s)}>
              {cssSpring ? 'Voltar' : 'Tocar'} molas de CSS
            </Button>
            <span className="vds-mo-scale__legend">
              A mesma física aproximada em <code className="vds-code-inline">linear()</code>, pra
              transição de CSS sem JS.
            </span>
          </div>
          <div className="vds-mo-row">
            <div className="vds-mo-row__meta">
              <p className="vds-motion-tok">--via-spring-smooth</p>
              <p className="vds-mo-row__ms">damping 1.0 · com --via-dur-page</p>
            </div>
            <Lane
              on={cssSpring}
              style={vars({
                '--lane-in': 'var(--via-dur-page)',
                '--lane-out': 'var(--via-dur-page)',
                '--lane-in-ease': 'var(--via-spring-smooth)',
                '--lane-out-ease': 'var(--via-spring-smooth)',
              })}
            />
            <p className="vds-motion-use">Move sem quicar.</p>
          </div>
          <div className="vds-mo-row">
            <div className="vds-mo-row__meta">
              <p className="vds-motion-tok">--via-spring-bounce</p>
              <p className="vds-mo-row__ms">damping .6 · com --via-dur-panel</p>
            </div>
            <Lane
              wide
              on={cssSpring}
              style={vars({
                '--lane-in': 'var(--via-dur-panel)',
                '--lane-out': 'var(--via-dur-panel)',
                '--lane-in-ease': 'var(--via-spring-bounce)',
                '--lane-out-ease': 'var(--via-spring-bounce)',
              })}
            />
            <p className="vds-motion-use">
              O único overshoot autorizado — e só na marca de check, radio e switch.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Entra, fica, sai" meta="toda camada">
        <p className="vds-mo-lede">
          Nada que aparece some num quadro. Menu, popover, tooltip, modal, paleta e toast ficam
          montados durante a saída: opacidade + escala .97 na direção do trigger, um degrau mais
          curta que a entrada e acelerando. A saída é transição de CSS (não keyframe), então fechar
          e reabrir no meio reverte do ponto atual. ESC, foco de volta ao trigger e trava de rolagem
          continuam valendo durante a saída.
        </p>
        <PresenceDemo />
        <CodeBlock>{`/* Camada que entra e sai (o que menus/popovers da library fazem) */
.camada {
  transition:
    opacity var(--via-dur-quick) var(--via-ease-enter),
    scale   var(--via-dur-quick) var(--via-ease-enter);
}
/* entrada sem JS: o estado de partida */
@starting-style {
  .camada { opacity: 0; scale: var(--via-enter-scale); }
}
/* saída: um degrau abaixo, acelerando — reverte se reabrir */
.camada[data-state='closed'] {
  opacity: 0;
  scale: var(--via-enter-scale);
  transition-duration: var(--via-dur-press);
  transition-timing-function: var(--via-ease-exit);
}`}</CodeBlock>
      </Section>

      <Section title="Menos movimento" meta="prefers-reduced-motion">
        <p className="vds-mo-lede">
          Reduzir movimento não é congelar a tela. Com a preferência ligada, deslocamento e escala
          somem (<code className="vds-code-inline">--via-enter-scale</code> vira 1,{' '}
          <code className="vds-code-inline">--via-enter-shift</code> vira 0) e fica o crossfade curto
          — sem ele a camada “pisca” e o olho perde de onde veio a mudança. Molas de gesto viram fade;
          troca de página e de tema viram troca seca. Todo o resto cai na rede de segurança global
          de <code className="vds-code-inline">tokens.css</code>, que zera animação e transição.
        </p>
        <p className="vds-motion-note">
          Marque “Simular menos movimento” na demonstração acima: o menu passa a só aparecer e sumir
          em fade.
        </p>
      </Section>

      <Section title="Troca de página e de tema" meta="view transitions">
        <p className="vds-mo-lede">
          Na navegação pela barra lateral, pelo cabeçalho ou pela busca (⌘K), a página velha sai em
          120ms acelerando e a nova entra em <code className="vds-code-inline">--via-dur-base</code>{' '}
          subindo 8px. Cabeçalho e barra lateral ficam parados; o título da página e o marcador do
          link ativo deslizam do lugar velho pro novo. Na troca de tema a página inteira faz um
          crossfade de <code className="vds-code-inline">--via-dur-base</code> e nenhuma transição por
          elemento roda no meio — nada de texto escuro sobre fundo escuro por um instante.
        </p>
        <table className="vds-token-table">
          <thead>
            <tr>
              <th>Navegador</th>
              <th>O que acontece</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tok">Chrome/Edge 125+, Safari 18.2+</td>
              <td className="use">Coreografia completa (página, título e marcador).</td>
            </tr>
            <tr>
              <td className="tok">View Transitions sem :active-view-transition</td>
              <td className="use">
                Chrome 111–124, Safari 18.0–18.1: crossfade padrão da página inteira (cabeçalho e
                barra lateral idênticos nas duas imagens não piscam).
              </td>
            </tr>
            <tr>
              <td className="tok">Sem View Transitions</td>
              <td className="use">
                Página nova entra com fade de {DUR.page}ms; tema troca seco, sem rasgo.
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Padrões de interação" meta="receita">
        <CodeBlock>{`/* Hover · cor e borda em quick, deslocamento em base */
transition:
  border-color var(--via-dur-quick) var(--via-ease-snap),
  background   var(--via-dur-quick) var(--via-ease-snap),
  box-shadow   var(--via-dur-base)  var(--via-ease-snap),
  transform    var(--via-dur-base)  var(--via-ease-snap);

/* Press · é o que o <Button> da library faz */
transform: translateY(0) scale(0.985);
transition-duration: var(--via-dur-press);

/* Foco */
outline: none;
box-shadow: var(--via-shadow-focus);`}</CodeBlock>
        <p className="vds-motion-note">
          Anime só <code className="vds-code-inline">transform</code>/
          <code className="vds-code-inline">translate</code>/<code className="vds-code-inline">scale</code>{' '}
          e <code className="vds-code-inline">opacity</code>. Indicador que cresce (aba, progresso)
          anda por <code className="vds-code-inline">translateX</code>/
          <code className="vds-code-inline">scaleX</code>, nunca por{' '}
          <code className="vds-code-inline">width</code>/<code className="vds-code-inline">left</code>.
          Vidro que aparece faz fade de uma camada já desfocada — animar{' '}
          <code className="vds-code-inline">backdrop-filter</code> repinta o blur a cada quadro.
        </p>
      </Section>

      <Section title="Não faça" meta="off-motion">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Um papel, uma duração da escala. Entrada com{' '}
              <code className="vds-code-inline">--via-ease-enter</code>, saída um degrau abaixo com{' '}
              <code className="vds-code-inline">--via-ease-exit</code>. Gesto na mola. Crossfade
              curto pra quem pede menos movimento.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Camada que some num quadro. <code className="vds-code-inline">ease</code> e milissegundo
              soltos. Overshoot fora de check, radio e switch (modal e toast não quicam). Animar width,
              left ou blur. Ripple, parallax, partículas, autoplay em loop infinito.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
