import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, MessageCircle, Pause,
  ChevronRight, Check, TrendingDown, Gift, Heart,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './cancellation.css';

export default function Cancellation() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · cancelamento"
        title={
          <>
            Cancelar é fácil — <em>mas a gente tenta entender antes</em>.
          </>
        }
        lede="Fluxo de cancelamento honesto · 3 passos editoriais (motivo · retention pitch · confirmação). Sem dark patterns, sem botão escondido. Pergunta o motivo só pra aprender; oferece alternativas (pausar, mudar plano) mas não bloqueia o cancelamento."
      />

      <CancellationFlowSection />
    </>
  );
}

function CancellationFlowSection() {
  const [step, setStep] = useState<number>(2);

  const reasons = [
    { id: 'price', label: 'Achei o plano caro pro meu momento', context: 'pode ser bom passar pro plano Starter' },
    { id: 'time', label: 'Não estou conseguindo dar atenção', context: 'pause em vez de cancelar?' },
    { id: 'value', label: 'Não consegui aplicar o que aprendi', context: 'que tal um check-in de mentoria?' },
    { id: 'finished', label: 'Já consegui o que precisava — obrigado', context: 'isso é a melhor versão' },
    { id: 'other', label: 'Outra razão', context: 'me conta na próxima tela' },
  ];

  return (
    <Section title="Fluxo completo · 3 passos editoriais" meta="motivo → retention → confirmação · sem dark pattern">
      <article className="vds-cnx">
        {/* Steps indicator */}
        <header className="vds-cnx-head">
          <button className="vds-cnx-back">
            <ArrowLeft size={14} strokeWidth={1.75} />
            Voltar pra configurações
          </button>
          <ol className="vds-cnx-steps">
            <li className={step >= 1 ? 'done' : ''}>
              <span className="num">{step > 1 ? <Check size={14} strokeWidth={1.75} /> : '1'}</span>
              <span className="lbl">Motivo</span>
            </li>
            <li className={step >= 2 ? (step > 2 ? 'done' : 'current') : ''}>
              <span className="num">{step > 2 ? <Check size={14} strokeWidth={1.75} /> : '2'}</span>
              <span className="lbl">Alternativas</span>
            </li>
            <li className={step >= 3 ? 'current' : ''}>
              <span className="num">3</span>
              <span className="lbl">Confirmação</span>
            </li>
          </ol>
        </header>

        {/* Step content */}
        {step === 1 && (
          <div className="vds-cnx-body">
            <span className="vds-cnx-eyebrow">Passo 1 de 3</span>
            <h2>
              O que <em>te levou</em> a pensar em cancelar?
            </h2>
            <p className="vds-cnx-lede">
              Sem julgamento — sua resposta ajuda a gente a melhorar o produto. Pode escolher mais de uma.
            </p>

            <ul className="vds-cnx-reasons">
              {reasons.map((r) => (
                <li key={r.id} className="vds-cnx-reason">
                  <label>
                    <input type="checkbox" defaultChecked={r.id === 'time'} />
                    <span className="vds-cnx-reason-check" />
                    <div className="vds-cnx-reason-body">
                      <strong>{r.label}</strong>
                      <em>{r.context}</em>
                    </div>
                  </label>
                </li>
              ))}
            </ul>

            <div className="vds-cnx-actions">
              <button className="vds-cnx-btn ghost">Cancelar de qualquer jeito</button>
              <button className="vds-cnx-btn primary" onClick={() => setStep(2)}>
                Continuar
                <ArrowRight size={14} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="vds-cnx-body">
            <span className="vds-cnx-eyebrow">Passo 2 de 3 · alternativas pra você</span>
            <h2>
              A gente entende — <em>essas opções podem encaixar melhor</em>.
            </h2>
            <p className="vds-cnx-lede">
              Você disse que <strong>não tem conseguido dar atenção</strong> · nesses casos, a maioria volta com mais 1-2 horas semana. Antes de cancelar, dá uma olhada nessas alternativas:
            </p>

            {/* Featured offer */}
            <article className="vds-cnx-offer featured via-mesh-navy via-noise">
              <span className="vds-cnx-offer-tag">Sugerido pra você</span>
              <div className="vds-cnx-offer-icon">
                <Pause size={20} strokeWidth={1.75} />
              </div>
              <h3>
                Pausa de <em>3 meses</em> · zero custo
              </h3>
              <p>
                Sua conta fica congelada · você não paga, a gente guarda seu progresso, mentorias e a trilha de onboarding. Quando voltar, recupera tudo onde parou.
              </p>
              <ul className="vds-cnx-offer-meta">
                <li><Check size={14} strokeWidth={1.75} /> Conta pausada por até 90 dias</li>
                <li><Check size={14} strokeWidth={1.75} /> Histórico + notas preservados</li>
                <li><Check size={14} strokeWidth={1.75} /> Pode voltar antes se mudar de ideia</li>
              </ul>
              <button className="vds-cnx-offer-cta">
                Pausar conta por 3 meses
                <ArrowRight size={14} strokeWidth={1.75} />
              </button>
            </article>

            {/* Alternatives */}
            <div className="vds-cnx-alts">
              <article className="vds-cnx-alt">
                <div className="vds-cnx-alt-icon">
                  <TrendingDown size={16} strokeWidth={1.75} />
                </div>
                <div className="vds-cnx-alt-body">
                  <h4>Mudar pro plano Starter</h4>
                  <p>R$&nbsp;2.580/mês em vez de R$&nbsp;3.780 · mantém soluções, formações e comunidade.</p>
                </div>
                <button className="vds-cnx-alt-cta">
                  Mudar plano
                  <ChevronRight size={14} strokeWidth={1.75} />
                </button>
              </article>

              <article className="vds-cnx-alt">
                <div className="vds-cnx-alt-icon">
                  <MessageCircle size={16} strokeWidth={1.75} />
                </div>
                <div className="vds-cnx-alt-body">
                  <h4>Conversa com um mentor · 30min</h4>
                  <p>Pra entender o que travou. Sem compromisso de voltar — pra ajudar mesmo.</p>
                </div>
                <button className="vds-cnx-alt-cta">
                  Agendar sessão
                  <ChevronRight size={14} strokeWidth={1.75} />
                </button>
              </article>

              <article className="vds-cnx-alt">
                <div className="vds-cnx-alt-icon accent">
                  <Gift size={16} strokeWidth={1.75} />
                </div>
                <div className="vds-cnx-alt-body">
                  <h4>Desconto de retenção · −R$&nbsp;[valor]/mês</h4>
                  <p>Por já ser membro de longa data, libero esse desconto nas próximas [N] parcelas.</p>
                </div>
                <button className="vds-cnx-alt-cta accent">
                  Aceitar desconto
                  <ChevronRight size={14} strokeWidth={1.75} />
                </button>
              </article>
            </div>

            <div className="vds-cnx-actions">
              <button className="vds-cnx-btn ghost" onClick={() => setStep(3)}>
                Não, quero mesmo cancelar
              </button>
              <button className="vds-cnx-btn primary" onClick={() => setStep(1)}>
                <ArrowLeft size={14} strokeWidth={1.75} />
                Voltar
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="vds-cnx-body">
            <span className="vds-cnx-eyebrow">Passo 3 de 3 · confirmação final</span>
            <h2>
              Tudo certo — <em>vamos sentir sua falta</em>.
            </h2>
            <p className="vds-cnx-lede">
              Seu acesso fica ativo até <strong>16 jun 2026</strong> (fim do ciclo atual). Sem cobranças adicionais. Suas notas e progresso ficam preservados 6 meses pro caso de voltar.
            </p>

            <div className="vds-cnx-final">
              <div className="vds-cnx-final-icon">
                <Heart size={16} strokeWidth={1.75} />
              </div>
              <div>
                <h4>Antes de você ir, queremos te agradecer.</h4>
                <p>3 anos de jornada · 47 aulas concluídas · 18 check-ins de mentoria · 8 soluções no ar. Foi parte da história da Viver de IA.</p>
              </div>
            </div>

            <div className="vds-cnx-actions">
              <button className="vds-cnx-btn ghost" onClick={() => setStep(2)}>Voltar atrás</button>
              <button className="vds-cnx-btn danger">Confirmar cancelamento</button>
            </div>
          </div>
        )}
      </article>
    </Section>
  );
}
