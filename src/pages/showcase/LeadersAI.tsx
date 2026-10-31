import type { ReactNode } from 'react';
import { ArrowRight, Check, UserRound } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Pill } from '../../lib/Pill/Pill';
import { BrandLogo } from '../../lib/BrandLogo/BrandLogo';
import { useScrollEdge } from '../../layout/useScrollEdge';
import leadersLogo from '../../assets/logos/leaders-ai-conference-logo.png';
import './leaders-ai.css';

/* Data, cidade, local, preço e nomes ainda não estão na ficha de fatos:
   todo trecho entre colchetes vira um campo tracejado (placeholder visível
   e intencional, pronto pra receber o dado confirmado). */
function fill(text: string): ReactNode {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? <span key={i} className="la-tbd">{part}</span> : part,
  );
}

type Session = { f: string; n: string; s: string };
type Slot = { t: string; plenary?: Session; tracks?: [Session, Session] };

const tracks = [
  { n: 'Operação', d: 'Para quem implementa' },
  { n: 'Liderança', d: 'Para quem decide' },
];

const days: { n: number; date: string; note: string; slots: Slot[] }[] = [
  {
    n: 1,
    date: '[data]',
    note: 'Plenária na abertura e no fechamento',
    slots: [
      { t: '09:00', plenary: { f: 'Abertura', n: 'Um ano de IA em produção nas empresas', s: 'Rafael Milagre' } },
      { t: '10:00', plenary: { f: 'Palestra', n: 'Operadores de IA: o que mudou em 12 meses', s: '[Palestrante 2]' } },
      {
        t: '11:30',
        tracks: [
          { f: 'Painel', n: 'Casos reais com receita atrelada', s: '[Palestrante 3] e [Palestrante 4]' },
          { f: 'Palestra', n: 'Onde a IA entra primeiro na sua operação', s: '[Palestrante 5]' },
        ],
      },
      {
        t: '14:00',
        tracks: [
          { f: 'Workshop', n: 'Levantando seu primeiro Superagente', s: '[Palestrante 3]' },
          { f: 'Workshop', n: 'Métricas que importam para a diretoria', s: '[Palestrante 4]' },
        ],
      },
      { t: '17:00', plenary: { f: 'Mesa redonda', n: 'Governança séria sem travar a operação', s: '[Palestrante 5] e convidados' } },
    ],
  },
  {
    n: 2,
    date: '[data]',
    note: 'Palestra principal pela manhã, encerramento às 17h',
    slots: [
      { t: '09:00', plenary: { f: 'Palestra principal', n: 'O fim da era do prompt', s: '[Palestrante 2]' } },
      {
        t: '10:30',
        tracks: [
          { f: 'Palestra', n: 'Da hipótese ao deploy, sem atalho', s: '[Palestrante 3]' },
          { f: 'Palestra', n: 'Time, papéis e rotina com agentes', s: '[Palestrante 4]' },
        ],
      },
      {
        t: '14:00',
        tracks: [
          { f: 'Workshop', n: 'Monitorando agentes em produção', s: '[Palestrante 5]' },
          { f: 'Mesa', n: 'Orçamento de IA sem desperdício', s: '[Palestrante 2]' },
        ],
      },
      { t: '17:00', plenary: { f: 'Encerramento', n: 'Encerramento e confraternização', s: 'Rafael Milagre' } },
    ],
  },
];

type Speaker = { name: string; role: string; talk: string; initials?: string; photo?: string; lead?: boolean };

/* Destaque + 4 = grade fechada em qualquer largura (sem card órfão).
   Com foto: preencha `photo` e o retrato troca as iniciais pela imagem. */
const speakers: Speaker[] = [
  { name: 'Rafael Milagre', role: 'Fundador · Viver de IA', talk: 'Abertura do dia 1 e encerramento do dia 2', initials: 'RM', lead: true },
  { name: '[Palestrante 2]', role: '[cargo] · [empresa]', talk: 'Palestra principal · O fim da era do prompt' },
  { name: '[Palestrante 3]', role: '[cargo] · [empresa]', talk: 'Painel · Casos reais com receita atrelada' },
  { name: '[Palestrante 4]', role: '[cargo] · [empresa]', talk: 'Workshop · Métricas que importam' },
  { name: '[Palestrante 5]', role: '[cargo] · [empresa]', talk: 'Mesa redonda · Governança séria' },
];

const tiers = [
  {
    n: 'Essencial',
    d: 'Os dois dias, com plenárias e as duas trilhas.',
    items: ['Plenárias e trilhas', 'Café e almoço nos dois dias', 'Materiais digitais'],
  },
  {
    n: 'Completo',
    d: 'Tudo do Essencial, com workshops e jantar.',
    items: ['Workshops práticos', 'Jantar de relacionamento', 'Gravações das palestras'],
    feat: true,
  },
  {
    n: 'VIP',
    d: 'Tudo do Completo, com acesso reservado.',
    items: ['Mesa redonda fechada', 'Encontro com palestrantes', 'Confraternização de encerramento'],
  },
];

export default function ShowcaseLeadersAI() {
  const navRef = useScrollEdge<HTMLElement>();

  return (
    <div className="vds-showcase la">
      <header ref={navRef} className="la-nav">
        <a className="la-nav-logo" href="#topo" aria-label="Leaders AI Conference · início">
          <span className="la-mark" aria-hidden="true" />
        </a>
        <nav className="la-nav-links" aria-label="Seções do evento">
          <a className="la-nav-link" href="#agenda">Agenda</a>
          <a className="la-nav-link" href="#palestrantes">Palestrantes</a>
          <a className="la-nav-link" href="#ingressos">Ingressos</a>
        </nav>
        <a className="via-btn via-btn--primary via-btn--md la-nav-cta" href="#ingressos">
          <span className="via-btn__label">Comprar ingresso</span>
        </a>
      </header>

      {/* O momento escuro da página: o palco do evento. Logo oficial (branco),
          promessa e o CTA de ingresso. Tudo depois volta pro claro. */}
      <section id="topo" className="la-hero" data-on-dark aria-labelledby="la-hero-title">
        <div className="la-hero-atmos" aria-hidden="true" />
        <div className="la-hero-inner">
          <div className="la-hero-copy">
            <img className="la-hero-logo" src={leadersLogo} alt="Leaders AI Conference" width={1280} height={281} />
            <h1 id="la-hero-title">
              Um encontro de quem opera IA <span className="soft">em produção.</span>
            </h1>
            <p className="la-lede">
              Dois dias para quem já colocou IA na operação: casos com receita atrelada,
              governança séria e decisões reais. Sem hype, sem demo bonita.
            </p>
            <div className="la-hero-actions">
              <a className="via-btn via-btn--primary via-btn--lg" href="#ingressos">
                <span className="via-btn__label">Comprar ingresso</span>
                <span className="via-btn__icon"><ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" /></span>
              </a>
              <a className="via-btn via-btn--secondary via-btn--lg" href="#agenda">
                <span className="via-btn__label">Ver a agenda</span>
              </a>
            </div>
          </div>

          <aside className="la-ficha via-glass-dark" aria-label="Informações do evento">
            <p className="la-ficha-h">Edição {fill('[ano]')}</p>
            <dl>
              <div><dt>Data</dt><dd>{fill('[data]')}</dd></div>
              <div><dt>Cidade</dt><dd>{fill('[cidade]')}</dd></div>
              <div><dt>Local</dt><dd>{fill('[local]')}</dd></div>
              <div><dt>Formato</dt><dd>2 dias · 2 trilhas em paralelo</dd></div>
              <div><dt>Ingressos</dt><dd>A partir de R$ {fill('[valor]')}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section id="agenda" className="la-section" aria-labelledby="la-agenda-title">
        <div className="la-wrap">
          <header className="la-section-h">
            <div>
              <span className="la-eyebrow">Agenda</span>
              <h2 id="la-agenda-title">Dois dias, <em>duas trilhas em paralelo.</em></h2>
            </div>
            <p>
              Cada dia abre e fecha em plenária. Entre uma e outra, você escolhe a sala:
              Operação, pra quem implementa, ou Liderança, pra quem decide.
            </p>
          </header>

          {days.map((d) => (
            <article key={d.n} className="la-day" aria-labelledby={`la-dia-${d.n}`}>
              <header className="la-day-h">
                <h3 id={`la-dia-${d.n}`}>Dia {d.n}</h3>
                <span className="la-day-date">{fill(d.date)}</span>
                <span className="la-day-note">{d.note}</span>
              </header>

              <div className="la-sheet">
                <div className="la-sheet-head" aria-hidden="true">
                  <span>Horário</span>
                  {tracks.map((tr) => (
                    <span key={tr.n}><strong>Trilha {tr.n}</strong>{tr.d}</span>
                  ))}
                </div>
                <ol className="la-rows">
                  {d.slots.map((slot) => (
                    <li key={slot.t} className={`la-row${slot.plenary ? ' is-plenary' : ''}`}>
                      <time className="la-time" dateTime={slot.t}>{slot.t}</time>
                      {slot.plenary ? (
                        <div className="la-session">
                          <span className="la-meta">
                            {slot.plenary.f}
                            <Pill className="la-plenary-pill">plenária</Pill>
                          </span>
                          <p className="la-session-n">{slot.plenary.n}</p>
                          <p className="la-session-s">{fill(slot.plenary.s)}</p>
                        </div>
                      ) : (
                        slot.tracks?.map((s, i) => (
                          <div key={s.n} className="la-session">
                            <span className="la-meta">
                              <span className="la-track">Trilha {tracks[i].n}</span>
                              {s.f}
                            </span>
                            <p className="la-session-n">{s.n}</p>
                            <p className="la-session-s">{fill(s.s)}</p>
                          </div>
                        ))
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}

          <aside className="la-band" aria-label="Ingressos">
            <div>
              <p className="la-band-t">Um ingresso vale os dois dias.</p>
              <p className="la-band-d">Plenárias e as duas trilhas em todos os níveis. Workshops a partir do Completo.</p>
            </div>
            <a className="via-btn via-btn--primary via-btn--lg" href="#ingressos">
              <span className="via-btn__label">Comprar ingresso</span>
              <span className="via-btn__icon"><ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" /></span>
            </a>
          </aside>
        </div>
      </section>

      <section id="palestrantes" className="la-section la-section--rule" aria-labelledby="la-pal-title">
        <div className="la-wrap">
          <header className="la-section-h">
            <div>
              <span className="la-eyebrow">Palestrantes</span>
              <h2 id="la-pal-title">Quem implementa, <em>não quem teoriza.</em></h2>
            </div>
            <p>Operadores com IA rodando na própria empresa. A lista completa sai em {fill('[data]')}.</p>
          </header>

          <ul className="la-people">
            {speakers.map((s) => (
              <li key={s.name} className={`la-person${s.lead ? ' is-lead' : ''}`}>
                <div className="la-portrait">
                  {s.photo ? (
                    <img src={s.photo} alt="" />
                  ) : s.initials ? (
                    <span className="la-initials" aria-hidden="true">{s.initials}</span>
                  ) : (
                    <UserRound className="la-silhouette" strokeWidth={1} aria-hidden="true" />
                  )}
                </div>
                <div className="la-person-txt">
                  {s.lead && <Pill className="la-lead-pill">abertura e encerramento</Pill>}
                  <h3>{fill(s.name)}</h3>
                  <p className="la-role">{fill(s.role)}</p>
                  <p className="la-talk">{s.talk}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ingressos" className="la-section la-tickets" aria-labelledby="la-ing-title">
        <div className="la-wrap">
          <header className="la-section-h la-section-h--center">
            <span className="la-eyebrow">Ingressos</span>
            <h2 id="la-ing-title">Três níveis. <em>Um destaque.</em></h2>
          </header>

          <div className="la-tiers">
            {tiers.map((t) => (
              <article key={t.n} className={`la-tier${t.feat ? ' is-feat' : ''}`} aria-labelledby={`la-tier-${t.n}`}>
                <header className="la-tier-h">
                  <h3 id={`la-tier-${t.n}`}>{t.n}</h3>
                  {t.feat && <Pill>recomendado</Pill>}
                </header>
                <p className="la-tier-d">{t.d}</p>
                <p className="la-price">
                  <span className="la-cur">R$</span>
                  {fill('[valor]')}
                </p>
                <ul>
                  {t.items.map((i) => (
                    <li key={i}><Check size={16} strokeWidth={1.75} aria-hidden="true" />{i}</li>
                  ))}
                </ul>
                <Button
                  variant={t.feat ? 'primary' : 'secondary'}
                  size="lg"
                  fullWidth
                  iconRight={t.feat ? <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" /> : undefined}
                >
                  Comprar {t.n}
                </Button>
              </article>
            ))}
          </div>
          <p className="la-tiers-note">Valores e condições de pagamento: {fill('[a confirmar]')}</p>
        </div>
      </section>

      <footer className="la-footer">
        <div className="la-wrap la-footer-in">
          <div className="la-footer-brand">
            <span className="la-mark la-mark--sm" role="img" aria-label="Leaders AI Conference" />
            <span className="la-footer-by">
              Uma realização
              <BrandLogo variant="auto" size={18} />
            </span>
          </div>
          <p className="la-footer-meta">{fill('[data] · [cidade] · [local]')}</p>
        </div>
      </footer>
    </div>
  );
}
