import { Html, Head, Body, Container, Section, Img, Text, Link, Preview, Heading } from '@react-email/components';
import * as React from 'react';
import { s, color, asset, mobileCss } from '../theme';

export interface LayoutProps {
  /** Preheader · texto de preview no inbox, depois do assunto. */
  preview: string;
  /** Cabeçalho: eyebrow + headline (a "manchete" do email).
   *  tone 'alert' = ponto + eyebrow coral · só incidente ou pagamento falho real. */
  hero: { eyebrow: string; title: React.ReactNode; tone?: 'alert' };
  /** 'brand' = faixa navy, só pra momento de marca (lançamento, evento).
   *  Padrão: cabeçalho claro e quieto (transacional, operacional, carta). */
  variant?: 'default' | 'brand';
  /** Motivo do envio (footer · transparência). */
  reason?: string;
  /** Corpo do email (lede em diante). */
  children: React.ReactNode;
}

/** Imagem navy numa base travada da cor da superfície: não some no modo escuro forçado. */
const LockedBase = ({ style, children }: { style: React.CSSProperties; children: React.ReactNode }) => (
  <table role="presentation" cellPadding={0} cellSpacing={0} border={0}>
    <tbody>
      <tr>
        <td style={style}>{children}</td>
      </tr>
    </tbody>
  </table>
);

/**
 * Shell de email Viver de IA · à prova de bala.
 * Card branco com cabeçalho claro (lockup + eyebrow + manchete) por padrão;
 * faixa navy glassy só no variant "brand". Footer com o ícone.
 * Degradês sempre com fallback sólido (Outlook).
 */
export function Layout({ preview, hero, variant = 'default', reason, children }: LayoutProps) {
  const brand = variant === 'brand';
  const eyebrow = (
    <Text style={brand ? { ...s.eyebrow, color: color.onNavySoft } : { ...s.eyebrow, ...(hero.tone === 'alert' ? s.eyebrowAlert : null) }}>
      {hero.tone === 'alert' ? <span style={s.alertDot} /> : null}
      {hero.eyebrow}
    </Text>
  );

  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: mobileCss }} />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={s.body}>
        <Container style={s.container} className="via-shell">
          <Section style={s.card}>
            {brand ? (
              /* faixa navy · lockup branco (PNG · o Gmail não renderiza SVG) */
              <Section style={s.hero} className="via-pad">
                <Img
                  src={asset('/logos/lockup-white.png')}
                  width="142"
                  height="18"
                  alt="Viver de IA"
                  style={s.heroLogo}
                />
                {eyebrow}
                <Heading as="h1" style={{ ...s.title, color: color.onNavy }} className="via-title">
                  {hero.title}
                </Heading>
              </Section>
            ) : (
              <>
                <Section style={s.logoRow} className="via-pad-logo">
                  <LockedBase style={s.logoBase}>
                    <Img
                      src={asset('/logos/lockup-navy.png')}
                      width="142"
                      height="18"
                      alt="Viver de IA"
                      style={s.logoImg}
                    />
                  </LockedBase>
                </Section>
                <Section style={s.head} className="via-pad">
                  {eyebrow}
                  <Heading as="h1" style={s.title} className="via-title">
                    {hero.title}
                  </Heading>
                </Section>
              </>
            )}
            <Section style={brand ? { ...s.bodyWrap, paddingTop: '30px' } : s.bodyWrap} className="via-pad">
              {children}
            </Section>
          </Section>

          {/* footer · ícone + transparência */}
          <Section style={s.footer}>
            <Section style={s.footerMonoRow}>
              <LockedBase style={s.footerBase}>
                <Img
                  src={asset('/logos/monogram-navy.png')}
                  width="26"
                  height="14"
                  alt="Viver de IA"
                  style={s.logoImg}
                />
              </LockedBase>
            </Section>
            <Section style={s.footerTextWrap}>
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
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default Layout;
