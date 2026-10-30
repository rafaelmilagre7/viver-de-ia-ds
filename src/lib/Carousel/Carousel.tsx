import { useState, useRef, useEffect, useLayoutEffect, useCallback, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { animateSpring, project, rubberband, SPRING, type SpringState } from '../_shared/spring';
import { DUR, EASE, prefersReducedMotion } from '../_shared/motion';
import './Carousel.css';

export interface CarouselProps {
  /** Slides (cada child vira um slide) */
  children: ReactNode[];
  /** Slide ativo controlado */
  index?: number;
  /** Callback ao mudar slide */
  onIndexChange?: (index: number) => void;
  /** Mostra setas de navegação · default true */
  showArrows?: boolean;
  /** Mostra dots de paginação · default true */
  showDots?: boolean;
  /** Auto-play em ms · 0 = desabilita · default 0 */
  autoPlay?: number;
  /** Loop infinito · default true */
  loop?: boolean;
  /** Label acessível */
  label?: string;
}

const HYSTERESIS = 10; // px antes de virar arrasto (clique continua clique)
const VELOCITY_WINDOW = 100; // ms de histórico pra velocidade do dedo

type Spring = { cancel: () => SpringState } | null;

/**
 * `<Carousel>` · gallery slider com arrasto + keyboard nav + auto-play
 *
 * Use pra: depoimentos, galerias de fotos, onboarding slides, casos de uso.
 * Um motor só (a mola do DS): arrastar acompanha o dedo/ponteiro 1:1, a
 * soltura projeta o embalo pra escolher o slide (±1) e a mola parte com a
 * velocidade do dedo; setas, dots, teclado e auto-play andam na mesma mola.
 * Agarrar no meio do deslize re-captura de onde está. Borda resiste
 * (rubber-band). Em reduced-motion o slide troca seco.
 *
 * Auto-play acessível (WCAG 2.2.2 + APG carousel): botão de pausar/retomar,
 * pausa enquanto o ponteiro está em cima ou o foco está dentro, região viva
 * desligada enquanto gira sozinho (não interrompe o leitor de tela) e slides
 * ocultos ficam `inert` (nada focável escondido).
 *
 * @example
 * <Carousel autoPlay={5000} loop>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 *   <div>Slide 3</div>
 * </Carousel>
 */
export function Carousel({
  children,
  index: controlledIndex,
  onIndexChange,
  showArrows = true,
  showDots = true,
  autoPlay = 0,
  loop = true,
  label = 'Carrossel',
}: CarouselProps) {
  const [internal, setInternal] = useState(0);
  const index = controlledIndex !== undefined ? controlledIndex : internal;
  const total = children.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  // Preferência do usuário (botão) + pausas temporárias (hover / foco dentro / arrasto)
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [pressed, setPressed] = useState(false);
  const autoplaying =
    autoPlay > 0 && total > 1 && playing && !hovered && !focusWithin && !pressed;

  /* ---------- Motor: posição viva da trilha (px) + mola ---------- */
  const offset = useRef<number | null>(null); // null = em repouso no translate3d(%) do React
  const spring = useRef<Spring>(null);
  const shown = useRef(index); // slide em que a trilha está / para onde anda
  const handoff = useRef(0); // velocidade do dedo pra próxima mola (px/s)
  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  });

  const width = useCallback(() => viewportRef.current?.offsetWidth ?? 0, []);
  const paint = useCallback((v: number) => {
    offset.current = v;
    const t = trackRef.current;
    if (t) t.style.transform = `translate3d(${v}px, 0, 0)`;
  }, []);
  const toRest = useCallback((i: number) => {
    offset.current = null;
    const t = trackRef.current;
    // mesmo valor que o React escreve — resize continua certo em repouso
    if (t) t.style.transform = `translate3d(-${i * 100}%, 0, 0)`;
  }, []);

  /** Para a mola e devolve a posição/velocidade vivas (interrupção) */
  const grab = () => {
    const live = spring.current?.cancel();
    spring.current = null;
    return { value: offset.current ?? -shown.current * width(), velocity: live?.velocity ?? 0 };
  };

  /** Anda até o slide `i` na mola partindo de onde a trilha ESTÁ (ou seco) */
  const animateTo = useCallback(
    (i: number, velocity = 0) => {
      shown.current = i;
      const live = spring.current?.cancel();
      spring.current = null;
      const from = offset.current;
      const w = width();
      if (from === null || w === 0 || prefersReducedMotion()) {
        toRest(i);
        return;
      }
      // o React acabou de escrever o translate3d(%) final — repinta o ponto de
      // partida já, senão o 1º quadro mostra o destino antes da mola
      paint(from);
      spring.current = animateSpring({
        from,
        velocity: velocity || live?.velocity || 0,
        to: -i * w,
        params: SPRING.move,
        onFrame: paint,
        onSettle: () => {
          spring.current = null;
          toRest(i);
        },
      });
    },
    [paint, toRest, width],
  );

  // Toda troca de índice (setas, dots, teclado, auto-play, controlado) anda na mola
  useLayoutEffect(() => {
    if (index === shown.current) return;
    const prev = shown.current;
    const w = width();
    const v = handoff.current;
    handoff.current = 0;
    // saindo do repouso (%): a trilha parte do slide anterior, em px
    if (offset.current === null && w > 0 && !prefersReducedMotion()) paint(-prev * w);
    animateTo(index, v);
  }, [index, animateTo, paint, width]);

  useEffect(() => () => void spring.current?.cancel(), []);


  /* ---------- Dots: FLIP só com transform (nada de animar width) ---------- */
  const dotRects = useRef<Array<{ x: number; w: number }> | null>(null);
  /** Retângulos VISÍVEIS dos dots antes da troca (pega FLIP em andamento) */
  const snapshotDots = () => {
    const row = dotsRef.current;
    if (!row) return;
    const base = row.getBoundingClientRect().left;
    dotRects.current = Array.from(row.children).map((d) => {
      const r = d.getBoundingClientRect();
      return { x: r.left - base, w: r.width };
    });
  };

  const setIndex = (i: number) => {
    let next = i;
    if (next < 0) next = loop ? total - 1 : 0;
    if (next >= total) next = loop ? 0 : total - 1;
    snapshotDots();
    if (controlledIndex === undefined) setInternal(next);
    onIndexChange?.(next);
    return next;
  };

  const goPrev = () => setIndex(index - 1);
  const goNext = () => setIndex(index + 1);

  // Auto-play
  useEffect(() => {
    if (!autoplaying) return;
    const t = setInterval(() => {
      setIndex(index + 1);
    }, autoPlay);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoplaying, autoPlay, total, loop]);

  /* ---------- Arrasto (ponteiro: toque, caneta e mouse) ---------- */
  const drag = useRef({
    tracking: false,
    dragging: false,
    id: -1,
    x0: 0,
    y0: 0,
    from: 0,
    start: 0,
    history: [] as Array<{ x: number; t: number }>,
    suppressClick: false,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (total < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return;
    // controles do próprio carrossel continuam sendo botões
    if ((e.target as Element).closest('.via-carousel__arrow, .via-carousel__toggle')) return;
    const d = drag.current;
    // Interrompe a mola: o dedo pega a trilha de onde ela ESTÁ
    const live = grab();
    d.tracking = true;
    d.dragging = false;
    d.id = e.pointerId;
    d.x0 = e.clientX;
    d.y0 = e.clientY;
    d.from = live.value;
    d.start = shown.current;
    d.history = [{ x: e.clientX, t: e.timeStamp }];
    if (live.velocity !== 0 || offset.current !== null) paint(live.value);
    setPressed(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.tracking || e.pointerId !== d.id) return;
    d.history.push({ x: e.clientX, t: e.timeStamp });
    while (d.history.length > 2 && e.timeStamp - d.history[0].t > VELOCITY_WINDOW) d.history.shift();
    const dx = e.clientX - d.x0;
    if (!d.dragging) {
      if (Math.abs(dx) < HYSTERESIS) return;
      // gesto mais vertical que horizontal é rolagem da página, não do carrossel
      if (Math.abs(e.clientY - d.y0) > Math.abs(dx)) {
        release(false);
        return;
      }
      d.dragging = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    const w = width();
    const min = -(total - 1) * w;
    const raw = d.from + dx;
    // 1:1 dentro da trilha · resistência progressiva além das bordas
    const v = raw > 0 ? rubberband(raw, w) : raw < min ? min - rubberband(min - raw, w) : raw;
    paint(v);
  };

  /** Soltou: projeta o embalo, escolhe o slide (±1) e entrega a velocidade à mola */
  const release = (fromGesture: boolean) => {
    const d = drag.current;
    d.tracking = false;
    setPressed(false);
    if (!fromGesture || !d.dragging) {
      d.dragging = false;
      // toque sem arrasto que interrompeu uma mola: retoma até o slide
      if (offset.current !== null) animateTo(shown.current);
      return;
    }
    d.dragging = false;
    d.suppressClick = true;
    const a = d.history[0];
    const b = d.history[d.history.length - 1];
    const dt = b.t - a.t;
    const velocity = dt > 0 ? ((b.x - a.x) / dt) * 1000 : 0;
    const w = width() || 1;
    const projected = (offset.current ?? -d.start * w) + project(velocity);
    let target = Math.round(-projected / w);
    target = Math.max(d.start - 1, Math.min(d.start + 1, target));
    // Gesto não dá a volta: a borda resistiu (rubber-band), então solta volta
    // pro lugar — atravessar todos os slides voando seria mentir sobre a trilha.
    // Setas, teclado e auto-play continuam em loop.
    if (target === d.start || target < 0 || target >= total) {
      animateTo(d.start, velocity);
      return;
    }
    handoff.current = velocity;
    const next = setIndex(target);
    // controlado que não aceitou a troca: volta pro slide de origem
    requestAnimationFrame(() => {
      if (indexRef.current !== next && offset.current !== null && !spring.current) {
        animateTo(indexRef.current, velocity);
      }
    });
  };

  const lastLayout = useRef<Array<{ x: number; w: number }> | null>(null);
  useLayoutEffect(() => {
    const row = dotsRef.current;
    if (!row) return;
    const dots = Array.from(row.children) as HTMLElement[];
    const before = dotRects.current ?? lastLayout.current;
    dotRects.current = null;
    const after = dots.map((d) => ({ x: d.offsetLeft, w: d.offsetWidth }));
    lastLayout.current = after;
    if (!before || before.length !== dots.length || prefersReducedMotion()) return;
    dots.forEach((dot, i) => {
      if (typeof dot.animate !== 'function') return;
      dot.getAnimations().forEach((a) => a.id === 'via-dot' && a.cancel());
      const dx = before[i].x - after[i].x;
      const sx = after[i].w ? before[i].w / after[i].w : 1;
      if (Math.abs(dx) < 0.5 && Math.abs(sx - 1) < 0.01) return;
      // raio real = metade da altura; corrigido pra ponta continuar redonda na escala
      const r = dot.offsetHeight / 2;
      const anim = dot.animate(
        [
          { transform: `translateX(${dx}px) scaleX(${sx})`, borderRadius: `${r / sx}px / ${r}px` },
          { transform: 'none', borderRadius: `${r}px` },
        ],
        { duration: DUR.base, easing: EASE.enter },
      );
      anim.id = 'via-dot';
    });
  }, [index]);

  return (
    <div
      className="via-carousel"
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      <div
        ref={viewportRef}
        className={`via-carousel__viewport${pressed ? ' is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => e.pointerId === drag.current.id && release(true)}
        onPointerCancel={(e) => e.pointerId === drag.current.id && release(true)}
        // depois de arrastar, o clique que fecha o gesto não abre link do slide
        onClickCapture={(e) => {
          if (drag.current.suppressClick) {
            drag.current.suppressClick = false;
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {autoPlay > 0 && total > 1 && (
          <button
            type="button"
            className="via-carousel__toggle"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pausar carrossel' : 'Retomar carrossel'}
          >
            {playing ? <Pause size={12} strokeWidth={2.4} /> : <Play size={12} strokeWidth={2.4} />}
          </button>
        )}
        <div
          ref={trackRef}
          className="via-carousel__track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          aria-live={autoplaying ? 'off' : 'polite'}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="via-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} de ${total}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              {child}
            </div>
          ))}
        </div>

        {showArrows && total > 1 && (
          <>
            <button
              type="button"
              className="via-carousel__arrow via-carousel__arrow--prev"
              onClick={goPrev}
              aria-label="Slide anterior"
              disabled={!loop && index === 0}
            >
              <ChevronLeft size={16} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              className="via-carousel__arrow via-carousel__arrow--next"
              onClick={goNext}
              aria-label="Próximo slide"
              disabled={!loop && index === total - 1}
            >
              <ChevronRight size={16} strokeWidth={2.2} />
            </button>
          </>
        )}
      </div>

      {showDots && total > 1 && (
        <div ref={dotsRef} className="via-carousel__dots" role="tablist">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir pro slide ${i + 1}`}
              className={`via-carousel__dot${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
