import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { ColorPicker } from './ColorPicker';

/* Regressão da auditoria · radiogroup com uma parada de Tab e setas */

describe('<ColorPicker /> · radiogroup', () => {
  it('só a cor selecionada é parada de Tab', () => {
    render(<ColorPicker value="#1E3A5F" onChange={() => {}} allowCustom={false} />);
    const tabbable = screen.getAllByRole('radio').filter((r) => r.tabIndex === 0);
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAccessibleName('Blue');
  });

  it('sem seleção, a 1ª cor é a parada de Tab', () => {
    render(<ColorPicker value="#123456" onChange={() => {}} allowCustom={false} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0].tabIndex).toBe(0);
    expect(radios.slice(1).every((r) => r.tabIndex === -1)).toBe(true);
  });

  it('setas movem o foco E selecionam, com volta nas pontas; Home/End', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Host() {
      const [v, setV] = useState('#0A1F3B');
      return (
        <ColorPicker
          value={v}
          onChange={(hex) => {
            onChange(hex);
            setV(hex);
          }}
          allowCustom={false}
        />
      );
    }
    render(<Host />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith('#02162A');
    expect(radios[1]).toHaveFocus();
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(radios[radios.length - 1]).toHaveFocus();
    await user.keyboard('{Home}');
    expect(radios[0]).toHaveFocus();
    await user.keyboard('{End}');
    expect(radios[radios.length - 1]).toHaveFocus();
  });
});
