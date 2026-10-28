import { useEffect, useRef, useState } from 'react';
import './docs.css';
import './component-doc.css'; // botão Copiar + texto só pra leitor de tela

type Props = { children: string };
type Status = 'idle' | 'copied' | 'failed';

const ANNOUNCE: Record<Status, string> = {
  idle: '',
  copied: 'Copiado',
  failed: 'Não foi possível copiar · código selecionado, use Cmd+C ou Ctrl+C',
};

export default function CodeBlock({ children }: Props) {
  const text = children.trim();
  const [status, setStatus] = useState<Status>('idle');
  const codeRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      // sem permissão de área de transferência: deixa o código selecionado pra copiar à mão
      const range = document.createRange();
      if (codeRef.current) range.selectNodeContents(codeRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      setStatus('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 2500);
  }

  return (
    <div className="vds-codeblock">
      <code ref={codeRef} className="vds-code">{text}</code>
      <button type="button" className="via-pill-link vds-codeblock-copy" onClick={copy}>
        {status === 'copied' ? 'Copiado' : status === 'failed' ? 'Selecionado' : <>Copiar <span className="vds-cdoc-sr">código</span></>}
      </button>
      <span className="vds-cdoc-sr" role="status" aria-live="polite">
        {ANNOUNCE[status]}
      </span>
    </div>
  );
}
