import { Upload as UploadIcon, FileText, X } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './upload.css';

export default function Upload() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · upload"
        title={<>Dropzone <em>dashed</em>, lista de arquivos.</>}
        lede="Upload tem zona com borda tracejada e ícone Lucide grande. Drag-over preenche com navy@04 e endurece a borda. Abaixo, a lista de arquivos enviados em hairline com remover."
      />

      <Section title="Dropzone" meta="dashed glass">
        <div className="via-upload">
          <UploadIcon size={28} strokeWidth={1.6} />
          <h3>Arraste arquivos aqui</h3>
          <p>Ou clique para escolher. PDF, PNG, JPG até 20MB.</p>
          <button className="cta">Escolher arquivo</button>
        </div>
      </Section>

      <Section title="Lista de arquivos" meta="hairline · remover">
        <ul className="via-upload-list">
          <li>
            <span className="ico"><FileText size={16} strokeWidth={2} /></span>
            <div className="meta">
              <span className="name">case-balzani-zimbel.pdf</span>
              <span className="size">2.4 MB · enviado</span>
            </div>
            <button className="x" aria-label="Remover arquivo"><X size={12} strokeWidth={2.5} /></button>
          </li>
          <li>
            <span className="ico"><FileText size={16} strokeWidth={2} /></span>
            <div className="meta">
              <span className="name">depoimento-marisson.png</span>
              <span className="size">1.1 MB · 64% enviado</span>
              <div className="bar"><span style={{ width: '64%' }} /></div>
            </div>
            <button className="x" aria-label="Remover arquivo"><X size={12} strokeWidth={2.5} /></button>
          </li>
        </ul>
      </Section>
    </>
  );
}
