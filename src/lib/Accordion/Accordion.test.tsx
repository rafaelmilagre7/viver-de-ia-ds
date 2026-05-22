import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
