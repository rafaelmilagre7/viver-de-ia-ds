import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HoverCard } from './HoverCard';

describe('<HoverCard />', () => {
  it('renders the trigger but keeps the card hidden by default', () => {
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    expect(screen.getByRole('link', { name: '@caioribeiro' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Caio Ribeiro')).not.toBeInTheDocument();
  });

  it('opens the card on mouse enter after the open delay', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={0}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    await user.hover(screen.getByRole('link', { name: '@caioribeiro' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Caio Ribeiro')).toBeInTheDocument();
  });

  it('closes the card on mouse leave after the close delay', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={0} closeDelay={0}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    const link = screen.getByRole('link', { name: '@caioribeiro' });
    await user.hover(link);
    await screen.findByRole('dialog');

    await user.unhover(link);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('opens on focus and closes on blur (keyboard accessibility)', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={0} closeDelay={0}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    // Tab moves focus onto the trigger link → fires onFocus
    await user.tab();
    expect(screen.getByRole('link', { name: '@caioribeiro' })).toHaveFocus();
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    // Tab away → fires onBlur → card closes
    await user.tab();
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('stays open while the pointer moves from the trigger onto the card', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={0} closeDelay={50}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    const link = screen.getByRole('link', { name: '@caioribeiro' });
    await user.hover(link);
    const card = await screen.findByRole('dialog');

    // Leaving the trigger schedules a close, but entering the card cancels it.
    await user.unhover(link);
    await user.hover(card);

    // Give the (cancelled) close timer time to have fired if it were going to.
    await new Promise((r) => setTimeout(r, 120));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('exposes role="dialog" on the floating card', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={0}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    await user.hover(screen.getByRole('link', { name: '@caioribeiro' }));
    const card = await screen.findByRole('dialog');
    expect(card).toHaveClass('via-hovercard');
  });

  it('applies side and align modifier classes', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} side="top" align="end" openDelay={0}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    await user.hover(screen.getByRole('link', { name: '@caioribeiro' }));
    const card = await screen.findByRole('dialog');
    expect(card).toHaveClass('via-hovercard--top');
    expect(card).toHaveClass('via-hovercard--align-end');
  });

  it('defaults to bottom/center modifier classes', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={0}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    await user.hover(screen.getByRole('link', { name: '@caioribeiro' }));
    const card = await screen.findByRole('dialog');
    expect(card).toHaveClass('via-hovercard--bottom');
    expect(card).toHaveClass('via-hovercard--align-center');
  });

  it('renders rich content (children) inside the card body', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={0}>
        <strong>Caio Ribeiro</strong>
        <em>Fundador · Viver de IA</em>
        <p>220 mentorados desde 2024</p>
      </HoverCard>,
    );
    await user.hover(screen.getByRole('link', { name: '@caioribeiro' }));
    await screen.findByRole('dialog');
    expect(screen.getByText('Caio Ribeiro')).toBeInTheDocument();
    expect(screen.getByText('Fundador · Viver de IA')).toBeInTheDocument();
    expect(screen.getByText('220 mentorados desde 2024')).toBeInTheDocument();
  });

  it('does not open before the open delay elapses', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard trigger={<a href="#caio">@caioribeiro</a>} openDelay={150}>
        <strong>Caio Ribeiro</strong>
      </HoverCard>,
    );
    await user.hover(screen.getByRole('link', { name: '@caioribeiro' }));
    // Immediately after hover, the open timer is pending → still closed.
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    // After the delay it appears.
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });
});
