import {
  Activity, Check, ChevronRight, History,
  Server, Database, MessageCircle, Globe, Lock,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './status-page.css';

export default function StatusPage() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · status page"
        title={
          <>
            Transparência sobre o ar — <em>quando dá, quando não dá</em>.
          </>
        }
        lede="Página de status pública — header com estado geral em prosa editorial, serviços agrupados com uptime bar de 90 dias, incidentes recentes em timeline e métricas de SLA. Quando tudo funciona, mostra calma; quando algo falha, mostra honestidade."
      />

      <StatusOverviewSection />
      <StatusServicesSection />
      <StatusIncidentsSection />
    </>
  );
}

/* ---------- Overview · estado geral ---------- */
function StatusOverviewSection() {
  return (
    <Section title="Header status · estado geral em prosa" meta="quando ok · navy calmo · quando incidente · navy escuro + linha editorial">
      <article className="vds-st-overview ok">
        <div className="vds-st-overview-body">
          <span className="vds-st-eyebrow">
            Atualizado · há 2 min · checagem automática a cada 60s
          </span>
          <h2>
            Tudo no ar, <em>todos os serviços operando normalmente</em>.
          </h2>
          <p className="vds-st-overview-lede">
            Última semana com <strong>99.96% de disponibilidade</strong> · sem incidentes nos últimos 22 dias. Próxima janela de manutenção programada pra <strong>dom 23 mai · 04h-06h BRT</strong>.
          </p>
        </div>

        <aside className="vds-st-overview-stats">
          <div>
            <strong className="mono">99.96%</strong>
            <em>uptime · 30 dias</em>
          </div>
          <span className="vds-st-overview-sep" />
          <div>
            <strong className="mono">22 dias</strong>
            <em>sem incidente</em>
          </div>
          <span className="vds-st-overview-sep" />
          <div>
            <strong className="mono">142ms</strong>
            <em>resposta média · API</em>
          </div>
        </aside>
      </article>
    </Section>
  );
}

/* ---------- Services · uptime bars 90 days ---------- */
function StatusServicesSection() {
  const services = [
    {
      group: 'Plataforma',
      items: [
        { name: 'API pública (api.viverdeia.ai)', icon: Server, status: 'ok', uptime: 99.98, days: makeDays(0) },
        { name: 'Dashboard (app.viverdeia.ai)', icon: Globe, status: 'ok', uptime: 99.96, days: makeDays(2) },
        { name: 'Webhooks de saída', icon: Activity, status: 'ok', uptime: 99.92, days: makeDays(4) },
      ],
    },
    {
      group: 'Nina · agentes IA',
      items: [
        { name: 'Inference da Nina (texto)', icon: MessageCircle, status: 'ok', uptime: 99.94, days: makeDays(1) },
        { name: 'Transcrição de áudio', icon: Activity, status: 'ok', uptime: 99.88, days: makeDays(3) },
        { name: 'Geração de embeddings', icon: Database, status: 'degraded', uptime: 98.42, days: makeDays(12) },
      ],
    },
    {
      group: 'Autenticação & segurança',
      items: [
        { name: 'SSO / OAuth', icon: Lock, status: 'ok', uptime: 99.99, days: makeDays(0) },
        { name: 'Auditoria (audit log)', icon: Activity, status: 'ok', uptime: 100, days: makeDays(0) },
      ],
    },
  ];

  return (
    <Section title="Serviços · uptime 90 dias · agrupados editorial" meta="cada bar = 1 dia · navy = ok · cinza claro = degradado · coral = down">
      <article className="vds-st-services">
        {services.map((g) => (
          <div key={g.group} className="vds-st-group">
            <header className="vds-st-group-head">
              <h4>{g.group}</h4>
              <span className="vds-st-group-count mono">{g.items.length} serviços</span>
            </header>

            <ul className="vds-st-list">
              {g.items.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.name} className={`vds-st-row ${s.status}`}>
                    <div className="vds-st-row-l">
                      <div className="vds-st-row-icon">
                        <Icon size={14} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="vds-st-row-name">{s.name}</p>
                        <p className="vds-st-row-uptime">
                          <span className={`vds-st-pill ${s.status}`}>
                            {s.status === 'ok' ? 'operacional' : s.status === 'degraded' ? 'degradado' : 'fora do ar'}
                          </span>
                          <span className="mono">{s.uptime.toFixed(2)}%</span>
                          <em>uptime · 90 dias</em>
                        </p>
                      </div>
                    </div>
                    <div className="vds-st-bars">
                      {s.days.map((d, i) => (
                        <span
                          key={i}
                          className={`vds-st-bar ${d.state}`}
                          title={`${d.label} · ${d.state === 'ok' ? 'operacional' : d.state === 'degraded' ? 'degradado' : 'incidente'}`}
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </article>
    </Section>
  );
}

/* ---------- Incidents timeline ---------- */
function StatusIncidentsSection() {
  const incidents = [
    {
      date: '05 mai 2026',
      severity: 'maintenance',
      title: 'Janela programada · atualização da Nina',
      status: 'resolved',
      duration: '1h 14min · planejado',
      updates: [
        { time: '04h00', text: 'Início da janela · Nina pausada conforme avisado.' },
        { time: '05h14', text: 'Deploy concluído · 100% do tráfego restaurado. Sem regressões reportadas.' },
      ],
    },
    {
      date: '24 abr 2026',
      severity: 'minor',
      title: 'Latência elevada em embeddings · 18min',
      status: 'resolved',
      duration: '18min · impacto pequeno',
      updates: [
        { time: '14h32', text: 'Detectada latência acima de 800ms na geração de embeddings.' },
        { time: '14h41', text: 'Identificado: fila do provider externo congestionada. Aplicado retry com circuit breaker.' },
        { time: '14h50', text: 'Latência normalizada · monitorando.' },
      ],
    },
    {
      date: '11 abr 2026',
      severity: 'maintenance',
      title: 'Migração do banco principal · janela noturna',
      status: 'resolved',
      duration: '2h 02min · planejado',
      updates: [
        { time: '03h00', text: 'Início · banco em modo somente-leitura.' },
        { time: '05h02', text: 'Migração concluída · banco em modo escrita liberado · checks ok.' },
      ],
    },
  ];

  return (
    <Section title="Incidentes recentes · timeline com update editorial" meta="últimos 90 dias · cada incidente com histórico de mensagens">
      <article className="vds-st-incidents">
        <header>
          <div>
            <h4>Histórico de 90 dias</h4>
            <p>3 incidentes · todos resolvidos · 1 manutenção em maio</p>
          </div>
          <a href="#archive" className="vds-st-incidents-archive">
            <History size={11} strokeWidth={2.2} />
            Ver arquivo completo
            <ChevronRight size={11} strokeWidth={2.4} />
          </a>
        </header>

        <ol className="vds-st-inc-list">
          {incidents.map((inc, i) => (
            <li key={i} className={`vds-st-inc ${inc.severity}`}>
              <div className="vds-st-inc-mark">
                <span className="vds-st-inc-dot" />
                <span className="vds-st-inc-line" />
              </div>
              <article>
                <header>
                  <div className="vds-st-inc-meta">
                    <span className="vds-st-inc-date mono">{inc.date}</span>
                    <span className={`vds-st-inc-sev ${inc.severity}`}>
                      {inc.severity === 'maintenance' ? 'Manutenção' : inc.severity === 'minor' ? 'Menor' : 'Maior'}
                    </span>
                    <span className="vds-st-inc-dur">{inc.duration}</span>
                  </div>
                  <h3>{inc.title}</h3>
                </header>

                <ul className="vds-st-inc-updates">
                  {inc.updates.map((u, j) => (
                    <li key={j}>
                      <span className="vds-st-inc-update-time mono">{u.time}</span>
                      <span className="vds-st-inc-update-text">{u.text}</span>
                    </li>
                  ))}
                </ul>

                <footer>
                  <span className="vds-st-inc-status">
                    <Check size={10} strokeWidth={3} />
                    Resolvido · sem ação necessária do cliente
                  </span>
                </footer>
              </article>
            </li>
          ))}
        </ol>
      </article>
    </Section>
  );
}

/* Helper · generate fake 90 days status for uptime bars */
function makeDays(badCount: number) {
  const days = Array.from({ length: 90 }, (_, i) => ({
    label: `D-${89 - i}`,
    state: 'ok' as 'ok' | 'degraded' | 'down',
  }));
  // Place degraded/down days randomly
  for (let i = 0; i < badCount; i++) {
    const idx = (i * 11 + 7) % 90;
    days[idx].state = i % 3 === 0 ? 'down' : 'degraded';
  }
  return days;
}
