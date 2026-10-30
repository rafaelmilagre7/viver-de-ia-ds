import { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  AI_BAR,
  AI_DIAGONAL,
  AI_LEG,
  BASELINE,
  LOGO_VIEWBOX,
  LOGO_VIEWBOX_NO_TAGLINE,
  TAGLINE,
  WORD_GLYPHS,
} from "./subido-logo-paths";

/**
 * Logo SUBIDO AI, vetorial e animada.
 *
 * A animação conta o nome: "subido" sobe letra por letra de baixo da linha de
 * base; as duas barras do "AI" crescem como colunas de um gráfico e o traço
 * diagonal sobe como uma linha de tendência. Depois, em alguns momentos
 * (passar o mouse, um intervalo longo, uma conquista no app), as barras
 * "atualizam" e as letras fazem uma onda curta — dado chegando.
 *
 * Tudo em Web Animations API (element.animate): sem dependência, cancelável e
 * respeitando prefers-reduced-motion (sem movimento, a logo só aparece).
 */

export interface SubidoLogoHandle {
  /** Reproduz a entrada completa. */
  intro: () => void;
  /** O "momento": barras atualizam e as letras fazem uma onda. */
  pulse: () => void;
}

interface SubidoLogoProps {
  /** Altura em px (a largura sai da proporção). */
  height?: number;
  tagline?: boolean;
  /** intro = entra animada ao montar; hover = só o "momento" ao passar o mouse. */
  animate?: "intro" | "hover" | false;
  /** Repete o "momento" a cada N ms enquanto a página estiver visível. */
  loopEvery?: number;
  /** inverse = sobre fundo navy (palavra branca, assinatura translúcida). */
  tone?: "default" | "inverse";
  className?: string;
  title?: string;
}

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SNAP = "cubic-bezier(0.2, 0.8, 0.2, 1)";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export const SubidoLogo = forwardRef<SubidoLogoHandle, SubidoLogoProps>(function SubidoLogo(
  {
    height = 32,
    tagline = false,
    animate = false,
    loopEvery,
    tone = "default",
    className,
    title = "subido AI · by Viver de IA",
  },
  ref,
) {
  const svgRef = useRef<SVGSVGElement>(null);
  const glyphRefs = useRef<(SVGPathElement | null)[]>([]);
  const diagRef = useRef<SVGPolygonElement>(null);
  const legRef = useRef<SVGRectElement>(null);
  const barRef = useRef<SVGRectElement>(null);
  const aiRef = useRef<SVGGElement>(null);
  const tagRef = useRef<SVGPathElement>(null);
  const running = useRef<Animation[]>([]);
  // id único por logo: com duas na página (uma escondida no celular/desktop),
  // um id repetido fazia o recorte apontar para a escondida e não recortar nada.
  const clipId = `subido-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const track = (a: Animation | undefined) => {
    if (a) running.current.push(a);
  };
  const cancelAll = () => {
    for (const a of running.current) a.cancel();
    running.current = [];
  };

  const intro = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.dataset.intro = "running";
    if (prefersReducedMotion()) return;
    cancelAll();
    // 1 · "subido" sobe de baixo da linha de base, uma letra de cada vez
    glyphRefs.current.forEach((g, i) => {
      track(
        g?.animate(
          [
            { transform: "translateY(620px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
          ],
          { duration: 760, delay: 70 * i, easing: EASE_OUT, fill: "backwards" },
        ),
      );
    });
    // 2 · as barras do AI crescem como colunas de gráfico
    [legRef.current, barRef.current].forEach((el, i) => {
      track(
        el?.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
          duration: 640,
          delay: 360 + i * 140,
          easing: EASE_OUT,
          fill: "backwards",
        }),
      );
    });
    // 3 · o traço diagonal sobe como uma linha de tendência, do canto de baixo
    track(
      diagRef.current?.animate(
        [{ clipPath: "inset(100% 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
        { duration: 620, delay: 620, easing: EASE_SNAP, fill: "backwards" },
      ),
    );
    // 4 · o AI dá um brilho curto quando fecha
    track(
      aiRef.current?.animate(
        [{ filter: "brightness(1)" }, { filter: "brightness(1.45)" }, { filter: "brightness(1)" }],
        { duration: 700, delay: 1180, easing: "ease-out" },
      ),
    );
    // 5 · a assinatura entra da esquerda para a direita
    track(
      tagRef.current?.animate(
        [
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0 0 0)", opacity: 1 },
        ],
        { duration: 760, delay: 980, easing: EASE_OUT, fill: "backwards" },
      ),
    );
  }, []);

  const pulse = useCallback(() => {
    if (prefersReducedMotion()) return;
    // barras "atualizam": sobem um pouco além e assentam, uma depois da outra
    [legRef.current, barRef.current].forEach((el, i) => {
      track(
        el?.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0.72)", offset: 0.3 },
            { transform: "scaleY(1.06)", offset: 0.7 },
            { transform: "scaleY(1)" },
          ],
          { duration: 900, delay: i * 120, easing: EASE_SNAP },
        ),
      );
    });
    // a tendência redesenha
    track(
      diagRef.current?.animate(
        [{ clipPath: "inset(100% 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
        { duration: 520, delay: 160, easing: EASE_SNAP, fill: "backwards" },
      ),
    );
    // onda curta nas letras: o nome "sobe" de novo
    glyphRefs.current.forEach((g, i) => {
      track(
        g?.animate(
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-46px)" },
            { transform: "translateY(0)" },
          ],
          { duration: 520, delay: 40 * i, easing: EASE_SNAP },
        ),
      );
    });
  }, []);

  useImperativeHandle(ref, () => ({ intro, pulse }), [intro, pulse]);

  useEffect(() => {
    if (animate === "intro") intro();
    else if (svgRef.current) svgRef.current.dataset.intro = "running";
    return cancelAll;
  }, [animate, intro]);

  // "Em alguns momentos": um pulso de tempos em tempos, só com a aba visível.
  useEffect(() => {
    if (!loopEvery) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") pulse();
    }, loopEvery);
    return () => window.clearInterval(id);
  }, [loopEvery, pulse]);

  const viewBox = tagline ? LOGO_VIEWBOX : LOGO_VIEWBOX_NO_TAGLINE;
  const [, , vw, vh] = viewBox.split(" ").map(Number);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      height={height}
      width={(height * vw) / vh}
      role="img"
      aria-label={title}
      // Antes do JS: a logo nasce invisível só quando vai entrar animada; se o
      // script não rodar, o CSS mostra ela sozinho (ver .subido-logo em styles.css).
      data-intro={animate === "intro" ? "pending" : "running"}
      data-tone={tone}
      className={cn("subido-logo shrink-0 overflow-visible", className)}
      onMouseEnter={animate ? () => pulse() : undefined}
    >
      <title>{title}</title>
      <defs>
        {/* as letras sobem "de dentro" da linha de base */}
        <clipPath id={clipId}>
          <rect x="-200" y="-400" width="5200" height={BASELINE + 400 + 24} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} className="subido-logo-word">
        {WORD_GLYPHS.map((d, i) => (
          <path
            key={i}
            d={d}
            ref={(el) => {
              glyphRefs.current[i] = el;
            }}
          />
        ))}
      </g>
      <g ref={aiRef} className="subido-logo-ai">
        <polygon ref={diagRef} points={AI_DIAGONAL} className="subido-logo-part" />
        <rect
          ref={legRef}
          x={AI_LEG.x}
          y={AI_LEG.y}
          width={AI_LEG.w}
          height={AI_LEG.h}
          className="subido-logo-part subido-logo-bar"
        />
        <rect
          ref={barRef}
          x={AI_BAR.x}
          y={AI_BAR.y}
          width={AI_BAR.w}
          height={AI_BAR.h}
          className="subido-logo-part subido-logo-bar"
        />
      </g>
      {tagline && (
        <path ref={tagRef} d={TAGLINE} className="subido-logo-tagline subido-logo-part" />
      )}
    </svg>
  );
});

/**
 * Logo + "by Viver de IA" em texto de verdade. Abaixo de ~80 px de altura a
 * assinatura vetorial fica com 4–6 px e some; aqui ela vira texto legível, com
 * o mesmo espaçamento largo, e entra depois da logo.
 */
export function SubidoLockup({
  height = 40,
  animate = false,
  loopEvery,
  tone = "default",
  className,
}: Omit<SubidoLogoProps, "tagline" | "title">) {
  return (
    <span
      className={cn("subido-lockup inline-flex flex-col items-start", className)}
      data-tone={tone}
    >
      <SubidoLogo height={height} animate={animate} loopEvery={loopEvery} tone={tone} />
      <span
        className="subido-lockup-by"
        data-animate={animate === "intro" ? "intro" : undefined}
        style={{ fontSize: Math.max(10, Math.round(height * 0.22)) }}
      >
        by Viver de IA
      </span>
    </span>
  );
}
