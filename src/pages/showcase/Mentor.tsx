import {
  Calendar, MessageCircle, ArrowRight, Quote, Check, Clock, Star,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './mentor.css';

/* ============================================================
   Perfil do mentor · página-modelo
   ============================================================ */

const stats = [
  { n: '4.9', l: 'NPS médio' },
  { n: '220', l: 'mentorados' },
  { n: '14h', l: 'resposta média' },
  { n: 'R$ 1,8M', l: 'destravado' },
];

const expertise = [
  'Agentes em produção', 'Few-shot engineering', 'RAG', 'Observabilidade',
  'Custo de token', 'SaaS B2B', 'Edge functions', 'Memória persistente',
];

const cases = [
  { c: 'Efizi', r: '11.920 conversas/mês em produção', d: 'Agente de qualificação SDR · 28% conversão em lead' },
  { c: 'Pivot Studio', r: 'Primeiro agente em 90 dias', d: 'De zero a produção · stack moderna' },
  { c: 'Mantra Tech', r: 'R$ 80K/ano economizados', d: 'Automação de atendimento financeiro' },
];

const depoimentos = [
  { q: 'O Caio não te dá resposta pronta. Ele te faz construir certo. Saí com agente rodando, não com anotação.', nome: 'Daniel Pinheiro', papel: 'Founder · Pivot' },
  { q: 'Mentoria direta, sem rodeio. Em 1 sessão resolvi um bug de memória que eu travava há 3 semanas.', nome: 'Camila Moraes', papel: 'Head IA · Mantra' },
];

const horarios = ['ter · 14h', 'qua · 10h', 'qui · 16h', 'sex · 11h'];

export default function ShowcaseMentor() {
  return (
    <div className="vds-showcase mtr">
      {/* NAV */}
      <header className="mtr-nav">
        <BrandLogo variant="black" size="md" />
        <nav>
          <a>Painel</a>
          <a className="active">Mentoria</a>
          <a>Comunidade</a>
          <a>Cases</a>
        </nav>
        <span className="mtr-nav-av">RM</span>
      </header>

      {/* HERO */}
      <section className="mtr-hero via-mesh-navy via-noise">
        <span className="mtr-hero-aura" aria-hidden="true" />
        <img src={monogramWhite} alt="" className="mtr-hero-mono" />
        <div className="mtr-hero-inner">
          <div className="mtr-hero-av">
            CR
            <span className="mtr-hero-ring" />
          </div>
          <div className="mtr-hero-info">
            <span className="mtr-hero-eyebrow">mentor · fundador</span>
            <h1>Caio Ribeiro</h1>
            <p>Construiu a Nina · 11.920 conversas/mês em produção. Mentora operadores que estão colocando IA pra rodar de verdade — não experimentando.</p>
            <div className="mtr-hero-cta-row">
              <button className="mtr-cta-primary">
                <Calendar size={15} strokeWidth={2.2} />
                Agendar sessão
              </button>
              <button className="mtr-cta-ghost">
                <MessageCircle size={14} strokeWidth={2.2} />
                Mandar mensagem
              </button>
            </div>
          </div>
        </div>

        <div className="mtr-hero-stats">
          {stats.map((s) => (
            <div key={s.l}>
              <strong>{s.n}</strong>
              <em>{s.l}</em>
            </div>
          ))}
        </div>
      </section>

      <div className="mtr-body">
        <main className="mtr-main">
          {/* Sobre */}
          <article className="mtr-block">
            <span className="mtr-eyebrow">sobre</span>
            <h2>Operador antes de mentor.</h2>
            <p>
              Não ensino teoria de IA. Ensino a construir o agente que aguenta cliente real, pico de tráfego e custo de token sob controle. A Nina — meu próprio agente — processa quase 12 mil conversas por mês. Tudo que mostro, eu rodo.
            </p>
            <p>
              Mentoria é direta: você traz o problema real, a gente resolve junto na sessão. Sem resposta pronta, sem "depois você vê na aula". Construção ao vivo.
            </p>
          </article>

          {/* Expertise */}
          <article className="mtr-block">
            <span className="mtr-eyebrow">expertise</span>
            <div className="mtr-tags">
              {expertise.map((e) => (
                <span key={e} className="mtr-tag">{e}</span>
              ))}
            </div>
          </article>

          {/* Cases */}
          <article className="mtr-block">
            <span className="mtr-eyebrow">resultados destravados</span>
            <div className="mtr-cases">
              {cases.map((c) => (
                <div key={c.c} className="mtr-case">
                  <strong className="mtr-case-co">{c.c}</strong>
                  <p className="mtr-case-r">{c.r}</p>
                  <em className="mtr-case-d">{c.d}</em>
                </div>
              ))}
            </div>
          </article>

          {/* Depoimentos */}
          <article className="mtr-block">
            <span className="mtr-eyebrow">o que dizem</span>
            <div className="mtr-depoimentos">
              {depoimentos.map((d) => (
                <div key={d.nome} className="mtr-depoimento">
                  <Quote size={22} strokeWidth={1.5} className="mtr-depoimento-mark" />
                  <blockquote>{d.q}</blockquote>
                  <footer>
                    <strong>{d.nome}</strong>
                    <em>{d.papel}</em>
                  </footer>
                </div>
              ))}
            </div>
          </article>
        </main>

        {/* Sidebar · agendar */}
        <aside className="mtr-schedule">
          <span className="mtr-schedule-eyebrow">próximas janelas</span>
          <h3>Agende uma sessão 1:1</h3>
          <p>30 minutos · foco no seu problema real · construção ao vivo.</p>

          <div className="mtr-slots">
            {horarios.map((h, i) => (
              <button key={h} className={`mtr-slot ${i === 0 ? 'active' : ''}`}>{h}</button>
            ))}
          </div>

          <button className="mtr-schedule-cta">
            Confirmar agendamento
            <ArrowRight size={15} strokeWidth={2.4} />
          </button>

          <ul className="mtr-schedule-meta">
            <li><Clock size={12} strokeWidth={2.2} /> Responde em até 14h</li>
            <li><Check size={12} strokeWidth={2.4} /> 220 sessões realizadas</li>
            <li><Star size={12} strokeWidth={2.2} /> 4.9 NPS médio</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
