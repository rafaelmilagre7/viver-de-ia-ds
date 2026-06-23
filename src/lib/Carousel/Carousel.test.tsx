import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from './Carousel';

const slides = [
  <div key="a">slide-alfa</div>,
  <div key="b">slide-bravo</div>,
  <div key="c">slide-charlie</div>,
];

describe('<Carousel />', () => {
  it('renders a labelled carousel region with all slides + the first active', () => {
    render(<Carousel>{slides}</Carousel>);

    const region = screen.getByRole('region', { name: 'Carrossel' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');

    // every slide is in the DOM, labelled "Slide N de total"
    const groups = screen.getAllByRole('group', { hidden: true });
    expect(groups).toHaveLength(3);
    expect(groups[0]).toHaveAttribute('aria-label', 'Slide 1 de 3');
    expect(groups[0]).toHaveAttribute('aria-roledescription', 'slide');

    // first slide visible, the rest hidden
    expect(groups[0]).toHaveAttribute('aria-hidden', 'false');
    expect(groups[1]).toHaveAttribute('aria-hidden', 'true');
    expect(groups[2]).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses a custom accessible label when provided', () => {
    render(<Carousel label="Depoimentos">{slides}</Carousel>);
    expect(screen.getByRole('region', { name: 'Depoimentos' })).toBeInTheDocument();
  });

  it('clicking "Próximo slide" advances to the next slide', async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides}</Carousel>);

    await user.click(screen.getByRole('button', { name: 'Próximo slide' }));

    const groups = screen.getAllByRole('group', { hidden: true });
    expect(groups[0]).toHaveAttribute('aria-hidden', 'true');
    expect(groups[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('clicking "Slide anterior" with loop wraps from first to last', async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides}</Carousel>);

    await user.click(screen.getByRole('button', { name: 'Slide anterior' }));

    const groups = screen.getAllByRole('group', { hidden: true });
    expect(groups[2]).toHaveAttribute('aria-hidden', 'false'); // wrapped to last
  });

  it('dots act as a tablist; clicking a dot jumps to that slide', async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides}</Carousel>);

    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('tab', { name: 'Ir pro slide 3' }));

    expect(screen.getByRole('tab', { name: 'Ir pro slide 3' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Ir pro slide 1' })).toHaveAttribute('aria-selected', 'false');
    const groups = screen.getAllByRole('group', { hidden: true });
    expect(groups[2]).toHaveAttribute('aria-hidden', 'false');
  });

  it('ArrowRight / ArrowLeft on the region navigate slides', async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides}</Carousel>);

    const region = screen.getByRole('region', { name: 'Carrossel' });
    region.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getAllByRole('group', { hidden: true })[1]).toHaveAttribute('aria-hidden', 'false');

    await user.keyboard('{ArrowLeft}');
    expect(screen.getAllByRole('group', { hidden: true })[0]).toHaveAttribute('aria-hidden', 'false');
  });

  it('controlled mode does not move on its own; it reflects the index prop + fires onIndexChange', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Carousel index={0} onIndexChange={onIndexChange}>
        {slides}
      </Carousel>,
    );

    await user.click(screen.getByRole('button', { name: 'Próximo slide' }));

    // callback fires with the requested index, but the view stays put until the parent updates
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getAllByRole('group', { hidden: true })[0]).toHaveAttribute('aria-hidden', 'false');

    rerender(
      <Carousel index={1} onIndexChange={onIndexChange}>
        {slides}
      </Carousel>,
    );
    expect(screen.getAllByRole('group', { hidden: true })[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('with loop disabled, the prev arrow is disabled at the start and the next arrow at the end', () => {
    render(
      <Carousel loop={false} index={0} onIndexChange={() => {}}>
        {slides}
      </Carousel>,
    );

    expect(screen.getByRole('button', { name: 'Slide anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Próximo slide' })).not.toBeDisabled();
  });

  it('with loop disabled, the next arrow is disabled on the last slide', () => {
    render(
      <Carousel loop={false} index={2} onIndexChange={() => {}}>
        {slides}
      </Carousel>,
    );

    expect(screen.getByRole('button', { name: 'Próximo slide' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Slide anterior' })).not.toBeDisabled();
  });

  it('hides arrows and dots when showArrows / showDots are false', () => {
    render(
      <Carousel showArrows={false} showDots={false}>
        {slides}
      </Carousel>,
    );

    expect(screen.queryByRole('button', { name: 'Próximo slide' })).not.toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });

  it('hides navigation chrome when there is a single slide', () => {
    render(<Carousel>{[<div key="only">único</div>]}</Carousel>);

    expect(screen.queryByRole('button', { name: 'Próximo slide' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Slide anterior' })).not.toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    expect(screen.getByText('único')).toBeInTheDocument();
  });

  it('advances automatically when autoPlay is set', () => {
    vi.useFakeTimers();
    try {
      render(<Carousel autoPlay={1000}>{slides}</Carousel>);

      expect(screen.getAllByRole('group', { hidden: true })[0]).toHaveAttribute('aria-hidden', 'false');
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getAllByRole('group', { hidden: true })[1]).toHaveAttribute('aria-hidden', 'false');
    } finally {
      vi.useRealTimers();
    }
  });
});
