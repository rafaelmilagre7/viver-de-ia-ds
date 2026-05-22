import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('<Switch />', () => {
  it('renders with label', () => {
    render(<Switch label="Notificações" />);
    expect(screen.getByLabelText('Notificações')).toBeInTheDocument();
  });

  it('has role="switch"', () => {
    render(<Switch label="X" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="T" onChange={onChange} />);
    await user.click(screen.getByLabelText('T'));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('respects defaultChecked', () => {
    render(<Switch label="On" defaultChecked />);
    expect(screen.getByLabelText('On')).toBeChecked();
  });

  it('does not toggle when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Blocked" disabled onChange={onChange} />);
    await user.click(screen.getByLabelText('Blocked'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
