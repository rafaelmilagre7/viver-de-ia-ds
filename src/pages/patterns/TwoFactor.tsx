import { useState } from 'react';
import { Shield, Smartphone, Key, Check, ArrowLeft } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { OTPInput } from '../../lib/OTPInput/OTPInput';
import { Alert } from '../../lib/Alert/Alert';
import { Pill } from '../../lib/Pill/Pill';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

type Step = 'choose' | 'verify' | 'backup' | 'done';
type Method = 'app' | 'sms' | 'backup';

export default function TwoFactor() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · 2FA setup flow"
        title={
          <>
            Segurança em camadas — <em>sem assustar quem ainda não conhece 2FA</em>.
          </>
        }
        lede="Fluxo editorial de configuração de 2FA · 4 passos (escolher método · ler/configurar · verificar código · gerar backup). Linguagem educativa em cada step. Suporta authenticator app, SMS e códigos de backup. OTPInput de 6 dígitos com paste detection."
      />

      <Section
        meta="fluxo completo"
        title="4 passos · método, verificação, backup">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Cada step é focado · não pede pra fazer tudo de uma vez. Sai do flow voltando ou cancelando · estado preservado se voltar.</p>
        <TwoFactorFlowDemo />
      </Section>

      <Section
        meta="anatomia editorial"
        title="o que cada step ensina"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {STEP_ANATOMY.map((s, i) => (
            <div key={i} className="vds-card vds-card--glass" style={{ padding: 20 }}>
              <Pill variant="default" size="sm">step {i + 1}</Pill>
              <h3 style={{ margin: '12px 0 6px', fontSize: 16, color: 'var(--via-text-primary)' }}>{s.title}</h3>
              <p style={{ margin: '0 0 8px', fontSize: 12.5, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>{s.purpose}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--via-text-body)', lineHeight: 1.6, fontStyle: 'italic' }}>
                {s.copyHint}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

const STEP_ANATOMY = [
  { title: 'Escolher método', purpose: 'App, SMS ou códigos de backup.', copyHint: '"App de autenticação é mais seguro — funciona offline."' },
  { title: 'Configurar', purpose: 'Mostra QR code ou número.', copyHint: '"Escaneie o QR no Google Authenticator ou Authy."' },
  { title: 'Verificar', purpose: 'Confirma com código de 6 dígitos.', copyHint: '"Digite o código atual gerado pelo app."' },
  { title: 'Backup', purpose: 'Códigos pra recuperar acesso.', copyHint: '"Salve no gerenciador de senhas — você só vê uma vez."' },
];

function TwoFactorFlowDemo() {
  const [step, setStep] = useState<Step>('choose');
  const [method, setMethod] = useState<Method | null>(null);
  const [code, setCode] = useState('');

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: 28, background: 'var(--via-surface-1)', border: '1px solid var(--via-border)', borderRadius: 16, boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 24px 60px -36px rgba(10,31,59,0.32)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Shield size={18} strokeWidth={1.8} color="var(--via-text-primary)" />
        <span style={{ fontSize: 12.5, color: 'var(--via-text-muted)', letterSpacing: 0.5, textTransform: 'uppercase' }}>Configurar 2FA</span>
        <Pill variant="default" size="sm" className="ml-auto" style={{ marginLeft: 'auto' }}>
          {stepLabel(step)}
        </Pill>
      </div>

      {step === 'choose' && (
        <>
          <h3 style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--via-text-primary)' }}>Como você quer receber o código?</h3>
          <p style={{ margin: '0 0 20px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>
            App de autenticação é mais seguro — funciona offline e não depende do celular.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <MethodCard
              icon={<Smartphone size={18} />}
              title="App de autenticação"
              sub="Google Authenticator, Authy, 1Password · recomendado"
              onClick={() => {
                setMethod('app');
                setStep('verify');
              }}
            />
            <MethodCard
              icon={<Key size={18} />}
              title="SMS"
              sub="Receber por mensagem · menos seguro, mas funciona"
              onClick={() => {
                setMethod('sms');
                setStep('verify');
              }}
            />
          </div>
        </>
      )}

      {step === 'verify' && (
        <>
          <Button variant="ghost" size="sm" iconLeft={<ArrowLeft size={13} />} onClick={() => setStep('choose')} style={{ marginBottom: 14 }}>
            Voltar
          </Button>
          <h3 style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--via-text-primary)' }}>
            {method === 'app' ? 'Escaneie o QR code' : 'Confirme seu número'}
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>
            {method === 'app'
              ? 'Abra seu app de autenticação e adicione o código abaixo. Depois digite o código atual.'
              : 'Enviamos um código de 6 dígitos pro seu celular. Digite abaixo.'}
          </p>
          {method === 'app' && (
            <div style={{ padding: 20, background: 'var(--via-navy-02, rgba(10,31,59,0.04))', borderRadius: 12, marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, var(--via-navy) 0%, var(--via-blue) 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, opacity: 0.9 }}>
                [QR code]
              </div>
            </div>
          )}
          <OTPInput
            length={6}
            value={code}
            onChange={setCode}
            inputType="numeric"
            autoFocus
            onComplete={() => setStep('backup')}
          />
          <Button
            disabled={code.length !== 6}
            onClick={() => setStep('backup')}
            style={{ width: '100%', marginTop: 16 }}
          >
            Verificar código
          </Button>
        </>
      )}

      {step === 'backup' && (
        <>
          <h3 style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--via-text-primary)' }}>Salve seus códigos de backup</h3>
          <p style={{ margin: '0 0 16px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>
            Use estes códigos se você perder acesso ao app. Cada um funciona uma vez só. Guarde no gerenciador de senhas.
          </p>
          <div style={{ padding: 20, background: 'var(--via-surface-2, rgba(10,31,59,0.03))', borderRadius: 12, marginBottom: 16, fontFamily: 'monospace', fontSize: 13, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {['8K3M-7F1Q', '4B9C-N3X2', 'P0R5-T8Y1', 'M2J4-K6L0', 'V9W3-X7Z2', 'Q1S4-R8U6'].map((c) => (
              <span key={c} style={{ color: 'var(--via-text-body)' }}>{c}</span>
            ))}
          </div>
          <Alert tone="attn" title="Você só vê uma vez">
            Não conseguimos mostrar os códigos de novo · salve agora ou gere outros depois.
          </Alert>
          <Button onClick={() => setStep('done')} style={{ width: '100%', marginTop: 16 }}>
            Salvei · concluir
          </Button>
        </>
      )}

      {step === 'done' && (
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%', background: 'var(--via-navy-08, rgba(10,31,59,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={28} strokeWidth={2.2} color="var(--via-text-primary)" />
          </div>
          <h3 style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--via-text-primary)' }}>2FA ativado</h3>
          <p style={{ margin: '0 0 20px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>
            Próximo login vai pedir o código de 6 dígitos. Pode desativar nas configurações de segurança.
          </p>
          <Button
            variant="ghost"
            onClick={() => {
              setStep('choose');
              setMethod(null);
              setCode('');
            }}
          >
            Recomeçar demo
          </Button>
        </div>
      )}
    </div>
  );
}

function MethodCard({ icon, title, sub, onClick }: { icon: React.ReactNode; title: string; sub: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 16,
        background: 'var(--via-surface-1)',
        border: '1px solid var(--via-border)',
        borderRadius: 12,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'all 0.2s cubic-bezier(.16,1,.3,1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--via-text-primary)';
        e.currentTarget.style.boxShadow = '0 12px 32px -20px rgba(10,31,59,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--via-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--via-navy-04, rgba(10,31,59,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--via-text-primary)' }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <strong style={{ display: 'block', fontSize: 14, color: 'var(--via-text-primary)' }}>{title}</strong>
        <span style={{ fontSize: 12, color: 'var(--via-text-muted)' }}>{sub}</span>
      </div>
    </button>
  );
}

function stepLabel(s: Step): string {
  return s === 'choose' ? '1 de 4 · método' : s === 'verify' ? '2 de 4 · verificar' : s === 'backup' ? '3 de 4 · backup' : '4 de 4 · pronto';
}
