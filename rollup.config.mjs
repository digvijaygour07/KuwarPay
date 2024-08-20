import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: 'netlify/functions/api/api.js',
  output: {
    file: 'netlify/functions/api.js',
    format: 'esm',
    sourcemap: 'inline', // Changed from true to 'inline'
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'], // No need to specify resolveOnly
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      sourceMaps: 'inline', // Changed from true to 'inline'
    }),
  ],
});
