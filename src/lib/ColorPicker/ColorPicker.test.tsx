import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorPicker, type ColorSwatch } from './ColorPicker';

const palette: ColorSwatch[] = [
  { hex: '#0A1F3B', name: 'Navy' },
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#B85C5C', name: 'Coral' },
];

describe('<ColorPicker />', () => {
  it('renders the palette as a radiogroup of radio swatches', () => {
    render(<ColorPicker palette={palette} />);
    const group = screen.getByRole('radiogroup', { name: 'Paleta de cores' });
    expect(group).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(palette.length);
    // each swatch exposes its name via aria-label and starts unchecked (no value)
    expect(screen.getByRole('radio', { name: 'Navy' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('radio', { name: 'White' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('radio', { name: 'Coral' })).toHaveAttribute('aria-checked', 'false');
  });

  it('renders an optional label and the custom hex input by default', () => {
    render(<ColorPicker palette={palette} label="Cor da marca" />);
    expect(screen.getByText('Cor da marca')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('HEX customizado')).toBeInTheDocument();
  });

  it('marks the swatch matching `value` as checked (case-insensitive) and shows its name', () => {
    render(<ColorPicker palette={palette} value="#0a1f3b" />);
    expect(screen.getByRole('radio', { name: 'Navy' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'White' })).toHaveAttribute('aria-checked', 'false');
    // preview echoes the canonical name + uppercased hex
    expect(screen.getByText('Navy')).toBeInTheDocument();
    expect(screen.getByText('#0A1F3B')).toBeInTheDocument();
  });

  it('shows "Customizado" in the preview when value is not in the palette', () => {
    render(<ColorPicker palette={palette} value="#123456" />);
    expect(screen.getByText('Customizado')).toBeInTheDocument();
    expect(screen.getByText('#123456')).toBeInTheDocument();
    // no swatch should be checked
    screen.getAllByRole('radio').forEach((r) => {
      expect(r).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('clicking a swatch fires onChange with its hex', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ColorPicker palette={palette} onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: 'Coral' }));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('#B85C5C');
  });

  it('is controlled: clicking a swatch does not change aria-checked until value updates', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <ColorPicker palette={palette} value="#0A1F3B" onChange={onChange} />,
    );
    await user.click(screen.getByRole('radio', { name: 'White' }));
    // onChange fired, but selection still reflects the controlled prop
    expect(onChange).toHaveBeenCalledWith('#FFFFFF');
    expect(screen.getByRole('radio', { name: 'Navy' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'White' })).toHaveAttribute('aria-checked', 'false');

    // parent confirms the change
    rerender(<ColorPicker palette={palette} value="#FFFFFF" onChange={onChange} />);
    expect(screen.getByRole('radio', { name: 'White' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Navy' })).toHaveAttribute('aria-checked', 'false');
  });

  it('syncs the hex input when `value` changes externally (swatch / parent set)', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <ColorPicker palette={palette} value="#0A1F3B" onChange={onChange} />,
    );
    const input = screen.getByRole('textbox');
    // input mirrors the initial controlled value
    expect(input).toHaveValue('#0A1F3B');

    // parent sets a brand-new value (e.g. picked a different swatch) -> input re-syncs
    rerender(<ColorPicker palette={palette} value="#FFFFFF" onChange={onChange} />);
    expect(input).toHaveValue('#FFFFFF');

    // a value outside the palette also propagates to the input
    rerender(<ColorPicker palette={palette} value="#123456" onChange={onChange} />);
    expect(input).toHaveValue('#123456');
  });

  it('keeps manual editing working after an external value sync', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <ColorPicker palette={palette} value="#0A1F3B" onChange={onChange} />,
    );
    const input = screen.getByRole('textbox');

    // external change lands first
    rerender(<ColorPicker palette={palette} value="#FFFFFF" onChange={onChange} />);
    expect(input).toHaveValue('#FFFFFF');

    // user then edits the hex by hand -> typing still updates the input and emits onChange
    await user.clear(input);
    await user.type(input, 'abcdef');
    expect(input).toHaveValue('#ABCDEF');
    expect(onChange).toHaveBeenLastCalledWith('#ABCDEF');
  });

  it('typing a complete valid hex fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ColorPicker palette={palette} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, '#123456');
    // only the final keystroke completes a valid 6-digit hex
    expect(onChange).toHaveBeenCalledWith('#123456');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('normalizes typed hex: prepends # and uppercases', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ColorPicker palette={palette} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'abcdef');
    expect(onChange).toHaveBeenLastCalledWith('#ABCDEF');
    // input value reflects the normalized form
    expect(input).toHaveValue('#ABCDEF');
  });

  it('does not fire onChange for an incomplete / invalid hex', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ColorPicker palette={palette} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, '#12');
    expect(onChange).not.toHaveBeenCalled();
    // partial value is still reflected in the input
    expect(input).toHaveValue('#12');
  });

  it('hides the custom hex input when allowCustom is false', () => {
    render(<ColorPicker palette={palette} allowCustom={false} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByText('HEX customizado')).not.toBeInTheDocument();
  });

  it('disabled: swatches and input are disabled and clicks do not fire onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ColorPicker palette={palette} onChange={onChange} disabled />);
    const navy = screen.getByRole('radio', { name: 'Navy' });
    expect(navy).toBeDisabled();
    expect(screen.getByRole('textbox')).toBeDisabled();
    await user.click(navy);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('falls back to the first palette color in the preview when no value is set', () => {
    render(<ColorPicker palette={palette} />);
    // preview hex defaults to first swatch, but nothing is selected
    expect(screen.getByText('#0A1F3B')).toBeInTheDocument();
    expect(screen.getByText('Customizado')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Navy' })).toHaveAttribute('aria-checked', 'false');
  });
});
