import * as React from 'react';
import { Section } from '@react-email/components';
import { Layout } from './components/Layout';
import { Lede, Para, Strong, CTA, Step, Signature } from './components/ui';
import { color } from './theme';

export const meta = {
  id: 'welcome-plataforma',
  name: 'Boas-vindas à plataforma',
  subject: 'teu acesso à plataforma tá liberado',
  when: 'Disparado quando o acesso do aluno à plataforma é liberado (primeiro login). Se coincidir com a confirmação de matrícula, o welcome de turma vence — nunca os dois na mesma janela.',
};

export interface WelcomePlataformaEmailProps {
  firstName: string;
  loginEmail: string;
  platformUrl: string;
}

export default function WelcomePlataformaEmail({ firstName, loginEmail, platformUrl }: WelcomePlataformaEmailProps) {
  return (
    <Layout
      preview={`Login com ${loginEmail} — a senha tu define no primeiro acesso. Três passos pra começar bem.`}
      reason="Você recebeu este email porque seu acesso à plataforma Viver de IA foi liberado."
      hero={{ eyebrow: 'Boas-vindas', title: <>Teu acesso tá liberado, {firstName}.</> }}
    >
      <Lede>
        O login é com este mesmo email — <Strong>{loginEmail}</Strong> — e a senha tu define no
        primeiro acesso.
      </Lede>

      <Para style={{ margin: '0 0 18px' }}>Três passos pra começar bem:</Para>

      <Section style={{ margin: '0 0 8px' }}>
        <Step n={1} title="Faz o primeiro login">
          em app.viverdeia.ai
        </Step>
        <Step n={2} title="Começa pela trilha de início">
          mostra como a plataforma funciona e por onde começar
        </Step>
        <Step n={3} title="Se apresenta na comunidade">
          conta o que tu faz e o que quer construir com IA
        </Step>
      </Section>

      <CTA href={platformUrl}>Acessar a plataforma</CTA>

      <Para style={{ margin: '18px 0 0', color: color.muted, fontSize: '14px' }}>
        Se algo travar no acesso, responde este email — a gente resolve contigo.
      </Para>

      <Signature name="Caio Ribeiro" role="fundador · Viver de IA" />
    </Layout>
  );
}

WelcomePlataformaEmail.PreviewProps = {
  firstName: 'Marina',
  loginEmail: 'marina@empresa.com.br',
  platformUrl: 'https://app.viverdeia.ai',
} satisfies WelcomePlataformaEmailProps;

export { WelcomePlataformaEmail };
