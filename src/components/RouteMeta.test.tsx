import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import RouteMeta from './RouteMeta';

const head = () => ({
  title: document.title,
  description: document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
  canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
  ogUrl: document.head.querySelector('meta[property="og:url"]')?.getAttribute('content'),
  ogTitle: document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'),
});

function at(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <RouteMeta />
    </MemoryRouter>,
  );
  return head();
}

describe('RouteMeta', () => {
  afterEach(() => {
    cleanup();
    document.title = '';
  });

  it('home usa o título da marca e canonical na raiz', () => {
    const m = at('/');
    expect(m.title).toBe('Viver de IA · Design System');
    expect(m.canonical).toBe('https://viver-de-ia-ds.vercel.app/');
    expect(m.ogUrl).toBe(m.canonical);
  });

  it('título sai do rótulo da nav, sem o parêntese', () => {
    const m = at('/patterns/paid-ads');
    expect(m.title).toBe('Paid ads · Viver de IA Design System');
    expect(m.ogTitle).toBe(m.title);
    expect(m.description).toContain('Meta + Google');
    expect(m.canonical).toBe('https://viver-de-ia-ds.vercel.app/patterns/paid-ads');
  });

  it('API docs ganham o sufixo · API', () => {
    expect(at('/api/button').title).toBe('Button · API · Viver de IA Design System');
  });

  it('barra final e maiúsculas não duplicam o canonical', () => {
    const m = at('/Components/Buttons/');
    expect(m.title).toBe('Botões · Viver de IA Design System');
    expect(m.canonical).toBe('https://viver-de-ia-ds.vercel.app/components/buttons');
  });

  it('rota desconhecida não renderiza nada (o NotFound cuida)', () => {
    const m = at('/nao-existe');
    expect(m.canonical).toBeUndefined();
    expect(m.description).toBeUndefined();
  });
});
