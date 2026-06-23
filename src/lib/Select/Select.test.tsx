import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro · R$ 290/mês' },
  { value: 'team', label: 'Team · R$ 890/mês', disabled: true },
];

describe('<Select />', () => {
  it('renders the placeholder and stays closed by default', () => {
    render(<Select options={options} label="Plano" placeholder="Selecione um plano" />);
    const trigger = screen.getByRole('button', { name: 'Plano' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveTextContent('Selecione um plano');
    // listbox is only mounted while open
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the listbox on trigger click and exposes the options', async () => {
    const user = userEvent.setup();
    render(<Select options={options} label="Plano" />);
    const trigger = screen.getByRole('button', { name: 'Plano' });

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    // aria-controls wires the trigger to the listbox by id
    expect(trigger.getAttribute('aria-controls')).toBe(listbox.id);
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('selecting an option updates the trigger value and closes the listbox (uncontrolled)', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={options} label="Plano" onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: 'Plano' }));
    await user.click(screen.getByRole('option', { name: 'Pro · R$ 290/mês' }));

    expect(onValueChange).toHaveBeenCalledWith('pro');
    // listbox closes after a selection
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    // and the chosen label now shows on the trigger
    expect(screen.getByRole('button', { name: 'Plano' })).toHaveTextContent('Pro · R$ 290/mês');
  });

  it('marks the selected option with aria-selected when reopened', async () => {
    const user = userEvent.setup();
    render(<Select options={options} label="Plano" defaultValue="free" />);

    await user.click(screen.getByRole('button', { name: 'Plano' }));
    expect(screen.getByRole('option', { name: 'Free' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'Pro · R$ 290/mês' })).toHaveAttribute('aria-selected', 'false');
  });

  it('honors defaultValue on first render (uncontrolled)', () => {
    render(<Select options={options} label="Plano" defaultValue="pro" />);
    expect(screen.getByRole('button', { name: 'Plano' })).toHaveTextContent('Pro · R$ 290/mês');
  });

  it('does not select a disabled option', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={options} label="Plano" onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: 'Plano' }));
    const disabledOpt = screen.getByRole('option', { name: 'Team · R$ 890/mês' });
    expect(disabledOpt).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabledOpt);
    expect(onValueChange).not.toHaveBeenCalled();
    // listbox stays open since nothing was selected
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('controlled mode does not change the displayed value until the parent re-renders', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Select options={options} label="Plano" value="free" onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole('button', { name: 'Plano' }));
    await user.click(screen.getByRole('option', { name: 'Pro · R$ 290/mês' }));

    // callback fires but internal state is ignored while controlled
    expect(onValueChange).toHaveBeenCalledWith('pro');
    expect(screen.getByRole('button', { name: 'Plano' })).toHaveTextContent('Free');

    // parent confirms the new value
    rerender(<Select options={options} label="Plano" value="pro" onValueChange={onValueChange} />);
    expect(screen.getByRole('button', { name: 'Plano' })).toHaveTextContent('Pro · R$ 290/mês');
  });

  it('closes the open listbox when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<Select options={options} label="Plano" />);

    await user.click(screen.getByRole('button', { name: 'Plano' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Plano' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the listbox when clicking outside the component', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Select options={options} label="Plano" />
        <button type="button">outside</button>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Plano' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('uses ariaLabel for accessibility when no visible label is provided', async () => {
    const user = userEvent.setup();
    render(<Select options={options} ariaLabel="Escolha um plano" />);
    const trigger = screen.getByRole('button', { name: 'Escolha um plano' });
    expect(trigger).toHaveAttribute('aria-label', 'Escolha um plano');
    expect(trigger).not.toHaveAttribute('aria-labelledby');

    // still fully operable without a visible label
    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select options={options} label="Plano" disabled />);
    const trigger = screen.getByRole('button', { name: 'Plano' });
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders the error message and flags the trigger with has-error', () => {
    render(<Select options={options} label="Plano" error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Plano' })).toHaveClass('has-error');
  });
});
