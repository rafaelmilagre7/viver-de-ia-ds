import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, Strong, Callout, InfoRow, CTA, SubLink } from './components/ui';
import { color } from './theme';

export const meta = {
  id: 'lancamento',
  name: 'Lançamento de turma',
  subject: 'turma 2026.3 abre amanhã 9h · 30 vagas',
  when: 'Abertura de inscrições. Fato + condição real (sem countdown manipulativo).',
};

export interface LancamentoEmailProps {
  firstName: string;
  turma: string;
  opensAt: string;
  spots: string;
  duration: string;
  enrollUrl: string;
  detailsUrl: string;
}

export default function LancamentoEmail({ firstName, turma, opensAt, spots, duration, enrollUrl, detailsUrl }: LancamentoEmailProps) {
  return (
    <Layout
      preview={`${turma} abre ${opensAt}. ${spots}. Sem lista de espera depois que fecha.`}
      reason="Você recebeu este email porque pediu pra saber quando a próxima turma abrisse."
      hero={{ eyebrow: 'Inscrições', title: <>A {turma} abre {opensAt}.</> }}
    >
      <Lede>
        {firstName}, você pediu pra avisar — então tá avisado primeiro, antes da lista geral. Os
        fatos, sem enrolação:
      </Lede>

      <Callout>
        <InfoRow label="Turma" value={turma} />
        <InfoRow label="Abre" value={opensAt} strong />
        <InfoRow label="Vagas" value={spots} />
        <InfoRow label="Duração" value={duration} last />
      </Callout>

      <Para>
        É turma pequena de propósito — acompanhamento individual não escala em massa. Quando as
        vagas acabam, <Strong>acabam</Strong>; não tem segunda leva nem lista de espera mágica. Se
        fizer sentido pra você, o melhor horário é o da abertura.
      </Para>

      <CTA href={enrollUrl}>Quero minha vaga</CTA>
      <SubLink href={detailsUrl}>ver o método e os casos antes →</SubLink>

      <Para style={{ margin: '20px 0 0', fontSize: '14px', color: color.muted }}>
        Dúvida sobre se é pra você? Responde aqui em uma linha que eu te falo com honestidade — às
        vezes não é, e tudo bem.
      </Para>
    </Layout>
  );
}

LancamentoEmail.PreviewProps = {
  firstName: 'Marina',
  turma: 'Operadores · T09',
  opensAt: 'amanhã, 9h',
  spots: '30 vagas',
  duration: '4 meses · ao vivo + 1:1',
  enrollUrl: 'https://viverdeia.ai/turma/inscricao',
  detailsUrl: 'https://viverdeia.ai/turma',
} satisfies LancamentoEmailProps;

export { LancamentoEmail };
