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
        lede="Modal é uma frame de vidro flutuando sobre um scrim navy. O título é em Geist 24, corpo em Geist 14, ação primária à direita. Use só para decisões irreversíveis ou para mostrar algo que precisa de foco total."
      />

      <Section title="Anatomia" meta="glass over scrim">
        <div className="vds-modal-stage">
          <span className="stage-label">Modal · glass over scrim</span>
          <div className="vds-modal-demo">
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
            <tr><td className="tok">Width</td><td className="val">100% · max 480px</td><td className="use">Largura confortável de leitura</td></tr>
            <tr><td className="tok">Radius</td><td className="val">28px · radius-xl</td><td className="use">Maior que cards padrão (20px)</td></tr>
            <tr><td className="tok">Padding</td><td className="val">32px</td><td className="use">Respiração interna</td></tr>
            <tr><td className="tok">Scrim</td><td className="val">navy 70% → 92%</td><td className="use">Cobre tudo atrás</td></tr>
            <tr><td className="tok">Shadow</td><td className="val">32px 80px preto 45%</td><td className="use">Sensação de pairar · tinta fixa, nunca token que inverte</td></tr>
            <tr><td className="tok">Title</td><td className="val">Geist 24 · 600</td><td className="use">Sem serifa, calmo</td></tr>
            <tr><td className="tok">Ação</td><td className="val">navy · claro no escuro</td><td className="use">O scrim é navy nos 2 temas: no escuro a primária inverte pra não sumir</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
