import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Sheet } from '../../lib/Sheet/Sheet';
import './showcase-menu.css';

/* Menu móvel das páginas-modelo.
   Abaixo do breakpoint de cada página a <nav> some; sem isto o celular ficava
   sem como navegar. O gatilho mostra a seção atual (pill com seta), não um
   hambúrguer — o shell do site já tem um à esquerda e dois confundiriam.
   Fica escondido por padrão: cada página liga `.vds-scm-trigger` no MESMO
   media query em que esconde a própria nav. */

export interface ShowcaseMenuItem {
  label: string;
  href?: string;
  active?: boolean;
}

export default function ShowcaseMenu({ items, title = 'Navegar' }: { items: ShowcaseMenuItem[]; title?: string }) {
  const [open, setOpen] = useState(false);
  const current = items.find((i) => i.active);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="vds-scm-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {current ? current.label : 'Menu'}
        <ChevronDown size={14} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <Sheet open={open} onClose={close} title={title}>
        <ul className="vds-scm-list">
          {items.map((item) => {
            const content = (
              <>
                {item.label}
                {item.active && <Check size={16} strokeWidth={1.75} aria-hidden="true" />}
              </>
            );
            return (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="vds-scm-link"
                    aria-current={item.active ? 'page' : undefined}
                    onClick={close}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="vds-scm-link"
                    aria-current={item.active ? 'page' : undefined}
                    onClick={close}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Sheet>
    </>
  );
}
