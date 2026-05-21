import { useState } from 'react';
import {
  Calendar, ChevronLeft, ChevronRight, ChevronDown, Search, X, Plus,
  Star, Pipette, Check, MapPin,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './form-advanced.css';

export default function FormAdvanced() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · form avançado"
        title={
          <>
            Controles de form, <em>todos editorial</em>.
          </>
        }
        lede="Date picker, combobox, tag input, range duplo, rating e color picker — os controles que sempre faltam quando o produto deixa de ser landing e vira aplicação. Todos com glass, navy como protagonista, hover/foco com ring sutil, sem semáforo genérico."
      />

      <DatePickerSection />
      <DateRangeSection />
      <ComboboxSection />
      <TagInputSection />
      <RangeDoubleSection />
      <RatingSection />
      <ColorPickerSection />
    </>
  );
}

/* ---------- Date range · 2 months side-by-side ---------- */
function DateRangeSection() {
  const [start, setStart] = useState(7);
  const [end, setEnd] = useState(22);
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const may = [
    0, 0, 0, 0, 0, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31, 0, 0, 0, 0, 0, 0,
  ];

  const jun = [
    0, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 0, 0, 0, 0,
  ];

  const inRange = (d: number, month: 'mai' | 'jun') => {
    if (month === 'mai') return d >= start && d <= 31;
    return d <= end;
  };

  const isEdge = (d: number, month: 'mai' | 'jun') => {
    return (month === 'mai' && d === start) || (month === 'jun' && d === end);
  };

  return (
    <Section title="Date range · 2 meses lado a lado" meta="janela de relatório · agenda de pesquisa · período de billing">
      <div className="vds-dp-range-wrap">
        <div className="vds-dp-range-presets">
          <span className="vds-form-field-label">Presets</span>
          <div className="vds-dp-presets-row">
            <button>Últimos 7 dias</button>
            <button className="active">Últimos 15 dias</button>
            <button>Últimos 30 dias</button>
            <button>Últimos 90 dias</button>
            <button>Tudo · 2026</button>
          </div>
        </div>

        <article className="vds-dp-range">
          <span className="vds-dp-aura" aria-hidden="true" />

          <div className="vds-dp-range-grid">
            {/* Maio */}
            <div className="vds-dp-range-month">
              <header>
                <button aria-label="Anterior" className="vds-dp-nav"><ChevronLeft size={14} strokeWidth={2.2} /></button>
                <div className="vds-dp-title">
                  <span className="vds-dp-month">Maio</span>
                  <span className="vds-dp-year">2026</span>
                </div>
                <span style={{ width: 30 }} />
              </header>
              <div className="vds-dp-week">
                {days.map((d, i) => <span key={i}>{d}</span>)}
              </div>
              <div className="vds-dp-grid-cells">
                {may.map((d, i) => {
                  if (d === 0) return <span key={i} className="vds-dp-cell muted" />;
                  const within = inRange(d, 'mai');
                  const edge = isEdge(d, 'mai');
                  return (
                    <button
                      key={i}
                      className={`vds-dp-cell ${within ? 'in-range' : ''} ${edge ? 'sel' : ''} ${edge && within ? 'edge-start' : ''}`}
                      onClick={() => setStart(d)}
                    >
                      <span className="vds-dp-num">{d}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="vds-dp-range-divider" aria-hidden="true" />

            {/* Junho */}
            <div className="vds-dp-range-month">
              <header>
                <span style={{ width: 30 }} />
                <div className="vds-dp-title">
                  <span className="vds-dp-month">Junho</span>
                  <span className="vds-dp-year">2026</span>
                </div>
                <button aria-label="Próximo" className="vds-dp-nav"><ChevronRight size={14} strokeWidth={2.2} /></button>
              </header>
              <div className="vds-dp-week">
                {days.map((d, i) => <span key={i}>{d}</span>)}
              </div>
              <div className="vds-dp-grid-cells">
                {jun.map((d, i) => {
                  if (d === 0) return <span key={i} className="vds-dp-cell muted" />;
                  const within = inRange(d, 'jun');
                  const edge = isEdge(d, 'jun');
                  return (
                    <button
                      key={i}
                      className={`vds-dp-cell ${within ? 'in-range' : ''} ${edge ? 'sel' : ''} ${edge ? 'edge-end' : ''}`}
                      onClick={() => setEnd(d)}
                    >
                      <span className="vds-dp-num">{d}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <footer className="vds-dp-range-foot">
            <div className="vds-dp-range-summary">
              <div>
                <span className="vds-dp-range-eyebrow">Início</span>
                <strong>{start.toString().padStart(2, '0')} mai · 2026</strong>
              </div>
              <span className="vds-dp-range-arrow">→</span>
              <div>
                <span className="vds-dp-range-eyebrow">Fim</span>
                <strong>{end.toString().padStart(2, '0')} jun · 2026</strong>
              </div>
              <span className="vds-dp-range-span">
                <em>{31 - start + end + 1}</em>
                dias na janela
              </span>
            </div>
            <button className="vds-dp-range-cta">Aplicar período</button>
          </footer>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Date picker ---------- */
function DatePickerSection() {
  const [selected, setSelected] = useState(17);
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  // Maio 2026 — começa na sexta
  const cells: Array<number | null> = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31, null, null, null, null, null, null,
  ];
  // Dias com eventos (mentoria, live, etc) — mostra ocupação
  const events: Record<number, { label: string; tone: 'navy' | 'accent' }[]> = {
    7: [{ label: 'Mentoria 1:1', tone: 'navy' }],
    12: [{ label: 'Live · auditoria', tone: 'navy' }],
    14: [{ label: 'Aula 02.02', tone: 'navy' }],
    17: [{ label: 'Renovação', tone: 'accent' }, { label: 'Sessão 1:1', tone: 'navy' }],
    19: [{ label: 'Hoje · 2 tarefas', tone: 'navy' }],
    22: [{ label: 'Live coletiva', tone: 'accent' }],
    28: [{ label: 'Encerra mês', tone: 'navy' }],
  };

  return (
    <Section title="Date picker · calendário editorial" meta="agenda · marca entrega · live · eventos visíveis no grão">
      <div className="vds-dp-grid">
        <div className="vds-form-field">
          <label>Quando devolvemos esse exercício?</label>
          <div className="vds-form-input-wrap">
            <input
              className="vds-form-input"
              aria-label="Data de entrega"
              value={`${selected.toString().padStart(2, '0')} de maio · 2026`}
              readOnly
            />
            <Calendar size={14} strokeWidth={2.2} />
          </div>
          <p className="vds-form-hint">
            <em>Eventos do mês visíveis no calendário</em> — passa o mouse pra ver detalhes.
          </p>

          {/* Selected detail */}
          {events[selected] && (
            <div className="vds-dp-detail">
              <p className="vds-dp-detail-title">
                Dia <strong>{selected}</strong> · maio 2026
              </p>
              <ul>
                {events[selected].map((e, i) => (
                  <li key={i}>
                    <span className={`vds-dp-detail-dot ${e.tone}`} />
                    {e.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <article className="vds-datepicker">
          <span className="vds-dp-aura" aria-hidden="true" />

          <header>
            <button className="vds-dp-nav" aria-label="Mês anterior">
              <ChevronLeft size={14} strokeWidth={2.2} />
            </button>
            <div className="vds-dp-title">
              <span className="vds-dp-month">Maio</span>
              <span className="vds-dp-year">2026</span>
            </div>
            <button className="vds-dp-nav" aria-label="Próximo mês">
              <ChevronRight size={14} strokeWidth={2.2} />
            </button>
          </header>

          <div className="vds-dp-week">
            {days.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="vds-dp-grid-cells">
            {cells.map((d, i) => {
              if (d === null) return <span key={i} className="vds-dp-cell muted" />;
              const isSel = d === selected;
              const isToday = d === 19;
              const dayEvents = events[d];
              return (
                <button
                  key={i}
                  className={`vds-dp-cell ${isSel ? 'sel' : ''} ${isToday ? 'today' : ''}`}
                  onClick={() => setSelected(d)}
                >
                  <span className="vds-dp-num">{d}</span>
                  {dayEvents && (
                    <span className="vds-dp-events">
                      {dayEvents.slice(0, 2).map((e, ix) => (
                        <span key={ix} className={`vds-dp-event-dot ${e.tone}`} />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <footer className="vds-dp-foot">
            <button className="vds-dp-chip" onClick={() => setSelected(19)}>
              <span className="vds-dp-chip-dot today" />
              Hoje
            </button>
            <button className="vds-dp-chip">
              Próximos 7 dias
            </button>
            <button className="vds-dp-chip">
              Este mês
            </button>
            <button className="vds-dp-clear" onClick={() => setSelected(0)}>
              Limpar
            </button>
          </footer>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Combobox ---------- */
function ComboboxSection() {
  const [open, setOpen] = useState(true);
  const [val, setVal] = useState('');
  const options = [
    { v: 'BR-SP', label: 'São Paulo', meta: 'SP · capital · 12M habitantes', icon: '🏛' },
    { v: 'BR-RJ', label: 'Rio de Janeiro', meta: 'RJ · capital · 6M habitantes', icon: '🏖' },
    { v: 'BR-BH', label: 'Belo Horizonte', meta: 'MG · capital · 2,7M', icon: '⛰' },
    { v: 'BR-FLN', label: 'Florianópolis', meta: 'SC · capital · 600K', icon: '🌊' },
    { v: 'BR-JOI', label: 'Joinville', meta: 'SC · industrial · 600K', icon: '⚙️' },
  ];
  const filtered = val ? options.filter((o) => o.label.toLowerCase().includes(val.toLowerCase())) : options;
  const [picked, setPicked] = useState('BR-SP');

  return (
    <Section title="Combobox · search dentro do dropdown" meta="cidade · país · cliente · qualquer base">
      <div className="vds-combobox-wrap">
        <label>Cidade do evento</label>
        <div className="vds-combobox-trigger" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls="vds-combobox-list">
          <Search size={13} strokeWidth={2.2} className="ico" />
          <input
            aria-label="Buscar cidade do evento"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Buscar cidade…"
          />
          <button
            type="button"
            className="chev-btn"
            aria-label={open ? 'Fechar lista' : 'Abrir lista'}
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', padding: 0, display: 'inline-flex', cursor: 'pointer' }}
          >
            <ChevronDown size={13} strokeWidth={2.2} className={`chev ${open ? 'rot' : ''}`} />
          </button>
        </div>

        {open && (
          <ul id="vds-combobox-list" className="vds-combobox-list">
            <li className="vds-combobox-section-head">
              <span>{filtered.length} cidades</span>
              <span>↵ pra selecionar</span>
            </li>
            {filtered.length === 0 && (
              <li className="vds-combobox-empty">
                <Search size={14} strokeWidth={1.6} />
                Nenhuma cidade com "{val}".
              </li>
            )}
            {filtered.map((o) => {
              const isPicked = picked === o.v;
              return (
                <li
                  key={o.v}
                  className={`vds-combobox-opt ${isPicked ? 'on' : ''}`}
                  onClick={() => { setPicked(o.v); setVal(o.label); }}
                >
                  <span className="vds-combobox-mark">
                    <MapPin size={14} strokeWidth={2} />
                  </span>
                  <div className="vds-combobox-text">
                    <p className="lbl">{o.label}</p>
                    <p className="meta">{o.meta}</p>
                  </div>
                  {isPicked && (
                    <span className="vds-combobox-check">
                      <Check size={13} strokeWidth={2.4} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Section>
  );
}

/* ---------- Tag input ---------- */
function TagInputSection() {
  const [tags, setTags] = useState(['IA aplicada', 'NLP', 'agentes', 'few-shot']);
  const [input, setInput] = useState('');
  const suggestions = ['RAG', 'embeddings', 'prompt-eng', 'evals', 'fine-tuning'];

  const add = (val?: string) => {
    const v = (val || input).trim();
    if (v && !tags.includes(v)) {
      setTags([...tags, v]);
      setInput('');
    }
  };

  return (
    <Section title="Tag input · chips editáveis" meta="categorizar aulas · etiquetar clientes · filtrar conteúdo">
      <div className="vds-form-field">
        <label>Tópicos dessa aula</label>
        <div className="vds-taginput">
          {tags.map((t) => (
            <span key={t} className="vds-tag">
              {t}
              <button onClick={() => setTags(tags.filter((x) => x !== t))} aria-label={`Remover ${t}`}>
                <X size={10} strokeWidth={2.4} />
              </button>
            </span>
          ))}
          <input
            aria-label="Adicionar tag"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
            placeholder={tags.length ? 'Adicionar mais…' : 'Digite e pressione Enter'}
          />
          {input && (
            <button className="vds-taginput-add" onClick={() => add()}>
              <Plus size={11} strokeWidth={2.5} />
              <span>Adicionar "{input}"</span>
            </button>
          )}
        </div>

        <div className="vds-taginput-suggestions">
          <span className="vds-taginput-sugg-label">Sugestões da curadoria</span>
          <div className="vds-taginput-sugg-row">
            {suggestions.filter((s) => !tags.includes(s)).map((s) => (
              <button key={s} className="vds-taginput-sugg" onClick={() => add(s)}>
                <Plus size={10} strokeWidth={2.5} />
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Range slider duplo ---------- */
function RangeDoubleSection() {
  const min = 0;
  const max = 2400;
  const step = 60;
  const [lo, setLo] = useState(480);
  const [hi, setHi] = useState(1620);

  const loPct = (lo / max) * 100;
  const hiPct = (hi / max) * 100;
  const span = hi - lo;
  const median = Math.round((lo + hi) / 2);

  // Ticks editorial
  const ticks = [0, 600, 1200, 1800, 2400];

  return (
    <Section title="Range slider duplo · faixa de valores" meta="filtro de preço · janela de datas · benchmark editorial">
      <div className="vds-form-field">
        <label>Faixa de preço por aluno (R$)</label>
        <div className="vds-range-double">
          <div className="vds-range-stage">
            <div className="vds-range-track">
              <span className="fill" style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }} />
              <input
                type="range"
                aria-label="Valor mínimo"
                min={min}
                max={max}
                step={step}
                value={lo}
                onChange={(e) => setLo(Math.min(Number(e.target.value), hi - 60))}
                className="thumb lo"
              />
              <input
                type="range"
                aria-label="Valor máximo"
                min={min}
                max={max}
                step={step}
                value={hi}
                onChange={(e) => setHi(Math.max(Number(e.target.value), lo + 60))}
                className="thumb hi"
              />
            </div>
            <div className="vds-range-ticks">
              {ticks.map((t) => (
                <span key={t}>
                  <span className="tick" />
                  <em>R$ {t >= 1000 ? `${t / 1000}K` : t}</em>
                </span>
              ))}
            </div>
          </div>

          <div className="vds-range-summary">
            <div>
              <span className="vds-range-eyebrow">Mínimo</span>
              <strong>R$ {lo.toLocaleString('pt-BR')}</strong>
            </div>
            <div className="span">
              <span className="vds-range-eyebrow">Faixa</span>
              <strong>R$ {span.toLocaleString('pt-BR')}</strong>
              <em>mediana R$ {median.toLocaleString('pt-BR')}</em>
            </div>
            <div>
              <span className="vds-range-eyebrow">Máximo</span>
              <strong>R$ {hi.toLocaleString('pt-BR')}</strong>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Rating ---------- */
function RatingSection() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover != null ? hover : rating;

  const labels: Record<number, { copy: string; meta: string }> = {
    5: { copy: 'Essencial. Quero mais assim.', meta: 'Indica que a aula virou referência pessoal' },
    4: { copy: 'Muito boa. Aproveitei demais.', meta: 'Aula entrega o que promete + algo a mais' },
    3: { copy: 'Boa. Aproveitei em partes.', meta: 'Conteúdo sólido, mas faltou profundidade em alguns pontos' },
    2: { copy: 'Achei rasa.', meta: 'Esperava mais densidade ou exemplos práticos' },
    1: { copy: 'Não me serviu.', meta: 'Saiu sem aprendizado prático aplicável' },
  };

  return (
    <Section title="Rating · 5 estrelas editoriais" meta="avaliar aula · review de mentor · feedback de sessão">
      <div className="vds-form-field">
        <label>Como você avalia essa aula?</label>
        <div className="vds-rating">
          <div className="vds-rating-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`vds-star ${shown >= n ? 'on' : ''}`}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(n)}
                aria-label={`${n} de 5`}
              >
                <Star size={24} strokeWidth={1.6} fill={shown >= n ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
          <div className="vds-rating-info">
            <p className="vds-rating-val">
              <strong>{shown.toFixed(1)}</strong>
              <em>/ 5,0</em>
            </p>
            {labels[shown] && (
              <>
                <p className="vds-rating-copy">{labels[shown].copy}</p>
                <p className="vds-rating-meta">{labels[shown].meta}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Color picker ---------- */
function ColorPickerSection() {
  const palette = [
    { hex: '#0A1F3B', name: 'Navy · primary' },
    { hex: 'var(--via-blue)', name: 'Navy · 80' },
    { hex: 'var(--via-blue-soft)', name: 'Navy · 60' },
    { hex: 'var(--via-blue)', name: 'Navy · 40' },
    { hex: '#0A1F3B', name: 'Accent · accent' },
    { hex: '#D0D5DD', name: 'Accent · 80' },
    { hex: '#F7F8FA', name: 'Cream · surface' },
    { hex: '#222222', name: 'Ink · text' },
    { hex: 'var(--via-success)', name: 'Verde · success' },
    { hex: '#B85C5C', name: 'Coral · danger' },
    { hex: '#6A2BC2', name: 'Roxo · accent alt' },
    { hex: '#2466A3', name: 'Azul · info' },
  ];
  const [picked, setPicked] = useState(palette[0]);

  return (
    <Section title="Color picker · tokens da marca + hex" meta="theming · marca pessoal · destaque visual">
      <div className="vds-color-stage">
        <div className="vds-color-preview">
          <div className="vds-color-swatch" style={{ background: picked.hex }}>
            <Pipette size={14} strokeWidth={2} />
          </div>
          <div className="vds-color-info">
            <p className="vds-color-name">{picked.name}</p>
            <p className="vds-color-hex">
              <span className="prefix">HEX</span>
              {picked.hex.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="vds-color-grid">
          {palette.map((c) => (
            <button
              key={c.hex}
              className={`vds-color-cell ${picked.hex === c.hex ? 'on' : ''}`}
              style={{ background: c.hex }}
              onClick={() => setPicked(c)}
              aria-label={c.name}
            >
              {picked.hex === c.hex && (
                <Check size={14} strokeWidth={3} style={{ color: ['#F7F8FA', '#D0D5DD', 'var(--via-blue)'].includes(c.hex) ? '#0A1F3B' : 'var(--via-white)' }} />
              )}
            </button>
          ))}
        </div>

        <div className="vds-color-input-wrap">
          <span className="prefix">#</span>
          <input
            aria-label="Cor em hex"
            value={picked.hex.replace('#', '').toUpperCase()}
            onChange={(e) => {
              const v = '#' + e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
              const found = palette.find((p) => p.hex.toLowerCase() === v.toLowerCase());
              setPicked(found || { hex: v, name: 'Custom hex' });
            }}
            maxLength={6}
          />
          <span className="suffix">Hex</span>
        </div>
      </div>
    </Section>
  );
}
