import { X } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './modal.css';

export default function Modal() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · modal"
        title={<>Vidro <em>sobre</em> scrim navy.</>}
        lede="Modal é uma frame de vidro flutuando sobre um scrim navy 85%. O título é em Geist 22, corpo em Inter 14, ação primária à direita. Use só para decisões irreversíveis ou para mostrar algo que precisa de foco total."
      />

      <Section title="Anatomia" meta="glass over scrim">
        <div className="via-modal-stage">
          <span className="stage-label">Modal · glass over scrim</span>
          <div className="via-modal">
            <header>
              <h3>Confirmar inscrição?</h3>
              <button className="close" aria-label="Fechar"><X size={12} strokeWidth={2.5} /></button>
            </header>
            <p>
              Sua inscrição na turma 2026.2 será confirmada. O pagamento de
              R$&nbsp;4.800 será cobrado no método cadastrado.
            </p>
            <footer>
              <button className="btn-ghost">Cancelar</button>
              <button className="btn-primary">Confirmar</button>
            </footer>
          </div>
        </div>
      </Section>

      <Section title="Tokens" meta="anatomia">
        <table className="vds-token-table">
          <thead><tr><th>Token</th><th>Valor</th><th>Onde</th></tr></thead>
          <tbody>
            <tr><td className="tok">Width</td><td className="val">480px (max)</td><td className="use">Largura confortável de leitura</td></tr>
            <tr><td className="tok">Radius</td><td className="val">24px</td><td className="use">Maior que cards padrão</td></tr>
            <tr><td className="tok">Padding</td><td className="val">32px</td><td className="use">Respiração interna</td></tr>
            <tr><td className="tok">Scrim</td><td className="val">navy 85%</td><td className="use">Cobre tudo atrás</td></tr>
            <tr><td className="tok">Shadow</td><td className="val">32px 80px navy 40%</td><td className="use">Sensação de pairar</td></tr>
            <tr><td className="tok">Title</td><td className="val">Geist 22 · 300</td><td className="use">Serif, calmo</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
