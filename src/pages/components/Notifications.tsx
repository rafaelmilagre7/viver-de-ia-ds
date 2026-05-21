import {
  Bell, MessageCircle, Award, Calendar, Heart, Info, AlertTriangle, AlertOctagon,
  Check, X, Filter, Search, Archive, Star, ChevronRight, Circle,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './notifications.css';

export default function Notifications() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · notification & status"
        title={
          <>
            Atenção <em>dosada e editorial</em>.
          </>
        }
        lede="Como o sistema chama o aluno — sem ser ruidoso. Panel dropdown pra rotina, banners pra urgência, status indicators pra vida real (online, ao vivo, ausente), inbox completa pra histórico. Cada nível com peso visual proporcional à criticidade."
      />

      <PanelSection />
      <BannersSection />
      <StatusSection />
      <InboxSection />
    </>
  );
}

/* ---------- Notification panel dropdown ---------- */
function PanelSection() {
  return (
    <Section title="Notification panel · dropdown do sino" meta="header bell · 280px · até 6 items recentes">
      <div className="vds-notif-panel-stage">
        <div className="vds-notif-bell">
          <Bell size={14} strokeWidth={2.2} />
          <span className="vds-notif-dot">3</span>
        </div>
        <div className="vds-notif-panel">
          <header>
            <h3>Notificações</h3>
            <button>Marcar todas como lidas</button>
          </header>

          <ul>
            <li className="unread">
              <span className="vds-notif-icon mention">
                <MessageCircle size={13} strokeWidth={2.2} />
              </span>
              <div className="vds-notif-body">
                <p>
                  <strong>Caio Ribeiro</strong> respondeu sua pergunta sobre few-shot
                </p>
                <span className="vds-notif-meta">Aula 02.02 · 4 minutos atrás</span>
              </div>
              <span className="vds-notif-pulse" />
            </li>

            <li className="unread">
              <span className="vds-notif-icon achievement">
                <Award size={13} strokeWidth={2.2} />
              </span>
              <div className="vds-notif-body">
                <p>
                  Você bateu uma <strong>streak de 14 dias</strong> — mais que 87% dos alunos
                </p>
                <span className="vds-notif-meta">Hoje · automático</span>
              </div>
              <span className="vds-notif-pulse" />
            </li>

            <li className="unread">
              <span className="vds-notif-icon live">
                <Calendar size={13} strokeWidth={2.2} />
              </span>
              <div className="vds-notif-body">
                <p>
                  <strong>Live agendada</strong> · sex 22 mai · 14h · auditoria de prompts
                </p>
                <span className="vds-notif-meta">há 2 horas</span>
              </div>
              <span className="vds-notif-pulse" />
            </li>

            <li>
              <span className="vds-notif-icon">
                <Heart size={13} strokeWidth={2.2} />
              </span>
              <div className="vds-notif-body">
                <p>
                  <strong>Márisson Lage</strong> curtiu sua nota da aula 02.01
                </p>
                <span className="vds-notif-meta">há 8 horas</span>
              </div>
            </li>

            <li>
              <span className="vds-notif-icon">
                <MessageCircle size={13} strokeWidth={2.2} />
              </span>
              <div className="vds-notif-body">
                <p>
                  Nova discussão em <strong>03.04 · Roteamento entre modelos</strong>
                </p>
                <span className="vds-notif-meta">ontem · 18:42</span>
              </div>
            </li>
          </ul>

          <footer>
            <a href="#">
              Ver todas as notificações
              <ChevronRight size={13} strokeWidth={2.4} />
            </a>
          </footer>
        </div>
      </div>
    </Section>
  );
}

/* ---------- System banners ---------- */
function BannersSection() {
  return (
    <Section title="System banners · 4 níveis editorial" meta="info · convite · alerta · confirmação · cada um com voz própria">
      <div className="vds-banners">
        <article className="vds-banner info">
          <span className="vds-banner-bar" />
          <span className="vds-banner-icon">
            <Info size={15} strokeWidth={1.8} />
          </span>
          <div className="vds-banner-text">
            <p className="vds-banner-title">
              Live amanhã às 14h.
              <span className="vds-banner-tag">convite</span>
            </p>
            <p className="vds-banner-body">
              Caio e Márisson revisam 3 prompts reais do grupo, ao vivo, com gravação publicada em 24h.
            </p>
          </div>
          <a href="#" className="vds-banner-cta">
            Reservar lugar
            <ChevronRight size={12} strokeWidth={2.4} />
          </a>
          <button className="vds-banner-x" aria-label="Fechar"><X size={12} strokeWidth={2.4} /></button>
        </article>

        <article className="vds-banner warn">
          <span className="vds-banner-bar" />
          <span className="vds-banner-icon">
            <AlertTriangle size={15} strokeWidth={1.8} />
          </span>
          <div className="vds-banner-text">
            <p className="vds-banner-title">
              Sua mentoria expira em 8 dias.
              <span className="vds-banner-tag">atenção</span>
            </p>
            <p className="vds-banner-body">
              Renove agora pra manter acesso sem interrupção — a sessão de 22 mai já está confirmada no calendário.
            </p>
          </div>
          <a href="#" className="vds-banner-cta">
            Renovar plano
            <ChevronRight size={12} strokeWidth={2.4} />
          </a>
          <button className="vds-banner-x" aria-label="Fechar"><X size={12} strokeWidth={2.4} /></button>
        </article>

        <article className="vds-banner danger">
          <span className="vds-banner-bar" />
          <span className="vds-banner-icon">
            <AlertOctagon size={15} strokeWidth={1.8} />
          </span>
          <div className="vds-banner-text">
            <p className="vds-banner-title">
              Pagamento recusado.
              <span className="vds-banner-tag">ação obrigatória</span>
            </p>
            <p className="vds-banner-body">
              Não conseguimos processar a renovação automática — seu plano cai pra Comunidade em <strong>3 dias</strong> se não atualizar o método.
            </p>
          </div>
          <a href="#" className="vds-banner-cta">
            Atualizar cartão
            <ChevronRight size={12} strokeWidth={2.4} />
          </a>
          <button className="vds-banner-x" aria-label="Fechar"><X size={12} strokeWidth={2.4} /></button>
        </article>

        <article className="vds-banner success">
          <span className="vds-banner-bar" />
          <span className="vds-banner-icon">
            <Check size={15} strokeWidth={2.4} />
          </span>
          <div className="vds-banner-text">
            <p className="vds-banner-title">
              Renovação confirmada.
              <span className="vds-banner-tag">tudo certo</span>
            </p>
            <p className="vds-banner-body">
              Próxima cobrança em <strong>17 ago 2026</strong> · recibo enviado pro seu e-mail.
            </p>
          </div>
          <button className="vds-banner-x" aria-label="Fechar"><X size={12} strokeWidth={2.4} /></button>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Live status indicators ---------- */
function StatusSection() {
  return (
    <Section title="Status indicators · ao vivo, online, ausente" meta="badge pulsante · dot de presença · LIVE NOW editorial">
      <div className="vds-status-row">
        {/* LIVE NOW big */}
        <div className="vds-status-card via-mesh-navy via-noise">
          <span className="vds-live-pill">
            <span className="vds-live-dot" />
            <em>ao vivo agora</em>
          </span>
          <h3>
            Caio Ribeiro · auditando prompts <em>ao vivo</em>
          </h3>
          <p className="vds-live-meta">
            148 pessoas assistindo · começou há 12 minutos · transmissão pelo Discord
          </p>
          <div className="vds-live-row">
            <button className="vds-live-cta">Entrar agora</button>
            <span className="vds-live-stats">
              <span><strong>148</strong> ao vivo</span>
              <span>·</span>
              <span><strong>12</strong> mãos levantadas</span>
            </span>
          </div>
        </div>

        {/* Presence dots */}
        <div className="vds-presence-card">
          <p className="vds-presence-eyebrow">Presença · time interno</p>
          <ul className="vds-presence-list">
            <li>
              <span className="av">CR</span>
              <div>
                <p><strong>Caio Ribeiro</strong></p>
                <span><span className="dot online" /> online · respondendo agora</span>
              </div>
            </li>
            <li>
              <span className="av">YA</span>
              <div>
                <p><strong>Yago Almeida</strong></p>
                <span><span className="dot away" /> ausente · volta às 15h</span>
              </div>
            </li>
            <li>
              <span className="av">MS</span>
              <div>
                <p><strong>Mateus Silva</strong></p>
                <span><span className="dot busy" /> em sessão · não interromper</span>
              </div>
            </li>
            <li>
              <span className="av">LR</span>
              <div>
                <p><strong>Luiza Ramos</strong></p>
                <span><span className="dot offline" /> offline · ativo há 4h</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Inbox page ---------- */
function InboxSection() {
  const items = [
    { type: 'mention', who: 'Caio Ribeiro', what: 'respondeu sua pergunta sobre few-shot', where: 'Aula 02.02', when: 'há 4 min', unread: true, star: false },
    { type: 'achievement', who: 'Sistema Viver de IA', what: 'streak de 14 dias atingida — mais que 87% dos alunos', where: 'Métricas', when: 'hoje · auto', unread: true, star: true },
    { type: 'live', who: 'Calendário', what: 'live agendada · sex 22 mai · 14h · auditoria de prompts', where: 'Comunidade', when: 'há 2h', unread: true, star: false },
    { type: 'mention', who: 'Márisson Lage', what: 'curtiu sua nota da aula 02.01 sobre estrutura de prompts', where: 'Aula 02.01', when: 'há 8h', unread: false, star: false },
    { type: 'discussion', who: 'Discord interno', what: 'nova discussão em "Roteamento entre modelos"', where: 'Módulo 03', when: 'ontem · 18:42', unread: false, star: false },
    { type: 'payment', who: 'Financeiro', what: 'renovação trimestre confirmada · próxima cobrança 17 ago', where: 'Pagamentos', when: '14 mai', unread: false, star: false },
    { type: 'mention', who: 'Caio Ribeiro', what: 'mencionou você no canal #estudos-de-caso', where: 'Discord', when: '12 mai', unread: false, star: false },
  ];

  return (
    <Section title="Inbox · página completa de notificações" meta="filtros · busca · marcar lida · favoritar · arquivar">
      <div className="vds-inbox">
        <header>
          <div>
            <h3>Caixa de entrada</h3>
            <p>3 não lidas · 17 essa semana · 124 esse mês</p>
          </div>
          <div className="vds-inbox-actions">
            <div className="vds-inbox-search">
              <Search size={13} strokeWidth={2.2} />
              <input placeholder="Buscar notificações" />
            </div>
            <button className="vds-inbox-btn">
              <Filter size={13} strokeWidth={2.2} />
              Filtrar
            </button>
            <button className="vds-inbox-btn">
              <Check size={13} strokeWidth={2.2} />
              Marcar todas
            </button>
          </div>
        </header>

        <div className="vds-inbox-tabs">
          <button className="on">Todas <span>20</span></button>
          <button>Não lidas <span>3</span></button>
          <button>Menções <span>5</span></button>
          <button>Comunidade <span>9</span></button>
          <button>Sistema <span>6</span></button>
          <button>Favoritas <span>1</span></button>
        </div>

        <ul className="vds-inbox-list">
          {items.map((it, i) => (
            <li key={i} className={`vds-inbox-item ${it.unread ? 'unread' : ''}`}>
              <span className="vds-inbox-icon">
                {it.type === 'mention' && <MessageCircle size={14} strokeWidth={2} />}
                {it.type === 'achievement' && <Award size={14} strokeWidth={2} />}
                {it.type === 'live' && <Calendar size={14} strokeWidth={2} />}
                {it.type === 'discussion' && <MessageCircle size={14} strokeWidth={2} />}
                {it.type === 'payment' && <Circle size={14} strokeWidth={2} style={{ fill: "var(--via-navy)" }} />}
              </span>
              <div className="vds-inbox-text">
                <p>
                  <strong>{it.who}</strong> {it.what}
                </p>
                <span className="vds-inbox-meta">
                  <span>{it.where}</span>
                  <span className="sep">·</span>
                  <span>{it.when}</span>
                </span>
              </div>
              <div className="vds-inbox-rh">
                {it.star && <Star size={13} strokeWidth={2} style={{ fill: "var(--via-navy)" }} className="star on" />}
                {!it.star && <Star size={13} strokeWidth={2} className="star" />}
                <Archive size={13} strokeWidth={2} className="arch" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
