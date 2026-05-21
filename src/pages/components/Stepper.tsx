import { Check } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './stepper.css';

const steps = [
  { l: 'Dados da empresa', state: 'done' },
  { l: 'Cenário atual', state: 'done' },
  { l: 'Objetivos', state: 'current' },
  { l: 'Pagamento', state: 'todo' },
];

export default function Stepper() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · stepper"
        title={<>Passos com <em>check</em>, conectados.</>}
        lede="Stepper guia fluxos longos — onboarding, checkout, formulário multi-step. Passos concluídos têm check navy. O atual fica em hairline navy. Os pendentes em cinza. Linha conectora navy se o passo anterior foi feito."
      />

      <Section title="Horizontal" meta="onboarding 4 passos">
        <div className="via-stepper">
          {steps.map((s, i) => (
            <div key={s.l} className={`step ${s.state}`}>
              <div className="cell">
                <span className="circle">
                  {s.state === 'done' ? <Check size={12} strokeWidth={3} /> : i + 1}
                </span>
                {i < steps.length - 1 && <span className="line" />}
              </div>
              <span className="label">{s.l}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
