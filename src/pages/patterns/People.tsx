import {
  MessageCircle, Calendar, Award, MapPin, Link2, AtSign, Globe,
  Star, ChevronRight, Mail, Users, Headphones, Search, Filter,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './people.css';

export default function People() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · people"
        title={
          <>
            Cards de pessoa, <em>cada um na sua escala</em>.
          </>
        }
        lede="Quatro intensidades pra mostrar gente — mentor profile (peso editorial), team grid (carteira do time), member list (operadores), user popover (preview rápido). Toda foto/avatar carregada, toda métrica honesta, sem 'expert badge' falso."
      />

      <MentorProfileSection />
      <TeamGridSection />
      <MemberListSection />
      <UserPopoverSection />
    </>
  );
}

/* ---------- Mentor profile card (premium) ---------- */
function MentorProfileSection() {
  return (
    <Section title="Mentor profile · cabeçalho editorial do perfil" meta="página do mentor · sales page · about">
      <article className="vds-mentor-card">
        <div className="vds-mentor-cover via-mesh-navy via-noise">
          <img src={monogramWhite} alt="" className="vds-mentor-mark" />
          <span className="vds-mentor-tag">Mentor head · Viver de IA</span>
        </div>

        <div className="vds-mentor-body">
          <div className="vds-mentor-l">
            <div className="vds-mentor-avatar">CR</div>
            <h3>Caio Ribeiro</h3>
            <p className="vds-mentor-role">
              Fundador · operador de IA aplicada desde 2022
            </p>
            <p className="vds-mentor-bio">
              Antes da Viver de IA, fundou duas empresas SaaS — uma com saída em 2018, outra ativa. Hoje mentora 220 operadores diretamente e escreve o playbook que está reorganizando como times de produto pensam IA no Brasil.
            </p>

            <ul className="vds-mentor-meta">
              <li><MapPin size={12} strokeWidth={2} /> São Paulo · SP</li>
              <li><Headphones size={12} strokeWidth={2} /> Caio fala português, inglês e espanhol</li>
              <li><Calendar size={12} strokeWidth={2} /> Disponibilidade · ter+qui · 14h-18h BRT</li>
            </ul>

            <div className="vds-mentor-socials">
              <a href="#" aria-label="LinkedIn"><Link2 size={14} strokeWidth={2.2} /></a>
              <a href="#" aria-label="Twitter"><AtSign size={14} strokeWidth={2.2} /></a>
              <a href="#" aria-label="Site"><Globe size={14} strokeWidth={2.2} /></a>
            </div>
          </div>

          <div className="vds-mentor-r">
            <div className="vds-mentor-stats">
              <div>
                <strong>220</strong>
                <em>mentorados ativos</em>
              </div>
              <div>
                <strong>4,9</strong>
                <em>NPS sessões</em>
              </div>
              <div>
                <strong>14h</strong>
                <em>tempo médio até primeira sessão</em>
              </div>
            </div>

            <div className="vds-mentor-actions">
              <button className="vds-mentor-btn primary">
                <Calendar size={14} strokeWidth={2.2} />
                Agendar sessão · 1:1
              </button>
              <button className="vds-mentor-btn ghost">
                <MessageCircle size={14} strokeWidth={2.2} />
                Mandar mensagem
              </button>
            </div>

            <div className="vds-mentor-quote">
              <span>Frase canônica · Caio</span>
              <p>
                Não vendo "transformação digital". Vendo decisão por decisão.
              </p>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Team grid ---------- */
function TeamGridSection() {
  const team = [
    { name: 'Caio Ribeiro', role: 'Fundador · mentor head', av: 'CR', tag: 'mentoria', metaL: '220', metaR: 'mentorados ativos' },
    { name: 'Yago Almeida', role: 'Tech lead · plataforma', av: 'YA', tag: 'plataforma', metaL: 'iris', metaR: 'nina-agent · vps' },
    { name: 'Mateus Silva', role: 'Comunidade · operações', av: 'MS', tag: 'comunidade', metaL: '4.9K', metaR: 'membros no Discord' },
    { name: 'Luiza Ramos', role: 'Curadora · editorial', av: 'LR', tag: 'conteúdo', metaL: '142', metaR: 'pgs · playbook' },
    { name: 'Rafael Milagre', role: 'CEO · ecosystem', av: 'RM', tag: 'liderança', metaL: '38', metaR: 'contas corporate' },
    { name: 'Camila Esteves', role: 'Customer success', av: 'CE', tag: 'sucesso', metaL: '92%', metaR: 'taxa de retenção' },
  ];

  return (
    <Section title="Team grid · time interno em carteira" meta="página /sobre · about us · team page">
      <div className="vds-team-grid">
        {team.map((m, i) => (
          <article key={m.name} className={`vds-team-card ${i === 0 ? 'lead' : ''}`}>
            <span className="vds-team-flag" aria-hidden="true" />
            <header className="vds-team-head">
              <div className="vds-team-avatar-wrap">
                <div className="vds-team-avatar">
                  <span>{m.av}</span>
                </div>
                {i === 0 && <span className="vds-team-crown" title="Fundador">★</span>}
              </div>
              <span className="vds-team-tag">{m.tag}</span>
            </header>

            <div className="vds-team-text">
              <h4>{m.name}</h4>
              <p className="vds-team-role">{m.role}</p>
            </div>

            <div className="vds-team-stat">
              <strong>{m.metaL}</strong>
              <em>{m.metaR}</em>
            </div>

            <footer className="vds-team-actions">
              <a href="#" aria-label="LinkedIn"><Link2 size={11} strokeWidth={2.2} /></a>
              <a href="#" aria-label="Email"><Mail size={11} strokeWidth={2.2} /></a>
              <a href="#" aria-label="Chat"><MessageCircle size={11} strokeWidth={2.2} /></a>
              <span className="vds-team-actions-sep" />
              <a href="#" className="vds-team-profile">Ver perfil</a>
            </footer>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Member list ---------- */
function MemberListSection() {
  const members = [
    { name: 'Márisson Lage', role: 'CEO · Efizi Soluções', av: 'ML', plan: 'Mentoria', last: 'há 4 min', streak: 14, status: 'online' },
    { name: 'Daniel Pinheiro', role: 'Founder · Pivot Studio', av: 'DP', plan: 'Mentoria', last: 'há 22 min', streak: 7, status: 'online' },
    { name: 'Camila Moraes', role: 'Head IA · Mantra Tech', av: 'CM', plan: 'Corporate', last: 'ontem', streak: 21, status: 'offline' },
    { name: 'Pedro Sousa', role: 'Indep · operador IA', av: 'PS', plan: 'Comunidade', last: 'há 3h', streak: 3, status: 'away' },
    { name: 'Bruna Carvalho', role: 'Product · Lumin Saúde', av: 'BC', plan: 'Mentoria', last: 'há 28 min', streak: 18, status: 'online' },
    { name: 'Felipe Andrade', role: 'CTO · Olara Bank', av: 'FA', plan: 'Corporate', last: 'há 1h', streak: 11, status: 'busy' },
  ];

  return (
    <Section title="Member list · alunos com status" meta="admin · diretório de operadores · turma">
      <div className="vds-member-list">
        <header>
          <div>
            <h3>Operadores · plano Mentoria + Corporate</h3>
            <p>248 ativos · 6 mostrados</p>
          </div>
          <div className="vds-member-actions">
            <div className="vds-member-search">
              <Search size={13} strokeWidth={2.2} />
              <input placeholder="Buscar operador" />
            </div>
            <button className="vds-member-btn">
              <Filter size={13} strokeWidth={2.2} />
              Filtros
            </button>
          </div>
        </header>

        <div className="vds-member-thead">
          <span>Operador</span>
          <span>Plano</span>
          <span>Streak</span>
          <span>Última atividade</span>
        </div>

        <ul>
          {members.map((m) => (
            <li key={m.name}>
              <div className="vds-member-user">
                <span className={`vds-member-av ${m.status}`}>
                  {m.av}
                  <span className={`vds-member-dot ${m.status}`} />
                </span>
                <div>
                  <p><strong>{m.name}</strong></p>
                  <span>{m.role}</span>
                </div>
              </div>
              <span className={`vds-member-plan ${m.plan.toLowerCase()}`}>{m.plan}</span>
              <span className="vds-member-streak">
                <Award size={11} strokeWidth={2} />
                {m.streak} dias
              </span>
              <span className="vds-member-last">{m.last}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- User popover (preview cards) ---------- */
function UserPopoverSection() {
  return (
    <Section title="User popover · hover/mention preview" meta="mostrar quem é a pessoa sem abrir página inteira">
      <div className="vds-userpop-row">
        <div className="vds-userpop-card">
          <header>
            <span className="av big">ML</span>
            <span className="vds-userpop-plan">Mentoria · 7 meses</span>
          </header>
          <h4>Márisson Lage</h4>
          <p className="vds-userpop-role">CEO · Efizi Soluções</p>
          <p className="vds-userpop-bio">
            Implementou a Nina como SDR · 11.920 conversas/mês em produção. Está no módulo 03 do curso.
          </p>
          <div className="vds-userpop-stats">
            <span><strong>14</strong> aulas</span>
            <span>·</span>
            <span><Award size={11} strokeWidth={2} /> <strong>14d</strong> streak</span>
            <span>·</span>
            <span>5,0 ★</span>
          </div>
          <div className="vds-userpop-actions">
            <button className="vds-userpop-btn primary">
              <MessageCircle size={12} strokeWidth={2.2} />
              Mandar mensagem
            </button>
            <button className="vds-userpop-btn ghost">
              Ver perfil
              <ChevronRight size={12} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className="vds-userpop-card mentor">
          <header>
            <span className="av big nav">CR</span>
            <span className="vds-userpop-plan mentor-pill">★ Mentor head</span>
          </header>
          <h4>Caio Ribeiro</h4>
          <p className="vds-userpop-role">Fundador · Viver de IA</p>
          <p className="vds-userpop-bio">
            220 mentorados ativos · responde em até 14h · mentoria 1:1 + lives.
          </p>
          <div className="vds-userpop-stats">
            <span><Star size={11} strokeWidth={2} style={{ fill: "var(--via-navy)", stroke: "var(--via-navy)" }} /> <strong>4,9</strong></span>
            <span>·</span>
            <span><Users size={11} strokeWidth={2} /> <strong>220</strong></span>
            <span>·</span>
            <span>resp. 14h</span>
          </div>
          <div className="vds-userpop-actions">
            <button className="vds-userpop-btn primary">
              <Calendar size={12} strokeWidth={2.2} />
              Agendar sessão
            </button>
            <button className="vds-userpop-btn ghost">
              Ver perfil
              <ChevronRight size={12} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className="vds-userpop-card minimal">
          <header>
            <span className="av big">CR</span>
            <span className="vds-userpop-plan corp">Corporate · admin</span>
          </header>
          <h4>Camila Moraes</h4>
          <p className="vds-userpop-role">Head IA · Mantra Tech</p>
          <p className="vds-userpop-bio">
            Admin do plano Corporate da Mantra · gerencia 12 lugares · onboarding ativo.
          </p>
          <div className="vds-userpop-stats">
            <span><Users size={11} strokeWidth={2} /> <strong>12</strong> no time</span>
            <span>·</span>
            <span><strong>3</strong> ativos hoje</span>
          </div>
          <div className="vds-userpop-actions">
            <button className="vds-userpop-btn ghost full">
              Ver dashboard do time
              <ChevronRight size={12} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
