import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TagInput } from './TagInput';

describe('<TagInput />', () => {
  it('renders the label, an empty textbox and the placeholder by default', () => {
    render(<TagInput label="Skills" placeholder="Adicione…" />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Adicione…');
    // no tags / no remove buttons yet
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('adds a tag on Enter and clears the input (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<TagInput label="Skills" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'React{Enter}');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(input).toHaveValue('');
    // the new tag exposes a remove affordance
    expect(screen.getByRole('button', { name: 'Remover React' })).toBeInTheDocument();
  });

  it('adds a tag on comma', async () => {
    const user = userEvent.setup();
    render(<TagInput />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'IA,');
    expect(screen.getByText('IA')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('trims whitespace and ignores empty / whitespace-only entries', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TagInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, '   {Enter}'); // whitespace only → ignored
    expect(onChange).not.toHaveBeenCalled();
    await user.type(input, '  TypeScript  {Enter}');
    expect(onChange).toHaveBeenCalledWith(['TypeScript']);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('removes the last tag when Backspace is pressed on an empty input', async () => {
    const user = userEvent.setup();
    render(<TagInput />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'one{Enter}two{Enter}');
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    await user.type(input, '{Backspace}');
    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(screen.getByText('one')).toBeInTheDocument();
  });

  it('removes a tag when its remove button is clicked', async () => {
    const user = userEvent.setup();
    render(<TagInput />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'keep{Enter}drop{Enter}');
    await user.click(screen.getByRole('button', { name: 'Remover drop' }));
    expect(screen.queryByText('drop')).not.toBeInTheDocument();
    expect(screen.getByText('keep')).toBeInTheDocument();
  });

  it('blocks duplicate tags by default but allows them with allowDuplicates', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<TagInput />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'dup{Enter}dup{Enter}');
    expect(screen.getAllByText('dup')).toHaveLength(1);

    rerender(<TagInput allowDuplicates />);
    const input2 = screen.getByRole('textbox');
    await user.type(input2, 'dup{Enter}dup{Enter}');
    expect(screen.getAllByText('dup')).toHaveLength(2);
  });

  it('stops accepting tags once max is reached and disables the input', async () => {
    const user = userEvent.setup();
    render(<TagInput max={2} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'a{Enter}b{Enter}');
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    // at max: input becomes disabled and placeholder is cleared
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('placeholder', '');
  });

  it('renders suggestions, filters already-added ones, and adds on click', async () => {
    const user = userEvent.setup();
    render(<TagInput suggestions={['React', 'TypeScript', 'IA']} />);
    // NOTE: suggestion chips are <button> but carry an explicit role="listitem",
    // which overrides the native button role — so they are queried as listitems,
    // not buttons, and listitems don't compute a name from text content
    // (see bugsFound: a11y gap). We match by text within the listitem role.
    const suggestions = screen.getAllByRole('listitem');
    expect(suggestions).toHaveLength(3);
    const reactSuggestion = suggestions.find((el) => el.textContent === '+ React')!;
    expect(reactSuggestion).toBeInTheDocument();
    await user.click(reactSuggestion);
    // React is now a tag, so it disappears from suggestions
    expect(screen.getByText('React')).toBeInTheDocument();
    const remaining = screen.getAllByRole('listitem').map((el) => el.textContent);
    expect(remaining).not.toContain('+ React');
    // other suggestions remain
    expect(remaining).toContain('+ TypeScript');
  });

  it('does not mutate internal state in controlled mode without a value update', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<TagInput value={['locked']} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'new{Enter}');
    // onChange fires with the proposed next value, but rendered tags stay controlled
    expect(onChange).toHaveBeenCalledWith(['locked', 'new']);
    expect(screen.queryByText('new')).not.toBeInTheDocument();
    expect(screen.getByText('locked')).toBeInTheDocument();
    // parent commits the change
    rerender(<TagInput value={['locked', 'new']} onChange={onChange} />);
    expect(screen.getByText('new')).toBeInTheDocument();
  });

  it('hides remove buttons and suggestions when disabled', () => {
    render(
      <TagInput value={['a', 'b']} suggestions={['React']} disabled />,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeDisabled();
    // no remove buttons, no suggestion buttons
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText('Sugestões')).not.toBeInTheDocument();
  });

  it('shows the hint with a live count when max is set', () => {
    render(<TagInput value={['a']} hint="Até 5 tags" max={5} />);
    expect(screen.getByText('Até 5 tags')).toBeInTheDocument();
    expect(screen.getByText(/1\/5/)).toBeInTheDocument();
  });
});
