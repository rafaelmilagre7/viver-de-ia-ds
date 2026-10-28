import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('<EmptyState />', () => {
  it('mostra o título como heading dentro de um status', () => {
    render(<EmptyState title="Nenhuma mentoria agendada" />);
    expect(screen.getByRole('status')).toHaveClass('via-empty-state', 'via-empty-state--default');
    expect(screen.getByRole('heading', { name: 'Nenhuma mentoria agendada', level: 3 })).toBeInTheDocument();
  });

  it('sem ícone, descrição e ações não renderiza os blocos opcionais', () => {
    const { container } = render(<EmptyState title="Vazio" />);
    expect(container.querySelector('.via-empty-state__icon')).toBeNull();
    expect(container.querySelector('.via-empty-state__description')).toBeNull();
    expect(container.querySelector('.via-empty-state__actions')).toBeNull();
  });

  it('ícone é decorativo; descrição, ação e secundária aparecem', () => {
    const { container } = render(
      <EmptyState
        icon={<svg data-testid="ic" />}
        title="Vazio"
        description="Sua próxima sessão aparece aqui."
        action={<button>Agendar</button>}
        secondary={<button>Ver agenda</button>}
        variant="soft"
        className="extra"
      />,
    );
    expect(container.querySelector('.via-empty-state__icon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Sua próxima sessão aparece aqui.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Agendar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ver agenda' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('via-empty-state--soft', 'extra');
  });

  it('só a ação secundária também abre a área de ações', () => {
    const { container } = render(<EmptyState title="Vazio" secondary={<a href="#x">ver</a>} />);
    expect(container.querySelector('.via-empty-state__actions')).toContainElement(
      screen.getByRole('link', { name: 'ver' }),
    );
  });
});
