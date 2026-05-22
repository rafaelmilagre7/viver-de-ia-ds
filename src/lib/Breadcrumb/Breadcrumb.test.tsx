import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from './Breadcrumb';

describe('<Breadcrumb />', () => {
  it('renders all items', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Plataforma', href: '/' },
          { label: 'Mentorias', href: '/mentorias' },
          { label: 'Sessão 12' },
        ]}
      />,
    );
    expect(screen.getByText('Plataforma')).toBeInTheDocument();
    expect(screen.getByText('Mentorias')).toBeInTheDocument();
    expect(screen.getByText('Sessão 12')).toBeInTheDocument();
  });

  it('renders nav with aria-label', () => {
    render(<Breadcrumb ariaLabel="Hierarquia" items={[{ label: 'A' }]} />);
    expect(screen.getByRole('navigation', { name: 'Hierarquia' })).toBeInTheDocument();
  });

  it('marks last item as aria-current=page', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'A', href: '/a' },
          { label: 'B', href: '/b' },
          { label: 'C' },
        ]}
      />,
    );
    const last = screen.getByText('C');
    expect(last.closest('[aria-current]')).toHaveAttribute('aria-current', 'page');
  });

  it('renders href as link when provided', () => {
    render(<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'X' }]} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('calls onClick when provided instead of href', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Breadcrumb items={[{ label: 'Voltar', onClick }, { label: 'Atual' }]} />,
    );
    await user.click(screen.getByText('Voltar'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
