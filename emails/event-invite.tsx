import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, Strong, Callout, InfoRow, CTA, SubLink } from './components/ui';
import { color } from './theme';

export const meta = {
  id: 'event-invite',
  name: 'Convite de evento',
  subject: 'sex 14h · auditoria de 3 agentes ao vivo',
  when: 'Convite pra live / Leaders AI Conference. Factual, sem hype, com o valor concreto.',
};

export interface EventInviteEmailProps {
  firstName: string;
  title: string;
  date: string;
  format: string;
  spots: string;
  rsvpUrl: string;
  agendaUrl: string;
}

export default function EventInviteEmail({ firstName, title, date, format, spots, rsvpUrl, agendaUrl }: EventInviteEmailProps) {
  return (
    <Layout
      preview={`${title} · ${date}. Vaga limitada, sem replay.`}
      reason="Você recebeu este convite porque faz parte da comunidade Viver de IA."
      hero={{ eyebrow: 'Convite · ao vivo', title: <>{title}</> }}
    >
      <Lede>
        {firstName}, sem palestra motivacional. É <Strong>mão na massa</Strong>: a gente abre 3
        agentes reais ao vivo e audita prompt por prompt, na frente de todo mundo.
      </Lede>

      <Callout>
        <InfoRow label="Quando" value={date} strong />
        <InfoRow label="Formato" value={format} />
        <InfoRow label="Vagas" value={spots} last />
      </Callout>

      <Para>
        Você sai com pelo menos <Strong>3 ajustes</Strong> que dá pra aplicar no teu agente no mesmo
        dia. Quem aparece ao vivo pergunta; quem só assiste o replay perde a parte boa.
      </Para>

      <CTA href={rsvpUrl}>Garantir minha vaga</CTA>
      <SubLink href={agendaUrl}>ver a agenda completa →</SubLink>

      <Para style={{ margin: '20px 0 0', fontSize: '14px', color: color.muted }}>
        Confirmou e não vai dar? Responde aqui que eu libero a vaga pra fila de espera.
      </Para>
    </Layout>
  );
}

EventInviteEmail.PreviewProps = {
  firstName: 'Marina',
  title: 'Auditoria de 3 agentes ao vivo',
  date: 'Sexta, 14h (BRT) · 60 min',
  format: 'Online · ao vivo, sem replay',
  spots: '40 vagas · 12 abertas',
  rsvpUrl: 'https://viverdeia.ai/ao-vivo/rsvp',
  agendaUrl: 'https://viverdeia.ai/leaders',
} satisfies EventInviteEmailProps;

export { EventInviteEmail };
