import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, Strong, CTA, SubLink, Signature } from './components/ui';
import { color } from './theme';

export const meta = {
  id: 'churn',
  name: 'Churn alert (sumiço)',
  subject: 'tô curioso — o que rolou?',
  when: 'Aluno ativo que ficou quieto. Curioso e humano, antes de virar win-back.',
};

export interface ChurnEmailProps {
  firstName: string;
  daysQuiet: number;
  resumeUrl: string;
  talkUrl: string;
}

export default function ChurnEmail({ firstName, daysQuiet, resumeUrl, talkUrl }: ChurnEmailProps) {
  return (
    <Layout
      preview={`Sem cobrança — só queria saber como você tá depois de ${daysQuiet} dias quieto.`}
      reason="Você recebeu este email porque tem matrícula ativa na Viver de IA."
      hero={{ eyebrow: 'Tô curioso', title: <>{firstName}, sumiu — tá tudo bem?</> }}
    >
      <Lede>
        Vi que você não aparece há <Strong>{daysQuiet} dias</Strong>. Não é cobrança — é curiosidade
        de verdade. Quando alguém some, normalmente é um de dois motivos.
      </Lede>
      <Para>
        Ou a <Strong>vida apertou</Strong> (acontece, e a gente segura tua vaga), ou tem{' '}
        <Strong>algo travando</Strong> que dava pra destravar em 15 minutos de conversa. Os dois têm
        solução — só preciso saber qual é o teu.
      </Para>

      <CTA href={resumeUrl}>Voltar de onde parei</CTA>
      <SubLink href={talkUrl}>ou me conta o que travou →</SubLink>

      <Para style={{ margin: '20px 0 0', fontSize: '14px', color: color.muted }}>
        Responde este email em uma linha que eu leio — não é robô.
      </Para>

      <Signature name="Caio Ribeiro" role="fundador · Viver de IA" />
    </Layout>
  );
}

ChurnEmail.PreviewProps = {
  firstName: 'Marina',
  daysQuiet: 19,
  resumeUrl: 'https://app.viverdeia.ai/retomar',
  talkUrl: 'https://app.viverdeia.ai/conversar',
} satisfies ChurnEmailProps;

export { ChurnEmail };
