import { useState } from 'react';
import {
  ArrowRight, FileText, Download, Cookie, ChevronLeft, ChevronRight,
  MessageCircle, Heart, MoreHorizontal,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './more-components-2.css';

/* ==============================================================
   COOKIE BANNER · NEWSLETTER · COMMENT THREAD · FILE CARD · CALENDAR
   ============================================================== */

export default function MoreComponents2() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · expansão · vol. 2"
        title={<>Mais cinco peças, <em>obra a obra</em>.</>}
        lede="Cookie banner LGPD-compliant, Newsletter signup inline editorial, Comment thread / discussion, File card pra downloads, Calendar / date picker. Todos com a mesma régua — glass quando faz sentido, navy carregando hierarquia."
      />

      <CookieBannerSection />
      <NewsletterSection />
      <CommentThreadSection />
      <FileCardSection />
      <CalendarSection />
    </>
  );
}

/* ---- Cookie banner ---- */
function CookieBannerSection() {
  const [closed, setClosed] = useState(false);
  return (
    <Section title="Cookie banner · LGPD" meta="bottom · glass dark">
      <div className="vds-cookie-stage">
        {!closed && (
          <div className="vds-cookie">
            <div className="vds-cookie-ico"><Cookie size={20} strokeWidth={2} /></div>
            <div className="vds-cookie-body">
              <strong>Cookies da Viver de IA</strong>
              <p>
                Usamos cookies essenciais para o painel funcionar e cookies opcionais
                pra entender quais cases você mais lê. Você pode escolher.
                <a> Ver política completa →</a>
              </p>
            </div>
            <div className="vds-cookie-actions">
              <button className="ghost" onClick={() => setClosed(true)}>Só os essenciais</button>
              <button className="primary" onClick={() => setClosed(true)}>Aceitar todos</button>
            </div>
          </div>
        )}
        {closed && (
          <p className="vds-cookie-reset">
            Banner fechado · <button onClick={() => setClosed(false)}>reabrir pra ver de novo</button>
          </p>
        )}
      </div>
    </Section>
  );
}

/* ---- Newsletter ---- */
function NewsletterSection() {
  return (
    <Section title="Newsletter signup · inline" meta="editorial · sem distração">
      <div className="vds-news">
        <div className="vds-news-l">
          <p className="vds-eyebrow">Curatorial quinzenal</p>
          <h3>3 cases novos<br />a cada 15 dias.</h3>
          <p className="lede">
            Quem entrega resultado em produção, com número atrelado. Nada de "5 dicas
            pra IA". Sextas pela manhã.
          </p>
        </div>
        <form className="vds-news-form" onSubmit={(e) => e.preventDefault()}>
          <div className="vds-news-input">
            <input type="email" placeholder="seu@email.com" defaultValue="rafael@viverdeia.ai" />
            <button type="submit">
              Assinar
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
          <p className="vds-news-foot">+1.840 operadores recebem · sai toda sexta · sem spam</p>
        </form>
      </div>
    </Section>
  );
}

/* ---- Comment thread ---- */
function CommentThreadSection() {
  const comments = [
    {
      who: 'Caio Ribeiro', avatar: 'CR', when: '2h',
      text: 'Esse case da Efizi é um dos mais redondos que publicamos. O salto pra +11.920 conversas analisadas em 90 dias deu uma régua nova pra todo mundo do ecom.',
      likes: 24, replies: 3,
    },
    {
      who: 'Larissa Tavares', avatar: 'LT', when: '1h',
      text: 'Concordo. A parte de leitura semanal das conversas + ajuste do prompt no domingo é o que faltava no meu pipeline. Vou aplicar na nossa operação hoje.',
      likes: 8,
      indent: true,
    },
    {
      who: 'Guilherme Delorenzo', avatar: 'GD', when: '12 min',
      text: 'Detalhe importante: o ganho de tempo na decisão comercial veio antes do ganho de receita. Levou ~4 semanas pra virar dinheiro de verdade.',
      likes: 12, replies: 1,
    },
  ];
  return (
    <Section title="Comment thread · discussão" meta="case publicado">
      <div className="vds-comments">
        <header>
          <p className="vds-eyebrow">Discussão · case Efizi</p>
          <h3>3 comentários</h3>
        </header>
        <ul>
          {comments.map((c, i) => (
            <li key={i} className={c.indent ? 'indent' : ''}>
              <span className="av">{c.avatar}</span>
              <div className="body">
                <header>
                  <strong>{c.who}</strong>
                  <span className="when">{c.when}</span>
                </header>
                <p>{c.text}</p>
                <footer>
                  <button className="act"><Heart size={12} strokeWidth={2} /> {c.likes}</button>
                  {c.replies && <button className="act"><MessageCircle size={12} strokeWidth={2} /> {c.replies}</button>}
                  <button className="act ghost">Responder</button>
                  <button aria-label="Mais opções" className="act ico"><MoreHorizontal size={12} strokeWidth={2} /></button>
                </footer>
              </div>
            </li>
          ))}
        </ul>
        <div className="vds-comments-input">
          <span className="av-sm">RM</span>
          <input placeholder="Escreva sua resposta…" />
          <button>Enviar</button>
        </div>
      </div>
    </Section>
  );
}

/* ---- File card ---- */
function FileCardSection() {
  const files = [
    { ext: 'PDF', name: 'Case Efizi · +11.920 conversas (Q4 2026)', size: '2.4 MB', who: 'Caio Ribeiro', when: 'há 4 dias' },
    { ext: 'PDF', name: 'Manifesto Viver de IA · v3', size: '0.9 MB', who: 'Equipe VIA', when: 'há 12 dias' },
    { ext: 'ZIP', name: 'Templates de Email · light + dark', size: '14 MB', who: 'Design System', when: 'hoje' },
  ];
  return (
    <Section title="File card · arquivos baixáveis" meta="ext + meta + ação">
      <div className="vds-files">
        {files.map((f, i) => (
          <article key={i} className="vds-file">
            <span className={`vds-file-ext ${f.ext.toLowerCase()}`}><FileText size={16} strokeWidth={1.8} /><em>{f.ext}</em></span>
            <div className="vds-file-meta">
              <strong>{f.name}</strong>
              <span>{f.size} · {f.who} · {f.when}</span>
            </div>
            <button className="vds-file-action" aria-label="Baixar"><Download size={14} strokeWidth={2.2} /></button>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---- Calendar ---- */
function CalendarSection() {
  const [month, setMonth] = useState('Maio 2026');
  const [picked, setPicked] = useState(18);

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const cells: Array<{ d: number; muted?: boolean; today?: boolean; hasEvent?: boolean }> = [];
  // start with prev-month tail
  for (let i = 26; i <= 30; i++) cells.push({ d: i, muted: true });
  for (let i = 1; i <= 31; i++) cells.push({ d: i, today: i === 18, hasEvent: [5, 12, 13, 18, 24, 30].includes(i) });
  // pad with next month
  for (let i = 1; i <= 6; i++) cells.push({ d: i, muted: true });

  return (
    <Section title="Calendar · date picker" meta="vidro suspenso · navegação mês">
      <div className="vds-cal-stage">
        <div className="vds-cal">
          <header>
            <button className="nav" onClick={() => setMonth('Abril 2026')} aria-label="Mês anterior"><ChevronLeft size={14} strokeWidth={2.2} /></button>
            <strong>{month}</strong>
            <button className="nav" onClick={() => setMonth('Junho 2026')} aria-label="Próximo mês"><ChevronRight size={14} strokeWidth={2.2} /></button>
          </header>
          <div className="vds-cal-days">
            {days.map((d, i) => <span key={i} className="dow">{d}</span>)}
          </div>
          <div className="vds-cal-grid">
            {cells.map((c, i) => (
              <button
                key={i}
                className={`vds-cal-cell${c.muted ? ' muted' : ''}${picked === c.d && !c.muted ? ' picked' : ''}${c.hasEvent && !c.muted ? ' event' : ''}`}
                onClick={() => !c.muted && setPicked(c.d)}
                disabled={c.muted}
              >
                {c.d}
                {c.hasEvent && !c.muted && <span className="dot" />}
              </button>
            ))}
          </div>
          <footer>
            <span>Selecionado · 18 mai · quarta</span>
            <button className="cta">Agendar sessão <ArrowRight size={12} strokeWidth={2.5} /></button>
          </footer>
        </div>
      </div>
    </Section>
  );
}
