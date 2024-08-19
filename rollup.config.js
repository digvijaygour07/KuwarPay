import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: ['netlify/functions/api/api.js', 'api.js'],
  output: [
    {
      dir: '.netlify/functions',
      format: 'es',
      sourcemap: true,
    }
  ],
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
});
