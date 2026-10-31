import {
  Compass, Flag, Map, Users, MessageCircle, ArrowUpRight,
  ThumbsUp, Calendar, Filter,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './roadmap.css';

export default function Roadmap() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · public roadmap"
        title={
          <>
            O que estamos <em>construindo, junto</em>.
          </>
        }
        lede="Roadmap público em kanban editorial — Now (construindo), Next (próximo trimestre), Later (sob investigação). Cards com voto da comunidade, owner e ETA. Sem datas precisas pra não criar dívida; sem 'soon' pra não trair confiança."
      />

      <RoadmapKanbanSection />
    </>
  );
}

interface RoadmapCard {
  tag: string;
  title: string;
  desc: string;
  owner: string;
  votes: number;
  progress?: number;
  eta?: string;
  featured?: boolean;
  investigating?: boolean;
}

function RoadmapKanbanSection() {
  const columns: Array<{
    key: string;
    label: string;
    sub: string;
    icon: typeof Flag;
    cards: RoadmapCard[];
  }> = [
    {
      key: 'now',
      label: 'Construindo agora',
      sub: 'no trimestre atual · em produção até jul/26',
      icon: Flag,
      cards: [
        {
          tag: 'Plataforma',
          title: 'AI Builder · soluções sob medida no painel',
          desc: 'Cliente Enterprise desenha solução sob medida com o arquiteto de soluções, direto no painel, com SSO e cores próprias.',
          progress: 72,
          owner: 'Diego + Caio',
          eta: 'jul/26',
          votes: 184,
          featured: true,
        },
        {
          tag: 'Mentoria',
          title: 'Check-in em grupo com gravação + transcript',
          desc: 'Após cada check-in de mentoria, transcript vai pra plataforma com pendências marcadas.',
          progress: 92,
          owner: 'Mateus',
          eta: 'jun/26',
          votes: 96,
        },
        {
          tag: 'Membro',
          title: 'Activity rings (estudo · prática · comunidade)',
          desc: 'Painel diário no estilo Apple Watch — 3 anéis fechando ao longo do dia, com streak protegido.',
          progress: 64,
          owner: 'Daniel',
          eta: 'jun/26',
          votes: 72,
        },
      ],
    },
    {
      key: 'next',
      label: 'Próximo trimestre',
      sub: 'comprometido pra Q3 · ago—out 2026',
      icon: Compass,
      cards: [
        {
          tag: 'Plataforma',
          title: 'Multi-tenant pra times do plano Enterprise',
          desc: 'Cada empresa Enterprise vira workspace isolado com seus próprios membros, mentores e métricas.',
          progress: 18,
          owner: 'Diego',
          eta: 'set/26',
          votes: 218,
        },
        {
          tag: 'Membro',
          title: 'Trilha personalizada gerada no onboarding',
          desc: 'Wizard que faz 4 perguntas e devolve trilha personalizada de formações + 1º check-in de mentoria já marcado.',
          progress: 0,
          owner: 'Caio',
          eta: 'ago/26',
          votes: 142,
        },
        {
          tag: 'IA',
          title: 'Modo "shadow" pra calibrar prompts em produção',
          desc: 'Mentor testa respostas do Consultor IA em paralelo sem expor pro cliente — admin vê side-by-side.',
          progress: 32,
          owner: 'Mateus + Diego',
          eta: 'out/26',
          votes: 88,
        },
      ],
    },
    {
      key: 'later',
      label: 'Em investigação',
      sub: 'ideias ativas · sem compromisso de data',
      icon: Map,
      cards: [
        {
          tag: 'Comunidade',
          title: 'Encontros presenciais regionais',
          desc: '4 cidades · SP, POA, BH, BSB · 1 encontro por trimestre com programação editorial.',
          owner: 'a decidir',
          votes: 326,
          investigating: true,
        },
        {
          tag: 'Conteúdo',
          title: 'Tradução pra inglês e espanhol das aulas core',
          desc: 'Começando pelas 20 aulas mais assistidas das formações · co-produção com membros da LATAM.',
          owner: 'a decidir',
          votes: 184,
          investigating: true,
        },
        {
          tag: 'IA',
          title: 'Agente de planejamento financeiro pessoal',
          desc: 'Para membros que querem aplicar IA no próprio dinheiro · privacidade-first, on-device.',
          owner: 'a decidir',
          votes: 112,
          investigating: true,
        },
      ],
    },
  ];

  return (
    <Section title="Kanban público · 3 colunas editoriais" meta="agora · próximo · investigação · cards com votos da comunidade">
      <article className="vds-rm">
        {/* Toolbar */}
        <header className="vds-rm-tools">
          <div className="vds-rm-tools-l">
            <h3>Roadmap Viver de IA · Q2 2026</h3>
            <p>9 frentes públicas · 218 votos da comunidade nessa atualização</p>
          </div>
          <div className="vds-rm-tools-r">
            <button className="vds-rm-tool">
              <Filter size={14} strokeWidth={1.75} />
              Filtros
              <span className="vds-rm-tool-count">2</span>
            </button>
            <button className="vds-rm-tool">
              <MessageCircle size={16} strokeWidth={1.75} />
              Sugerir frente
            </button>
            <button className="vds-rm-tool primary">
              <Calendar size={14} strokeWidth={1.75} />
              Inscrever no changelog
            </button>
          </div>
        </header>

        {/* Kanban grid */}
        <div className="vds-rm-grid">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <section key={col.key} className={`vds-rm-col ${col.key}`}>
                <header className="vds-rm-col-head">
                  <div className="vds-rm-col-icon">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <div className="vds-rm-col-meta">
                    <h4>{col.label}</h4>
                    <p>{col.sub}</p>
                  </div>
                  <span className="vds-rm-col-count mono">{col.cards.length}</span>
                </header>

                <ul className="vds-rm-cards">
                  {col.cards.map((c, i) => (
                    <li key={i} className={`vds-rm-card ${c.featured ? 'featured' : ''} ${c.investigating ? 'investigating' : ''}`}>
                      <header>
                        <span className="vds-rm-card-tag">{c.tag}</span>
                        {c.eta && (
                          <span className="vds-rm-card-eta mono">{c.eta}</span>
                        )}
                      </header>
                      <h5>{c.title}</h5>
                      <p>{c.desc}</p>

                      {typeof c.progress === 'number' && (
                        <div className="vds-rm-card-prog">
                          <div className="vds-rm-card-prog-track">
                            <span style={{ width: `${c.progress}%` }} />
                          </div>
                          <span className="vds-rm-card-prog-lbl mono">{c.progress}%</span>
                        </div>
                      )}

                      <footer className="vds-rm-card-foot">
                        <span className="vds-rm-card-owner">
                          <Users size={14} strokeWidth={1.75} />
                          {c.owner}
                        </span>
                        <button className="vds-rm-card-vote">
                          <ThumbsUp size={14} strokeWidth={1.75} />
                          <strong className="mono">{c.votes}</strong>
                        </button>
                      </footer>

                      <span className="vds-rm-card-bar" />
                    </li>
                  ))}
                </ul>

                {col.key === 'later' && (
                  <button className="vds-rm-col-more">
                    + Ver 12 ideias adicionais na fila
                    <ArrowUpRight size={14} strokeWidth={1.75} />
                  </button>
                )}
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="vds-rm-foot">
          <p>
            <strong>Como esse roadmap funciona</strong> · 'Construindo agora' tem ETA e progresso · 'Próximo trimestre' tem compromisso mas sem data exata · 'Em investigação' são ideias vivas sem prazo. Atualizamos toda primeira segunda do mês.
          </p>
        </footer>
      </article>
    </Section>
  );
}
