import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import { ToastStack } from './Toast';
import { useToasts } from './useToasts';

describe('useToasts()', () => {
  it('starts with an empty stack', () => {
    const { result } = renderHook(() => useToasts());
    expect(result.current.toasts).toEqual([]);
  });

  it('push() appends with a generated id and returns it', () => {
    const { result } = renderHook(() => useToasts());
    let id1 = '';
    let id2 = '';
    act(() => {
      id1 = result.current.push({ title: 'Saved' });
      id2 = result.current.push({ title: 'Synced' });
    });
    expect(result.current.toasts).toHaveLength(2);
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
    expect(result.current.toasts[0]).toMatchObject({ id: id1, title: 'Saved' });
    expect(result.current.toasts[1]).toMatchObject({ id: id2, title: 'Synced' });
  });

  it('dismiss() removes the matching toast', () => {
    const { result } = renderHook(() => useToasts());
    let idA = '';
    let idB = '';
    act(() => {
      idA = result.current.push({ title: 'A' });
      idB = result.current.push({ title: 'B' });
    });
    act(() => {
      result.current.dismiss(idA);
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).toBe(idB);
  });

  it('dismiss() with unknown id is a no-op', () => {
    const { result } = renderHook(() => useToasts());
    act(() => {
      result.current.push({ title: 'A' });
    });
    expect(result.current.toasts).toHaveLength(1);
    act(() => {
      result.current.dismiss('does-not-exist');
    });
    expect(result.current.toasts).toHaveLength(1);
  });

  it('clear() empties the stack', () => {
    const { result } = renderHook(() => useToasts());
    act(() => {
      result.current.push({ title: 'A' });
      result.current.push({ title: 'B' });
      result.current.push({ title: 'C' });
    });
    expect(result.current.toasts).toHaveLength(3);
    act(() => {
      result.current.clear();
    });
    expect(result.current.toasts).toEqual([]);
  });

  it('preserves variant and message fields on push', () => {
    const { result } = renderHook(() => useToasts());
    act(() => {
      result.current.push({
        title: 'Falha',
        message: 'tente em alguns segundos',
        variant: 'destructive',
      });
    });
    expect(result.current.toasts[0]).toMatchObject({
      title: 'Falha',
      message: 'tente em alguns segundos',
      variant: 'destructive',
    });
  });

  it('keeps `action` callback intact', () => {
    const { result } = renderHook(() => useToasts());
    const onClick = vi.fn();
    act(() => {
      result.current.push({ title: 'Salvo', action: { label: 'Desfazer', onClick } });
    });
    result.current.toasts[0].action?.onClick();
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('ToastCard · saída animada', () => {
  // jsdom não tem matchMedia nem rAF confiável — controlamos os quadros na mão
  let rafCbs: Map<number, FrameRequestCallback>;
  let rafSeq: number;
  let clock: number;
  let reducedMotion: boolean;

  beforeEach(() => {
    rafCbs = new Map();
    rafSeq = 0;
    clock = 0;
    reducedMotion = false;
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      rafCbs.set(++rafSeq, cb);
      return rafSeq;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      rafCbs.delete(id);
    });
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('prefers-reduced-motion') && reducedMotion,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    vi.spyOn(performance, 'now').mockImplementation(() => clock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function frame(dt = 16) {
    clock += dt;
    const cbs = [...rafCbs.values()];
    rafCbs.clear();
    for (const cb of cbs) cb(clock);
  }

  function renderSticky(onDismiss: (id: string) => void) {
    render(
      <ToastStack
        toasts={[{ id: 't1', title: 'Backup concluído', duration: 0 }]}
        onDismiss={onDismiss}
      />,
    );
    const card = document.querySelector('.via-toast') as HTMLElement;
    // jsdom mede 0 — sem largura não há percurso pra mola viajar
    Object.defineProperty(card, 'offsetWidth', { value: 380 });
    return card;
  }

  it('X anima a saída: transform intermediário existe antes do onDismiss', () => {
    const onDismiss = vi.fn();
    const card = renderSticky(onDismiss);

    fireEvent.click(screen.getByLabelText('Fechar notificação'));
    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      frame();
      frame();
    });
    expect(onDismiss).not.toHaveBeenCalled();
    const mid = parseFloat(card.style.transform.replace(/[^\d.-]/g, ''));
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(380);

    act(() => {
      for (let i = 0; i < 200 && onDismiss.mock.calls.length === 0; i++) frame();
    });
    expect(onDismiss).toHaveBeenCalledExactlyOnceWith('t1');
    expect(card.style.transform).toBe('translateX(380px)');
  });

  it('prefers-reduced-motion: X fecha seco, sem animação', () => {
    reducedMotion = true;
    const onDismiss = vi.fn();
    renderSticky(onDismiss);

    fireEvent.click(screen.getByLabelText('Fechar notificação'));
    expect(onDismiss).toHaveBeenCalledExactlyOnceWith('t1');
    expect(rafCbs.size).toBe(0);
  });

  it('auto-dismiss por tempo continua direto (sem mola)', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(
      <ToastStack toasts={[{ id: 't2', title: 'Sincronizado' }]} onDismiss={onDismiss} />,
    );

    act(() => {
      vi.advanceTimersByTime(4499);
    });
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onDismiss).toHaveBeenCalledExactlyOnceWith('t2');
    vi.useRealTimers();
  });
});
