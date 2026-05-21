import { useState } from 'react';
import {
  Mail, ShieldCheck, ArrowRight,
  KeyRound, Clock,
} from 'lucide-react';
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
        lede="3 fluxos de autenticação tratados como peça de marca — magic link (sem senha), 2FA com código de 6 dígitos, social login com providers. Cada um com atmosfera editorial, microcopy honesto e estado de transição cuidadoso."
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
      <div className="vds-auth-row">
        {/* Step 1 · enter email */}
        <article className="vds-auth-card via-mesh-navy via-noise">
          <div className="vds-auth-step">passo 1 · enviar link</div>
          <div className="vds-auth-brand">
            <BrandLogo variant="white" size="md" />
          </div>
          <h3>
            Entre com o <em>email</em> da conta.
          </h3>
          <p>
            A gente manda um link único pra você clicar — sem senha pra lembrar, sem reset esquecido.
          </p>
          <div className="vds-auth-field">
            <Mail size={13} strokeWidth={1.8} />
            <input type="email" aria-label="Email da conta" defaultValue="marisson@efizi.com.br" />
          </div>
          <button className="vds-auth-cta">
            Enviar link para meu email
            <ArrowRight size={13} strokeWidth={2.4} />
          </button>
          <p className="vds-auth-foot-link">
            Prefere com senha? <a href="#">Entrar do jeito antigo</a>
          </p>
        </article>

        {/* Step 2 · check email */}
        <article className="vds-auth-card success">
          <div className="vds-auth-step">passo 2 · cheque seu email</div>
          <div className="vds-auth-success-ring">
            <Mail size={22} strokeWidth={1.6} />
            <span className="vds-auth-success-ring-pulse" />
          </div>
          <h3>
            Confira sua caixa de <em>entrada</em>.
          </h3>
          <p>
            Um link de acesso foi enviado para <strong>marisson@efizi.com.br</strong>. Geralmente chega em até 30 segundos — verifique também o spam.
          </p>
          <div className="vds-auth-meta">
            <span className="vds-auth-meta-pill">
              <Clock size={11} strokeWidth={2} />
              Link expira em <strong>9:47</strong>
            </span>
          </div>
          <button className="vds-auth-cta ghost">
            Não chegou? Re-enviar link
          </button>
          <p className="vds-auth-foot-link">
            <a href="#">Usar outro email</a>
          </p>
        </article>
      </div>
    </Section>
  );
}

/* ---------- 2FA · 6 digit code ---------- */
function Auth2FASection() {
  const [code, setCode] = useState(['4', '2', '8', '3', '', '']);

  return (
    <Section title="2FA · código de 6 dígitos" meta="atmospheric navy + 6 inputs editoriais + recovery options">
      <article className="vds-auth-card-2fa via-mesh-navy via-noise">
        <div className="vds-auth-2fa-l">
          <div className="vds-auth-2fa-icon">
            <ShieldCheck size={22} strokeWidth={1.6} />
          </div>
          <span className="vds-auth-eyebrow">Verificação em 2 passos · ativa</span>
          <h3>
            Insira o código de <em>6 dígitos</em> do app.
          </h3>
          <p>
            Você ativou 2FA pra essa conta — quase lá. Pega o código atual no Google Authenticator (ou similar) e digita abaixo.
          </p>

          <div className="vds-auth-2fa-actions">
            <a href="#">Perdi acesso ao app · usar código de backup</a>
            <a href="#">Reenviar SMS · +55 ••••• 1820</a>
          </div>
        </div>

        <div className="vds-auth-2fa-r">
          <div className="vds-auth-2fa-inputs">
            {code.map((c, i) => (
              <input
                key={i}
                type="text"
                aria-label={`Dígito ${i + 1} do código de verificação`}
                inputMode="numeric"
                maxLength={1}
                value={c}
                onChange={(e) => {
                  const next = [...code];
                  next[i] = e.target.value.replace(/[^0-9]/g, '');
                  setCode(next);
                }}
                className={c ? 'filled' : ''}
              />
            ))}
          </div>

          <div className="vds-auth-2fa-timer">
            <Clock size={11} strokeWidth={2} />
            Novo código em <strong className="mono">00:24</strong>
          </div>

          <button className="vds-auth-cta">
            Continuar pra sua área
            <ArrowRight size={13} strokeWidth={2.4} />
          </button>

          <label className="vds-auth-2fa-trust">
            <input type="checkbox" aria-label="Confiar neste dispositivo por 30 dias" defaultChecked />
            <span className="vds-auth-2fa-trust-check" />
            <em>Confiar neste dispositivo por 30 dias</em>
          </label>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Social login ---------- */
function AuthSocialSection() {
  return (
    <Section title="Social login · 3 providers + email" meta="Google + Microsoft + Apple + separador + email tradicional">
      <article className="vds-auth-card light">
        <div className="vds-auth-brand">
          <BrandLogo variant="black" size="md" />
        </div>
        <h3 className="navy">
          Bem-vindo de <em>volta</em>.
        </h3>
        <p className="navy">
          Continue com o método que você usou antes — a gente conecta automático.
        </p>

        <div className="vds-auth-social">
          <button className="vds-auth-social-btn">
            <span className="vds-auth-social-icon google">G</span>
            <span>Continuar com Google</span>
            <span className="vds-auth-social-recent mono">último usado</span>
          </button>
          <button className="vds-auth-social-btn">
            <span className="vds-auth-social-icon ms">⊞</span>
            <span>Continuar com Microsoft</span>
          </button>
          <button className="vds-auth-social-btn">
            <span className="vds-auth-social-icon apple"></span>
            <span>Continuar com Apple</span>
          </button>
        </div>

        <div className="vds-auth-sep">
          <span>ou</span>
        </div>

        <div className="vds-auth-field light">
          <Mail size={13} strokeWidth={1.8} />
          <input type="email" aria-label="Email para magic link" placeholder="seu@email.com.br" />
        </div>

        <button className="vds-auth-cta navy">
          <KeyRound size={13} strokeWidth={2} />
          Receber magic link
        </button>

        <p className="vds-auth-foot-link navy">
          Novo por aqui? <a href="#">Criar conta gratuita</a>
        </p>
        <p className="vds-auth-terms">
          Ao continuar, você concorda com nossos <a href="#">Termos</a> e <a href="#">Política de privacidade</a>.
        </p>
      </article>
    </Section>
  );
}
