import { describe, it, expect } from 'vitest';
import { microcopy, MICROCOPY_GROUPS, microcopyMarkdown } from './microcopy';
import skillMirror from '../../plugins/viver-de-ia/skills/viver-de-ia-design/microcopy.md?raw';

// A biblioteca é o exemplo que o time e as IAs copiam — ela própria
// tem que passar nas regras de voz que prega.
describe('biblioteca de microcopy', () => {
  it('ids únicos e todo grupo com pelo menos 1 texto', () => {
    const ids = microcopy.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const g of MICROCOPY_GROUPS) {
      expect(microcopy.some((m) => m.grupo === g.id), g.id).toBe(true);
    }
  });

  it('"você": nenhum tu/teu/tua/teus/tuas/contigo no texto', () => {
    const tu = /(?<!\p{L})(tu|teu|tua|teus|tuas|contigo)(?!\p{L})/iu;
    for (const m of microcopy) expect(m.texto, m.id).not.toMatch(tu);
  });

  it('sem exclamação, emoji, caps lock ou muleta ("com sucesso", "por favor", "ops")', () => {
    for (const m of microcopy) {
      expect(m.texto, m.id).not.toMatch(/!/);
      expect(m.texto, m.id).not.toMatch(/\p{Extended_Pictographic}/u);
      expect(m.texto, m.id).not.toMatch(/\b[A-ZÀ-Ý]{4,}\b/u);
      expect(m.texto, m.id).not.toMatch(/com sucesso|por favor|\bops\b|\boops\b/i);
    }
  });

  it('botões: até 3 palavras, sentence case', () => {
    for (const m of microcopy.filter((x) => x.grupo === 'botoes')) {
      expect(m.texto.split(/\s+/).length, m.id).toBeLessThanOrEqual(3);
      expect(m.texto[0], m.id).toBe(m.texto[0].toUpperCase());
      expect(m.texto.slice(1), m.id).toBe(m.texto.slice(1).toLowerCase());
    }
  });

  it('microcopy.md da skill espelha a fonte (rode `bun scripts/build-microcopy-md.mjs`)', () => {
    expect(skillMirror).toBe(microcopyMarkdown());
  });
});
