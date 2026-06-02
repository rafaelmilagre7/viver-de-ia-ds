import {
  Calendar, Coffee, MapPin, Mic, Users,
  ChevronRight, BookOpen, ArrowUpRight,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './conference-agenda.css';

export default function ConferenceAgenda() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · agenda da conferência"
        title={
          <>
            Dois dias, três trilhas — <em>uma narrativa só</em>.
          </>
        }
        lede="Agenda do Leaders AI Conference tratada como roteiro editorial. Day selector no topo, grid de horários × trilhas, sessões com track-color, speaker, sala. Keynotes em destaque atmosférico, breaks com peso editorial discreto e CTA pra adicionar ao calendário."
      />

      <AgendaSection />
      <AgendaSpeakerStripSection />
    </>
  );
}

function AgendaSection() {
  const tracks = [
    { key: 'main', label: 'Palco Principal', color: 'main' },
    { key: 'tech', label: 'Trilha Técnica', color: 'tech' },
    { key: 'biz', label: 'Trilha Negócio', color: 'biz' },
  ];

  const sessions = [
    // 08h30 - Café
    { time: '08h30', track: 'all', kind: 'break', title: 'Credenciamento e café da manhã', room: 'Foyer' },

    // 09h00 - Opening keynote
    {
      time: '09h00', track: 'main', kind: 'keynote', featured: true,
      title: 'Estado da arte da IA aplicada · 2026',
      speaker: 'Caio Ribeiro', role: 'fundador · Viver de IA', room: 'Auditório principal',
      duration: '50min',
    },

    // 10h00 - 3 parallel
    {
      time: '10h00', track: 'main', kind: 'talk',
      title: 'O que muda no atendimento quando IA vira norma',
      speaker: 'Camila Moraes', role: 'Head IA · Mantra', room: 'Auditório principal',
      duration: '40min',
    },
    {
      time: '10h00', track: 'tech', kind: 'talk',
      title: 'Multi-agent systems · arquitetura na prática',
      speaker: 'Diego Martins', role: 'CTO · Viver de IA', room: 'Sala B',
      duration: '40min',
    },
    {
      time: '10h00', track: 'biz', kind: 'talk',
      title: 'IA no board · como apresentar pra C-level',
      speaker: 'Daniel Pinheiro', role: 'Founder · Pivot', room: 'Sala C',
      duration: '40min',
    },

    // 11h00 - Break
    { time: '10h50', track: 'all', kind: 'break', title: 'Coffee break · networking aberto', room: 'Foyer' },

    // 11h20 - 3 parallel
    {
      time: '11h20', track: 'main', kind: 'panel',
      title: 'Painel · IA no setor financeiro brasileiro',
      speaker: 'Felipe Andrade + 3 convidados', role: 'mediação Caio Ribeiro', room: 'Auditório principal',
      duration: '50min',
    },
    {
      time: '11h20', track: 'tech', kind: 'workshop',
      title: 'Hands-on · construindo seu primeiro agente em produção',
      speaker: 'Mateus Costa', role: 'Senior IA · Viver de IA', room: 'Sala B',
      duration: '90min',
    },
    {
      time: '11h20', track: 'biz', kind: 'talk',
      title: 'Da curiosidade ao roadmap · escalando squad de IA',
      speaker: 'Bruna Carvalho', role: 'Product · Lumin', room: 'Sala C',
      duration: '40min',
    },

    // 12h30 - Lunch
    { time: '12h30', track: 'all', kind: 'break', title: 'Almoço · 3 restaurantes parceiros no piso térreo', room: 'Foyer + ext.' },

    // 14h00 - Closing keynote
    {
      time: '14h00', track: 'main', kind: 'keynote', featured: true,
      title: 'O que ninguém te conta sobre adoção real de IA',
      speaker: 'Marisson Lage', role: 'CEO · Efizi', room: 'Auditório principal',
      duration: '60min',
    },
  ];

  return (
    <Section title="Agenda · dia 1 · 18 jun 2026" meta="3 trilhas paralelas · 18 sessões · 6 keynotes · day selector + grid">
      <article className="vds-cf">
        {/* Day selector */}
        <header className="vds-cf-head">
          <div className="vds-cf-days">
            <button className="vds-cf-day active">
              <span className="dn mono">QUI</span>
              <span className="dt">18 jun</span>
              <span className="dl">9 sessões · 3 trilhas</span>
            </button>
            <button className="vds-cf-day">
              <span className="dn mono">SEX</span>
              <span className="dt">19 jun</span>
              <span className="dl">9 sessões · workshops</span>
            </button>
            <button className="vds-cf-day">
              <span className="dn mono">SÁB</span>
              <span className="dt">20 jun</span>
              <span className="dl">Mentoria · privado</span>
            </button>
          </div>

          {/* Track legend */}
          <div className="vds-cf-legend">
            {tracks.map((t) => (
              <span key={t.key} className={`vds-cf-track-pill ${t.color}`}>
                {t.label}
              </span>
            ))}
          </div>
        </header>

        {/* Schedule */}
        <ol className="vds-cf-schedule">
          {sessions.map((s, i) => (
            <li key={i} className={`vds-cf-row ${s.kind} ${s.featured ? 'featured' : ''}`}>
              <div className="vds-cf-time">
                <span className="t mono">{s.time}</span>
                {s.duration && <span className="d mono">{s.duration}</span>}
              </div>

              {s.kind === 'break' ? (
                <div className="vds-cf-break">
                  <Coffee size={13} strokeWidth={1.8} className="vds-cf-break-icon" />
                  <p>
                    <strong>{s.title}</strong>
                    <em>{s.room}</em>
                  </p>
                </div>
              ) : (
                <article className={`vds-cf-session ${s.track}`}>
                  <header>
                    <span className={`vds-cf-track-tag ${s.track}`}>
                      {s.track === 'main' ? 'Palco Principal' : s.track === 'tech' ? 'Trilha Técnica' : 'Trilha Negócio'}
                    </span>
                    {s.kind === 'keynote' && (
                      <span className="vds-cf-session-kind keynote">
                        <Mic size={9} strokeWidth={2.4} />
                        Keynote
                      </span>
                    )}
                    {s.kind === 'panel' && (
                      <span className="vds-cf-session-kind">
                        <Users size={9} strokeWidth={2.4} />
                        Painel
                      </span>
                    )}
                    {s.kind === 'workshop' && (
                      <span className="vds-cf-session-kind">
                        <BookOpen size={9} strokeWidth={2.4} />
                        Workshop · prático
                      </span>
                    )}
                  </header>

                  <h4>{s.title}</h4>

                  <footer>
                    <div className="vds-cf-speaker">
                      <span className="avatar mono">{(s.speaker as string).split(' ').map(x => x[0]).slice(0, 2).join('')}</span>
                      <div>
                        <strong>{s.speaker}</strong>
                        <em>{s.role}</em>
                      </div>
                    </div>
                    <div className="vds-cf-room">
                      <MapPin size={11} strokeWidth={2} />
                      {s.room}
                    </div>
                    <button className="vds-cf-add">
                      <Calendar size={11} strokeWidth={2.2} />
                      Reservar
                    </button>
                  </footer>

                  <span className="vds-cf-session-bar" />
                </article>
              )}
            </li>
          ))}
        </ol>

        <footer className="vds-cf-foot">
          <div>
            <p><strong>Como o dia funciona</strong> · 3 trilhas paralelas das 10h às 12h30 — você escolhe o que assistir. Keynotes do palco principal são únicas. Workshops têm vaga limitada e exigem reserva antecipada.</p>
          </div>
          <a href="#" className="vds-cf-foot-cta">
            Baixar agenda completa (PDF · 4 páginas)
            <ArrowUpRight size={12} strokeWidth={2.4} />
          </a>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Speaker strip ---------- */
function AgendaSpeakerStripSection() {
  const speakers = [
    { name: 'Caio Ribeiro', role: 'Fundador · Viver de IA', tag: 'Keynote' },
    { name: 'Marisson Lage', role: 'CEO · Efizi', tag: 'Keynote' },
    { name: 'Camila Moraes', role: 'Head IA · Mantra', tag: 'Talk' },
    { name: 'Diego Martins', role: 'CTO · Viver de IA', tag: 'Talk' },
    { name: 'Daniel Pinheiro', role: 'Founder · Pivot', tag: 'Talk' },
    { name: 'Bruna Carvalho', role: 'Product · Lumin', tag: 'Talk' },
    { name: 'Felipe Andrade', role: 'CTO · Olara Bank', tag: 'Painel' },
    { name: 'Mateus Costa', role: 'Senior IA · Viver de IA', tag: 'Workshop' },
  ];

  return (
    <Section title="Speakers · grid premium do line-up" meta="strip horizontal com avatar editorial · clica pra ver bio + sessões">
      <div className="vds-cf-speakers">
        {speakers.map((s) => (
          <article key={s.name} className={`vds-cf-spk ${s.tag === 'Keynote' ? 'keynote' : ''}`}>
            <span className="vds-cf-spk-av">{s.name.split(' ').map(x => x[0]).slice(0, 2).join('')}</span>
            <div className="vds-cf-spk-body">
              <span className={`vds-cf-spk-tag ${s.tag === 'Keynote' ? 'keynote' : ''}`}>{s.tag}</span>
              <h4>{s.name}</h4>
              <p>{s.role}</p>
            </div>
            <ChevronRight size={13} strokeWidth={2} className="vds-cf-spk-arrow" />
          </article>
        ))}
      </div>
    </Section>
  );
}
