import { describe, it, expect } from 'vitest';
import { MINUS, formatCompact, formatCurrency, formatDelta, formatNumber, formatPercent } from './format';

const NBSP = ' ';

describe('formatador pt-BR', () => {
  it('moeda: espaço inseparável depois de R$ e ponto no milhar', () => {
    expect(formatCurrency(1_325_000)).toBe(`R$${NBSP}1.325.000`);
    expect(formatCurrency(1_250, { decimals: 2 })).toBe(`R$${NBSP}1.250,00`);
    expect(formatCurrency(1_325_000)).not.toContain('R$ '); // espaço comum quebra a linha entre R$ e o número
  });

  it('compacto: mil/mi/bi com 3 algarismos significativos, nunca K/k/M', () => {
    expect(formatCurrency(1_325_000, { compact: true })).toBe(`R$${NBSP}1,33${NBSP}mi`);
    expect(formatCurrency(1_840_000, { compact: true })).toBe(`R$${NBSP}1,84${NBSP}mi`);
    expect(formatCompact(184_000)).toBe(`184${NBSP}mil`);
    expect(formatCompact(12_400)).toBe(`12,4${NBSP}mil`);
    expect(formatCompact(1_200_000_000)).toBe(`1,2${NBSP}bi`);
    expect(formatCompact(999_999)).toBe(`1${NBSP}mi`);
    for (const v of [12_400, 184_000, 1_325_000, 5_090_000, 1_200_000_000]) {
      expect(formatCompact(v)).not.toMatch(/\d\s?[KkMB]\b/);
    }
  });

  it('compacto: abaixo de 10 mil o número sai inteiro', () => {
    expect(formatCurrency(4_200, { compact: true })).toBe(`R$${NBSP}4.200`);
    expect(formatCompact(2_400)).toBe('2.400');
  });

  it('percentual com vírgula decimal', () => {
    expect(formatPercent(99.8)).toBe('99,8%');
    expect(formatPercent(99.96, { decimals: 2 })).toBe('99,96%');
    expect(formatPercent(94)).toBe('94%');
    expect(formatPercent(3, { decimals: 1 })).toBe('3,0%');
  });

  it('negativo usa o menos tipográfico (U+2212), nunca hífen', () => {
    expect(MINUS).toBe('−');
    expect(formatNumber(-5_680)).toBe(`${MINUS}5.680`);
    expect(formatCurrency(-32_250)).toBe(`${MINUS}R$${NBSP}32.250`);
    expect(formatPercent(-5.2)).toBe(`${MINUS}5,2%`);
    for (const s of [formatNumber(-1), formatCurrency(-1), formatPercent(-1), formatDelta(-1)]) {
      expect(s).not.toContain('-');
    }
  });

  it('variação: sinal + explícito, zero sem sinal', () => {
    expect(formatDelta(8.2, { unit: 'percent' })).toBe('+8,2%');
    expect(formatDelta(-1.2, { unit: 'points' })).toBe(`${MINUS}1,2${NBSP}p.p.`);
    expect(formatDelta(-4_200, { unit: 'currency' })).toBe(`${MINUS}R$${NBSP}4.200`);
    expect(formatDelta(52_000, { unit: 'currency', compact: true })).toBe(`+R$${NBSP}52${NBSP}mil`);
    expect(formatDelta(24)).toBe('+24');
    expect(formatDelta(0, { unit: 'percent' })).toBe('0%');
    // arredonda pra zero → também sem sinal (nada de "−0,0%")
    expect(formatDelta(-0.04, { unit: 'percent' })).toBe('0%');
  });

  it('número: até 2 casas por padrão, fixas quando pedidas', () => {
    expect(formatNumber(1_325_000)).toBe('1.325.000');
    expect(formatNumber(3.9)).toBe('3,9');
    expect(formatNumber(3, { decimals: 1 })).toBe('3,0');
  });
});
