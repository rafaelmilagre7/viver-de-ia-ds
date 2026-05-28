import { useState } from 'react';
import {
  Check, ArrowRight, ArrowLeft, Shield, Lock, CreditCard, Landmark,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './checkout.css';

/* ============================================================
   Checkout multi-etapa · página-modelo
   3 etapas · resumo sticky · sem dark pattern
   Campos de pagamento são MOCKUP visual (não funcional).
   ============================================================ */

type Step = 1 | 2 | 3;

const planos = [
  { id: '12x', t: '12× sem juros', sub: 'R$ 480/mês', total: 'R$ 5.760 total', rec: false },
  { id: 'vista', t: 'À vista', sub: 'R$ 4.800', total: 'economize R$ 960', rec: true },
];

export default function ShowcaseCheckout() {
  const [step, setStep] = useState<Step>(1);
  const [plano, setPlano] = useState('vista');
  const [pgto, setPgto] = useState<'cartao' | 'pix'>('cartao');

  const planoSel = planos.find((p) => p.id === plano)!;

  return (
    <div className="vds-showcase ckt">
      {/* NAV minimal */}
      <header className="ckt-nav">
        <BrandLogo variant="black" size="md" />
        <span className="ckt-secure"><Lock size={12} strokeWidth={2.2} /> Pagamento seguro</span>
      </header>

      <div className="ckt-body">
        {/* Form column */}
        <main className="ckt-main">
          {/* Stepper */}
          <div className="ckt-stepper">
            {[
              { n: 1, t: 'Plano' },
              { n: 2, t: 'Seus dados' },
              { n: 3, t: 'Pagamento' },
            ].map((s) => (
              <div key={s.n} className={`ckt-step ${step === s.n ? 'active' : ''} ${step > s.n ? 'done' : ''}`}>
                <span className="ckt-step-num">{step > s.n ? <Check size={13} strokeWidth={2.6} /> : s.n}</span>
                <span className="ckt-step-label">{s.t}</span>
              </div>
            ))}
          </div>

          {/* STEP 1 · Plano */}
          {step === 1 && (
            <div className="ckt-panel">
              <h2>Escolha como pagar</h2>
              <p className="ckt-panel-sub">Mesmo acesso completo. Escolha o que cabe no seu fluxo.</p>
              <div className="ckt-planos">
                {planos.map((p) => (
                  <button
                    key={p.id}
                    className={`ckt-plano ${plano === p.id ? 'selected' : ''}`}
                    onClick={() => setPlano(p.id)}
                  >
                    <span className="ckt-plano-radio">{plano === p.id && <span />}</span>
                    <div className="ckt-plano-info">
                      <strong>{p.t}</strong>
                      <em>{p.sub}</em>
                    </div>
                    <span className="ckt-plano-total">{p.total}</span>
                    {p.rec && <span className="ckt-plano-badge">recomendado</span>}
                  </button>
                ))}
              </div>
              <button className="ckt-next" onClick={() => setStep(2)}>
                Continuar
                <ArrowRight size={15} strokeWidth={2.4} />
              </button>
            </div>
          )}

          {/* STEP 2 · Dados */}
          {step === 2 && (
            <div className="ckt-panel">
              <h2>Seus dados</h2>
              <p className="ckt-panel-sub">Pra emitir a nota e liberar o acesso.</p>
              <div className="ckt-fields">
                <label className="ckt-field">
                  <span>Nome completo</span>
                  <input type="text" placeholder="Rafael Milagre" />
                </label>
                <label className="ckt-field">
                  <span>Email</span>
                  <input type="email" placeholder="rafael@viverdeia.ai" />
                </label>
                <label className="ckt-field">
                  <span>Telefone</span>
                  <input type="tel" placeholder="(48) 99999-9999" />
                </label>
                <label className="ckt-field">
                  <span>CPF</span>
                  <input type="text" placeholder="000.000.000-00" />
                </label>
              </div>
              <div className="ckt-nav-row">
                <button className="ckt-back" onClick={() => setStep(1)}>
                  <ArrowLeft size={15} strokeWidth={2.4} />
                  Voltar
                </button>
                <button className="ckt-next" onClick={() => setStep(3)}>
                  Continuar
                  <ArrowRight size={15} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 · Pagamento */}
          {step === 3 && (
            <div className="ckt-panel">
              <h2>Pagamento</h2>
              <p className="ckt-panel-sub">Ambiente seguro · seus dados são criptografados.</p>

              <div className="ckt-pgto-tabs">
                <button className={pgto === 'cartao' ? 'active' : ''} onClick={() => setPgto('cartao')}>
                  <CreditCard size={15} strokeWidth={2} /> Cartão
                </button>
                <button className={pgto === 'pix' ? 'active' : ''} onClick={() => setPgto('pix')}>
                  <Landmark size={15} strokeWidth={2} /> Pix
                </button>
              </div>

              {pgto === 'cartao' ? (
                <div className="ckt-fields">
                  <label className="ckt-field">
                    <span>Número do cartão</span>
                    <input type="text" placeholder="0000 0000 0000 0000" inputMode="numeric" />
                  </label>
                  <div className="ckt-fields-row">
                    <label className="ckt-field">
                      <span>Validade</span>
                      <input type="text" placeholder="MM/AA" />
                    </label>
                    <label className="ckt-field">
                      <span>CVV</span>
                      <input type="text" placeholder="000" inputMode="numeric" />
                    </label>
                  </div>
                  <label className="ckt-field">
                    <span>Nome impresso no cartão</span>
                    <input type="text" placeholder="RAFAEL MILAGRE" />
                  </label>
                </div>
              ) : (
                <div className="ckt-pix">
                  <div className="ckt-pix-qr" aria-hidden="true">
                    <div className="ckt-pix-qr-grid">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <span key={i} className={Math.random() > 0.5 ? 'on' : ''} />
                      ))}
                    </div>
                  </div>
                  <div className="ckt-pix-info">
                    <strong>Pague com Pix e libere o acesso na hora</strong>
                    <p>Escaneie o QR code ou copie o código. A confirmação é automática.</p>
                    <button className="ckt-pix-copy">Copiar código Pix</button>
                  </div>
                </div>
              )}

              <div className="ckt-nav-row">
                <button className="ckt-back" onClick={() => setStep(2)}>
                  <ArrowLeft size={15} strokeWidth={2.4} />
                  Voltar
                </button>
                <button className="ckt-confirm">
                  <Lock size={14} strokeWidth={2.2} />
                  Finalizar · {planoSel.id === 'vista' ? 'R$ 4.800' : '12× R$ 480'}
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Resumo sticky */}
        <aside className="ckt-summary">
          <span className="ckt-summary-eyebrow">resumo do pedido</span>
          <div className="ckt-summary-item">
            <div>
              <strong>Programa Viver de IA</strong>
              <em>Turma 2026.3 · 4 meses</em>
            </div>
          </div>

          <ul className="ckt-summary-incl">
            <li><Check size={13} strokeWidth={2.4} /> Mentoria 1:1 individual</li>
            <li><Check size={13} strokeWidth={2.4} /> Comunidade de 220 operadores</li>
            <li><Check size={13} strokeWidth={2.4} /> Acesso vitalício ao material</li>
            <li><Check size={13} strokeWidth={2.4} /> Certificado de conclusão</li>
          </ul>

          <div className="ckt-summary-total">
            <span>Total</span>
            <strong>{planoSel.id === 'vista' ? 'R$ 4.800' : '12× R$ 480'}</strong>
          </div>

          <div className="ckt-summary-guarantee">
            <Shield size={15} strokeWidth={2} />
            <div>
              <strong>7 dias de garantia</strong>
              <p>Não era pra você? Devolvemos 100%. Sem perguntas.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
