/**
 * Drift entre o código dos componentes e as 46 páginas /api/*.
 *
 * A tabela de props sai de props.generated.json (scripts/gen-props.mjs). As páginas
 * só fornecem descrições em PT-BR por nome de prop. Este teste barra:
 *   1. props.generated.json desatualizado em relação a src/lib (rode `bun run gen:props`);
 *   2. página sem os dados gerados do próprio componente;
 *   3. descrição pra prop que não existe no código;
 *   4. prop pública própria sem descrição nenhuma (nem na página, nem no JSDoc).
 * Atributos herdados do HTML/React (onClick, aria-*, …) não precisam de descrição.
 */
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import type { ReactNode } from 'react';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import generated from './props.generated.json';
import type { ComponentMeta } from '../../components/docs/ComponentDoc';

type Captured = { meta: ComponentMeta; descriptions: Record<string, ReactNode> };
const store = vi.hoisted(() => ({ last: undefined as Captured | undefined }));

vi.mock('../../components/docs/ComponentDoc', () => ({
  default: (p: { meta: ComponentMeta; descriptions?: Record<string, ReactNode> }) => {
    store.last = { meta: p.meta, descriptions: p.descriptions ?? {} };
    return null;
  },
}));

/**
 * Descrições aceitas antes da prop existir no código (vazio = nenhuma pendente).
 * Quando a prop entrar no código (e o gen:props rodar), tire daqui: o último teste avisa.
 */
const PENDING: Record<string, string[]> = {};

const pages = import.meta.glob<{ default: () => ReactNode }>('./Api*.tsx', { eager: true });
const meta = generated as Record<string, ComponentMeta>;
const byComponent = new Map<string, Captured>();

beforeAll(() => {
  for (const [file, mod] of Object.entries(pages)) {
    store.last = undefined;
    const Page = mod.default;
    render(<Page />);
    if (store.last) byComponent.set(file.replace(/^\.\/Api|\.tsx$/g, ''), store.last);
  }
});

describe('props geradas · drift código × páginas /api', () => {
  it('props.generated.json está em dia com src/lib', () => {
    const script = resolve(__dirname, '../../../scripts/gen-props.mjs');
    expect(() => execFileSync(process.execPath, [script, '--check'], { stdio: 'pipe' })).not.toThrow();
  }, 120_000); // ~1s sozinho; folga pra máquina carregada (o compilador do TS sobe inteiro)

  it('todo componente tem página /api e nenhuma página sobra', () => {
    expect([...byComponent.keys()].sort()).toEqual(Object.keys(meta).sort());
  });

  for (const [dir, m] of Object.entries(meta)) {
    describe(dir, () => {
      const own = new Set(m.props.map((p) => p.name));

      it('a página usa os dados gerados do próprio componente', () => {
        expect(byComponent.get(dir)?.meta.source).toBe(m.source);
      });

      it('não descreve prop que não existe no código', () => {
        const descriptions = byComponent.get(dir)?.descriptions ?? {};
        const ghosts = Object.keys(descriptions).filter((name) => {
          if (own.has(name) || name in m.inherited) return false;
          if (name === '...rest' && m.extends.length > 0) return false;
          return !PENDING[dir]?.includes(name);
        });
        expect(ghosts, `Api${dir}.tsx descreve prop inexistente`).toEqual([]);
      });

      it('toda prop própria tem descrição (página ou JSDoc)', () => {
        const descriptions = byComponent.get(dir)?.descriptions ?? {};
        const missing = m.props.filter((p) => !descriptions[p.name] && !p.description).map((p) => p.name);
        expect(missing, `descreva em Api${dir}.tsx ou no JSDoc`).toEqual([]);
      });

      if (PENDING[dir]) {
        it('lista de pendentes não ficou velha', () => {
          const landed = PENDING[dir].filter((name) => own.has(name));
          expect(landed, 'a prop já existe no código · tire de PENDING').toEqual([]);
        });
      }
    });
  }
});
