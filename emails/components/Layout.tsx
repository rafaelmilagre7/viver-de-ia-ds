import { Html, Head, Body, Container, Section, Img, Text, Link, Preview, Heading } from '@react-email/components';
import * as React from 'react';
import { s, color, asset } from '../theme';

export interface LayoutProps {
  /** Preheader · texto de preview no inbox, depois do assunto. */
  preview: string;
  /** Hero navy: eyebrow + headline (a "manchete" do email). */
  hero: { eyebrow: string; title: React.ReactNode };
  /** Motivo do envio (footer · transparência). */
  reason?: string;
  /** Corpo do email (lede em diante). */
  children: React.ReactNode;
}

/**
 * Shell de email Viver de IA · à prova de bala + liquid glass simulado.
 * Lockup correto (monograma + wordmark) → card com hero navy glassy → corpo
 * branco → footer com o ícone. Degradês sempre com fallback sólido (Outlook).
 */
export function Layout({ preview, hero, reason, children }: LayoutProps) {
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          {/* marca · lockup monograma + wordmark (logo correta) */}
          <Section style={s.brandRow}>
            <Img
              src={asset('/logos/monogram-navy.png')}
              width="33"
              height="18"
              alt="Viver de IA"
              style={{ ...s.brandMono, display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }}
            />
            <Img
              src={asset('/logos/wordmark-navy.png')}
              width="168"
              height="14"
              alt=""
              style={{ ...s.brandWord, display: 'inline-block', verticalAlign: 'middle' }}
            />
          </Section>

          {/* card · hero navy + corpo branco */}
          <Section style={s.card}>
            <Section style={s.hero}>
              <Text style={s.heroEyebrow}>{hero.eyebrow}</Text>
              <Heading as="h1" style={s.heroTitle}>
                {hero.title}
              </Heading>
            </Section>
            <Section style={s.bodyWrap}>{children}</Section>
          </Section>

          {/* footer · ícone + transparência */}
          <Section style={s.footer}>
            <Img
              src={asset('/logos/monogram-navy.png')}
              width="26"
              height="14"
              alt="Viver de IA"
              style={s.footerMono}
            />
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
