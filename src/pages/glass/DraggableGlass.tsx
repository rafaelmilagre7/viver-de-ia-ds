import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';

/* Vidro arrastável pros demos de /glass · o ponto é VER o material andar por
   cima de conteúdo real (o fundo muda, o texto do vidro continua lendo).
   Ponteiro: arrasto 1:1 preso no palco. Teclado: setas movem 16px (Shift = 48).
   Só transform — nada de top/left animado. */
export default function DraggableGlass({
  children,
  initial,
  label,
}: {
  children: ReactNode;
  /** posição inicial (CSS) dentro do palco · ex.: { left: '52%', top: '18%' } ·
   *  no celular o CSS ancora embaixo à esquerda */
  initial: { left: string; top: string };
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  /* deslocamento do arrasto a partir da posição inicial (CSS) */
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const grab = useRef<{ dx: number; dy: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const clamp = (x: number, y: number) => {
    const el = ref.current;
    const stage = el?.parentElement;
    if (!el || !stage) return { x, y };
    const minX = -el.offsetLeft;
    const minY = -el.offsetTop;
    const maxX = stage.clientWidth - el.offsetWidth - el.offsetLeft;
    const maxY = stage.clientHeight - el.offsetHeight - el.offsetTop;
    return { x: Math.max(minX, Math.min(maxX, x)), y: Math.max(minY, Math.min(maxY, y)) };
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    grab.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    setDragging(true);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!grab.current) return;
    setPos(clamp(e.clientX - grab.current.dx, e.clientY - grab.current.dy));
  };
  const onPointerUp = () => {
    grab.current = null;
    setDragging(false);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 48 : 16;
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
    };
    const v = d[e.key];
    if (!v) return;
    e.preventDefault();
    setPos((p) => clamp(p.x + v[0], p.y + v[1]));
  };

  return (
    <div
      ref={ref}
      className={`gl-drag${dragging ? ' is-grabbing' : ''}`}
      style={{
        '--gl-x': initial.left,
        '--gl-y': initial.top,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      } as CSSProperties}
      role="group"
      aria-roledescription="vidro arrastável"
      aria-label={`${label} · arraste ou use as setas`}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}
