/**
 * Design tokens. Auto-generated from src/styles/tokens.css.
 * DO NOT EDIT by hand. Regenerate via `bun run build:tokens`.
 *
 * @example
 *   import { tokens, type TokenName } from '@viverdeia/design-system/tokens';
 *   const navy = tokens['via-navy']; // => '#0A1F3B'
 *   tokens['via-radius-lg'];          // => '16px'
 */

export interface Token {
  /** Token name without the leading '--' (e.g. 'via-navy') */
  name: string;
  /** Full CSS variable name (e.g. '--via-navy') */
  css: string;
  /** Raw literal value as written in tokens.css */
  value: string;
  /** Coarse category for tooling and docs */
  category: 'color' | 'spacing' | 'radius' | 'shadow' | 'font' | 'motion' | 'surface' | 'other';
}

export const tokensList: readonly Token[] = [
  {
    "name": "via-accent",
    "css": "--via-accent",
    "value": "var(--via-navy)",
    "category": "color"
  },
  {
    "name": "via-accent-deep",
    "css": "--via-accent-deep",
    "value": "var(--via-navy-deep)",
    "category": "color"
  },
  {
    "name": "via-accent-light",
    "css": "--via-accent-light",
    "value": "var(--via-gray-300)",
    "category": "color"
  },
  {
    "name": "via-accent-soft",
    "css": "--via-accent-soft",
    "value": "var(--via-gray-300)",
    "category": "color"
  },
  {
    "name": "via-accent-warm",
    "css": "--via-accent-warm",
    "value": "var(--via-text-primary)",
    "category": "color"
  },
  {
    "name": "via-bg",
    "css": "--via-bg",
    "value": "#0B1220",
    "category": "color"
  },
  {
    "name": "via-black",
    "css": "--via-black",
    "value": "#000000",
    "category": "color"
  },
  {
    "name": "via-blue",
    "css": "--via-blue",
    "value": "#1E3A5F",
    "category": "color"
  },
  {
    "name": "via-blue-soft",
    "css": "--via-blue-soft",
    "value": "#2A4A6E",
    "category": "color"
  },
  {
    "name": "via-border",
    "css": "--via-border",
    "value": "rgba(255, 255, 255, 0.18)",
    "category": "color"
  },
  {
    "name": "via-border-hairline",
    "css": "--via-border-hairline",
    "value": "rgba(255, 255, 255, 0.10)",
    "category": "color"
  },
  {
    "name": "via-border-soft",
    "css": "--via-border-soft",
    "value": "rgba(255, 255, 255, 0.12)",
    "category": "color"
  },
  {
    "name": "via-coral",
    "css": "--via-coral",
    "value": "#B85C5C",
    "category": "color"
  },
  {
    "name": "via-coral-dark",
    "css": "--via-coral-dark",
    "value": "#E89B9B",
    "category": "color"
  },
  {
    "name": "via-coral-deep",
    "css": "--via-coral-deep",
    "value": "#A14848",
    "category": "color"
  },
  {
    "name": "via-danger",
    "css": "--via-danger",
    "value": "#B83A3A",
    "category": "color"
  },
  {
    "name": "via-edge-hi",
    "css": "--via-edge-hi",
    "value": "rgba(255, 255, 255, 0.08)",
    "category": "color"
  },
  {
    "name": "via-edge-lo",
    "css": "--via-edge-lo",
    "value": "rgba(255, 255, 255, 0.05)",
    "category": "color"
  },
  {
    "name": "via-gray-100",
    "css": "--via-gray-100",
    "value": "#17213A",
    "category": "color"
  },
  {
    "name": "via-gray-200",
    "css": "--via-gray-200",
    "value": "#E4E7EC",
    "category": "color"
  },
  {
    "name": "via-gray-300",
    "css": "--via-gray-300",
    "value": "#D0D5DD",
    "category": "color"
  },
  {
    "name": "via-gray-400",
    "css": "--via-gray-400",
    "value": "#98A2B3",
    "category": "color"
  },
  {
    "name": "via-gray-50",
    "css": "--via-gray-50",
    "value": "#0F1729",
    "category": "color"
  },
  {
    "name": "via-gray-500",
    "css": "--via-gray-500",
    "value": "#667085",
    "category": "color"
  },
  {
    "name": "via-gray-600",
    "css": "--via-gray-600",
    "value": "#475467",
    "category": "color"
  },
  {
    "name": "via-gray-700",
    "css": "--via-gray-700",
    "value": "#344054",
    "category": "color"
  },
  {
    "name": "via-gray-800",
    "css": "--via-gray-800",
    "value": "#1D2939",
    "category": "color"
  },
  {
    "name": "via-gray-900",
    "css": "--via-gray-900",
    "value": "#101828",
    "category": "color"
  },
  {
    "name": "via-ink-2",
    "css": "--via-ink-2",
    "value": "#B4BBC9",
    "category": "color"
  },
  {
    "name": "via-ink-3",
    "css": "--via-ink-3",
    "value": "#98A2B3",
    "category": "color"
  },
  {
    "name": "via-navy",
    "css": "--via-navy",
    "value": "#0A1F3B",
    "category": "color"
  },
  {
    "name": "via-navy-02",
    "css": "--via-navy-02",
    "value": "rgba(255, 255, 255, 0.025)",
    "category": "color"
  },
  {
    "name": "via-navy-03",
    "css": "--via-navy-03",
    "value": "rgba(255, 255, 255, 0.035)",
    "category": "color"
  },
  {
    "name": "via-navy-04",
    "css": "--via-navy-04",
    "value": "rgba(255, 255, 255, 0.045)",
    "category": "color"
  },
  {
    "name": "via-navy-05",
    "css": "--via-navy-05",
    "value": "rgba(255, 255, 255, 0.055)",
    "category": "color"
  },
  {
    "name": "via-navy-06",
    "css": "--via-navy-06",
    "value": "rgba(255, 255, 255, 0.07)",
    "category": "color"
  },
  {
    "name": "via-navy-08",
    "css": "--via-navy-08",
    "value": "rgba(255, 255, 255, 0.09)",
    "category": "color"
  },
  {
    "name": "via-navy-10",
    "css": "--via-navy-10",
    "value": "rgba(255, 255, 255, 0.11)",
    "category": "color"
  },
  {
    "name": "via-navy-12",
    "css": "--via-navy-12",
    "value": "rgba(255, 255, 255, 0.13)",
    "category": "color"
  },
  {
    "name": "via-navy-14",
    "css": "--via-navy-14",
    "value": "rgba(255, 255, 255, 0.15)",
    "category": "color"
  },
  {
    "name": "via-navy-16",
    "css": "--via-navy-16",
    "value": "rgba(255, 255, 255, 0.17)",
    "category": "color"
  },
  {
    "name": "via-navy-18",
    "css": "--via-navy-18",
    "value": "rgba(255, 255, 255, 0.19)",
    "category": "color"
  },
  {
    "name": "via-navy-20",
    "css": "--via-navy-20",
    "value": "rgba(255, 255, 255, 0.22)",
    "category": "color"
  },
  {
    "name": "via-navy-22",
    "css": "--via-navy-22",
    "value": "rgba(255, 255, 255, 0.24)",
    "category": "color"
  },
  {
    "name": "via-navy-25",
    "css": "--via-navy-25",
    "value": "rgba(255, 255, 255, 0.28)",
    "category": "color"
  },
  {
    "name": "via-navy-30",
    "css": "--via-navy-30",
    "value": "rgba(255, 255, 255, 0.32)",
    "category": "color"
  },
  {
    "name": "via-navy-40",
    "css": "--via-navy-40",
    "value": "rgba(255, 255, 255, 0.42)",
    "category": "color"
  },
  {
    "name": "via-navy-60",
    "css": "--via-navy-60",
    "value": "rgba(255, 255, 255, 0.55)",
    "category": "color"
  },
  {
    "name": "via-navy-80",
    "css": "--via-navy-80",
    "value": "rgba(255, 255, 255, 0.72)",
    "category": "color"
  },
  {
    "name": "via-navy-darker",
    "css": "--via-navy-darker",
    "value": "#010B1A",
    "category": "color"
  },
  {
    "name": "via-navy-deep",
    "css": "--via-navy-deep",
    "value": "#02162A",
    "category": "color"
  },
  {
    "name": "via-stage-1",
    "css": "--via-stage-1",
    "value": "#131C30",
    "category": "color"
  },
  {
    "name": "via-stage-2",
    "css": "--via-stage-2",
    "value": "#0B1220",
    "category": "color"
  },
  {
    "name": "via-stage-soft",
    "css": "--via-stage-soft",
    "value": "#1B273F",
    "category": "color"
  },
  {
    "name": "via-success",
    "css": "--via-success",
    "value": "#1F8A5B",
    "category": "color"
  },
  {
    "name": "via-surface",
    "css": "--via-surface",
    "value": "#131C30",
    "category": "color"
  },
  {
    "name": "via-surface-elev",
    "css": "--via-surface-elev",
    "value": "#1B273F",
    "category": "color"
  },
  {
    "name": "via-text",
    "css": "--via-text",
    "value": "#D0D5DD",
    "category": "color"
  },
  {
    "name": "via-text-body",
    "css": "--via-text-body",
    "value": "#D0D5DD",
    "category": "color"
  },
  {
    "name": "via-text-faint",
    "css": "--via-text-faint",
    "value": "#7A8194",
    "category": "color"
  },
  {
    "name": "via-text-inverse",
    "css": "--via-text-inverse",
    "value": "var(--via-navy)",
    "category": "color"
  },
  {
    "name": "via-text-muted",
    "css": "--via-text-muted",
    "value": "#98A2B3",
    "category": "color"
  },
  {
    "name": "via-text-primary",
    "css": "--via-text-primary",
    "value": "#F4F6FA",
    "category": "color"
  },
  {
    "name": "via-text-soft",
    "css": "--via-text-soft",
    "value": "#98A2B3",
    "category": "color"
  },
  {
    "name": "via-warning",
    "css": "--via-warning",
    "value": "#0A1F3B",
    "category": "color"
  },
  {
    "name": "via-white",
    "css": "--via-white",
    "value": "#FFFFFF",
    "category": "color"
  },
  {
    "name": "via-display",
    "css": "--via-display",
    "value": "var(--via-font-display)",
    "category": "font"
  },
  {
    "name": "via-font",
    "css": "--via-font",
    "value": "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
    "category": "font"
  },
  {
    "name": "via-font-display",
    "css": "--via-font-display",
    "value": "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
    "category": "font"
  },
  {
    "name": "via-font-mono",
    "css": "--via-font-mono",
    "value": "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace",
    "category": "font"
  },
  {
    "name": "via-fs-display",
    "css": "--via-fs-display",
    "value": "3.5rem",
    "category": "font"
  },
  {
    "name": "via-mono",
    "css": "--via-mono",
    "value": "var(--via-font-mono)",
    "category": "font"
  },
  {
    "name": "via-ease",
    "css": "--via-ease",
    "value": "cubic-bezier(0.32, 0.08, 0.24, 1)",
    "category": "motion"
  },
  {
    "name": "via-ease-out",
    "css": "--via-ease-out",
    "value": "cubic-bezier(0.16, 1, 0.3, 1)",
    "category": "motion"
  },
  {
    "name": "via-t",
    "css": "--via-t",
    "value": "180ms var(--via-ease)",
    "category": "motion"
  },
  {
    "name": "via-blur-lg",
    "css": "--via-blur-lg",
    "value": "blur(28px) saturate(180%)",
    "category": "other"
  },
  {
    "name": "via-blur-md",
    "css": "--via-blur-md",
    "value": "blur(16px) saturate(160%)",
    "category": "other"
  },
  {
    "name": "via-blur-sm",
    "css": "--via-blur-sm",
    "value": "blur(8px)  saturate(140%)",
    "category": "other"
  },
  {
    "name": "via-blur-xl",
    "css": "--via-blur-xl",
    "value": "blur(48px) saturate(180%)",
    "category": "other"
  },
  {
    "name": "via-border-1",
    "css": "--via-border-1",
    "value": "1px solid var(--via-border)",
    "category": "other"
  },
  {
    "name": "via-border-fine",
    "css": "--via-border-fine",
    "value": "0.5px solid var(--via-border-hairline)",
    "category": "other"
  },
  {
    "name": "via-border-strong",
    "css": "--via-border-strong",
    "value": "1px solid var(--via-navy-40)",
    "category": "other"
  },
  {
    "name": "via-container",
    "css": "--via-container",
    "value": "1280px",
    "category": "other"
  },
  {
    "name": "via-content",
    "css": "--via-content",
    "value": "760px",
    "category": "other"
  },
  {
    "name": "via-fs-body",
    "css": "--via-fs-body",
    "value": "1rem",
    "category": "other"
  },
  {
    "name": "via-fs-h1",
    "css": "--via-fs-h1",
    "value": "2.5rem",
    "category": "other"
  },
  {
    "name": "via-fs-h2",
    "css": "--via-fs-h2",
    "value": "2rem",
    "category": "other"
  },
  {
    "name": "via-fs-h3",
    "css": "--via-fs-h3",
    "value": "1.5rem",
    "category": "other"
  },
  {
    "name": "via-fs-h4",
    "css": "--via-fs-h4",
    "value": "1.125rem",
    "category": "other"
  },
  {
    "name": "via-fs-hero",
    "css": "--via-fs-hero",
    "value": "5rem",
    "category": "other"
  },
  {
    "name": "via-fs-label",
    "css": "--via-fs-label",
    "value": "0.6875rem",
    "category": "other"
  },
  {
    "name": "via-fs-sm",
    "css": "--via-fs-sm",
    "value": "0.875rem",
    "category": "other"
  },
  {
    "name": "via-fs-xs",
    "css": "--via-fs-xs",
    "value": "0.75rem",
    "category": "other"
  },
  {
    "name": "via-fw-black",
    "css": "--via-fw-black",
    "value": "900",
    "category": "other"
  },
  {
    "name": "via-fw-bold",
    "css": "--via-fw-bold",
    "value": "700",
    "category": "other"
  },
  {
    "name": "via-fw-light",
    "css": "--via-fw-light",
    "value": "300",
    "category": "other"
  },
  {
    "name": "via-fw-medium",
    "css": "--via-fw-medium",
    "value": "500",
    "category": "other"
  },
  {
    "name": "via-fw-regular",
    "css": "--via-fw-regular",
    "value": "400",
    "category": "other"
  },
  {
    "name": "via-fw-semibold",
    "css": "--via-fw-semibold",
    "value": "600",
    "category": "other"
  },
  {
    "name": "via-glass-card",
    "css": "--via-glass-card",
    "value": "linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025))",
    "category": "other"
  },
  {
    "name": "via-glass-card-2",
    "css": "--via-glass-card-2",
    "value": "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.018))",
    "category": "other"
  },
  {
    "name": "via-glass-sheen",
    "css": "--via-glass-sheen",
    "value": "linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent)",
    "category": "other"
  },
  {
    "name": "via-glow-navy",
    "css": "--via-glow-navy",
    "value": "0 0 0 1px rgba(10,31,59,0.05),\n    0 8px 24px rgba(10,31,59,0.20),\n    0 16px 48px rgba(10,31,59,0.14)",
    "category": "other"
  },
  {
    "name": "via-glow-navy-strong",
    "css": "--via-glow-navy-strong",
    "value": "0 0 0 1px rgba(10,31,59,0.10),\n    0 16px 48px rgba(10,31,59,0.30),\n    0 32px 80px rgba(10,31,59,0.20)",
    "category": "other"
  },
  {
    "name": "via-lh-loose",
    "css": "--via-lh-loose",
    "value": "1.65",
    "category": "other"
  },
  {
    "name": "via-lh-normal",
    "css": "--via-lh-normal",
    "value": "1.5",
    "category": "other"
  },
  {
    "name": "via-lh-snug",
    "css": "--via-lh-snug",
    "value": "1.2",
    "category": "other"
  },
  {
    "name": "via-lh-tight",
    "css": "--via-lh-tight",
    "value": "1.02",
    "category": "other"
  },
  {
    "name": "via-ls-brand",
    "css": "--via-ls-brand",
    "value": "0.32em",
    "category": "other"
  },
  {
    "name": "via-ls-label",
    "css": "--via-ls-label",
    "value": "0.18em",
    "category": "other"
  },
  {
    "name": "via-ls-mark",
    "css": "--via-ls-mark",
    "value": "0.22em",
    "category": "other"
  },
  {
    "name": "via-ls-tight",
    "css": "--via-ls-tight",
    "value": "-0.015em",
    "category": "other"
  },
  {
    "name": "via-ls-tighter",
    "css": "--via-ls-tighter",
    "value": "-0.025em",
    "category": "other"
  },
  {
    "name": "via-ls-wide",
    "css": "--via-ls-wide",
    "value": "0.08em",
    "category": "other"
  },
  {
    "name": "via-narrow",
    "css": "--via-narrow",
    "value": "560px",
    "category": "other"
  },
  {
    "name": "via-surface-onnavy",
    "css": "--via-surface-onnavy",
    "value": "linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%)",
    "category": "other"
  },
  {
    "name": "via-t-fast",
    "css": "--via-t-fast",
    "value": "120ms var(--via-ease)",
    "category": "other"
  },
  {
    "name": "via-t-slow",
    "css": "--via-t-slow",
    "value": "360ms var(--via-ease)",
    "category": "other"
  },
  {
    "name": "via-radius-2xl",
    "css": "--via-radius-2xl",
    "value": "40px",
    "category": "radius"
  },
  {
    "name": "via-radius-lg",
    "css": "--via-radius-lg",
    "value": "20px",
    "category": "radius"
  },
  {
    "name": "via-radius-md",
    "css": "--via-radius-md",
    "value": "12px",
    "category": "radius"
  },
  {
    "name": "via-radius-pill",
    "css": "--via-radius-pill",
    "value": "999px",
    "category": "radius"
  },
  {
    "name": "via-radius-sm",
    "css": "--via-radius-sm",
    "value": "8px",
    "category": "radius"
  },
  {
    "name": "via-radius-xl",
    "css": "--via-radius-xl",
    "value": "28px",
    "category": "radius"
  },
  {
    "name": "via-radius-xs",
    "css": "--via-radius-xs",
    "value": "4px",
    "category": "radius"
  },
  {
    "name": "via-shadow-focus",
    "css": "--via-shadow-focus",
    "value": "0 0 0 3px rgba(10,31,59,0.15)",
    "category": "shadow"
  },
  {
    "name": "via-shadow-glass-dark",
    "css": "--via-shadow-glass-dark",
    "value": "inset 0 1px 0 rgba(255,255,255,0.25),\n    inset 0 -1px 0 rgba(255,255,255,0.06),\n    0 16px 40px rgba(0,0,0,0.30),\n    0 4px 12px rgba(0,0,0,0.15)",
    "category": "shadow"
  },
  {
    "name": "via-shadow-glass-light",
    "css": "--via-shadow-glass-light",
    "value": "inset 0 1px 0 rgba(255,255,255,0.95),\n    inset 0 -1px 0 rgba(255,255,255,0.30),\n    0 12px 32px rgba(10,31,59,0.08),\n    0 2px 8px rgba(10,31,59,0.04)",
    "category": "shadow"
  },
  {
    "name": "via-shadow-lg",
    "css": "--via-shadow-lg",
    "value": "0 16px 40px rgba(10,31,59,0.10), 0 2px 8px rgba(10,31,59,0.05)",
    "category": "shadow"
  },
  {
    "name": "via-shadow-md",
    "css": "--via-shadow-md",
    "value": "0 6px 18px rgba(10,31,59,0.07), 0 1px 3px rgba(10,31,59,0.04)",
    "category": "shadow"
  },
  {
    "name": "via-shadow-sm",
    "css": "--via-shadow-sm",
    "value": "0 2px 6px rgba(10,31,59,0.05), 0 1px 2px rgba(10,31,59,0.03)",
    "category": "shadow"
  },
  {
    "name": "via-shadow-xl",
    "css": "--via-shadow-xl",
    "value": "0 32px 80px rgba(10,31,59,0.14), 0 4px 16px rgba(10,31,59,0.06)",
    "category": "shadow"
  },
  {
    "name": "via-shadow-xs",
    "css": "--via-shadow-xs",
    "value": "0 1px 2px rgba(10,31,59,0.04)",
    "category": "shadow"
  },
  {
    "name": "via-space-1",
    "css": "--via-space-1",
    "value": "4px",
    "category": "spacing"
  },
  {
    "name": "via-space-10",
    "css": "--via-space-10",
    "value": "40px",
    "category": "spacing"
  },
  {
    "name": "via-space-12",
    "css": "--via-space-12",
    "value": "48px",
    "category": "spacing"
  },
  {
    "name": "via-space-16",
    "css": "--via-space-16",
    "value": "64px",
    "category": "spacing"
  },
  {
    "name": "via-space-2",
    "css": "--via-space-2",
    "value": "8px",
    "category": "spacing"
  },
  {
    "name": "via-space-20",
    "css": "--via-space-20",
    "value": "80px",
    "category": "spacing"
  },
  {
    "name": "via-space-24",
    "css": "--via-space-24",
    "value": "96px",
    "category": "spacing"
  },
  {
    "name": "via-space-3",
    "css": "--via-space-3",
    "value": "12px",
    "category": "spacing"
  },
  {
    "name": "via-space-32",
    "css": "--via-space-32",
    "value": "128px",
    "category": "spacing"
  },
  {
    "name": "via-space-4",
    "css": "--via-space-4",
    "value": "16px",
    "category": "spacing"
  },
  {
    "name": "via-space-5",
    "css": "--via-space-5",
    "value": "20px",
    "category": "spacing"
  },
  {
    "name": "via-space-6",
    "css": "--via-space-6",
    "value": "24px",
    "category": "spacing"
  },
  {
    "name": "via-space-8",
    "css": "--via-space-8",
    "value": "32px",
    "category": "spacing"
  },
  {
    "name": "via-bg-2",
    "css": "--via-bg-2",
    "value": "#131C30",
    "category": "surface"
  },
  {
    "name": "via-bg-3",
    "css": "--via-bg-3",
    "value": "#1B273F",
    "category": "surface"
  },
  {
    "name": "via-bg-soft",
    "css": "--via-bg-soft",
    "value": "rgba(255, 255, 255, 0.04)",
    "category": "surface"
  },
  {
    "name": "via-mesh-light",
    "css": "--via-mesh-light",
    "value": "radial-gradient(ellipse 60% 70% at 12% 0%,  rgba(30,58,95,0.28) 0%,  transparent 55%),\n    radial-gradient(ellipse 50% 60% at 95% 8%,  rgba(46,76,118,0.22) 0%, transparent 55%),\n    radial-gradient(ellipse 70% 80% at 100% 100%, rgba(10,31,59,0.30) 0%, transparent 55%),\n    radial-gradient(ellipse 50% 60% at 5% 100%, rgba(30,58,95,0.18) 0%, transparent 55%),\n    linear-gradient(135deg, #CCD4DD 0%, #A7B2C0 100%)",
    "category": "surface"
  },
  {
    "name": "via-mesh-navy",
    "css": "--via-mesh-navy",
    "value": "radial-gradient(ellipse 60% 70% at 12% 0%,  rgba(46,76,118,0.55) 0%, transparent 60%),\n    radial-gradient(ellipse 50% 60% at 95% 8%,  rgba(30,58,95,0.50)  0%, transparent 60%),\n    radial-gradient(ellipse 70% 80% at 100% 100%, rgba(2,22,42,0.85) 0%, transparent 55%),\n    radial-gradient(ellipse 50% 60% at 5% 100%, rgba(46,76,118,0.40) 0%, transparent 55%),\n    linear-gradient(135deg, #0A1F3B 0%, #02162A 100%)",
    "category": "surface"
  },
  {
    "name": "via-noise",
    "css": "--via-noise",
    "value": "url(\"data:image/svg+xml",
    "category": "surface"
  }
] as const;

export const tokens = Object.freeze(
  tokensList.reduce<Record<string, string>>((acc, t) => {
    acc[t.name] = t.value;
    return acc;
  }, {}),
) as Readonly<Record<TokenName, string>>;

export type TokenName =
  | 'via-accent'
  | 'via-accent-deep'
  | 'via-accent-light'
  | 'via-accent-soft'
  | 'via-accent-warm'
  | 'via-bg'
  | 'via-black'
  | 'via-blue'
  | 'via-blue-soft'
  | 'via-border'
  | 'via-border-hairline'
  | 'via-border-soft'
  | 'via-coral'
  | 'via-coral-dark'
  | 'via-coral-deep'
  | 'via-danger'
  | 'via-edge-hi'
  | 'via-edge-lo'
  | 'via-gray-100'
  | 'via-gray-200'
  | 'via-gray-300'
  | 'via-gray-400'
  | 'via-gray-50'
  | 'via-gray-500'
  | 'via-gray-600'
  | 'via-gray-700'
  | 'via-gray-800'
  | 'via-gray-900'
  | 'via-ink-2'
  | 'via-ink-3'
  | 'via-navy'
  | 'via-navy-02'
  | 'via-navy-03'
  | 'via-navy-04'
  | 'via-navy-05'
  | 'via-navy-06'
  | 'via-navy-08'
  | 'via-navy-10'
  | 'via-navy-12'
  | 'via-navy-14'
  | 'via-navy-16'
  | 'via-navy-18'
  | 'via-navy-20'
  | 'via-navy-22'
  | 'via-navy-25'
  | 'via-navy-30'
  | 'via-navy-40'
  | 'via-navy-60'
  | 'via-navy-80'
  | 'via-navy-darker'
  | 'via-navy-deep'
  | 'via-stage-1'
  | 'via-stage-2'
  | 'via-stage-soft'
  | 'via-success'
  | 'via-surface'
  | 'via-surface-elev'
  | 'via-text'
  | 'via-text-body'
  | 'via-text-faint'
  | 'via-text-inverse'
  | 'via-text-muted'
  | 'via-text-primary'
  | 'via-text-soft'
  | 'via-warning'
  | 'via-white'
  | 'via-display'
  | 'via-font'
  | 'via-font-display'
  | 'via-font-mono'
  | 'via-fs-display'
  | 'via-mono'
  | 'via-ease'
  | 'via-ease-out'
  | 'via-t'
  | 'via-blur-lg'
  | 'via-blur-md'
  | 'via-blur-sm'
  | 'via-blur-xl'
  | 'via-border-1'
  | 'via-border-fine'
  | 'via-border-strong'
  | 'via-container'
  | 'via-content'
  | 'via-fs-body'
  | 'via-fs-h1'
  | 'via-fs-h2'
  | 'via-fs-h3'
  | 'via-fs-h4'
  | 'via-fs-hero'
  | 'via-fs-label'
  | 'via-fs-sm'
  | 'via-fs-xs'
  | 'via-fw-black'
  | 'via-fw-bold'
  | 'via-fw-light'
  | 'via-fw-medium'
  | 'via-fw-regular'
  | 'via-fw-semibold'
  | 'via-glass-card'
  | 'via-glass-card-2'
  | 'via-glass-sheen'
  | 'via-glow-navy'
  | 'via-glow-navy-strong'
  | 'via-lh-loose'
  | 'via-lh-normal'
  | 'via-lh-snug'
  | 'via-lh-tight'
  | 'via-ls-brand'
  | 'via-ls-label'
  | 'via-ls-mark'
  | 'via-ls-tight'
  | 'via-ls-tighter'
  | 'via-ls-wide'
  | 'via-narrow'
  | 'via-surface-onnavy'
  | 'via-t-fast'
  | 'via-t-slow'
  | 'via-radius-2xl'
  | 'via-radius-lg'
  | 'via-radius-md'
  | 'via-radius-pill'
  | 'via-radius-sm'
  | 'via-radius-xl'
  | 'via-radius-xs'
  | 'via-shadow-focus'
  | 'via-shadow-glass-dark'
  | 'via-shadow-glass-light'
  | 'via-shadow-lg'
  | 'via-shadow-md'
  | 'via-shadow-sm'
  | 'via-shadow-xl'
  | 'via-shadow-xs'
  | 'via-space-1'
  | 'via-space-10'
  | 'via-space-12'
  | 'via-space-16'
  | 'via-space-2'
  | 'via-space-20'
  | 'via-space-24'
  | 'via-space-3'
  | 'via-space-32'
  | 'via-space-4'
  | 'via-space-5'
  | 'via-space-6'
  | 'via-space-8'
  | 'via-bg-2'
  | 'via-bg-3'
  | 'via-bg-soft'
  | 'via-mesh-light'
  | 'via-mesh-navy'
  | 'via-noise';

/** CSS var() reference for a token. Returns 'var(--via-navy)' for 'via-navy'. */
export function cssVar(name: TokenName): string {
  return `var(--${name})`;
}
