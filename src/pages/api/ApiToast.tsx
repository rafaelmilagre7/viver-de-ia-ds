import { ToastStack, useToasts } from '../../lib/Toast/Toast';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

function ToastDemo() {
  const { toasts, push, dismiss } = useToasts();
  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Button size="sm" onClick={() => push({ variant: 'default', title: 'Mensagem editorial', message: 'Resumo da semana publicado.' })}>
          Default
        </Button>
        <Button size="sm" variant="secondary" onClick={() => push({ variant: 'success', title: 'Conta pausada', message: 'Sua conta fica congelada até 22/ago.' })}>
          Success
        </Button>
        <Button size="sm" variant="secondary" onClick={() => push({ variant: 'warning', title: 'Inscrição expira', message: 'Faltam 3 dias pro fim do prazo.' })}>
          Warning
        </Button>
        <Button size="sm" variant="destructive" onClick={() => push({ variant: 'destructive', title: 'Falha no pagamento', message: 'Tente novamente em alguns minutos.' })}>
          Destructive
        </Button>
      </div>
      <ToastStack toasts={toasts} onDismiss={dismiss} position="bottom-right" />
    </>
  );
}

export default function ApiToast() {
  return (
    <ComponentDoc
      eyebrow="api · toast"
      name="Toast"
      headline="notificação editorial · spring 3-step · destructive breathing"
      description="Toast com atmosphere radial top-left · shadow 4-stack · animation spring 0.32s (scale 0.96→1.01→1.0 overshoot). 4 variants (default · success · warning · destructive). Destructive tem pulse breathing 3.2s pra chamar atenção. Use hook useToasts() pra controlar."
      importLine={`import { ToastStack, useToasts, type ToastItem } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'ToastStack', description: 'Container fixed · 4 posições · z-index 9999' },
        { part: 'via-toast', description: 'Card grid 28·1fr·auto·auto · glass + atmosphere' },
        { part: 'via-toast__icon', description: 'Tile 28×28 · variants com gradient/cor específica' },
        { part: 'via-toast__body', description: 'Title + body · padding 14×12' },
        { part: 'via-toast__action', description: 'Botão opcional · ação contextual ("Reverter")' },
        { part: 'via-toast__close', description: 'X · hover rotate + bg navy-05' },
      ]}
      props={[
        { name: 'toasts', type: 'ToastItem[]', required: true, description: 'Array de toasts ativos · gerenciado pelo useToasts()' },
        { name: 'onDismiss', type: '(id: string) => void', required: true, description: 'Callback ao fechar · vem do useToasts' },
        { name: 'position', type: "'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'", default: "'top-right'", description: 'Posição do stack na viewport' },
      ]}
      sizes={[
        { name: 'ToastItem.variant', label: "'default' | 'success' | 'warning' | 'destructive'", description: 'Tom semantic do toast' },
        { name: 'ToastItem.title', label: 'string · obrigatório', description: 'Headline curta do toast' },
        { name: 'ToastItem.message', label: 'string · opcional', description: 'Corpo explicativo abaixo do title' },
        { name: 'ToastItem.duration', label: 'number (ms) · default 4500', description: '0 = sticky · não auto-fecha' },
        { name: 'ToastItem.action', label: '{ label, onClick }', description: 'Ação inline opcional · "Reverter", "Ver"' },
      ]}
      variants={[
        { name: 'default', label: 'Mensagem editorial', description: 'Info neutra · "Resumo publicado", "Configuração salva"' },
        { name: 'success', label: 'Ação concluída', description: 'Confirmação · "Conta pausada", "Pagamento processado"' },
        { name: 'warning', label: 'Atenção real', description: 'Aviso real · "Inscrição expira", "Sessão termina em"' },
        { name: 'destructive', label: 'Falha + pulse', description: 'Erro · "Pagamento falhou" · com pulse breathing 3.2s' },
      ]}
      examples={[
        {
          title: '4 variants com botões trigger',
          description: 'Hook useToasts() retorna {toasts, push, dismiss}. ToastStack renderiza fixed na posição escolhida.',
          preview: <ToastDemo />,
          code: `const { toasts, push, dismiss } = useToasts();

<Button onClick={() => push({
  variant: 'success',
  title: 'Conta pausada',
  message: 'Sua conta fica congelada até 22/ago.'
})}>
  Trigger
</Button>

<ToastStack toasts={toasts} onDismiss={dismiss} position="bottom-right" />`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra confirmação não-bloqueante', description: 'Ação completou · usuário não precisa decidir.' },
          dont: { title: 'Não use pra decisão crítica', description: 'Toast some · usuário pode perder · use Modal.' },
        },
        {
          do: { title: 'Title curto + body explicativo', description: '"Conta pausada" + "Fica congelada até 22/ago".' },
          dont: { title: 'Não use só title genérico "Sucesso"', description: 'Sem contexto · usuário não sabe o que aconteceu.' },
        },
      ]}
      a11y={[
        <>ToastStack com role=region · aria-live=polite (default), assertive em destructive</>,
        <>Toast com role=status · screen reader anuncia automaticamente</>,
        <>Close button com aria-label · keyboard accessible</>,
        <>Auto-dismiss respeita prefers-reduced-motion · não some sozinho se solicitado</>,
        <>Pulse breathing em destructive desativa com reduced-motion</>,
      ]}
      related={[
        { name: 'Alert', description: 'Banner inline persistente · não some sozinho', href: '/api/alert' },
        { name: 'Modal', description: 'Pra confirmação bloqueante', href: '/api/modal' },
      ]}
    />
  );
}
