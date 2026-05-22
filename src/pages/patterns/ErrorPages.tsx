import { useState } from 'react';
import { Compass, Lock, Construction, AlertOctagon, Home, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Pill } from '../../lib/Pill/Pill';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

type Code = '404' | '500' | '403' | 'maintenance';

const ERROR_DEFS: Record<Code, { headline: string; lede: string; tone: 'attn' | 'churn' | 'default'; icon: React.ReactNode }> = {
  '404': {
    headline: 'Esta página saiu de cena',
    lede: 'Pode ter sido movida, renomeada, ou nunca existiu por aqui. A gente sente — mas tem caminhos abertos.',
    tone: 'default',
    icon: <Compass size={28} strokeWidth={1.6} />,
  },
  '403': {
    headline: 'Sem acesso por enquanto',
    lede: 'Essa parte exige permissão específica · pode ser plano, função ou convite pendente.',
    tone: 'attn',
    icon: <Lock size={28} strokeWidth={1.8} />,
  },
  '500': {
    headline: 'Algo travou do nosso lado',
    lede: 'Não foi você. Já fomos notificados · estamos olhando. Tente em alguns instantes.',
    tone: 'churn',
    icon: <AlertOctagon size={28} strokeWidth={1.8} />,
  },
  maintenance: {
    headline: 'Janela de manutenção · 04h‒05h BRT',
    lede: 'Atualização programada do core. Não há perda de dados · acesso volta em breve.',
    tone: 'attn',
    icon: <Construction size={28} strokeWidth={1.7} />,
  },
};

export default function ErrorPages() {
  const [code, setCode] = useState<Code>('404');
  const def = ERROR_DEFS[code];

  return (
    <>
      <DocsHeader
        eyebrow="Padrões · error pages"
        title={<>Erros honestos — <em>com porta de saída e voz humana</em>.</>}
        lede="4 estados editoriais (404 · 403 · 500 · maintenance) com a mesma estrutura: ícone + headline curto + frase honesta + 2 caminhos de saída. Sem '#$@!' nem '🤖 oops'. A linguagem assume responsabilidade quando é nossa, e devolve agency quando é do user."
      />

      <Section
        meta="navegador"
        title="alterne entre os 4 estados">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Mesmo layout · só muda ícone, headline, lede e tom (tone do Alert correspondente).</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {(['404', '403', '500', 'maintenance'] as Code[]).map((c) => (
            <Button key={c} size="sm" variant={code === c ? 'primary' : 'secondary'} onClick={() => setCode(c)}>
              {c}
            </Button>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            minHeight: 460,
            padding: '64px 32px',
            borderRadius: 16,
            background:
              'radial-gradient(circle at 18% 8%, rgba(30,58,95,0.12), transparent 52%), radial-gradient(circle at 82% 90%, rgba(10,31,59,0.10), transparent 50%), var(--via-surface-1)',
            border: '1px solid var(--via-border)',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: 460, margin: '0 auto', textAlign: 'left' }}>
            <Pill variant={def.tone === 'churn' ? 'churn' : def.tone === 'attn' ? 'attn' : 'default'}>
              erro · {code}
            </Pill>

            <div
              style={{
                marginTop: 28,
                width: 72,
                height: 72,
                borderRadius: 16,
                background: 'linear-gradient(135deg, var(--via-navy-04, rgba(10,31,59,0.06)) 0%, var(--via-surface-1) 100%)',
                border: '1px solid var(--via-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--via-text-primary)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 16px 36px -24px rgba(10,31,59,0.30)',
              }}
            >
              {def.icon}
            </div>

            <h2 style={{ margin: '24px 0 12px', fontSize: 28, lineHeight: 1.18, color: 'var(--via-text-primary)', letterSpacing: -0.4 }}>
              {def.headline}
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 15, lineHeight: 1.65, color: 'var(--via-text-body)', maxWidth: 420 }}>
              {def.lede}
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button iconLeft={<Home size={14} />}>Voltar pro início</Button>
              {code === '500' ? (
                <Button variant="ghost" iconLeft={<Mail size={14} />}>Avisar suporte</Button>
              ) : code === '403' ? (
                <Button variant="ghost">Solicitar acesso</Button>
              ) : code === 'maintenance' ? (
                <Button variant="ghost">Ver status em tempo real</Button>
              ) : (
                <Button variant="ghost" iconLeft={<ArrowLeft size={14} />}>Voltar pra página anterior</Button>
              )}
            </div>

            <p style={{ margin: '28px 0 0', fontSize: 11.5, color: 'var(--via-text-muted)', fontStyle: 'italic' }}>
              ID do incidente · 6c1f-ax3{code === '500' ? '-srv-fail' : code === '403' ? '-auth-deny' : ''}
            </p>
          </div>
        </div>
      </Section>

      <Section meta="copy editorial" title="o que cada estado deve dizer · e evitar">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {COPY_GUIDES.map((g) => (
            <div key={g.code} className="vds-card vds-card--glass" style={{ padding: 20 }}>
              <Pill variant="default" size="sm">{g.code}</Pill>
              <h3 style={{ margin: '12px 0 8px', fontSize: 15, color: 'var(--via-text-primary)' }}>{g.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, lineHeight: 1.55 }}>
                <span style={{ color: 'var(--via-text-body)' }}><strong>Sim · </strong>{g.yes}</span>
                <span style={{ color: 'var(--via-text-muted)' }}><strong>Evite · </strong>{g.no}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

const COPY_GUIDES = [
  { code: '404', title: 'Página não existe', yes: 'fala "saiu de cena" ou "não está aqui"', no: '"oops!", "ops!", emoji de robô' },
  { code: '403', title: 'Sem permissão', yes: 'diz o motivo provável (plano, função, convite)', no: 'culpar o usuário · "você não tem direito"' },
  { code: '500', title: 'Falha do servidor', yes: 'assumir responsabilidade · "do nosso lado"', no: '"erro desconhecido", "tente de novo"' },
  { code: 'maintenance', title: 'Manutenção programada', yes: 'horário previsto + impacto claro', no: '"em breve", "logo, logo"' },
];
