import { useState } from 'react';
import { User, Bell, Lock, CreditCard, Globe, MessageCircle, ChevronRight, Camera, Check } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './aluno.css';   // .al-nav header (área-logada) usado também aqui
import './settings.css';

const tabs = [
  { v: 'profile', l: 'Perfil', I: User },
  { v: 'notif', l: 'Notificações', I: Bell },
  { v: 'security', l: 'Segurança', I: Lock },
  { v: 'billing', l: 'Pagamento', I: CreditCard },
  { v: 'locale', l: 'Idioma & região', I: Globe },
  { v: 'support', l: 'Suporte', I: MessageCircle },
];

export default function Settings() {
  const [active, setActive] = useState('profile');
  const [emailNotif, setEmailNotif] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);
  const [weekly, setWeekly] = useState(true);

  return (
    <div className="vds-showcase al">
      <header className="al-nav">
        <BrandLogo variant="black" size="md" />
        <nav>
          <a>Painel</a>
          <a>Mentoria</a>
          <a>Comunidade</a>
          <a>Cases</a>
        </nav>
        <div className="user">
          <span className="hi">Olá, <strong>Rafael</strong></span>
          <span className="av">RM</span>
        </div>
      </header>

      <div className="vds-set">
        <header className="vds-set-h">
          <p className="vds-eyebrow">Conta · ajustes</p>
          <h1>Suas <em>preferências</em>.</h1>
          <p className="lede">Tudo que controla como a Viver de IA fala com você — notificações, dados, idioma, pagamento.</p>
        </header>

        <div className="vds-set-grid">
          <aside className="vds-set-tabs">
            {tabs.map((t) => (
              <button
                key={t.v}
                className={`vds-set-tab ${active === t.v ? 'active' : ''}`}
                onClick={() => setActive(t.v)}
              >
                <span className="ico"><t.I size={14} strokeWidth={2} /></span>
                <span>{t.l}</span>
                <ChevronRight size={12} strokeWidth={2} className="chev" />
              </button>
            ))}
          </aside>

          <section className="vds-set-content">
            {active === 'profile' && (
              <>
                <div className="vds-set-card">
                  <header>
                    <p className="vds-eyebrow">Perfil público</p>
                    <h2>Como você aparece pra turma e nos cases.</h2>
                  </header>
                  <div className="vds-set-avatar-row">
                    <span className="vds-set-avatar">RM<button aria-label="Tirar foto" className="cam"><Camera size={11} strokeWidth={2.2} /></button></span>
                    <div>
                      <strong>Rafael Milagre</strong>
                      <span>Founder · Viver de IA</span>
                    </div>
                  </div>
                  <div className="vds-set-cols">
                    <div className="via-field">
                      <label className="lbl">Nome</label>
                      <input className="val" aria-label="Nome" defaultValue="Rafael Milagre" />
                    </div>
                    <div className="via-field">
                      <label className="lbl">Papel</label>
                      <input className="val" aria-label="Papel profissional" defaultValue="Founder · Viver de IA" />
                    </div>
                  </div>
                  <div className="via-field">
                    <label className="lbl">Bio profissional</label>
                    <textarea className="val" aria-label="Bio profissional" rows={3} defaultValue="Construo a Viver de IA. Antes disso, operador de e-commerce e mentor de operadores que estão indo pra IA agora." />
                  </div>
                </div>

                <div className="vds-set-card">
                  <header>
                    <p className="vds-eyebrow">Contato</p>
                    <h2>Como entramos em contato com você.</h2>
                  </header>
                  <div className="vds-set-cols">
                    <div className="via-field">
                      <label className="lbl">E-mail</label>
                      <input className="val" aria-label="E-mail" defaultValue="rafael@viverdeia.ai" />
                    </div>
                    <div className="via-field">
                      <label className="lbl">WhatsApp</label>
                      <input className="val" aria-label="WhatsApp" defaultValue="+55 11 99999-0000" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {active === 'notif' && (
              <div className="vds-set-card">
                <header>
                  <p className="vds-eyebrow">Notificações</p>
                  <h2>Onde a marca te encontra.</h2>
                </header>
                <div className="vds-set-toggles">
                  {[
                    { v: emailNotif, set: setEmailNotif, t: 'E-mail transactional', d: 'Confirmações de inscrição, comprovantes, links de sessão.' },
                    { v: whatsapp, set: setWhatsapp, t: 'WhatsApp · lembretes', d: 'Lembrete 1h antes de cada sessão ao vivo.' },
                    { v: weekly, set: setWeekly, t: 'Newsletter quinzenal', d: '3 cases curados a cada 15 dias, sextas pela manhã.' },
                  ].map((o) => (
                    <label key={o.t} className="vds-set-toggle">
                      <div>
                        <strong>{o.t}</strong>
                        <span>{o.d}</span>
                      </div>
                      <button
                        className={`via-switch ${o.v ? 'on' : ''}`}
                        onClick={() => o.set(!o.v)}
                        aria-pressed={o.v}
                      ><span className="dot" /></button>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {active === 'security' && (
              <div className="vds-set-card">
                <header>
                  <p className="vds-eyebrow">Segurança</p>
                  <h2>Senha, autenticação, sessões.</h2>
                </header>
                <ul className="vds-set-list">
                  <li>
                    <div>
                      <strong>Senha</strong>
                      <span>Atualizada há 3 meses.</span>
                    </div>
                    <button className="vds-set-action">Alterar</button>
                  </li>
                  <li>
                    <div>
                      <strong>2FA</strong>
                      <span>App autenticador · backup codes válidos.</span>
                    </div>
                    <span className="vds-set-badge ok"><Check size={11} strokeWidth={3} /> Ativo</span>
                  </li>
                  <li>
                    <div>
                      <strong>Sessões ativas</strong>
                      <span>3 dispositivos · Mac Pro · iPhone 15 · iPad mini.</span>
                    </div>
                    <button className="vds-set-action">Gerenciar</button>
                  </li>
                </ul>
              </div>
            )}

            {(active === 'billing' || active === 'locale' || active === 'support') && (
              <div className="vds-set-card placeholder">
                <header>
                  <p className="vds-eyebrow">Em construção</p>
                  <h2>Seção desenhada, conteúdo em escrita.</h2>
                  <p>Mesma régua editorial — cards de vidro, hairlines navy, toggles glass.</p>
                </header>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
