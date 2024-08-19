<<<<<<< HEAD
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: ['netlify/functions/api/api.js', 'api.js'],
  output: [
    {
      dir: '.netlify/functions',
      format: 'esm', // Changed from 'es' to 'esm' for clarity
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve({
      // Add this to resolve node modules correctly
      resolveOnly: ['node_modules'],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
=======
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: ['netlify/functions/api/api.js', 'api.js'],
  output: [
    {
      dir: '.netlify/functions',
      format: 'esm', // Changed from 'es' to 'esm' for clarity
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve({
      // Add this to resolve node modules correctly
      resolveOnly: ['node_modules'],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
>>>>>>> d0503de8593dd26c2f46b5e66cefb97fde4ef9be
});