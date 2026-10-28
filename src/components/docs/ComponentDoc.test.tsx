import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ComponentDoc, { type ComponentMeta } from './ComponentDoc';

const meta: ComponentMeta = {
  component: 'Demo',
  propsType: 'DemoProps',
  source: 'src/lib/Demo/Demo.tsx',
  extends: ['HTMLAttributes<HTMLSpanElement>'],
  props: [
    { name: 'size', type: "'sm' | 'md'", required: false, default: "'md'", control: { kind: 'enum', options: ['sm', 'md'] } },
    { name: 'loading', type: 'boolean', required: false, description: 'JSDoc do loading', control: { kind: 'boolean' } },
  ],
  inherited: { children: 'ReactNode', disabled: 'boolean' },
};

function renderDoc() {
  return render(
    <ComponentDoc
      eyebrow="api · demo"
      name="Demo"
      headline="teste"
      description="teste"
      importLine="import { Demo } from 'x';"
      meta={meta}
      descriptions={{ size: 'Tamanho', children: 'Rótulo', fantasma: 'não existe', '...rest': 'Atributos nativos' }}
      playground={{ initial: { children: 'Oi' }, render: (v) => <span data-testid="out">{JSON.stringify(v)}</span> }}
      examples={[]}
    />,
  );
}

afterEach(() => {
  Reflect.deleteProperty(navigator, 'clipboard');
});

describe('<ComponentDoc /> · tabela gerada', () => {
  it('mostra props do código, herdadas descritas e ...rest; ignora descrição sem prop', () => {
    renderDoc();
    const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1) as HTMLTableRowElement[];
    expect(rows.map((r) => r.cells[0].textContent)).toEqual(['size', 'loading', 'childrennativa', '...restnativa']);
    expect(rows[0]).toHaveTextContent("'md'");
    expect(rows[0]).toHaveTextContent('Tamanho');
    expect(rows[1]).toHaveTextContent('JSDoc do loading');
    expect(rows[3]).toHaveTextContent('HTMLAttributes<HTMLSpanElement>');
    expect(screen.queryByText('não existe')).not.toBeInTheDocument();
  });
});

describe('<ComponentDoc /> · playground', () => {
  it('controles nascem das props e o snippet acompanha', () => {
    renderDoc();
    const snippet = () => screen.getAllByText((_, el) => el?.classList.contains('vds-code') ?? false).at(-1)!;
    expect(screen.getByLabelText('size')).toHaveValue('md');
    expect(snippet()).toHaveTextContent('<Demo>Oi</Demo>');

    fireEvent.change(screen.getByLabelText('size'), { target: { value: 'sm' } });
    fireEvent.click(screen.getByLabelText('loading'));
    fireEvent.change(screen.getByLabelText('children'), { target: { value: 'Olá' } });
    expect(snippet()).toHaveTextContent('<Demo size="sm" loading>Olá</Demo>');
    expect(screen.getByTestId('out')).toHaveTextContent('"size":"sm"');

    fireEvent.click(screen.getByRole('button', { name: 'Restaurar' }));
    expect(snippet()).toHaveTextContent('<Demo>Oi</Demo>');
  });
});

describe('<CodeBlock /> · Copiar', () => {
  it('copia e anuncia "Copiado"', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    renderDoc();
    fireEvent.click(screen.getAllByRole('button', { name: 'Copiar código' })[0]);
    expect(await screen.findByRole('button', { name: 'Copiado' })).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith("import { Demo } from 'x';");
    expect(screen.getAllByRole('status').some((s) => s.textContent === 'Copiado')).toBe(true);
  });

  it('sem permissão, avisa e deixa o código selecionado', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('negado'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    renderDoc();
    fireEvent.click(screen.getAllByRole('button', { name: 'Copiar código' })[0]);
    expect(await screen.findByRole('button', { name: 'Selecionado' })).toBeInTheDocument();
    expect(window.getSelection()?.toString()).toBe("import { Demo } from 'x';");
  });
});
