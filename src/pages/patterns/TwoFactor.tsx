import { useState } from 'react';
import { Shield, Smartphone, Key, Check, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { OTPInput } from '../../lib/OTPInput/OTPInput';
import { Alert } from '../../lib/Alert/Alert';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './two-factor.css';

type Step = 'choose' | 'verify' | 'backup' | 'done';
type Method = 'app' | 'sms';

const STEP_ANATOMY = [
  { title: 'Escolher método', purpose: 'App, SMS ou códigos de backup.', copyHint: '"App de autenticação é mais seguro — funciona offline."' },
  { title: 'Configurar', purpose: 'Mostra QR code ou número.', copyHint: '"Escaneie o QR no Google Authenticator ou Authy."' },
  { title: 'Verificar', purpose: 'Confirma com código de 6 dígitos.', copyHint: '"Digite o código atual gerado pelo app."' },
  { title: 'Backup', purpose: 'Códigos pra recuperar acesso.', copyHint: '"Salve no gerenciador de senhas — você só vê uma vez."' },
];

const BACKUP_CODES = ['8K3M-7F1Q', '4B9C-N3X2', 'P0R5-T8Y1', 'M2J4-K6L0', 'V9W3-X7Z2', 'Q1S4-R8U6'];

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

      <Section meta="fluxo completo" title="4 passos · método, verificação, backup">
        <p style={{ margin: '0 0 32px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.65 }}>
          Cada step é focado · não pede pra fazer tudo de uma vez. Sai do flow voltando ou cancelando · estado preservado se voltar.
        </p>
        <div className="vds-2fa">
          <TwoFactorFlowDemo />
        </div>
      </Section>

      <Section meta="anatomia editorial" title="o que cada step ensina">
        <div className="vds-2fa-anatomy">
          {STEP_ANATOMY.map((s, i) => (
            <article key={i} className="vds-2fa-anatomy-card">
              <span className="vds-2fa-anatomy-card__step">step {i + 1}</span>
              <h3>{s.title}</h3>
              <p className="purpose">{s.purpose}</p>
              <p className="hint">{s.copyHint}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function TwoFactorFlowDemo() {
  const [step, setStep] = useState<Step>('choose');
  const [method, setMethod] = useState<Method | null>(null);
  const [code, setCode] = useState('');

  return (
    <div className="vds-2fa-card">
      <div className="vds-2fa-card__head">
        <span className="vds-2fa-card__icon" aria-hidden="true">
          <Shield size={17} strokeWidth={1.8} />
        </span>
        <span className="vds-2fa-card__eyebrow">Configurar 2FA</span>
        <span className="vds-2fa-card__counter">{stepLabel(step)}</span>
      </div>

      {step === 'choose' && (
        <div className="vds-2fa-step">
          <h3>Como você quer receber o código?</h3>
          <p className="lede">App de autenticação é mais seguro — funciona offline e não depende do celular.</p>
          <div className="vds-2fa-methods" role="radiogroup" aria-label="Método 2FA">
            <MethodCard
              icon={<Smartphone size={18} strokeWidth={1.8} />}
              title="App de autenticação"
              sub="Google Authenticator, Authy, 1Password · recomendado"
              onClick={() => {
                setMethod('app');
                setStep('verify');
              }}
            />
            <MethodCard
              icon={<Key size={18} strokeWidth={1.8} />}
              title="SMS"
              sub="Receber por mensagem · menos seguro, mas funciona"
              onClick={() => {
                setMethod('sms');
                setStep('verify');
              }}
            />
          </div>
        </div>
      )}

      {step === 'verify' && (
        <div className="vds-2fa-step">
          <div className="vds-2fa-back">
            <Button variant="ghost" size="sm" iconLeft={<ArrowLeft size={13} />} onClick={() => setStep('choose')}>
              Voltar
            </Button>
          </div>
          <h3>{method === 'app' ? 'Escaneie o QR code' : 'Confirme seu número'}</h3>
          <p className="lede">
            {method === 'app'
              ? 'Abra seu app de autenticação e adicione o código abaixo. Depois digite o código atual.'
              : 'Enviamos um código de 6 dígitos pro seu celular. Digite abaixo.'}
          </p>

          {method === 'app' && (
            <div className="vds-2fa-qr-wrap">
              <div className="vds-2fa-qr" aria-hidden="true" />
              <span className="vds-2fa-qr-caption">QR · escaneie no app</span>
            </div>
          )}

          <div className="vds-2fa-otp-wrap">
            <OTPInput
              length={6}
              value={code}
              onChange={setCode}
              inputType="numeric"
              autoFocus
              onComplete={() => setStep('backup')}
            />
          </div>
          <div className="vds-2fa-cta-wide">
            <Button disabled={code.length !== 6} onClick={() => setStep('backup')}>
              Verificar código
            </Button>
          </div>
        </div>
      )}

      {step === 'backup' && (
        <div className="vds-2fa-step">
          <h3>Salve seus códigos de backup</h3>
          <p className="lede">
            Use estes códigos se você perder acesso ao app. Cada um funciona uma vez só. Guarde no gerenciador de senhas.
          </p>
          <div className="vds-2fa-backup" role="list" aria-label="Códigos de backup">
            {BACKUP_CODES.map((c) => (
              <span key={c} className="vds-2fa-backup-code" role="listitem">{c}</span>
            ))}
          </div>
          <Alert tone="attn" title="Você só vê uma vez">
            Não conseguimos mostrar os códigos de novo · salve agora ou gere outros depois.
          </Alert>
          <div className="vds-2fa-cta-wide">
            <Button onClick={() => setStep('done')}>Salvei · concluir</Button>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="vds-2fa-done">
          <div className="vds-2fa-done__tile" aria-hidden="true">
            <Check size={32} strokeWidth={2.4} />
          </div>
          <h3>2FA ativado</h3>
          <p>Próximo login vai pedir o código de 6 dígitos. Pode desativar nas configurações de segurança.</p>
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

function MethodCard({
  icon,
  title,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="vds-2fa-method" onClick={onClick}>
      <span className="vds-2fa-method__icon" aria-hidden="true">{icon}</span>
      <span className="vds-2fa-method__copy">
        <strong className="vds-2fa-method__title">{title}</strong>
        <span className="vds-2fa-method__sub">{sub}</span>
      </span>
      <ChevronRight size={14} strokeWidth={2} className="vds-2fa-method__chev" />
    </button>
  );
}

function stepLabel(s: Step): string {
  return s === 'choose'
    ? '1 de 4 · método'
    : s === 'verify'
    ? '2 de 4 · verificar'
    : s === 'backup'
    ? '3 de 4 · backup'
    : '4 de 4 · pronto';
}
