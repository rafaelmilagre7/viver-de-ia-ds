import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Splitter } from './Splitter';

/* Regressões da auditoria · Splitter por pointer events (toque) */

describe('<Splitter /> · arrasto por pointer', () => {
  it('pointerdown + pointermove redimensiona (mouse, toque ou caneta) e pointerup solta', () => {
    const onSplitChange = vi.fn();
    const { container } = render(<Splitter start="A" end="B" onSplitChange={onSplitChange} />);
    const root = container.querySelector('.via-splitter') as HTMLElement;
    root.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 1000, height: 400, right: 1000, bottom: 400, x: 0, y: 0, toJSON() {} }) as DOMRect;
    const handle = screen.getByRole('separator');
    fireEvent.pointerDown(handle, { button: 0, pointerType: 'touch', clientX: 500 });
    fireEvent.pointerMove(document, { clientX: 300 });
    expect(onSplitChange).toHaveBeenLastCalledWith(30);
    fireEvent.pointerUp(document);
    fireEvent.pointerMove(document, { clientX: 700 });
    expect(onSplitChange).toHaveBeenCalledTimes(1);
  });
});
