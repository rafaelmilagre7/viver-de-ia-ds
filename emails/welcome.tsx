import * as React from 'react';
import { Section } from '@react-email/components';
import { Layout } from './components/Layout';
import { Eyebrow, H1, Lede, Para, Strong, CTA, Step, Signature } from './components/ui';

export const meta = {
  id: 'welcome',
  name: 'Boas-vindas',
  subject: 'tua vaga tá confirmada · bora começar?',
  when: 'Disparado quando um aluno confirma a matrícula numa turma.',
};

export interface WelcomeEmailProps {
  firstName: string;
  turma: string;
  daysToStart: number;
  platformUrl: string;
}

export default function WelcomeEmail({ firstName, turma, daysToStart, platformUrl }: WelcomeEmailProps) {
  return (
    <Layout
      preview={`Tua vaga na turma ${turma} tá confirmada. Começa em ${daysToStart} dias.`}
      reason="Você recebeu este email porque confirmou sua matrícula na Viver de IA."
    >
      <Eyebrow>Boas-vindas</Eyebrow>
      <H1>Que bom te ver aqui, {firstName}.</H1>
      <Lede>
        Tua vaga na turma <Strong>{turma}</Strong> tá confirmada. Começa em{' '}
        <Strong>{daysToStart} dias</Strong> — e dá pra chegar na semana 1 já com contexto.
      </Lede>

      <Para style={{ margin: '0 0 18px' }}>Três passos, sem pressa:</Para>

      <Section style={{ margin: '0 0 8px' }}>
        <Step n={1} title="Acessa a plataforma">
          login com este mesmo email em app.viverdeia.ai
        </Step>
        <Step n={2} title="Assiste o intro de 12 min">
          contextualiza o método antes do primeiro encontro
        </Step>
        <Step n={3} title="Marca tua primeira mentoria 1:1">
          30 min pra alinhar teu caso real
        </Step>
      </Section>

      <CTA href={platformUrl}>Acessar a plataforma</CTA>

      <Para style={{ margin: '18px 0 0', color: '#667085', fontSize: '14px' }}>
        Sem prazo apertado nem nada — isso é só pra chegar na primeira semana sabendo onde pisar.
      </Para>

      <Signature name="Caio Ribeiro" role="fundador · Viver de IA" />
    </Layout>
  );
}

WelcomeEmail.PreviewProps = {
  firstName: 'Marina',
  turma: 'Operadores · T08',
  daysToStart: 14,
  platformUrl: 'https://app.viverdeia.ai',
} satisfies WelcomeEmailProps;

export { WelcomeEmail };
