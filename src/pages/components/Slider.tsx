import { useState } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './slider.css';

export default function Slider() {
  const [budget, setBudget] = useState(4800);

  return (
    <>
      <DocsHeader
        eyebrow="Componentes · slider"
        title={<>Trilha <em>fina</em>, alça com sombra navy.</>}
        lede="Slider para faixa numérica contínua — orçamento, prioridade, intensidade. Trilha 4px navy@10 → navy preenchida do início ao thumb. Alça 20px com hairline e sombra navy 18%."
      />

      <Section title="Padrão" meta="track 4px · thumb 20">
        <div className="via-slider-card">
          <div className="hdr">
            <span className="lbl">Orçamento mensal</span>
            <span className="val">R$ {budget.toLocaleString('pt-BR')}</span>
          </div>
          <input
            type="range"
            aria-label="Orçamento mensal"
            min={1000}
            max={20000}
            step={100}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="via-slider"
            style={{ '--p': `${((budget - 1000) / 19000) * 100}%` } as React.CSSProperties}
          />
          <div className="ends">
            <span>R$ 1.000</span>
            <span>R$ 20.000</span>
          </div>
        </div>
      </Section>
    </>
  );
}
