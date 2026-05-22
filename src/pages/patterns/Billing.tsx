import { useState } from 'react';
import { ArrowRight, ArrowLeft, CreditCard, Receipt, Check, Lock } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Input } from '../../lib/Input/Input';
import { Alert } from '../../lib/Alert/Alert';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './billing.css';

type Step = 0 | 1 | 2 | 3;
type Cycle = 'monthly' | 'annual';

const STEPS = [
  { id: 'plan', label: 'Plano' },
  { id: 'cycle', label: 'Ciclo' },
  { id: 'pay', label: 'Pagamento' },
  { id: 'review', label: 'Revisão' },
];

const PRINCIPLES = [
  { code: 'i', title: 'Resumo lateral sempre visível', body: 'Total + plano + ciclo persistem em todos os steps · user nunca perde o contexto da decisão.' },
  { code: 'ii', title: 'Sem countdown manipulativo', body: 'Não use "oferta expira em 3 min" · gera ansiedade e quebra confiança. Promoção tem prazo claro em data.' },
  { code: 'iii', title: 'Voltar não perde dados', body: 'Estado controlado preserva escolhas · user revisa sem refazer. Step posterior só ativa quando anterior é válido.' },
  { code: 'iv', title: 'Confirmação textual antes do submit', body: 'Step final lista tudo que vai acontecer · "Será cobrado R$ X · próxima cobrança em DD/MM". Sem surpresa.' },
];

export default function Billing() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · billing multi-step"
        title={<>Cobrar é claro — <em>cada passo mostra exatamente o que vai acontecer.</em></>}
        lede="Fluxo de cobrança em 4 passos editoriais (plano · ciclo · pagamento · revisão). Cada step mostra resumo lateral persistente · usuário sempre sabe o total. Sem dark pattern · sem 'oferta expira em 3 min'. Vale pra qualquer SaaS de assinatura."
      />

      <Section meta="fluxo completo" title="4 passos · plano → ciclo → pagamento → revisão">
        <p style={{ margin: '0 0 24px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.65 }}>
          Stepper editorial mostra progresso · resumo lateral persistente. Pode voltar a qualquer momento sem perder dados (estado controlado).
        </p>
        <div className="vds-billing">
          <BillingFlowDemo />
        </div>
      </Section>

      <Section meta="princípios editoriais" title="o que faz cobrança honesta">
        <div className="vds-billing-principles">
          {PRINCIPLES.map((p) => (
            <article key={p.code} className="vds-billing-principle">
              <span className="vds-billing-principle__code">{p.code}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function BillingFlowDemo() {
  const [step, setStep] = useState<Step>(0);
  const [plan, setPlan] = useState<'pro' | 'team'>('pro');
  const [cycle, setCycle] = useState<Cycle>('annual');
  const [card, setCard] = useState({ name: '', number: '', exp: '', cvc: '' });

  const planPrice = plan === 'pro' ? (cycle === 'annual' ? 2900 : 290) : cycle === 'annual' ? 8900 : 890;
  const monthly = cycle === 'annual' ? Math.round(planPrice / 12) : planPrice;
  const planName = plan === 'pro' ? 'Pro' : 'Team';

  return (
    <div className="vds-billing-grid">
      {/* Painel principal */}
      <div className="vds-billing-panel">
        {/* Stepper editorial */}
        <ol className="vds-billing-stepper" role="list">
          {STEPS.map((s, i) => (
            <li
              key={s.id}
              className={`vds-billing-step ${i < step ? 'is-done' : ''} ${i === step ? 'is-current' : ''}`}
              aria-current={i === step ? 'step' : undefined}
            >
              <span className="vds-billing-step__dot" aria-hidden="true">
                {i < step ? <Check size={13} strokeWidth={2.4} /> : i + 1}
              </span>
              <span className="vds-billing-step__label">{s.label}</span>
            </li>
          ))}
        </ol>

        <div className="vds-billing-step-content">
          {step === 0 && (
            <>
              <h3>Escolha o plano</h3>
              <p className="lede">Pode mudar depois sem multa · upgrade ou downgrade prorrateado.</p>
              <div className="vds-billing-plans" role="radiogroup" aria-label="Plano">
                <PlanRadio
                  selected={plan === 'pro'}
                  onSelect={() => setPlan('pro')}
                  name="Pro"
                  price="R$ 290"
                  per="/mês"
                  desc="4 sessões 1:1 · biblioteca completa · suporte prioritário"
                  badge={null}
                />
                <PlanRadio
                  selected={plan === 'team'}
                  onSelect={() => setPlan('team')}
                  name="Team"
                  price="R$ 890"
                  per="/mês"
                  desc="8 sessões · mentor dedicado · concierge no WhatsApp · onboarding white-glove"
                  badge="popular"
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3>Ciclo de cobrança</h3>
              <p className="lede">Anual sai 2 meses grátis em qualquer plano · sem fidelidade depois.</p>
              <div className="vds-billing-plans" role="radiogroup" aria-label="Ciclo">
                <PlanRadio
                  selected={cycle === 'monthly'}
                  onSelect={() => setCycle('monthly')}
                  name="Mensal"
                  price={`R$ ${plan === 'pro' ? '290' : '890'}`}
                  per="/mês"
                  desc="Cancele quando quiser · sem fidelidade · sem multa."
                  badge={null}
                />
                <PlanRadio
                  selected={cycle === 'annual'}
                  onSelect={() => setCycle('annual')}
                  name="Anual"
                  price={`R$ ${Math.round((plan === 'pro' ? 2900 : 8900) / 12)}`}
                  per="/mês equivalente"
                  desc="Cobrança única anual · 2 meses grátis incluídos."
                  badge="economia 17%"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Pagamento</h3>
              <p className="lede">Dados criptografados · não armazenamos cartão completo · processamento via Stripe.</p>
              <div className="vds-billing-fields">
                <Input
                  label="Nome no cartão"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  placeholder="Como aparece no cartão"
                />
                <Input
                  label="Número do cartão"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  placeholder="0000 0000 0000 0000"
                  iconLeft={<CreditCard size={14} />}
                />
                <div className="vds-billing-fields-row">
                  <Input
                    label="Validade"
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: e.target.value })}
                    placeholder="MM/AA"
                  />
                  <Input
                    label="CVC"
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                    placeholder="000"
                  />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Revisar antes de confirmar</h3>
              <p className="lede">Última etapa · vai cobrar agora e iniciar o acesso · garantia editorial de 14 dias.</p>
              <div className="vds-billing-review">
                <ReviewLine label="Plano" value={`${planName} · ${cycle === 'annual' ? 'anual' : 'mensal'}`} />
                <ReviewLine label="Cobrança hoje" value={`R$ ${planPrice.toLocaleString('pt-BR')}`} emph />
                <ReviewLine label="Próxima cobrança" value={cycle === 'annual' ? 'em 12 meses' : 'em 30 dias'} />
                <ReviewLine label="Cartão" value={card.number ? `•••• ${card.number.slice(-4) || '0000'}` : 'pendente'} />
              </div>
              <Alert tone="info" title="Garantia editorial · 14 dias">
                Se não fizer sentido até a 2ª semana, devolvemos · sem perguntas, sem fricção.
              </Alert>
            </>
          )}
        </div>

        {/* Navegação */}
        <div className="vds-billing-nav">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((step - 1) as Step)}
            iconLeft={<ArrowLeft size={13} />}
          >
            Voltar
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((step + 1) as Step)} iconRight={<ArrowRight size={13} />}>
              Avançar
            </Button>
          ) : (
            <Button iconLeft={<Lock size={13} />}>
              Confirmar · R$ {planPrice.toLocaleString('pt-BR')}
            </Button>
          )}
        </div>
      </div>

      {/* Resumo lateral · glass sticky */}
      <aside className="vds-billing-summary">
        <header className="vds-billing-summary__head">
          <Receipt size={13} strokeWidth={2} />
          <span>Resumo</span>
        </header>

        <div className="vds-billing-review">
          <ReviewLine label="Plano" value={planName} />
          <ReviewLine label="Ciclo" value={cycle === 'annual' ? 'Anual' : 'Mensal'} />
          <ReviewLine label="Equivalente · mês" value={`R$ ${monthly.toLocaleString('pt-BR')}`} />
        </div>

        <div className="vds-billing-summary__total">
          <div className="vds-billing-summary__total-row">
            <span className="vds-billing-summary__total-lbl">Total hoje</span>
            <span className="vds-billing-summary__total-val">R$ {planPrice.toLocaleString('pt-BR')}</span>
          </div>
          <p className="vds-billing-summary__total-hint">
            {cycle === 'annual'
              ? 'Cobrança única anual · 2 meses grátis incluídos.'
              : 'Cobrança mensal · cancele quando quiser.'}
          </p>
        </div>

        {step === 3 && (
          <div className="vds-billing-summary__ready" role="status">
            <Check size={13} strokeWidth={2.4} />
            <span>Pronto pra confirmar</span>
          </div>
        )}
      </aside>
    </div>
  );
}

function PlanRadio({
  selected,
  onSelect,
  name,
  price,
  per,
  desc,
  badge,
}: {
  selected: boolean;
  onSelect: () => void;
  name: string;
  price: string;
  per: string;
  desc: string;
  badge: string | null;
}) {
  return (
    <button
      type="button"
      className={`vds-billing-plan ${selected ? 'is-selected' : ''}`}
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
    >
      {badge && <span className="vds-billing-plan__badge">{badge}</span>}
      <span className="vds-billing-plan__radio" aria-hidden="true" />
      <div className="vds-billing-plan__copy">
        <div className="vds-billing-plan__row">
          <span className="vds-billing-plan__name">{name}</span>
          <span className="vds-billing-plan__price">
            {price}<em>{per}</em>
          </span>
        </div>
        <p className="vds-billing-plan__desc">{desc}</p>
      </div>
    </button>
  );
}

function ReviewLine({ label, value, emph = false }: { label: string; value: string; emph?: boolean }) {
  return (
    <div className={`vds-billing-review-line ${emph ? 'is-emph' : ''}`}>
      <span className="lbl">{label}</span>
      <span className="val">{value}</span>
    </div>
  );
}
