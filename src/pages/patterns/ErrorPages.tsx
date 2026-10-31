import { useState } from 'react';
import { Compass, Lock, Construction, AlertOctagon, Home, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { microcopy } from '../../content/microcopy';
import './error-pages.css';

type Code = '404' | '500' | '403' | 'maintenance';
type Tone = 'default' | 'attn' | 'danger';

/** Entrada canônica (src/content/microcopy.ts) pelo id. */
const mcEntry = (id: string) => microcopy.find((m) => m.id === id)!;

/** Frase canônica em dois tempos: a 1ª frase vira título, o resto vira texto. */
function frase(id: string): [string, string] {
  const t = mcEntry(id).texto;
  const i = t.indexOf('. ');
  return i < 0 ? [t, ''] : [t.slice(0, i + 1), t.slice(i + 2)];
}

const [h404, l404] = frase('erro-nao-encontrado');
const [h403, l403] = frase('erro-sem-permissao');
const [h500, l500] = frase('erro-servidor');

const ERROR_DEFS: Record<Code, {
  headline: string;
  lede: string;
  tone: Tone;
  icon: React.ReactNode;
  label: string;
  /** Rodapé em mono · o dado que o suporte pede (endereço, incidente, janela) */
  meta: { label: string; value: string };
}> = {
  '404': {
    headline: h404,
    lede: l404,
    tone: 'default',
    icon: <Compass size={28} strokeWidth={1.5} />,
    label: 'erro · 404',
    meta: { label: 'endereço', value: '/aulas/ia-generativa-2024' },
  },
  '403': {
    headline: h403,
    lede: l403,
    tone: 'attn',
    icon: <Lock size={28} strokeWidth={1.5} />,
    label: 'erro · 403',
    meta: { label: 'pedido', value: '6c1f-ax3-auth-deny' },
  },
  '500': {
    headline: h500,
    lede: `${l500} O time já foi avisado, não precisa reportar.`,
    tone: 'danger',
    icon: <AlertOctagon size={28} strokeWidth={1.5} />,
    label: 'erro · 500',
    meta: { label: 'incidente', value: '6c1f-ax3-srv-fail' },
  },
  maintenance: {
    headline: 'Janela de manutenção · 04h‒05h BRT',
    lede: 'Atualização programada da plataforma. Nenhum dado se perde, e o acesso volta às 05h.',
    tone: 'attn',
    icon: <Construction size={28} strokeWidth={1.5} />,
    label: 'manutenção',
    meta: { label: 'janela', value: '04h‒05h BRT · 45 min restantes' },
  },
};

const CODE_LABEL: Record<Code, string> = { '404': '404', '403': '403', '500': '500', maintenance: 'manutenção' };

/* "Evite" sai do microcopy canônico (naoEscreva) quando a situação tem entrada lá */
const COPY_GUIDES: { code: Code; title: string; yes: string; no: string }[] = [
  { code: '404', title: 'Página não existe', yes: 'diz o que aconteceu e oferece um caminho de volta: início ou busca', no: `“${mcEntry('erro-nao-encontrado').naoEscreva}”, emoji de robô` },
  { code: '403', title: 'Sem permissão', yes: 'diz o motivo provável (plano, função, convite) e quem libera', no: `“${mcEntry('erro-sem-permissao').naoEscreva}”, culpar a pessoa` },
  { code: '500', title: 'Falha do servidor', yes: 'assume a responsabilidade (“do nosso lado”), mostra o incidente e oferece Tentar de novo', no: `“${mcEntry('erro-servidor').naoEscreva}”` },
  { code: 'maintenance', title: 'Manutenção programada', yes: 'horário previsto + impacto claro', no: '“em breve”, “logo, logo”' },
];

export default function ErrorPages() {
  const [code, setCode] = useState<Code>('404');
  const def = ERROR_DEFS[code];

  return (
    <>
      <DocsHeader
        eyebrow="Padrões · páginas de erro"
        title={<>Erros honestos — <em>com porta de saída e voz humana</em>.</>}
        lede="4 estados editoriais (404 · 403 · 500 · manutenção) com a mesma estrutura: ícone, título curto, frase honesta e dois caminhos de saída, sempre no fundo claro. Sem “oops” e sem emoji. A linguagem assume a responsabilidade quando a falha é nossa e devolve o controle quando a decisão é da pessoa. Os textos vêm da biblioteca de microcopy."
      />

      <Section meta="navegador" title="alterne entre os 4 estados">
        <p style={{ margin: '0 0 24px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.65 }}>
          Mesmo layout · só muda ícone, título, texto, o rodapé de referência e o segundo caminho.
        </p>

        <div className="vds-err">
          <div className="vds-err-switcher" role="tablist" aria-label="Códigos de erro">
            {(['404', '403', '500', 'maintenance'] as Code[]).map((c) => (
              <button
                key={c}
                className={`vds-err-switcher__btn ${code === c ? 'is-active' : ''}`}
                onClick={() => setCode(c)}
                role="tab"
                aria-selected={code === c}
              >
                {CODE_LABEL[c]}
              </button>
            ))}
          </div>

          <div className="vds-err-stage" role="region" aria-live="polite" aria-label={def.label}>
            <div className="vds-err-content">
              <span className={`vds-err-pill ${def.tone === 'attn' ? 'is-attn' : ''} ${def.tone === 'danger' ? 'is-danger' : ''}`}>
                {def.label}
              </span>

              <div className="vds-err-icon" aria-hidden="true">{def.icon}</div>

              <h2 className="vds-err-headline">{def.headline}</h2>
              <p className="vds-err-lede">{def.lede}</p>

              <div className="vds-err-actions">
                {code === '500' ? (
                  <>
                    <Button iconLeft={<RefreshCw size={16} />}>{mcEntry('botao-tentar-de-novo').texto}</Button>
                    <Button variant="ghost" iconLeft={<Home size={16} />}>Voltar pro início</Button>
                  </>
                ) : (
                  <>
                    <Button iconLeft={<Home size={16} />}>Voltar pro início</Button>
                    {code === '403' ? (
                      <Button variant="ghost">Pedir acesso ao admin</Button>
                    ) : code === 'maintenance' ? (
                      <Button variant="ghost">Ver status em tempo real</Button>
                    ) : (
                      <Button variant="ghost" iconLeft={<ArrowLeft size={16} />}>Voltar pra página anterior</Button>
                    )}
                  </>
                )}
              </div>

              <p className="vds-err-incident">
                <strong>{def.meta.label}</strong>
                {def.meta.value}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section meta="copy editorial" title="o que cada estado deve dizer · e evitar">
        <div className="vds-err-guides">
          {COPY_GUIDES.map((g) => (
            <article key={g.code} className="vds-err-guide">
              <span className="vds-err-guide__code">{CODE_LABEL[g.code]}</span>
              <h3>{g.title}</h3>
              <div className="vds-err-guide__lines">
                <div className="vds-err-guide__line is-yes">
                  <span className="vds-err-guide__lbl">Sim</span>
                  <span className="vds-err-guide__txt">{g.yes}</span>
                </div>
                <div className="vds-err-guide__line is-no">
                  <span className="vds-err-guide__lbl">Evite</span>
                  <span className="vds-err-guide__txt">{g.no}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
