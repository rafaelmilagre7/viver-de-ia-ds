import { Fragment, type ReactNode } from 'react';
import DocsHeader from './DocsHeader';
import Section from './Section';
import CodeBlock from './CodeBlock';
import './component-doc.css';

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: ReactNode;
  required?: boolean;
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
  /** Props canônicas */
  props: ComponentProp[];
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

/**
 * Template canônico de documentação por componente
 * Estilo Radix/Shadcn: anatomy + props table + examples + a11y + related
 */
export default function ComponentDoc({
  eyebrow,
  name,
  headline,
  description,
  importLine,
  anatomy,
  props,
  variants,
  sizes,
  examples,
  dosDonts,
  a11y,
  related,
}: ComponentDocProps) {
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

      <Section title="Props · API completa" meta={`${props.length} props`}>
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
              {props.map((p) => (
                <tr key={p.name}>
                  <td className="mono">
                    {p.name}
                    {p.required && <span className="vds-cdoc-req"> *</span>}
                  </td>
                  <td className="mono vds-cdoc-type">{p.type}</td>
                  <td className="mono vds-cdoc-default">{p.default || '—'}</td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="vds-cdoc-hint">
          <strong className="mono">*</strong> · prop obrigatória
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
