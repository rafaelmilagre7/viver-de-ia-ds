/* ============================================
   Formatação de número · pt-BR · fonte única
   --------------------------------------------
   Todo número que aparece na interface passa por aqui, pra
   moeda, milhar, percentual e variação saírem iguais em
   qualquer tela:

   · moeda      R$ 1.325.000   (espaço inseparável depois de R$)
   · compacto   R$ 1,33 mi · 184 mil · 1,2 bi   (nunca K, k ou M)
   · percentual 99,8%          (vírgula decimal)
   · variação   +8,2% · −1,2 p.p. · −R$ 4.200   (sinal sempre explícito)
   · negativo   −5.680         (menos tipográfico U+2212, nunca hífen)

   Compacto usa 3 algarismos significativos (1.325.000 → 1,33 mi;
   184.000 → 184 mil). Abaixo de 10 mil o número sai inteiro
   (R$ 4.200, não R$ 4,2 mil): abreviar não economiza nada ali.
   ============================================ */

const LOCALE = 'pt-BR';

/** Sinal de menos tipográfico (U+2212). O Intl devolve hífen (U+002D). */
export const MINUS = '−';
const NBSP = ' ';
const COMPACT_FROM = 10_000;

export interface FormatOptions {
  /** Casas decimais fixas. Sem isso: até 2 em número, até 1 em percentual, 0 em moeda. */
  decimals?: number;
}

export interface CurrencyOptions extends FormatOptions {
  /** Abrevia em mil/mi/bi a partir de 10 mil. */
  compact?: boolean;
}

export type DeltaUnit = 'number' | 'percent' | 'points' | 'currency';

export interface DeltaOptions extends CurrencyOptions {
  /** percent: +8,2% · points: −1,2 p.p. · currency: −R$ 4.200 · number: +24 */
  unit?: DeltaUnit;
}

const digits = (decimals: number | undefined, defaultMax: number) =>
  decimals === undefined
    ? { minimumFractionDigits: 0, maximumFractionDigits: defaultMax }
    : { minimumFractionDigits: decimals, maximumFractionDigits: decimals };

const BRL: Intl.NumberFormatOptions = { style: 'currency', currency: 'BRL' };

function intl(value: number, options: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(LOCALE, options).format(value).replace(/-/g, MINUS);
}

function compactOrFull(
  value: number,
  base: Intl.NumberFormatOptions,
  full: Intl.NumberFormatOptions,
): string {
  if (Math.abs(value) < COMPACT_FROM) return intl(value, { ...base, ...full });
  return intl(value, { ...base, notation: 'compact', maximumSignificantDigits: 3 });
}

/** 1325000 → "1.325.000" · 3.9 → "3,9" · −5680 → "−5.680" */
export function formatNumber(value: number, { decimals }: FormatOptions = {}): string {
  return intl(value, digits(decimals, 2));
}

/** 1325000 → "R$ 1.325.000" · com compact → "R$ 1,33 mi" */
export function formatCurrency(value: number, { decimals, compact }: CurrencyOptions = {}): string {
  const full = digits(decimals, 0);
  return compact ? compactOrFull(value, BRL, full) : intl(value, { ...BRL, ...full });
}

/** 184000 → "184 mil" · 1325000 → "1,33 mi" · 2400 → "2.400" */
export function formatCompact(value: number): string {
  return compactOrFull(value, {}, digits(undefined, 2));
}

/** Recebe pontos percentuais: 99.8 → "99,8%" · 94 → "94%" */
export function formatPercent(value: number, { decimals }: FormatOptions = {}): string {
  return intl(value / 100, { style: 'percent', ...digits(decimals, 1) });
}

/**
 * Variação com sinal sempre explícito (zero fica sem sinal).
 * 8.2 → "+8,2%" · −1.2 pontos → "−1,2 p.p." · −4200 em reais → "−R$ 4.200"
 */
export function formatDelta(
  value: number,
  { unit = 'number', decimals, compact }: DeltaOptions = {},
): string {
  const signed: Intl.NumberFormatOptions = { signDisplay: 'exceptZero' };
  switch (unit) {
    case 'percent':
      return intl(value / 100, { ...signed, style: 'percent', ...digits(decimals, 1) });
    case 'points':
      return `${intl(value, { ...signed, ...digits(decimals, 1) })}${NBSP}p.p.`;
    case 'currency': {
      const full = digits(decimals, 0);
      return compact ? compactOrFull(value, { ...BRL, ...signed }, full) : intl(value, { ...BRL, ...signed, ...full });
    }
    default: {
      const full = digits(decimals, 2);
      return compact ? compactOrFull(value, signed, full) : intl(value, { ...signed, ...full });
    }
  }
}
