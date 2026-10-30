import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { animateSpring, type SpringParams, type SpringState } from '../_shared/spring';
import { measureAtRest, prefersReducedMotion } from '../_shared/motion';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
  badge?: ReactNode;
  content: ReactNode;
}

type Variant = 'underline' | 'pills';

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  variant?: Variant;
  className?: string;
}

/** Mola do indicador · sem quique (overshoot é só de controle), chega em ~0,3s */
const INDICATOR: SpringParams = { damping: 1.0, response: 0.3 };

/** Recuo do sublinhado em cada lado da aba (= padding horizontal do tab) */
const UNDERLINE_INSET = 16;

type Spring = { cancel: () => SpringState } | null;

/**
 * Indicador ÚNICO da aba ativa (sublinhado ou pílula) que desliza entre as
 * abas só com transform, na mola do DS — interruptível: trocar de aba no
 * meio do caminho parte da posição E da velocidade atuais.
 *
 * FLIP: a largura final é aplicada uma vez; o caminho é translateX +
 * scaleX(visual/final), com o raio corrigido por quadro na pílula (cantos
 * não achatam). Em repouso fica em scaleX(1) — nítido, igual à aba ativa.
 */
function useTabIndicator(
  listRef: React.RefObject<HTMLDivElement | null>,
  indicatorRef: React.RefObject<HTMLSpanElement | null>,
  variant: Variant,
  current: string,
) {
  const pos = useRef<{ x: number; w: number } | null>(null); // posição visual atual
  // Objeto estável (campos mudam, a referência não) — a limpeza do efeito usa o mesmo
  const springs = useRef<{ x: Spring; w: Spring }>({ x: null, w: null });

  const place = useCallback(
    (animate: boolean) => {
      const sp = springs.current;
      const stop = () => {
        const sx = sp.x?.cancel();
        const sw = sp.w?.cancel();
        sp.x = sp.w = null;
        return { vx: sx?.velocity ?? 0, vw: sw?.velocity ?? 0 };
      };
      const list = listRef.current;
      const el = indicatorRef.current;
      const tab = list?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!list || !el || !tab) return;
      // Retângulo fracionário (offset* arredonda e o sublinhado sairia ½px
      // torto) e em repouso: a aba pode estar voltando do press (scale .97)
      const tr = measureAtRest(tab, () => tab.getBoundingClientRect());
      // Aba sem caixa (container oculto): devolve o desenho pra própria aba
      if (tr.width === 0) {
        delete list.dataset.indicator;
        pos.current = null;
        return;
      }
      const lr = list.getBoundingClientRect();
      const pill = variant === 'pills';
      const inset = pill ? 0 : UNDERLINE_INSET;
      const x = tr.left - lr.left - list.clientLeft + list.scrollLeft + inset;
      const w = Math.max(0, tr.width - inset * 2);
      const y = pill ? tr.top - lr.top - list.clientTop : 0;
      if (pill) el.style.height = `${tr.height}px`;
      el.style.width = `${w}px`;
      list.dataset.indicator = '';

      const from = pos.current;
      const { vx, vw } = stop();
      const rest = () => {
        pos.current = { x, w };
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.borderRadius = '';
      };
      const still = from && Math.abs(from.x - x) < 0.5 && Math.abs(from.w - w) < 0.5;
      if (!animate || !from || still || w === 0 || prefersReducedMotion()) {
        rest();
        return;
      }

      // Raio real da pílula (999px vira metade da altura) pra corrigir o achatamento
      const r = pill ? parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0 : 0;
      const live = { x: from.x, w: from.w };
      const paint = () => {
        pos.current = { ...live };
        const sx = live.w / w || 1;
        el.style.transform = `translate(${live.x}px, ${y}px) scaleX(${sx})`;
        if (r) el.style.borderRadius = `${r / sx}px / ${r}px`;
      };
      paint();
      let pending = 2;
      const settle = () => {
        if (--pending === 0) {
          sp.x = sp.w = null;
          rest();
        }
      };
      Object.assign(sp, {
        x: animateSpring({
          from: from.x,
          velocity: vx,
          to: x,
          params: INDICATOR,
          onFrame: (v) => {
            live.x = v;
            paint();
          },
          onSettle: settle,
        }),
        w: animateSpring({
          from: from.w,
          velocity: vw,
          to: w,
          params: INDICATOR,
          onFrame: (v) => {
            live.w = v;
            paint();
          },
          onSettle: settle,
        }),
      });
    },
    [listRef, indicatorRef, variant],
  );

  // 1ª medida sem animar; depois, cada troca de aba anda na mola
  const first = useRef(true);
  useLayoutEffect(() => {
    place(!first.current);
    first.current = false;
  }, [current, place]);

  // Mudou o tamanho (fonte carregou, viewport, badge) → reposiciona seco
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => place(false));
    ro.observe(list);
    list.querySelectorAll('[role="tab"]').forEach((t) => ro.observe(t));
    return () => ro.disconnect();
  }, [listRef, place]);

  useEffect(() => {
    const sp = springs.current;
    return () => {
      sp.x?.cancel();
      sp.w?.cancel();
    };
  }, []);
}

/**
 * Tabs · controlled ou uncontrolled · ARIA tablist · keyboard arrow nav
 *
 * Um indicador só (sublinhado ou pílula) desliza entre as abas na mola do DS.
 * Sem JS (SSR), a aba ativa desenha o próprio indicador.
 *
 * @example
 * <Tabs
 *   items={[
 *     { id: 'overview',  label: 'Visão geral', content: <Overview /> },
 *     { id: 'history',   label: 'Histórico', badge: <Pill>12</Pill>, content: <History /> },
 *   ]}
 * />
 */
export function Tabs({
  items,
  defaultActiveId,
  activeId,
  onChange,
  variant = 'underline',
  className = '',
}: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState<string>(defaultActiveId ?? items[0]?.id ?? '');
  const current = activeId ?? internal;
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  useTabIndicator(listRef, indicatorRef, variant, current);

  const handleSelect = (id: string) => {
    if (activeId === undefined) setInternal(id);
    onChange?.(id);
  };

  const handleKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = items.length - 1;
    handleSelect(items[next].id);
    const btn = document.getElementById(`${baseId}-tab-${items[next].id}`);
    btn?.focus();
  };

  return (
    <div className={`via-tabs via-tabs--${variant} ${className}`}>
      <div ref={listRef} role="tablist" className="via-tabs__list">
        <span ref={indicatorRef} className="via-tabs__indicator" aria-hidden="true" />
        {items.map((item, i) => {
          const isActive = item.id === current;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`via-tabs__tab ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKey(e, i)}
            >
              <span>{item.label}</span>
              {item.badge && <span className="via-tabs__badge">{item.badge}</span>}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== current}
          className="via-tabs__panel"
        >
          {item.id === current && item.content}
        </div>
      ))}
    </div>
  );
}
