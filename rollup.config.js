import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'netlify/functions/api/api.js',
  output: {
    dir: '.netlify/functions',
    format: 'es', // Change this to "es" from "cjs"
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
};