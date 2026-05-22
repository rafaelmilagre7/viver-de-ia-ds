import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'm', label: 'Mensal' },
  { value: 'a', label: 'Anual' },
  { value: 't', label: 'Time' },
];

describe('<RadioGroup />', () => {
  it('renders all options', () => {
    render(<RadioGroup ariaLabel="Plano" options={options} />);
    expect(screen.getByLabelText('Mensal')).toBeInTheDocument();
    expect(screen.getByLabelText('Anual')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
  });

  it('selects defaultValue', () => {
    render(<RadioGroup ariaLabel="Plano" options={options} defaultValue="a" />);
    expect(screen.getByLabelText('Anual')).toBeChecked();
  });

  it('changes selection on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<RadioGroup ariaLabel="Plano" options={options} onValueChange={onChange} />);
    await user.click(screen.getByLabelText('Anual'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('exposes role=radiogroup with aria-label', () => {
    render(<RadioGroup ariaLabel="Plano" options={options} />);
    expect(screen.getByRole('radiogroup', { name: 'Plano' })).toBeInTheDocument();
  });
});
