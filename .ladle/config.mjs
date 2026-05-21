/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/lib/**/*.stories.{js,jsx,ts,tsx}',
  defaultStory: 'introduction',
  appendToHead: `
    <link rel="icon" type="image/png" href="/favicon.png" />
  `,
  // Habilitar dark mode toggle no Ladle UI
  appendToBody: '',
  addons: {
    theme: {
      enabled: true,
      defaultState: 'light',
    },
    width: {
      enabled: true,
      options: {
        mobile: 375,
        tablet: 768,
        desktop: 1440,
      },
      defaultState: 0,
    },
    a11y: {
      enabled: true,
    },
  },
  port: 5174,
  previewPort: 60711,
  outDir: 'dist-storybook',
};
