import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './dropdown.css';

const opts = [
  { v: 'recent', l: 'Mais recentes' },
  { v: 'a-z', l: 'A → Z' },
  { v: 'cases', l: '+ cases publicados' },
  { v: 'metric', l: 'Maior métrica' },
];

export default function Dropdown() {
  const [open, setOpen] = useState(true);
  const [val, setVal] = useState('cases');
  const sel = opts.find((o) => o.v === val)!;

  return (
    <>
      <DocsHeader
        eyebrow="Componentes · dropdown"
        title={<>Lista <em>de vidro</em>, item ativo com check.</>}
        lede="Dropdown abre com glass leve sobre o card. O item selecionado tem um check navy à direita. Hover preenche com navy@06. Use para seleção única — sort, filtro, idioma. Multi-seleção é outro componente (tag cluster)."
      />

      <Section title="Sort" meta="seleção única · glass menu">
        <div className="via-dd-stage">
          <button className="via-dd-trigger" onClick={() => setOpen(!open)}>
            <span className="lbl">Ordenar</span>
            <span className="val">{sel.l}</span>
            <ChevronDown size={14} strokeWidth={2.2} className={`chev ${open ? 'rot' : ''}`} />
          </button>
          {open && (
            <ul className="via-dd-menu">
              {opts.map((o) => (
                <li
                  key={o.v}
                  className={val === o.v ? 'active' : ''}
                  onClick={() => { setVal(o.v); setOpen(false); }}
                >
                  {o.l}
                  {val === o.v && <Check size={14} strokeWidth={2.5} />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </>
  );
}
