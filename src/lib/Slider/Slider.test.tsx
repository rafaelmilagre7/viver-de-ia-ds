import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './Slider';

describe('<Slider />', () => {
  it('renders with role=slider (native input[type=range])', () => {
    render(<Slider value={40} onChange={() => {}} ariaLabel="Vol" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('reflects value, min and max', () => {
    render(<Slider value={50} min={10} max={90} onChange={() => {}} ariaLabel="V" />);
    const slider = screen.getByRole('slider') as HTMLInputElement;
    expect(slider.value).toBe('50');
    expect(slider.min).toBe('10');
    expect(slider.max).toBe('90');
  });

  it('renders label when provided', () => {
    render(<Slider value={30} onChange={() => {}} label="Streak meta · 30 dias" />);
    expect(screen.getByText('Streak meta · 30 dias')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} ariaLabel="V" />);
    const slider = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
  });

  it('respects disabled', () => {
    render(<Slider value={50} onChange={() => {}} disabled ariaLabel="V" />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
