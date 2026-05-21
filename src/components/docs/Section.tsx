import './docs.css';

type Props = {
  id?: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
};

export default function Section({ id, title, meta, children }: Props) {
  return (
    <section id={id} className="vds-section">
      <div className="vds-section-header">
        <h2 className="vds-section-title">{title}</h2>
        {meta && <span className="vds-section-meta">{meta}</span>}
      </div>
      <div className="vds-section-body">{children}</div>
    </section>
  );
}
