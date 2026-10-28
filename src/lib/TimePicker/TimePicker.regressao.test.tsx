import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import axe from 'axe-core';
import { TimePicker } from './TimePicker';

/* Regressões da auditoria de componentes */

async function axeIds(root: Element) {
  const res = await axe.run(root, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return res.violations.map((v) => v.id);
}

describe('<TimePicker /> · faixa e setinhas', () => {
  it('hora digitada abaixo do min encosta no min', () => {
    const onChange = vi.fn();
    render(<TimePicker value="" onChange={onChange} min="09:00" max="18:00" />);
    fireEvent.change(screen.getByLabelText('Hora'), { target: { value: '05' } });
    expect(onChange).toHaveBeenLastCalledWith('09:00');
  });

  it('hora digitada acima do max encosta no max', () => {
    const onChange = vi.fn();
    render(<TimePicker value="" onChange={onChange} min="09:00" max="18:00" />);
    fireEvent.change(screen.getByLabelText('Hora'), { target: { value: '22' } });
    expect(onChange).toHaveBeenLastCalledWith('18:00');
  });

  it('setinhas (aria-hidden) não são focáveis por Tab e o axe passa', async () => {
    const { container } = render(<TimePicker label="Horário" value="10:00" onChange={() => {}} />);
    const hiddenFocusable = container.querySelectorAll(
      '[aria-hidden="true"] button:not([tabindex="-1"]):not([disabled])',
    );
    expect(hiddenFocusable).toHaveLength(0);
    expect(await axeIds(container)).toEqual([]);
  });
});
