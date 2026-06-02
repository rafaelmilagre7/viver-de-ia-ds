import { Play, Users, MessageCircle, Hand, ChevronRight, Headphones, Radio, Calendar } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './live-class.css';

export default function LiveClass() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · live · aula ao vivo"
        title={
          <>
            AGORA AO VIVO, <em>sem ruído</em>.
          </>
        }
        lede="Quando a aula está acontecendo, a página inteira precisa gritar isso — sem espalhar gradient vermelho gritante. Atmosfera navy + heart rate accent + tipografia monumental. Pulsa, mas com elegância."
      />

      <HeroLiveSection />
      <UpcomingLiveSection />
      <PastLivesSection />
    </>
  );
}

/* ---------- Live HERO — full atmosphere ---------- */
function HeroLiveSection() {
  return (
    <Section title="Live hero · primeira dobra ao entrar" meta="navy mesh + heart rate accent + viewer count">
      <article className="vds-live-hero">
        <div className="vds-live-bg via-mesh-navy via-noise" />
        <span className="vds-live-glow" />

        {/* Top bar — pulse + viewers */}
        <header className="vds-live-top">
          <span className="vds-live-pill">
            <span className="vds-live-rec">
              <span className="vds-live-rec-dot" />
            </span>
            <em>ao vivo</em>
            <span className="vds-live-elapsed">há 18 min</span>
          </span>
          <span className="vds-live-viewers">
            <Users size={13} strokeWidth={2} />
            <strong>148</strong> assistindo
          </span>
        </header>

        {/* Main */}
        <div className="vds-live-body">
          <span className="vds-live-eyebrow">
            <Radio size={11} strokeWidth={2.4} />
            Mentoria · turma 2026.2
          </span>
          <h1>
            Auditoria de 3 prompts<br />
            <em>reais do grupo</em>.
          </h1>
          <p className="vds-live-lede">
            Caio revisando ao vivo os prompts da Efizi, Mantra e Pivot. Próximos 42 min · sem corte de transmissão.
          </p>

          {/* Hosts */}
          <div className="vds-live-hosts">
            <div className="vds-live-host">
              <span className="av">CR</span>
              <div>
                <strong>Caio Ribeiro</strong>
                <em>Conduz a sessão</em>
              </div>
            </div>
            <span className="vds-live-host-sep">+</span>
            <div className="vds-live-host">
              <span className="av guest">ML</span>
              <div>
                <strong>Márisson Lage</strong>
                <em>Convidado · Efizi</em>
              </div>
            </div>
          </div>
        </div>

        {/* Heart rate line — visual signature */}
        <div className="vds-live-heart">
          <svg viewBox="0 0 800 80" preserveAspectRatio="none" className="vds-live-heart-svg">
            <defs>
              <linearGradient id="heart-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(10, 31, 59, 0)" />
                <stop offset="50%" stopColor="rgba(10, 31, 59, 0.7)" />
                <stop offset="100%" stopColor="rgba(10, 31, 59, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 0 40 L 80 40 L 100 40 L 120 30 L 140 50 L 160 10 L 180 70 L 200 30 L 220 40 L 300 40 L 320 40 L 340 25 L 360 55 L 380 5 L 400 75 L 420 30 L 440 45 L 500 45 L 520 45 L 540 30 L 560 60 L 580 20 L 600 70 L 620 35 L 640 45 L 800 45"
              stroke="url(#heart-grad)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Actions bottom */}
        <footer className="vds-live-foot">
          <button className="vds-live-cta">
            <Play size={14} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
            Entrar agora · 42 min restantes
          </button>
          <div className="vds-live-secondary">
            <button>
              <Hand size={13} strokeWidth={2} />
              Levantar mão
              <em>3 na fila</em>
            </button>
            <button>
              <MessageCircle size={13} strokeWidth={2} />
              Chat
              <em>+24 msg</em>
            </button>
          </div>
        </footer>

        <img src={monogramWhite} alt="" className="vds-live-watermark" />
      </article>
    </Section>
  );
}

/* ---------- Próxima live · countdown ---------- */
function UpcomingLiveSection() {
  return (
    <Section title="Próxima live · countdown editorial" meta="badge agendado · não 'em breve'">
      <article className="vds-live-next">
        <div className="vds-live-next-l">
          <span className="vds-live-eyebrow">
            <Calendar size={11} strokeWidth={2.4} />
            Próxima sessão · turma 2026.2
          </span>
          <h3>
            Construindo o primeiro <em>agente em produção</em>.
          </h3>
          <p>
            Caio mostra do zero como subir um agente de classificação que ouve o canal de vendas. Levar laptop com chave OpenAI/Anthropic configurada.
          </p>
          <div className="vds-live-next-meta">
            <span><strong>2h 30min</strong> · sessão prática</span>
            <span>·</span>
            <span><strong>22</strong> confirmados</span>
            <span>·</span>
            <span>limite de <strong>30</strong></span>
          </div>
        </div>

        <div className="vds-live-next-r">
          <span className="vds-live-when">
            <em>22 mai</em>
            <strong>14h00</strong>
            <span>quinta · BRT</span>
          </span>
          <div className="vds-live-countdown">
            <div>
              <strong>02</strong>
              <em>dias</em>
            </div>
            <span className="vds-live-countdown-sep">:</span>
            <div>
              <strong>14</strong>
              <em>horas</em>
            </div>
            <span className="vds-live-countdown-sep">:</span>
            <div>
              <strong>32</strong>
              <em>min</em>
            </div>
          </div>
          <button className="vds-live-next-cta">
            Confirmar presença
            <ChevronRight size={13} strokeWidth={2.5} />
          </button>
          <p className="vds-live-next-tip">
            Adiciono no calendário automaticamente · lembrete 30min antes
          </p>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Past lives · arquivo editorial ---------- */
function PastLivesSection() {
  const past = [
    { date: '15 mai', title: 'Few-shot · quando 3 exemplos valem mais que 12', host: 'Caio', duration: '1h 42min', views: 248, em: 'mais que 12' },
    { date: '08 mai', title: 'Memory: curta, média e persistente — quando cada uma serve', host: 'Caio + Diego', duration: '2h 06min', views: 312, em: 'cada uma serve' },
    { date: '01 mai', title: 'Auditoria · 3 agentes do grupo na operação real', host: 'Caio + alunos', duration: '1h 58min', views: 196, em: 'na operação real' },
  ];

  return (
    <Section title="Lives gravadas · arquivo da turma" meta="cada uma com transcript + chat capturado">
      <div className="vds-live-past">
        {past.map((p) => (
          <article key={p.date} className="vds-live-past-card">
            <div className="vds-live-past-thumb">
              <div className="vds-live-past-bg via-mesh-navy via-noise" />
              <span className="vds-live-past-date">
                <em>{p.date}</em>
                <strong>2026</strong>
              </span>
              <button aria-label="Reproduzir" className="vds-live-past-play">
                <Play size={18} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
              </button>
              <span className="vds-live-past-dur">{p.duration}</span>
            </div>
            <div className="vds-live-past-body">
              <p className="vds-live-past-eyebrow">
                <Headphones size={10} strokeWidth={2.4} />
                Live · {p.host}
              </p>
              <h4>
                {p.title.split(p.em)[0]}<em>{p.em}</em>{p.title.split(p.em)[1] || ''}
              </h4>
              <p className="vds-live-past-meta">
                <span><strong>{p.views}</strong> assistiram</span>
                <span>·</span>
                <span>transcript + chat completos</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
