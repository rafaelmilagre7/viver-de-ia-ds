import { Button, Text, Heading, Hr, Section, Row, Column, Link } from '@react-email/components';
import * as React from 'react';
import { s, color, radius, fontStack } from '../theme';

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <Text style={s.eyebrow}>{children}</Text>
);

export const H1 = ({ children }: { children: React.ReactNode }) => (
  <Heading as="h1" style={s.h1}>
    {children}
  </Heading>
);

export const Lede = ({ children }: { children: React.ReactNode }) => (
  <Text style={s.lede}>{children}</Text>
);

export const Para = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <Text style={{ ...s.p, ...style }}>{children}</Text>
);

export const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong style={s.strong}>{children}</strong>
);

export const Divider = ({ space }: { space?: number }) => (
  <Hr style={space != null ? { ...s.hr, margin: `${space}px 0` } : s.hr} />
);

/** CTA primária · navy SÓLIDO (sobrevive ao Outlook) · branco. */
export const CTA = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Section style={{ padding: '4px 0 6px' }}>
    <Button href={href} style={s.btn}>
      {children}
    </Button>
  </Section>
);

/** Link textual secundário sob o CTA. */
export const SubLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Text style={{ ...s.p, margin: '14px 0 0', fontSize: '14px', color: color.muted }}>
    <Link href={href} style={s.link}>
      {children}
    </Link>
  </Text>
);

/** Bloco de destaque (detalhes, resumo). tone 'coral' pra urgência real. */
export const Callout = ({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'coral';
}) => (
  <Section
    style={{
      ...s.callout,
      ...(tone === 'coral'
        ? { backgroundColor: color.coralBg, border: `1px solid ${color.coralLine}` }
        : {}),
    }}
  >
    {children}
  </Section>
);

/** Linha rótulo↔valor (faturas, detalhes). */
export const InfoRow = ({
  label,
  value,
  strong,
  last,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  strong?: boolean;
  last?: boolean;
}) => (
  <Row style={{ borderBottom: last ? 'none' : `1px solid ${color.lineSoft}` }}>
    <Column style={{ padding: '11px 0' }}>
      <Text
        style={{
          margin: 0,
          fontFamily: fontStack,
          fontSize: '14px',
          color: color.muted,
          lineHeight: '1.4',
        }}
      >
        {label}
      </Text>
    </Column>
    <Column style={{ padding: '11px 0', textAlign: 'right' }}>
      <Text
        style={{
          margin: 0,
          fontFamily: fontStack,
          fontSize: strong ? '16px' : '14px',
          fontWeight: strong ? 600 : 500,
          color: color.ink,
          lineHeight: '1.4',
        }}
      >
        {value}
      </Text>
    </Column>
  </Row>
);

/** Passo numerado (onboarding). Número navy + texto. */
export const Step = ({
  n,
  title,
  children,
}: {
  n: number;
  title: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <Row style={{ marginBottom: '14px' }}>
    <Column width={34} valign="top">
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        style={{ borderCollapse: 'collapse' }}
      >
        <tbody>
          <tr>
            <td
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: color.navy,
                borderRadius: `${radius.pill}px`,
                color: color.onNavy,
                fontFamily: fontStack,
                fontSize: '12px',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: '24px',
              }}
            >
              {n}
            </td>
          </tr>
        </tbody>
      </table>
    </Column>
    <Column valign="top">
      <Text style={{ margin: 0, fontFamily: fontStack, fontSize: '15px', lineHeight: '1.5', color: color.body }}>
        <strong style={s.strong}>{title}</strong>
        {children ? <> — {children}</> : null}
      </Text>
    </Column>
  </Row>
);

/** Assinatura editorial (remetente humano). */
export const Signature = ({ name, role }: { name: string; role: string }) => (
  <>
    <Divider space={26} />
    <Text style={{ margin: 0, fontFamily: fontStack, fontSize: '15px', color: color.ink, fontWeight: 600 }}>
      {name}
    </Text>
    <Text style={{ margin: '2px 0 0', fontFamily: fontStack, fontSize: '14px', color: color.muted }}>
      {role}
    </Text>
  </>
);
