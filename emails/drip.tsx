import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, Strong, CTA, SubLink, Signature } from './components/ui';

export const meta = {
  id: 'drip',
  name: 'Drip / nurture',
  subject: 'o agente que paga a mentoria',
  when: 'Sequência de nutrição (lead que baixou material). Cada email é editorial stand-alone.',
};

export interface DripEmailProps {
  firstName: string;
  readUrl: string;
  talkUrl: string;
}

export default function DripEmail({ firstName, readUrl, talkUrl }: DripEmailProps) {
  return (
    <Layout
      preview="Um caso real: o agente que se paga no primeiro mês — e o que isso exige de você."
      reason="Você recebeu este email porque baixou um material da Viver de IA."
      hero={{ eyebrow: 'Carta · 1 de 5', title: <>O agente que paga a própria mentoria.</> }}
    >
      <Lede>
        {firstName}, a conta que mais convence não é a minha — é a do próprio aluno. Vou te mostrar
        uma, sem floreio.
      </Lede>
      <Para>
        Um operador de e-commerce automatizou a triagem de WhatsApp num agente. Resultado medido em
        30 dias: <Strong>9 horas por semana</Strong> que voltaram pro time e uma receita por canal
        que ninguém enxergava antes. O agente custou menos que <Strong>uma mensalidade</Strong>.
      </Para>
      <Para>
        Não é mágica nem prompt esperto. É método: achar a tarefa que sangra tempo, medir, e colocar
        um agente medido em receita ou economia. Foi exatamente isso que ele fez na semana 2 da
        mentoria — e é o que a gente faz com cada aluno.
      </Para>

      <CTA href={readUrl}>Ler o caso completo</CTA>
      <SubLink href={talkUrl}>quer ver se faz sentido pro teu caso? me chama →</SubLink>

      <Signature name="Caio Ribeiro" role="fundador · Viver de IA" />
    </Layout>
  );
}

DripEmail.PreviewProps = {
  firstName: 'Marina',
  readUrl: 'https://viverdeia.ai/casos/agente-ecommerce',
  talkUrl: 'https://app.viverdeia.ai/conversar',
} satisfies DripEmailProps;

export { DripEmail };
