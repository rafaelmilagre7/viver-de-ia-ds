import { useState } from 'react';
import { ArrowRight, ArrowLeft, CreditCard, Receipt, Check, Lock } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Input } from '../../lib/Input/Input';
import { Stepper } from '../../lib/Stepper/Stepper';
import { RadioGroup } from '../../lib/RadioGroup/RadioGroup';
import { Pill } from '../../lib/Pill/Pill';
import { Alert } from '../../lib/Alert/Alert';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

type Step = 0 | 1 | 2 | 3;
type Cycle = 'monthly' | 'annual';

export default function Billing() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · billing multi-step"
        title={<>Cobrar é claro — <em>cada passo mostra exatamente o que vai acontecer.</em></>}
        lede="Fluxo de cobrança em 4 passos editoriais (plano · ciclo · pagamento · revisão). Cada step mostra resumo lateral persistente · usuário sempre sabe o total. Sem dark pattern · sem 'oferta expira em 3 min'. Vale pra qualquer SaaS de assinatura."
      />

      <Section
        meta="fluxo completo"
        title="4 passos · plano → ciclo → pagamento → revisão">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Stepper editorial mostra progresso · resumo lateral persistente. Pode voltar a qualquer momento sem perder dados (estado controlado).</p>
        <BillingFlowDemo />
      </Section>

      <Section meta="princípios editoriais" title="o que faz cobrança honesta">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {PRINCIPLES.map((p) => (
            <div key={p.code} className="vds-card vds-card--glass" style={{ padding: 20 }}>
              <Pill variant="default" size="sm">{p.code}</Pill>
              <h3 style={{ margin: '12px 0 6px', fontSize: 15, color: 'var(--via-text-primary)' }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--via-text-muted)', lineHeight: 1.65 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

const PRINCIPLES = [
  { code: 'i', title: 'Resumo lateral sempre visível', body: 'Total + plano + ciclo persistem em todos os steps · user nunca perde o contexto da decisão.' },
  { code: 'ii', title: 'Sem countdown manipulativo', body: 'Não use "oferta expira em 3 min" · gera ansiedade e quebra confiança. Promoção tem prazo claro em data.' },
  { code: 'iii', title: 'Voltar não perde dados', body: 'Estado controlado preserva escolhas · user revisa sem refazer. Step posterior só ativa quando anterior é válido.' },
  { code: 'iv', title: 'Confirmação textual antes do submit', body: 'Step final lista tudo que vai acontecer · "Será cobrado R$ X · próxima cobrança em DD/MM". Sem surpresa.' },
];

function BillingFlowDemo() {
  const [step, setStep] = useState<Step>(0);
  const [plan, setPlan] = useState('pro');
  const [cycle, setCycle] = useState<Cycle>('annual');
  const [card, setCard] = useState({ name: '', number: '', exp: '', cvc: '' });

  const planPrice = plan === 'pro' ? (cycle === 'annual' ? 2900 : 290) : plan === 'team' ? (cycle === 'annual' ? 8900 : 890) : 0;
  const monthly = cycle === 'annual' ? Math.round(planPrice / 12) : planPrice;
  const planName = plan === 'pro' ? 'Pro' : plan === 'team' ? 'Team' : 'Free';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 24, alignItems: 'start' }}>
      {/* Painel principal */}
      <div style={{ padding: 28, background: 'var(--via-surface-1)', border: '1px solid var(--via-border)', borderRadius: 16 }}>
        <Stepper
          current={step}
          steps={[
            { id: 'plan', label: 'Plano' },
            { id: 'cycle', label: 'Ciclo' },
            { id: 'pay', label: 'Pagamento' },
            { id: 'review', label: 'Revisão' },
          ]}
        />

        <div style={{ marginTop: 28 }}>
          {step === 0 && (
            <>
              <h3 style={{ margin: '0 0 6px', fontSize: 20, color: 'var(--via-text-primary)' }}>Escolha o plano</h3>
              <p style={{ margin: '0 0 18px', fontSize: 13.5, color: 'var(--via-text-muted)' }}>Pode mudar depois sem multa.</p>
              <RadioGroup
                ariaLabel="Plano"
                value={plan}
                onValueChange={setPlan}
                options={[
                  { value: 'pro', label: 'Pro · R$ 290/mês', description: '4 sessões 1:1 · biblioteca completa · suporte prioritário' },
                  { value: 'team', label: 'Team · R$ 890/mês', description: '8 sessões · mentor dedicado · concierge no WhatsApp' },
                ]}
              />
            </>
          )}

          {step === 1 && (
            <>
              <h3 style={{ margin: '0 0 6px', fontSize: 20, color: 'var(--via-text-primary)' }}>Ciclo de cobrança</h3>
              <p style={{ margin: '0 0 18px', fontSize: 13.5, color: 'var(--via-text-muted)' }}>Anual sai 2 meses grátis em qualquer plano.</p>
              <RadioGroup
                ariaLabel="Ciclo"
                value={cycle}
                onValueChange={(v) => setCycle(v as Cycle)}
                options={[
                  { value: 'monthly', label: 'Mensal', description: 'R$ ' + (plan === 'pro' ? '290' : '890') + '/mês · cancele quando quiser' },
                  { value: 'annual', label: 'Anual', description: 'R$ ' + Math.round((plan === 'pro' ? 2900 : 8900) / 12) + '/mês equivalente · 2 meses grátis' },
                ]}
              />
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ margin: '0 0 6px', fontSize: 20, color: 'var(--via-text-primary)' }}>Pagamento</h3>
              <p style={{ margin: '0 0 18px', fontSize: 13.5, color: 'var(--via-text-muted)' }}>Dados criptografados · não armazenamos cartão completo.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
              <h3 style={{ margin: '0 0 6px', fontSize: 20, color: 'var(--via-text-primary)' }}>Revisar antes de confirmar</h3>
              <p style={{ margin: '0 0 18px', fontSize: 13.5, color: 'var(--via-text-muted)' }}>Última etapa · vai cobrar agora e iniciar o acesso.</p>
              <div style={{ padding: 18, background: 'var(--via-surface-2, rgba(10,31,59,0.03))', borderRadius: 12, marginBottom: 14 }}>
                <ReviewLine label="Plano" value={`${planName} · ${cycle === 'annual' ? 'anual' : 'mensal'}`} />
                <ReviewLine label="Cobrança hoje" value={`R$ ${planPrice.toLocaleString('pt-BR')}`} />
                <ReviewLine label="Próxima cobrança" value={cycle === 'annual' ? 'em 12 meses' : 'em 30 dias'} />
                <ReviewLine label="Cartão" value={card.number ? `•••• ${card.number.slice(-4) || '0000'}` : 'pendente'} last />
              </div>
              <Alert tone="info" title="Garantia editorial · 14 dias">
                Se não fizer sentido até a 2ª semana, devolvemos · sem perguntas, sem fricção.
              </Alert>
            </>
          )}
        </div>

        {/* Footer de navegação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 12 }}>
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
            <Button iconLeft={<Lock size={13} />}>Confirmar · R$ {planPrice.toLocaleString('pt-BR')}</Button>
          )}
        </div>
      </div>

      {/* Resumo lateral */}
      <aside style={{ padding: 20, background: 'var(--via-surface-1)', border: '1px solid var(--via-border)', borderRadius: 14, position: 'sticky', top: 96 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Receipt size={14} color="var(--via-text-primary)" />
          <span style={{ fontSize: 11.5, color: 'var(--via-text-muted)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Resumo</span>
        </div>
        <ReviewLine label="Plano" value={planName} />
        <ReviewLine label="Ciclo" value={cycle === 'annual' ? 'Anual' : 'Mensal'} />
        <ReviewLine label="Equivalente / mês" value={`R$ ${monthly.toLocaleString('pt-BR')}`} />
        <div style={{ borderTop: '1px solid var(--via-border)', marginTop: 12, paddingTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <strong style={{ fontSize: 13, color: 'var(--via-text-primary)' }}>Total hoje</strong>
            <strong style={{ fontSize: 20, color: 'var(--via-text-primary)' }}>R$ {planPrice.toLocaleString('pt-BR')}</strong>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 11.5, color: 'var(--via-text-muted)' }}>
            {cycle === 'annual' ? 'Cobrança única anual · 2 meses grátis incluídos.' : 'Cobrança mensal · cancele quando quiser.'}
          </p>
        </div>
        {step === 3 && (
          <div style={{ marginTop: 14, padding: 12, background: 'var(--via-navy-04, rgba(10,31,59,0.04))', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={13} color="var(--via-text-primary)" />
            <span style={{ fontSize: 12, color: 'var(--via-text-body)' }}>Pronto pra confirmar</span>
          </div>
        )}
      </aside>
    </div>
  );
}

function ReviewLine({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: last ? 'none' : '1px dashed var(--via-border)' }}>
      <span style={{ fontSize: 12.5, color: 'var(--via-text-muted)' }}>{label}</span>
      <span style={{ fontSize: 12.5, color: 'var(--via-text-body)', textAlign: 'right' }}>{value}</span>
    </div>
  );
}
