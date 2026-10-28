import { useMemo, useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { Input } from '../../lib/Input/Input';
import { microcopy, MICROCOPY_GROUPS, type MicrocopyGroupId } from '../../content/microcopy';
import './microcopy.css';

const fold = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

// A própria página usa a biblioteca no estado vazio.
const SEM_RESULTADO = microcopy.find((m) => m.id === 'vazio-sem-resultados')?.texto ?? '';

const FILTERS: { id: MicrocopyGroupId | 'todos'; label: string; n: number }[] = [
  { id: 'todos', label: 'Todos', n: microcopy.length },
  ...MICROCOPY_GROUPS.map((g) => ({ id: g.id, label: g.label, n: microcopy.filter((m) => m.grupo === g.id).length })),
];

export default function Microcopy() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<MicrocopyGroupId | 'todos'>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = fold(query.trim());
    return microcopy.filter(
      (m) =>
        (group === 'todos' || m.grupo === group) &&
        (!q || fold(`${m.id} ${m.situacao} ${m.texto} ${m.quandoUsar}`).includes(q)),
    );
  }, [query, group]);

  const copy = async (id: string, texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
    } catch {
      /* clipboard bloqueado — o texto continua selecionável na tela */
    }
  };

  const reset = () => {
    setQuery('');
    setGroup('todos');
  };

  return (
    <>
      <DocsHeader
        eyebrow="Diretrizes · microcopy de produto"
        title={<>Os textos da interface, <em>já escritos</em>.</>}
        lede={`${microcopy.length} textos canônicos por situação: erro, estado vazio, confirmação, sucesso, carregamento, onboarding, botão e ajuda de formulário. Quando a situação bate, copie o texto e troque só os {campos}. Quando não bate, escreva no mesmo molde.`}
      />

      <Section title="Regras da biblioteca" meta="valem pra todo texto de produto">
        <ul className="vds-mc-rules">
          <li><strong>“Você”, nunca tu, teu, tua ou contigo.</strong> Mensagem no imperativo de você (confira, tente, envie); botão no infinitivo (Salvar alterações).</li>
          <li><strong>Sem exclamação, emoji, itálico ou caps lock.</strong> Sentence case em tudo.</li>
          <li><strong>Números no formato brasileiro.</strong> R$ 1.200,00 · 14,2 MB · 1.240 · 12/06/2026 · 14h32.</li>
          <li><strong>Erro não culpa a pessoa.</strong> Diz o que aconteceu, de quem é a falha e o próximo passo.</li>
          <li><strong>As IAs leem a mesma lista.</strong> A skill da marca traz o espelho em <code>microcopy.md</code>; quem gera interface reusa o texto canônico.</li>
        </ul>
      </Section>

      <div className="vds-mc-toolbar">
        <Input
          id="vds-mc-busca"
          label="Buscar na biblioteca"
          placeholder="Buscar por situação, texto ou id"
          iconLeft={<Search size={15} strokeWidth={1.8} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="vds-mc-filters" role="group" aria-label="Filtrar por grupo">
          {FILTERS.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={group === g.id}
              className="via-pill-link"
              onClick={() => setGroup(g.id)}
            >
              {g.label} <span className="vds-mc-count">{g.n}</span>
            </button>
          ))}
        </div>
        <p className="vds-mc-status" role="status">
          {copiedId ? 'Texto copiado.' : `Mostrando ${visible.length} de ${microcopy.length} textos.`}
        </p>
      </div>

      {visible.length === 0 && (
        <div className="vds-mc-empty">
          <p>{SEM_RESULTADO.replace('{termo}', query.trim())}</p>
          <button type="button" className="via-pill-link" onClick={reset}>Limpar busca</button>
        </div>
      )}

      {MICROCOPY_GROUPS.map((g) => {
        const items = visible.filter((m) => m.grupo === g.id);
        if (!items.length) return null;
        return (
          <Section key={g.id} id={`mc-${g.id}`} title={g.label} meta={`${items.length} ${items.length === 1 ? 'texto' : 'textos'}`}>
            <p className="vds-mc-group-rule">{g.regra}</p>
            <ul className="vds-mc-list">
              {items.map((m) => (
                <li key={m.id} className="vds-mc-item">
                  <div className="vds-mc-head">
                    <h3>{m.situacao}</h3>
                    <code className="vds-mc-id">{m.id}</code>
                  </div>
                  <div className="vds-mc-text-row">
                    <p className="vds-mc-text">{m.texto}</p>
                    <button
                      type="button"
                      className="vds-mc-copy"
                      onClick={() => copy(m.id, m.texto)}
                      aria-label={copiedId === m.id ? 'Copiado' : `Copiar texto: ${m.situacao}`}
                    >
                      {copiedId === m.id ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.8} />}
                      <span aria-hidden="true">{copiedId === m.id ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <dl className="vds-mc-meta">
                    <div>
                      <dt>Quando usar</dt>
                      <dd>{m.quandoUsar}</dd>
                    </div>
                    {m.naoEscreva && (
                      <div>
                        <dt>Não escreva</dt>
                        <dd className="vds-mc-dont">{m.naoEscreva}</dd>
                      </div>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
    </>
  );
}
