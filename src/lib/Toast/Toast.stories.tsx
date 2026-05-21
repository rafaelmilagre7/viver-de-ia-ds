import { ToastStack, useToasts } from './Toast';
import { Button } from '../Button/Button';

export default {
  title: 'Toast',
};

export const Triggers = () => {
  const { toasts, push, dismiss } = useToasts();

  return (
    <>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          onClick={() =>
            push({
              variant: 'success',
              title: 'Mentoria confirmada',
              message: 'Quinta 22 · 14h00 BRT.',
            })
          }
        >
          Disparar success
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            push({
              variant: 'warning',
              title: 'API key expira em 8 dias',
              action: { label: 'Rotacionar', onClick: () => {} },
            })
          }
        >
          Disparar warning
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            push({
              variant: 'destructive',
              title: 'Falha ao processar pagamento',
              message: 'Cartão recusado. Tente outro método.',
              duration: 0,
            })
          }
        >
          Disparar erro (sticky)
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            push({
              title: 'Backup concluído',
              message: '42 arquivos · 2.4 GB · arquivados.',
            })
          }
        >
          Disparar default
        </Button>
      </div>

      <ToastStack toasts={toasts} onDismiss={dismiss} position="top-right" />
    </>
  );
};
