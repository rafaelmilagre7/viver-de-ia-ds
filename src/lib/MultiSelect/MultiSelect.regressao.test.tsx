import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import axe from 'axe-core';
import { MultiSelect } from './MultiSelect';

/* Regressões da auditoria · remover chip fora do botão do combobox */

beforeAll(() => {
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
});

const opts = [
  { value: 'react', label: 'React' },
  { value: 'pro', label: 'Pro' },
];

describe('<MultiSelect /> · regressões', () => {
  it('nenhum botão dentro de botão — nem no DOM, nem no HTML do servidor', async () => {
    const { container } = render(<MultiSelect options={opts} value={['pro']} label="Tags" />);
    expect(container.querySelector('button button')).toBeNull();
    const html = renderToString(<MultiSelect options={opts} value={['pro']} label="Tags" />);
    const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
    expect(doc.querySelector('button button')).toBeNull();
    const res = await axe.run(container, { runOnly: { type: 'rule', values: ['nested-interactive'] } });
    expect(res.violations).toEqual([]);
  });

  it('remover um chip não abre a lista e avisa o novo valor', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={opts} value={['react', 'pro']} onChange={onChange} label="Tags" />);
    await user.click(screen.getByRole('button', { name: 'Remover React' }));
    expect(onChange).toHaveBeenCalledWith(['pro']);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('ESC fecha a lista e devolve o foco ao combobox', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={opts} label="Tags" />);
    const cb = screen.getByRole('combobox', { name: /^Tags/ });
    await user.click(cb);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(cb).toHaveFocus();
  });

  it('erro e hint ligados ao combobox', () => {
    render(<MultiSelect options={opts} label="Tags" hint="Até 3" error />);
    const cb = screen.getByRole('combobox', { name: /^Tags/ });
    expect(cb).toHaveAttribute('aria-invalid', 'true');
    expect(cb).toHaveAccessibleDescription('Até 3');
  });
});
