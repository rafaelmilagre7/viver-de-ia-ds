import * as React from 'react';
import { Section, Text, Link } from '@react-email/components';
import { Layout } from './components/Layout';
import { Lede, CTA } from './components/ui';
import { color, fontStack } from './theme';

export const meta = {
  id: 'digest',
  name: 'Digest semanal',
  subject: 'sua semana na Viver de IA · 2–8 jun',
  when: 'Resumo recorrente do que aconteceu na turma e na comunidade.',
};

interface DigestItem {
  kicker: string;
  title: string;
  note: string;
  url: string;
}

export interface DigestEmailProps {
  firstName: string;
  weekLabel: string;
  items: DigestItem[];
  appUrl: string;
}

export default function DigestEmail({ firstName, weekLabel, items, appUrl }: DigestEmailProps) {
  return (
    <Layout
      preview={`O resumo da sua semana: ${items.map((i) => i.title).slice(0, 2).join(', ')}…`}
      reason="Você recebeu este email porque ativou o resumo semanal da Viver de IA."
      hero={{ eyebrow: `Resumo da semana · ${weekLabel}`, title: <>O que rolou, {firstName}.</> }}
    >
      <Lede>Três coisas que valem seus 2 minutos antes de voltar pro foco.</Lede>

      <Section style={{ margin: '8px 0 4px' }}>
        {items.map((it, i) => (
          <Section
            key={it.title}
            style={{
              padding: '18px 0',
              borderTop: i === 0 ? `1px solid ${color.line}` : 'none',
              borderBottom: `1px solid ${color.line}`,
            }}
          >
            <Text
              style={{
                margin: '0 0 5px',
                fontFamily: fontStack,
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: color.muted,
              }}
            >
              {it.kicker}
            </Text>
            <Text style={{ margin: '0 0 4px', fontFamily: fontStack, fontSize: '17px', fontWeight: 600, lineHeight: '1.35', letterSpacing: '-0.01em', color: color.ink }}>
              <Link href={it.url} style={{ color: color.ink, textDecoration: 'none' }}>
                {it.title}
              </Link>
            </Text>
            <Text style={{ margin: 0, fontFamily: fontStack, fontSize: '14px', lineHeight: '1.55', color: color.body }}>
              {it.note}
            </Text>
          </Section>
        ))}
      </Section>

      <Section style={{ height: '8px' }} />
      <CTA href={appUrl}>Abrir a plataforma</CTA>
    </Layout>
  );
}

DigestEmail.PreviewProps = {
  firstName: 'Marina',
  weekLabel: '2–8 jun',
  items: [
    {
      kicker: 'Nova trilha',
      title: 'Agentes em produção, do zero ao primeiro fluxo no ar',
      note: '6 aulas novas + um template clonável. 14 operadores já subiram o primeiro agente.',
      url: 'https://app.viverdeia.ai/trilhas/agentes',
    },
    {
      kicker: 'Mentoria ao vivo',
      title: 'Quinta, 19h · revisão de casos reais',
      note: 'Traz teu fluxo travado — a gente destrava ao vivo. Fica gravado se não der pra ir.',
      url: 'https://app.viverdeia.ai/ao-vivo',
    },
    {
      kicker: 'Da comunidade',
      title: '“Cortei 9h/semana de tarefa manual com 1 agente”',
      note: 'O passo a passo que a Júlia compartilhou virou o post mais salvo da semana.',
      url: 'https://app.viverdeia.ai/comunidade',
    },
  ],
  appUrl: 'https://app.viverdeia.ai',
} satisfies DigestEmailProps;

export { DigestEmail };
