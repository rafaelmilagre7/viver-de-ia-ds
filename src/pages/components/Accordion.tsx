import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './accordion.css';

const faqs = [
  {
    q: 'Como funciona a mentoria?',
    a: 'No plano Pro, são 10 check-ins por mês de mentoria em grupo, ao vivo. No Enterprise, entra também 1 hora por mês de mentoria individual e o arquiteto de soluções AI Builder.',
  },
  {
    q: 'Preciso saber programar?',
    a: 'Não. As soluções são plug and play, sem programação. A trilha personalizada com IA adapta o conteúdo ao nível de cada pessoa do time, do CEO ao analista. Alfabetizamos antes de automatizar.',
  },
  {
    q: 'Quais ferramentas vamos usar?',
    a: 'Stack moderna de operador: Base44, Lovable, Superagente, Claude, OpenAI, n8n. Não amarramos a nenhum vendor.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'Valor mensal em reais, em contratação anual: Starter R$ 2.580, Pro R$ 3.780 e Enterprise R$ 6.180 por mês.',
  },
];

export default function Accordion() {
  const [open, setOpen] = useState<number>(0);
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · acordeão"
        title={<>Perguntas em <em>Geist 18</em>. Respostas calmas.</>}
        lede="Acordeão é o pattern de FAQ — pergunta em Geist semibold, chevron rotaciona ao abrir, conteúdo respira. Use para perguntas que se repetem, não para esconder conteúdo importante."
      />

      <Section title="FAQ" meta="geist 18 semibold · chevron rotate">
        <div className="via-accordion">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`item ${isOpen ? 'open' : ''}`}>
                <button className="head" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="q">{f.q}</span>
                  <ChevronDown size={16} strokeWidth={1.75} className={`chev ${isOpen ? 'rot' : ''}`} />
                </button>
                {isOpen && <div className="body">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
