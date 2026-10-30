/**
 * DS SUBIDO · preset para Tailwind v3.
 *   // tailwind.config.ts
 *   presets: [require("./src/styles/ds/tailwind.preset.cjs")],
 * Acrescenta o que os componentes do kit usam e o shadcn padrão não tem:
 * fonte Geist, cores text-sidebar-eyebrow/icon/meta, raios do DS e o
 * plugin de container queries (@container / cqi nos KPIs).
 */
module.exports = {
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
          eyebrow: "var(--sidebar-eyebrow)",
          icon: "var(--sidebar-icon)",
          meta: "var(--sidebar-meta)",
        },
      },
      borderRadius: {
        lg: "var(--via-radius-lg)",
        md: "var(--via-radius-md)",
        sm: "var(--via-radius-sm)",
        xl: "var(--via-radius-xl)",
        "2xl": "var(--via-radius-2xl)",
      },
    },
  },
  plugins: [
    // npm i -D @tailwindcss/container-queries
    (() => {
      try {
        return require("@tailwindcss/container-queries");
      } catch {
        return () => {};
      }
    })(),
  ],
};
