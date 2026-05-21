import { useState, useRef, useEffect, type ReactNode, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

/**
 * `<Carousel>` · gallery slider com touch swipe + keyboard nav + auto-play
 *
 * Use pra: depoimentos, galerias de fotos, onboarding slides, casos de uso.
 * Suporta touch swipe (mobile), setas de teclado, auto-play opcional.
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
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const setIndex = (i: number) => {
    let next = i;
    if (next < 0) next = loop ? total - 1 : 0;
    if (next >= total) next = loop ? 0 : total - 1;
    if (controlledIndex === undefined) setInternal(next);
    onIndexChange?.(next);
  };

  const goPrev = () => setIndex(index - 1);
  const goNext = () => setIndex(index + 1);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || autoPlay <= 0) return;
    const t = setInterval(() => {
      setIndex(index + 1);
    }, autoPlay);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoPlay, total, loop]);

  // Touch
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

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
    >
      <div className="via-carousel__viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div
          ref={trackRef}
          className="via-carousel__track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          aria-live="polite"
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="via-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} de ${total}`}
              aria-hidden={i !== index}
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
        <div className="via-carousel__dots" role="tablist">
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
