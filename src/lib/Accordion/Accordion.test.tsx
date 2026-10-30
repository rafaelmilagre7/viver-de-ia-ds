import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

const items = [
  { id: 'q1', title: 'Como funciona?', content: <p>Resposta 1</p> },
  { id: 'q2', title: 'Cancelar?', content: <p>Resposta 2</p> },
  { id: 'q3', title: 'Mentor?', content: <p>Resposta 3</p> },
];

describe('<Accordion />', () => {
  it('renders all triggers', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Como funciona?')).toBeInTheDocument();
    expect(screen.getByText('Cancelar?')).toBeInTheDocument();
    expect(screen.getByText('Mentor?')).toBeInTheDocument();
  });

  it('opens defaultOpen item', () => {
    render(<Accordion items={items} defaultOpen="q1" />);
    expect(screen.getByText('Resposta 1')).toBeVisible();
  });

  it('expands on trigger click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByText('Cancelar?'));
    expect(screen.getByText('Resposta 2')).toBeVisible();
  });

  it('closes previous when single (FAQ-style)', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen="q1" />);
    await user.click(screen.getByText('Mentor?'));
    // Resposta 1 deve estar fechada (não no DOM ou hidden)
    expect(screen.queryByText('Resposta 1')).not.toBeVisible();
    expect(screen.getByText('Resposta 3')).toBeVisible();
  });

  it('multiple=true permite vários abertos', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} multiple defaultOpen={['q1']} />);
    await user.click(screen.getByText('Cancelar?'));
    expect(screen.getByText('Resposta 1')).toBeVisible();
    expect(screen.getByText('Resposta 2')).toBeVisible();
  });
});

/* Abre/fecha com a altura de verdade (grid 0fr↔1fr): o painel só some
   (`hidden`) depois que a transição de fechar termina */
describe('<Accordion /> · estados de abrir/fechar', () => {
  afterEach(() => {
    // @ts-expect-error · limpa o mock de Web Animations
    delete Element.prototype.getAnimations;
  });

  const panelOf = (title: string) =>
    document.getElementById(screen.getByText(title).closest('button')!.getAttribute('aria-controls')!)!;

  it('data-state e aria-expanded acompanham; fechado sem animação vira hidden na hora', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const trigger = screen.getByText('Cancelar?').closest('button')!;
    expect(panelOf('Cancelar?')).toHaveAttribute('data-state', 'closed');
    expect(panelOf('Cancelar?')).toHaveAttribute('hidden');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(panelOf('Cancelar?')).toHaveAttribute('data-state', 'open');
    expect(panelOf('Cancelar?')).not.toHaveAttribute('hidden');
    expect(panelOf('Cancelar?')).toHaveAttribute('role', 'region');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panelOf('Cancelar?')).toHaveAttribute('hidden');
  });

  it('fechar mantém o painel visível em data-state=closed até a transição acabar', async () => {
    let finish!: () => void;
    const finished = new Promise<void>((r) => (finish = r));
    const anim = {
      playState: 'running',
      pending: false,
      effect: { getComputedTiming: () => ({ endTime: 220 }) },
      finished,
    };
    Element.prototype.getAnimations = vi.fn(() => [anim]) as unknown as Element['getAnimations'];
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen="q1" />);
    const trigger = screen.getByText('Como funciona?').closest('button')!;

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panelOf('Como funciona?')).toHaveAttribute('data-state', 'closed');
    expect(panelOf('Como funciona?')).not.toHaveAttribute('hidden');

    await act(async () => {
      finish();
      await finished;
    });
    expect(panelOf('Como funciona?')).toHaveAttribute('hidden');
  });

  it('reabrir no meio do fechamento volta a open sem esconder', async () => {
    const anim = {
      playState: 'running',
      pending: false,
      effect: { getComputedTiming: () => ({ endTime: 220 }) },
      finished: new Promise<void>(() => {}),
    };
    Element.prototype.getAnimations = vi.fn(() => [anim]) as unknown as Element['getAnimations'];
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen="q1" />);
    const trigger = screen.getByText('Como funciona?').closest('button')!;
    await user.click(trigger);
    await user.click(trigger);
    expect(panelOf('Como funciona?')).toHaveAttribute('data-state', 'open');
    expect(panelOf('Como funciona?')).not.toHaveAttribute('hidden');
  });

  it('painel aberto no 1º render não anima no carregamento (data-ready só depois de montar)', () => {
    const { container } = render(<Accordion items={items} defaultOpen="q1" />);
    // efeito já rodou: daqui pra frente, abrir anima (@starting-style escopado em data-ready)
    expect(container.querySelector('.via-accordion')).toHaveAttribute('data-ready');
  });
});
