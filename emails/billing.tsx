import * as React from 'react';
import { Layout } from './components/Layout';
import { Eyebrow, H1, Lede, Para, Strong, Callout, InfoRow, CTA, SubLink } from './components/ui';
import { color } from './theme';

export const meta = {
  id: 'billing',
  name: 'Cobrança / fatura',
  subject: 'sua fatura da Viver de IA · junho',
  when: 'Aviso de fatura. Vira coral quando está em atraso (uso semântico).',
};

export interface BillingEmailProps {
  firstName: string;
  plan: string;
  amount: string;
  dueDate: string;
  invoiceNumber: string;
  overdue: boolean;
  payUrl: string;
  invoiceUrl: string;
}

export default function BillingEmail({
  firstName,
  plan,
  amount,
  dueDate,
  invoiceNumber,
  overdue,
  payUrl,
  invoiceUrl,
}: BillingEmailProps) {
  return (
    <Layout
      preview={
        overdue
          ? `Sua fatura de ${amount} está em atraso. Resolve em 1 clique.`
          : `Sua próxima fatura de ${amount} vence ${dueDate}.`
      }
      reason="Você recebeu este email porque tem uma assinatura ativa na Viver de IA."
    >
      <Eyebrow>{overdue ? 'Pagamento em atraso' : 'Fatura'}</Eyebrow>
      <H1>
        {overdue ? `Faltou o pagamento, ${firstName}.` : `Sua fatura, ${firstName}.`}
      </H1>
      <Lede>
        {overdue ? (
          <>
            A cobrança de <Strong>{plan}</Strong> não passou. Sem stress — dá pra resolver agora em
            um clique e seguir sem interrupção.
          </>
        ) : (
          <>
            Aqui está o resumo da sua assinatura <Strong>{plan}</Strong>. Nada a fazer se o pagamento
            for automático — é só pra você ter o registro.
          </>
        )}
      </Lede>

      <Callout tone={overdue ? 'coral' : 'default'}>
        <InfoRow label="Plano" value={plan} />
        <InfoRow label="Fatura" value={invoiceNumber} />
        <InfoRow label={overdue ? 'Venceu em' : 'Vencimento'} value={dueDate} />
        <InfoRow label="Total" value={amount} strong last />
      </Callout>

      <CTA href={payUrl}>{overdue ? 'Regularizar pagamento' : 'Ver fatura'}</CTA>
      <SubLink href={invoiceUrl}>baixar comprovante (PDF) →</SubLink>

      {overdue ? (
        <Para style={{ margin: '22px 0 0', fontSize: '14px', color: color.muted }}>
          Se já pagou, ignora este email — pode levar algumas horas pra compensar.
        </Para>
      ) : null}
    </Layout>
  );
}

BillingEmail.PreviewProps = {
  firstName: 'Marina',
  plan: 'Mentoria Operadores · mensal',
  amount: 'R$ 1.146,00',
  dueDate: '5 de junho',
  invoiceNumber: '#VIA-2026-0612',
  overdue: false,
  payUrl: 'https://app.viverdeia.ai/faturas',
  invoiceUrl: 'https://app.viverdeia.ai/faturas/0612.pdf',
} satisfies BillingEmailProps;

export { BillingEmail };
