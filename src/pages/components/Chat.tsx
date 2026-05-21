import { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogram from '../../assets/logos/VIA_monogram_hq.png';
import './chat.css';

type Bubble =
  | { kind: 'system'; text: string }
  | { kind: 'user'; text: string; time: string }
  | { kind: 'assistant'; text: string; time: string }
  | { kind: 'typing' };

const conversation: Bubble[] = [
  { kind: 'system', text: 'Atendimento iniciado · 15:42' },
  {
    kind: 'assistant',
    time: '15:42',
    text:
      'Oi, Rafael — sou a Nina. Vi que você assistiu o webinar sobre Superagentes ontem. Posso te mandar a pasta de cases que combina com o seu cenário?',
  },
  {
    kind: 'user',
    time: '15:43',
    text:
      'Pode sim. Estou tentando entender se faz sentido pra ecommerce de moda — temos 8 atendentes hoje no WhatsApp.',
  },
  {
    kind: 'assistant',
    time: '15:43',
    text:
      'Faz total sentido. Tenho 14 cases publicados de ecommerce que reduziram time de resposta em 60% mantendo conversion. Te mando o case da Efizi primeiro — +11.920 conversas analisadas em 90 dias.',
  },
  { kind: 'typing' },
];

export default function Chat() {
  const [draft, setDraft] = useState('');
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · chat"
        title={
          <>
            Conversa <em>de vidro</em>, identidade da marca.
          </>
        }
        lede="Chat bubbles pro atendimento IA da marca — Nina, Íris, suporte. Bubble do assistente em liquid glass branco com hairline; bubble do usuário em navy sólido com gradient; mensagens de sistema em chip neutral centralizado. Avatar VIA monograma à esquerda do assistente. Timestamp em mono."
      />

      <Section title="Conversa completa" meta="3 tipos de bubble + typing + input">
        <div className="vds-chat-stage">
          <header className="vds-chat-h">
            <div className="vds-chat-h-l">
              <span className="vds-chat-av">
                <img src={monogram} alt="" />
              </span>
              <div>
                <strong>Nina</strong>
                <span><span className="vds-chat-presence" /> online · responde em segundos</span>
              </div>
            </div>
            <span className="vds-chat-tag">Atendimento · IA</span>
          </header>

          <div className="vds-chat-body">
            {conversation.map((b, i) => {
              if (b.kind === 'system') {
                return <div key={i} className="vds-bubble-system">{b.text}</div>;
              }
              if (b.kind === 'typing') {
                return (
                  <div key={i} className="vds-bubble-row assistant">
                    <span className="vds-chat-av sm"><img src={monogram} alt="" /></span>
                    <div className="vds-bubble assistant typing">
                      <span /><span /><span />
                    </div>
                  </div>
                );
              }
              if (b.kind === 'assistant') {
                return (
                  <div key={i} className="vds-bubble-row assistant">
                    <span className="vds-chat-av sm"><img src={monogram} alt="" /></span>
                    <div>
                      <div className="vds-bubble assistant">{b.text}</div>
                      <span className="vds-bubble-time">Nina · {b.time}</span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={i} className="vds-bubble-row user">
                  <div>
                    <div className="vds-bubble user">{b.text}</div>
                    <span className="vds-bubble-time">você · {b.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <footer className="vds-chat-input">
            <button className="ico" aria-label="Anexar"><Paperclip size={16} strokeWidth={2} /></button>
            <input
              placeholder="Escreva sua mensagem…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button className="ico" aria-label="Emoji"><Smile size={16} strokeWidth={2} /></button>
            <button className="send" aria-label="Enviar">
              <Send size={14} strokeWidth={2.4} />
            </button>
          </footer>
        </div>
      </Section>

      <Section title="Anatomia · 3 bubbles" meta="user · assistant · system">
        <div className="vds-chat-anatomy">
          <div>
            <p className="vds-eyebrow">User</p>
            <div className="vds-bubble user solo">Mensagem do usuário fica em navy sólido com gradient, peso médio, sombra navy 18%. Canto inferior-direito menor pra "ancorar" no eixo do remetente.</div>
          </div>
          <div>
            <p className="vds-eyebrow">Assistant</p>
            <div className="vds-bubble assistant solo">Bubble do assistente é liquid glass branco com hairline, blur 24px saturado. Canto inferior-esquerdo menor. Texto em navy peso regular.</div>
          </div>
          <div>
            <p className="vds-eyebrow">System</p>
            <div className="vds-bubble-system solo">Atendimento iniciado · 15:42</div>
          </div>
        </div>
      </Section>
    </>
  );
}
