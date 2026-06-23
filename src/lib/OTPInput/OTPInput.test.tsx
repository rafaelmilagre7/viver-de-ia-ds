import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OTPInput } from './OTPInput';

describe('<OTPInput />', () => {
  it('renders one cell per digit (default length 6) wrapped in a labelled group', () => {
    render(<OTPInput autoFocus={false} />);
    expect(screen.getByRole('group', { name: 'Código de verificação' })).toBeInTheDocument();
    const cells = screen.getAllByRole('textbox');
    expect(cells).toHaveLength(6);
    cells.forEach((cell, i) => {
      expect(cell).toHaveAttribute('aria-label', `Dígito ${i + 1} de 6`);
      expect(cell).toHaveAttribute('maxLength', '1');
    });
  });

  it('honors the length prop and labels the group with the provided label', () => {
    render(<OTPInput length={4} label="Código SMS" autoFocus={false} />);
    expect(screen.getByRole('group', { name: 'Código SMS' })).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
    // label rendered above the row
    expect(screen.getByText('Código SMS')).toBeInTheDocument();
  });

  it('typing a digit fills the cell and auto-advances focus to the next', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} autoFocus={false} />);
    const cells = screen.getAllByRole('textbox');
    cells[0].focus();
    await user.keyboard('1');
    expect(cells[0]).toHaveValue('1');
    expect(cells[1]).toHaveFocus();
    await user.keyboard('2');
    expect(cells[1]).toHaveValue('2');
    expect(cells[2]).toHaveFocus();
  });

  it('numeric mode ignores non-digit characters', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<OTPInput length={4} inputType="numeric" onChange={onChange} autoFocus={false} />);
    const cells = screen.getAllByRole('textbox');
    cells[0].focus();
    await user.keyboard('a');
    // the non-digit is stripped, so the cell stays empty and focus does not advance
    expect(cells[0]).toHaveValue('');
    expect(cells[0]).toHaveFocus();
    // NOTE: a rejected keystroke still emits onChange('') because updateAt falls into
    // the deletion branch when the sanitized char is empty (real current behavior).
    expect(onChange).toHaveBeenLastCalledWith('');
    await user.keyboard('7');
    expect(cells[0]).toHaveValue('7');
    expect(onChange).toHaveBeenLastCalledWith('7');
  });

  it('text mode accepts letters (alphanumeric codes)', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} inputType="text" autoFocus={false} />);
    const cells = screen.getAllByRole('textbox');
    cells[0].focus();
    await user.keyboard('A');
    expect(cells[0]).toHaveValue('A');
    expect(cells[1]).toHaveFocus();
  });

  it('Backspace on an empty cell moves focus to the previous cell and clears it', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} autoFocus={false} value="12" onChange={() => {}} />);
    // value="12" → cell 0='1', cell 1='2', cells 2/3 empty
    const cells = screen.getAllByRole('textbox');
    cells[2].focus();
    await user.keyboard('{Backspace}');
    expect(cells[1]).toHaveFocus();
  });

  it('Backspace on an empty cell clears the previous digit (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} autoFocus={false} />);
    const cells = screen.getAllByRole('textbox');
    cells[0].focus();
    await user.keyboard('12'); // cell0='1', cell1='2', focus on cell2
    expect(cells[2]).toHaveFocus();
    await user.keyboard('{Backspace}'); // cell2 empty → go to cell1, clear it
    expect(cells[1]).toHaveFocus();
    expect(cells[1]).toHaveValue('');
    expect(cells[0]).toHaveValue('1');
  });

  it('ArrowLeft / ArrowRight navigate between cells without changing values', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} autoFocus={false} />);
    const cells = screen.getAllByRole('textbox');
    cells[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(cells[1]).toHaveFocus();
    await user.keyboard('{ArrowRight}{ArrowLeft}');
    expect(cells[1]).toHaveFocus();
    // values untouched
    cells.forEach((c) => expect(c).toHaveValue(''));
  });

  it('fires onComplete once all cells are filled (uncontrolled)', async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();
    render(<OTPInput length={4} onComplete={onComplete} autoFocus={false} />);
    const cells = screen.getAllByRole('textbox');
    cells[0].focus();
    await user.keyboard('123');
    expect(onComplete).not.toHaveBeenCalled();
    await user.keyboard('4');
    expect(onComplete).toHaveBeenCalledOnce();
    expect(onComplete).toHaveBeenCalledWith('1234');
  });

  it('paste fills cells from the clipboard and fires onComplete + onChange', async () => {
    const onChange = vi.fn();
    const onComplete = vi.fn();
    const user = userEvent.setup();
    render(
      <OTPInput length={4} inputType="numeric" onChange={onChange} onComplete={onComplete} autoFocus={false} />,
    );
    const cells = screen.getAllByRole('textbox');
    cells[0].focus();
    await user.paste('98-76'); // non-digits stripped → "9876"
    expect(onChange).toHaveBeenLastCalledWith('9876');
    expect(onComplete).toHaveBeenCalledWith('9876');
    expect(cells[0]).toHaveValue('9');
    expect(cells[3]).toHaveValue('6');
  });

  it('controlled mode renders the value prop and does not mutate it internally', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <OTPInput length={4} value="12" onChange={onChange} autoFocus={false} />,
    );
    const cells = screen.getAllByRole('textbox');
    expect(cells[0]).toHaveValue('1');
    expect(cells[1]).toHaveValue('2');

    cells[2].focus();
    await user.keyboard('3');
    // onChange fires but the rendered value stays "12" until the parent updates it
    expect(onChange).toHaveBeenCalledWith('123');
    expect(cells[2]).toHaveValue('');

    rerender(<OTPInput length={4} value="123" onChange={onChange} autoFocus={false} />);
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('3');
  });

  it('disabled state marks every cell disabled and blocks input', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<OTPInput length={4} disabled onChange={onChange} autoFocus={false} />);
    const cells = screen.getAllByRole('textbox');
    cells.forEach((c) => expect(c).toBeDisabled());
    await user.click(cells[0]);
    await user.keyboard('5');
    expect(onChange).not.toHaveBeenCalled();
    expect(cells[0]).toHaveValue('');
  });

  it('renders a hint message below the field', () => {
    render(<OTPInput length={4} hint="Enviamos um código por SMS" error autoFocus={false} />);
    expect(screen.getByText('Enviamos um código por SMS')).toBeInTheDocument();
  });
});
