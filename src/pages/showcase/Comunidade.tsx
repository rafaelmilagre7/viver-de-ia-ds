import {
  Heart, MessageCircle, Share2, Pin, TrendingUp, Hash,
  Image as ImageIcon, Code2,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './comunidade.css';

/* ============================================================
   Comunidade · página-modelo
   Feed de posts + sidebar (categorias, membros, ranking)
   ============================================================ */

const categorias = [
  { t: 'Todos', n: 482, active: true },
  { t: 'Mostre seu agente', n: 96 },
  { t: 'Dúvidas técnicas', n: 154 },
  { t: 'Vagas & projetos', n: 41 },
  { t: 'Wins da semana', n: 78 },
  { t: 'Off-topic', n: 113 },
];

const posts = [
  {
    av: 'CR', nome: 'Caio Ribeiro', papel: 'Fundador', t: 'há 18 min',
    pinned: true, cat: 'Wins da semana',
    txt: 'Turma 2026.3 — nessa semana 9 de vocês colocaram o primeiro agente em produção. Postem aqui o que construíram. Quero ver os números reais, não a demo bonita.',
    likes: 47, comments: 23,
  },
  {
    av: 'ML', nome: 'Márisson Lage', papel: 'CEO · Efizi', t: 'há 1h',
    cat: 'Mostre seu agente',
    txt: 'Agente de qualificação rodando há 3 dias. 340 conversas processadas, 28% viraram lead qualificado. O pulo do gato foi o few-shot do módulo 02 — antes eu fazia zero-shot e ele alucinava critério.',
    likes: 31, comments: 12, code: true,
  },
  {
    av: 'LA', nome: 'Larissa Alves', papel: 'Operadora · turma 2026.3', t: 'há 3h',
    cat: 'Dúvidas técnicas',
    txt: 'Alguém já lidou com rate limit da API em produção? Meu agente bate o teto em horário de pico e os clientes ficam sem resposta. Pensando em fila com retry, mas não sei se é overkill.',
    likes: 8, comments: 17,
  },
];

const membros = [
  { av: 'YA', nome: 'Yago Almeida', status: 'online' },
  { av: 'DP', nome: 'Daniel Pinheiro', status: 'online' },
  { av: 'CM', nome: 'Camila Moraes', status: 'online' },
  { av: 'RF', nome: 'Rafael Fortes', status: 'away' },
];

const ranking = [
  { pos: 1, av: 'ML', nome: 'Márisson Lage', pts: '2.840' },
  { pos: 2, av: 'YA', nome: 'Yago Almeida', pts: '2.310' },
  { pos: 3, av: 'CM', nome: 'Camila Moraes', pts: '1.920' },
];

export default function ShowcaseComunidade() {
  return (
    <div className="vds-showcase cmu">
      {/* NAV */}
      <header className="cmu-nav">
        <BrandLogo variant="black" size="md" />
        <nav>
          <a>Painel</a>
          <a>Curso</a>
          <a>Mentoria</a>
          <a className="active">Comunidade</a>
        </nav>
        <span className="cmu-av">RM</span>
      </header>

      <div className="cmu-body">
        {/* Sidebar esquerda · categorias */}
        <aside className="cmu-cats">
          <span className="cmu-cats-eyebrow">categorias</span>
          <ul>
            {categorias.map((c) => (
              <li key={c.t} className={c.active ? 'active' : ''}>
                <span className="cmu-cat-label"><Hash size={13} strokeWidth={2.2} /> {c.t}</span>
                <span className="cmu-cat-count">{c.n}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Feed central */}
        <main className="cmu-feed">
          {/* Composer */}
          <article className="cmu-composer">
            <span className="cmu-composer-av">RM</span>
            <div className="cmu-composer-field">
              <input type="text" placeholder="Compartilhe um win, uma dúvida, um agente que você construiu…" />
              <div className="cmu-composer-actions">
                <button aria-label="Imagem"><ImageIcon size={15} strokeWidth={2} /></button>
                <button aria-label="Código"><Code2 size={15} strokeWidth={2} /></button>
                <button className="cmu-composer-send">Publicar</button>
              </div>
            </div>
          </article>

          {/* Posts */}
          {posts.map((p, i) => (
            <article key={i} className={`cmu-post ${p.pinned ? 'pinned' : ''}`}>
              {p.pinned && (
                <span className="cmu-post-pin"><Pin size={10} strokeWidth={2.4} /> fixado pelo fundador</span>
              )}
              <header className="cmu-post-head">
                <span className="cmu-post-av">{p.av}</span>
                <div className="cmu-post-meta">
                  <strong>{p.nome}</strong>
                  <em>{p.papel} · {p.t}</em>
                </div>
                <span className="cmu-post-cat">{p.cat}</span>
              </header>
              <p className="cmu-post-txt">{p.txt}</p>
              {p.code && (
                <div className="cmu-post-code">
                  <span className="cmu-post-code-lang">python · agente.py</span>
                  <code>system = build_prompt(examples=load_canonical(3))</code>
                </div>
              )}
              <footer className="cmu-post-foot">
                <button><Heart size={14} strokeWidth={2} /> {p.likes}</button>
                <button><MessageCircle size={14} strokeWidth={2} /> {p.comments}</button>
                <button><Share2 size={14} strokeWidth={2} /> Compartilhar</button>
              </footer>
            </article>
          ))}
        </main>

        {/* Sidebar direita · membros + ranking */}
        <aside className="cmu-side">
          <article className="cmu-side-card">
            <header className="cmu-side-head">
              <span className="cmu-side-eyebrow">online agora</span>
              <span className="cmu-side-count">248</span>
            </header>
            <ul className="cmu-members">
              {membros.map((m) => (
                <li key={m.nome}>
                  <span className="cmu-member-av">
                    {m.av}
                    <span className={`cmu-member-dot ${m.status}`} />
                  </span>
                  <strong>{m.nome}</strong>
                </li>
              ))}
              <li className="cmu-members-more">+244 operadores conectados</li>
            </ul>
          </article>

          <article className="cmu-side-card">
            <header className="cmu-side-head">
              <span className="cmu-side-eyebrow"><TrendingUp size={11} strokeWidth={2.4} /> ranking do mês</span>
            </header>
            <ul className="cmu-ranking">
              {ranking.map((r) => (
                <li key={r.pos}>
                  <span className="cmu-rank-pos">{r.pos}</span>
                  <span className="cmu-rank-av">{r.av}</span>
                  <strong>{r.nome}</strong>
                  <span className="cmu-rank-pts">{r.pts}</span>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>
    </div>
  );
}
