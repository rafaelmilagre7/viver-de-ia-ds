import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './buttons.css';

export default function Buttons() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · botões"
        title={
          <>
            Sempre <em>pílula</em>. Nunca <em>caixa alta</em>.
          </>
        }
        lede="Três variantes — primary, secondary, ghost. Quatro estados — default, hover, pressed, disabled. Três tamanhos — sm, md, lg. O radius é sempre pill (999), o peso é medium e o rótulo vai em sentence case com tracking negativo. É a regra que faz o sistema reconhecível."
      />

      <Section title="Primary" meta="default · navy">
        <div className="vds-buttons-row">
          <button className="via-btn primary md">Entrar na turma <ArrowRight size={14} strokeWidth={2.5} /></button>
          <button className="via-btn primary md is-hover">Hover</button>
          <button className="via-btn primary md is-pressed">Pressed</button>
          <button className="via-btn primary md" disabled>Disabled</button>
        </div>
      </Section>

      <Section title="Secondary" meta="default · vidro com border">
        <div className="vds-buttons-row">
          <button className="via-btn secondary md">Ver agenda</button>
          <button className="via-btn secondary md is-hover">Hover</button>
          <button className="via-btn secondary md is-pressed">Pressed</button>
        </div>
      </Section>

      <Section title="Ghost" meta="default · só texto">
        <div className="vds-buttons-row">
          <button className="via-btn ghost md">Voltar</button>
          <button className="via-btn ghost md is-hover">Hover</button>
          <button className="via-btn ghost md">Ver cases <ArrowUpRight size={14} strokeWidth={2.5} /></button>
        </div>
      </Section>

      <Section title="Tamanhos" meta="sm · md · lg">
        <div className="vds-buttons-row">
          <button className="via-btn primary sm">Small</button>
          <button className="via-btn primary md">Medium</button>
          <button className="via-btn primary lg">Large</button>
        </div>
      </Section>

      <Section title="Tokens" meta="anatomia">
        <table className="vds-token-table">
          <thead>
            <tr><th>Token</th><th>Valor</th><th>Onde</th></tr>
          </thead>
          <tbody>
            <tr><td className="tok">radius</td><td className="val">pill (999)</td><td className="use">Sempre · todas as variantes</td></tr>
            <tr><td className="tok">padding (sm)</td><td className="val">9px 16px</td><td className="use">Compacto, em barra de filtro/pill</td></tr>
            <tr><td className="tok">padding (md)</td><td className="val">12px 22px</td><td className="use">Padrão</td></tr>
            <tr><td className="tok">padding (lg)</td><td className="val">15px 28px</td><td className="use">Hero CTA</td></tr>
            <tr><td className="tok">font</td><td className="val">Geist 13 · 500</td><td className="use">Sentence case, -0.005em</td></tr>
            <tr><td className="tok">primary lift</td><td className="val">0 8px 18px -6px ink/18</td><td className="use">Sombra de tinta · vira preto no escuro</td></tr>
            <tr><td className="tok">transition</td><td className="val">200ms via-ease</td><td className="use">Hover / pressed</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Código" meta="HTML + CSS">
        <CodeBlock>{`<button className="via-btn primary md">
  Entrar na turma
  <ArrowRight size={14} strokeWidth={2.5} />
</button>`}</CodeBlock>
      </Section>
    </>
  );
}
