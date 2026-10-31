import { Check, ArrowRight, ArrowLeft, MessageCircle, Database, Compass, Building2, Users, Briefcase } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import './onboarding.css';

const steps = [
  { n: 1, t: 'Dados da empresa', s: 'done' },
  { n: 2, t: 'Cenário atual', s: 'done' },
  { n: 3, t: 'Objetivos', s: 'current' },
  { n: 4, t: 'Pagamento', s: 'todo' },
];

export default function Onboarding() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · onboarding"
        title={<>Passos em cima, <em>uma pergunta por vez</em>.</>}
        lede="Onboarding longo. Indicador de passos no topo, título grande, uma pergunta editorial por passo. Dois botões — Voltar (discreto) e Continuar (principal). Sem barra lateral, sem distração. Opção discreta de pular no final."
      />

      <WizardPremiumSection />

      <Section title="Passo 3 · objetivos · passos na horizontal" meta="formato padrão pra fluxos curtos">
        <div className="vds-ob">
          <div className="ob-stepper">
            {steps.map((s, i) => (
              <div key={s.n} className={`ob-step ${s.s}`}>
                <span className="circle">
                  {s.s === 'done' ? <Check size={14} strokeWidth={1.75} /> : s.n}
                </span>
                <span className="t">{s.t}</span>
                {i < steps.length - 1 && <span className="line" />}
              </div>
            ))}
          </div>

          <div className="ob-content">
            <p className="vds-eyebrow">Passo 3 de 4 · objetivos</p>
            <h2>O que você quer <em>de verdade</em> resolver?</h2>
            <p className="lede">
              Não precisa estar bonito. Quanto mais específico, mais a trilha se ajusta para o seu cenário.
            </p>

            <div className="ob-options">
              {[
                { l: 'Automatizar o atendimento', d: 'WhatsApp, chat, e-mail — tirar o time da repetição.' },
                { l: 'Internalizar uma ferramenta', d: 'CRM, ERP, BI próprio — fugir de mensalidade externa.' },
                { l: 'Acelerar uma análise', d: 'Conversas, dados, contratos — sair do Excel.' },
              ].map((o, i) => (
                <label key={o.l} className={`ob-opt ${i === 0 ? 'on' : ''}`}>
                  <span className={`box ${i === 0 ? 'on' : ''}`}>{i === 0 && <Check size={14} strokeWidth={1.75} />}</span>
                  <div>
                    <strong>{o.l}</strong>
                    <span>{o.d}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="ob-actions">
              <button className="btn ghost">Voltar</button>
              <button className="btn primary">Continuar</button>
            </div>
            <p className="ob-skip">Prefere começar depois? <a>Pular onboarding</a></p>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------- Assistente com painel narrativo + passos na vertical ---------- */
function WizardPremiumSection() {
  const wizSteps = [
    { n: 1, t: 'Sobre você', s: 'done', sub: 'nome, papel, empresa' },
    { n: 2, t: 'Cenário atual', s: 'done', sub: 'tamanho do time, ferramentas' },
    { n: 3, t: 'Onde quer chegar', s: 'current', sub: 'objetivos · 90 dias' },
    { n: 4, t: 'Plano e pagamento', s: 'todo', sub: 'comunidade · mentoria · empresa' },
  ];

  return (
    <Section title="Assistente com painel lateral · passos na vertical" meta="onboarding do Enterprise · painel navy narrativo · uma pergunta por vez">
      <div className="vds-wiz">
        {/* LEFT — atmospheric narrative panel */}
        <aside className="vds-wiz-aside via-mesh-navy via-noise">
          <header>
            {/* sm: o lockup md (~331px) estourava os 302px úteis do painel de
                360px e o overflow:hidden do wizard cortava o "A" de VIVER DE IA */}
            <BrandLogo variant="white" size="sm" />
          </header>

          <div className="vds-wiz-aside-body">
            <span className="vds-wiz-eyebrow">
              Onboarding · 3 de 4
            </span>
            <h3>
              Calibramos a trilha <em>pra você</em>.
            </h3>
            <p>
              Quanto mais a gente entende seu cenário, melhor o Consultor IA e os mentores conseguem te guiar. Suas respostas viram contexto — não viram formulário arquivado.
            </p>

            <ol className="vds-wiz-steps">
              {wizSteps.map((s) => (
                <li key={s.n} className={s.s}>
                  <span className="vds-wiz-step-bullet">
                    {s.s === 'done' ? <Check size={14} strokeWidth={1.75} /> : s.n}
                  </span>
                  <div>
                    <strong>{s.t}</strong>
                    <em>{s.sub}</em>
                  </div>
                </li>
              ))}
            </ol>

            <div className="vds-wiz-aside-foot">
              <p>
                Em torno de 4 minutos · pode parar e voltar quando quiser.
              </p>
              <span className="vds-wiz-progress">
                <span style={{ width: '62%' }} />
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT — current step content */}
        <main className="vds-wiz-main">
          <header>
            <span className="vds-wiz-step-tag">Passo 3 de 4</span>
            <h2>
              Onde você quer estar <em>daqui a 90 dias</em>?
            </h2>
            <p className="vds-wiz-lede">
              Escolha de 1 a 3 frentes. Não precisa ser definitivo — a gente recalibra na primeira mentoria.
            </p>
          </header>

          <div className="vds-wiz-options">
            <label className="vds-wiz-opt on">
              <span className="vds-wiz-opt-check">
                <Check size={14} strokeWidth={1.75} />
              </span>
              <div className="vds-wiz-opt-icon nv">
                <MessageCircle size={16} strokeWidth={1.75} />
              </div>
              <div className="vds-wiz-opt-body">
                <strong>Automatizar atendimento</strong>
                <em>WhatsApp, chat, e-mail · tirar o time da repetição</em>
              </div>
              <span className="vds-wiz-opt-bar" />
            </label>

            <label className="vds-wiz-opt on">
              <span className="vds-wiz-opt-check">
                <Check size={14} strokeWidth={1.75} />
              </span>
              <div className="vds-wiz-opt-icon gd">
                <Database size={16} strokeWidth={1.75} />
              </div>
              <div className="vds-wiz-opt-body">
                <strong>Internalizar uma ferramenta</strong>
                <em>CRM, ERP, BI próprio · fugir de mensalidade externa</em>
              </div>
              <span className="vds-wiz-opt-bar" />
            </label>

            <label className="vds-wiz-opt">
              <span className="vds-wiz-opt-check" />
              <div className="vds-wiz-opt-icon">
                <Compass size={16} strokeWidth={1.75} />
              </div>
              <div className="vds-wiz-opt-body">
                <strong>Acelerar análise / decisão</strong>
                <em>Conversas, dados, contratos · sair do Excel</em>
              </div>
              <span className="vds-wiz-opt-bar" />
            </label>

            <label className="vds-wiz-opt">
              <span className="vds-wiz-opt-check" />
              <div className="vds-wiz-opt-icon">
                <Building2 size={16} strokeWidth={1.75} />
              </div>
              <div className="vds-wiz-opt-body">
                <strong>Montar um time de IA na empresa</strong>
                <em>Estrutura, ritos, papéis · começando do zero</em>
              </div>
              <span className="vds-wiz-opt-bar" />
            </label>

            <label className="vds-wiz-opt">
              <span className="vds-wiz-opt-check" />
              <div className="vds-wiz-opt-icon">
                <Users size={16} strokeWidth={1.75} />
              </div>
              <div className="vds-wiz-opt-body">
                <strong>Treinar time existente</strong>
                <em>Operação atual · destravar quem já está no jogo</em>
              </div>
              <span className="vds-wiz-opt-bar" />
            </label>

            <label className="vds-wiz-opt">
              <span className="vds-wiz-opt-check" />
              <div className="vds-wiz-opt-icon">
                <Briefcase size={16} strokeWidth={1.75} />
              </div>
              <div className="vds-wiz-opt-body">
                <strong>Lançar produto com IA no centro</strong>
                <em>Validação, MVP e chegada ao mercado</em>
              </div>
              <span className="vds-wiz-opt-bar" />
            </label>
          </div>

          <footer>
            <span className="vds-wiz-count">
              <strong>2</strong> selecionadas · ideal entre 1 e 3
            </span>
            <div className="vds-wiz-actions">
              <button className="vds-wiz-btn ghost">
                <ArrowLeft size={14} strokeWidth={1.75} />
                Voltar
              </button>
              <button className="vds-wiz-btn primary">
                Continuar
                <ArrowRight size={14} strokeWidth={1.75} />
              </button>
            </div>
          </footer>

          <p className="vds-wiz-skip">
            Prefere preencher depois? <a href="#">Pular e ir pro painel</a> · suas respostas até aqui ficam salvas.
          </p>
        </main>
      </div>
    </Section>
  );
}
