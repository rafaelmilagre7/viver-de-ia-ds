import { useState } from 'react';
import { ArrowRight, Check, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './login.css';

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className="vds-showcase auth via-mesh-navy via-noise">
      <div className="auth-aside">
        <div className="auth-brand">
          <span className="auth-brand-full">
            <BrandLogo variant="white" size="lg" />
          </span>
          <span className="auth-brand-compact">
            <BrandLogo variant="white" size="md" />
          </span>
        </div>
        <div className="auth-pull">
          <p className="vds-eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Manifesto · cinco princípios
          </p>
          <h2>
            Marca editorial,<br />engenharia <em>de precisão</em>.
          </h2>
          <p className="lede">
            "Aqui eu consigo ver rapidamente onde estou perdendo venda, onde posso subir margem e onde preciso agir primeiro."
          </p>
          <div className="quote-attrib">
            <span className="av">GD</span>
            <div>
              <strong>Guilherme Delorenzo</strong>
              <span>Founder · Efizi · E-commerce</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-card-wrap">
        <div className="auth-card">
          <header>
            <p className="vds-eyebrow">Painel do aluno</p>
            <h1>Bem-vindo de volta.</h1>
            <p className="lede">Entre com seu e-mail. Vamos te enviar um link mágico ou aceitar sua senha.</p>
          </header>

          <div className="auth-providers">
            <button className="prov google" type="button" aria-label="Continuar com Google">
              <span className="prov-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 10.9v2.6h6.1c-.25 1.58-1.84 4.63-6.1 4.63-3.67 0-6.66-3.04-6.66-6.79S8.33 4.55 12 4.55c2.09 0 3.49.89 4.29 1.66l2.92-2.81C17.34 1.65 14.9.7 12 .7 6.15.7.4 5.75.4 11.34S6.15 22 12 22c6.05 0 10.06-4.25 10.06-10.24 0-.69-.07-1.21-.17-1.73H12z" />
                </svg>
              </span>
              Google
            </button>
            <button className="prov apple" type="button" aria-label="Continuar com Apple">
              <span className="prov-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 12.53c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.72-1.35-.14-2.64.79-3.33.79-.69 0-1.75-.77-2.87-.75-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.83-1.22 1.18-2.4 1.2-2.47-.03-.01-2.3-.88-2.3-3.53zM14.88 5.9c.6-.73 1.01-1.75.93-2.76-.9.04-1.98.6-2.6 1.32-.56.64-1.05 1.67-.92 2.66.99.08 2 -.49 2.59-1.22z" />
                </svg>
              </span>
              Apple
            </button>
          </div>

          <div className="auth-divider"><span>ou com e-mail</span></div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="via-field">
              <label className="lbl">E-mail</label>
              <div className="val-with-icon">
                <Mail size={14} strokeWidth={2} className="leading-ico" />
                <input className="val" type="email" placeholder="voce@viverdeia.ai" defaultValue="rafael@viverdeia.ai" />
              </div>
            </div>

            <div className="via-field focused">
              <label className="lbl">Senha</label>
              <div className="val-with-icon">
                <Lock size={14} strokeWidth={2} className="leading-ico" />
                <input className="val" type={showPwd ? 'text' : 'password'} placeholder="••••••••" defaultValue="senha-forte-aqui" />
                <button
                  type="button"
                  className="leading-ico btn-ico"
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPwd ? <EyeOff size={14} strokeWidth={2} /> : <Eye size={14} strokeWidth={2} />}
                </button>
              </div>
            </div>

            <div className="auth-row">
              <label className="check">
                {/* Check do Lucide, não o glyph "✓" — a própria página de
                    iconografia bane caractere de texto como ícone. */}
                <span className="box checked"><Check size={11} strokeWidth={3} /></span>
                Lembrar de mim
              </label>
              <a className="link">Esqueci a senha</a>
            </div>

            <button className="auth-submit" type="submit">
              Entrar no painel
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </form>

          <p className="auth-foot">
            Ainda não tem conta? <a className="auth-foot-link">Criar conta da turma 2026.2 →</a>
          </p>
        </div>
      </div>
    </div>
  );
}
