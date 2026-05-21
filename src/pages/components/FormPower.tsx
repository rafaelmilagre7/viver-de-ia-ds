import { useState, useRef } from 'react';
import {
  Check, X, ChevronDown, Search, Upload as UploadIcon, FileText,
  Image as ImageIcon, ZoomIn, ZoomOut, RotateCw, Bold, Italic,
  Link2, List, Code as CodeIcon, Heading,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './form-power.css';

export default function FormPower() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · form power"
        title={
          <>
            5 peças avançadas — <em>complete o stack do form</em>.
          </>
        }
        lede="Multi-select com chips, drag-drop file com preview, phone input internacional, image cropper editorial, e markdown editor. Tudo seguindo a paleta navy + a regra da pill canônica."
      />

      <MultiSelectSection />
      <DragDropSection />
      <PhoneInputSection />
      <ImageCropperSection />
      <MarkdownEditorSection />
    </>
  );
}

/* ============================================
   1 · Multi-select dropdown
   ============================================ */
function MultiSelectSection() {
  const all = [
    { id: 'mentoria', label: 'Mentoria 1:1', count: 12 },
    { id: 'corporate', label: 'Plano Corporate', count: 3 },
    { id: 'comunidade', label: 'Comunidade', count: 218 },
    { id: 'newsletter', label: 'Newsletter semanal', count: 84 },
    { id: 'eventos', label: 'Eventos presenciais', count: 14 },
    { id: 'discord', label: 'Discord interno', count: 162 },
  ];
  const [selected, setSelected] = useState(['mentoria', 'corporate']);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = all.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <Section title="Multi-select dropdown · chips removíveis + busca" meta="select multiple · search interno · clear all · 3 estados">
      <article className="vds-fp-mselect">
        <label className="vds-fp-label">Tópicos de interesse</label>

        <div className="vds-fp-mselect-input" onClick={() => setOpen(true)}>
          <div className="vds-fp-mselect-chips">
            {selected.length === 0 ? (
              <span className="vds-fp-mselect-ph">Escolha um ou mais tópicos…</span>
            ) : (
              selected.map((id) => {
                const item = all.find((a) => a.id === id);
                if (!item) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    className="vds-fp-mselect-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(id);
                    }}
                    aria-label={`Remover ${item.label}`}
                  >
                    {item.label}
                    <X size={10} strokeWidth={2.4} />
                  </button>
                );
              })
            )}
          </div>
          <div className="vds-fp-mselect-side">
            {selected.length > 0 && (
              <button
                type="button"
                className="vds-fp-mselect-clear"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected([]);
                }}
              >
                Limpar
              </button>
            )}
            <ChevronDown size={14} strokeWidth={2} className={open ? 'is-open' : ''} />
          </div>
        </div>

        {open && (
          <div className="vds-fp-mselect-pop">
            <div className="vds-fp-mselect-search">
              <Search size={13} strokeWidth={2} />
              <input
                autoFocus
                placeholder="Buscar tópico…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <ul>
              {filtered.map((o) => {
                const isOn = selected.includes(o.id);
                return (
                  <li key={o.id} className={isOn ? 'on' : ''}>
                    <button type="button" onClick={() => toggle(o.id)}>
                      <span className="vds-fp-mselect-check">
                        {isOn && <Check size={10} strokeWidth={3} />}
                      </span>
                      <span className="vds-fp-mselect-lbl">{o.label}</span>
                      <span className="vds-fp-mselect-count mono">{o.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <footer className="vds-fp-mselect-foot">
              <span><strong>{selected.length}</strong> selecionado{selected.length !== 1 ? 's' : ''}</span>
              <button type="button" onClick={() => setOpen(false)}>Concluir</button>
            </footer>
          </div>
        )}
      </article>
    </Section>
  );
}

/* ============================================
   2 · Drag-drop file zone
   ============================================ */
function DragDropSection() {
  const [files] = useState([
    { name: 'mentoria-2026-q2.pdf', size: '2.4 MB', type: 'pdf', progress: 100 },
    { name: 'agenda-leaders-ai.png', size: '480 KB', type: 'image', progress: 62 },
    { name: 'transcript-aula-04.txt', size: '38 KB', type: 'text', progress: 100 },
  ]);

  return (
    <Section title="Drag-and-drop file zone · com preview + progress" meta="dashed border · ícone glass · lista de uploads · cancel individual">
      <article className="vds-fp-drop">
        <div className="vds-fp-drop-zone">
          <div className="vds-fp-drop-icon">
            <UploadIcon size={20} strokeWidth={1.6} />
          </div>
          <h4>
            Arraste arquivos aqui ou <em>clique pra escolher</em>.
          </h4>
          <p>PDF, PNG, JPG, MP4 até 50MB · até 10 arquivos por upload</p>
          <button type="button" className="vds-fp-drop-cta">Selecionar do computador</button>
        </div>

        <ul className="vds-fp-drop-list">
          {files.map((f) => (
            <li key={f.name} className="vds-fp-drop-item">
              <div className="vds-fp-drop-item-icon">
                {f.type === 'image' ? <ImageIcon size={14} strokeWidth={1.8} /> : <FileText size={14} strokeWidth={1.8} />}
              </div>
              <div className="vds-fp-drop-item-body">
                <strong>{f.name}</strong>
                <em className="mono">{f.size}</em>
                {f.progress < 100 && (
                  <div className="vds-fp-drop-progress">
                    <span style={{ width: `${f.progress}%` }} />
                  </div>
                )}
              </div>
              {f.progress === 100 ? (
                <span className="vds-fp-drop-done"><Check size={12} strokeWidth={3} /></span>
              ) : (
                <span className="vds-fp-drop-pct mono">{f.progress}%</span>
              )}
              <button type="button" className="vds-fp-drop-cancel" aria-label={`Cancelar ${f.name}`}>
                <X size={11} strokeWidth={2.4} />
              </button>
            </li>
          ))}
        </ul>
      </article>
    </Section>
  );
}

/* ============================================
   3 · Phone input internacional
   ============================================ */
function PhoneInputSection() {
  const [country, setCountry] = useState('BR');
  const [open, setOpen] = useState(false);

  const countries = [
    { code: 'BR', flag: '🇧🇷', dial: '+55', name: 'Brasil' },
    { code: 'US', flag: '🇺🇸', dial: '+1', name: 'Estados Unidos' },
    { code: 'PT', flag: '🇵🇹', dial: '+351', name: 'Portugal' },
    { code: 'AR', flag: '🇦🇷', dial: '+54', name: 'Argentina' },
    { code: 'MX', flag: '🇲🇽', dial: '+52', name: 'México' },
    { code: 'CL', flag: '🇨🇱', dial: '+56', name: 'Chile' },
    { code: 'CO', flag: '🇨🇴', dial: '+57', name: 'Colômbia' },
  ];

  const current = countries.find((c) => c.code === country) || countries[0];

  return (
    <Section title="Phone input internacional · seletor de país + máscara BR" meta="dropdown bandeira+DDI · input com máscara · formato +55 11 99999-9999">
      <article className="vds-fp-phone">
        <label className="vds-fp-label">WhatsApp pra confirmação</label>
        <div className="vds-fp-phone-field">
          <button
            type="button"
            className="vds-fp-phone-country"
            onClick={() => setOpen((o) => !o)}
            aria-label="Trocar país"
          >
            <span className="vds-fp-phone-flag">{current.flag}</span>
            <span className="vds-fp-phone-dial mono">{current.dial}</span>
            <ChevronDown size={11} strokeWidth={2.2} className={open ? 'is-open' : ''} />
          </button>
          <input
            type="tel"
            placeholder={current.code === 'BR' ? '(11) 99999-9999' : 'número'}
            defaultValue={current.code === 'BR' ? '(11) 99876-5432' : ''}
            inputMode="tel"
          />
        </div>

        {open && (
          <ul className="vds-fp-phone-pop">
            {countries.map((c) => (
              <li key={c.code} className={c.code === country ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setCountry(c.code);
                    setOpen(false);
                  }}
                >
                  <span className="vds-fp-phone-flag">{c.flag}</span>
                  <span className="vds-fp-phone-name">{c.name}</span>
                  <span className="vds-fp-phone-dial mono">{c.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="vds-fp-hint">Vamos te avisar 30min antes de cada mentoria.</p>
      </article>
    </Section>
  );
}

/* ============================================
   4 · Image cropper / Avatar editor
   ============================================ */
function ImageCropperSection() {
  const [zoom, setZoom] = useState(1.4);
  const [rotation, setRotation] = useState(0);

  return (
    <Section title="Image cropper · editor de avatar editorial" meta="zoom · rotate · circle/square mask · preview live">
      <article className="vds-fp-crop">
        <div className="vds-fp-crop-stage">
          <div
            className="vds-fp-crop-image"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
            }}
          >
            <div className="vds-fp-crop-mock" />
          </div>
          <div className="vds-fp-crop-mask" />
          <div className="vds-fp-crop-grid">
            <span /><span /><span /><span />
          </div>
        </div>

        <div className="vds-fp-crop-controls">
          <div className="vds-fp-crop-row">
            <label className="vds-fp-crop-row-lbl">
              <ZoomIn size={11} strokeWidth={2.2} />
              Zoom
              <span className="mono">{zoom.toFixed(2)}x</span>
            </label>
            <div className="vds-fp-crop-slider">
              <button type="button" aria-label="Diminuir zoom" onClick={() => setZoom((z) => Math.max(1, z - 0.1))}>
                <ZoomOut size={11} strokeWidth={2.4} />
              </button>
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                aria-label="Nível de zoom"
              />
              <button type="button" aria-label="Aumentar zoom" onClick={() => setZoom((z) => Math.min(3, z + 0.1))}>
                <ZoomIn size={11} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <div className="vds-fp-crop-row">
            <label className="vds-fp-crop-row-lbl">
              <RotateCw size={11} strokeWidth={2.2} />
              Rotação
              <span className="mono">{rotation}°</span>
            </label>
            <div className="vds-fp-crop-rotation">
              {[0, 90, 180, 270].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={r === rotation ? 'on' : ''}
                  onClick={() => setRotation(r)}
                >
                  {r}°
                </button>
              ))}
            </div>
          </div>

          <div className="vds-fp-crop-actions">
            <button type="button" className="vds-fp-crop-btn">Cancelar</button>
            <button type="button" className="vds-fp-crop-btn primary">Salvar foto</button>
          </div>
        </div>
      </article>
    </Section>
  );
}

/* ============================================
   5 · Markdown editor
   ============================================ */
function MarkdownEditorSection() {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const ref = useRef<HTMLTextAreaElement>(null);

  const sample = `## Como configurei o agente

Comecei pelo **few-shot tuning** — escolhi 14 exemplos curados que mostram cada padrão de output.

A diferença foi enorme:
- precisão subiu de 62% pra 91%
- latência ficou igual
- custo aumentou apenas 8%

> "Funciona quando os exemplos cobrem os edge cases reais."
> — Caio Ribeiro, em mentoria

Próximo passo · validar com [dados de produção](https://nina.viverdeia.ai/audit).`;

  return (
    <Section title="Markdown editor · com toolbar + preview" meta="toolbar editorial · split view · syntax highlighting básico">
      <article className="vds-fp-md">
        <header className="vds-fp-md-toolbar">
          <div className="vds-fp-md-tools">
            <button type="button" aria-label="Negrito" title="Negrito (⌘B)">
              <Bold size={12} strokeWidth={2.2} />
            </button>
            <button type="button" aria-label="Itálico" title="Itálico (⌘I)">
              <Italic size={12} strokeWidth={2.2} />
            </button>
            <span className="vds-fp-md-sep" />
            <button type="button" aria-label="Heading" title="Título">
              <Heading size={12} strokeWidth={2.2} />
            </button>
            <button type="button" aria-label="Lista" title="Lista">
              <List size={12} strokeWidth={2.2} />
            </button>
            <button type="button" aria-label="Link" title="Link (⌘K)">
              <Link2 size={12} strokeWidth={2.2} />
            </button>
            <button type="button" aria-label="Código" title="Código">
              <CodeIcon size={12} strokeWidth={2.2} />
            </button>
          </div>
          <div className="vds-fp-md-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === 'write'}
              className={tab === 'write' ? 'on' : ''}
              onClick={() => setTab('write')}
            >
              Escrever
            </button>
            <button
              role="tab"
              aria-selected={tab === 'preview'}
              className={tab === 'preview' ? 'on' : ''}
              onClick={() => setTab('preview')}
            >
              Preview
            </button>
          </div>
        </header>

        {tab === 'write' ? (
          <textarea
            ref={ref}
            className="vds-fp-md-textarea"
            defaultValue={sample}
            aria-label="Editor markdown"
            spellCheck={false}
          />
        ) : (
          <div className="vds-fp-md-preview">
            <h3>Como configurei o agente</h3>
            <p>
              Comecei pelo <strong>few-shot tuning</strong> — escolhi 14 exemplos curados que mostram cada padrão de output.
            </p>
            <p>A diferença foi enorme:</p>
            <ul>
              <li>precisão subiu de 62% pra 91%</li>
              <li>latência ficou igual</li>
              <li>custo aumentou apenas 8%</li>
            </ul>
            <blockquote>
              "Funciona quando os exemplos cobrem os edge cases reais."<br />
              <em>— Caio Ribeiro, em mentoria</em>
            </blockquote>
            <p>
              Próximo passo · validar com <a href="#">dados de produção</a>.
            </p>
          </div>
        )}

        <footer className="vds-fp-md-foot">
          <span className="mono">Markdown · 248 chars · ⌘+Enter pra enviar</span>
          <button type="button" className="vds-fp-md-send">Publicar nota</button>
        </footer>
      </article>
    </Section>
  );
}
