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
    // os 4 materiais exportam o blur claro, nunca o `none` do modo sem transparência
    expect(tokens['via-material-chrome-blur']).toBe('blur(24px) saturate(180%)');
    expect(tokens['via-material-regular-blur']).toBe('blur(24px) saturate(170%)');
    expect(tokens['via-material-thick-blur']).toBe('blur(32px) saturate(160%)');
    expect(tokens['via-material-control-blur']).toBe('blur(12px) saturate(170%)');
    // nem o valor do escuro (que escurece: brightness < 1)
    expect(tokens['via-material-regular-blur']).not.toContain('brightness');
  });

  it('mantém os nomes antigos do vidro como apelido do material certo', () => {
    expect(tokens['via-glass-blur']).toBe('var(--via-material-regular-blur)');
    expect(tokens['via-glass-blur-bar']).toBe('var(--via-material-chrome-blur)');
    expect(tokens['via-glass-card']).toBe('var(--via-material-regular-fill)');
    expect(tokens['via-glass-bar']).toBe('var(--via-material-chrome-fill)');
    expect(tokens['via-glass-ring']).toBe('var(--via-material-regular-ring)');
    expect(tokens['via-glass-shadow']).toBe('var(--via-material-regular-shadow)');
    expect(tokens['via-glass-shadow-lift']).toBe('var(--via-material-regular-lift)');
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
