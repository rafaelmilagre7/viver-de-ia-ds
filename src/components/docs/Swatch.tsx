import './docs.css';

type Props = {
  name: string;
  hex: string;
  token?: string;
  border?: boolean;
};

export default function Swatch({ name, hex, token, border = false }: Props) {
  return (
    <div className="vds-swatch">
      <div
        className="vds-swatch-tile"
        style={{
          background: hex,
          border: border ? '0.5px solid rgba(10,31,59,0.12)' : '0.5px solid transparent',
        }}
      />
      <div className="vds-swatch-meta">
        <span className="vds-swatch-name">{name}</span>
        <span className="vds-swatch-hex">{hex.toUpperCase()}</span>
        {token && <span className="vds-swatch-token">{token}</span>}
      </div>
    </div>
  );
}
