import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Splitter } from './Splitter';

describe('<Splitter />', () => {
  it('renders both panes and a separator handle at the default split', () => {
    render(<Splitter start={<p>pane-start</p>} end={<p>pane-end</p>} />);
    expect(screen.getByText('pane-start')).toBeInTheDocument();
    expect(screen.getByText('pane-end')).toBeInTheDocument();

    const handle = screen.getByRole('separator');
    expect(handle).toHaveAttribute('aria-valuenow', '50');
    expect(handle).toHaveAttribute('aria-valuemin', '15');
    expect(handle).toHaveAttribute('aria-valuemax', '85');
    expect(handle).toHaveAttribute('aria-orientation', 'horizontal');
    expect(handle).toHaveAttribute('aria-label', 'Redimensionar painéis');
  });

  it('honors defaultSplit and reflects it on the panes inline width', () => {
    render(<Splitter defaultSplit={30} start={<p>a</p>} end={<p>b</p>} />);
    const handle = screen.getByRole('separator');
    expect(handle).toHaveAttribute('aria-valuenow', '30');

    const startPane = screen.getByText('a').parentElement!;
    const endPane = screen.getByText('b').parentElement!;
    expect(startPane).toHaveStyle({ width: '30%' });
    expect(endPane).toHaveStyle({ width: '70%' });
  });

  it('uses a custom handleLabel', () => {
    render(<Splitter handleLabel="Ajustar editor" start={<p>a</p>} end={<p>b</p>} />);
    expect(screen.getByRole('separator', { name: 'Ajustar editor' })).toBeInTheDocument();
  });

  it('ArrowRight / ArrowLeft adjust the split by 1% in horizontal orientation', async () => {
    const user = userEvent.setup();
    render(<Splitter defaultSplit={50} start={<p>a</p>} end={<p>b</p>} />);
    const handle = screen.getByRole('separator');
    handle.focus();

    await user.keyboard('{ArrowRight}');
    expect(handle).toHaveAttribute('aria-valuenow', '51');

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(handle).toHaveAttribute('aria-valuenow', '49');
  });

  it('Shift+Arrow moves in 5% steps', async () => {
    const user = userEvent.setup();
    render(<Splitter defaultSplit={50} start={<p>a</p>} end={<p>b</p>} />);
    const handle = screen.getByRole('separator');
    handle.focus();

    await user.keyboard('{Shift>}{ArrowRight}{/Shift}');
    expect(handle).toHaveAttribute('aria-valuenow', '55');
  });

  it('Home jumps to min, End jumps to max', async () => {
    const user = userEvent.setup();
    render(<Splitter defaultSplit={50} min={20} max={80} start={<p>a</p>} end={<p>b</p>} />);
    const handle = screen.getByRole('separator');
    handle.focus();

    await user.keyboard('{End}');
    expect(handle).toHaveAttribute('aria-valuenow', '80');

    await user.keyboard('{Home}');
    expect(handle).toHaveAttribute('aria-valuenow', '20');
  });

  it('clamps the split to min/max bounds', async () => {
    const user = userEvent.setup();
    render(<Splitter defaultSplit={16} min={15} max={85} start={<p>a</p>} end={<p>b</p>} />);
    const handle = screen.getByRole('separator');
    handle.focus();

    // step below min should clamp to 15, not 14
    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(handle).toHaveAttribute('aria-valuenow', '15');
  });

  it('uses ArrowUp / ArrowDown when orientation is vertical (and ignores horizontal arrows)', async () => {
    const user = userEvent.setup();
    render(
      <Splitter orientation="vertical" defaultSplit={50} start={<p>a</p>} end={<p>b</p>} />,
    );
    const handle = screen.getByRole('separator');
    expect(handle).toHaveAttribute('aria-orientation', 'vertical');
    handle.focus();

    await user.keyboard('{ArrowDown}');
    expect(handle).toHaveAttribute('aria-valuenow', '51');

    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(handle).toHaveAttribute('aria-valuenow', '49');

    // horizontal arrows are no-ops in vertical mode
    await user.keyboard('{ArrowRight}{ArrowLeft}');
    expect(handle).toHaveAttribute('aria-valuenow', '49');
  });

  it('vertical orientation drives pane height instead of width', () => {
    render(
      <Splitter orientation="vertical" defaultSplit={40} start={<p>a</p>} end={<p>b</p>} />,
    );
    const startPane = screen.getByText('a').parentElement!;
    const endPane = screen.getByText('b').parentElement!;
    expect(startPane).toHaveStyle({ height: '40%' });
    expect(endPane).toHaveStyle({ height: '60%' });
  });

  it('controlled mode does not mutate internal state but fires onSplitChange', async () => {
    const onSplitChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Splitter split={40} onSplitChange={onSplitChange} start={<p>a</p>} end={<p>b</p>} />,
    );
    const handle = screen.getByRole('separator');
    handle.focus();

    await user.keyboard('{ArrowRight}');
    // value stays pinned to the controlled prop until the parent updates it
    expect(handle).toHaveAttribute('aria-valuenow', '40');
    expect(onSplitChange).toHaveBeenCalledWith(41);

    // parent confirms the new value
    rerender(
      <Splitter split={41} onSplitChange={onSplitChange} start={<p>a</p>} end={<p>b</p>} />,
    );
    expect(handle).toHaveAttribute('aria-valuenow', '41');
  });

  it('onSplitChange receives the clamped value in controlled mode', async () => {
    const onSplitChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Splitter split={15} min={15} max={85} onSplitChange={onSplitChange} start={<p>a</p>} end={<p>b</p>} />,
    );
    screen.getByRole('separator').focus();

    await user.keyboard('{ArrowLeft}');
    // would be 14, clamped to 15
    expect(onSplitChange).toHaveBeenCalledWith(15);
  });

  it('exposes the handle as a focusable button (separator role)', () => {
    render(<Splitter start={<p>a</p>} end={<p>b</p>} />);
    const handle = screen.getByRole('separator');
    expect(handle.tagName).toBe('BUTTON');
    expect(handle).toHaveAttribute('type', 'button');
  });
});
