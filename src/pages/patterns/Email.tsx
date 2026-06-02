import { useRef } from 'react';
import { ArrowUpRight, Code2, ShieldCheck, Inbox } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './email.css';

type MailDef = { id: string; name: string; subject: string; when: string };

const MAILS: MailDef[] = [
  { id: 'welcome', name: 'Boas-vindas', subject: 'tua vaga tá confirmada · bora começar?', when: 'Quando o aluno confirma a matrícula numa turma.' },
  { id: 'enrollment', name: 'Confirmação de turma', subject: 'confirmado · sua turma começa 12 de junho', when: 'Recibo de matrícula com os detalhes concretos.' },
  { id: 'billing', name: 'Cobrança / fatura', subject: 'sua fatura da Viver de IA · junho', when: 'Aviso de fatura — vira coral quando em atraso.' },
  { id: 'nps', name: 'NPS / feedback', subject: 'como tá indo? 1 pergunta, 30 segundos', when: 'Pulso de satisfação — uma pergunta só.' },
  { id: 'digest', name: 'Digest semanal', subject: 'sua semana na Viver de IA · 2–8 jun', when: 'Resumo recorrente da turma e da comunidade.' },
  { id: 'event-invite', name: 'Convite de evento', subject: 'sex 14h · auditoria de 3 agentes ao vivo', when: 'Convite pra live / Leaders AI — factual, valor concreto.' },
  { id: 'recap', name: 'Recap pós-evento', subject: 'o que rolou na live (+ o replay)', when: '3 destaques + replay e material.' },
  { id: 'drip', name: 'Drip / nurture', subject: 'o agente que paga a mentoria', when: 'Sequência de nutrição — cada email editorial stand-alone.' },
  { id: 'lancamento', name: 'Lançamento de turma', subject: 'turma 2026.3 abre amanhã 9h · 30 vagas', when: 'Abertura de inscrições — fato + condição, sem countdown.' },
  { id: 'oferta', name: 'Oferta sutil', subject: 'pelo que vi, faria sentido a gente conversar', when: 'Convite comercial observacional, sem pressão.' },
  { id: 'churn', name: 'Churn alert (sumiço)', subject: 'tô curioso — o que rolou?', when: 'Aluno ativo que ficou quieto — curioso e humano.' },
  { id: 'winback', name: 'Recuperação (win-back)', subject: 'tua vaga continua aqui', when: 'Reengajamento de quem já saiu.' },
  { id: 'urgent-ops', name: 'Alerta operacional', subject: 'ação necessária · webhook 504 desde 14:08', when: 'Alerta de sistema (Nina/Iris/plataforma) — coral.' },
];

/** iframe que se auto-dimensiona pela altura do email real (mesmo origin). */
function EmailFrame({ id, name }: { id: string; name: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const fit = () => {
    const f = ref.current;
    const h = f?.contentWindow?.document?.body?.scrollHeight;
    if (f && h) f.style.height = `${h + 8}px`;
  };
  return (
    <iframe
      ref={ref}
      src={`/emails/${id}.html`}
      title={`Email · ${name}`}
      className="vds-mail-frame"
      loading="lazy"
      onLoad={fit}
    />
  );
}

export default function Email() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · email · produção"
        title={<>Email que não <em>quebra no inbox</em>.</>}
        lede="Estes não são mockups — é o HTML REAL que cai no Gmail, no Outlook e no Apple Mail. Estrutura em tabela, estilo inline, CTA navy sólido (sobrevive ao Outlook), travado em modo claro. Gerado por react-email a partir dos tokens da marca: a IA escreve só o editorial (assunto, headline, corpo) e o motor renderiza o resto."
      />

      <Section title="Como funciona" meta="react-email + Resend">
        <div className="vds-mail-how">
          <article className="vds-mail-how-card">
            <span className="i"><Code2 size={17} strokeWidth={1.8} /></span>
            <h3>Token-driven</h3>
            <p>A identidade destilada pro que email de verdade renderiza: navy, fios finos, tipografia editorial. Zero vidro, zero degradê de fundo.</p>
          </article>
          <article className="vds-mail-how-card">
            <span className="i"><ShieldCheck size={17} strokeWidth={1.8} /></span>
            <h3>À prova de bala</h3>
            <p>Tabela + inline, abaixo de 102KB, botão navy sólido. Sem flex, sem grid, sem media query frágil — o que cada cliente honra.</p>
          </article>
          <article className="vds-mail-how-card">
            <span className="i"><Inbox size={17} strokeWidth={1.8} /></span>
            <h3>Pronto pra enviar</h3>
            <p>Cada template é um componente com props. <code>render()</code> vira HTML e o Resend dispara. A IA preenche só o editorial.</p>
          </article>
        </div>
        <pre className="vds-mail-code">{`import { render } from '@react-email/render';
import WelcomeEmail from 'viverdeia/emails/welcome';

const html = await render(
  <WelcomeEmail firstName="Marina" turma="Operadores · T08"
                daysToStart={14} platformUrl="https://app.viverdeia.ai" />
);
await resend.emails.send({
  from: 'Viver de IA <oi@viverdeia.ai>',
  to, subject: 'tua vaga tá confirmada · bora começar?', html,
});`}</pre>
      </Section>

      {MAILS.map((m) => (
        <Section key={m.id} title={m.name} meta="HTML real · iframe">
          <div className="vds-mail">
            <header className="vds-mail-head">
              <div className="vds-mail-subj">
                <span className="lbl">Assunto</span>
                <strong>{m.subject}</strong>
                <span className="when">{m.when}</span>
              </div>
              <a className="vds-mail-open" href={`/emails/${m.id}.html`} target="_blank" rel="noreferrer">
                Abrir HTML <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </header>
            <div className="vds-mail-stage">
              <EmailFrame id={m.id} name={m.name} />
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
