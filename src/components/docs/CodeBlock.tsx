import './docs.css';

type Props = { children: string };

export default function CodeBlock({ children }: Props) {
  return <code className="vds-code">{children.trim()}</code>;
}
