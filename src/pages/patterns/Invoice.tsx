import { Check, Copy, Download, Printer, QrCode } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import './invoice.css';

export default function Invoice() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · invoice / recibo"
        title={
          <>
            Recibo editorial, <em>marca completa</em>.
          </>
        }
        lede="Documento comercial tratado como peça da marca — tipografia tabular, totais elegantes em navy, infos de pagamento em chip de glass. Pronto pra imprimir ou exportar PDF mantendo a presença visual do Viver de IA."
      />

      <ReceiptSection />
      <CompactReceiptSection />
      <PrintGuideSection />
    </>
  );
}

function PrintGuideSection() {
  return (
    <Section title="Print stylesheet · Cmd/Ctrl + P preserva a marca" meta="A4 portrait · shell removida · tipografia tabular · cores autorizadas">
      <article className="vds-print-guide">
        <header>
          <span className="vds-print-eyebrow">
            @media print · aplicado
          </span>
          <h3>
            O recibo imprime como <em>documento da marca</em>, não como print de tela.
          </h3>
          <p>
            Quando o cliente clicar em <strong>Imprimir</strong> (ou Cmd + P), o stylesheet de print remove
            shell, sidebar, atmospheres e ações — sobra A4 portrait limpo com margens editoriais,
            tipografia tabular nos valores e a hierarquia visual original preservada.
          </p>
        </header>

        <ul className="vds-print-list">
          <li>
            <span className="num mono">01</span>
            <div>
              <strong>Página A4 com margens editoriais</strong>
              <em>16mm topo · 14mm laterais · 14mm rodapé — primeira página com 12mm pra dar respiro ao header.</em>
            </div>
          </li>
          <li>
            <span className="num mono">02</span>
            <div>
              <strong>Shell completa escondida</strong>
              <em>header, sidebar, footer, scroll progress, search modal, mobile drawer, action buttons — nada vai pra folha.</em>
            </div>
          </li>
          <li>
            <span className="num mono">03</span>
            <div>
              <strong>Cores autorizadas pelo print-color-adjust</strong>
              <em>navy, accent e coral preservados via <code>print-color-adjust: exact</code> — sem perda na impressora.</em>
            </div>
          </li>
          <li>
            <span className="num mono">04</span>
            <div>
              <strong>Tipografia tabular nos valores</strong>
              <em>Geist Mono com <code>font-variant-numeric: tabular-nums</code> — colunas de R$ alinham na vírgula sem hack.</em>
            </div>
          </li>
          <li>
            <span className="num mono">05</span>
            <div>
              <strong>Page-break-inside: avoid em blocos críticos</strong>
              <em>parties, totals, payment block e footer nunca cortam no meio — o navegador pula página antes.</em>
            </div>
          </li>
          <li>
            <span className="num mono">06</span>
            <div>
              <strong>Fallback compacto para email</strong>
              <em>o recibo compacto também tem versão print — útil pra confirmação rápida em uma página.</em>
            </div>
          </li>
        </ul>

        <footer>
          <div className="vds-print-tip">
            <span className="vds-print-tip-key mono">Cmd</span>
            <span className="vds-print-tip-plus">+</span>
            <span className="vds-print-tip-key mono">P</span>
            <p>Teste agora — abre o diálogo nativo do navegador com o documento já renderizado pra A4.</p>
          </div>
        </footer>
      </article>
    </Section>
  );
}

function ReceiptSection() {
  const items = [
    { desc: 'Mentoria Viver de IA · 1:1 trimestral', qty: 1, unit: 18000, sub: 'Sessões semanais de 60min · acesso ao Discord interno' },
    { desc: 'Análise de squad (até 6 pessoas)', qty: 1, unit: 4800, sub: 'Auditoria do uso de IA por área · plano 90 dias' },
    { desc: 'Curso Viver de IA — assinatura anual', qty: 1, unit: 2400, sub: 'Acesso completo + comunidade + atualizações' },
  ];
  const subtotal = items.reduce((s, i) => s + i.qty * i.unit, 0);
  const discount = 2400;
  const total = subtotal - discount;

  return (
    <Section title="Recibo · onboarding cliente" meta="A4 · 220mm × 297mm · pronto pra PDF">
      <div className="vds-receipt-stage">
        <article className="vds-receipt">
          {/* Sheet edge glow */}
          <div className="vds-receipt-aura" aria-hidden="true" />

          {/* Header */}
          <header className="vds-receipt-head">
            <div className="vds-receipt-brand">
              <BrandLogo variant="black" size="md" />
              <p className="vds-receipt-cnpj">
                Viver de IA Ltda · CNPJ 56.812.394/0001-22<br />
                Av. Paulista, 1842 · cj. 1602 · São Paulo · SP
              </p>
            </div>

            <div className="vds-receipt-id">
              <span className="vds-receipt-pill">Recibo emitido</span>
              <p className="vds-receipt-num">
                <span>Nº</span> 2026·VIA·00482
              </p>
              <p className="vds-receipt-date">17 mai 2026 · 14:32 BRT</p>
            </div>
          </header>

          {/* Parties */}
          <section className="vds-receipt-parties">
            <div className="vds-receipt-party">
              <p className="vds-receipt-eyebrow">De</p>
              <p className="vds-receipt-name">Viver de IA Ltda</p>
              <p className="vds-receipt-info">
                financeiro@viverdeia.ai<br />
                +55 11 4040-1820
              </p>
            </div>
            <div className="vds-receipt-party">
              <p className="vds-receipt-eyebrow">Para</p>
              <p className="vds-receipt-name">Efizi Soluções S.A.</p>
              <p className="vds-receipt-info">
                CNPJ 17.482.910/0001-49<br />
                Márisson Lage · marisson@efizi.com.br<br />
                Rua das Hortênsias, 480 · Joinville · SC
              </p>
            </div>
          </section>

          {/* Items */}
          <table className="vds-receipt-table">
            <thead>
              <tr>
                <th className="col-desc">Descrição</th>
                <th className="col-qty">Qtd</th>
                <th className="col-unit">Unitário</th>
                <th className="col-total">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i}>
                  <td className="col-desc">
                    <p className="vds-receipt-item-name">{it.desc}</p>
                    <p className="vds-receipt-item-sub">{it.sub}</p>
                  </td>
                  <td className="col-qty">{it.qty}</td>
                  <td className="col-unit">R$ {it.unit.toLocaleString('pt-BR')}</td>
                  <td className="col-total">R$ {(it.qty * it.unit).toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <section className="vds-receipt-totals">
            <div className="vds-receipt-note">
              <p className="vds-receipt-eyebrow">Observação</p>
              <p>
                Trimestre iniciado em 1º jun 2026. <em>Desconto Founders</em> aplicado nas 3 primeiras parcelas anuais (-R$ 800/mês).
              </p>
            </div>
            <div className="vds-receipt-totals-card">
              <div className="row">
                <span>Subtotal</span>
                <span>R$ {subtotal.toLocaleString('pt-BR')},00</span>
              </div>
              <div className="row">
                <span>Desconto Founders</span>
                <span className="discount">− R$ {discount.toLocaleString('pt-BR')},00</span>
              </div>
              <div className="row total">
                <span>Total a pagar</span>
                <span>R$ {total.toLocaleString('pt-BR')},00</span>
              </div>
            </div>
          </section>

          {/* Payment block */}
          <section className="vds-receipt-payment">
            <div className="vds-receipt-payment-l">
              <p className="vds-receipt-eyebrow">Forma de pagamento</p>
              <p className="vds-receipt-pay-name">PIX · Chave aleatória</p>
              <p className="vds-receipt-pay-key">
                d8a4c0e2-9f7b-4e83-b521-6c1f7a09b482
                <button className="vds-receipt-copy" aria-label="Copiar chave">
                  <Copy size={11} strokeWidth={2.2} />
                </button>
              </p>
              <ul className="vds-receipt-pay-meta">
                <li><Check size={11} strokeWidth={2.5} /> Pago integralmente em 17 mai 2026</li>
                <li><Check size={11} strokeWidth={2.5} /> Confirmação Bradesco ID 4823·9128·22</li>
              </ul>
            </div>
            <div className="vds-receipt-payment-r">
              <div className="vds-receipt-qr">
                <QrCode size={42} strokeWidth={1.4} />
                <span>QR PIX</span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="vds-receipt-foot">
            <p>
              Documento gerado eletronicamente · não requer assinatura. Para emissão de NFS-e correspondente, consulte
              <strong> nf.viverdeia.ai/2026/00482</strong> ou solicite ao time financeiro.
            </p>
            <div className="vds-receipt-foot-actions">
              <button className="vds-btn-ghost">
                <Printer size={13} strokeWidth={2.2} />
                Imprimir
              </button>
              <button className="vds-btn-primary">
                <Download size={13} strokeWidth={2.2} />
                Baixar PDF
              </button>
            </div>
          </footer>
        </article>
      </div>
    </Section>
  );
}

function CompactReceiptSection() {
  return (
    <Section title="Recibo compacto · confirmação de cobrança" meta="email-friendly · 600px de largura">
      <div className="vds-receipt-stage compact">
        <article className="vds-receipt-mini">
          <header>
            <BrandLogo variant="black" size="sm" />
            <span className="vds-receipt-mini-pill">
              <Check size={11} strokeWidth={2.5} /> Pagamento confirmado
            </span>
          </header>

          <h3 className="vds-receipt-mini-amount">
            R$ 1.840,00
            <span>· recebido em 17 mai</span>
          </h3>

          <ul className="vds-receipt-mini-meta">
            <li>
              <span>Assinatura</span>
              <strong>Viver de IA · plano anual</strong>
            </li>
            <li>
              <span>Próxima cobrança</span>
              <strong>17 jun 2026</strong>
            </li>
            <li>
              <span>Método</span>
              <strong>PIX · final ...b482</strong>
            </li>
          </ul>

          <a className="vds-btn-link" href="#recibo">
            Ver recibo completo
            <span>→</span>
          </a>
        </article>
      </div>
    </Section>
  );
}
