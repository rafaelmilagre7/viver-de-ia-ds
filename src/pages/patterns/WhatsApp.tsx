import { Paperclip, Mic, Camera, ChevronLeft, Video, Phone, MoreVertical, Wifi, Signal, BatteryFull } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './whatsapp.css';

type Msg =
  | { kind: 'system'; text: string }
  | { kind: 'them'; text: string; time: string; read?: boolean }
  | { kind: 'me'; text: string; time: string; read?: boolean };

const messages: Msg[] = [
  { kind: 'system', text: 'Hoje · 15:42' },
  {
    kind: 'them',
    time: '15:42',
    text: 'Oi, Rafael — sou a Nina, da Viver de IA. Vi que você baixou o e-book de cases ontem. Posso te mandar os 3 cases que combinam com o seu cenário?',
  },
  {
    kind: 'me',
    time: '15:44',
    text: 'Pode sim. Tenho ecommerce de moda, 8 atendentes no WhatsApp.',
    read: true,
  },
  {
    kind: 'them',
    time: '15:44',
    text: 'Perfeito. Tenho 14 cases de ecommerce que reduziram tempo de resposta em 60% mantendo conversion. Começo pelo da Efizi — +11.920 conversas analisadas em 90 dias.',
  },
  {
    kind: 'them',
    time: '15:45',
    text: 'Faz sentido eu mandar agora ou prefere agendar 15min com o Caio pra ele te apresentar pessoalmente?',
  },
];

export default function WhatsApp() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · WhatsApp preview"
        title={
          <>
            Conversa da Nina em <em>mockup de celular</em>.
          </>
        }
        lede="Preview da Nina conversando via WhatsApp pra material de marketing — captura de tela editorial. Frame de celular real (Dynamic Island, status bar, home indicator), chrome WhatsApp light com avatar Nina, bubbles padrão WhatsApp (verde-marca pra usuário, branco pra Nina), input nativo. Cada peça em escala 1:1 com produto real."
      />

      <Section title="iPhone · light mode" meta="conversa Nina · 5 mensagens">
        <div className="vds-wa-stage">
          <div className="vds-wa-phone">
            {/* Status bar */}
            <div className="vds-wa-status">
              <span>9:41</span>
              <div className="status-r">
                <Signal size={11} strokeWidth={2.4} />
                <Wifi size={12} strokeWidth={2.4} />
                <BatteryFull size={14} strokeWidth={1.8} />
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="vds-wa-island" />

            {/* WhatsApp header */}
            <header className="vds-wa-h">
              <button aria-label="Anterior" className="back"><ChevronLeft size={20} strokeWidth={2.2} /></button>
              <span className="vds-wa-av">
                <img src={monogramWhite} alt="" />
              </span>
              <div className="vds-wa-meta">
                <strong>Nina · Viver de IA</strong>
                <span><span className="online" />online</span>
              </div>
              <div className="vds-wa-actions">
                <button aria-label="Videochamada"><Video size={18} strokeWidth={2} /></button>
                <button aria-label="Ligar"><Phone size={17} strokeWidth={2} /></button>
                <button aria-label="Mais opções"><MoreVertical size={18} strokeWidth={2} /></button>
              </div>
            </header>

            {/* Conversation */}
            <div className="vds-wa-body">
              <div className="vds-wa-bg" />
              <div className="vds-wa-conv">
                {messages.map((m, i) => {
                  if (m.kind === 'system') {
                    return <div key={i} className="vds-wa-sys">{m.text}</div>;
                  }
                  return (
                    <div key={i} className={`vds-wa-row ${m.kind}`}>
                      <div className={`vds-wa-bubble ${m.kind}`}>
                        <p>{m.text}</p>
                        <span className="meta">
                          {m.time}
                          {m.kind === 'me' && (
                            <svg className={`check ${m.read ? 'read' : ''}`} width="16" height="10" viewBox="0 0 16 10" fill="none">
                              <path d="M0.5 5.5 L4 9 L10 1" style={{ stroke: "var(--via-navy)" }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                              <path d="M5 5.5 L8.5 9 L14.5 1" style={{ stroke: "var(--via-navy)" }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <footer className="vds-wa-input">
              <div className="vds-wa-field">
                <button aria-label="Anexar arquivo" className="ico"><Paperclip size={18} strokeWidth={2} /></button>
                <input placeholder="Mensagem" />
                <button aria-label="Tirar foto" className="ico"><Camera size={18} strokeWidth={2} /></button>
              </div>
              <button aria-label="Gravar áudio" className="vds-wa-send">
                <Mic size={18} strokeWidth={2} />
              </button>
            </footer>

            {/* Home indicator */}
            <div className="vds-wa-home" />
          </div>
        </div>
      </Section>
    </>
  );
}
