import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { HoverCard } from '../HoverCard/HoverCard';

/* Regressões da auditoria · WCAG 1.4.13 (dispensável) e descrição sempre ligada */

afterEach(() => {
  vi.useRealTimers();
});

describe('<Tooltip /> · regressões', () => {
  it('aberto por hover, fecha com ESC mesmo com o foco em outro lugar', () => {
    vi.useFakeTimers();
    render(
      <>
        <Tooltip content="dica">
          <button>i</button>
        </Tooltip>
        <input aria-label="campo" />
      </>,
    );
    act(() => screen.getByLabelText('campo').focus());
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'i' }).parentElement!);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.getByLabelText('campo')).toHaveFocus();
  });

  it('aria-describedby já resolve no instante do foco (antes do delay)', () => {
    render(
      <Tooltip content="dica">
        <button>i</button>
      </Tooltip>,
    );
    const b = screen.getByRole('button');
    act(() => b.focus());
    expect(b).toHaveAccessibleDescription('dica');
  });

  it('bolha renderiza num portal no body (não é cortada pelo container)', () => {
    vi.useFakeTimers();
    render(
      <div data-testid="box" style={{ overflow: 'hidden' }}>
        <Tooltip content="dica">
          <button>i</button>
        </Tooltip>
      </div>,
    );
    fireEvent.mouseEnter(screen.getByRole('button').parentElement!);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByTestId('box')).not.toContainElement(screen.getByRole('tooltip'));
  });
});

describe('<HoverCard /> · regressões', () => {
  it('ESC fecha o card aberto', () => {
    vi.useFakeTimers();
    render(<HoverCard trigger={<a href="#x">@caio</a>}>card</HoverCard>);
    act(() => screen.getByRole('link').focus());
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('trigger sempre descrito pelo conteúdo do card', () => {
    render(<HoverCard trigger={<a href="#x">@caio</a>}>Fundador</HoverCard>);
    expect(screen.getByRole('link')).toHaveAccessibleDescription('Fundador');
  });
});
