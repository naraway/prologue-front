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
    builder: 'storybook-builder-vite',
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
          '@nara-way/prologue': path.resolve(__dirname, '../src/lib'),
          '~': path.resolve(__dirname, '../src'),
        }
      },
    });
  },
});
