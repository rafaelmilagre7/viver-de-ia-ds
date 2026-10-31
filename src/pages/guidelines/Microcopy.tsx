import { useMemo, useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { Input } from '../../lib/Input/Input';
import { microcopy, MICROCOPY_GROUPS, type MicrocopyGroupId } from '../../content/microcopy';
import { formatCompact, formatCurrency, formatDelta, formatNumber, formatPercent } from '../../lib/format';
import './microcopy.css';

const fold = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

// A própria página usa a biblioteca no estado vazio.
const SEM_RESULTADO = microcopy.find((m) => m.id === 'vazio-sem-resultados')?.texto ?? '';

// Números · os exemplos saem do próprio formatador da lib, então a guia não descola do código.
const NUMEROS: { o: string; regra: string; ex: string[]; nao: string; fn: string }[] = [
  {
    o: 'Moeda',
    regra: 'R$, espaço que não quebra e o número. Ponto no milhar; em painel, sem centavos.',
    ex: [formatCurrency(1_325_000), formatCurrency(1_250, { decimals: 2 })],
    nao: 'R$1.325.000 · R$\u00A01325000',
    fn: 'formatCurrency(v)',
  },
  {
    o: 'Milhar e decimal',
    regra: 'Ponto separa o milhar, vírgula separa o decimal.',
    ex: [formatNumber(1_240), formatNumber(3.9)],
    nao: '1,240 · 3.9',
    fn: 'formatNumber(v)',
  },
  {
    o: 'Percentual',
    regra: 'Vírgula decimal, % colado no número.',
    ex: [formatPercent(99.8), formatPercent(94)],
    nao: '99.8% · 94 %',
    fn: 'formatPercent(v)',
  },
  {
    o: 'Compacto',
    regra: 'mil, mi e bi, com três algarismos. Abaixo de 10 mil, o número vai inteiro.',
    ex: [formatCurrency(1_325_000, { compact: true }), formatCompact(184_000), formatCurrency(4_200, { compact: true })],
    nao: 'R$\u00A01.325K · 184k · 1,3M',
    fn: 'formatCurrency(v, { compact: true }) · formatCompact(v)',
  },
  {
    o: 'Variação',
    regra: 'Sinal sempre, + ou −. O menos é tipográfico, nunca hífen. Diferença entre percentuais é p.p.',
    ex: [
      formatDelta(8.2, { unit: 'percent' }),
      formatDelta(-1.2, { unit: 'points' }),
      formatDelta(-4_200, { unit: 'currency' }),
    ],
    nao: '8,2% (sem sinal) · -1,2pp',
    fn: "formatDelta(v, { unit: 'percent' | 'points' | 'currency' })",
  },
];

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
          <li><strong>Números no formato brasileiro.</strong> R$&nbsp;1.200,00 · 14,2 MB · 1.240 · 12/06/2026 · 14h32.</li>
          <li><strong>Erro não culpa a pessoa.</strong> Diz o que aconteceu, de quem é a falha e o próximo passo.</li>
          <li><strong>As IAs leem a mesma lista.</strong> A skill da marca traz o espelho em <code>microcopy.md</code>; quem gera interface reusa o texto canônico.</li>
        </ul>
      </Section>

      <Section id="mc-numeros" title="Números" meta="moeda · milhar · percentual · compacto · variação">
        <p className="vds-mc-group-rule">
          Todo número da interface passa pelo formatador da biblioteca (<code>formatCurrency</code>,{' '}
          <code>formatNumber</code>, <code>formatPercent</code>, <code>formatCompact</code> e{' '}
          <code>formatDelta</code>, em <code>@viverdeia/design-system</code>). Os exemplos abaixo saem dele, na hora.
        </p>
        <ul className="vds-mc-nums">
          {NUMEROS.map((n) => (
            <li key={n.o} className="vds-mc-num">
              <div className="vds-mc-num-head">
                <h3>{n.o}</h3>
                <code className="vds-mc-id">{n.fn}</code>
              </div>
              <p className="vds-mc-num-rule">{n.regra}</p>
              <div className="vds-mc-num-ex">
                {n.ex.map((e) => (
                  <span key={e} className="vds-mc-num-chip">{e}</span>
                ))}
              </div>
              <p className="vds-mc-num-dont">
                <span>Não escreva</span> <s>{n.nao}</s>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="vds-mc-toolbar">
        <Input
          id="vds-mc-busca"
          label="Buscar na biblioteca"
          placeholder="Buscar por situação, texto ou id"
          iconLeft={<Search size={16} strokeWidth={1.75} />}
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
                      {copiedId === m.id ? <Check size={16} strokeWidth={1.75} /> : <Copy size={16} strokeWidth={1.75} />}
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
