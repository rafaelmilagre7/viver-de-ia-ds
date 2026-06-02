import * as React from 'react';
import { Layout } from './components/Layout';
import { Lede, Para, Strong, CTA, SubLink, Signature } from './components/ui';
import { color } from './theme';

export const meta = {
  id: 'oferta',
  name: 'Oferta sutil',
  subject: 'pelo que vi, faria sentido a gente conversar',
  when: 'Convite comercial observacional — parte de algo concreto que a pessoa fez, sem pressão.',
};

export interface OfertaEmailProps {
  firstName: string;
  observation: string;
  talkUrl: string;
  detailsUrl: string;
}

export default function OfertaEmail({ firstName, observation, talkUrl, detailsUrl }: OfertaEmailProps) {
  return (
    <Layout
      preview="Não é pitch genérico — é sobre uma coisa específica que você já fez."
      reason="Você recebeu este email porque interagiu com um material ou ferramenta da Viver de IA."
      hero={{ eyebrow: 'Uma observação', title: <>{firstName}, reparei numa coisa.</> }}
    >
      <Lede>
        Não é mensagem de robô disparada pra mil pessoas. É sobre algo concreto que <Strong>você</Strong> fez:
      </Lede>
      <Para style={{ borderLeft: `2px solid ${color.navy}`, paddingLeft: '16px', color: color.ink, margin: '0 0 18px' }}>
        {observation}
      </Para>
      <Para>
        Quem chega nesse ponto sozinho normalmente trava no mesmo lugar depois — e é exatamente aí
        que a mentoria encurta meses pra semanas. Não tô te empurrando nada: se fizer sentido, a
        gente conversa 20 minutos e você decide. Se não fizer, beleza também.
      </Para>

      <CTA href={talkUrl}>Marcar 20 min</CTA>
      <SubLink href={detailsUrl}>ou ver como funciona primeiro →</SubLink>

      <Signature name="Caio Ribeiro" role="fundador · Viver de IA" />
    </Layout>
  );
}

OfertaEmail.PreviewProps = {
  firstName: 'Marina',
  observation:
    '"Você montou um agente de WhatsApp que já responde sozinho — mas ainda mede sucesso no olho, sem número de receita ou economia atrelado."',
  talkUrl: 'https://app.viverdeia.ai/conversar',
  detailsUrl: 'https://viverdeia.ai/turma',
} satisfies OfertaEmailProps;

export { OfertaEmail };
