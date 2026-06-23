import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true },
];

describe('<MultiSelect />', () => {
  it('renders the placeholder and a closed listbox trigger by default', () => {
    render(<MultiSelect options={options} placeholder="Selecione skills" />);
    const trigger = screen.getByRole('button', { name: /selecione skills/i });
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the listbox on trigger click and exposes the options with ARIA', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} placeholder="Selecione" />);
    await user.click(screen.getByRole('button', { name: /selecione/i }));

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    expect(screen.getByRole('button', { name: /selecione/i })).toHaveAttribute('aria-expanded', 'true');

    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(4);
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'false');
  });

  it('selecting an option marks it aria-selected, renders a chip, and fires onChange (uncontrolled)', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelect options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /selecione/i }));
    await user.click(screen.getByRole('option', { name: 'React' }));

    expect(onChange).toHaveBeenCalledWith(['react']);
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'true');
    // chip appears on the trigger (the remove button is labelled "Remover React")
    expect(screen.getByRole('button', { name: 'Remover React' })).toBeInTheDocument();
  });

  it('toggling a selected option deselects it', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelect options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /selecione/i }));
    await user.click(screen.getByRole('option', { name: 'Vue' }));
    expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('option', { name: 'Vue' }));
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute('aria-selected', 'false');
  });

  it('clicking a chip remove button removes that value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={['react', 'vue']} onChange={onChange} />);

    // both chips present
    expect(screen.getByRole('button', { name: 'Remover React' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remover React' }));

    expect(onChange).toHaveBeenCalledWith(['vue']);
  });

  it('does not select a disabled option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelect options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /selecione/i }));
    await user.click(screen.getByRole('option', { name: 'Angular' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('option', { name: 'Angular' })).toHaveAttribute('aria-selected', 'false');
  });

  it('enforces the max limit: new selections are blocked once full, but deselect still works', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={['react', 'vue']} max={2} onChange={onChange} />);

    // the trigger's accessible name is the chip labels once items are selected,
    // so reach it via aria-haspopup rather than the placeholder text
    await user.click(screen.getByRole('button', { name: 'ReactVue' }));

    // adding a third is blocked
    await user.click(screen.getByRole('option', { name: 'Svelte' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('option', { name: 'Svelte' })).toHaveAttribute('aria-selected', 'false');

    // an already-selected option can still be removed
    await user.click(screen.getByRole('option', { name: 'React' }));
    expect(onChange).toHaveBeenCalledWith(['vue']);
  });

  it('controlled mode does not change the visible selection until value prop updates', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<MultiSelect options={options} value={[]} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /selecione/i }));
    await user.click(screen.getByRole('option', { name: 'React' }));

    // onChange fires but the selection stays empty until the parent re-renders
    expect(onChange).toHaveBeenCalledWith(['react']);
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'false');

    rerender(<MultiSelect options={options} value={['react']} onChange={onChange} />);
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'true');
  });

  it('closes the listbox when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);

    await user.click(screen.getByRole('button', { name: /selecione/i }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders the label and the hint with a count when max is set', () => {
    render(
      <MultiSelect
        options={options}
        label="Skills"
        hint="Escolha até 2"
        max={2}
        value={['react']}
      />,
    );
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Escolha até 2')).toBeInTheDocument();
    // count reflects current/limit
    expect(screen.getByText(/1\/2/)).toBeInTheDocument();
  });

  it('when disabled the trigger is disabled and chip remove buttons are hidden', () => {
    render(<MultiSelect options={options} value={['react']} disabled />);
    expect(screen.getByRole('button', { name: /react/i })).toBeDisabled();
    // remove buttons are not rendered while disabled
    expect(screen.queryByRole('button', { name: 'Remover React' })).not.toBeInTheDocument();
  });
});
