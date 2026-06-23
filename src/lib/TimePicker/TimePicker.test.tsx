import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimePicker } from './TimePicker';

describe('<TimePicker />', () => {
  it('renders label, hint and two empty numeric cells by default', () => {
    render(<TimePicker label="Horário da live" hint="Fuso de Brasília" />);

    expect(screen.getByText('Horário da live')).toBeInTheDocument();
    expect(screen.getByText('Fuso de Brasília')).toBeInTheDocument();

    const hour = screen.getByLabelText('Hora');
    const minute = screen.getByLabelText('Minuto');
    expect(hour).toHaveValue('');
    expect(minute).toHaveValue('');
    expect(hour).toHaveAttribute('placeholder', 'HH');
    expect(minute).toHaveAttribute('placeholder', 'MM');
    expect(hour).toHaveAttribute('inputMode', 'numeric');
  });

  it('reflects a controlled value across both cells', () => {
    render(<TimePicker value="08:30" />);
    expect(screen.getByLabelText('Hora')).toHaveValue('08');
    expect(screen.getByLabelText('Minuto')).toHaveValue('30');
  });

  it('typing in the hour cell emits a zero-padded HH:MM value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker onChange={onChange} />);

    await user.type(screen.getByLabelText('Hora'), '9');
    expect(onChange).toHaveBeenLastCalledWith('09:00');
  });

  it('typing a single minute digit keeps the controlled hour and emits HH:MM', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    // controlled hour "14" + empty minute so the minute cell accepts a keystroke
    render(<TimePicker value="14:" onChange={onChange} />);

    await user.type(screen.getByLabelText('Minuto'), '5');
    expect(onChange).toHaveBeenLastCalledWith('14:05');
  });

  it('clamps an over-range hour to 23 on a single keystroke', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker onChange={onChange} />);

    // a single "9" stays 09; two 9s would overflow, but see the maxLength bug test below
    await user.type(screen.getByLabelText('Hora'), '9');
    expect(onChange).toHaveBeenLastCalledWith('09:00');
  });

  it('clamps minutes at the 60 boundary when stepping up across an hour', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    // stepping +15 from :50 must roll to the next hour, never emit ":65"
    render(<TimePicker value="09:50" step={15} onChange={onChange} />);

    await user.click(screen.getByText('▲'));
    expect(onChange).toHaveBeenLastCalledWith('10:05');
  });

  // Antes era um bug: o zero-pad do 1o digito ("1"->"01") + maxLength=2 travavam o 2o
  // digito e matavam o auto-advance. O rascunho de digitacao (hDraft) corrigiu.
  it('lets you type both hour digits and auto-advances focus to the minute cell', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker onChange={onChange} />);

    const hour = screen.getByLabelText('Hora');
    const minute = screen.getByLabelText('Minuto');
    await user.type(hour, '11');

    expect(hour).toHaveValue('11');
    expect(onChange).toHaveBeenLastCalledWith('11:00');
    expect(minute).toHaveFocus();
  });

  // Antes uma letra perdida zero-padava pra "00" e travava o campo. Agora e descartada
  // e o digito seguinte entra normalmente.
  it('ignores a stray letter without jamming further input', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker onChange={onChange} />);

    const hour = screen.getByLabelText('Hora');
    await user.type(hour, 'a');
    expect(hour).toHaveValue('');

    await user.type(hour, '9');
    expect(hour).toHaveValue('9');
    expect(onChange).toHaveBeenLastCalledWith('09:00');
  });

  it('step-up button advances by the step (uncontrolled) and reflects in the cells', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker value={undefined} onChange={onChange} step={30} />);

    // step buttons live under an aria-hidden wrapper, queried by their glyph
    await user.click(screen.getByText('▲'));
    expect(onChange).toHaveBeenLastCalledWith('00:30');
    expect(screen.getByLabelText('Minuto')).toHaveValue('30');

    await user.click(screen.getByText('▲'));
    expect(onChange).toHaveBeenLastCalledWith('01:00');
    expect(screen.getByLabelText('Hora')).toHaveValue('01');
  });

  it('step-down wraps minutes and rolls the hour back', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker value="01:00" onChange={onChange} step={15} />);

    await user.click(screen.getByText('▼'));
    expect(onChange).toHaveBeenLastCalledWith('00:45');
  });

  it('respects max: a step that would exceed max is blocked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker value="10:00" max="10:00" step={15} onChange={onChange} />);

    await user.click(screen.getByText('▲'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects min: a step that would drop below min is blocked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker value="09:00" min="09:00" step={15} onChange={onChange} />);

    await user.click(screen.getByText('▼'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('controlled mode does not mutate internal state until the parent re-renders', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<TimePicker value="06:00" onChange={onChange} step={30} />);

    await user.click(screen.getByText('▲'));
    // onChange fires the next value, but the displayed value stays frozen at 06:00
    expect(onChange).toHaveBeenLastCalledWith('06:30');
    expect(screen.getByLabelText('Hora')).toHaveValue('06');
    expect(screen.getByLabelText('Minuto')).toHaveValue('00');

    // parent confirms the new value
    rerender(<TimePicker value="06:30" onChange={onChange} step={30} />);
    expect(screen.getByLabelText('Minuto')).toHaveValue('30');
  });

  it('disables both cells and the step buttons when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker value="12:00" disabled onChange={onChange} />);

    const hour = screen.getByLabelText('Hora');
    const minute = screen.getByLabelText('Minuto');
    expect(hour).toBeDisabled();
    expect(minute).toBeDisabled();

    await user.click(screen.getByText('▲'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
