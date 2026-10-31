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
  { code: 'ii', title: 'Sem countdown manipulativo', body: 'Não use “oferta expira em 3 min” · gera ansiedade e quebra confiança. Promoção tem prazo claro em data.' },
  { code: 'iii', title: 'Voltar não perde dados', body: 'Estado controlado preserva escolhas · user revisa sem refazer. Step posterior só ativa quando anterior é válido.' },
  { code: 'iv', title: 'Confirmação textual antes do submit', body: 'Step final lista tudo que vai acontecer · “Será cobrado R$ X · próxima cobrança em DD/MM”. Sem surpresa.' },
];

export default function Billing() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · cobrança em etapas"
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

  const planPrice = plan === 'pro' ? (cycle === 'annual' ? 45360 : 3780) : cycle === 'annual' ? 74160 : 6180;
  const monthly = cycle === 'annual' ? Math.round(planPrice / 12) : planPrice;
  const planName = plan === 'pro' ? 'Pro' : 'Enterprise';

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
                {i < step ? <Check size={14} strokeWidth={1.75} /> : i + 1}
              </span>
              <span className="vds-billing-step__label">{s.label}</span>
            </li>
          ))}
        </ol>

        <div className="vds-billing-step-content">
          {step === 0 && (
            <>
              <h3>Escolha o plano</h3>
              <p className="lede">Upgrade a qualquer momento, pela diferença de valor.</p>
              <div className="vds-billing-plans" role="radiogroup" aria-label="Plano">
                <PlanRadio
                  selected={plan === 'pro'}
                  onSelect={() => setPlan('pro')}
                  name="Pro"
                  price="R$ 3.780"
                  per="/mês"
                  desc="Soluções · formações · Consultor IA · 10 check-ins/mês de mentoria em grupo"
                  badge={null}
                />
                <PlanRadio
                  selected={plan === 'team'}
                  onSelect={() => setPlan('team')}
                  name="Enterprise"
                  price="R$ 6.180"
                  per="/mês"
                  desc="Tudo do Pro · 1 hora/mês de mentoria individual · arquiteto de soluções AI Builder"
                  badge="corporativo"
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3>Ciclo de cobrança</h3>
              <p className="lede">Todo plano é em contratação anual · escolha como pagar o contrato.</p>
              <div className="vds-billing-plans" role="radiogroup" aria-label="Ciclo">
                <PlanRadio
                  selected={cycle === 'monthly'}
                  onSelect={() => setCycle('monthly')}
                  name="Mensal"
                  price={`R$ ${plan === 'pro' ? '3.780' : '6.180'}`}
                  per="/mês"
                  desc="Contrato anual · cobrança mês a mês no cartão."
                  badge={null}
                />
                <PlanRadio
                  selected={cycle === 'annual'}
                  onSelect={() => setCycle('annual')}
                  name="Anual"
                  price={`R$ ${plan === 'pro' ? '3.780' : '6.180'}`}
                  per="/mês equivalente"
                  desc="Contrato anual · cobrança única · [condições]."
                  badge="à vista"
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
                  iconLeft={<CreditCard size={16} />}
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
              <p className="lede">Última etapa · vai cobrar agora e iniciar o acesso · garantia de 90 dias.</p>
              <div className="vds-billing-review">
                <ReviewLine label="Plano" value={`${planName} · ${cycle === 'annual' ? 'anual' : 'mensal'}`} />
                <ReviewLine label="Cobrança hoje" value={`R$ ${planPrice.toLocaleString('pt-BR')}`} emph />
                <ReviewLine label="Próxima cobrança" value={cycle === 'annual' ? 'em 12 meses' : 'em 30 dias'} />
                <ReviewLine label="Cartão" value={card.number ? `•••• ${card.number.slice(-4) || '0000'}` : 'pendente'} />
              </div>
              <Alert tone="info" title="Garantia · 90 dias">
                100% do investimento de volta se, em 90 dias, não houver aumento de receita nem redução de custos · requisitos na cláusula 7 dos termos de uso.
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
            iconLeft={<ArrowLeft size={14} />}
          >
            Voltar
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((step + 1) as Step)} iconRight={<ArrowRight size={14} />}>
              Avançar
            </Button>
          ) : (
            <Button iconLeft={<Lock size={14} />}>
              Confirmar · R$ {planPrice.toLocaleString('pt-BR')}
            </Button>
          )}
        </div>
      </div>

      {/* Resumo lateral · glass sticky */}
      <aside className="vds-billing-summary">
        <header className="vds-billing-summary__head">
          <Receipt size={14} strokeWidth={1.75} />
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
            <span className="vds-billing-summary__total-val via-num">R$ {planPrice.toLocaleString('pt-BR')}</span>
          </div>
          <p className="vds-billing-summary__total-hint">
            {cycle === 'annual'
              ? 'Contrato anual · cobrança única.'
              : 'Contrato anual · cobrança mês a mês.'}
          </p>
        </div>

        {step === 3 && (
          <div className="vds-billing-summary__ready" role="status">
            <Check size={14} strokeWidth={1.75} />
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
          <span className="vds-billing-plan__price via-num">
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
      <span className="val via-num">{value}</span>
    </div>
  );
}
