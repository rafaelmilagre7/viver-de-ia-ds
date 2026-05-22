import { ArrowRight, Mail, Trash2 } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiButton() {
  return (
    <ComponentDoc
      eyebrow="api · button"
      name="Button"
      headline="pill 999 · sentence-case · shine líquido no hover"
      description="CTA primário do sistema. Pill com gradient navy primary, glass secondary, fantasma ghost, coral destrutivo e accent editorial singular. Loading state com spinner currentColor · ícones iconLeft/iconRight com spacing automático · shine sweep diagonal no hover · press scale 0.985."
      importLine={`import { Button, type ButtonProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-btn', description: 'Container base · pill 999 · padding por size · overflow:hidden pra confinar shine' },
        { part: 'via-btn__icon', description: 'Slot opcional pra <icon> à esquerda ou direita (z-index acima do shine)' },
        { part: 'via-btn__label', description: 'Texto principal · sentence-case · peso 500' },
        { part: 'via-btn__spinner', description: 'Spinner currentColor exibido quando `loading={true}` (substitui ícone)' },
        { part: '::after (shine sweep)', description: 'Pseudo-element com gradient branco diagonal · transla -120% → 120% em hover' },
      ]}
      props={[
        { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'destructive' | 'accent'", default: "'primary'", description: 'Tom visual do botão. Primary é o CTA principal (1 por section)' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamanho · sm=7px×14px / md=10px×18px / lg=13px×24px' },
        { name: 'iconLeft', type: 'ReactNode', description: 'Ícone à esquerda do label · use Lucide stroke 1.8-2' },
        { name: 'iconRight', type: 'ReactNode', description: 'Ícone à direita · padrão CTA com ArrowRight' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Exibe spinner e desabilita interação · mantém width' },
        { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Ocupa 100% do container pai (formulários, mobile)' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Texto do botão · sentence-case · evite caps lock' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Estado bloqueado · opacity 0.6 · cursor not-allowed' },
        { name: '...rest', type: 'ButtonHTMLAttributes', description: 'Todos os atributos HTML <button> são aceitos (onClick, type, aria-*)' },
      ]}
      variants={[
        { name: 'primary', label: 'Navy gradient', description: 'CTA principal · gradient navy + inset highlight + drop shadow navy-40' },
        { name: 'secondary', label: 'Glass white', description: 'CTA secundário · glass blur 16 + border white 96% + inset highlight' },
        { name: 'ghost', label: 'Transparent', description: 'Ação terciária · hover ganha glass blur 8 navy-06' },
        { name: 'destructive', label: 'Coral hover', description: 'Apaga · transparent default · coral gradient + drop shadow no hover' },
        { name: 'accent', label: 'Acento editorial', description: 'Acento singular · gradient accent + inset · 1 uso por section MAX' },
      ]}
      sizes={[
        { name: 'sm', label: '32px altura', description: 'Botões secundários em listas, table actions, chip-like' },
        { name: 'md', label: '40px altura', description: 'Padrão · use em forms, cards, ações principais inline' },
        { name: 'lg', label: '48px altura', description: 'Hero CTA · landing page · momento de peso' },
      ]}
      examples={[
        {
          title: 'CTA primário com ícone',
          description: 'Padrão hero · primary navy + ArrowRight + sentence-case.',
          preview: (
            <Button variant="primary" size="lg" iconRight={<ArrowRight size={14} strokeWidth={2.5} />}>
              Começar agora
            </Button>
          ),
          code: `<Button variant="primary" size="lg" iconRight={<ArrowRight size={14} strokeWidth={2.5} />}>
  Começar agora
</Button>`,
        },
        {
          title: 'Secondary + ghost lado-a-lado',
          description: 'Padrão de hero com 2 ações · primary à esquerda, ghost à direita.',
          preview: (
            <>
              <Button variant="secondary" iconLeft={<Mail size={14} strokeWidth={1.8} />}>Continuar com email</Button>
              <Button variant="ghost">Voltar</Button>
            </>
          ),
          code: `<Button variant="secondary" iconLeft={<Mail size={14} strokeWidth={1.8} />}>
  Continuar com email
</Button>
<Button variant="ghost">Voltar</Button>`,
        },
        {
          title: 'Destructive · cancelar plano',
          description: 'Ação destrutiva real · começa transparent + coral border, vira coral gradient no hover.',
          preview: (
            <Button variant="destructive" iconLeft={<Trash2 size={14} strokeWidth={1.8} />}>
              Cancelar inscrição
            </Button>
          ),
          code: `<Button variant="destructive" iconLeft={<Trash2 size={14} strokeWidth={1.8} />}>
  Cancelar inscrição
</Button>`,
        },
        {
          title: 'Loading state',
          description: 'Spinner substitui ícone · mantém label esmaecido pra preservar width.',
          preview: <Button variant="primary" loading>Pausar conta</Button>,
          code: `<Button variant="primary" loading>Pausar conta</Button>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use sentence-case · "Começar agora"', description: 'Padrão editorial. Maiúscula só na primeira letra.' },
          dont: { title: 'Não use "COMEÇAR AGORA" caps lock', description: 'Cliché bootstrap · viola tipografia editorial · letterspacing alto.' },
        },
        {
          do: { title: 'Primary 1 vez por section', description: 'Hierarquia clara · usuário sabe onde clicar.' },
          dont: { title: 'Não use 3+ primary lado-a-lado', description: 'Compete por atenção · paralisa decisão · viola hierarquia.' },
        },
        {
          do: { title: 'iconRight com ArrowRight em CTA direcional', description: 'Sinaliza "próximo passo" · spacing 7px automático.' },
          dont: { title: 'Não use ícone só decorativo sem semântica', description: 'Aumenta ruído · perde peso editorial.' },
        },
      ]}
      a11y={[
        <>Renderiza <code>&lt;button&gt;</code> nativo · todos atributos HTML aceitos (<code>aria-label</code>, <code>type</code>, etc)</>,
        <>Focus-visible com ring editorial (white + navy-40) · keyboard nav garantido</>,
        <>Loading state: <code>aria-busy="true"</code> + pointer-events:none · screen reader anuncia</>,
        <>Disabled: <code>aria-disabled="true"</code> · cursor not-allowed · não recebe focus</>,
        <>Touch target ≥ 32px (sm) / 40px (md) / 48px (lg) · WCAG 2.5.5 AAA</>,
        <>Contraste AA garantido em todas as variants em fundo branco e navy</>,
      ]}
      related={[
        { name: 'Pill', description: 'Chip não-clicável pra metadata · mesma forma pill 999', href: '/api/pill' },
        { name: 'DropdownMenu', description: 'Botão que dispara menu de ações', href: '/api/dropdown-menu' },
        { name: 'Tooltip', description: 'Adicionar dica contextual no botão ícone-only', href: '/api/tooltip' },
      ]}
    />
  );
}
