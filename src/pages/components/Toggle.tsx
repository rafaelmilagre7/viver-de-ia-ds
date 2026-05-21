import { useState } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './toggle.css';

function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <label className="via-switch-row">
      <button className={`via-switch ${on ? 'on' : ''}`} onClick={onClick} aria-pressed={on}>
        <span className="dot" />
      </button>
      <span>{label}</span>
    </label>
  );
}

export default function Toggle() {
  const [n, setN] = useState(true);
  const [m, setM] = useState(false);
  const [w, setW] = useState(true);

  return (
    <>
      <DocsHeader
        eyebrow="Componentes · toggle"
        title={<>Pílula <em>seca</em>, dot que desliza.</>}
        lede="Toggle é sempre on/off explícito. O fundo vira navy quando ativo, o dot desliza 22px. Sem ícone dentro do toggle — o significado está no label ao lado."
      />

      <Section title="Estados" meta="on · off · disabled">
        <div className="via-switch-stack">
          <Switch on={n} onClick={() => setN(!n)} label="Notificações por e-mail" />
          <Switch on={m} onClick={() => setM(!m)} label="Modo escuro" />
          <Switch on={w} onClick={() => setW(!w)} label="Resumo semanal" />
          <label className="via-switch-row dis">
            <button className="via-switch on" disabled><span className="dot" /></button>
            <span>Conta verificada <em>(travado)</em></span>
          </label>
        </div>
      </Section>
    </>
  );
}
