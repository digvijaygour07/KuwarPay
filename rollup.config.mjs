import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: 'netlify/functions/api/api.js',
  output: {
    file: '.netlify/functions/api.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      resolveOnly: ['node_modules'],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
});