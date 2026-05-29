import { Crown, Flame, Layers, Calendar, ArrowRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './achievement.css';

export default function Achievement() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · achievement & progressão"
        title={
          <>
            Reconhecimento <em>com peso editorial</em>.
          </>
        }
        lede="Conquistas, streaks e progressão não-bobas. Sem confete, sem badge gamer. Cada milestone tratada como uma peça editorial — atmosphere navy, peso tipográfico, contraste editorial. O aluno sente que avançou, não que ganhou um sticker."
      />

      <ActivityRingsSection />
      <StreakSection />
      <CertificateSection />
      <CohortSection />
    </>
  );
}

/* ---------- Activity Rings · Apple Watch editorial ---------- */
function Ring({ pct, size, stroke, color, id }: { pct: number; size: number; stroke: number; color: string; id: string; glow?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = pct * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        filter={`url(#glow-${id})`}
        style={{ stroke: color, transition: 'stroke-dasharray 800ms cubic-bezier(0.22, 0.61, 0.36, 1)' }}
      />
    </svg>
  );
}

function ActivityRingsSection() {
  return (
    <Section title="Activity rings · ritmo da semana" meta="3 anéis aninhados · estudo · prática · comunidade">
      <div className="vds-rings-stage via-mesh-navy via-noise">
        <div className="vds-rings-l">
          <span className="vds-rings-eyebrow">Semana 18 · 2026</span>
          <h3>
            7 dias de <em>movimento contínuo</em>.
          </h3>
          <p>
            Três anéis pra três frentes que sustentam a operação: <strong>estudo</strong> (aulas concluídas), <strong>prática</strong> (exercícios + notas) e <strong>comunidade</strong> (presença em lives + Discord). Fechar os três significa que a semana foi inteira.
          </p>
          <ul className="vds-rings-legend">
            <li>
              <span className="vds-rings-dot" style={{ background: 'var(--via-gray-300)' }} />
              <div>
                <strong>Estudo</strong>
                <em>7 aulas · 3h 42min · meta 5h</em>
              </div>
              <span className="pct">74%</span>
            </li>
            <li>
              <span className="vds-rings-dot" style={{ background: 'var(--via-blue)' }} />
              <div>
                <strong>Prática</strong>
                <em>4 exercícios · 12 notas</em>
              </div>
              <span className="pct">100%</span>
            </li>
            <li>
              <span className="vds-rings-dot" style={{ background: 'var(--via-blue-soft)' }} />
              <div>
                <strong>Comunidade</strong>
                <em>1 live · 6 mensagens no Discord</em>
              </div>
              <span className="pct">52%</span>
            </li>
          </ul>
        </div>

        <div className="vds-rings-r">
          <div className="vds-rings-canvas">
            <Ring id="estudo" pct={0.74} size={240} stroke={20} color="var(--via-gray-300)" glow="" />
            <div className="vds-rings-inner-1">
              <Ring id="pratica" pct={1.0} size={184} stroke={20} color="var(--via-blue)" glow="" />
            </div>
            <div className="vds-rings-inner-2">
              <Ring id="comunidade" pct={0.52} size={128} stroke={20} color="var(--via-blue-soft)" glow="" />
            </div>
            <div className="vds-rings-center">
              <span className="vds-rings-week">Semana</span>
              <strong className="vds-rings-day">5/7</strong>
              <span className="vds-rings-streak">
                <Flame size={11} strokeWidth={2.4} />
                14 dias
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Streak page · 14 dias seguidos ---------- */
function StreakSection() {
  const days = Array.from({ length: 28 }, (_, i) => {
    const pattern = [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return pattern[i];
  });

  return (
    <Section title="Streak grid · 28 dias de continuidade" meta="cada bloco é um dia · padrão visível, não escondido">
      <article className="vds-streak-card">
        <div className="vds-streak-stage via-mesh-navy via-noise">
          <span className="vds-streak-aura" />

          <header>
            <span className="vds-streak-eyebrow">
              <Flame size={11} strokeWidth={2.4} />
              Streak corrente
            </span>
            <h3>
              <em>14</em> dias seguidos
            </h3>
            <p>
              Maior streak da carreira até agora · mais que 87% dos operadores do mês. Próximo marco: <strong>21 dias</strong>.
            </p>

            <div className="vds-streak-grid">
              {days.map((d, i) => (
                <span key={i} className={`vds-streak-cell ${d ? 'on' : ''} ${i >= 14 ? 'current' : ''}`} />
              ))}
            </div>
            <div className="vds-streak-axis">
              <span>4 sem atrás</span>
              <span>Hoje</span>
            </div>
          </header>
        </div>

        <div className="vds-streak-side">
          <div className="vds-streak-milestone">
            <span className="vds-streak-eyebrow alt">Marco anterior</span>
            <strong>21 dias</strong>
            <em>14 mai 2026 · alcançado pela primeira vez</em>
          </div>
          <div className="vds-streak-milestone next">
            <span className="vds-streak-eyebrow alt">Próximo marco</span>
            <strong>30 dias</strong>
            <em>Faltam 16 dias · mês inteiro consecutivo</em>
            <div className="vds-streak-progress">
              <span style={{ width: '47%' }} />
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Certificate badge final ---------- */
function CertificateSection() {
  return (
    <Section title="Certificado · concluído com selo" meta="emissão final · peça editorial · não badge gamer">
      <article className="vds-cert">
        <div className="vds-cert-paper via-noise">
          <span className="vds-cert-aura-1" />
          <span className="vds-cert-aura-2" />

          {/* Header */}
          <header className="vds-cert-head">
            <div className="vds-cert-brand">
              <img src={monogramWhite} alt="" className="vds-cert-mono" />
              <div>
                <span className="vds-cert-brand-eyebrow">Viver de IA</span>
                <strong>Certificado de conclusão</strong>
              </div>
            </div>
            <span className="vds-cert-issued">
              <em>emitido em</em>
              <strong>22 mai 2026</strong>
            </span>
          </header>

          <span className="vds-cert-rule" />

          {/* Body */}
          <div className="vds-cert-body">
            <p className="vds-cert-pre">Certificamos que</p>
            <h2 className="vds-cert-name">Rafael Milagre</h2>

            <p className="vds-cert-program">
              concluiu o programa
              <strong>Construindo agentes IA na prática</strong>
            </p>

            <p className="vds-cert-period">
              entre <strong>17 fev</strong> e <strong>18 mai de 2026</strong>
            </p>

            <p className="vds-cert-tally">
              18 aulas <span className="vds-cert-dot">·</span> 4 lives <span className="vds-cert-dot">·</span> 2 estudos de caso entregues
            </p>

            <div className="vds-cert-stats">
              <div>
                <strong>4.7</strong>
                <em>nota média</em>
              </div>
              <span className="vds-cert-stats-sep" aria-hidden="true" />
              <div>
                <strong>14<sup>d</sup></strong>
                <em>maior streak</em>
              </div>
              <span className="vds-cert-stats-sep" aria-hidden="true" />
              <div>
                <strong>92<sup>%</sup></strong>
                <em>aulas concluídas</em>
              </div>
            </div>
          </div>

          <span className="vds-cert-rule" />

          {/* Footer */}
          <div className="vds-cert-foot">
            <div className="vds-cert-sign">
              <span className="vds-cert-line" />
              <strong>Caio Ribeiro</strong>
              <em>Fundador · Viver de IA</em>
            </div>
            <div className="vds-cert-seal" role="img" aria-label="Selo VIA 2026">
              <div className="vds-cert-seal-medal">
                <Crown size={22} strokeWidth={1.5} />
                <svg className="vds-cert-seal-ring" viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <path id="cert-seal-circle" d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
                  </defs>
                  <text>
                    <textPath href="#cert-seal-circle" startOffset="0%">
                      VIVER DE IA · SELO 2026 · PROGRAMA OFICIAL ·
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="vds-cert-meta">
          <span className="vds-cert-id">
            <em>ID</em>
            VIA-CERT-2026-00482
          </span>
          <a href="#" className="vds-cert-verify">
            Validar certificado
            <ArrowRight size={13} strokeWidth={2.4} />
          </a>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Cohort/turma card ---------- */
function CohortSection() {
  return (
    <Section title="Cohort · turma 2026.2 em movimento" meta="presence em tempo real · 24 operadores">
      <article className="vds-cohort">
        <div className="vds-cohort-l">
          <span className="vds-cohort-eyebrow">
            <Layers size={11} strokeWidth={2.4} />
            Turma 2026.2 · ativa
          </span>
          <h3>
            24 operadores construindo <em>juntos</em>.
          </h3>
          <p>
            Começou em 17 fev · termina em 18 mai. Mesma jornada, ritmos diferentes — abaixo o mapa de quem está em que fase.
          </p>

          <div className="vds-cohort-axis">
            <span>Início</span>
            <span>1/3</span>
            <span>2/3</span>
            <span>Fim</span>
          </div>
          <div className="vds-cohort-track">
            <span className="vds-cohort-marker" style={{ left: '12%' }} title="3 alunos · Fundamentos" />
            <span className="vds-cohort-marker" style={{ left: '28%' }} title="6 alunos · Prompt eng" />
            <span className="vds-cohort-marker big" style={{ left: '48%' }} title="9 alunos · Agentes" />
            <span className="vds-cohort-marker" style={{ left: '64%' }} title="4 alunos · Produção" />
            <span className="vds-cohort-marker accent" style={{ left: '82%' }} title="2 alunos · Concluindo" />
          </div>
          <p className="vds-cohort-hint">
            Você está em <strong>2/3 da trilha</strong> · 9 colegas no mesmo módulo. <a href="#">Ver carteira completa</a>
          </p>
        </div>

        <div className="vds-cohort-r">
          <span className="vds-cohort-eyebrow alt">Próximo encontro</span>
          <h4>Live · auditoria de 3 prompts</h4>
          <p className="vds-cohort-when">
            <Calendar size={13} strokeWidth={2.2} />
            sex · 22 mai · 14h00 BRT
          </p>
          <ul className="vds-cohort-stack">
            <li>
              <span className="av nav">CR</span>
              <div><strong>Caio Ribeiro</strong><em>conduz a sessão</em></div>
            </li>
            <li>
              <span className="av">ML</span>
              <div><strong>Márisson Lage</strong><em>traz caso da Efizi</em></div>
            </li>
            <li>
              <span className="av">+22</span>
              <div><strong>Turma 2026.2</strong><em>já confirmados</em></div>
            </li>
          </ul>
          <button className="vds-cohort-cta">
            Confirmar presença
            <ArrowRight size={13} strokeWidth={2.4} />
          </button>
        </div>
      </article>
    </Section>
  );
}
