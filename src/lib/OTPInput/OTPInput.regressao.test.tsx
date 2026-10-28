import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { OTPInput } from './OTPInput';

/* Regressões da auditoria de componentes */

describe('<OTPInput /> · células posicionais', () => {
  it('digitar na 4ª célula de um código vazio fica na 4ª', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<OTPInput length={6} autoFocus={false} onChange={onChange} />);
    const cells = screen.getAllByRole('textbox');
    await user.click(cells[3]);
    await user.keyboard('7');
    expect(cells[3]).toHaveValue('7');
    expect(cells[0]).toHaveValue('');
    expect(onChange).toHaveBeenLastCalledWith('7');
  });

  it('apagar um dígito do meio não arrasta os seguintes (controlado com eco do pai)', () => {
    function Host() {
      const [v, setV] = useState('123456');
      return <OTPInput length={6} value={v} onChange={setV} autoFocus={false} />;
    }
    render(<Host />);
    const cells = screen.getAllByRole('textbox');
    fireEvent.change(cells[1], { target: { value: '' } });
    expect(cells.map((c) => (c as HTMLInputElement).value)).toEqual(['1', '', '3', '4', '5', '6']);
  });

  it('onComplete só dispara com todas as células preenchidas', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<OTPInput length={4} autoFocus={false} onComplete={onComplete} />);
    const cells = screen.getAllByRole('textbox');
    await user.click(cells[1]);
    await user.keyboard('234');
    expect(onComplete).not.toHaveBeenCalled();
    await user.click(cells[0]);
    await user.keyboard('1');
    expect(onComplete).toHaveBeenCalledWith('1234');
  });
});
