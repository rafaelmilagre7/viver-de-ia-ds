import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToasts } from './Toast';

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
