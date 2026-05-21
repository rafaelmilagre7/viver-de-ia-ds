import { useState } from 'react';
import {
  Search, Filter, X, ArrowRight, ChevronDown, Clock,
  BookOpen, MessageCircle, FileText, Users, Star,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './search-results.css';

/* Highlight matches in text safely (no dangerouslySetInnerHTML) */
function Highlight({ text, term }: { text: string; term: string }) {
  if (!term) return <>{text}</>;
  const pattern = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        pattern.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default function SearchResults() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · search results"
        title={
          <>
            A busca <em>devolve respostas</em> — não 47 abas.
          </>
        }
        lede="Página de resultados editorial — facets laterais por tipo + filtros ativos no topo, ordenação à direita, lista de results com tipo + título + snippet com highlight no termo buscado, footer de paginação. Aulas, conversas, gente, materiais — tudo no mesmo lugar."
      />

      <SearchResultsSection />
    </>
  );
}

function SearchResultsSection() {
  const [query, setQuery] = useState('few shot tuning');
  const term = 'few-shot tuning';

  const facets = [
    { id: 'all', label: 'Tudo', count: 84, icon: Search, active: true },
    { id: 'aula', label: 'Aulas', count: 32, icon: BookOpen },
    { id: 'chat', label: 'Conversas Nina', count: 28, icon: MessageCircle },
    { id: 'people', label: 'Pessoas', count: 14, icon: Users },
    { id: 'docs', label: 'Materiais', count: 10, icon: FileText },
  ];

  const activeFilters = ['últimos 30 dias', 'plano Mentoria', 'em português'];

  const results = [
    {
      type: 'Aula',
      typeColor: 'navy',
      title: 'Few-shot tuning na prática · classifier v2 da Mantra',
      snippet: 'Camila Moraes mostra como passou de 62% pra 91% de precisão usando few-shot tuning com 14 exemplos curados. Sessão prática · turma 2026.1 · 47min.',
      meta: ['Módulo 04 · IA aplicada', 'Camila Moraes', '47 min'],
      time: 'há 6 dias',
      score: 98,
    },
    {
      type: 'Aula',
      typeColor: 'navy',
      title: '4 técnicas pra calibrar prompt · few-shot, chain-of-thought, system, role',
      snippet: 'Caio Ribeiro sobre quando usar few-shot tuning versus chain-of-thought — geralmente CoT é melhor pra raciocínio, FST pra padrão de output.',
      meta: ['Módulo 02 · Prompt engineering', 'Caio Ribeiro', '38 min'],
      time: 'há 2 semanas',
      score: 92,
    },
    {
      type: 'Conversa Nina',
      typeColor: 'accent',
      title: '"Qual a diferença entre few-shot tuning e fine-tuning real?"',
      snippet: 'Nina explicou pro Daniel Pinheiro: few-shot tuning não muda o modelo, só adiciona exemplos no prompt. Fine-tuning real requer dataset e treino · custo 100x maior.',
      meta: ['Daniel Pinheiro', 'canal #ajuda', '14 trocas'],
      time: 'há 3 dias',
      score: 86,
    },
    {
      type: 'Material',
      typeColor: 'ink',
      title: 'Notion · Biblioteca de few-shot templates · 38 prompts curados',
      snippet: 'Coleção viva mantida pelo time · 38 templates de few-shot tuning categorizados por uso (classification · extraction · summarization · QA).',
      meta: ['Biblioteca interna', 'Notion · atualizado seg'],
      time: 'há 4 dias',
      score: 78,
    },
    {
      type: 'Pessoa',
      typeColor: 'ink',
      title: 'Mateus Costa · Senior IA · Viver de IA',
      snippet: 'Especialista em few-shot tuning e classification systems · 4 aulas no curso · disponível pra mentoria 1:1 às terças.',
      meta: ['Senior IA', '4 aulas · 12 mentorias'],
      time: 'desde 2024',
      score: 72,
    },
  ];

  return (
    <Section title="Resultados de busca · facets + filters + sort" meta="layout 2 cols · facets navegáveis · 5 result types · highlight do termo">
      <article className="vds-sr">
        {/* Sticky header — search bar + meta */}
        <header className="vds-sr-head">
          <div className="vds-sr-search">
            <Search size={14} strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar aulas, conversas, pessoas, materiais…"
            />
            <button className="vds-sr-search-clear" aria-label="Limpar">
              <X size={12} strokeWidth={2.2} />
            </button>
            <span className="vds-sr-search-shortcut mono">⌘ K</span>
          </div>
          <p className="vds-sr-result-meta">
            <strong>84 resultados</strong> para <em>"{query}"</em> · 0.21s · ordenado por relevância
          </p>
        </header>

        <div className="vds-sr-grid">
          {/* Sidebar · facets */}
          <aside className="vds-sr-facets">
            <p className="vds-sr-section-eyebrow">Tipo de resultado</p>
            <ul className="vds-sr-facet-list">
              {facets.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.id} className={f.active ? 'on' : ''}>
                    <button>
                      <span className="vds-sr-facet-icon">
                        <Icon size={12} strokeWidth={1.8} />
                      </span>
                      <span className="vds-sr-facet-label">{f.label}</span>
                      <span className="vds-sr-facet-count mono">{f.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="vds-sr-section-eyebrow" style={{ marginTop: 24 }}>Período</p>
            <ul className="vds-sr-filter-list">
              <li><label><input type="radio" name="period" /> <span>Últimas 24h</span></label></li>
              <li><label><input type="radio" name="period" defaultChecked /> <span>Últimos 30 dias</span></label></li>
              <li><label><input type="radio" name="period" /> <span>Trimestre</span></label></li>
              <li><label><input type="radio" name="period" /> <span>Sempre</span></label></li>
            </ul>

            <p className="vds-sr-section-eyebrow" style={{ marginTop: 24 }}>Plano</p>
            <ul className="vds-sr-filter-list">
              <li><label><input type="checkbox" /> <span>Comunidade</span></label></li>
              <li><label><input type="checkbox" defaultChecked /> <span>Mentoria</span></label></li>
              <li><label><input type="checkbox" /> <span>Corporate</span></label></li>
            </ul>
          </aside>

          {/* Main · results + filters bar */}
          <main className="vds-sr-main">
            {/* Active filters + sort */}
            <div className="vds-sr-toolbar">
              <div className="vds-sr-active-filters">
                <Filter size={12} strokeWidth={2} className="vds-sr-toolbar-icon" />
                <span className="vds-sr-toolbar-lbl">Filtros ativos:</span>
                {activeFilters.map((f, i) => (
                  <button key={i} className="vds-sr-active-chip">
                    {f}
                    <X size={10} strokeWidth={2.4} />
                  </button>
                ))}
                <button className="vds-sr-clear-all">Limpar todos</button>
              </div>
              <button className="vds-sr-sort">
                Relevância
                <ChevronDown size={12} strokeWidth={2.2} />
              </button>
            </div>

            {/* Results list */}
            <ol className="vds-sr-results">
              {results.map((r, i) => (
                <li key={i} className="vds-sr-result">
                  <div className="vds-sr-result-head">
                    <span className={`vds-sr-result-type ${r.typeColor}`}>{r.type}</span>
                    <span className="vds-sr-result-time mono">
                      <Clock size={10} strokeWidth={2} />
                      {r.time}
                    </span>
                    <span className="vds-sr-result-score mono">
                      <Star size={9} strokeWidth={2} style={{ fill: "var(--via-navy)" }} />
                      {r.score}%
                    </span>
                  </div>
                  <h3>
                    <a href="#"><Highlight text={r.title} term={term} /></a>
                  </h3>
                  <p className="vds-sr-result-snippet">
                    <Highlight text={r.snippet} term={term} />
                  </p>
                  <footer>
                    {r.meta.map((m, j) => (
                      <span key={j} className="vds-sr-result-meta-pill">{m}</span>
                    ))}
                  </footer>
                  <span className="vds-sr-result-bar" />
                </li>
              ))}
            </ol>

            {/* Pagination */}
            <footer className="vds-sr-pagination">
              <span className="vds-sr-pag-info">
                Mostrando <strong>1—5</strong> de <strong>84</strong>
              </span>
              <div className="vds-sr-pag-controls">
                <button disabled>‹</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <span className="vds-sr-pag-ell">…</span>
                <button>17</button>
                <button>›</button>
              </div>
              <a href="#" className="vds-sr-load-more">
                Carregar mais 20 resultados
                <ArrowRight size={12} strokeWidth={2.4} />
              </a>
            </footer>
          </main>
        </div>
      </article>
    </Section>
  );
}
