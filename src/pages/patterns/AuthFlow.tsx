import { useState } from 'react';
import { Mail, ShieldCheck, ArrowRight, KeyRound, Clock } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Input } from '../../lib/Input/Input';
import { OTPInput } from '../../lib/OTPInput/OTPInput';
import { Checkbox } from '../../lib/Checkbox/Checkbox';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import './auth-flow.css';

export default function AuthFlow() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · auth flow"
        title={
          <>
            Login, sem fricção desnecessária — <em>e com segurança visível</em>.
          </>
        }
        lede="3 fluxos de autenticação tratados como peça de marca — magic link (sem senha), 2FA com código de 6 dígitos, social login com providers. Papel claro, um botão por decisão, microcopy honesto e estado de transição cuidadoso."
      />

      <AuthMagicLinkSection />
      <Auth2FASection />
      <AuthSocialSection />
    </>
  );
}

/* ---------- Magic Link ---------- */
function AuthMagicLinkSection() {
  return (
    <Section title="Magic link · sem senha" meta="email + 1 botão · link expira em 10min · re-enviar disponível">
      <div className="vds-af-row">
        {/* Passo 1 · enviar link */}
        <article className="vds-af-card">
          <span className="vds-af-step">Passo 1 · enviar link</span>
          <div className="vds-af-brand">
            <BrandLogo variant="auto" size="md" />
          </div>
          <h3>
            Entre com o <em>email</em> da conta.
          </h3>
          <p>
            A gente manda um link único pra você clicar — sem senha pra lembrar, sem reset esquecido.
          </p>
          <Input
            aria-label="Email da conta"
            type="email"
            defaultValue="marisson@efizi.com.br"
            iconLeft={<Mail size={16} strokeWidth={1.75} />}
          />
          <Button size="lg" fullWidth iconRight={<ArrowRight size={16} strokeWidth={1.75} />}>
            Enviar link para meu email
          </Button>
          <p className="vds-af-foot">
            Prefere com senha? <a href="#">Entrar do jeito antigo</a>
          </p>
        </article>

        {/* Passo 2 · conferir caixa de entrada */}
        <article className="vds-af-card">
          <span className="vds-af-step">Passo 2 · cheque seu email</span>
          <div className="vds-af-sent" aria-hidden="true">
            <Mail size={24} strokeWidth={1.75} />
            <span className="vds-af-sent-pulse" />
          </div>
          <h3>
            Confira sua caixa de <em>entrada</em>.
          </h3>
          <p>
            Um link de acesso foi enviado para <strong>marisson@efizi.com.br</strong>. Geralmente chega em até 30 segundos — verifique também o spam.
          </p>
          <span className="vds-af-meta">
            <Clock size={16} strokeWidth={1.75} />
            Link expira em <strong>9:47</strong>
          </span>
          <Button variant="secondary" size="lg" fullWidth>
            Não chegou? Reenviar link
          </Button>
          <p className="vds-af-foot">
            <a href="#">Usar outro email</a>
          </p>
        </article>
      </div>
    </Section>
  );
}

/* ---------- 2FA · 6 digit code ---------- */
function Auth2FASection() {
  const [code, setCode] = useState('4283');

  return (
    <Section title="2FA · código de 6 dígitos" meta="papel claro · 6 células · saídas de recuperação à vista">
      <article className="vds-af-card vds-af-card--split">
        <div className="vds-af-2fa-l">
          <div className="vds-af-2fa-icon" aria-hidden="true">
            <ShieldCheck size={24} strokeWidth={1.75} />
          </div>
          <span className="vds-af-status">Verificação em 2 passos ativa</span>
          <h3>
            Insira o código de <em>6 dígitos</em> do app.
          </h3>
          <p>
            Você ativou 2FA pra essa conta — quase lá. Pega o código atual no Google Authenticator (ou similar) e digita ao lado.
          </p>
          <div className="vds-af-2fa-links">
            <a href="#">Perdi acesso ao app · usar código de backup</a>
            <a href="#">Reenviar SMS · +55 ••••• 1820</a>
          </div>
        </div>

        <div className="vds-af-2fa-r">
          <OTPInput length={6} value={code} onChange={setCode} inputType="numeric" label="Código de verificação" />
          <span className="vds-af-meta">
            <Clock size={16} strokeWidth={1.75} />
            Novo código em <strong>00:24</strong>
          </span>
          <Button size="lg" fullWidth iconRight={<ArrowRight size={16} strokeWidth={1.75} />}>
            Continuar pra sua área
          </Button>
          <Checkbox label="Confiar neste dispositivo por 30 dias" defaultChecked />
        </div>
      </article>
    </Section>
  );
}

/* ---------- Social login ---------- */
function AuthSocialSection() {
  return (
    <Section title="Social login · 3 providers + email" meta="Google + Microsoft + Apple + separador + email tradicional">
      <article className="vds-af-card vds-af-card--narrow">
        <div className="vds-af-brand">
          <BrandLogo variant="auto" size="md" />
        </div>
        <h3>
          Bem-vindo de <em>volta</em>.
        </h3>
        <p>
          Continue com o método que você usou antes — a gente conecta automático.
        </p>

        <div className="vds-af-social">
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            className="vds-af-provider"
            iconLeft={<span className="vds-af-provider-mark google" aria-hidden="true">G</span>}
            iconRight={<span className="vds-af-recent">último usado</span>}
          >
            Continuar com Google
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            className="vds-af-provider"
            iconLeft={<span className="vds-af-provider-mark" aria-hidden="true">⊞</span>}
          >
            Continuar com Microsoft
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            className="vds-af-provider"
            iconLeft={<span className="vds-af-provider-mark apple" aria-hidden="true"></span>}
          >
            Continuar com Apple
          </Button>
        </div>

        <div className="vds-af-sep" role="separator">
          <span>ou</span>
        </div>

        <Input
          aria-label="Email para magic link"
          type="email"
          placeholder="seu@email.com.br"
          iconLeft={<Mail size={16} strokeWidth={1.75} />}
        />
        <Button size="lg" fullWidth iconLeft={<KeyRound size={16} strokeWidth={1.75} />}>
          Receber magic link
        </Button>

        <p className="vds-af-foot">
          Novo por aqui? <a href="#">Criar conta gratuita</a>
        </p>
        <p className="vds-af-terms">
          Ao continuar, você concorda com nossos <a href="#">Termos</a> e <a href="#">Política de privacidade</a>.
        </p>
      </article>
    </Section>
  );
}
