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
      // Add this to ensure correct resolution of node_modules
      mainFields: ['module', 'main'],
      resolveOnly: ['node_modules'],
    }),
    babel({
      // Add this to ensure correct babel helpers usage
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      // Add this to ensure correct source map usage
      sourceMaps: true,
    }),
  ],
});