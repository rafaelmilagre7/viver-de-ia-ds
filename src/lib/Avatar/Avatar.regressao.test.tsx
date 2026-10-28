import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

/* Regressão da auditoria · imagem quebrada cai pras iniciais */

describe('<Avatar /> · fallback', () => {
  it('erro ao carregar a imagem mostra as iniciais; trocar o src tenta de novo', () => {
    const { container, rerender } = render(<Avatar src="/quebrada.jpg" alt="Caio Ribeiro" />);
    fireEvent.error(container.querySelector('img')!);
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('CR')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Caio Ribeiro' })).toBeInTheDocument();

    rerender(<Avatar src="/nova.jpg" alt="Caio Ribeiro" />);
    expect(container.querySelector('img')).toHaveAttribute('src', '/nova.jpg');
  });
});
