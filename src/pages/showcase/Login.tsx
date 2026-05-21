import { useState } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './login.css';

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className="vds-showcase auth via-mesh-navy via-noise">
      <div className="auth-aside">
        <div className="auth-brand">
          <BrandLogo variant="white" size="lg" />
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
            <button className="prov google">
              <span className="prov-ico" aria-hidden="true">G</span>
              Continuar com Google
            </button>
            <button className="prov apple">
              <span className="prov-ico" aria-hidden="true"></span>
              Continuar com Apple
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
                <span className="box checked">✓</span>
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
            Ainda não tem conta? <a>Criar conta da turma 2026.2 →</a>
          </p>
        </div>
      </div>
    </div>
  );
}
