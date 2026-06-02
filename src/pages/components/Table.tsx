import { useState } from 'react';
import {
  ArrowUpDown, MoreHorizontal, Check, Search, Filter, ChevronDown,
  TrendingUp, TrendingDown, Download, X, ArrowRight,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './table.css';

export default function Table() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · tabela editorial"
        title={
          <>
            Linha por linha, <em>com peso e ritmo</em>.
          </>
        }
        lede="Tabela com 8 tipos de cell coexistindo — avatar+role, status pill navy, currency mono, progress inline, trend chip, ID hash, date relativo, actions trailing. Header com atmospheric, row hover com bar lateral, selected state navy, batch toolbar quando há seleção, density modes."
      />

      <FullTableSection />
      <CompactTableSection />
    </>
  );
}

/* ---------- FULL TABLE · todos os cell types ---------- */
function FullTableSection() {
  const [selected, setSelected] = useState<string[]>(['ML', 'CR']);

  const rows = [
    {
      id: 'OP-2026-0482',
      av: 'ML',
      name: 'Márisson Lage',
      role: 'CEO · Efizi',
      plan: 'Mentoria',
      planType: 'mentoria',
      mrr: 1840,
      progress: 78,
      delta: 14.2,
      status: 'ok',
      statusLabel: 'em produção',
      activity: 'há 4 min',
    },
    {
      id: 'OP-2026-0481',
      av: 'CM',
      name: 'Camila Moraes',
      role: 'Head IA · Mantra',
      plan: 'Corporate',
      planType: 'corporate',
      mrr: 4200,
      progress: 92,
      delta: 28.4,
      status: 'ok',
      statusLabel: 'em produção',
      activity: 'há 1h',
    },
    {
      id: 'OP-2026-0476',
      av: 'DP',
      name: 'Daniel Pinheiro',
      role: 'Founder · Pivot',
      plan: 'Mentoria',
      planType: 'mentoria',
      mrr: 1840,
      progress: 42,
      delta: 6.8,
      status: 'attention',
      statusLabel: 'requer atenção',
      activity: 'ontem',
    },
    {
      id: 'OP-2026-0469',
      av: 'BC',
      name: 'Bruna Carvalho',
      role: 'Product · Lumin',
      plan: 'Mentoria',
      planType: 'mentoria',
      mrr: 1840,
      progress: 64,
      delta: 11.7,
      status: 'ok',
      statusLabel: 'em produção',
      activity: 'há 28min',
    },
    {
      id: 'OP-2026-0438',
      av: 'FA',
      name: 'Felipe Andrade',
      role: 'CTO · Olara Bank',
      plan: 'Corporate',
      planType: 'corporate',
      mrr: 4200,
      progress: 18,
      delta: -3.2,
      status: 'churn',
      statusLabel: 'risco churn',
      activity: 'há 3 dias',
    },
    {
      id: 'OP-2026-0427',
      av: 'PS',
      name: 'Pedro Sousa',
      role: 'Indep · operador IA',
      plan: 'Comunidade',
      planType: 'comunidade',
      mrr: 197,
      progress: 88,
      delta: 4.1,
      status: 'ok',
      statusLabel: 'em produção',
      activity: 'há 3h',
    },
  ];

  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const allSelected = selected.length === rows.length;
  const someSelected = selected.length > 0;

  return (
    <Section title="Tabela completa · 8 cell types coexistindo" meta="operadores ativos · 248 total · sortável · selecionável">
      <article className="vds-tbl-wrap">
        {/* Header bar — search + filter + density */}
        <header className="vds-tbl-toolbar">
          <div className="vds-tbl-search">
            <Search size={13} strokeWidth={2.2} />
            <input aria-label="Buscar na tabela" placeholder="Buscar operador, empresa, plano…" />
          </div>
          <div className="vds-tbl-toolbar-r">
            <button className="vds-tbl-tool">
              <Filter size={13} strokeWidth={2.2} />
              Filtros
              <span className="vds-tbl-tool-count">3</span>
            </button>
            <button className="vds-tbl-tool">
              <Download size={13} strokeWidth={2.2} />
              Exportar
            </button>
            <div className="vds-tbl-density">
              <button className="active" title="Compacto">··</button>
              <button title="Normal">···</button>
              <button title="Confortável">····</button>
            </div>
          </div>
        </header>

        {/* Batch toolbar — aparece quando algo selecionado */}
        {someSelected && (
          <div className="vds-tbl-batch">
            <div className="vds-tbl-batch-l">
              <span className="vds-tbl-batch-count">
                <strong>{selected.length}</strong>
                <em>selecionado{selected.length > 1 ? 's' : ''}</em>
              </span>
              <span className="vds-tbl-batch-sep" />
              <button>Renovar plano</button>
              <button>Adicionar tag</button>
              <button>Enviar mensagem</button>
            </div>
            <button className="vds-tbl-batch-clear" onClick={() => setSelected([])}>
              <X size={11} strokeWidth={2.4} />
              Limpar
            </button>
          </div>
        )}

        {/* Table */}
        <div className="vds-tbl-scroll">
          <table className="vds-tbl">
            <thead>
              <tr>
                <th className="check">
                  <label className="vds-tbl-check">
                    <input
                      type="checkbox"
                      aria-label="Selecionar todas as linhas"
                      checked={allSelected}
                      onChange={() => setSelected(allSelected ? [] : rows.map((r) => r.av))}
                    />
                    <span><Check size={10} strokeWidth={3} /></span>
                  </label>
                </th>
                <th>
                  <span className="vds-tbl-th-label">Operador</span>
                  <ArrowUpDown size={10} strokeWidth={2} className="sort" />
                </th>
                <th>
                  <span className="vds-tbl-th-label">ID</span>
                </th>
                <th>
                  <span className="vds-tbl-th-label">Plano</span>
                </th>
                <th className="num">
                  <span className="vds-tbl-th-label">MRR</span>
                  <ArrowUpDown size={10} strokeWidth={2} className="sort" />
                </th>
                <th>
                  <span className="vds-tbl-th-label">Progresso</span>
                </th>
                <th className="num">
                  <span className="vds-tbl-th-label">Δ 30d</span>
                </th>
                <th>
                  <span className="vds-tbl-th-label">Status</span>
                </th>
                <th>
                  <span className="vds-tbl-th-label">Atividade</span>
                </th>
                <th className="actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const sel = selected.includes(r.av);
                return (
                  <tr key={r.av} className={sel ? 'sel' : ''}>
                    <td className="check">
                      <label className="vds-tbl-check">
                        <input type="checkbox" aria-label={`Selecionar ${r.name}`} checked={sel} onChange={() => toggle(r.av)} />
                        <span><Check size={10} strokeWidth={3} /></span>
                      </label>
                    </td>

                    {/* Avatar + nome + role */}
                    <td className="user">
                      <span className="vds-tbl-av">{r.av}</span>
                      <div>
                        <strong>{r.name}</strong>
                        <em>{r.role}</em>
                      </div>
                    </td>

                    {/* ID em mono */}
                    <td className="mono">{r.id}</td>

                    {/* Plan pill */}
                    <td>
                      <span className={`vds-tbl-plan ${r.planType}`}>{r.plan}</span>
                    </td>

                    {/* MRR currency */}
                    <td className="currency">
                      <span className="cur">R$</span>
                      {r.mrr.toLocaleString('pt-BR')}
                    </td>

                    {/* Progress bar inline */}
                    <td>
                      <div className="vds-tbl-progress">
                        <div className="track">
                          <span style={{ width: `${r.progress}%` }} />
                        </div>
                        <span className="pct">{r.progress}%</span>
                      </div>
                    </td>

                    {/* Delta com trend arrow */}
                    <td className="num">
                      <span className={`vds-tbl-delta ${r.delta > 0 ? 'up' : 'down'}`}>
                        {r.delta > 0 ? <TrendingUp size={10} strokeWidth={2.4} /> : <TrendingDown size={10} strokeWidth={2.4} />}
                        {r.delta > 0 ? '+' : ''}{r.delta}%
                      </span>
                    </td>

                    {/* Status pill — sem bolinha, só editorial */}
                    <td className="status">
                      <span className={`vds-tbl-status ${r.status}`}>
                        {r.statusLabel}
                      </span>
                    </td>

                    {/* Activity relative */}
                    <td className="activity">{r.activity}</td>

                    {/* Actions trailing */}
                    <td className="actions">
                      <button className="vds-tbl-action-btn" title="Ver perfil">
                        <ArrowRight size={12} strokeWidth={2.4} />
                      </button>
                      <button className="vds-tbl-action-btn ghost" title="Mais opções">
                        <MoreHorizontal size={13} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer · pagination editorial */}
        <footer className="vds-tbl-foot">
          <span className="vds-tbl-foot-info">
            Mostrando <strong>1–6</strong> de <strong>248</strong> operadores
          </span>
          <div className="vds-tbl-pag">
            <button disabled>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span className="vds-tbl-pag-ell">…</span>
            <button>41</button>
            <button>›</button>
          </div>
          <div className="vds-tbl-pag-size">
            <span>linhas por página</span>
            <button>
              6 <ChevronDown size={11} strokeWidth={2.2} />
            </button>
          </div>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- COMPACT TABLE — variante densa pra dashboard ---------- */
function CompactTableSection() {
  const tasks = [
    { id: 'T-481', task: 'Renovar token de API · production', who: 'Diego', priority: 'alta', due: 'hoje · 18h' },
    { id: 'T-480', task: 'Auditoria semanal · custo Anthropic', who: 'Caio', priority: 'média', due: 'sex · 12h' },
    { id: 'T-479', task: 'Onboarding · 3 novos da turma 2026.2', who: 'Mateus', priority: 'baixa', due: 'seg · 14h' },
    { id: 'T-478', task: 'Calibrar few-shot · classifier v2', who: 'Diego', priority: 'média', due: 'ter · 10h' },
  ];

  return (
    <Section title="Variante compacta · pra dashboard" meta="densidade menor · cell types mínimos">
      <article className="vds-tbl-wrap compact">
        <header className="vds-tbl-toolbar compact">
          <div>
            <strong>Tarefas abertas</strong>
            <span>4 ativas · 2 com prazo hoje</span>
          </div>
          <button className="vds-tbl-tool sm">Ver todas →</button>
        </header>

        <div className="vds-tbl-scroll">
          <table className="vds-tbl compact">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarefa</th>
                <th>Responsável</th>
                <th>Prioridade</th>
                <th>Prazo</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  <td className="mono">{t.id}</td>
                  <td className="primary">{t.task}</td>
                  <td>{t.who}</td>
                  <td>
                    <span className={`vds-tbl-prio ${t.priority}`}>{t.priority}</span>
                  </td>
                  <td className="mono">{t.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </Section>
  );
}
