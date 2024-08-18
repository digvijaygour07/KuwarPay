import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'netlify/functions/api/api.js',
  output: {
    dir: '.netlify/functions',
    format: 'cjs',
    sourcemap: true, // Add this line
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
};