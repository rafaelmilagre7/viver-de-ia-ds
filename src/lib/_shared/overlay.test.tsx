import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Modal } from '../Modal/Modal';
import { Select } from '../Select/Select';
import { MultiSelect } from '../MultiSelect/MultiSelect';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { Popover } from '../Popover/Popover';
import { DatePicker } from '../DatePicker/DatePicker';
import { Sheet } from '../Sheet/Sheet';
import { Lightbox } from '../Lightbox/Lightbox';
import { Drawer } from '../Drawer/Drawer';
import { Anchored } from './Portal';

/* Camada de overlay compartilhada · regressões da auditoria de overlays */

beforeAll(() => {
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
  // jsdom não tem matchMedia (useDragDismiss consulta reduced-motion)
  if (!window.matchMedia) {
    window.matchMedia = ((q: string) => ({
      matches: false,
      media: q,
      addEventListener() {},
      removeEventListener() {},
    })) as unknown as typeof window.matchMedia;
  }
});
afterEach(() => {
  document.body.style.overflow = '';
});

const opts = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
];

describe('pilha de Escape · só a camada do topo fecha', () => {
  const cases: Array<[string, React.ReactNode, () => Promise<void>]> = [
    [
      'Select',
      <Select options={opts} label="Plano" />,
      async () => {
        await userEvent.click(screen.getByRole('combobox', { name: /^Plano/ }));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      },
    ],
    [
      'MultiSelect',
      <MultiSelect options={opts} label="Tags" />,
      async () => {
        await userEvent.click(screen.getByRole('combobox', { name: /^Tags/ }));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      },
    ],
    [
      'DropdownMenu',
      <DropdownMenu trigger={<button>Mais</button>} items={[{ id: 'a', label: 'A' }]} />,
      async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Mais' }));
        expect(screen.getByRole('menu')).toBeInTheDocument();
      },
    ],
    [
      'DatePicker',
      <DatePicker value={null} onChange={() => {}} label="Data" />,
      async () => {
        await userEvent.click(screen.getByRole('combobox', { name: /^Data/ }));
        expect(screen.getByRole('dialog', { name: 'Calendário' })).toBeInTheDocument();
      },
    ],
  ];

  for (const [name, inner, open] of cases) {
    it(`${name} dentro de Modal: ESC fecha o popup e o Modal continua`, async () => {
      const onClose = vi.fn();
      render(
        <Modal open onClose={onClose} title="M">
          {inner}
        </Modal>,
      );
      await open();
      await userEvent.keyboard('{Escape}');
      expect(onClose).not.toHaveBeenCalled();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog', { name: 'Calendário' })).not.toBeInTheDocument();
      // 2º ESC agora é do Modal
      await userEvent.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  }

  it('Popover aberto de dentro de um Modal: ESC fecha só o Popover', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    function P() {
      const [o, setO] = useState(false);
      return (
        <Popover open={o} onOpenChange={setO} trigger={<button onClick={() => setO(true)}>Filtros</button>} label="Filtros">
          conteúdo
        </Popover>
      );
    }
    render(
      <Modal open onClose={onClose} title="M">
        <P />
      </Modal>,
    );
    await user.click(screen.getByRole('button', { name: 'Filtros' }));
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Filtros' })).not.toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
    // foco volta pro trigger do popover (ainda dentro do modal)
    expect(screen.getByRole('button', { name: 'Filtros' })).toHaveFocus();
  });
});

describe('portal no <body>', () => {
  it('Modal declarado dentro de um card com vidro/overflow renderiza no body', () => {
    render(
      <article data-testid="card" style={{ overflow: 'hidden' }}>
        <Modal open onClose={() => {}} title="Dentro do card" />
      </article>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Dentro do card' });
    expect(screen.getByTestId('card')).not.toContainElement(dialog);
    expect(dialog.closest('[data-via-portal]')?.parentElement).toBe(document.body);
  });

  it('lista do Select dentro de um card fica fora dele (não é cortada)', async () => {
    render(
      <article data-testid="card" style={{ overflow: 'hidden' }}>
        <Select options={opts} label="Plano" />
      </article>,
    );
    await userEvent.click(screen.getByRole('combobox', { name: /^Plano/ }));
    const list = screen.getByRole('listbox');
    expect(screen.getByTestId('card')).not.toContainElement(list);
    // caixa ancorada (position: fixed via CSS) filha direta do portal no body
    expect(list.closest('.via-anchor')?.parentElement?.parentElement).toBe(document.body);
  });

  it('SSR: Modal aberto no servidor não quebra nem emite portal', () => {
    const html = renderToString(<Modal open onClose={() => {}} title="SSR" />);
    expect(html).toBe('');
  });
});

describe('trava de scroll contada', () => {
  const noop = () => {};

  it('Sheet aberto de dentro de um Modal: fechar o Sheet mantém a página travada', () => {
    function H({ sheet }: { sheet: boolean }) {
      return (
        <Modal open onClose={noop} title="M">
          <Sheet open={sheet} onClose={noop} title="S">x</Sheet>
        </Modal>
      );
    }
    const { rerender, unmount } = render(<H sheet={false} />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<H sheet />);
    rerender(<H sheet={false} />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('Lightbox idem, e devolve o overflow que a página já tinha', () => {
    document.body.style.overflow = 'clip';
    function H({ lb }: { lb: boolean }) {
      return (
        <Modal open onClose={noop} title="M">
          <Lightbox open={lb} onClose={noop} images={[{ src: 'a.jpg', alt: 'a' }]} />
        </Modal>
      );
    }
    const { rerender, unmount } = render(<H lb={false} />);
    rerender(<H lb />);
    rerender(<H lb={false} />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('clip');
  });
});

describe('trap de foco ignora popups aninhados', () => {
  it('Tab dentro do calendário (portal) de um DatePicker num Drawer não é sequestrado pelo Drawer', async () => {
    const user = userEvent.setup();
    render(
      <Drawer open onClose={() => {}} title="Filtros">
        <DatePicker value={new Date(2026, 4, 14)} onChange={() => {}} label="Data" />
      </Drawer>,
    );
    await user.click(screen.getByRole('combobox', { name: /^Data/ }));
    const cal = screen.getByRole('dialog', { name: 'Calendário' });
    expect(cal).toContainElement(document.activeElement as HTMLElement);
    await user.tab();
    // o Tab seguiu dentro do calendário (botões do rodapé), não voltou pro Drawer
    expect(cal).toContainElement(document.activeElement as HTMLElement);
  });
});

describe('useAnchorPosition · flip/shift', () => {
  const rect = (left: number, top: number, width: number, height: number) =>
    ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON() {} }) as DOMRect;

  function Fixture({ anchor, pop }: { anchor: DOMRect; pop: { x: number; y: number; w: number; h: number } }) {
    const ref = useRef<HTMLSpanElement>(null);
    // Mede o anchor e o popup com retângulos falsos (jsdom não faz layout):
    // o popup fica em (box + x, box + y) com w×h
    const setRects = (box: HTMLElement | null) => {
      if (!box) return;
      box.getBoundingClientRect = () =>
        rect(parseFloat(box.style.left) || 0, parseFloat(box.style.top) || 0, anchor.width, anchor.height);
      const p = box.firstElementChild as HTMLElement;
      p.getBoundingClientRect = () => {
        const b = box.getBoundingClientRect();
        return rect(b.left + pop.x, b.top + pop.y, pop.w, pop.h);
      };
    };
    return (
      <>
        <span
          ref={(el) => {
            ref.current = el;
            if (el) el.getBoundingClientRect = () => anchor;
          }}
        />
        <Anchored anchorRef={ref} z="dropdown">
          <div
            data-testid="pop"
            ref={(el) => {
              if (el) setRects(el.parentElement);
            }}
          />
        </Anchored>
      </>
    );
  }

  const box = () => screen.getByTestId('pop').parentElement as HTMLElement;

  it('cabe embaixo: caixa colada no anchor', () => {
    render(<Fixture anchor={rect(100, 100, 200, 30)} pop={{ x: 0, y: 34, w: 200, h: 120 }} />);
    expect(box().style.top).toBe('100px');
    expect(box().style.left).toBe('100px');
    expect(box().style.width).toBe('200px');
  });

  it('não cabe embaixo mas cabe em cima: vira pra cima (flip)', () => {
    // viewport jsdom: 1024 × 768 · anchor perto do pé
    render(<Fixture anchor={rect(100, 700, 200, 30)} pop={{ x: 0, y: 34, w: 200, h: 120 }} />);
    // em cima: top do popup = 700 - 4 - 120 = 576 → caixa sobe 576 - 734 = -158
    expect(box().style.top).toBe(`${700 - 158}px`);
  });

  it('estoura a direita: desliza pra dentro (shift)', () => {
    render(<Fixture anchor={rect(950, 100, 60, 30)} pop={{ x: 0, y: 34, w: 240, h: 100 }} />);
    // direita máxima = 1024 - 8 → left do popup = 776 → caixa em 776
    expect(box().style.left).toBe('776px');
  });

  it('reposiciona no scroll', () => {
    const anchor = rect(100, 100, 200, 30);
    render(<Fixture anchor={anchor} pop={{ x: 0, y: 34, w: 200, h: 120 }} />);
    Object.assign(anchor, rect(100, 60, 200, 30));
    act(() => {
      fireEvent.scroll(window);
    });
    expect(box().style.top).toBe('60px');
  });
});
