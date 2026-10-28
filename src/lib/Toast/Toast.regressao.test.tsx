import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { ToastStack, type ToastItem } from './Toast';

/* Regressões da auditoria · timer estável, pausa em hover/foco, região viva persistente */

beforeAll(() => {
  // jsdom não tem matchMedia (o gesto de arrastar consulta reduced-motion)
  window.matchMedia = ((q: string) => ({
    matches: false,
    media: q,
    addEventListener() {},
    removeEventListener() {},
  })) as unknown as typeof window.matchMedia;
});
afterEach(() => {
  vi.useRealTimers();
});

const tick = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });

describe('<ToastStack /> · regressões', () => {
  it('re-render do pai (onDismiss inline) não reinicia o timer de 4,5s', () => {
    vi.useFakeTimers();
    const dismissed: string[] = [];
    function Host() {
      const [, tickState] = useState(0);
      const [toasts, setToasts] = useState<ToastItem[]>([{ id: 't1', title: 'Salvo' }]);
      useEffect(() => {
        const i = setInterval(() => tickState((n) => n + 1), 1000); // ex.: um relógio
        return () => clearInterval(i);
      }, []);
      return (
        <ToastStack
          toasts={toasts}
          onDismiss={(id) => {
            dismissed.push(id);
            setToasts((t) => t.filter((x) => x.id !== id));
          }}
        />
      );
    }
    render(<Host />);
    for (let i = 0; i < 5; i++) tick(1000);
    expect(dismissed).toEqual(['t1']);
  });

  it('foco dentro do toast pausa o timer; sair retoma o tempo que faltava', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(
      <>
        <ToastStack
          toasts={[{ id: 'x', title: 'Apagado', action: { label: 'Desfazer', onClick() {} } }]}
          onDismiss={onDismiss}
        />
        <button>fora</button>
      </>,
    );
    tick(1000);
    act(() => screen.getByRole('button', { name: 'Desfazer' }).focus());
    tick(10000);
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => screen.getByRole('button', { name: 'fora' }).focus());
    tick(3400);
    expect(onDismiss).not.toHaveBeenCalled();
    tick(200);
    expect(onDismiss).toHaveBeenCalledWith('x');
  });

  it('ponteiro em cima pausa o timer', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<ToastStack toasts={[{ id: 'x', title: 'Salvo' }]} onDismiss={onDismiss} />);
    const card = screen.getByText('Salvo').closest('.via-toast')!;
    fireEvent.mouseEnter(card);
    tick(10000);
    expect(onDismiss).not.toHaveBeenCalled();
    fireEvent.mouseLeave(card);
    tick(4600);
    expect(onDismiss).toHaveBeenCalledWith('x');
  });

  it('regiões vivas existem antes do toast; destrutivo vai pro role=alert', () => {
    const { rerender } = render(<ToastStack toasts={[]} onDismiss={() => {}} />);
    const status = screen.getByRole('status');
    const alert = screen.getByRole('alert');
    expect(status).toBeEmptyDOMElement();
    rerender(
      <ToastStack
        toasts={[
          { id: 'a', title: 'Salvo', message: 'Tudo certo' },
          { id: 'b', title: 'Falhou', variant: 'destructive' },
        ]}
        onDismiss={() => {}}
      />,
    );
    // mesmos nós (persistentes) — só o texto entrou
    expect(screen.getByRole('status')).toBe(status);
    expect(status).toHaveTextContent('Salvo. Tudo certo.');
    expect(alert).toHaveTextContent('Falhou.');
    expect(status).not.toHaveTextContent('Falhou');
  });
});
