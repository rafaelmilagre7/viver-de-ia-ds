import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './mentor-matching.css';

export default function MentorMatching() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · mentor matching"
        title={
          <>
            Match score como peça <em>editorial</em>.
          </>
        }
        lede="Algoritmo de matching aluno-mentor mostrado com peso e atmosphere — não como busca genérica. Score em arco radial navy, overlap de expertise destacado, e razão clara do match. Sem 'algoritmo mágico'."
      />

      <PrimaryMatchSection />
      <AlternativesSection />
    </>
  );
}

function PrimaryMatchSection() {
  // Full circle radial · -90° starts at top · 270° usable arc
  const score = 0.94;
  const R = 76;
  const C = 2 * Math.PI * R;
  const dash = score * C * 0.75; // 270° usable
  const trackDash = C * 0.75;

  return (
    <Section title="Match primário · 94% de compatibilidade" meta="card hero · score radial + razões + agendar">
      <article className="vds-mm">
        <div className="vds-mm-bg via-mesh-navy via-noise" />
        <span className="vds-mm-aura" />

        {/* Header */}
        <header className="vds-mm-head">
          <span className="vds-mm-tag">
            Match recomendado · 1 de 3
          </span>
          <span className="vds-mm-stamp">
            Análise feita há 2 min · turma 2026.2
          </span>
        </header>

        <div className="vds-mm-grid">
          {/* Left — Score arc + mentor */}
          <div className="vds-mm-l">
            <div className="vds-mm-score">
              <svg viewBox="0 0 220 200" className="vds-mm-arc" aria-label="Match score 94 por cento">
                <defs>
                  {/* Conic-like gradient simulado · navy intenso → blue claro */}
                  <linearGradient id="mm-arc-grad" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.7" />
                    <stop offset="40%" stopColor="#3B6BA0" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>
                  {/* Glow externo */}
                  <filter id="mm-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Atmosphere radial interno */}
                  <radialGradient id="mm-inner-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B6BA0" stopOpacity="0.4" />
                    <stop offset="55%" stopColor="#1E3A5F" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0A1F3B" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <g transform="translate(110, 110) rotate(135)">
                  {/* Tick marks ao redor · instrumento editorial */}
                  {Array.from({ length: 27 }).map((_, i) => {
                    const angle = (i / 36) * 360;
                    const a = (angle * Math.PI) / 180;
                    const r1 = R + 14;
                    const r2 = R + 19;
                    return (
                      <line
                        key={i}
                        x1={Math.cos(a) * r1}
                        y1={Math.sin(a) * r1}
                        x2={Math.cos(a) * r2}
                        y2={Math.sin(a) * r2}
                        stroke="rgba(255,255,255,0.16)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Inner atmosphere glow circle */}
                  <circle cx="0" cy="0" r={R - 10} fill="url(#mm-inner-glow)" />

                  {/* Track ring (background · 270°) */}
                  <circle
                    cx="0"
                    cy="0"
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${trackDash} ${C}`}
                  />

                  {/* Progress ring · gradient navy → white luminoso */}
                  <circle
                    cx="0"
                    cy="0"
                    r={R}
                    fill="none"
                    stroke="url(#mm-arc-grad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${C}`}
                    filter="url(#mm-glow)"
                    style={{ transition: 'stroke-dasharray 800ms cubic-bezier(.16,1,.3,1)' }}
                  />

                  {/* Dot final indicador */}
                  {(() => {
                    const endAngle = score * 270; // graus
                    const a = (endAngle * Math.PI) / 180;
                    return (
                      <g>
                        <circle cx={Math.cos(a) * R} cy={Math.sin(a) * R} r="9" fill="rgba(255,255,255,0.18)" />
                        <circle cx={Math.cos(a) * R} cy={Math.sin(a) * R} r="5" fill="#FFFFFF" />
                      </g>
                    );
                  })()}
                </g>

                {/* Number 94 · hero editorial */}
                <text x="110" y="120" textAnchor="middle" className="vds-mm-pct">
                  94<tspan className="pct-mark" dx="2">%</tspan>
                </text>
                <text x="110" y="146" textAnchor="middle" className="vds-mm-pct-lbl">compatibilidade</text>
              </svg>
            </div>

            <div className="vds-mm-mentor">
              <div className="vds-mm-mentor-av">
                CR
                <span className="vds-mm-mentor-ring" />
              </div>
              <div>
                <strong>Caio Ribeiro</strong>
                <em>Fundador · Viver de IA · 220 mentorados</em>
              </div>
            </div>

            <div className="vds-mm-mentor-stats">
              <div>
                <strong>4.9</strong>
                <em>NPS médio</em>
              </div>
              <div>
                <strong>14h</strong>
                <em>resposta média</em>
              </div>
              <div>
                <strong>R$ 1,8M</strong>
                <em>destravado por mentorados</em>
              </div>
            </div>
          </div>

          {/* Right — Reasons + actions */}
          <div className="vds-mm-r">
            <span className="vds-mm-r-eyebrow">Por que esse match</span>
            <h3>
              Caio construiu agentes <em>nas mesmas condições</em> que você está vivendo na Efizi.
            </h3>

            <ul className="vds-mm-reasons">
              <li>
                <span className="vds-mm-reason-num">01</span>
                <div>
                  <strong>Construiu a Nina · agente em produção</strong>
                  <em>11.920 conversas/mês · mesma stack que você quer usar</em>
                </div>
              </li>
              <li>
                <span className="vds-mm-reason-num">02</span>
                <div>
                  <strong>Mentora 220 operadores em SaaS</strong>
                  <em>5 deles com ticket entre R$ 8K e R$ 80K · seu range</em>
                </div>
              </li>
              <li>
                <span className="vds-mm-reason-num">03</span>
                <div>
                  <strong>Lê e responde em até 14h</strong>
                  <em>Crítico pra você que tem turma 2026.2 com janela apertada</em>
                </div>
              </li>
            </ul>

            <div className="vds-mm-actions">
              <button className="vds-mm-cta">
                <Calendar size={14} strokeWidth={2.2} />
                Agendar 30min · esta semana
              </button>
              <button className="vds-mm-ghost">
                <MessageCircle size={13} strokeWidth={2.2} />
                Conversar antes
              </button>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}

function AlternativesSection() {
  const alts = [
    {
      av: 'YA',
      name: 'Yago Almeida',
      role: 'Tech lead · plataforma',
      score: 78,
      reason: 'Forte em infraestrutura de agentes (Iris, Nina). Match alto na parte técnica.',
      tags: ['VPS', 'observability', 'edge functions'],
    },
    {
      av: 'CM',
      name: 'Camila Moraes',
      role: 'Head IA · Mantra Tech',
      score: 72,
      reason: 'Trilhou o mesmo caminho — primeiro agente em produção há 7 meses.',
      tags: ['fintech', 'agentes B2B', 'compliance'],
    },
    {
      av: 'DP',
      name: 'Daniel Pinheiro',
      role: 'Founder · Pivot Studio',
      score: 65,
      reason: 'Operação menor, mas tem visão de produto sólida. Boa pra brainstorm.',
      tags: ['UX em IA', 'product-led', 'startup'],
    },
  ];

  return (
    <Section title="Alternativas · 3 outros mentores compatíveis" meta="quando você quer comparar antes de escolher">
      <div className="vds-mm-alts">
        {alts.map((a) => (
          <article key={a.name} className="vds-mm-alt">
            <header>
              <div className="vds-mm-alt-av">{a.av}</div>
              <div className="vds-mm-alt-info">
                <strong>{a.name}</strong>
                <em>{a.role}</em>
              </div>
              <div className="vds-mm-alt-score">
                <span className="num">{a.score}</span>
                <span className="lbl">match</span>
              </div>
            </header>

            <p className="vds-mm-alt-reason">{a.reason}</p>

            <div className="vds-mm-alt-tags">
              {a.tags.map((t) => (
                <span key={t} className="vds-mm-alt-tag">{t}</span>
              ))}
            </div>

            <button className="vds-mm-alt-cta">
              Ver perfil completo
              <ArrowRight size={12} strokeWidth={2.4} />
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}
