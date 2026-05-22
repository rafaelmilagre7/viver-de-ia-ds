import { useState } from 'react';
import { Button } from '../../lib/Button/Button';
import { Modal } from '../../lib/Modal/Modal';
import ComponentDoc from '../../components/docs/ComponentDoc';

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Abrir modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar pausar conta"
        description="Sua conta fica congelada por 90 dias. Sem cobrança, sem progresso perdido."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Voltar</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirmar pausa</Button>
          </>
        }
      >
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--via-text)' }}>
          Você pode reativar a qualquer momento durante os 90 dias.
          Histórico, notas e progresso são preservados.
        </p>
      </Modal>
    </>
  );
}

export default function ApiModal() {
  return (
    <ComponentDoc
      eyebrow="api · modal"
      name="Modal"
      headline="dialog editorial · scrim radial · spring overshoot"
      description="Dialog modal pra ações focadas (confirmar, formulário curto, escolha). Backdrop radial gradient + blur progressivo · painel animation spring 3-step (0.94 → 1.005 → 1.0 overshoot) · close rotaciona 90° no hover · atmosphere dupla via radials. 3 sizes."
      importLine={`import { Modal, type ModalProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-modal-root', description: 'Portal container · fixed inset 0 · z-index 9990' },
        { part: 'via-modal-scrim', description: 'Backdrop radial navy 42→58% + blur 10px progressivo' },
        { part: 'via-modal', description: 'Painel · glass 98→92% + blur 28 + atmosphere dupla' },
        { part: 'via-modal__head', description: 'Header com h2 + descrição opcional · padding 24×24×14' },
        { part: 'via-modal__close', description: 'Botão X · hover rotate 90° + bg navy-06' },
        { part: 'via-modal__body', description: 'Conteúdo scrollável · padding 6×24×24' },
        { part: 'via-modal__foot', description: 'Footer com ações (botões) · justify-content end · gradient bg' },
      ]}
      props={[
        { name: 'open', type: 'boolean', required: true, description: 'Estado controlado · true = visível' },
        { name: 'onClose', type: '() => void', required: true, description: 'Callback chamado em close (ESC, scrim click, X)' },
        { name: 'title', type: 'ReactNode', description: 'Título do modal · vira <h2> com id pra aria-labelledby' },
        { name: 'description', type: 'ReactNode', description: 'Descrição opcional sob o título' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo do body' },
        { name: 'footer', type: 'ReactNode', description: 'Slot pra ações · geralmente 2 Buttons (ghost + primary)' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Largura máxima · sm=420 / md=560 / lg=760' },
        { name: 'dismissOnScrim', type: 'boolean', default: 'true', description: 'Se false, clicar no scrim NÃO fecha (use pra evitar perda de dados)' },
      ]}
      sizes={[
        { name: 'sm', label: '420px max', description: 'Confirmação curta · 1 ação · sem form' },
        { name: 'md', label: '560px max', description: 'Padrão · form curto, escolha, detalhe' },
        { name: 'lg', label: '760px max', description: 'Form longo · multi-step wizard inline' },
      ]}
      examples={[
        {
          title: 'Confirmação destrutiva',
          description: 'Padrão pra ações que perdem dados ou são irreversíveis · use ghost + primary no foot.',
          preview: <ModalDemo />,
          code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Abrir modal</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirmar pausar conta"
  description="Sua conta fica congelada por 90 dias..."
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Voltar</Button>
      <Button variant="primary" onClick={confirm}>Confirmar pausa</Button>
    </>
  }
>
  <p>Você pode reativar a qualquer momento durante os 90 dias...</p>
</Modal>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use modal pra ação FOCADA', description: 'Confirmação, form curto, escolha crítica.' },
          dont: { title: 'Não empilhe modais · 1 por vez', description: 'Modal sobre modal = confusão · use Drawer pra fluxo secundário.' },
        },
        {
          do: { title: 'Title descritivo + body explicativo', description: '"Confirmar pausar conta" + impacto detalhado.' },
          dont: { title: 'Não use modal pra notificação', description: 'Toast resolve sem interromper · modal exige decisão.' },
        },
      ]}
      a11y={[
        <>Focus trap automático · primeiro focusable recebe focus on open</>,
        <>ESC fecha · aria-modal + aria-labelledby/describedby automáticos</>,
        <>Body scroll lock · evita scroll do conteúdo trás do modal</>,
        <>Click no scrim fecha (configurável via <code>dismissOnScrim={`{false}`}</code>)</>,
        <>Animation respeita prefers-reduced-motion</>,
      ]}
      related={[
        { name: 'Drawer', description: 'Painel lateral · use pra fluxo secundário', href: '/api/drawer' },
        { name: 'Sheet', description: 'Bottom sheet mobile · use pra ações rápidas em mobile', href: '/api/sheet' },
        { name: 'Alert', description: 'Banner inline · use pra avisos não-bloqueantes', href: '/api/alert' },
      ]}
    />
  );
}
