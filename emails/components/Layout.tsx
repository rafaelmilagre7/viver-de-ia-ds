import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Link,
  Preview,
} from '@react-email/components';
import * as React from 'react';
import { s, color, asset } from '../theme';

export interface LayoutProps {
  /** Texto de preview (preheader) que aparece na lista do inbox, depois do assunto. */
  preview: string;
  /** Motivo do envio (footer · transparência). */
  reason?: string;
  children: React.ReactNode;
}

/**
 * Shell de email Viver de IA · à prova de bala.
 * Card branco flutuando sobre fundo cinza (Stripe-style), wordmark hospedado,
 * footer editorial. Travado em claro. Estrutura via react-email (tabelas + inline).
 */
export function Layout({ preview, reason, children }: LayoutProps) {
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        {/* Geist pra clientes que honram webfont; o stack de sistema cobre o resto */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          {/* marca */}
          <Section style={s.brandRow}>
            <Img
              src={asset('/logos/wordmark-navy.png')}
              width="150"
              height="12"
              alt="Viver de IA"
              style={s.wordmark}
            />
          </Section>

          {/* card */}
          <Section style={s.card}>{children}</Section>

          {/* footer */}
          <Section style={s.footer}>
            <Text style={s.footerText}>
              {reason || 'Você recebeu este email porque faz parte da comunidade Viver de IA.'}
            </Text>
            <Text style={s.footerText}>
              <Link href="https://app.viverdeia.ai/preferencias" style={s.link}>
                Gerenciar preferências
              </Link>
              {'  ·  '}
              <Link href="https://app.viverdeia.ai/descadastrar" style={s.link}>
                Descadastrar
              </Link>
            </Text>
            <Text style={s.footerFaint}>
              Viver de IA · mentoria + comunidade + Leaders AI Conference
            </Text>
            <Text style={{ ...s.footerFaint, color: color.faint }}>
              © Viver de IA. Todos os direitos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default Layout;
