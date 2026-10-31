import { ArrowRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { microcopy } from '../../content/microcopy';
import './empty.css';

/** Texto canônico (src/content/microcopy.ts) pelo id. */
const mc = (id: string) => microcopy.find((m) => m.id === id)!.texto;

/** Frase canônica em dois tempos: a 1ª frase vira título, o resto vira texto. */
function frase(id: string): [string, string] {
  const t = mc(id);
  const i = t.indexOf('. ');
  return i < 0 ? [t, ''] : [t.slice(0, i + 1), t.slice(i + 2)];
}

function EditorialMark() {
  return (
    <svg className="vds-empty-mark" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="emp-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--vds-emp-ink)' }} stopOpacity="0.85" />
          <stop offset="100%" style={{ stopColor: 'var(--vds-emp-ink-2)' }} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="78" fill="none" stroke="url(#emp-g)" strokeWidth="1.5" opacity="0.32" />
      <circle cx="100" cy="100" r="56" fill="none" style={{ stroke: "var(--vds-emp-ink)" }} strokeWidth="1" strokeDasharray="3 5" opacity="0.30" />
      <line x1="100" y1="40" x2="100" y2="160" style={{ stroke: "var(--vds-emp-ink)" }} strokeWidth="1" opacity="0.40" />
      <line x1="40" y1="100" x2="160" y2="100" style={{ stroke: "var(--vds-emp-ink)" }} strokeWidth="1" opacity="0.40" />
      <polygon points="100,72 108,100 100,128 92,100" fill="url(#emp-g)" />
      <polygon points="72,100 100,92 128,100 100,108" fill="url(#emp-g)" opacity="0.7" />
      <circle cx="100" cy="40" r="2.5" style={{ fill: "var(--vds-emp-ink)" }} />
      <circle cx="100" cy="160" r="2.5" style={{ fill: "var(--vds-emp-ink)" }} opacity="0.40" />
      <circle cx="40" cy="100" r="2.5" style={{ fill: "var(--vds-emp-ink)" }} opacity="0.40" />
      <circle cx="160" cy="100" r="2.5" style={{ fill: "var(--vds-emp-ink)" }} opacity="0.40" />
    </svg>
  );
}

export default function Empty() {
  const [filtroTitulo, filtroTexto] = frase('vazio-filtros');
  const [inicioTitulo, inicioTexto] = frase('vazio-primeiro-uso');
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · estado vazio"
        title={<>Vazio também é <em>resposta</em>.</>}
        lede="O estado vazio ocupa o espaço inteiro do componente, no fundo claro da tela. Marca geométrica navy, título e descrição em Geist, uma ação em pílula — sem ilustração, sem mascote. Os textos vêm da biblioteca de microcopy."
      />

      <Section title="Padrão · filtro sem resultado" meta="marca geométrica · título · ação">
        <div className="vds-empty">
          <EditorialMark />
          <h3>{filtroTitulo}</h3>
          <p>{filtroTexto}</p>
          <button className="cta">
            Limpar filtros
            <ArrowRight size={16} strokeWidth={1.75} />
          </button>
        </div>
      </Section>

      <Section title="Sem dados ainda" meta="primeiro uso">
        <div className="vds-empty soft">
          <EditorialMark />
          <h3>{inicioTitulo}</h3>
          <p>{inicioTexto}</p>
          <button className="cta">
            {mc('botao-criar')}
            <ArrowRight size={16} strokeWidth={1.75} />
          </button>
        </div>
      </Section>
    </>
  );
}
