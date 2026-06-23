import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from './Combobox';

// jsdom doesn't implement Element.prototype.scrollIntoView, which the component
// calls in an effect to keep the active option in view. Stub it as a no-op so
// opening the list doesn't throw — this does not change component behavior.
beforeAll(() => {
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

const cities = [
  { value: 'sp',  label: 'São Paulo' },
  { value: 'rj',  label: 'Rio de Janeiro' },
  { value: 'poa', label: 'Porto Alegre' },
];

describe('<Combobox />', () => {
  it('renders the trigger closed by default with the right ARIA wiring', () => {
    render(<Combobox options={cities} ariaLabel="Cidade" />);
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).toHaveAttribute('aria-controls');
    // closed → no listbox in the tree
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the listbox on input focus and lists every option', async () => {
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(3);
    expect(screen.getByRole('option', { name: 'São Paulo' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Porto Alegre' })).toBeInTheDocument();
  });

  it('filters options by typed query (case-insensitive)', async () => {
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" />);
    await user.click(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'rio');
    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'Rio de Janeiro' })).toBeInTheDocument();
  });

  it('shows the empty label when nothing matches the query', async () => {
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" emptyLabel="Nada encontrado" />);
    await user.click(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'zzz');
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
    expect(screen.getByText('Nada encontrado')).toBeInTheDocument();
  });

  it('selecting an option fires onValueChange, closes the list, and reflects the label in the input', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" onValueChange={onValueChange} />);
    await user.click(screen.getByRole('textbox'));
    await user.click(screen.getByRole('option', { name: 'Porto Alegre' }));
    expect(onValueChange).toHaveBeenCalledWith('poa');
    // list closed after select
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    // selected (uncontrolled) → label populates the input value
    expect(screen.getByRole('textbox')).toHaveValue('Porto Alegre');
  });

  it('marks the selected option with aria-selected="true" (uncontrolled defaultValue)', async () => {
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" defaultValue="rj" />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('option', { name: 'Rio de Janeiro' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'São Paulo' })).toHaveAttribute('aria-selected', 'false');
  });

  it('ArrowDown navigation + Enter selects the active option and sets aria-activedescendant', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" onValueChange={onValueChange} />);
    const input = screen.getByRole('textbox');
    await user.click(input); // onFocus opens + active=0
    // active starts at 0 (São Paulo) and is exposed via aria-activedescendant
    expect(input).toHaveAttribute('aria-activedescendant');
    await user.keyboard('{ArrowDown}'); // → index 1 (Rio)
    await user.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('rj');
  });

  it('Escape closes the open listbox', async () => {
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('keyboard navigation skips disabled options', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    const opts = [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Bravo', disabled: true },
      { value: 'c', label: 'Charlie' },
    ];
    render(<Combobox options={opts} ariaLabel="Letra" onValueChange={onValueChange} />);
    await user.click(screen.getByRole('textbox')); // active=0 (Alpha)
    await user.keyboard('{ArrowDown}'); // skips disabled Bravo → Charlie
    await user.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('c');
  });

  it('clicking a disabled option does not select it', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    const opts = [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Bravo', disabled: true },
    ];
    render(<Combobox options={opts} ariaLabel="Letra" onValueChange={onValueChange} />);
    await user.click(screen.getByRole('textbox'));
    const disabledOpt = screen.getByRole('option', { name: 'Bravo' });
    expect(disabledOpt).toHaveAttribute('aria-disabled', 'true');
    await user.click(disabledOpt);
    expect(onValueChange).not.toHaveBeenCalled();
    // list stays open since nothing was selected
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('controlled mode: input value follows the value prop, not internal clicks', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Combobox options={cities} ariaLabel="Cidade" value="sp" onValueChange={onValueChange} />,
    );
    expect(screen.getByRole('textbox')).toHaveValue('São Paulo');

    await user.click(screen.getByRole('textbox'));
    await user.click(screen.getByRole('option', { name: 'Rio de Janeiro' }));
    // onValueChange fires but the displayed value stays controlled until parent updates
    expect(onValueChange).toHaveBeenCalledWith('rj');
    expect(screen.getByRole('textbox')).toHaveValue('São Paulo');

    // parent confirms the change
    rerender(<Combobox options={cities} ariaLabel="Cidade" value="rj" onValueChange={onValueChange} />);
    expect(screen.getByRole('textbox')).toHaveValue('Rio de Janeiro');
  });

  it('disabled combobox does not open on focus and disables the input', async () => {
    const user = userEvent.setup();
    render(<Combobox options={cities} ariaLabel="Cidade" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    await user.click(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('associates a visible label with the input via id/htmlFor', () => {
    render(<Combobox options={cities} label="Cidade do evento" />);
    expect(screen.getByLabelText('Cidade do evento')).toBe(screen.getByRole('textbox'));
  });
});
