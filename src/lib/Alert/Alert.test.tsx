import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('<Alert />', () => {
  it('renders title and body', () => {
    render(
      <Alert tone="info" title="Atualização">
        Há uma nova versão disponível.
      </Alert>,
    );
    expect(screen.getByText('Atualização')).toBeInTheDocument();
    expect(screen.getByText(/nova versão/)).toBeInTheDocument();
  });

  it('uses role=alert', () => {
    render(<Alert tone="danger" title="Erro">Pagamento falhou.</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows close button when onDismiss is provided', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(
      <Alert tone="attn" title="Atenção" onDismiss={onDismiss}>
        Sessão expira em 5 min.
      </Alert>,
    );
    const closeBtn = screen.getByRole('button', { name: /fechar/i });
    await user.click(closeBtn);
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('hides close button when onDismiss is omitted', () => {
    render(<Alert tone="info" title="Sem close">Persistente.</Alert>);
    expect(screen.queryByRole('button', { name: /fechar/i })).not.toBeInTheDocument();
  });

  it('renders action element', () => {
    render(
      <Alert
        tone="attn"
        title="Plano expira"
        action={<a href="/billing">Renovar</a>}
      >
        Sua assinatura vence em 3 dias.
      </Alert>,
    );
    expect(screen.getByRole('link', { name: 'Renovar' })).toBeInTheDocument();
  });
});
