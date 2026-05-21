import { useState } from 'react';
import { Alert } from './Alert';

export default { title: 'Alert' };

export const Tones = () => (
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Alert tone="info" title="Janela de manutenção · sex 22h">
      Pausa programada de até 8 minutos · sem perda de dados.
    </Alert>
    <Alert tone="attn" title="Cobrança próxima · 18 mai" action={<a href="#">Ver detalhes</a>}>
      Sua próxima fatura será de <strong>R$ 6.000</strong>. Reduza pra plano lite em 1 clique.
    </Alert>
    <Alert tone="danger" title="Falha de sincronização · 4 mensagens">
      Tente novamente em alguns segundos. Se persistir, fale com o time.
    </Alert>
    <Alert tone="success" title="Entrega salva">
      Sua nota foi registrada e está aguardando avaliação do mentor.
    </Alert>
  </div>
);

export const Dismissible = () => {
  const [open, setOpen] = useState(true);
  if (!open) return <p style={{ padding: 24, fontSize: 13 }}>Fechado.</p>;
  return (
    <div style={{ padding: 24 }}>
      <Alert
        tone="info"
        title="Atualização disponível"
        onDismiss={() => setOpen(false)}
      >
        Versão 0.3 inclui DataTable, DatePicker, Command e Slider.
      </Alert>
    </div>
  );
};

export const Compact = () => (
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <Alert tone="attn" size="compact">
      Sessão ao vivo termina em <strong>4 min</strong>.
    </Alert>
    <Alert tone="success" size="compact">Conexão restabelecida.</Alert>
  </div>
);
