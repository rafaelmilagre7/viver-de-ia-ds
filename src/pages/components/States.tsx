import {
  Loader2, Search, ShieldOff, Wrench, Check, ArrowRight,
  Lock, RefreshCw, Compass, ListChecks,
  WifiOff, CalendarDays, Bell, Filter, Coffee, Plus,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { BrandLogo } from '../../lib/BrandLogo/BrandLogo';
import { microcopy } from '../../content/microcopy';
import './states.css';

/** Texto canônico (src/content/microcopy.ts) pelo id. */
const mc = (id: string) => microcopy.find((m) => m.id === id)!.texto;

/** Frase canônica em dois tempos: a 1ª frase vira título, o resto vira texto. */
function frase(id: string): [string, string] {
  const t = mc(id);
  const i = t.indexOf('. ');
  return i < 0 ? [t, ''] : [t.slice(0, i + 1), t.slice(i + 2)];
}

export default function States() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · estados do sistema"
        title={
          <>
            Carregando, erro, vazio, sucesso — <em>cada estado tratado</em>.
          </>
        }
        lede="O sistema vive em estados: esperando, falhando, vazio, completo. Cada um tem que parecer parte da marca, não uma página esquecida pelo time. Todos nascem no fundo claro, como o resto do produto."
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
    <Section title="Carregamento · 3 escalas" meta="página inteira · em linha · skeleton">
      <div className="vds-loaders-row">
        {/* Página inteira · claro, pra não piscar escuro entre telas claras */}
        <div className="vds-loader-card full">
          <span className="vds-loader-mono" aria-hidden="true">
            <BrandLogo monoOnly variant="auto" size={40} />
          </span>
          <div className="vds-loader-ring">
            <span />
          </div>
          <p className="vds-loader-msg">
            Preparando sua sessão · <em>buscando aulas, notas e mentoria</em>
          </p>
          <p className="vds-loader-sub">Costuma levar menos de 2s</p>
        </div>

        {/* Inline */}
        <div className="vds-loader-card inline">
          <div className="vds-loader-inline">
            <span className="vds-loader-bar" />
            <p>Sincronizando com o Consultor IA · <strong>3 conversas restando</strong></p>
          </div>

          <div className="vds-loader-inline alt">
            <Loader2 size={16} strokeWidth={1.75} className="spin" />
            <p>Carregando a transcrição da aula 02.02…</p>
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
  const [servidorTitulo, servidorTexto] = frase('erro-servidor');
  return (
    <Section title="Páginas de erro · 500 · 403 · manutenção" meta="tom editorial, sem “oops”">
      <div className="vds-errors">
        {/* 500 · claro e calmo: assume a falha, ID do incidente, tentar de novo */}
        <article className="vds-error-card e500">
          <span className="vds-error-orbit" aria-hidden="true">
            <span className="vds-error-orbit-dot" />
          </span>
          <div className="vds-error-head">
            <span className="vds-error-eyebrow">
              <span className="vds-error-pulse" />
              Incidente em apuração
            </span>
            <span className="vds-error-code mono">500</span>
          </div>
          <h3>{servidorTitulo}</h3>
          <p>
            {servidorTexto} O time já foi avisado, não precisa reportar.
          </p>
          <div className="vds-error-actions">
            <button className="vds-error-btn primary">
              <RefreshCw size={14} strokeWidth={1.75} />
              {mc('botao-tentar-de-novo')}
            </button>
            <a href="#" className="vds-error-btn ghost">Voltar pro início</a>
          </div>
          <p className="vds-error-id mono">
            <span>incidente</span>
            INC-2026-0517-184
          </p>
        </article>

        {/* 403 forbidden — plan gating, editorial accent tag */}
        <article className="vds-error-card e403">
          <div className="vds-error-icon">
            <ShieldOff size={20} strokeWidth={1.75} />
          </div>
          <span className="vds-error-code">Acesso restrito</span>
          <h3>
            Essa área é <em>do plano Pro</em>.
          </h3>
          <p>
            A mentoria em grupo ao vivo — 10 check-ins por mês — fica disponível a partir do plano Pro. Você está no <strong>plano Starter</strong> hoje.
          </p>
          <div className="vds-error-plans">
            <div className="vds-error-plan current">
              <span className="lbl">Hoje</span>
              <strong>Starter</strong>
              <em>R$&nbsp;2.580/mês</em>
            </div>
            <span className="vds-error-plans-arrow">→</span>
            <div className="vds-error-plan target">
              <span className="lbl">Para destravar</span>
              <strong>Pro</strong>
              <em>R$&nbsp;3.780/mês</em>
            </div>
          </div>
          <p className="vds-error-plans-note">Valores por mês, em contratação anual.</p>
          <div className="vds-error-actions">
            <button className="vds-error-btn primary">
              Ver opções do plano
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
            <a href="#" className="vds-error-btn ghost">Voltar pra comunidade</a>
          </div>
        </article>

        {/* Maintenance — accent + progress + live status */}
        <article className="vds-error-card maintenance">
          <div className="vds-error-icon">
            <Wrench size={20} strokeWidth={1.75} />
          </div>
          <span className="vds-error-code maint">
            <span className="vds-error-live-dot" />
            Em manutenção
          </span>
          <h3>
            Estamos atualizando o Consultor IA.
          </h3>
          <p>
            Janela programada de 30 minutos. Tudo deve voltar ao normal por volta de <strong>14h30 BRT</strong>. Aulas e materiais offline continuam funcionando.
          </p>
          <div className="vds-error-progress">
            <div className="vds-error-progress-row">
              <span className="mid">~ 18 min restantes</span>
            </div>
            <div className="vds-error-progress-bar">
              <span style={{ width: '42%' }} />
            </div>
            <div className="vds-error-progress-row">
              <span>14h BRT</span>
              <span>14h30 BRT</span>
            </div>
          </div>
          <div className="vds-error-actions">
            <button className="vds-error-btn primary accent">
              Acompanhar status
              <ArrowRight size={14} strokeWidth={1.75} />
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
  const [buscaTitulo, buscaTexto] = frase('vazio-sem-resultados');
  const [acessoTitulo, acessoTexto] = frase('erro-sem-permissao');
  const [lidoTitulo, lidoTexto] = frase('vazio-tudo-lido');
  return (
    <Section title="Estados vazios · 4 cenas" meta="sem resultados · primeiro acesso · sem acesso · tudo lido">
      <div className="vds-empties">
        {/* No results */}
        <article className="vds-empty-card">
          <div className="vds-empty-glyph">
            <Search size={20} strokeWidth={1.75} />
          </div>
          <h4>{buscaTitulo.replace('{termo}', 'few-shot tuning')}</h4>
          <p>{buscaTexto} Ou veja as 3 aulas de <em>“prompt engineering”</em>.</p>
          <button className="vds-empty-btn">
            Limpar busca
          </button>
        </article>

        {/* No data yet (first time) */}
        <article className="vds-empty-card">
          <div className="vds-empty-glyph">
            <Compass size={20} strokeWidth={1.75} />
          </div>
          <h4>Boas-vindas ao seu primeiro painel</h4>
          <p>Quando você completar a primeira aula, esse painel mostra progresso, próximos passos e métricas da sua trilha. Começa em <strong>01.01 · O que mudou de 2022 pra cá</strong>.</p>
          <button className="vds-empty-btn primary">
            Começar primeira aula
            <ArrowRight size={14} strokeWidth={1.75} />
          </button>
        </article>

        {/* No permission */}
        <article className="vds-empty-card">
          <div className="vds-empty-glyph">
            <Lock size={20} strokeWidth={1.75} />
          </div>
          <h4>{acessoTitulo}</h4>
          <p>{acessoTexto}</p>
          <a href="#" className="vds-empty-btn">Solicitar acesso</a>
        </article>

        {/* All done */}
        <article className="vds-empty-card all-done">
          <div className="vds-empty-glyph done">
            <ListChecks size={20} strokeWidth={1.75} />
          </div>
          <h4>{lidoTitulo}</h4>
          <p>{lidoTexto}</p>
          <button className="vds-empty-btn ghost">Ver histórico</button>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Empty states · premium ---------- */
function EmptyPremiumSection() {
  const [offlineTitulo, offlineTexto] = frase('erro-sem-conexao');
  const [filtroTitulo, filtroTexto] = frase('vazio-filtros');
  return (
    <Section title="Estados vazios · com contexto" meta="primeiro acesso · sem conexão · sem notificações · filtros · caixa zerada · agenda">
      <div className="vds-empty-prem-grid">
        {/* Primeiro acesso · destaque claro, com passos e saída */}
        <article className="vds-empty-prem cold">
          <div className="vds-empty-prem-orbit" aria-hidden="true">
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
              {mc('onboarding-progresso').replace('{n}', '2')} Depois deles, este painel mostra seu progresso, os próximos compromissos e as 3 soluções escolhidas na adesão.
            </p>
            <ol className="vds-empty-prem-steps">
              <li className="done">
                <span className="bullet"><Check size={14} strokeWidth={1.75} /></span>
                <div>
                  <strong>Conta criada</strong>
                  <em>terça · 14h12</em>
                </div>
              </li>
              <li className="current">
                <span className="bullet">2</span>
                <div>
                  <strong>Escolher as 3 soluções da adesão</strong>
                  <em>5min · entram na trilha de onboarding</em>
                </div>
              </li>
              <li>
                <span className="bullet">3</span>
                <div>
                  <strong>Começar a primeira formação</strong>
                  <em>3min · garante o ritmo do time</em>
                </div>
              </li>
            </ol>
            <div className="vds-empty-prem-actions">
              <button className="vds-empty-prem-btn primary">
                Continuar pelo passo 2
                <ArrowRight size={14} strokeWidth={1.75} />
              </button>
              <a href="#" className="vds-empty-prem-btn ghost">Pular por agora</a>
            </div>
            <p className="vds-empty-prem-hint">{mc('onboarding-pular')}</p>
          </div>
        </article>

        {/* Offline — soft atmosphere with reconnection */}
        <article className="vds-empty-prem offline">
          <div className="vds-empty-prem-icon">
            <WifiOff size={20} strokeWidth={1.75} />
          </div>
          <span className="vds-empty-prem-eyebrow soft">
            Tentando reconectar
          </span>
          <h4>{offlineTitulo}</h4>
          <p>
            {offlineTexto} As <strong>3 últimas aulas</strong> que você abriu continuam disponíveis.
          </p>
          <div className="vds-empty-prem-trail">
            <div className="vds-empty-prem-trail-dots">
              <span /><span /><span /><span /><span />
            </div>
            <span className="vds-empty-prem-trail-lbl">Próxima tentativa em 3s</span>
          </div>
        </article>

        {/* No notifications · zen */}
        <article className="vds-empty-prem zen">
          <div className="vds-empty-prem-icon zen">
            <Bell size={20} strokeWidth={1.75} />
          </div>
          <h4>
            Nada a relatar hoje.
          </h4>
          <p>
            A semana abriu calma — sem menções no Discord, sem mudança nos seus alunos, sem nota da mentoria. Use o silêncio.
          </p>
          <div className="vds-empty-prem-stat">
            <span className="lbl">Última atualização</span>
            <strong>há 6h</strong>
          </div>
        </article>

        {/* Filter no results · with suggestion chips */}
        <article className="vds-empty-prem filter">
          <div className="vds-empty-prem-icon">
            <Filter size={20} strokeWidth={1.75} />
          </div>
          <h4>{filtroTitulo}</h4>
          <p>
            {filtroTexto} O que mais restringe costuma ser <strong>“MRR &gt; R$&nbsp;4 mil”</strong>.
          </p>
          <div className="vds-empty-prem-chips">
            <button className="vds-empty-prem-chip">
              <span className="x">×</span>
              MRR &gt; R$&nbsp;4 mil
              <em>248 → 1.847</em>
            </button>
            <button className="vds-empty-prem-chip">
              <span className="x">×</span>
              Plano Enterprise
              <em>4 → 38</em>
            </button>
            <button className="vds-empty-prem-chip">
              <span className="x">×</span>
              Ativo nos últimos 7d
              <em>112 → 236</em>
            </button>
          </div>
          <button className="vds-empty-prem-btn ghost">Limpar filtros</button>
        </article>

        {/* Inbox zen — domingo */}
        <article className="vds-empty-prem inbox">
          <div className="vds-empty-prem-icon coffee">
            <Coffee size={20} strokeWidth={1.75} />
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
            <CalendarDays size={20} strokeWidth={1.75} />
          </div>
          <span className="vds-empty-prem-eyebrow">Semana de 18 · 24 mai</span>
          <h4>
            Sua semana está <em>limpa</em>.
          </h4>
          <p>
            Nenhuma sessão marcada — bom espaço pra trabalho focado ou pra marcar o próximo encontro de mentoria.
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
            <Plus size={14} strokeWidth={1.75} />
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
    <Section title="Sucesso · confirmação de ação" meta="pagamento confirmado · aula concluída">
      <div className="vds-success-row">
        <article className="vds-success-card">
          <div className="vds-success-mark">
            <Check size={32} strokeWidth={1.75} />
            <span className="vds-success-pulse" />
          </div>
          <span className="vds-success-eyebrow">Pagamento confirmado</span>
          <h3>
            Boas-vindas ao plano <em>Pro</em>.
          </h3>
          <p>
            Seu acesso já está liberado. A trilha de onboarding e o link do primeiro check-in em grupo chegam no seu email.
          </p>
          <div className="vds-success-actions">
            <button className="vds-success-btn primary">
              Ir pra sua área
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
            <a href="#" className="vds-success-btn ghost">Baixar recibo</a>
          </div>
        </article>

        <article className="vds-success-card minor">
          <div className="vds-success-mark sm">
            <Check size={16} strokeWidth={1.75} />
          </div>
          <span className="vds-success-eyebrow">Aula concluída</span>
          <h3>
            02.02 marcada como <em>finalizada</em>.
          </h3>
          <p>+8 minutos pra sua sequência · próxima aula: 02.03.</p>
          <div className="vds-success-actions">
            <button className="vds-success-btn primary">
              Ir pra próxima aula
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
          </div>
        </article>
      </div>
    </Section>
  );
}
