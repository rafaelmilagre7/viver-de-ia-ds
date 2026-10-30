import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SubidoLogo } from "@/components/brand/subido-logo";

/**
 * Palco da tela de login (só em telas largas): a marca entra animada e, atrás
 * dela, um funil "vivo" — a curva de vendas se desenha e de tempos em tempos
 * recebe dado novo, com cartões de vidro que flutuam devagar. É a promessa do
 * CRM em movimento: conversa virando negócio e negócio virando receita.
 * Mesmo palco do My Dashboard, com os textos e números do CRM.
 *
 * Tudo decorativo (aria-hidden), sem dado real. Com prefers-reduced-motion o
 * palco fica parado no estado final.
 */

const W = 640;
const H = 300;
const N = 14;

function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/** Série que sobe com ruído: começa embaixo à esquerda e termina no alto. */
function risingSeries(seed: number): number[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: N }, (_, i) => {
    const trend = 0.18 + (i / (N - 1)) * 0.66;
    const noise = (rand() - 0.5) * 0.16;
    return Math.min(0.94, Math.max(0.08, trend + noise));
  });
}

/** Curva suave (Catmull-Rom → Bézier) pelos pontos. */
function smoothPath(values: number[]): string {
  const pts = values.map((v, i) => [(i / (values.length - 1)) * W, H - v * H] as const);
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/** Número que conta até o valor depois de um atraso. */
function useCountUp(target: number, delay: number, ms = 1400): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        setValue(target * (1 - Math.pow(1 - t, 4)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target, delay, ms]);
  return value;
}

function Sparkline({ values }: { values: number[] }) {
  const d = values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (values.length - 1)) * 64} ${22 - v * 22}`)
    .join(" ");
  return (
    <svg viewBox="0 0 64 22" width="64" height="22" className="lst-spark" aria-hidden>
      <path d={d} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface StageCard {
  rotulo: string;
  /** Valor final; o palco conta de 0 até ele. */
  valor: number;
  formato?: "moeda-mil" | "inteiro";
  /** Linha de baixo: delta ("18,4% vs. mês anterior") ou contexto. */
  sub?: string;
  delta?: boolean;
}

/**
 * Textos do palco: troque por produto. Os números são DECORATIVOS (aria-hidden),
 * plausíveis e redondos o bastante para não parecerem dado real.
 */
export function LoginStage({
  titulo = "Cada conversa vira negócio. Cada negócio, receita.",
  lead = "WhatsApp, Instagram, e-mail e voz atendidos pela IA, num funil que a equipe inteira enxerga e acompanha.",
  cards = [
    { rotulo: "Vendas · 30 dias", valor: 482.6, formato: "moeda-mil", sub: "18,4% vs. mês anterior", delta: true },
    { rotulo: "Conversas atendidas pela IA", valor: 11920, formato: "inteiro", sub: "WhatsApp, Instagram e e-mail · 90 dias" },
    { rotulo: "Etapas do funil", valor: 6, formato: "inteiro" },
  ],
}: { titulo?: string; lead?: string; cards?: [StageCard, StageCard, StageCard] } = {}) {
  const [series, setSeries] = useState(() => risingSeries(7));
  const seriesRef = useRef(series);
  seriesRef.current = series;
  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const barsRef = useRef<SVGGElement>(null);
  const tweening = useRef<number>(0);

  const revenue = useCountUp(cards[0].valor, 1500);
  const conversations = useCountUp(cards[1].valor, 1750);
  const sources = useCountUp(cards[2].valor, 2000, 900);

  const line = useMemo(() => smoothPath(series), [series]);
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  const last = series[series.length - 1];

  // Entrada: as colunas do fundo crescem, a linha se desenha e a área aparece.
  useEffect(() => {
    if (reducedMotion()) return;
    const path = lineRef.current;
    if (path) {
      const len = path.getTotalLength();
      path.animate(
        [
          { strokeDasharray: `${len}`, strokeDashoffset: `${len}` },
          { strokeDasharray: `${len}`, strokeDashoffset: "0" },
        ],
        { duration: 1900, delay: 900, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "backwards" },
      );
    }
    areaRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1200,
      delay: 1900,
      easing: "ease-out",
      fill: "backwards",
    });
    Array.from(barsRef.current?.children ?? []).forEach((bar, i) => {
      (bar as SVGElement).animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
        duration: 900,
        delay: 300 + i * 55,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "backwards",
      });
    });
  }, []);

  // "Dado novo chegando": a cada 5 s a série desliza para a esquerda e entra
  // um ponto novo no fim, interpolado suavemente.
  useEffect(() => {
    if (reducedMotion()) return;
    let seed = 11;
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      seed += 13;
      const target = risingSeries(seed);
      const from = seriesRef.current;
      const start = performance.now();
      cancelAnimationFrame(tweening.current);
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        setSeries(from.map((v, i) => v + (target[i] - v) * e));
        if (t < 1) tweening.current = requestAnimationFrame(tick);
      };
      tweening.current = requestAnimationFrame(tick);
    }, 5200);
    return () => {
      window.clearInterval(id);
      cancelAnimationFrame(tweening.current);
    };
  }, []);

  return (
    <div className="lst-stage" aria-hidden="true">
      <style>{`
        .lst-stage {
          position: relative; height: 100%; width: 100%;
          border-radius: var(--via-radius-2xl);
          overflow: hidden; isolation: isolate;
          background:
            radial-gradient(720px 420px at 0% 0%, color-mix(in srgb, var(--subido-blue) 20%, transparent), transparent 60%),
            radial-gradient(640px 460px at 100% 100%, color-mix(in srgb, var(--subido-blue) 14%, transparent), transparent 62%),
            linear-gradient(160deg, var(--via-navy) 0%, var(--via-navy-deep) 70%);
          color: var(--via-white);
          box-shadow: 0 1px 0 var(--via-edge-hi) inset, 0 30px 60px -36px var(--via-shadow-ink-60);
          display: flex; flex-direction: column;
          padding: clamp(28px, 4vw, 48px);
        }
        /* trama fina, quase invisível: dá textura de "papel quadriculado" de gráfico */
        .lst-stage::before {
          content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background-image:
            linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(120% 90% at 30% 20%, #000 30%, transparent 75%);
        }
        .lst-head { position: relative; max-width: 30rem; }
        .lst-title {
          margin: 28px 0 10px; font-size: clamp(28px, 2.6vw, 36px); line-height: 1.12;
          font-weight: var(--via-fw-medium); letter-spacing: var(--via-ls-tighter); color: var(--via-white);
          text-wrap: balance;
          animation: lst-rise 700ms var(--via-ease-out) 1.2s both;
        }
        .lst-lead {
          margin: 0; font-size: 15px; line-height: 1.6; color: rgb(255 255 255 / 0.66); max-width: 44ch;
          animation: lst-rise 700ms var(--via-ease-out) 1.35s both;
        }
        @keyframes lst-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

        .lst-scene { position: relative; flex: 1; min-height: 300px; margin-top: 24px; }
        .lst-chart { position: absolute; left: -2%; right: -2%; bottom: 0; width: 104%; height: 72%; overflow: visible; }
        .lst-chart .lst-bar { fill: rgb(255 255 255 / 0.05); transform-box: fill-box; transform-origin: 50% 100%; }
        .lst-chart .lst-grid { stroke: rgb(255 255 255 / 0.07); stroke-dasharray: 2 6; }
        .lst-chart .lst-line { fill: none; stroke: var(--subido-blue-light); stroke-width: 3; stroke-linecap: round; filter: drop-shadow(0 6px 14px color-mix(in srgb, var(--subido-blue) 55%, transparent)); }
        .lst-chart .lst-area { fill: url(#lst-area-fill); }
        .lst-live { fill: var(--subido-blue-light); }
        .lst-live-ring { fill: none; stroke: var(--subido-blue-light); stroke-width: 2; transform-box: fill-box; transform-origin: center; animation: lst-ping 2.4s ease-out 3s infinite; opacity: 0; }
        @keyframes lst-ping { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(3.2); opacity: 0; } }

        /* cartões de vidro: 4 camadas do liquid glass (tinta, desfoque, linha, sombra) */
        .lst-card {
          position: absolute; min-width: 188px;
          padding: 14px 16px; border-radius: var(--via-radius-lg);
          background: rgb(255 255 255 / 0.08);
          backdrop-filter: blur(18px) saturate(160%); -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgb(255 255 255 / 0.14);
          box-shadow: 0 1px 0 rgb(255 255 255 / 0.18) inset, 0 18px 40px -22px rgb(0 0 0 / 0.55);
          animation: lst-card-in 800ms var(--via-ease-out) both, lst-float var(--float, 9s) ease-in-out infinite alternate;
          animation-delay: var(--in, 1.4s), calc(var(--in, 1.4s) + 800ms);
        }
        @keyframes lst-card-in { from { opacity: 0; transform: translateY(16px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes lst-float { from { transform: translateY(0); } to { transform: translateY(-8px); } }
        .lst-k { font-size: 12px; color: rgb(255 255 255 / 0.62); margin: 0 0 6px; }
        .lst-v { font-size: 24px; font-weight: var(--via-fw-medium); letter-spacing: var(--via-ls-tight); color: var(--via-white); font-variant-numeric: tabular-nums; margin: 0; line-height: 1.1; }
        .lst-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; }
        .lst-delta { display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 11px; font-weight: var(--via-fw-medium); color: var(--subido-blue-pale); }
        .lst-sub { margin-top: 6px; font-size: 11px; color: rgb(255 255 255 / 0.5); }
        .lst-spark path { stroke: var(--subido-blue-light); }
        .lst-dots { display: flex; gap: 4px; margin-top: 8px; }
        .lst-dots span { width: 18px; height: 6px; border-radius: 999px; background: rgb(255 255 255 / 0.18); }
        .lst-dots span.on { background: var(--subido-blue-light); }

        @media (prefers-reduced-motion: reduce) {
          .lst-title, .lst-lead, .lst-card, .lst-live-ring { animation: none; }
        }
      `}</style>

      <div className="lst-head">
        <SubidoLogo height={56} animate="intro" loopEvery={9000} tone="inverse" title="subido AI" />
        <h2 className="lst-title">{titulo}</h2>
        <p className="lst-lead">{lead}</p>
      </div>

      <div className="lst-scene">
        <svg className="lst-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="lst-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--subido-blue)", stopOpacity: 0.38 }} />
              <stop offset="100%" style={{ stopColor: "var(--subido-blue)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} className="lst-grid" x1="0" x2={W} y1={H * f} y2={H * f} />
          ))}
          <g ref={barsRef}>
            {Array.from({ length: 16 }, (_, i) => {
              const h = (0.22 + (i / 15) * 0.55 + ((i * 37) % 11) / 60) * H;
              return (
                <rect
                  key={i}
                  className="lst-bar"
                  x={i * (W / 16) + 10}
                  y={H - h}
                  width={W / 16 - 20}
                  height={h}
                  rx="4"
                />
              );
            })}
          </g>
          <path ref={areaRef} className="lst-area" d={area} />
          <path ref={lineRef} className="lst-line" d={line} />
          <circle className="lst-live-ring" cx={W} cy={H - last * H} r="6" />
          <circle className="lst-live" cx={W} cy={H - last * H} r="5" />
        </svg>

        <div
          className="lst-card"
          style={{ top: "0%", right: "3%", "--in": "1.5s", "--float": "8s" } as React.CSSProperties}
        >
          <p className="lst-k">{cards[0].rotulo}</p>
          <div className="lst-row">
            <p className="lst-v">
              R${" "}
              {revenue.toLocaleString("pt-BR", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}{" "}
              mil
            </p>
            <Sparkline values={series.slice(-8)} />
          </div>
          <span className="lst-delta">
            <ArrowUpRight size={12} strokeWidth={2.4} /> {cards[0].sub}
          </span>
        </div>

        <div
          className="lst-card"
          style={
            { top: "16%", left: "0%", "--in": "1.75s", "--float": "10s" } as React.CSSProperties
          }
        >
          <p className="lst-k">{cards[1].rotulo}</p>
          <p className="lst-v">{Math.round(conversations).toLocaleString("pt-BR")}</p>
          <p className="lst-sub">{cards[1].sub}</p>
        </div>

        <div
          className="lst-card"
          style={
            { top: "38%", right: "12%", "--in": "2s", "--float": "11s" } as React.CSSProperties
          }
        >
          <p className="lst-k">{cards[2].rotulo}</p>
          <p className="lst-v">{Math.round(sources)}</p>
          <div className="lst-dots">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={i < Math.round(sources) ? "on" : ""} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
