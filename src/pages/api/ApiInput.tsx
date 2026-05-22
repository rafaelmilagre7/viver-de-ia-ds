import { Mail, Search } from 'lucide-react';
import { Input } from '../../lib/Input/Input';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiInput() {
  return (
    <ComponentDoc
      eyebrow="api · input"
      name="Input"
      headline="liquid glass · focus underline animado · ícone reativo"
      description="Campo de texto editorial. Glass underlay com blur 12px · focus underline expansão centro→bordas com gradient navy→blue · ícone à esquerda ganha color navy no focus · placeholder fade pro gray-400 no focus. 3 sizes, error/success states, mensagem hint."
      importLine={`import { Input, type InputProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-input-wrap', description: 'Container externo · label + field + msg vertical stack' },
        { part: 'via-input__label', description: 'Label peso 500 12px · cor navy · letterspacing -0.006em' },
        { part: 'via-input', description: 'Field wrapper · glass + border + spring focus' },
        { part: 'via-input__icon', description: 'Slot icon-left · cor ink-3 default → navy no focus' },
        { part: '::after (underline)', description: 'Gradient navy→blue bottom · expande 50%→8% no focus' },
        { part: 'via-input__msg', description: 'Hint/erro abaixo · 11px ink-3 (ou coral-dark em error)' },
      ]}
      props={[
        { name: 'label', type: 'string', description: 'Label visível acima do field' },
        { name: 'hint', type: 'string', description: 'Mensagem abaixo do field · hint editorial' },
        { name: 'error', type: 'string', description: 'Mensagem de erro (substitui hint) · borda + underline coral' },
        { name: 'iconLeft', type: 'ReactNode', description: 'Ícone à esquerda · Lucide stroke 1.8' },
        { name: 'iconRight', type: 'ReactNode', description: 'Ícone à direita · útil pra clear button, search' },
        { name: 'variant', type: "'default'", default: "'default'", description: 'Variant visual · reservado pra extensões futuras' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Padding do field · sm=7×11 / md=10×14 / lg=13×16' },
        { name: '...rest', type: 'InputHTMLAttributes', description: 'Aceita todos atributos <input> (type, placeholder, value, onChange, etc)' },
      ]}
      sizes={[
        { name: 'sm', label: '32px altura', description: 'Use em filtros, search inline, table cells' },
        { name: 'md', label: '40px altura', description: 'Padrão · forms gerais, settings' },
        { name: 'lg', label: '48px altura', description: 'Hero email capture · momento de peso' },
      ]}
      examples={[
        {
          title: 'Email com ícone',
          preview: (
            <Input
              label="E-mail"
              type="email"
              placeholder="você@empresa.com"
              iconLeft={<Mail size={14} strokeWidth={1.8} />}
              hint="Use email corporativo se possível"
            />
          ),
          code: `<Input
  label="E-mail"
  type="email"
  placeholder="você@empresa.com"
  iconLeft={<Mail size={14} strokeWidth={1.8} />}
  hint="Use email corporativo se possível"
/>`,
        },
        {
          title: 'Search standalone (sem label)',
          preview: (
            <Input
              size="sm"
              type="search"
              placeholder="Buscar fundamentos, componentes…"
              iconLeft={<Search size={13} strokeWidth={1.8} />}
            />
          ),
          code: `<Input
  size="sm"
  type="search"
  placeholder="Buscar fundamentos, componentes…"
  iconLeft={<Search size={13} strokeWidth={1.8} />}
/>`,
        },
        {
          title: 'Error state',
          preview: (
            <Input
              label="E-mail"
              type="email"
              defaultValue="rafael@"
              error="Email inválido · use formato você@dominio.com"
            />
          ),
          code: `<Input
  label="E-mail"
  type="email"
  error="Email inválido · use formato você@dominio.com"
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Sempre forneça label visível', description: 'Acessibilidade + scanabilidade · usuário sabe o que digitar.' },
          dont: { title: 'Não use só placeholder como label', description: 'Some quando user começa a digitar · acessibilidade pobre.' },
        },
        {
          do: { title: 'Use hint constante pra dicas curtas', description: 'Mantém densidade editorial · usuário não precisa adivinhar.' },
          dont: { title: 'Não use tooltip pra info crítica', description: 'Em mobile não tem hover · perde acessibilidade.' },
        },
      ]}
      a11y={[
        <>Label conectada via <code>htmlFor</code> automaticamente (id gerado se omisso)</>,
        <>Hint conectada via <code>aria-describedby</code></>,
        <>Error state: <code>aria-invalid="true"</code> + <code>role="alert"</code> no hint</>,
        <>Focus ring 3-stack · WCAG AA contrast garantido em light e dark mode</>,
        <>Suporta autocomplete, inputmode, pattern · forward de todos atributos HTML</>,
      ]}
      related={[
        { name: 'Select', description: 'Mesma estética com options pré-definidas', href: '/api/select' },
        { name: 'Combobox', description: 'Input + search filterable dentro de dropdown', href: '/api/combobox' },
        { name: 'TagInput', description: 'Input que vira chips · multi-valor', href: '/api/tag-input' },
      ]}
    />
  );
}
