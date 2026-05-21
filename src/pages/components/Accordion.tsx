import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './accordion.css';

const faqs = [
  {
    q: 'Quanto tempo dura a mentoria?',
    a: '16 semanas, formato remoto. Sessões ao vivo semanais com Caio + acompanhamento individual de implementação. Você sai com pelo menos um Superagente em produção, medido em receita ou economia.',
  },
  {
    q: 'Preciso saber programar?',
    a: 'Não. A turma é mista — operadores que codam pouco, gestores que não codam, e engenheiros que precisam acelerar. A mentoria foca em arquitetar a solução; a implementação é guiada com ferramentas no-code (Base44, Lovable) e low-code.',
  },
  {
    q: 'Quais ferramentas vamos usar?',
    a: 'Stack moderna de operador: Base44, Lovable, Superagente, Claude, OpenAI, n8n. Não amarramos a nenhum vendor.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'À vista com desconto, ou parcelado em até 12x. PIX, boleto, cartão. Aceitamos PJ.',
  },
];

export default function Accordion() {
  const [open, setOpen] = useState<number>(0);
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · acordeão"
        title={<>Perguntas em <em>Geist 20</em>. Respostas calmas.</>}
        lede="Acordeão é o pattern de FAQ — pergunta em serif, chevron rotaciona ao abrir, conteúdo respira. Use para perguntas que se repetem, não para esconder conteúdo importante."
      />

      <Section title="FAQ" meta="serif title · chevron rotate">
        <div className="via-accordion">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`item ${isOpen ? 'open' : ''}`}>
                <button className="head" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="q">{f.q}</span>
                  <ChevronDown size={16} strokeWidth={2.5} className={`chev ${isOpen ? 'rot' : ''}`} />
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
