import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import minify from 'rollup-plugin-minify';

export default defineConfig({
  input: './src/index.js', // Changed from './api.mjs' to './src/index.js'
  output: {
    file: 'dist/bundle.js',
    format: 'cjs', // Changed from 'es' to 'cjs'
    exports: 'auto',
    sourcemap: 'inline',
  },
  plugins: [
    json(),
    nodeResolve({
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    }),
    typescript(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
    minify({
      compress: {
        drop_console: true,
      },
    }),
  ],
});