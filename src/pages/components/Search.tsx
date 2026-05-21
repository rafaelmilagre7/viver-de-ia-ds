import { Search as SearchIcon, X, ArrowUpRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './search.css';

const results = [
  { kbd: 'Fundamento', t: 'Cores · navy + grays', u: '/foundations/color' },
  { kbd: 'Componente', t: 'Buttons · pílula uppercase', u: '/components/buttons' },
  { kbd: 'Padrão', t: 'Pricing tier · 3 níveis', u: '/patterns/pricing' },
  { kbd: 'Glass', t: 'Anatomia das 4 camadas', u: '/glass/anatomy' },
];

export default function Search() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · busca"
        title={<>Cmd-K, <em>glass</em>, resultados eyebrow.</>}
        lede="Busca abre como command palette no centro da tela. Resultados vêm com um eyebrow categórico à esquerda — Fundamento, Componente, Padrão — pra o leitor saber onde está pisando. Cmd-K abre, Esc fecha."
      />

      <Section title="Command palette" meta="Cmd K">
        <div className="via-search-stage">
          <div className="via-search">
            <header>
              <SearchIcon size={16} strokeWidth={2} />
              <input aria-label="Busca" placeholder="Buscar fundamentos, componentes, padrões…" defaultValue="navy" />
              <button className="clear" aria-label="Limpar busca"><X size={12} strokeWidth={2.5} /></button>
            </header>
            <ul>
              {results.map((r) => (
                <li key={r.t}>
                  <span className="kbd">{r.kbd}</span>
                  <span className="t">{r.t}</span>
                  <ArrowUpRight size={12} strokeWidth={2} className="arr" />
                </li>
              ))}
            </ul>
            <footer>
              <span className="hint"><kbd>↑↓</kbd> navegar</span>
              <span className="hint"><kbd>↵</kbd> abrir</span>
              <span className="hint"><kbd>esc</kbd> fechar</span>
            </footer>
          </div>
        </div>
      </Section>
    </>
  );
}
