import { describe, it, expect } from 'vitest';
import { tokens, tokensList } from './tokens';

// tokens.ts é gerado de src/styles/tokens.css (scripts/build-tokens.mjs).
// O export JS tem que carregar o valor PADRÃO (claro) — nunca o override
// de [data-theme="dark"] nem dos @media de acessibilidade.
describe('tokens gerados', () => {
  it('exporta o valor claro, não o do tema escuro', () => {
    expect(tokens['via-bg']).toBe('var(--via-white)');
    expect(tokens['via-surface']).toBe('var(--via-white)');
    expect(tokens['via-gray-50']).toBe('#F7F8FA');
    expect(tokens['via-navy-04']).toBe('rgba(10, 31, 59, 0.04)');
  });

  it('não vaza o override de prefers-reduced-transparency', () => {
    expect(tokens['via-glass-blur']).toBe('blur(24px) saturate(175%)');
    expect(tokens['via-glass-blur-bar']).toBe('blur(26px) saturate(185%)');
  });

  it('inclui os half-steps da escala de espaçamento', () => {
    expect(tokens['via-space-0_5']).toBe('2px');
    expect(tokens['via-space-5_5']).toBe('22px');
  });

  it('não tem nome duplicado', () => {
    const names = tokensList.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
