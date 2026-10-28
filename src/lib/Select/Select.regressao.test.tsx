import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Select } from './Select';

/* Regressões da auditoria · padrão select-only combobox + camada de overlay */

beforeAll(() => {
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
});

async function axeIds(root: Element = document.body) {
  const res = await axe.run(root, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return res.violations.map((v) => v.id);
}

const opts = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
];

describe('<Select /> · regressões', () => {
  it('trigger é role=combobox com nome = rótulo + valor atual', () => {
    render(<Select options={opts} label="Plano" defaultValue="pro" />);
    expect(screen.getByRole('combobox', { name: 'Plano Pro' })).toHaveTextContent('Pro');
  });

  it('erro chega no trigger: aria-invalid + aria-describedby apontando a mensagem', () => {
    render(<Select options={opts} label="Plano" error="Obrigatório" />);
    const t = screen.getByRole('combobox', { name: /^Plano/ });
    expect(t).toHaveAttribute('aria-invalid', 'true');
    expect(t).toHaveAccessibleDescription('Obrigatório');
  });

  it('lista aberta passa no axe (activedescendant no combobox, listbox com nome)', async () => {
    const user = userEvent.setup();
    render(<Select options={opts} label="Plano" />);
    await user.click(screen.getByRole('combobox', { name: /^Plano/ }));
    expect(screen.getByRole('listbox', { name: 'Plano' })).toBeInTheDocument();
    expect(await axeIds()).toEqual([]);
  });

  it('Tab pra outro campo fecha a lista e o ESC depois não puxa o foco de volta', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Select options={opts} label="Plano" />
        <input aria-label="próximo" />
      </>,
    );
    await user.click(screen.getByRole('combobox', { name: /^Plano/ }));
    await user.tab();
    expect(screen.getByLabelText('próximo')).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByLabelText('próximo')).toHaveFocus();
  });

  it('clicar numa opção não tira o foco do combobox', async () => {
    const user = userEvent.setup();
    render(<Select options={opts} label="Plano" />);
    const t = screen.getByRole('combobox', { name: /^Plano/ });
    await user.click(t);
    await user.click(screen.getByRole('option', { name: 'Pro' }));
    expect(t).toHaveFocus();
    expect(t).toHaveAccessibleName('Plano Pro');
  });
});
