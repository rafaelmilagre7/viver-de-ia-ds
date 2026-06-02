import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, Strong, Callout, CTA, SubLink } from './components/ui';
import { color, fontStack } from './theme';
import { Text } from '@react-email/components';

export const meta = {
  id: 'winback',
  name: 'Recuperação (win-back)',
  subject: 'tua vaga continua aqui',
  when: 'Reengajamento de quem deu uma pausa. Caloroso, sem dark pattern.',
};

export interface WinbackEmailProps {
  firstName: string;
  lastSeen: string;
  highlight: string;
  returnUrl: string;
  talkUrl: string;
}

export default function WinbackEmail({ firstName, lastSeen, highlight, returnUrl, talkUrl }: WinbackEmailProps) {
  return (
    <Layout
      preview="Sem cobrança. Só um aviso de que dá pra retomar de onde parou."
      reason="Você recebeu este email porque já fez parte de uma turma da Viver de IA."
      hero={{ eyebrow: 'Senti sua falta', title: <>A porta continua aberta, {firstName}.</> }}
    >
      <Lede>
        Vi que você deu uma pausa {lastSeen}. Acontece — a vida aperta. Só queria que soubesse que
        dá pra retomar exatamente de onde parou, sem recomeçar do zero.
      </Lede>

      <Callout>
        <Text style={{ margin: 0, fontFamily: fontStack, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: color.muted }}>
          O que rolou enquanto você esteve fora
        </Text>
        <Text style={{ margin: '8px 0 0', fontFamily: fontStack, fontSize: '15px', lineHeight: '1.6', color: color.body }}>
          {highlight}
        </Text>
      </Callout>

      <Para>
        Sem pressão e sem prazo de validade. Se quiser voltar, é um clique. Se preferir conversar
        antes, eu te respondo pessoalmente.
      </Para>

      <CTA href={returnUrl}>Retomar de onde parei</CTA>
      <SubLink href={talkUrl}>prefiro conversar primeiro →</SubLink>

      <Para style={{ margin: '22px 0 0', fontSize: '14px', color: color.muted }}>
        E se for pra seguir caminhos diferentes, tudo bem também — sem ressentimento. <Strong>obrigado por ter passado por aqui.</Strong>
      </Para>
    </Layout>
  );
}

WinbackEmail.PreviewProps = {
  firstName: 'Marina',
  lastSeen: 'há umas 3 semanas',
  highlight:
    'Abrimos a trilha de agentes em produção e 14 operadores colocaram o primeiro fluxo no ar. Tem gravação de tudo te esperando.',
  returnUrl: 'https://app.viverdeia.ai/retomar',
  talkUrl: 'https://app.viverdeia.ai/conversar',
} satisfies WinbackEmailProps;

export { WinbackEmail };
