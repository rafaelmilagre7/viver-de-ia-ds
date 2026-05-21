import {
  Loader2, Search, ShieldOff, Wrench, Check, ArrowRight,
  Lock, RefreshCw, Compass, ListChecks,
  WifiOff, CalendarDays, Bell, Filter, Coffee, Plus,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './states.css';

export default function States() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · system states"
        title={
          <>
            Loading, erro, vazio, sucesso — <em>cada estado tratado</em>.
          </>
        }
        lede="O sistema vive em estados: esperando, falhando, vazio, completo. Cada um tem que parecer parte da marca, não uma página esquecida pelo time. Estes são os 4 grupos que sempre cobrem."
      />

      <LoadersSection />
      <ErrorPagesSection />
      <EmptyStatesSection />
      <EmptyPremiumSection />
      <SuccessStatesSection />
    </>
  );
}

/* ---------- Loaders ---------- */
function LoadersSection() {
  return (
    <Section title="Loading states · 3 grãos" meta="full page · inline · skeleton block">
      <div className="vds-loaders-row">
        {/* Full page cinematic */}
        <div className="vds-loader-card full via-mesh-navy via-noise">
          <img src={monogramWhite} alt="" className="vds-loader-mono" />
          <div className="vds-loader-ring">
            <span />
          </div>
          <p className="vds-loader-msg">
            Preparando sua sessão · <em>buscando aulas, notas e mentor</em>
          </p>
          <p className="vds-loader-sub">Costuma levar menos de 2s</p>
        </div>

        {/* Inline */}
        <div className="vds-loader-card inline">
          <div className="vds-loader-inline">
            <span className="vds-loader-bar" />
            <p>Sincronizando com a Nina · <strong>3 conversas restando</strong></p>
          </div>

          <div className="vds-loader-inline alt">
            <Loader2 size={14} strokeWidth={2.2} className="spin" />
            <p>Carregando transcript da aula 02.02…</p>
          </div>

          <div className="vds-loader-skel">
            <span className="vds-skel-line w70" />
            <span className="vds-skel-line w90" />
            <span className="vds-skel-line w50" />
            <div className="vds-skel-row">
              <span className="vds-skel-avatar" />
              <div className="vds-skel-block">
                <span className="vds-skel-line w40" />
                <span className="vds-skel-line w80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Error pages ---------- */
function ErrorPagesSection() {
  return (
    <Section title="Páginas de erro · 500 · 403 · manutenção" meta="cada uma com tom editorial · não 'oops!'">
      <div className="vds-errors">
        {/* 500 server error — navy atmosphere + incident ID terminal */}
        <article className="vds-error-card e500 via-mesh-navy via-noise">
          <span className="vds-error-orbit">
            <span className="vds-error-orbit-dot" />
          </span>
          <div className="vds-error-head">
            <span className="vds-error-eyebrow">
              <span className="vds-error-pulse" />
              Incidente em apuração
            </span>
            <span className="vds-error-code mono">500</span>
          </div>
          <h3>
            Algo travou <em>do nosso lado</em>.
          </h3>
          <p>
            Nosso time já foi alertado — não precisa reportar. Tentar de novo em 1-2 minutos geralmente resolve, e estamos checando se foi caso isolado ou tendência.
          </p>
          <div className="vds-error-actions">
            <button className="vds-error-btn primary on-dark">
              <RefreshCw size={13} strokeWidth={2.4} />
              Tentar de novo
            </button>
            <a href="#" className="vds-error-btn ghost on-dark">Voltar ao começo</a>
          </div>
          <p className="vds-error-id mono">
            <span>incidente</span>
            INC-2026-0517-184
          </p>
        </article>

        {/* 403 forbidden — plan gating, editorial accent tag */}
        <article className="vds-error-card e403">
          <div className="vds-error-icon">
            <ShieldOff size={22} strokeWidth={1.5} />
          </div>
          <span className="vds-error-code">Acesso restrito</span>
          <h3>
            Essa área é <em>do plano Mentoria</em>.
          </h3>
          <p>
            Os recursos avançados — auditoria, agente próprio, lives privadas — ficam disponíveis a partir do plano Mentoria. Você está no <strong>plano Comunidade</strong> hoje.
          </p>
          <div className="vds-error-plans">
            <div className="vds-error-plan current">
              <span className="lbl">Hoje</span>
              <strong>Comunidade</strong>
              <em>R$ 197/mês</em>
            </div>
            <span className="vds-error-plans-arrow">→</span>
            <div className="vds-error-plan target">
              <span className="lbl">Para destravar</span>
              <strong>Mentoria</strong>
              <em>R$ 6K/tri</em>
            </div>
          </div>
          <div className="vds-error-actions">
            <button className="vds-error-btn primary">
              Ver opções do plano
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
            <a href="#" className="vds-error-btn ghost">Voltar pra comunidade</a>
          </div>
        </article>

        {/* Maintenance — accent + progress + live status */}
        <article className="vds-error-card maintenance">
          <div className="vds-error-icon">
            <Wrench size={22} strokeWidth={1.5} />
          </div>
          <span className="vds-error-code maint">
            <span className="vds-error-live-dot" />
            Em manutenção
          </span>
          <h3>
            Estamos atualizando o motor da Nina.
          </h3>
          <p>
            Janela programada de 30 minutos. Tudo deve voltar ao normal por volta de <strong>14:30 BRT</strong>. Aulas e materiais offline continuam funcionando.
          </p>
          <div className="vds-error-progress">
            <div className="vds-error-progress-row">
              <span>14:00 BRT</span>
              <span className="mid">~ 18 min restantes</span>
              <span>14:30 BRT</span>
            </div>
            <div className="vds-error-progress-bar">
              <span style={{ width: '42%' }} />
            </div>
          </div>
          <div className="vds-error-actions">
            <button className="vds-error-btn primary accent">
              Acompanhar status
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
          </div>
          <p className="vds-error-id">
            <span>status</span>
            status.viverdeia.ai · atualizado há 2min
          </p>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Empty states ---------- */
function EmptyStatesSection() {
  return (
    <Section title="Empty states · 4 cenas" meta="sem resultados · sem dados ainda · primeiro acesso · tudo feito">
      <div className="vds-empties">
        {/* No results */}
        <article className="vds-empty-card">
          <div className="vds-empty-glyph">
            <Search size={22} strokeWidth={1.4} />
          </div>
          <h4>Nenhuma aula com "few-shot tuning"</h4>
          <p>Tente um termo mais geral, ou veja as 3 aulas em <em>"prompt engineering"</em> — costuma cobrir o que você procura.</p>
          <button className="vds-empty-btn">
            Limpar busca
          </button>
        </article>

        {/* No data yet (first time) */}
        <article className="vds-empty-card">
          <div className="vds-empty-glyph">
            <Compass size={22} strokeWidth={1.4} />
          </div>
          <h4>Bem-vindo · seu primeiro dashboard</h4>
          <p>Quando você completar a primeira aula, esse painel mostra progresso, próximos passos e métricas da sua trilha. Começa em <strong>01.01 · O que mudou de 2022 pra cá</strong>.</p>
          <button className="vds-empty-btn primary">
            Começar primeira aula
            <ArrowRight size={13} strokeWidth={2.4} />
          </button>
        </article>

        {/* No permission */}
        <article className="vds-empty-card">
          <div className="vds-empty-glyph">
            <Lock size={22} strokeWidth={1.4} />
          </div>
          <h4>Você ainda não tem acesso</h4>
          <p>Essa área é dos administradores do plano Corporate. Se você acha que deveria ter acesso, fala com seu admin ou com o time da Viver de IA.</p>
          <a href="#" className="vds-empty-btn">Solicitar acesso</a>
        </article>

        {/* All done */}
        <article className="vds-empty-card all-done">
          <div className="vds-empty-glyph done">
            <ListChecks size={22} strokeWidth={1.4} />
          </div>
          <h4>Sua caixa de entrada está limpa</h4>
          <p>Todas as 8 notificações desta semana já foram respondidas — boa. A próxima chega quando alguém te marcar no Discord ou tiver atualização da sua mentoria.</p>
          <button className="vds-empty-btn ghost">Ver histórico</button>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Empty states · premium ---------- */
function EmptyPremiumSection() {
  return (
    <Section title="Empty states · premium · atmosféricos" meta="cold start · sem conexão · sem notif · filtros · inbox zen · calendário">
      <div className="vds-empty-prem-grid">
        {/* Cold start dashboard — large featured, dark atmospheric, onboarding */}
        <article className="vds-empty-prem cold via-mesh-navy via-noise">
          <div className="vds-empty-prem-orbit">
            <span className="vds-empty-prem-orbit-dot" />
            <span className="vds-empty-prem-orbit-ring" />
          </div>
          <div className="vds-empty-prem-body">
            <span className="vds-empty-prem-eyebrow">
              Primeira semana
            </span>
            <h3>
              Seu painel <em>começa aqui</em>.
            </h3>
            <p>
              Em até 3 passos seu dashboard ganha vida — progresso real, próximos compromissos e Nina ouvindo o canal de vendas. Comece pelo primeiro.
            </p>
            <ol className="vds-empty-prem-steps">
              <li className="done">
                <span className="bullet"><Check size={11} strokeWidth={3} /></span>
                <div>
                  <strong>Conta criada</strong>
                  <em>terça · 14h12</em>
                </div>
              </li>
              <li className="current">
                <span className="bullet">2</span>
                <div>
                  <strong>Conectar Nina ao seu WhatsApp Business</strong>
                  <em>5min · liga o canal e o histórico</em>
                </div>
              </li>
              <li>
                <span className="bullet">3</span>
                <div>
                  <strong>Marcar a primeira aula no calendário</strong>
                  <em>3min · garante ritmo da turma</em>
                </div>
              </li>
            </ol>
            <div className="vds-empty-prem-actions">
              <button className="vds-empty-prem-btn primary on-dark">
                Continuar pelo passo 2
                <ArrowRight size={13} strokeWidth={2.4} />
              </button>
              <a href="#" className="vds-empty-prem-btn ghost on-dark">Faço depois</a>
            </div>
          </div>
        </article>

        {/* Offline — soft atmosphere with reconnection */}
        <article className="vds-empty-prem offline">
          <div className="vds-empty-prem-icon">
            <WifiOff size={20} strokeWidth={1.5} />
          </div>
          <span className="vds-empty-prem-eyebrow soft">
            Sem conexão · tentando voltar
          </span>
          <h4>
            A internet caiu por um instante.
          </h4>
          <p>
            Estamos tentando religar de 4 em 4 segundos. As últimas <strong>3 aulas que você abriu</strong> seguem disponíveis offline — pode continuar.
          </p>
          <div className="vds-empty-prem-trail">
            <div className="vds-empty-prem-trail-dots">
              <span /><span /><span /><span /><span />
            </div>
            <span className="vds-empty-prem-trail-lbl">próxima tentativa em 3s</span>
          </div>
        </article>

        {/* No notifications · zen */}
        <article className="vds-empty-prem zen">
          <div className="vds-empty-prem-icon zen">
            <Bell size={20} strokeWidth={1.5} />
          </div>
          <h4>
            Nada a relatar hoje.
          </h4>
          <p>
            A semana abriu calma — sem menções no Discord, sem mudança nos seus alunos, sem nota da mentoria. Use o silêncio.
          </p>
          <div className="vds-empty-prem-stat">
            <span className="lbl">última atualização</span>
            <strong>há 6h</strong>
          </div>
        </article>

        {/* Filter no results · with suggestion chips */}
        <article className="vds-empty-prem filter">
          <div className="vds-empty-prem-icon">
            <Filter size={20} strokeWidth={1.5} />
          </div>
          <h4>
            Nenhum operador casa com esses <em>3 filtros</em>.
          </h4>
          <p>
            Tente afrouxar um deles — geralmente <strong>"MRR &gt; R$ 4K"</strong> é o que mais restringe. Sugestões automáticas abaixo.
          </p>
          <div className="vds-empty-prem-chips">
            <button className="vds-empty-prem-chip">
              <span className="x">×</span>
              MRR &gt; R$ 4K
              <em>248 → 1.847</em>
            </button>
            <button className="vds-empty-prem-chip">
              <span className="x">×</span>
              Plano Corporate
              <em>4 → 38</em>
            </button>
            <button className="vds-empty-prem-chip">
              <span className="x">×</span>
              Ativo nos últimos 7d
              <em>112 → 220</em>
            </button>
          </div>
          <button className="vds-empty-prem-btn ghost">Limpar todos os filtros</button>
        </article>

        {/* Inbox zen — domingo */}
        <article className="vds-empty-prem inbox">
          <div className="vds-empty-prem-icon coffee">
            <Coffee size={20} strokeWidth={1.5} />
          </div>
          <span className="vds-empty-prem-eyebrow">Domingo · 18h32</span>
          <h4>
            Você zerou a caixa.
          </h4>
          <p>
            8 conversas respondidas durante a semana, todas com retorno. A próxima mensagem chega quando alguém te marcar — não vamos te incomodar antes.
          </p>
          <div className="vds-empty-prem-mini">
            <div>
              <strong>4h 12min</strong>
              <em>tempo total em conversa</em>
            </div>
            <span className="vds-empty-prem-sep" />
            <div>
              <strong>92%</strong>
              <em>respondidas em &lt; 24h</em>
            </div>
          </div>
        </article>

        {/* Empty calendar · week ahead clear */}
        <article className="vds-empty-prem calendar">
          <div className="vds-empty-prem-icon">
            <CalendarDays size={20} strokeWidth={1.5} />
          </div>
          <span className="vds-empty-prem-eyebrow">Semana de 18 · 24 mai</span>
          <h4>
            Sua semana está <em>limpa</em>.
          </h4>
          <p>
            Nenhuma sessão marcada — bom espaço pra deep work ou pra marcar o próximo encontro de mentoria.
          </p>
          <div className="vds-empty-prem-week">
            <div className="vds-empty-prem-week-row">
              {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((d, i) => (
                <div key={d} className="vds-empty-prem-day">
                  <span className="lbl">{d}</span>
                  <span className="num">{18 + i}</span>
                  <span className="slot" />
                </div>
              ))}
            </div>
          </div>
          <button className="vds-empty-prem-btn primary">
            <Plus size={13} strokeWidth={2.4} />
            Marcar sessão
          </button>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Success states ---------- */
function SuccessStatesSection() {
  return (
    <Section title="Success states · confirmação de ação" meta="pagamento aprovado · curso concluído · agendamento feito">
      <div className="vds-success-row">
        <article className="vds-success-card">
          <div className="vds-success-mark">
            <Check size={32} strokeWidth={2.5} />
            <span className="vds-success-pulse" />
          </div>
          <span className="vds-success-eyebrow">Pagamento aprovado</span>
          <h3>
            Bem-vindo ao plano <em>Mentoria</em>.
          </h3>
          <p>
            Seu acesso já está liberado. Em até 2 horas você recebe um e-mail com o link da primeira sessão e o convite pro Discord interno. Bom começo.
          </p>
          <div className="vds-success-actions">
            <button className="vds-success-btn primary">
              Ir pra sua área
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
            <a href="#" className="vds-success-btn ghost">Baixar recibo</a>
          </div>
        </article>

        <article className="vds-success-card minor">
          <div className="vds-success-mark sm">
            <Check size={16} strokeWidth={2.6} />
          </div>
          <span className="vds-success-eyebrow">Aula concluída</span>
          <h3>
            02.02 marcada como <em>finalizada</em>.
          </h3>
          <p>+8 minutos pra sua streak · próxima aula em 02.03.</p>
          <div className="vds-success-actions">
            <button className="vds-success-btn primary">
              Ir pra próxima aula
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
          </div>
        </article>
      </div>
    </Section>
  );
}
