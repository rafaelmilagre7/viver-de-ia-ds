import { useState } from 'react';
import { Pipette, Check } from 'lucide-react';
import './ColorPicker.css';

export interface ColorSwatch {
  hex: string;
  name: string;
}

export interface ColorPickerProps {
  /** Cor selecionada (controlado) · ex: '#0A1F3B' */
  value?: string;
  onChange?: (hex: string) => void;
  /** Paleta exibida · default = paleta restrita do Viver de IA */
  palette?: ColorSwatch[];
  label?: string;
  /** Permite digitar hex livre · default true */
  allowCustom?: boolean;
  /** Disabled */
  disabled?: boolean;
}

const DEFAULT_PALETTE: ColorSwatch[] = [
  { hex: '#0A1F3B', name: 'Navy · marca' },
  { hex: '#02162A', name: 'Navy deep' },
  { hex: '#1E3A5F', name: 'Blue' },
  { hex: '#2A4A6E', name: 'Blue soft' },
  { hex: '#101828', name: 'Gray 900' },
  { hex: '#344054', name: 'Gray 700' },
  { hex: '#667085', name: 'Gray 500' },
  { hex: '#D0D5DD', name: 'Gray 300' },
  { hex: '#F0F2F5', name: 'Gray 100' },
  { hex: '#F7F8FA', name: 'Gray 50' },
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#B85C5C', name: 'Coral · destrutivo' },
];

/**
 * `<ColorPicker>` · seletor de cor canônica + hex livre
 *
 * Default mostra paleta restrita Viver de IA · permite custom hex.
 * Use pra theming, edição de brand color, etc.
 *
 * @example
 * <ColorPicker
 *   value={brandColor}
 *   onChange={setBrandColor}
 *   palette={customPalette}
 * />
 */
export function ColorPicker({
  value,
  onChange,
  palette = DEFAULT_PALETTE,
  label,
  allowCustom = true,
  disabled = false,
}: ColorPickerProps) {
  const [customHex, setCustomHex] = useState(value || '');

  const selected = palette.find((s) => s.hex.toUpperCase() === (value || '').toUpperCase());

  const select = (hex: string) => {
    if (disabled) return;
    setCustomHex(hex);
    onChange?.(hex);
  };

  const handleCustomChange = (raw: string) => {
    let hex = raw.startsWith('#') ? raw : `#${raw}`;
    hex = hex.toUpperCase().slice(0, 7);
    setCustomHex(hex);
    if (/^#[0-9A-F]{6}$/.test(hex)) {
      onChange?.(hex);
    }
  };

  return (
    <div className={`via-cp${disabled ? ' is-disabled' : ''}`}>
      {label && <label className="via-cp__label">{label}</label>}

      <div className="via-cp__preview">
        <div className="via-cp__swatch" style={{ background: value || palette[0].hex }}>
          <Pipette size={14} strokeWidth={2} />
        </div>
        <div className="via-cp__info">
          <p className="via-cp__name">{selected?.name || 'Customizado'}</p>
          <p className="via-cp__hex">
            <span className="prefix">HEX</span>
            {(value || palette[0].hex).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="via-cp__grid" role="radiogroup" aria-label="Paleta de cores">
        {palette.map((s) => {
          const isSelected = (value || '').toUpperCase() === s.hex.toUpperCase();
          return (
            <button
              key={s.hex}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={s.name}
              title={`${s.name} · ${s.hex}`}
              className={`via-cp__cell${isSelected ? ' is-selected' : ''}`}
              style={{ background: s.hex }}
              onClick={() => select(s.hex)}
              disabled={disabled}
            >
              {isSelected && (
                <Check
                  size={11}
                  strokeWidth={3}
                  style={{ color: s.hex.toUpperCase() === '#FFFFFF' || s.hex === '#F7F8FA' || s.hex === '#F0F2F5' || s.hex === '#D0D5DD' ? '#0A1F3B' : '#FFFFFF' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {allowCustom && (
        <label className="via-cp__custom">
          <span>HEX customizado</span>
          <input
            type="text"
            value={customHex}
            placeholder="#0A1F3B"
            onChange={(e) => handleCustomChange(e.target.value)}
            disabled={disabled}
            maxLength={7}
          />
        </label>
      )}
    </div>
  );
}
