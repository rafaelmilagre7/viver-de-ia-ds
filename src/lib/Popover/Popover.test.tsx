import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

/**
 * Controlled wrapper so interactions (trigger click toggles `open`,
 * outside click / ESC closes) drive real state, matching how the
 * component is meant to be used.
 */
function Harness({
  label = 'Filtros',
  side,
  align,
  closeOnOutsideClick,
  closeOnEscape,
  onOpenChange,
}: {
  label?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  onOpenChange?: (o: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button data-testid="outside">fora</button>
      <Popover
        open={open}
        onOpenChange={(o) => {
          onOpenChange?.(o);
          setOpen(o);
        }}
        trigger={<button onClick={() => setOpen((o) => !o)}>Abrir</button>}
        label={label}
        side={side}
        align={align}
        closeOnOutsideClick={closeOnOutsideClick}
        closeOnEscape={closeOnEscape}
      >
        <h4>Filtrar por</h4>
        <p>conteudo-popover</p>
      </Popover>
    </div>
  );
}

describe('<Popover />', () => {
  it('does not render the panel when closed (default state)', () => {
    render(<Harness />);
    expect(screen.getByRole('button', { name: 'Abrir' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('conteudo-popover')).not.toBeInTheDocument();
  });

  it('renders the panel as a dialog with the children when open', () => {
    render(
      <Popover
        open
        onOpenChange={() => {}}
        trigger={<button>Abrir</button>}
        label="Filtros"
      >
        <p>conteudo-popover</p>
      </Popover>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('conteudo-popover')).toBeVisible();
  });

  it('exposes the accessible label on the dialog region', () => {
    render(
      <Popover open onOpenChange={() => {}} trigger={<button>Abrir</button>} label="Filtros">
        <p>x</p>
      </Popover>,
    );
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeInTheDocument();
  });

  it('clicking the trigger opens the popover', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('conteudo-popover')).toBeVisible();
  });

  it('pressing Escape closes the popover (and fires onOpenChange(false))', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clicking outside the popover closes it', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clicking inside the popover keeps it open', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    await user.click(screen.getByText('conteudo-popover'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not close on Escape when closeOnEscape is false', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness closeOnEscape={false} onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    onOpenChange.mockClear();

    await user.keyboard('{Escape}');
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not close on outside click when closeOnOutsideClick is false', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness closeOnOutsideClick={false} onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    onOpenChange.mockClear();

    await user.click(screen.getByTestId('outside'));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('reflects side + align as data attributes on the wrapper and classes on the panel', () => {
    const { container } = render(
      <Popover
        open
        onOpenChange={() => {}}
        trigger={<button>Abrir</button>}
        label="Filtros"
        side="right"
        align="end"
      >
        <p>x</p>
      </Popover>,
    );
    const wrap = container.querySelector('.via-popover-wrap');
    expect(wrap).toHaveAttribute('data-side', 'right');
    expect(wrap).toHaveAttribute('data-align', 'end');

    const panel = screen.getByRole('dialog');
    expect(panel).toHaveClass('via-popover--right');
    expect(panel).toHaveClass('via-popover--align-end');
  });

  it('defaults side=bottom / align=center on the panel and wrapper', () => {
    const { container } = render(
      <Popover open onOpenChange={() => {}} trigger={<button>Abrir</button>} label="Filtros">
        <p>x</p>
      </Popover>,
    );
    expect(container.querySelector('.via-popover-wrap')).toHaveAttribute('data-side', 'bottom');
    expect(container.querySelector('.via-popover-wrap')).toHaveAttribute('data-align', 'center');
    const panel = screen.getByRole('dialog');
    expect(panel).toHaveClass('via-popover--bottom');
    expect(panel).toHaveClass('via-popover--align-center');
  });

  it('toggling open back to false unmounts the panel', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // trigger toggles open=false
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('wires aria-haspopup="dialog" and aria-expanded onto the trigger control', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const trigger = screen.getByRole('button', { name: 'Abrir' });
    // closed: announces it controls a dialog and is collapsed
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    // open: expanded flips to true
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('points the trigger aria-controls at the dialog panel id', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const trigger = screen.getByRole('button', { name: 'Abrir' });
    const controls = trigger.getAttribute('aria-controls');
    expect(controls).toBeTruthy();

    await user.click(trigger);
    const panel = screen.getByRole('dialog');
    // the id the trigger advertises is the actual panel rendered when open
    expect(panel).toHaveAttribute('id', controls!);
  });

  it('returns focus to the trigger when closed via Escape', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const trigger = screen.getByRole('button', { name: 'Abrir' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
