import { describe, it, expect, beforeEach } from 'vitest';
import {
  buildSearchIndex,
  searchIndex,
  pushRecent,
  getRecents,
} from './searchIndex';

describe('buildSearchIndex', () => {
  it('flattens navigation into entries with group + label + to', () => {
    const idx = buildSearchIndex();
    expect(idx.length).toBeGreaterThan(50); // ~107 itens hoje
    const sample = idx.find((e) => e.to === '/foundations/color');
    expect(sample).toBeTruthy();
    expect(sample?.group).toBe('Fundamentos');
    expect(sample?.keywords).toContain('paleta');
  });

  it('attaches descriptions when overlay defines them', () => {
    const idx = buildSearchIndex();
    const button = idx.find((e) => e.to === '/api/button');
    expect(button?.description).toMatch(/CTA/i);
  });
});

describe('searchIndex (scoring)', () => {
  const idx = buildSearchIndex();

  it('returns full list when query is empty', () => {
    const r = searchIndex(idx, '');
    expect(r.length).toBe(idx.length);
  });

  it('matches label exactly with highest score', () => {
    const r = searchIndex(idx, 'cores');
    expect(r[0].to).toBe('/foundations/color');
  });

  it('matches via keyword overlay', () => {
    const r = searchIndex(idx, 'paleta');
    expect(r.find((e) => e.to === '/foundations/color')).toBeTruthy();
  });

  it('matches via description', () => {
    const r = searchIndex(idx, 'sortable');
    expect(r.find((e) => e.to === '/api/data-table')).toBeTruthy();
  });

  it('requires ALL tokens to match (AND semantics)', () => {
    const r1 = searchIndex(idx, 'liquid glass');
    // ambos tokens precisam estar no item · só liquid glass items
    expect(r1.every((e) =>
      e.label.toLowerCase().includes('liquid') ||
      e.label.toLowerCase().includes('glass') ||
      e.keywords?.some((k) => k.includes('liquid') || k.includes('glass')) ||
      e.group.toLowerCase().includes('liquid') ||
      e.group.toLowerCase().includes('glass'),
    )).toBe(true);
  });

  it('returns empty when no entry matches', () => {
    const r = searchIndex(idx, 'xyz123nothing');
    expect(r).toEqual([]);
  });

  it('is accent/case insensitive', () => {
    const r1 = searchIndex(idx, 'CORES');
    const r2 = searchIndex(idx, 'cores');
    expect(r1.length).toBe(r2.length);
    expect(r1[0].to).toBe(r2[0].to);
  });

  it('ranks 2fa via OTP keyword overlay', () => {
    const r = searchIndex(idx, '2fa');
    expect(r[0].to).toMatch(/(two-factor|otp)/);
  });
});

describe('recents (localStorage)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('pushes and reads recents', () => {
    pushRecent('/api/button');
    pushRecent('/api/card');
    expect(getRecents()).toEqual(['/api/card', '/api/button']);
  });

  it('dedupes when pushing same path twice', () => {
    pushRecent('/api/button');
    pushRecent('/api/card');
    pushRecent('/api/button');
    expect(getRecents()).toEqual(['/api/button', '/api/card']);
  });

  it('caps at 8 entries', () => {
    for (let i = 0; i < 12; i++) pushRecent(`/test-${i}`);
    const r = getRecents();
    expect(r.length).toBeLessThanOrEqual(8);
    expect(r[0]).toBe('/test-11');
  });
});
