import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, CTA, SubLink, Signature } from './components/ui';
import { color } from './theme';

export const meta = {
  id: 'nps',
  name: 'NPS / feedback',
  subject: 'como tá indo? 1 pergunta, 30 segundos',
  when: 'Pulso de satisfação. Uma pergunta só, pessoal, sem formulário gigante.',
};

export interface NpsEmailProps {
  firstName: string;
  surveyUrl: string;
}

export default function NpsEmail({ firstName, surveyUrl }: NpsEmailProps) {
  return (
    <Layout
      preview="Uma pergunta direta sobre a mentoria. 30 segundos, sem formulário gigante."
      reason="Você recebeu este email porque está numa turma ativa da Viver de IA."
      hero={{ eyebrow: 'Pergunta rápida', title: <>{firstName}, como tá indo de verdade?</> }}
    >
      <Lede>
        Sem formulário de 20 campos. Uma pergunta só, e ela importa pra mim de verdade:
      </Lede>
      <Para style={{ fontSize: '17px', color: color.ink, fontWeight: 500, margin: '0 0 20px' }}>
        De 0 a 10, o quanto você recomendaria a mentoria pra alguém na sua situação?
      </Para>
      <Para>
        O que você responder muda o que eu priorizo nas próximas semanas. Se for nota baixa, melhor
        ainda — é onde eu mais aprendo.
      </Para>

      <CTA href={surveyUrl}>Responder em 30s</CTA>
      <SubLink href={surveyUrl}>prefiro escrever o que tô achando →</SubLink>

      <Signature name="Caio Ribeiro" role="fundador · Viver de IA" />
    </Layout>
  );
}

NpsEmail.PreviewProps = {
  firstName: 'Marina',
  surveyUrl: 'https://app.viverdeia.ai/pulso',
} satisfies NpsEmailProps;

export { NpsEmail };
