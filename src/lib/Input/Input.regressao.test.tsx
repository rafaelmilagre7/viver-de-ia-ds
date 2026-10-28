import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Input } from './Input';

/* Regressões da auditoria de componentes */

describe('<Input /> · id estável', () => {
  it('id não muda entre renders', () => {
    const { container, rerender } = render(<Input label="Email" hint="h" />);
    const id1 = container.querySelector('input')!.id;
    rerender(<Input label="Email" hint="h" />);
    expect(container.querySelector('input')!.id).toBe(id1);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('h');
  });

  it('HTML do servidor é determinístico (sem Math.random → sem erro de hidratação)', () => {
    expect(renderToString(<Input label="Email" />)).toBe(renderToString(<Input label="Email" />));
  });
});
