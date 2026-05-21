import { useState } from 'react';
import {
  ArrowRight, ArrowUpRight, X, Check, MessageCircle,
  TrendingUp, Award, Rocket, Calendar,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './more-components.css';

/* ==============================================================
   BANNER · SKELETON · NOTIFICATION · ACTIVITY · AVATAR GROUP
   Cinco peças num arquivo só (overview unificada)
   ============================================================== */

export default function MoreComponents() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · expansão"
        title={<>Mais cinco peças, <em>cada uma uma obra</em>.</>}
        lede="Banner editorial pra topo de página, Skeleton loading com shimmer, Notification panel em glass dark, Activity feed timeline rica, e Avatar group com presence. Todos na assinatura — mesh atmosférico, vidro suspenso, navy contrastado."
      />

      <BannerSection />
      <SkeletonSection />
      <NotificationSection />
      <ActivitySection />
      <AvatarGroupSection />
    </>
  );
}

/* ---- Banner ---- */
function BannerSection() {
  const [closed, setClosed] = useState(false);
  return (
    <Section title="Banner · announcement bar" meta="topo de página · ação clara">
      {!closed && (
        <div className="vds-ann-banner">
          <span className="vds-ann-pill"><Award size={12} strokeWidth={2.2} /> Novo</span>
          <p>
            <strong>Turma 2026.2 com 8 vagas restantes.</strong>
            <span className="muted"> Encerra em 12 dias — inscrição direta no painel.</span>
          </p>
          <div className="vds-ann-actions">
            <a className="vds-ann-cta">Garantir vaga <ArrowRight size={12} strokeWidth={2.5} /></a>
            <button className="vds-ann-close" onClick={() => setClosed(true)} aria-label="Fechar">
              <X size={12} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
      {closed && (
        <div className="vds-ann-banner ghost">
          <p>Banner fechado · <button onClick={() => setClosed(false)}>reabrir pra ver de novo</button></p>
        </div>
      )}
    </Section>
  );
}

/* ---- Skeleton ---- */
function SkeletonSection() {
  return (
    <Section title="Skeleton loading" meta="shimmer navy sutil">
      <div className="vds-skel-stage">
        <div className="vds-skel-card">
          <div className="vds-skel-row">
            <div className="vds-skel-avatar shimmer" />
            <div className="vds-skel-col" style={{ flex: 1 }}>
              <div className="vds-skel-line shimmer" style={{ width: '55%' }} />
              <div className="vds-skel-line shimmer thin" style={{ width: '35%' }} />
            </div>
          </div>
          <div className="vds-skel-line shimmer" style={{ width: '92%' }} />
          <div className="vds-skel-line shimmer" style={{ width: '78%' }} />
          <div className="vds-skel-line shimmer" style={{ width: '88%' }} />
          <div className="vds-skel-row" style={{ marginTop: 12 }}>
            <div className="vds-skel-pill shimmer" />
            <div className="vds-skel-pill shimmer" />
          </div>
        </div>
        <div className="vds-skel-card">
          <div className="vds-skel-line shimmer big" style={{ width: '40%' }} />
          <div className="vds-skel-line shimmer" style={{ width: '85%', marginTop: 16 }} />
          <div className="vds-skel-line shimmer" style={{ width: '70%' }} />
          <div className="vds-skel-line shimmer thin" style={{ width: '55%', marginTop: 12 }} />
        </div>
      </div>
    </Section>
  );
}

/* ---- Notification ---- */
function NotificationSection() {
  return (
    <Section title="Notification panel" meta="drawer glass dark">
      <div className="vds-notif-stage">
        <aside className="vds-notif">
          <header>
            <div>
              <p className="vds-eyebrow">Notificações</p>
              <h3>4 novas</h3>
            </div>
            <button className="all">Marcar tudo</button>
          </header>
          <ul>
            <li className="unread">
              <span className="ico ok"><Check size={14} strokeWidth={2.5} /></span>
              <div>
                <strong>Caio aprovou seu case</strong>
                <span>"Efizi: +11.920 conversas" foi publicado.</span>
                <span className="time">4 min</span>
              </div>
            </li>
            <li className="unread">
              <span className="ico info"><MessageCircle size={14} strokeWidth={2} /></span>
              <div>
                <strong>Nova mensagem · Larissa</strong>
                <span>Pode revisar o rascunho de stack que mandei?</span>
                <span className="time">38 min</span>
              </div>
            </li>
            <li>
              <span className="ico stat"><TrendingUp size={14} strokeWidth={2} /></span>
              <div>
                <strong>Métrica publicada</strong>
                <span>Receita influenciada cruzou R$ 248k em 2026.</span>
                <span className="time">2h</span>
              </div>
            </li>
            <li>
              <span className="ico warn"><Calendar size={14} strokeWidth={2} /></span>
              <div>
                <strong>Sessão na quarta · 19:30</strong>
                <span>Modelagem do seu primeiro agente — preparação anexa.</span>
                <span className="time">ontem</span>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </Section>
  );
}

/* ---- Activity feed ---- */
function ActivitySection() {
  const items = [
    { kind: 'success', who: 'Caio Ribeiro', what: 'aprovou case', ref: 'Efizi · E-commerce', when: '4 min', stat: '+11.920 conversas' },
    { kind: 'info', who: 'Larissa Tavares', what: 'comentou em', ref: 'Thread de integração', when: '38 min' },
    { kind: 'pub', who: 'Sistema', what: 'publicou métrica', ref: 'Receita influenciada', when: '2h', stat: 'R$ 248k em 2026' },
    { kind: 'deploy', who: 'Guilherme Delorenzo', what: 'subiu agente em produção', ref: 'Efizi · WhatsApp', when: '4h', stat: '100% automatizado' },
    { kind: 'info', who: 'Equipe VIA', what: 'agendou', ref: 'Workshop · publicando deploy', when: 'ontem' },
  ];

  const icoFor = (k: string) => {
    if (k === 'success') return <Check size={12} strokeWidth={3} />;
    if (k === 'info') return <MessageCircle size={12} strokeWidth={2.2} />;
    if (k === 'pub') return <TrendingUp size={12} strokeWidth={2.2} />;
    if (k === 'deploy') return <Rocket size={12} strokeWidth={2.2} />;
    return null;
  };

  return (
    <Section title="Activity feed · timeline rica" meta="painel interno">
      <div className="vds-feed">
        {items.map((a, i) => (
          <article key={i} className="vds-feed-item">
            <span className={`vds-feed-ico ${a.kind}`}>{icoFor(a.kind)}</span>
            {i < items.length - 1 && <span className="vds-feed-line" />}
            <div className="vds-feed-body">
              <header>
                <strong>{a.who}</strong>
                <span className="when">{a.when}</span>
              </header>
              <p>
                <em>{a.what}</em> {a.ref}
              </p>
              {a.stat && <span className="vds-feed-stat">{a.stat}</span>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---- Avatar group ---- */
function AvatarGroupSection() {
  const presence: Array<{ ini: string; status: 'live' | 'idle' | 'off' }> = [
    { ini: 'CR', status: 'live' },
    { ini: 'GD', status: 'live' },
    { ini: 'ML', status: 'idle' },
    { ini: 'LT', status: 'off' },
    { ini: 'RC', status: 'live' },
  ];

  return (
    <Section title="Avatar group · presence" meta="stack + presence dot">
      <div className="vds-avgroup-row">
        <div className="vds-avgroup">
          {presence.map((p, i) => (
            <span key={i} className="vds-avgroup-item">
              <span className="vds-avgroup-av">{p.ini}</span>
              <span className={`vds-avgroup-dot ${p.status}`} />
            </span>
          ))}
          <span className="vds-avgroup-more">+24</span>
        </div>
        <div className="vds-avgroup-meta">
          <strong>29 alunos ativos agora</strong>
          <span>3 ao vivo · 1 ocioso · 1 offline · +24 anteriores</span>
        </div>
      </div>

      <div className="vds-avgroup-list">
        {presence.slice(0, 4).map((p, i) => (
          <div key={i} className="vds-avgroup-card">
            <span className="vds-avgroup-item lg">
              <span className="vds-avgroup-av lg">{p.ini}</span>
              <span className={`vds-avgroup-dot ${p.status}`} />
            </span>
            <div>
              <strong>{p.ini === 'CR' ? 'Caio Ribeiro' : p.ini === 'GD' ? 'Guilherme Delorenzo' : p.ini === 'ML' ? 'Márisson Lage' : 'Larissa Tavares'}</strong>
              <span>{p.status === 'live' ? 'Ao vivo' : p.status === 'idle' ? 'Ocioso há 12 min' : 'Offline · saiu às 18:42'}</span>
            </div>
            <a className="link">Mensagem <ArrowUpRight size={12} strokeWidth={2.4} /></a>
          </div>
        ))}
      </div>
    </Section>
  );
}
