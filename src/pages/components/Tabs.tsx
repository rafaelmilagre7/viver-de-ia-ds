import { useState } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './tabs.css';

export default function Tabs() {
  const [seg, setSeg] = useState('todos');
  const [tab, setTab] = useState('cases');

  return (
    <>
      <DocsHeader
        eyebrow="Componentes · tabs"
        title={<>Segmentadas para <em>filtrar</em>. Sublinhadas para <em>navegar</em>.</>}
        lede="Duas variantes só. A segmentada (pílulas dentro de uma pílula) serve para filtros mutuamente exclusivos. A sublinhada serve para navegação entre seções de uma página. Não invente uma terceira."
      />

      <Section title="Segmentadas" meta="filter use">
        <div className="via-seg">
          {[
            { v: 'todos', l: 'Todos' },
            { v: 'ecom', l: 'E-commerce' },
            { v: 'turismo', l: 'Turismo' },
            { v: 'agencia', l: 'Agência' },
          ].map((s) => (
            <button
              key={s.v}
              className={`via-seg-item ${seg === s.v ? 'active' : ''}`}
              onClick={() => setSeg(s.v)}
            >{s.l}</button>
          ))}
        </div>
      </Section>

      <Section title="Sublinhadas" meta="section nav">
        <div className="via-ultabs">
          {[
            { v: 'cases', l: 'Cases', count: 206 },
            { v: 'mentoria', l: 'Mentoria' },
            { v: 'manifesto', l: 'Manifesto' },
            { v: 'imprensa', l: 'Imprensa', count: 12 },
          ].map((t) => (
            <button
              key={t.v}
              className={`via-ultab ${tab === t.v ? 'active' : ''}`}
              onClick={() => setTab(t.v)}
            >
              {t.l}{t.count && <span className="count">{t.count}</span>}
            </button>
          ))}
        </div>
      </Section>
    </>
  );
}
