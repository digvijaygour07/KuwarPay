import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: 'netlify/functions/api/api.js', // Ensure this is the correct path to your input file
  output: {
    file: 'netlify/functions/api.js', // Ensure this is the correct path for your output file
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      sourceMaps: true,
    }),
  ],
});
