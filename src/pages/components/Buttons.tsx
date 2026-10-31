import { useLayoutEffect, type CSSProperties, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Trash2 } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Button, type ButtonProps } from '../../lib/Button/Button';
import './buttons.css';

/* Vitrine de estados SEM CSS paralelo: a página copia, das folhas que o
   navegador já carregou, as regras do <Button> da lib (e o anel de foco
   global) que dependem de :hover, :active e :focus-visible, trocando a
   pseudo-classe por [data-vds-state~="…"]. O botão congelado roda o CSS da
   lib — mudou a lib, mudou a vitrine. */
const PSEUDO = /:(hover|active|focus-visible)(?![\w-])/g;

function useFrozenStates() {
  useLayoutEffect(() => {
    const out: string[] = [];
    const visit = (rules: CSSRuleList, wrap: (css: string) => string) => {
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSMediaRule) {
          visit(rule.cssRules, (css) => wrap(`@media ${rule.conditionText}{${css}}`));
        } else if (rule instanceof CSSStyleRule) {
          const sel = rule.selectorText;
          if (!sel.includes('via-btn') && sel !== ':focus-visible') continue;
          const frozen = sel.replace(PSEUDO, (_, p: string) => `[data-vds-state~="${p}"]`);
          if (frozen !== sel) out.push(wrap(`${frozen}{${rule.style.cssText}}`));
        }
      }
    };
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        visit(sheet.cssRules, (css) => css);
      } catch {
        /* folha de outra origem: sem acesso às regras, e não é da lib */
      }
    }
    const style = document.createElement('style');
    style.textContent = out.join('\n');
    document.head.append(style);
    return () => style.remove();
  }, []);
}

/* Reflexo congelado no alto, à esquerda do rótulo (a lib escreve isto no mousemove) */
const LIGHT = { '--via-mx': '44px', '--via-my': '8px' } as CSSProperties;

const STATES: Array<{ label: string; props: ButtonProps & { 'data-vds-state'?: string } }> = [
  { label: 'Repouso', props: {} },
  { label: 'Hover', props: { 'data-vds-state': 'hover', style: LIGHT, tabIndex: -1 } },
  { label: 'Pressionado', props: { 'data-vds-state': 'hover active', style: LIGHT, tabIndex: -1 } },
  { label: 'Foco', props: { 'data-vds-state': 'focus-visible', tabIndex: -1 } },
  { label: 'Desabilitado', props: { disabled: true } },
];

function StateRow({ variant, children, ...rest }: ButtonProps & { children: ReactNode }) {
  return (
    <div className="vds-btn-states">
      {STATES.map((s) => (
        <figure key={s.label} className="vds-btn-state">
          <Button variant={variant} {...rest} {...s.props}>
            {children}
          </Button>
          <figcaption>{s.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

const icon = { size: 16, strokeWidth: 1.75 };

export default function Buttons() {
  useFrozenStates();
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · botões"
        title={
          <>
            Sempre <em>pílula</em>. Nunca <em>caixa alta</em>.
          </>
        }
        lede="Cinco variantes, cinco estados, três tamanhos. O raio é sempre pílula (999), o peso é medium e o rótulo vai em sentence case com tracking negativo. É a regra que faz o sistema reconhecível. Tudo nesta página é o <Button> da biblioteca, com o CSS dela."
      />

      <Section title="Primary" meta="navy · um por seção">
        <StateRow variant="primary" iconRight={<ArrowRight {...icon} />}>
          Assinar o plano
        </StateRow>
      </Section>

      <Section title="Secondary" meta="vidro control">
        <StateRow variant="secondary">Ver agenda</StateRow>
      </Section>

      <Section title="Ghost" meta="só texto">
        <StateRow variant="ghost" iconRight={<ArrowUpRight {...icon} />}>
          Ver cases
        </StateRow>
      </Section>

      <Section title="Destrutivo" meta="coral só no hover">
        <StateRow variant="destructive" iconLeft={<Trash2 {...icon} />}>
          Excluir rascunho
        </StateRow>
      </Section>

      <Section title="Destaque" meta="accent · raro">
        <StateRow variant="accent">Agendar conversa</StateRow>
      </Section>

      <Section title="Tamanhos" meta="sm · md · lg">
        <div className="vds-btn-states">
          <Button size="sm">Pequeno</Button>
          <Button size="md">Médio</Button>
          <Button size="lg">Grande</Button>
        </div>
      </Section>

      <Section title="Tokens" meta="anatomia">
        <table className="vds-token-table vds-btn-tokens">
          <thead>
            <tr><th>Token</th><th>Valor</th><th>Onde</th></tr>
          </thead>
          <tbody>
            <tr><td className="tok">--via-radius-pill</td><td className="val">999px</td><td className="use">Sempre · todas as variantes</td></tr>
            <tr><td className="tok">padding sm · md · lg</td><td className="val">7×14 · 10×18 · 13×24</td><td className="use">Barra de filtro · padrão · CTA de hero</td></tr>
            <tr><td className="tok">fonte</td><td className="val">Geist 12/13/14 · 500</td><td className="use">Sentence case, -0.008em</td></tr>
            <tr><td className="tok">--via-press-scale</td><td className="val">0.98</td><td className="use">Pressionado, em --via-dur-press · todas as variantes</td></tr>
            <tr><td className="tok">--via-focus-*</td><td className="val">2px · afastado 2px</td><td className="use">Foco por teclado · contorno que segue a pílula</td></tr>
            <tr><td className="tok">--via-specular-on-fill</td><td className="val">branco 12%</td><td className="use">Reflexo em primary, destrutivo e destaque · rótulo segue legível</td></tr>
            <tr><td className="tok">--via-shadow-ink-40</td><td className="val">0 8px 18px -6px</td><td className="use">Sombra do primary · vira preta no escuro</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Código" meta="React">
        <CodeBlock>{`import { Button } from '@viverdeia/design-system';
import { ArrowRight } from 'lucide-react';

<Button variant="primary" iconRight={<ArrowRight size={16} strokeWidth={1.75} />}>
  Assinar o plano
</Button>`}</CodeBlock>
      </Section>
    </>
  );
}
