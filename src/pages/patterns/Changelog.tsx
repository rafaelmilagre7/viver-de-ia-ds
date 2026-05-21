import {
  Sparkles, Wrench, Plus, ShieldCheck, ArrowUpRight, GitBranch,
  Layers, MessageCircle, Rocket,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './changelog.css';

export default function Changelog() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · changelog / release notes"
        title={
          <>
            Cada versão como <em>uma página da história</em>.
          </>
        }
        lede="Release notes tratadas como conteúdo editorial — versão em mono grande, eyebrow datado, categorias com peso (novo · melhorado · ajustado · segurança), highlight reel no topo das versões maiores e timeline lateral pra navegação rápida."
      />

      <ChangelogFeaturedSection />
      <ChangelogTimelineSection />
    </>
  );
}

/* ---------- Featured · versão atual com highlight reel ---------- */
function ChangelogFeaturedSection() {
  return (
    <Section title="Versão atual · destaque editorial" meta="lançamento do trimestre · 17 mai 2026">
      <article className="vds-cl-featured">
        <header className="vds-cl-featured-head">
          <div className="vds-cl-featured-meta">
            <span className="vds-cl-eyebrow">
              Released · 17 mai 2026 · 14h32 BRT
            </span>
            <p className="vds-cl-quarter">Trimestre 2 · 2026</p>
          </div>
          <div className="vds-cl-version">
            <span className="vds-cl-version-num mono">v2.4</span>
            <span className="vds-cl-version-tag">major</span>
          </div>
        </header>

        <div className="vds-cl-featured-body">
          <h2>
            Nina virou <em>multilíngue</em>.
          </h2>
          <p className="vds-cl-lede">
            Maior versão do trimestre — Nina agora atende em inglês e espanhol mantendo o tom da marca, novo modo "shadow" pra testar respostas sem publicar e o calendário de mentoria recebeu um redesenho completo. Tudo abaixo.
          </p>

          <div className="vds-cl-highlights">
            <article className="vds-cl-hl primary via-mesh-navy via-noise">
              <div className="vds-cl-hl-icon">
                <Rocket size={20} strokeWidth={1.6} />
              </div>
              <h3>
                Nina <em>en español</em> y <em>in English</em>
              </h3>
              <p>
                Detecção automática de idioma no canal e respostas mantendo a personalidade Nina — testado por 14 mentees nativos antes do release.
              </p>
              <a href="#" className="vds-cl-hl-link">
                Ver demo da nova versão
                <ArrowUpRight size={13} strokeWidth={2.4} />
              </a>
            </article>

            <article className="vds-cl-hl">
              <div className="vds-cl-hl-icon nv">
                <Layers size={18} strokeWidth={1.6} />
              </div>
              <h4>Shadow mode pra calibrar</h4>
              <p>Teste prompts em produção sem expor pro cliente · respostas aparecem só no admin.</p>
              <a href="#">Como ativar →</a>
            </article>

            <article className="vds-cl-hl">
              <div className="vds-cl-hl-icon gd">
                <MessageCircle size={18} strokeWidth={1.6} />
              </div>
              <h4>Calendário redesenhado</h4>
              <p>Mentoria 1:1 agora com vista semanal · reagendamento em 2 clicks.</p>
              <a href="#">Ver detalhes →</a>
            </article>
          </div>
        </div>

        <footer className="vds-cl-featured-foot">
          <div className="vds-cl-stat">
            <strong className="mono">38</strong>
            <em>commits</em>
          </div>
          <span className="vds-cl-stat-sep" />
          <div className="vds-cl-stat">
            <strong className="mono">14</strong>
            <em>mentees testaram</em>
          </div>
          <span className="vds-cl-stat-sep" />
          <div className="vds-cl-stat">
            <strong className="mono">3</strong>
            <em>idiomas suportados</em>
          </div>
          <span className="vds-cl-stat-sep" />
          <div className="vds-cl-stat">
            <strong className="mono">99.94%</strong>
            <em>uptime no rollout</em>
          </div>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Timeline · versões anteriores ---------- */
function ChangelogTimelineSection() {
  const versions = [
    {
      v: 'v2.3',
      tag: 'minor',
      date: '02 mai 2026',
      title: 'Mentoria com gravação automática',
      changes: [
        { type: 'new', text: 'Sessão de mentoria 1:1 grava + transcreve automaticamente no Discord interno' },
        { type: 'new', text: 'Nota de continuidade · cada sessão sabe o que ficou de pendência da anterior' },
        { type: 'fix', text: 'Corrigido: tema escuro do calendário tinha contraste insuficiente em dois cards' },
      ],
    },
    {
      v: 'v2.2',
      tag: 'patch',
      date: '14 abr 2026',
      title: 'Estabilidade e segurança',
      changes: [
        { type: 'security', text: 'Rotação de keys do webhook agora preserva o secret anterior por 24h' },
        { type: 'fix', text: 'Resolvido edge case onde reagendamento perdia o link da call' },
        { type: 'fix', text: 'Mensagens longas no Discord não eram truncadas direito no admin' },
      ],
    },
    {
      v: 'v2.1',
      tag: 'minor',
      date: '28 mar 2026',
      title: 'Painel de progresso do aluno',
      changes: [
        { type: 'new', text: 'Activity rings · 3 anéis (estudo, prática, comunidade) com gradient ouro' },
        { type: 'new', text: 'Streak editorial · contagem de dias seguidos sem dependência de notificação irritante' },
        { type: 'improved', text: 'Curriculum agora destaca o módulo atual com bar lateral navy' },
      ],
    },
    {
      v: 'v2.0',
      tag: 'major',
      date: '12 mar 2026',
      title: 'Design system refundado',
      changes: [
        { type: 'improved', text: 'Tipografia migrada pra Geist como single family — Inter e Fraunces saem' },
        { type: 'improved', text: 'Liquid glass + atmospheric radials substituem os cards chapados antigos' },
        { type: 'new', text: 'Mesh navy + noise como pano de fundo dos blocos hero e CTAs cinematográficos' },
      ],
    },
  ];

  const typeIcons: Record<string, typeof Plus> = {
    new: Plus,
    improved: Sparkles,
    fix: Wrench,
    security: ShieldCheck,
  };

  const typeLabels: Record<string, string> = {
    new: 'Novo',
    improved: 'Melhorado',
    fix: 'Ajustado',
    security: 'Segurança',
  };

  return (
    <Section title="Timeline · versões anteriores" meta="agrupado por trimestre · cada release com categorias">
      <div className="vds-cl-timeline">
        <aside className="vds-cl-toc">
          <header>
            <span className="vds-cl-toc-eyebrow">Histórico</span>
            <p>Pulando pra a versão</p>
          </header>
          <ul>
            {versions.map((vr) => (
              <li key={vr.v}>
                <a href={`#${vr.v}`}>
                  <span className="vds-cl-toc-v mono">{vr.v}</span>
                  <span className="vds-cl-toc-d mono">{vr.date.split(' ')[0]} {vr.date.split(' ')[1]}</span>
                </a>
              </li>
            ))}
            <li className="vds-cl-toc-more">
              <a href="#archive">
                <GitBranch size={11} strokeWidth={2.2} />
                Ver arquivo · v1.x e anteriores
              </a>
            </li>
          </ul>
        </aside>

        <ol className="vds-cl-list">
          {versions.map((vr) => (
            <li key={vr.v} id={vr.v} className="vds-cl-entry">
              <div className="vds-cl-entry-mark">
                <span className="vds-cl-entry-dot" />
                <span className="vds-cl-entry-line" />
              </div>
              <article className="vds-cl-entry-body">
                <header>
                  <div className="vds-cl-entry-meta">
                    <span className="vds-cl-entry-v mono">{vr.v}</span>
                    <span className={`vds-cl-entry-tag ${vr.tag}`}>{vr.tag}</span>
                    <span className="vds-cl-entry-date mono">{vr.date}</span>
                  </div>
                  <h3>{vr.title}</h3>
                </header>
                <ul className="vds-cl-changes">
                  {vr.changes.map((ch, i) => {
                    const Icon = typeIcons[ch.type];
                    return (
                      <li key={i} className={ch.type}>
                        <span className="vds-cl-change-icon">
                          <Icon size={11} strokeWidth={2.4} />
                        </span>
                        <span className="vds-cl-change-tag mono">{typeLabels[ch.type]}</span>
                        <span className="vds-cl-change-text">{ch.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
