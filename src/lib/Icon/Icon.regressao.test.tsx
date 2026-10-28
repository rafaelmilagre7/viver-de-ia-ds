import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Icon } from './Icon';

/* Regressões da auditoria de componentes */

async function axeIds(root: Element) {
  const res = await axe.run(root, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return res.violations.map((v) => v.id);
}

describe('<Icon /> · nome acessível', () => {
  it('com label vira role=img com nome; sem label é decorativo', async () => {
    const { container } = render(
      <>
        <Icon label="Sucesso">
          <svg />
        </Icon>
        <Icon>
          <svg />
        </Icon>
      </>,
    );
    expect(screen.getByRole('img', { name: 'Sucesso' })).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"].via-icon')).toHaveLength(1);
    expect(await axeIds(container)).toEqual([]);
  });
});
