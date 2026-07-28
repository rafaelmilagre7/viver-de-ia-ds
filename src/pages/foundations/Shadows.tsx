import { useEffect, useState } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { Button } from '../../lib/Button/Button';
import '../pages.css';
import './shadows.css';

/* ------------------------------------------------------------------
   Esta página descreve o sistema de sombra — então ela NÃO pode
   afirmar valor nenhum de cabeça. Todo valor exibido é lido do CSS
   ao vivo (getComputedStyle) e re-lido quando o tema troca. Se o
   token mudar amanhã, a doc muda junto: mentira estrutural impossível.
   ------------------------------------------------------------------ */

const SCALE = [
  '--via-shadow-xs',
  '--via-shadow-sm',
  '--via-shadow-md',
  '--via-shadow-lg',
  '--via-shadow-xl',
] as const;

const INK = [
  '--via-shadow-ink-03',
  '--via-shadow-ink-06',
  '--via-shadow-ink-10',
  '--via-shadow-ink-14',
  '--via-shadow-ink-20',
  '--via-shadow-ink-30',
  '--via-shadow-ink-40',
  '--via-shadow-ink-60',
] as const;

const EXTRA = [
  '--via-shadow-focus',
  '--via-shadow-glass-light',
  '--via-shadow-glass-dark',
] as const;

const WATCHED: string[] = [...SCALE, ...INK, ...EXTRA];

const USE: Record<string, string> = {
  '--via-shadow-xs': 'Input em rest, chip, divisor com relevo',
  '--via-shadow-sm': 'Card padrão em rest',
  '--via-shadow-md': 'Card em hover, popover',
  '--via-shadow-lg': 'Menu, dropdown',
  '--via-shadow-xl': 'Modal, dialog',
};

function useLiveTokens(names: string[]) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const n of names) next[n] = cs.getPropertyValue(n).replace(/\s+/g, ' ').trim();
      setVals(next);
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
    // names é constante de módulo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { vals, theme };
}

/* Quebra "a, b" em camadas sem cortar dentro de rgba(...) */
function layers(value: string): string[] {
  if (!value) return [];
  return value.split(/,(?![^(]*\))/).map((s) => s.trim()).filter(Boolean);
}

export default function Shadows() {
  const { vals, theme } = useLiveTokens(WATCHED);
  const isDark = theme === 'dark';

  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · sombras"
        title={
          <>
            Sombra tem <em>tinta</em>. E ela troca no escuro.
          </>
        }
        lede="No tema claro a sombra do sistema é navy — rgba(10,31,59). Mais fria, mais editorial, não briga com tom de pele em fotografia. No escuro navy sobre navy não produz sombra nenhuma: lá a mesma escala vira preta e mais densa, senão o elemento perde a elevação. O que não existe em nenhum dos dois é sombra cinza-neutra."
      />

      <Section title="Escala" meta="xs → xl · valor lido ao vivo">
        <p>
          Cinco degraus, um por altitude. Os valores abaixo são lidos do CSS deste
          navegador agora — troque o tema no topo e eles mudam junto com a tinta.
          Tema ativo: <code className="vds-code-inline">{theme}</code>.
        </p>
        <p style={{ marginTop: 12 }}>
          A escala é o degrau pronto. Componente que precisa de um lift próprio —
          offset negativo, spread apertado, sombra de press — não força um degrau
          daqui: monta a sombra com a tinta da seção seguinte.
        </p>
        <div className="vds-sh-stage" style={{ marginTop: 20 }}>
          <div className="vds-sh-grid">
            {SCALE.map((tok) => (
              <div key={tok}>
                <div className="vds-sh-card" style={{ boxShadow: `var(${tok})` }}>
                  {tok.replace('--via-shadow-', '')}
                </div>
                <p className="vds-sh-use">{USE[tok]}</p>
                <div className="vds-sh-value">
                  {layers(vals[tok] ?? '').map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Tinta de sombra" meta="--via-shadow-ink-*">
        <p>
          Quando a sombra não vem pronta da escala — um lift de botão, um offset
          negativo, uma elevação sob medida — a cor vem daqui. A família{' '}
          <code className="vds-code-inline">--via-shadow-ink-*</code> já resolve o tema
          sozinha: navy no claro, preta e mais densa no escuro.
        </p>

        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ margin: 0, fontSize: 'var(--via-fs-caption)', lineHeight: 1.6 }}>
              <code className="vds-code-inline">
                box-shadow: 0 8px 18px -6px var(--via-shadow-ink-40)
              </code>
              <br />
              A tinta troca com o tema e a elevação sobrevive nos dois.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ margin: 0, fontSize: 'var(--via-fs-caption)', lineHeight: 1.6 }}>
              <code className="vds-code-inline">
                box-shadow: 0 8px 18px -6px var(--via-navy-40)
              </code>
              <br />
              No escuro <code className="vds-code-inline">--via-navy-*</code> vira branco:
              a sombra some e no lugar dela aparece um halo. Única exceção legítima é a
              linha de luz do vidro,{' '}
              <code className="vds-code-inline">inset 0 1px 0 var(--via-edge-hi)</code>.
            </p>
          </div>
        </div>

        <div className="vds-sh-stage" style={{ marginTop: 24 }}>
          <div className="vds-sh-ink-grid">
            {INK.map((tok) => (
              <div key={tok}>
                <div
                  className="vds-sh-ink-swatch"
                  style={{ boxShadow: `0 10px 22px -8px var(${tok}), 0 2px 5px -2px var(${tok})` }}
                />
                <p className="vds-sh-ink-name">{tok.replace('--via-shadow-', '')}</p>
                <p className="vds-sh-ink-val">{vals[tok]}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Sombra do vidro" meta="duas receitas · quatro camadas">
        <p>
          O efeito "lifted from the glass" não é uma sombra só: são{' '}
          <em>quatro camadas</em> — luz interna no topo, eco interno embaixo e duas
          quedas externas. Sem as internas, o vidro vira um retângulo translúcido
          chapado. São duas receitas fechadas, uma por fundo:{' '}
          <code className="vds-code-inline">--via-shadow-glass-light</code> para vidro
          branco sobre claro e{' '}
          <code className="vds-code-inline">--via-shadow-glass-dark</code> para vidro
          translúcido sobre navy. Elas não trocam com o tema — quem escolhe é o fundo
          atrás do vidro, e é por isso que a receita escura já carrega tinta preta nas
          quedas mesmo no tema claro.
        </p>

        <div className="vds-sh-glass-pair" style={{ marginTop: 20 }}>
          <div className="vds-sh-glass-stage vds-sh-glass-stage--light vds-onlight">
            <div className="vds-sh-glass vds-sh-glass--light">
              Vidro com <em>presença</em>
            </div>
            <span className="vds-sh-glass-label">--via-shadow-glass-light</span>
          </div>
          <div className="vds-sh-glass-stage vds-sh-glass-stage--dark">
            <div className="vds-sh-glass vds-sh-glass--dark">
              Vidro com <em>presença</em>
            </div>
            <span className="vds-sh-glass-label">--via-shadow-glass-dark</span>
          </div>
        </div>

        <table className="vds-token-table" style={{ marginTop: 24 }}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Camadas (lidas ao vivo)</th>
            </tr>
          </thead>
          <tbody>
            {(['--via-shadow-glass-light', '--via-shadow-glass-dark'] as const).map((tok) => (
              <tr key={tok}>
                <td className="tok">{tok}</td>
                <td className="use">
                  <div className="vds-sh-value">
                    {layers(vals[tok] ?? '').map((l, i) => (
                      <span key={i}>{l}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Focus ring" meta="acessibilidade">
        <p>
          O anel de foco tem 3px sólidos e tinta que contrasta com o <em>fundo</em>, não
          com a marca: no claro é navy translúcido, no escuro é branco translúcido — navy
          sobre canvas navy não seria anel nenhum. Está em{' '}
          <code className="vds-code-inline">--via-shadow-focus</code>, hoje valendo{' '}
          <code className="vds-code-inline">{vals['--via-shadow-focus']}</code> no tema{' '}
          {isDark ? 'escuro' : 'claro'}. Nunca remova o focus visible — substitua se
          precisar.
        </p>
        <p style={{ marginTop: 12 }}>
          Sobre superfície preenchida o anel precisa de folga, senão encosta no fill e
          desaparece. É o que o <code className="vds-code-inline">&lt;Button&gt;</code>{' '}
          real faz:{' '}
          <code className="vds-code-inline">
            0 0 0 2px var(--via-surface), 0 0 0 4px var(--via-navy-60)
          </code>
          . Os botões abaixo são o componente de verdade; nos da direita o
          box-shadow de <code className="vds-code-inline">:focus-visible</code> está
          reproduzido igual, pra dar pra comparar parado.
        </p>
        <div className="vds-sh-stage" style={{ marginTop: 20 }}>
          <div className="vds-sh-focus-row">
            {(['primary', 'secondary'] as const).map((variant) => (
              <div className="vds-sh-focus-pair" key={variant}>
                <div className="vds-sh-focus-item">
                  <Button variant={variant} type="button">Continuar</Button>
                  <span className="vds-sh-glass-label">rest</span>
                </div>
                <div className="vds-sh-focus-item">
                  <Button variant={variant} type="button" className="vds-sh-focused">
                    Continuar
                  </Button>
                  <span className="vds-sh-glass-label">:focus-visible</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
