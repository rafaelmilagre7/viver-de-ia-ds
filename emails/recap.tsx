import * as React from 'react';
import { Section, Text } from '@react-email/components';
import { Layout } from './components/Layout';
import { Lede, CTA, SubLink } from './components/ui';
import { color, fontStack } from './theme';

export const meta = {
  id: 'recap',
  name: 'Recap pós-evento',
  subject: 'o que rolou na live (+ o replay)',
  when: 'Resumo após live/conference. 3 destaques + acesso ao replay e material.',
};

interface Highlight { kicker: string; line: string }

export interface RecapEmailProps {
  firstName: string;
  eventName: string;
  highlights: Highlight[];
  replayUrl: string;
  materialUrl: string;
}

export default function RecapEmail({ firstName, eventName, highlights, replayUrl, materialUrl }: RecapEmailProps) {
  return (
    <Layout
      preview={`Os 3 momentos que valeram a ${eventName} + o replay completo.`}
      reason="Você recebeu este email porque se inscreveu na live da Viver de IA."
      hero={{ eyebrow: `Recap · ${eventName}`, title: <>{firstName}, o que ficou da live.</> }}
    >
      <Lede>
        Pra quem foi: revisão rápida. Pra quem perdeu: o replay tá liberado e vale os 60 minutos.
        Os 3 momentos que mais mexeram com a galera:
      </Lede>

      <Section style={{ margin: '4px 0 8px' }}>
        {highlights.map((h, i) => (
          <Section
            key={h.kicker}
            style={{
              padding: '16px 0',
              borderTop: i === 0 ? `1px solid ${color.line}` : 'none',
              borderBottom: `1px solid ${color.line}`,
            }}
          >
            <Text style={{ margin: '0 0 4px', fontFamily: fontStack, fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: color.muted }}>
              {h.kicker}
            </Text>
            <Text style={{ margin: 0, fontFamily: fontStack, fontSize: '15px', lineHeight: '1.55', color: color.body }}>
              {h.line}
            </Text>
          </Section>
        ))}
      </Section>

      <Section style={{ height: '10px' }} />
      <CTA href={replayUrl}>Assistir o replay</CTA>
      <SubLink href={materialUrl}>baixar o material apresentado →</SubLink>
    </Layout>
  );
}

RecapEmail.PreviewProps = {
  firstName: 'Marina',
  eventName: 'Auditoria ao vivo',
  highlights: [
    { kicker: 'O ajuste mais copiado', line: 'Trocar “seja útil” por uma persona com 3 limites explícitos cortou alucinação na hora — visível ao vivo.' },
    { kicker: 'A pergunta que travou todo mundo', line: '“Como você MEDE que o agente funciona?” — 80% da sala não tinha número. É o ponto de partida.' },
    { kicker: 'O caso do dia', line: 'Um agente de suporte que devolveu 9h/semana — o passo a passo ficou no material.' },
  ],
  replayUrl: 'https://viverdeia.ai/replays/auditoria',
  materialUrl: 'https://viverdeia.ai/material/auditoria.pdf',
} satisfies RecapEmailProps;

export { RecapEmail };
