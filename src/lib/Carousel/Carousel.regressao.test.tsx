import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import axe from 'axe-core';
import { Carousel } from './Carousel';

/* Regressões da auditoria · auto-play acessível (WCAG 2.2.2) e slides ocultos inertes */

afterEach(() => {
  vi.useRealTimers();
});

const slides = [
  <a key="1" href="#1">um</a>,
  <a key="2" href="#2">dois</a>,
  <a key="3" href="#3">três</a>,
];
const current = () => screen.getByRole('tab', { selected: true }).getAttribute('aria-label');

describe('<Carousel /> · regressões', () => {
  it('slides ocultos ficam inert (link escondido não recebe foco) e o axe passa', async () => {
    const { container } = render(<Carousel>{slides}</Carousel>);
    const hidden = container.querySelectorAll('[aria-hidden="true"].via-carousel__slide');
    expect(hidden).toHaveLength(2);
    hidden.forEach((s) => expect(s).toHaveAttribute('inert'));
    const res = await axe.run(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(res.violations.map((v) => v.id)).toEqual([]);
  });

  it('auto-play tem botão de pausar/retomar e região viva desligada enquanto gira', () => {
    vi.useFakeTimers();
    render(<Carousel autoPlay={1000}>{slides}</Carousel>);
    const track = document.querySelector('.via-carousel__track')!;
    expect(track).toHaveAttribute('aria-live', 'off');
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(current()).toBe('Ir pro slide 2');

    fireEvent.click(screen.getByRole('button', { name: 'Pausar carrossel' }));
    expect(screen.getByRole('button', { name: 'Retomar carrossel' })).toBeInTheDocument();
    expect(track).toHaveAttribute('aria-live', 'polite');
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(current()).toBe('Ir pro slide 2');
  });

  it('pausa com o ponteiro em cima e retoma ao sair', () => {
    vi.useFakeTimers();
    render(<Carousel autoPlay={1000}>{slides}</Carousel>);
    const root = screen.getByRole('region');
    fireEvent.mouseEnter(root);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(current()).toBe('Ir pro slide 1');
    fireEvent.mouseLeave(root);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(current()).toBe('Ir pro slide 2');
  });

  it('pausa com o foco dentro', () => {
    vi.useFakeTimers();
    render(<Carousel autoPlay={1000}>{slides}</Carousel>);
    act(() => screen.getByRole('button', { name: 'Próximo slide' }).focus());
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(current()).toBe('Ir pro slide 1');
  });

  it('sem auto-play não mostra o botão de pausa', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.queryByRole('button', { name: /carrossel/ })).not.toBeInTheDocument();
  });
});
