import { Info, Check, AlertTriangle, XCircle, X } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './toast.css';

export default function Toast() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · toast"
        title={<>Notificação <em>de vidro</em>.</>}
        lede="Toasts são frostados, com ícone à esquerda, conteúdo no centro e ação opcional à direita. Quatro variantes — info (default), success, warning, danger. Aparecem por 4–6 segundos no canto inferior direito."
      />

      <Section title="4 variantes" meta="liquid glass">
        <div className="via-toast-bed">
          <div className="via-toast">
            <span className="ico"><Info size={16} strokeWidth={2} /></span>
            <div className="body">
              <div className="title">Nova mensagem da mentoria</div>
              <div className="desc">Caio respondeu ao seu pedido de feedback sobre o agente.</div>
            </div>
            <span className="action">Ver</span>
          </div>

          <div className="via-toast success">
            <span className="ico"><Check size={16} strokeWidth={2.5} /></span>
            <div className="body">
              <div className="title">Case publicado com sucesso</div>
              <div className="desc">O case da Efizi foi aprovado e publicado no diretório.</div>
            </div>
            <span className="close"><X size={11} strokeWidth={2.5} /></span>
          </div>

          <div className="via-toast warning">
            <span className="ico"><AlertTriangle size={16} strokeWidth={2} /></span>
            <div className="body">
              <div className="title">Inscrições fecham em 3 dias</div>
              <div className="desc">A turma 2026.2 encerra inscrições em 30 de junho.</div>
            </div>
          </div>

          <div className="via-toast danger">
            <span className="ico"><XCircle size={16} strokeWidth={2} /></span>
            <div className="body">
              <div className="title">Falha ao processar pagamento</div>
              <div className="desc">Verifique os dados do cartão e tente novamente.</div>
            </div>
            <span className="action">Tentar</span>
          </div>
        </div>
      </Section>
    </>
  );
}
