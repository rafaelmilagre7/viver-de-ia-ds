import { Alert, type AlertProps } from '../../lib/Alert/Alert';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Alert as meta } from './props.generated.json';

export default function ApiAlert() {
  return (
    <ComponentDoc
      eyebrow="api · alert"
      name="Alert"
      headline="o aviso que fica até ser resolvido."
      description="Banner inline persistente · liquid glass + atmosphere. Alert inline pra avisos persistentes (não-bloqueantes). 4 tones: info · attn · danger · success. Dismissible opcional · ação inline (botão). Liquid glass forte + atmosphere radial + shadow stack."
      importLine={`import { Alert, type AlertProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-alert', description: 'Container · gradient white 96→82 + blur + atmosphere' },
        { part: 'via-alert__icon', description: 'Ícone à esquerda · tom semantic (info/attn/danger/success)' },
        { part: 'via-alert__body', description: 'Title + description vertical stack' },
        { part: 'via-alert__action', description: 'Botão action opcional (Reverter, Ver detalhes)' },
        { part: 'via-alert__close', description: 'X dismissible opcional · hover rotate' },
      ]}
      meta={meta}
      playground={{
        initial: { title: 'Pagamento confirmado', children: 'Sua assinatura renova em 12/nov.' },
        render: (v) => (
          <div style={{ width: '100%' }}>
            <Alert {...(v as AlertProps)} />
          </div>
        ),
      }}
      descriptions={{
        tone: 'Cor + ícone semântico',
        title: 'Bold lead line · primeira linha do alerta',
        children: 'Corpo do alert · explicação detalhada',
        icon: 'Ícone custom · sobrescreve o default do tone',
        action: 'Action inline no canto direito (link, botão)',
        onDismiss: 'Se passar, mostra X · usuário pode fechar',
        size: 'compact=inline / banner=full-bleed',
      }}
      variants={[
        { name: 'info', label: 'Informação', description: 'Aviso neutro · atualização, novidade' },
        { name: 'attn', label: 'Atenção', description: 'Algo precisa de revisão · não-bloqueante' },
        { name: 'danger', label: 'Crítico', description: 'Problema real · pagamento falhou, conta suspensa' },
        { name: 'success', label: 'Confirmação persistente', description: 'Estado positivo prolongado · "Plano ativo"' },
      ]}
      examples={[
        {
          title: '4 tones lado-a-lado',
          preview: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <Alert tone="info" title="Nova versão disponível">Atualize quando puder · sem perda de dados.</Alert>
              <Alert tone="attn" title="Sessão expira em 5 min">Salve seu progresso antes de continuar.</Alert>
              <Alert tone="danger" title="Pagamento falhou">Atualize seu cartão pra evitar suspensão.</Alert>
              <Alert tone="success" title="Conta verificada">Acesso completo liberado · todos recursos disponíveis.</Alert>
            </div>
          ),
          code: `<Alert tone="info" title="Nova versão">Atualize quando puder.</Alert>
<Alert tone="attn" title="Sessão expira">Salve antes de continuar.</Alert>
<Alert tone="danger" title="Pagamento falhou">Atualize seu cartão.</Alert>
<Alert tone="success" title="Conta verificada">Acesso liberado.</Alert>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use Alert pra info persistente', description: 'Não some sozinho · usuário lê quando quiser.' },
          dont: { title: 'Não use pra confirmação de ação', description: 'Use Toast · efêmero é melhor pra ação completa.' },
        },
      ]}
      a11y={[
        <>role=alert + aria-live=assertive em danger, polite em info/attn/success</>,
        <>Dismissible com aria-label="Fechar" · keyboard accessible</>,
        <>Ícone marcado como aria-hidden · texto duplica a informação</>,
      ]}
      related={[
        { name: 'Toast', description: 'Notificação efêmera · some sozinho', href: '/api/toast' },
        { name: 'Banner', description: 'Aviso global no topo (sticky)', href: '/components/more' },
      ]}
    />
  );
}
