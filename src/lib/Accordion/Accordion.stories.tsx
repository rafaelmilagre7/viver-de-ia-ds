import { Accordion } from './Accordion';

export default {
  title: 'Accordion',
};

const faqItems = [
  {
    id: 'q1',
    title: 'Como funciona a mentoria?',
    content: (
      <p>
        Você marca sessões individuais com o mentor primário, recebe trans­crição automática
        depois e tem 1 follow-up assíncrono por semana via Discord.
      </p>
    ),
  },
  {
    id: 'q2',
    title: 'Posso cancelar quando quiser?',
    content: (
      <p>Sim — cancelamento livre, faturamento pro-rata. Sem fidelidade, sem multa.</p>
    ),
  },
  {
    id: 'q3',
    title: 'A turma é fechada ou aberta?',
    content: (
      <p>Turmas trimestrais fechadas · novas matrículas a cada 90 dias.</p>
    ),
  },
];

export const Default = () => <Accordion items={faqItems} defaultOpen="q1" />;

export const Multiple = () => (
  <Accordion items={faqItems} multiple defaultOpen={['q1', 'q3']} />
);

export const Separated = () => (
  <Accordion items={faqItems} variant="separated" defaultOpen="q2" />
);
