import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Command, type CommandGroup } from './Command';

const groups: CommandGroup[] = [
  {
    heading: 'Navegação',
    items: [
      { id: '/aluno', label: 'Aluno · jornada', keywords: 'estudante' },
      { id: '/mentor', label: 'Mentor · painel' },
    ],
  },
  {
    heading: 'Ações',
    items: [
      { id: 'new-note', label: 'Nova nota', shortcut: 'N' },
      { id: 'logout', label: 'Sair', hint: 'encerra a sessão' },
    ],
  },
];

describe('<Command />', () => {
  it('does not render when closed', () => {
    render(<Command open={false} onClose={() => {}} onSelect={() => {}} groups={groups} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog, search input and all items when open', () => {
    render(<Command open onClose={() => {}} onSelect={() => {}} groups={groups} />);
    expect(screen.getByRole('dialog', { name: 'Paleta de comandos' })).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Buscar' })).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(screen.getByText('Navegação')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('highlights the first item by default (aria-selected + aria-activedescendant)', () => {
    render(<Command open onClose={() => {}} onSelect={() => {}} groups={groups} />);
    const first = screen.getByRole('option', { name: /Aluno · jornada/ });
    expect(first).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('textbox', { name: 'Buscar' })).toHaveAttribute(
      'aria-activedescendant',
      'via-cmd-item-/aluno',
    );
  });

  it('filters items live by label and keywords', async () => {
    const user = userEvent.setup();
    render(<Command open onClose={() => {}} onSelect={() => {}} groups={groups} />);
    const input = screen.getByRole('textbox', { name: 'Buscar' });

    await user.type(input, 'mentor');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: /Mentor · painel/ })).toBeInTheDocument();

    // keyword-only match: label has no "estudante" but keywords does
    await user.clear(input);
    await user.type(input, 'estudante');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: /Aluno · jornada/ })).toBeInTheDocument();
  });

  // Antes era um crash: o clamp em render-phase entrava em loop infinito com a lista
  // vazia (flat.length === 0 → setHighlight(0) a cada render → "Too many re-renders").
  // A guarda `flat.length > 0` no componente corrigiu — o emptyLabel agora aparece.
  it('shows the empty caption when filtering yields no matches', async () => {
    const user = userEvent.setup();
    render(
      <Command open onClose={() => {}} onSelect={() => {}} groups={groups} emptyLabel="Nada por aqui." />,
    );
    await user.type(screen.getByRole('textbox', { name: 'Buscar' }), 'zzzzz');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText('Nada por aqui.')).toBeInTheDocument();
  });

  it('renders the empty caption when opened with an empty item list', () => {
    render(<Command open onClose={() => {}} onSelect={() => {}} items={[]} emptyLabel="Nada por aqui." />);
    expect(screen.getByText('Nada por aqui.')).toBeInTheDocument();
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('ArrowDown / ArrowUp move the highlight and clamp at the ends', async () => {
    const user = userEvent.setup();
    render(<Command open onClose={() => {}} onSelect={() => {}} groups={groups} />);
    const input = screen.getByRole('textbox', { name: 'Buscar' });
    input.focus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: /Mentor · painel/ })).toHaveAttribute('aria-selected', 'true');

    // ArrowUp past the top clamps to the first item
    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(screen.getByRole('option', { name: /Aluno · jornada/ })).toHaveAttribute('aria-selected', 'true');
  });

  it('Enter selects the highlighted item and then closes', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Command open onClose={onClose} onSelect={onSelect} groups={groups} />);
    const input = screen.getByRole('textbox', { name: 'Buscar' });
    input.focus();

    await user.keyboard('{ArrowDown}{Enter}');
    expect(onSelect).toHaveBeenCalledWith('/mentor');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('clicking an item selects it and closes', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Command open onClose={onClose} onSelect={onSelect} groups={groups} />);
    await user.click(screen.getByRole('option', { name: /Nova nota/ }));
    expect(onSelect).toHaveBeenCalledWith('new-note');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('hovering an item moves the highlight to it', async () => {
    const user = userEvent.setup();
    render(<Command open onClose={() => {}} onSelect={() => {}} groups={groups} />);
    const sair = screen.getByRole('option', { name: /Sair/ });
    await user.hover(sair);
    expect(sair).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: /Aluno · jornada/ })).toHaveAttribute('aria-selected', 'false');
  });

  it('ESC closes the palette and the close button calls onClose', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Command open onClose={onClose} onSelect={() => {}} groups={groups} />);

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /fechar/i }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('clicking the scrim calls onClose', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Command open onClose={onClose} onSelect={() => {}} groups={groups} />,
    );
    const scrim = container.querySelector('.via-cmd-scrim') as HTMLElement;
    expect(scrim).toBeInTheDocument();
    await user.click(scrim);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('treats flat items prop as a single unlabeled group', () => {
    render(
      <Command
        open
        onClose={() => {}}
        onSelect={() => {}}
        items={[
          { id: 'a', label: 'Comando A' },
          { id: 'b', label: 'Comando B' },
        ]}
      />,
    );
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.getByRole('option', { name: 'Comando A' })).toBeInTheDocument();
  });

  it('locks body scroll while open and restores it on close', () => {
    const { rerender } = render(
      <Command open onClose={() => {}} onSelect={() => {}} groups={groups} />,
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<Command open={false} onClose={() => {}} onSelect={() => {}} groups={groups} />);
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('resets the query and highlight each time it reopens', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Command open onClose={() => {}} onSelect={() => {}} groups={groups} />,
    );
    const input = screen.getByRole('textbox', { name: 'Buscar' }) as HTMLInputElement;
    await user.type(input, 'mentor');
    await user.keyboard('{ArrowDown}');
    expect(input.value).toBe('mentor');

    rerender(<Command open={false} onClose={() => {}} onSelect={() => {}} groups={groups} />);
    rerender(<Command open onClose={() => {}} onSelect={() => {}} groups={groups} />);

    expect((screen.getByRole('textbox', { name: 'Buscar' }) as HTMLInputElement).value).toBe('');
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(screen.getByRole('option', { name: /Aluno · jornada/ })).toHaveAttribute('aria-selected', 'true');
  });
});
