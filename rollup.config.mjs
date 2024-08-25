import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import minify from 'rollup-plugin-minify';

export default defineConfig({
  input: './netlify/functions/api/api.js',
  output: {
    file: '../netlify/functions/api.js',
    format: 'es', // Change to 'es' or 'system' to support top-level await
    exports: 'auto',
    sourcemap: 'inline',
  },
  plugins: [
    json(),
    nodeResolve({
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      resolveOnly: ['api.js'], // Ensure this is necessary for your setup
    }),
    typescript(), // Process TypeScript before commonjs
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'], // Include necessary presets if needed
    }),
    {
      name: 'ignore-unused-imports',
      transform(code, id) {
        if (id.includes('url')) {
          return code.replace('fileURLToPath', '').replace('url', '');
        }
        return code;
      },
    },
    minify(), // Enabled minification, check for compatibility
  ],
});
