import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TagInput } from './TagInput';

/* Regressões da auditoria de componentes */

describe('<TagInput /> · rótulo', () => {
  it('label visível nomeia o campo e o hint o descreve', () => {
    render(<TagInput label="Skills" hint="Até 5" />);
    expect(screen.getByRole('textbox', { name: 'Skills' })).toHaveAccessibleDescription('Até 5');
  });
});
