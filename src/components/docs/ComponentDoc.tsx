import { Fragment, useCallback, useId, useState, type ReactNode } from 'react';
import DocsHeader from './DocsHeader';
import Section from './Section';
import CodeBlock from './CodeBlock';
import './component-doc.css';

/** Uma prop como sai de `scripts/gen-props.mjs` (src/pages/api/props.generated.json). */
export interface GeneratedProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
  control?: { kind: string; options?: string[] };
}

/** Metadados de um componente, gerados do próprio código — nunca escritos à mão. */
export interface ComponentMeta {
  component: string;
  propsType: string;
  source: string;
  extends: string[];
  props: GeneratedProp[];
  inherited: Record<string, string>;
}

export type PlaygroundValues = Record<string, unknown>;

export interface PlaygroundConfig {
  /** Valores iniciais (props controladas + dados fixos como `items`, `options`). */
  initial: PlaygroundValues;
  /** Desenha o componente com os valores atuais; `set` atualiza (ex.: onChange, onClose). */
  render: (values: PlaygroundValues, set: (patch: PlaygroundValues) => void) => ReactNode;
  /** Props que não ganham controle (além de className, id, name, ariaLabel e default*). */
  exclude?: string[];
  /** Atributos fixos que entram no snippet (ex.: `onChange={setValue}`). */
  codeProps?: string[];
  /** Filhos do snippet quando `children` não é texto editável. */
  codeChildren?: string;
}

export interface ComponentVariant {
  name: string;
  label: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description?: ReactNode;
  preview: ReactNode;
  code: string;
}

export interface ComponentDocProps {
  /** Eyebrow (ex: "componentes · button") */
  eyebrow: string;
  /** Nome (ex: "Button") */
  name: string;
  /** Headline editorial (ex: "CTA · sentence-case · pill 999") */
  headline: ReactNode;
  /** Descrição expandida */
  description: ReactNode;
  /** Import statement */
  importLine: string;
  /** Anatomy / partes */
  anatomy?: Array<{ part: string; description: ReactNode }>;
  /** Props geradas do código (`import { Pill as meta } from './props.generated.json'`) */
  meta: ComponentMeta;
  /**
   * Descrições em PT-BR por nome de prop. Têm prioridade sobre o JSDoc.
   * Prop herdada do HTML (children, disabled…) só aparece na tabela se descrita aqui.
   * `'...rest'` descreve o repasse dos atributos nativos (só vale se o componente estende algo).
   */
  descriptions?: Record<string, ReactNode>;
  /** Playground ao vivo · controles saem das props geradas */
  playground?: PlaygroundConfig;
  /** Variants */
  variants?: ComponentVariant[];
  /** Sizes disponíveis */
  sizes?: ComponentVariant[];
  /** Exemplos de uso */
  examples: ComponentExample[];
  /** Do / don't visual */
  dosDonts?: { do: { title: string; description: string }; dont: { title: string; description: string } }[];
  /** Notas de acessibilidade */
  a11y?: ReactNode[];
  /** Componentes relacionados */
  related?: { name: string; description: string; href: string }[];
}

interface Row {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  inherited?: boolean;
  description?: ReactNode;
}

function buildRows(meta: ComponentMeta, descriptions: Record<string, ReactNode> = {}): Row[] {
  const own = new Set(meta.props.map((p) => p.name));
  const rows: Row[] = meta.props.map((p) => ({ ...p, description: descriptions[p.name] ?? p.description }));
  for (const [name, description] of Object.entries(descriptions)) {
    if (!own.has(name) && name in meta.inherited) {
      rows.push({ name, type: meta.inherited[name], inherited: true, description });
    }
  }
  if (descriptions['...rest'] && meta.extends.length) {
    rows.push({ name: '...rest', type: meta.extends.join(' & '), inherited: true, description: descriptions['...rest'] });
  }
  return rows;
}

/* ---------------- Playground ---------------- */

type ControlKind = 'boolean' | 'enum' | 'string' | 'number';
interface Control {
  name: string;
  kind: ControlKind;
  options?: string[];
  optional: boolean;
  /** default lido do código, quando é literal (`'md'`, `true`, `200`) */
  def?: unknown;
}

const SKIP_CONTROLS = new Set(['className', 'id', 'name', 'ariaLabel', 'style']);

/** Controle pra prop sem `control` gerado, a partir do texto do tipo + valor inicial. */
function kindFromType(type: string, value: unknown): ControlKind | undefined {
  if (type === 'boolean') return 'boolean';
  if (type === 'number') return 'number';
  if ((type === 'string' || type === 'ReactNode') && typeof value === 'string') return 'string';
  return undefined;
}

function buildControls(meta: ComponentMeta, config: PlaygroundConfig): Control[] {
  const skip = (n: string) => SKIP_CONTROLS.has(n) || /^default[A-Z]/.test(n) || config.exclude?.includes(n);
  const out: Control[] = [];
  for (const p of meta.props) {
    if (skip(p.name)) continue;
    const kind = (p.control?.kind as ControlKind | undefined) ?? kindFromType(p.type, config.initial[p.name]);
    if (kind) out.push({ name: p.name, kind, options: p.control?.options, optional: !p.required, def: parseDefault(p.default) });
  }
  for (const [name, value] of Object.entries(config.initial)) {
    if (skip(name) || !(name in meta.inherited)) continue;
    const kind = kindFromType(meta.inherited[name], value);
    if (kind) out.push({ name, kind, optional: true });
  }
  return out;
}

/** `'md'` → 'md' · `true` → true · `200` → 200 · expressão → undefined */
function parseDefault(text?: string): unknown {
  if (!text) return undefined;
  if (text === 'true' || text === 'false') return text === 'true';
  if (/^-?\d+(\.\d+)?$/.test(text)) return Number(text);
  const str = text.match(/^'(.*)'$/);
  return str ? str[1] : undefined;
}

function formatAttr(name: string, value: unknown): string {
  if (value === true) return name;
  if (typeof value === 'string') return value.includes('"') ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`;
  return `${name}={${String(value)}}`;
}

function buildSnippet(meta: ComponentMeta, controls: Control[], values: PlaygroundValues, config: PlaygroundConfig) {
  const tag = meta.component;
  const attrs: string[] = [];
  let children = config.codeChildren;
  for (const c of controls) {
    const value = values[c.name];
    if (c.name === 'children') {
      if (typeof value === 'string' && value) children = value;
      continue;
    }
    if (value === undefined || value === '' || value === c.def) continue;
    if (value === false && c.def === undefined && c.optional) continue;
    attrs.push(formatAttr(c.name, value));
  }
  attrs.push(...(config.codeProps ?? []));
  const inline = `<${tag}${attrs.map((a) => ` ${a}`).join('')}`;
  const multiline = inline.length > 72;
  const open = multiline ? `<${tag}\n${attrs.map((a) => `  ${a}`).join('\n')}\n` : inline;
  if (!children) return `${open}${multiline ? '/>' : ' />'}`;
  return multiline ? `${open}>\n  ${children}\n</${tag}>` : `${open}>${children}</${tag}>`;
}

function ControlField({ control, value, onChange }: { control: Control; value: unknown; onChange: (v: unknown) => void }) {
  const id = useId();
  const label = <span className="vds-cdoc-ctl-name">{control.name}</span>;

  if (control.kind === 'boolean') {
    return (
      <label className="vds-cdoc-ctl vds-cdoc-ctl--bool" htmlFor={id}>
        <input id={id} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    );
  }

  return (
    <div className="vds-cdoc-ctl">
      <label htmlFor={id}>{label}</label>
      {control.kind === 'enum' ? (
        <select id={id} value={typeof value === 'string' ? value : ''} onChange={(e) => onChange(e.target.value || undefined)}>
          {control.optional && control.def === undefined && <option value="">—</option>}
          {control.options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={control.kind === 'number' ? 'number' : 'text'}
          inputMode={control.kind === 'number' ? 'decimal' : undefined}
          value={value === undefined ? '' : String(value)}
          onChange={(e) => {
            const raw = e.target.value;
            if (control.kind !== 'number') return onChange(raw);
            const n = Number(raw);
            onChange(raw === '' || Number.isNaN(n) ? undefined : n);
          }}
        />
      )}
    </div>
  );
}

function Playground({ meta, config }: { meta: ComponentMeta; config: PlaygroundConfig }) {
  const controls = buildControls(meta, config);
  // controle começa no default do código (select mostra 'md', não vazio)
  const start = (): PlaygroundValues => ({
    ...Object.fromEntries(controls.filter((c) => c.def !== undefined).map((c) => [c.name, c.def])),
    ...config.initial,
  });
  const [values, setValues] = useState<PlaygroundValues>(start);
  const set = useCallback((patch: PlaygroundValues) => setValues((v) => ({ ...v, ...patch })), []);
  const code = buildSnippet(meta, controls, values, config);

  return (
    <div className="vds-cdoc-play">
      <div className="vds-cdoc-play-stage">{config.render(values, set)}</div>
      <fieldset className="vds-cdoc-play-controls">
        <legend className="vds-cdoc-play-legend">Controles</legend>
        {controls.map((c) => (
          <ControlField key={c.name} control={c} value={values[c.name]} onChange={(v) => set({ [c.name]: v })} />
        ))}
        <button type="button" className="via-pill-link vds-cdoc-play-reset" onClick={() => setValues(start())}>
          Restaurar
        </button>
      </fieldset>
      <div className="vds-cdoc-play-code">
        <CodeBlock>{code}</CodeBlock>
      </div>
    </div>
  );
}

/**
 * Template canônico de documentação por componente
 * Estilo Radix/Shadcn: anatomy + props table (gerada do código) + playground + examples + a11y + related
 */
export default function ComponentDoc({
  eyebrow,
  name,
  headline,
  description,
  importLine,
  anatomy,
  meta,
  descriptions,
  playground,
  variants,
  sizes,
  examples,
  dosDonts,
  a11y,
  related,
}: ComponentDocProps) {
  const rows = buildRows(meta, descriptions);

  return (
    <>
      <DocsHeader
        eyebrow={eyebrow}
        title={<>{name} · <em>{headline}</em></>}
        lede={description}
      />

      <Section title="Importar" meta="ESM · types · CSS auto-included">
        <CodeBlock>{importLine}</CodeBlock>
      </Section>

      {playground && (
        <Section title="Playground" meta="ao vivo · controles gerados das props">
          <Playground meta={meta} config={playground} />
        </Section>
      )}

      {anatomy && anatomy.length > 0 && (
        <Section title="Anatomia" meta={`${anatomy.length} parte${anatomy.length > 1 ? 's' : ''}`}>
          <div className="vds-cdoc-anatomy">
            {anatomy.map((a, i) => (
              <article key={i} className="vds-cdoc-anatomy-row">
                <span className="vds-cdoc-anatomy-num mono">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <strong className="mono">{a.part}</strong>
                  <p>{a.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      <Section title="Props · API completa" meta={`${rows.length} props · gerada do código`}>
        <div className="vds-cdoc-props-wrap">
          <table className="vds-cdoc-props">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Tipo</th>
                <th>Default</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.name}>
                  <td className="mono">
                    {p.name}
                    {p.required && <span className="vds-cdoc-req"> *</span>}
                    {p.inherited && <span className="vds-cdoc-inh">nativa</span>}
                  </td>
                  <td className="mono vds-cdoc-type">{p.type}</td>
                  <td className="mono vds-cdoc-default">{p.default || '—'}</td>
                  <td>{p.description ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="vds-cdoc-hint">
          <strong className="mono">*</strong> · prop obrigatória · tipos e defaults lidos de{' '}
          <span className="mono">{meta.source}</span>
        </p>
      </Section>

      {variants && variants.length > 0 && (
        <Section title="Variants" meta={`${variants.length} valor${variants.length > 1 ? 'es' : ''} permitido${variants.length > 1 ? 's' : ''}`}>
          <div className="vds-cdoc-variants">
            {variants.map((v) => (
              <article key={v.name} className="vds-cdoc-variant-card">
                <strong className="mono">{v.name}</strong>
                <p className="vds-cdoc-variant-label">{v.label}</p>
                <p>{v.description}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {sizes && sizes.length > 0 && (
        <Section title="Sizes" meta="proporção respeita contexto">
          <div className="vds-cdoc-variants">
            {sizes.map((s) => (
              <article key={s.name} className="vds-cdoc-variant-card">
                <strong className="mono">{s.name}</strong>
                <p className="vds-cdoc-variant-label">{s.label}</p>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {examples.map((ex, i) => (
        <Section key={i} title={`Exemplo · ${ex.title}`} meta="preview + code">
          {ex.description && <p className="vds-cdoc-ex-desc">{ex.description}</p>}
          <div className="vds-cdoc-preview">{ex.preview}</div>
          <CodeBlock>{ex.code}</CodeBlock>
        </Section>
      ))}

      {dosDonts && dosDonts.length > 0 && (
        <Section title="Do's & Don'ts" meta="regras editoriais consolidadas">
          <div className="vds-cdoc-dos">
            {dosDonts.map((p, i) => (
              <Fragment key={i}>
                <article className="vds-cdoc-do">
                  <span className="vds-cdoc-do-lbl">Faça</span>
                  <strong>{p.do.title}</strong>
                  <p>{p.do.description}</p>
                </article>
                <article className="vds-cdoc-dont">
                  <span className="vds-cdoc-dont-lbl">Não faça</span>
                  <strong>{p.dont.title}</strong>
                  <p>{p.dont.description}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </Section>
      )}

      {a11y && a11y.length > 0 && (
        <Section title="Acessibilidade" meta="WCAG 2.1 AA · ARIA · keyboard">
          <ul className="vds-cdoc-a11y">
            {a11y.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {related && related.length > 0 && (
        <Section title="Relacionados" meta="componentes que combinam">
          <div className="vds-cdoc-related">
            {related.map((r) => (
              <a key={r.href} href={r.href} className="vds-cdoc-related-card">
                <strong className="mono">{r.name}</strong>
                <p>{r.description}</p>
              </a>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
