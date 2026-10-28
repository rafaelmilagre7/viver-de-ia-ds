import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { TreeView } from './TreeView';

/* Regressões da auditoria de componentes */

async function axeIds(root: Element) {
  const res = await axe.run(root, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return res.violations.map((v) => v.id);
}

describe('<TreeView /> · foco no treeitem', () => {
  it('a parada de Tab é o li[role=treeitem] e o axe passa', async () => {
    const { container } = render(
      <TreeView
        nodes={[{ id: 'a', label: 'Curso A', children: [{ id: 'a1', label: 'Aula 1' }] }]}
        defaultExpanded={['a']}
      />,
    );
    const focusable = container.querySelector('[tabindex="0"]')!;
    expect(focusable).toHaveAttribute('role', 'treeitem');
    expect(container.querySelector('button')).toBeNull();
    expect(await axeIds(container)).toEqual([]);
  });

  it('clicar na linha foca o treeitem e seta navega', async () => {
    const user = userEvent.setup();
    render(
      <TreeView
        nodes={[{ id: 'a', label: 'Curso A', children: [{ id: 'a1', label: 'Aula 1' }] }]}
        defaultExpanded={['a']}
      />,
    );
    const items = screen.getAllByRole('treeitem');
    await user.click(screen.getByText('Aula 1'));
    expect(items[1]).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(items[0]).toHaveFocus();
  });
});
