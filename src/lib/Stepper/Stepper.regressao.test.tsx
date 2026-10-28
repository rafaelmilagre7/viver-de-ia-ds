import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

/* Regressões da auditoria de componentes */

describe('<Stepper /> · estado concluído em texto', () => {
  it('passo concluído anuncia "(concluído)"', () => {
    render(<Stepper current={1} steps={[{ id: 'a', label: 'Perfil' }, { id: 'b', label: 'Plano' }]} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Perfil (concluído)');
    expect(items[1]).not.toHaveTextContent('concluído');
  });
});
