import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: 'netlify/functions/api/api.js',
  output: {
    file: 'netlify/functions/api.js', // Removed the dot (.) at the beginning
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'],
      resolveOnly: ['node_modules'],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      sourceMaps: true,
    }),
  ],
});