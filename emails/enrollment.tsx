import * as React from 'react';
import { Layout } from './components/Layout';
import { Eyebrow, H1, Lede, Para, Strong, Callout, InfoRow, CTA, SubLink } from './components/ui';

export const meta = {
  id: 'enrollment',
  name: 'Confirmação de turma',
  subject: 'confirmado · sua turma começa 12 de junho',
  when: 'Recibo de matrícula com os detalhes concretos da turma.',
};

export interface EnrollmentEmailProps {
  firstName: string;
  turma: string;
  startDate: string;
  format: string;
  cadence: string;
  access: string;
  calendarUrl: string;
  platformUrl: string;
}

export default function EnrollmentEmail({
  firstName,
  turma,
  startDate,
  format,
  cadence,
  access,
  calendarUrl,
  platformUrl,
}: EnrollmentEmailProps) {
  return (
    <Layout
      preview={`Matrícula confirmada na turma ${turma}. Começa ${startDate}.`}
      reason="Você recebeu este email porque sua matrícula foi confirmada."
    >
      <Eyebrow>Matrícula confirmada</Eyebrow>
      <H1>Tá tudo certo, {firstName}.</H1>
      <Lede>
        Sua vaga na <Strong>{turma}</Strong> está garantida. Guardei aqui os detalhes — é só
        chegar.
      </Lede>

      <Callout>
        <InfoRow label="Turma" value={turma} />
        <InfoRow label="Início" value={startDate} strong />
        <InfoRow label="Formato" value={format} />
        <InfoRow label="Encontros" value={cadence} />
        <InfoRow label="Acesso" value={access} last />
      </Callout>

      <CTA href={calendarUrl}>Adicionar à agenda</CTA>
      <SubLink href={platformUrl}>ou abrir a plataforma agora →</SubLink>

      <Para style={{ margin: '22px 0 0', fontSize: '14px', color: '#667085' }}>
        Qualquer coisa antes de começar, é só responder este email — chega direto na gente.
      </Para>
    </Layout>
  );
}

EnrollmentEmail.PreviewProps = {
  firstName: 'Marina',
  turma: 'Operadores · T08',
  startDate: '12 de junho, 19h',
  format: 'Online · ao vivo + gravado',
  cadence: 'Terças e quintas · 90 min',
  access: 'app.viverdeia.ai + grupo no WhatsApp',
  calendarUrl: 'https://app.viverdeia.ai/agenda',
  platformUrl: 'https://app.viverdeia.ai',
} satisfies EnrollmentEmailProps;

export { EnrollmentEmail };
