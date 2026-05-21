import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'Modal',
};

export const Default = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Abrir modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="md"
        title="Renovar plano Mentoria"
        description="Sua próxima cobrança seria 17 jun · R$ 6.000"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Confirmar renovação
            </Button>
          </>
        }
      >
        <p>
          Você está prestes a renovar o plano <strong>Mentoria · 1 trimestre</strong>. As
          próximas 3 cobranças serão de <strong>R$ 6.000</strong>, na mesma forma de pagamento
          que está hoje (cartão final 6411).
        </p>
        <p>Pode cancelar a qualquer momento · faturamento pro-rata.</p>
      </Modal>
    </>
  );
};

export const Sizes = () => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);
  return (
    <>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button onClick={() => setSize('sm')}>Small</Button>
        <Button onClick={() => setSize('md')}>Medium</Button>
        <Button onClick={() => setSize('lg')}>Large</Button>
      </div>
      <Modal
        open={size !== null}
        onClose={() => setSize(null)}
        size={size ?? 'md'}
        title={`Modal size: ${size}`}
        description="ESC fecha · clicar no scrim fecha · focus trap ativo."
        footer={
          <Button variant="primary" onClick={() => setSize(null)}>
            OK
          </Button>
        }
      >
        <p>Conteúdo de exemplo pra demonstrar o tamanho do modal.</p>
      </Modal>
    </>
  );
};
