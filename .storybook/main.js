const { loadConfigFromFile, mergeConfig } = require("vite");
const path = require("path");

module.exports = ({
  stories: [
    '../src/storybook/stories/**/*.stories.mdx',
    '../src/storybook/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config, { configType }) => {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    );

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [],
      resolve: {
        alias: {
          '~': path.resolve(__dirname, '../src'),
          '@nara-way/prologue': path.resolve(__dirname, '../src/lib'),
        },
      },
    });
  },
});
