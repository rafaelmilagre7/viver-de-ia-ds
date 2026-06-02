import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, Callout, InfoRow, CTA } from './components/ui';
import { color, fontStack } from './theme';
import { Text } from '@react-email/components';

export const meta = {
  id: 'urgent-ops',
  name: 'Alerta operacional',
  subject: 'ação necessária · webhook 504 desde 14:08',
  when: 'Alerta de sistema/concierge (Nina/Iris/plataforma). Fato, timeline, próximo passo.',
};

export interface UrgentOpsEmailProps {
  firstName: string;
  incident: string;
  since: string;
  impact: string;
  component: string;
  actionUrl: string;
}

export default function UrgentOpsEmail({ firstName, incident, since, impact, component, actionUrl }: UrgentOpsEmailProps) {
  return (
    <Layout
      preview={`${incident} desde ${since}. Um passo resolve.`}
      reason="Você recebeu este alerta porque é responsável técnico nesta conta."
      hero={{ eyebrow: 'Ação necessária', title: <>{incident}.</> }}
    >
      <Lede>
        {firstName}, detectamos isso agora e o impacto é real — sem alarme falso. O resumo do que
        está acontecendo:
      </Lede>

      <Callout tone="coral">
        <InfoRow label="Evento" value={incident} />
        <InfoRow label="Desde" value={since} />
        <InfoRow label="Componente" value={component} />
        <InfoRow label="Impacto" value={impact} strong last />
      </Callout>

      <Para>
        Não precisa investigar do zero — já isolamos a causa provável. O botão abaixo abre direto no
        ponto certo pra você confirmar e religar.
      </Para>

      <CTA href={actionUrl}>Resolver agora</CTA>

      <Text style={{ margin: '20px 0 0', fontFamily: fontStack, fontSize: '13px', lineHeight: '1.6', color: color.muted }}>
        Se já estiver resolvido quando você abrir, o painel mostra “normalizado” — pode ignorar.
      </Text>
    </Layout>
  );
}

UrgentOpsEmail.PreviewProps = {
  firstName: 'Rafael',
  incident: 'Webhook timeout · HTTP 504',
  since: 'hoje 14:08',
  impact: 'Mensagens da Nina em fila (não perdidas)',
  component: 'provider de embeddings',
  actionUrl: 'https://app.viverdeia.ai/status',
} satisfies UrgentOpsEmailProps;

export { UrgentOpsEmail };
