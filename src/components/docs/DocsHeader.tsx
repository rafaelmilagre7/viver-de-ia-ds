import './docs.css';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
};

export default function DocsHeader({ eyebrow, title, lede }: Props) {
  return (
    <header className="vds-docs-header">
      <p className="vds-eyebrow">{eyebrow}</p>
      <h1 className="vds-docs-title">{title}</h1>
      {lede && <p className="vds-docs-lede">{lede}</p>}
    </header>
  );
}
