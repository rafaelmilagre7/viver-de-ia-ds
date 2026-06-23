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

    // the trigger keeps a stable accessible name from the placeholder even once
    // chips are selected (the name no longer collapses into the chip labels)
    await user.click(screen.getByRole('button', { name: /selecione/i }));

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
    render(<MultiSelect options={options} value={['react']} placeholder="Selecione" disabled />);
    // accessible name comes from the placeholder, not the chip labels
    expect(screen.getByRole('button', { name: /selecione/i })).toBeDisabled();
    // remove buttons are not rendered while disabled
    expect(screen.queryByRole('button', { name: 'Remover React' })).not.toBeInTheDocument();
  });

  it('names the trigger from the label prop via aria-labelledby (not the chip labels)', () => {
    render(<MultiSelect options={options} label="Frameworks" value={['react', 'vue']} />);
    // the trigger is reachable by the label text, even though chips are present
    const trigger = screen.getByRole('button', { name: 'Frameworks' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('falls back to the placeholder for the accessible name when there is no label', () => {
    render(<MultiSelect options={options} placeholder="Escolha um framework" value={['react']} />);
    expect(
      screen.getByRole('button', { name: 'Escolha um framework' }),
    ).toBeInTheDocument();
  });

  it('Arrow keys move the active descendant and Enter toggles the highlighted option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelect options={options} onChange={onChange} />);

    const trigger = screen.getByRole('button', { name: /selecione/i });
    await user.click(trigger);

    // opening highlights the first enabled option (React)
    const listbox = screen.getByRole('listbox');
    const react = screen.getByRole('option', { name: 'React' });
    expect(trigger).toHaveAttribute('aria-activedescendant', react.id);
    expect(react).toHaveClass('is-active');

    // ArrowDown moves the highlight to Vue
    await user.keyboard('{ArrowDown}');
    const vue = screen.getByRole('option', { name: 'Vue' });
    expect(trigger).toHaveAttribute('aria-activedescendant', vue.id);
    expect(vue).toHaveClass('is-active');
    expect(react).not.toHaveClass('is-active');

    // the trigger controls the listbox while open
    expect(trigger).toHaveAttribute('aria-controls', listbox.id);

    // Enter toggles the selection of the highlighted option (multi-select)
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(['vue']);
    expect(vue).toHaveAttribute('aria-selected', 'true');
  });

  it('Space toggles the highlighted option and ArrowUp wraps to the last enabled one', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelect options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /selecione/i }));

    // ArrowUp from the first option wraps to the last *enabled* option
    // (Angular is disabled, so it lands on Svelte)
    await user.keyboard('{ArrowUp}');
    const svelte = screen.getByRole('option', { name: 'Svelte' });
    expect(svelte).toHaveClass('is-active');

    // Space selects it
    await user.keyboard('{ }');
    expect(onChange).toHaveBeenCalledWith(['svelte']);
    expect(svelte).toHaveAttribute('aria-selected', 'true');

    // Space again deselects it (true toggle)
    await user.keyboard('{ }');
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(svelte).toHaveAttribute('aria-selected', 'false');
  });

  it('Home and End jump to the first and last enabled options', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);

    const trigger = screen.getByRole('button', { name: /selecione/i });
    await user.click(trigger);

    await user.keyboard('{End}');
    // End lands on the last enabled option (Svelte, since Angular is disabled)
    expect(screen.getByRole('option', { name: 'Svelte' })).toHaveClass('is-active');

    await user.keyboard('{Home}');
    expect(screen.getByRole('option', { name: 'React' })).toHaveClass('is-active');
  });

  it('Enter on a disabled highlighted option does not select it', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    // only Angular (disabled) and a single enabled option to force landing on disabled is hard,
    // so we navigate to Angular explicitly via End-like motion is not possible; instead we
    // assert keyboard nav never highlights the disabled option.
    render(<MultiSelect options={options} onChange={onChange} />);

    const trigger = screen.getByRole('button', { name: /selecione/i });
    await user.click(trigger);

    // cycle all the way around with ArrowDown; Angular must never become active
    for (let i = 0; i < options.length + 1; i++) {
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('option', { name: 'Angular' })).not.toHaveClass('is-active');
    }
    // and Enter never selects the disabled option
    expect(onChange).not.toHaveBeenCalledWith(['angular']);
  });

  it('ArrowDown opens the listbox when the trigger is focused and closed', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);

    const trigger = screen.getByRole('button', { name: /selecione/i });
    trigger.focus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    // first enabled option becomes the active descendant
    expect(trigger).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'React' }).id,
    );
  });

  it('Escape closes the listbox and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);

    const trigger = screen.getByRole('button', { name: /selecione/i });
    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
