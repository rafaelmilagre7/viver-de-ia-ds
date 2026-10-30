import { useEffect, useMemo, useRef, useState } from 'react';
import { highlight, type Lang } from './highlight';
import './docs.css';
import './component-doc.css'; // botão Copiar + texto só pra leitor de tela

type Props = {
  children: string;
  /** Linguagem do realce · sem ela, adivinha pelo conteúdo (TSX, CSS ou bash) */
  lang?: Lang;
};
type Status = 'idle' | 'copied' | 'failed';

const ANNOUNCE: Record<Status, string> = {
  idle: '',
  copied: 'Copiado',
  failed: 'Não foi possível copiar · código selecionado, use Cmd+C ou Ctrl+C',
};

export default function CodeBlock({ children, lang }: Props) {
  const text = children.trim();
  const tokens = useMemo(() => highlight(text, lang), [text, lang]);
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
      <code ref={codeRef} className="vds-code">
        {tokens.map((t, i) =>
          t.kind === 'plain' ? t.text : <span key={i} className={`vds-tok vds-tok--${t.kind}`}>{t.text}</span>,
        )}
      </code>
      <button type="button" className="via-pill-link vds-codeblock-copy" onClick={copy}>
        {status === 'copied' ? 'Copiado' : status === 'failed' ? 'Selecionado' : <>Copiar <span className="vds-cdoc-sr">código</span></>}
      </button>
      <span className="vds-cdoc-sr" role="status" aria-live="polite">
        {ANNOUNCE[status]}
      </span>
    </div>
  );
}
