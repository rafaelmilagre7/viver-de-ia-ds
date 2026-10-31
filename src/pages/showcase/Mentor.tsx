import {
  Calendar, MessageCircle, ArrowRight, Quote, Check, Clock, User,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import ShowcaseMenu from './ShowcaseMenu';
import './mentor.css';

const navItems = [
  { label: 'Painel' },
  { label: 'Mentoria', active: true },
  { label: 'Comunidade' },
  { label: 'Cases' },
];

/* ============================================================
   Perfil do mentor · página-modelo
   ============================================================ */

/* Números de exemplo do perfil (mentor fictício). A nota é de 0 a 5 — não é
   NPS (que vai de −100 a 100) — e fica como lacuna até vir o dado real. */
const stats = [
  { n: '[N]/5', l: 'nota dos check-ins' },
  { n: '38', l: 'mentorados' },
  { n: '14h', l: 'resposta média' },
  { n: '126', l: 'check-ins' },
];

const expertise = [
  'Agentes em produção', 'Engenharia de prompt', 'RAG', 'Observabilidade',
  'Custo de token', 'SaaS B2B', 'Edge functions', 'Memória persistente',
];

const cases = [
  { c: 'Vendas', r: 'SDR de IA no WhatsApp', d: 'Qualificação de lead · solução Plug-and-Play' },
  { c: 'Atendimento', r: 'Atendimento 24h com IA', d: 'Triagem e resposta · no tom da sua empresa' },
  { c: 'Financeiro', r: 'Conciliação automatizada', d: 'Rotina financeira sem planilha manual' },
];

const depoimentos = [
  { q: '[Depoimento de mentorado · 1 a 2 frases, com o resultado concreto que a empresa teve.]', nome: '[Nome 1]', papel: '[cargo] · [empresa]' },
  { q: '[Depoimento de mentorado · o que mudou na operação depois da mentoria, com número real.]', nome: '[Nome 2]', papel: '[cargo] · [empresa]' },
];

const horarios = ['ter · 14h', 'qua · 10h', 'qui · 16h', 'sex · 11h'];

export default function ShowcaseMentor() {
  return (
    <div className="vds-showcase mtr">
      {/* NAV */}
      <header className="mtr-nav">
        <BrandLogo variant="auto" size="md" />
        <nav>
          {navItems.map((n) => (
            <a key={n.label} className={n.active ? 'is-link active' : 'is-link'}>{n.label}</a>
          ))}
        </nav>
        <ShowcaseMenu items={navItems} />
        <span className="mtr-nav-av">RM</span>
      </header>

      {/* HERO */}
      <section className="mtr-hero via-mesh-navy via-noise">
        <span className="mtr-hero-aura" aria-hidden="true" />
        <img src={monogramWhite} alt="" className="mtr-hero-mono" />
        <div className="mtr-hero-inner">
          <div className="mtr-hero-av">CR</div>
          <div className="mtr-hero-info">
            <span className="mtr-hero-eyebrow">mentor · plano pro</span>
            <h1>Caio Ribeiro</h1>
            <p>Conduz check-ins de mentoria em grupo do Plano Pro. Acompanha empresas que estão colocando IA pra rodar de verdade — não experimentando.</p>
            <div className="mtr-hero-cta-row">
              <button className="mtr-cta-primary">
                <Calendar size={16} strokeWidth={1.75} />
                Agendar check-in
              </button>
              <button className="mtr-cta-ghost">
                <MessageCircle size={16} strokeWidth={1.75} />
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
        {/* Agendar · vem ANTES do conteúdo no DOM: no celular fica logo abaixo
            do hero (antes ia pro fim da página). No desktop o grid põe na coluna da direita. */}
        <aside className="mtr-schedule">
          <span className="mtr-schedule-eyebrow">próximos check-ins</span>
          <h3>Reserve seu lugar no check-in em grupo</h3>
          <p>Plano Pro · 10 check-ins de mentoria em grupo por mês. Traga o problema real da sua empresa.</p>

          <div className="mtr-slots">
            {horarios.map((h, i) => (
              <button key={h} className={`mtr-slot ${i === 0 ? 'active' : ''}`}>{h}</button>
            ))}
          </div>

          <button className="mtr-schedule-cta">
            Confirmar presença
            <ArrowRight size={16} strokeWidth={1.75} />
          </button>

          <ul className="mtr-schedule-meta">
            <li><Clock size={14} strokeWidth={1.75} /> Responde em até 14h</li>
            <li><Check size={14} strokeWidth={1.75} /> 126 check-ins conduzidos</li>
            <li><User size={14} strokeWidth={1.75} /> Mentoria individual: 1 hora por mês, no plano Enterprise</li>
          </ul>
        </aside>

        <main className="mtr-main">
          {/* Sobre */}
          <article className="mtr-block">
            <span className="mtr-eyebrow">sobre</span>
            <h2>Operador antes de mentor.</h2>
            <p>
              Não ensino teoria de IA. Ensino a colocar a solução pra rodar com cliente real, pico de demanda e custo de token sob controle. Antes de mostrar qualquer coisa na mentoria, eu rodo na minha operação. Tudo que mostro, eu rodo.
            </p>
            <p>
              Mentoria é direta: você traz o problema real, a gente resolve junto na sessão. Sem resposta pronta, sem “depois você vê na aula”. Construção ao vivo.
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
            <span className="mtr-eyebrow">soluções que acompanha</span>
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
                  <Quote size={20} strokeWidth={1.75} className="mtr-depoimento-mark" />
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
      </div>
    </div>
  );
}
