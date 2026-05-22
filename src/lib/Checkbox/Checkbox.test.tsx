import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('<Checkbox />', () => {
  it('renders with label', () => {
    render(<Checkbox label="Aceito" />);
    expect(screen.getByLabelText('Aceito')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Toggle" onChange={onChange} />);
    await user.click(screen.getByLabelText('Toggle'));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('respects checked prop (controlled)', () => {
    render(<Checkbox label="On" checked onChange={() => {}} />);
    expect(screen.getByLabelText('On')).toBeChecked();
  });

  it('reflects indeterminate via DOM property', () => {
    render(<Checkbox label="Indet" indeterminate />);
    const input = screen.getByLabelText('Indet') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('does not toggle when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Blocked" disabled onChange={onChange} />);
    await user.click(screen.getByLabelText('Blocked'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
