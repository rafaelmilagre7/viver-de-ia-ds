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
        lede="Quatro intensidades pra mostrar gente — mentor profile (peso editorial), team grid (carteira do time), member list (membros), user popover (preview rápido). Toda foto/avatar carregada, toda métrica honesta, sem 'expert badge' falso."
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
          <span className="vds-mentor-tag">Mentor · Viver de IA</span>
        </div>

        <div className="vds-mentor-body">
          <div className="vds-mentor-l">
            <div className="vds-mentor-avatar">CR</div>
            <h3>Caio Ribeiro</h3>
            <p className="vds-mentor-role">
              Mentor · operador de IA aplicada desde 2022
            </p>
            <p className="vds-mentor-bio">
              Antes da Viver de IA, fundou duas empresas SaaS — uma com saída em 2018, outra ativa. Hoje conduz check-ins de mentoria em grupo e sessões individuais do Enterprise, e escreve playbooks de implementação.
            </p>

            <ul className="vds-mentor-meta">
              <li><MapPin size={14} strokeWidth={1.75} /> São Paulo · SP</li>
              <li><Headphones size={14} strokeWidth={1.75} /> Caio fala português, inglês e espanhol</li>
              <li><Calendar size={14} strokeWidth={1.75} /> Disponibilidade · ter+qui · 14h-18h BRT</li>
            </ul>

            <div className="vds-mentor-socials">
              <a href="#" aria-label="LinkedIn"><Link2 size={16} strokeWidth={1.75} /></a>
              <a href="#" aria-label="Twitter"><AtSign size={16} strokeWidth={1.75} /></a>
              <a href="#" aria-label="Site"><Globe size={16} strokeWidth={1.75} /></a>
            </div>
          </div>

          <div className="vds-mentor-r">
            <div className="vds-mentor-stats">
              <div>
                <strong>38</strong>
                <em>empresas acompanhadas</em>
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
                <Calendar size={16} strokeWidth={1.75} />
                Agendar sessão · individual
              </button>
              <button className="vds-mentor-btn ghost">
                <MessageCircle size={16} strokeWidth={1.75} />
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
    { name: 'Rafael Milagre', role: 'Fundador · Viver de IA', av: 'RM', tag: 'liderança', metaL: '521', metaR: 'cases reais' },
    { name: 'Yago Martins', role: 'Co-fundador', av: 'YM', tag: 'liderança', metaL: '157', metaR: 'soluções prontas' },
    { name: 'Luccas Riedo', role: 'CEO', av: 'LR', tag: 'liderança', metaL: '29', metaR: 'setores' },
    { name: '[Nome 4]', role: '[cargo] · plataforma', av: 'N4', tag: 'plataforma', metaL: '[N]', metaR: 'serviços · infra' },
    { name: '[Nome 5]', role: '[cargo] · comunidade', av: 'N5', tag: 'comunidade', metaL: '[N]', metaR: 'membros na comunidade' },
    { name: '[Nome 6]', role: '[cargo] · sucesso', av: 'N6', tag: 'sucesso', metaL: '90d', metaR: 'janela da garantia' },
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
              <a href="#" aria-label="LinkedIn"><Link2 size={14} strokeWidth={1.75} /></a>
              <a href="#" aria-label="Email"><Mail size={14} strokeWidth={1.75} /></a>
              <a href="#" aria-label="Chat"><MessageCircle size={16} strokeWidth={1.75} /></a>
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
    { name: 'Larissa Tavares', role: 'CEO · e-commerce', av: 'LT', plan: 'Pro', tone: 'mentoria', last: 'há 4 min', streak: 14, status: 'online' },
    { name: 'Thiago Reis', role: 'Founder · estúdio digital', av: 'TR', plan: 'Pro', tone: 'mentoria', last: 'há 22 min', streak: 7, status: 'online' },
    { name: 'Renata Costa', role: 'Head IA · fintech', av: 'RC', plan: 'Enterprise', tone: 'corporate', last: 'ontem', streak: 21, status: 'offline' },
    { name: 'Pedro Sousa', role: 'Indep · operador IA', av: 'PS', plan: 'Starter', tone: 'comunidade', last: 'há 3h', streak: 3, status: 'away' },
    { name: 'Bruna Carvalho', role: 'Product · Lumin Saúde', av: 'BC', plan: 'Pro', tone: 'mentoria', last: 'há 28 min', streak: 18, status: 'online' },
    { name: 'Felipe Andrade', role: 'CTO · Olara Bank', av: 'FA', plan: 'Enterprise', tone: 'corporate', last: 'há 1h', streak: 11, status: 'busy' },
  ];

  return (
    <Section title="Member list · membros com status" meta="admin · diretório de membros · plano">
      <div className="vds-member-list">
        <header>
          <div>
            <h3>Membros · planos Pro + Enterprise</h3>
            <p>248 ativos · 6 mostrados</p>
          </div>
          <div className="vds-member-actions">
            <div className="vds-member-search">
              <Search size={14} strokeWidth={1.75} />
              <input placeholder="Buscar membro" />
            </div>
            <button className="vds-member-btn">
              <Filter size={14} strokeWidth={1.75} />
              Filtros
            </button>
          </div>
        </header>

        <div className="via-table-wrap">
          <table className="via-table vds-member-table">
            <thead>
              <tr>
                <th scope="col">Membro</th>
                <th scope="col">Plano</th>
                <th scope="col" className="via-num">Streak</th>
                <th scope="col">Última atividade</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.name}>
                  <td>
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
                  </td>
                  <td>
                    <span className={`vds-member-plan ${m.tone}`}>{m.plan}</span>
                  </td>
                  <td className="via-num">
                    <span className="vds-member-streak">
                      <Award size={14} strokeWidth={1.75} />
                      {m.streak} dias
                    </span>
                  </td>
                  <td className="vds-member-last">{m.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            <span className="av big">LT</span>
            <span className="vds-userpop-plan">Plano Pro · 7 meses</span>
          </header>
          <h4>Larissa Tavares</h4>
          <p className="vds-userpop-role">CEO · e-commerce</p>
          <p className="vds-userpop-bio">
            Implementou um agente SDR no WhatsApp · 3 soluções no ar. Está no módulo 03 da formação.
          </p>
          <div className="vds-userpop-stats">
            <span><strong>14</strong> aulas</span>
            <span>·</span>
            <span><Award size={14} strokeWidth={1.75} /> <strong>14d</strong> streak</span>
            <span>·</span>
            <span>5,0 ★</span>
          </div>
          <div className="vds-userpop-actions">
            <button className="vds-userpop-btn primary">
              <MessageCircle size={16} strokeWidth={1.75} />
              Mandar mensagem
            </button>
            <button className="vds-userpop-btn ghost">
              Ver perfil
              <ChevronRight size={14} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="vds-userpop-card mentor">
          <header>
            <span className="av big nav">CR</span>
            <span className="vds-userpop-plan mentor-pill">★ Mentor</span>
          </header>
          <h4>Caio Ribeiro</h4>
          <p className="vds-userpop-role">Mentor · Viver de IA</p>
          <p className="vds-userpop-bio">
            38 empresas acompanhadas · responde em até 14h · mentoria em grupo.
          </p>
          <div className="vds-userpop-stats">
            <span><Star size={14} strokeWidth={1.75} style={{ fill: 'var(--via-text-primary)', stroke: 'var(--via-text-primary)' }} /> <strong>4,9</strong></span>
            <span>·</span>
            <span><Users size={14} strokeWidth={1.75} /> <strong>38</strong></span>
            <span>·</span>
            <span>resp. 14h</span>
          </div>
          <div className="vds-userpop-actions">
            <button className="vds-userpop-btn primary">
              <Calendar size={14} strokeWidth={1.75} />
              Agendar sessão
            </button>
            <button className="vds-userpop-btn ghost">
              Ver perfil
              <ChevronRight size={14} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="vds-userpop-card minimal">
          <header>
            <span className="av big">RC</span>
            <span className="vds-userpop-plan corp">Enterprise · admin</span>
          </header>
          <h4>Renata Costa</h4>
          <p className="vds-userpop-role">Head IA · fintech</p>
          <p className="vds-userpop-bio">
            Admin do plano Enterprise · gerencia 12 lugares · trilha de onboarding ativa.
          </p>
          <div className="vds-userpop-stats">
            <span><Users size={14} strokeWidth={1.75} /> <strong>12</strong> no time</span>
            <span>·</span>
            <span><strong>3</strong> ativos hoje</span>
          </div>
          <div className="vds-userpop-actions">
            <button className="vds-userpop-btn ghost full">
              Ver dashboard do time
              <ChevronRight size={14} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
