import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import minify from 'rollup-plugin-babel-minify';

export default defineConfig({
  input: 'netlify/functions/api/api.js',
  output: {
    file: 'netlify/functions/api.js',
    format: 'es',
    exports: 'auto',
    sourcemap: 'inline',
  },
  plugins: [
    json(),
    nodeResolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    minify(), // Use the new minifier plugin
  ],
});