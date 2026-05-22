import { useState } from 'react';
import { ColorPicker } from '../../lib/ColorPicker/ColorPicker';
import ComponentDoc from '../../components/docs/ComponentDoc';

function ColorPickerDemo() {
  const [color, setColor] = useState('#0A1F3B');
  return (
    <ColorPicker
      label="Cor de destaque"
      value={color}
      onChange={setColor}
      allowCustom
    />
  );
}

export default function ApiColorPicker() {
  return (
    <ComponentDoc
      eyebrow="api · color-picker"
      name="ColorPicker"
      headline="paleta canônica Viver de IA · hex livre opcional"
      description="ColorPicker pra escolha de cor de marca. Paleta default = 12 swatches canônicos do Viver de IA (navy/blue/gray/coral · NUNCA gold/yellow/purple). allowCustom permite hex livre. Use pra branding workflows internos."
      importLine={`import { ColorPicker, type ColorPickerProps, type ColorSwatch } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-color-picker', description: 'Container · label + swatches grid + custom input' },
        { part: 'via-color-picker__swatch', description: 'Quadrado 36×36 · border-radius 8 · hover ring' },
        { part: 'via-color-picker__current', description: 'Swatch selecionado · ring navy + check' },
        { part: 'via-color-picker__custom', description: 'Input hex · #RRGGBB · validação ao blur' },
      ]}
      props={[
        { name: 'value', type: 'string', description: 'Cor selecionada (hex) · "#0A1F3B"' },
        { name: 'onChange', type: '(hex: string) => void', description: 'Callback ao escolher · sempre hex válido' },
        { name: 'palette', type: 'ColorSwatch[]', description: 'Paleta custom · default = 12 swatches Viver de IA' },
        { name: 'label', type: 'string', description: 'Label visível' },
        { name: 'allowCustom', type: 'boolean', default: 'true', description: 'Mostra input hex livre' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueado' },
      ]}
      sizes={[
        { name: 'ColorSwatch.hex', label: 'string · obrigatório', description: 'Hex da cor · "#0A1F3B"' },
        { name: 'ColorSwatch.name', label: 'string · obrigatório', description: 'Nome editorial · "Navy · marca"' },
      ]}
      examples={[
        {
          title: 'Paleta canônica · allowCustom=true',
          preview: <ColorPickerDemo />,
          code: `const [color, setColor] = useState('#0A1F3B');

<ColorPicker
  label="Cor de destaque"
  value={color}
  onChange={setColor}
  allowCustom
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use paleta default em ferramentas de marca', description: '12 swatches canônicos · força consistência cromática · sem gold/yellow.' },
          dont: { title: 'Não use ColorPicker em UI pública', description: 'Paleta restrita é interna · user escolher cor random vira inconsistência visual.' },
        },
        {
          do: { title: 'allowCustom=false em workflows críticos', description: 'Templates de email/logo · só paleta brand permitida.' },
          dont: { title: 'Não exponha gold/yellow/purple', description: 'Paleta Viver de IA é RESTRITA · qualquer adição quebra contrato.' },
        },
      ]}
      a11y={[
        <>Per-swatch role=radio + aria-checked + aria-label="{name}"</>,
        <>Keyboard arrow esq/dir/cima/baixo navega · Enter/Space seleciona</>,
        <>Custom input com aria-label "Hex personalizado" + aria-invalid quando inválido</>,
        <>Contraste swatch testado AA contra background editorial</>,
      ]}
      related={[
        { name: 'Foundations · Color', description: 'Paleta canônica Viver de IA · 12 swatches', href: '/foundations/color' },
        { name: 'Icon · surface', description: 'Tile com cor de marca · use em decoração', href: '/api/icon' },
      ]}
    />
  );
}
