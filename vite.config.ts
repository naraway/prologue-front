import react from '@vitejs/plugin-react';
import styles from 'rollup-plugin-styles';
import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-ignore
import autoExternal from 'rollup-plugin-auto-external';
import { defineConfig } from 'vite';

// @ts-ignore
const packageJson = require('./package.json');

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      exclude: /\.stories\.(mdx|[tj]sx?)$/,
      include: [ /\.tsx?$/, /\.jsx?$/, /\.css$/ ],
      babel: {
        presets: [
          // '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          [ '@babel/plugin-proposal-decorators', { legacy: true } ],
          [ '@babel/plugin-proposal-class-properties', { loose: true } ],
          [ '@babel/plugin-proposal-private-methods', { loose: true } ],
          [ '@babel/plugin-proposal-private-property-in-object', { loose: true } ],
        ],
        parserOpts: { plugins: [ 'decorators-legacy' ] },
      },
    }),
  ],
  build: {
    lib: {
      entry: './src/lib/index.ts',
      name: packageJson.name,
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
      plugins: [
        autoExternal(),
        styles(),
      ],
    },
  },
});
