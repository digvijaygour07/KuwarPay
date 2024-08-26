import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import minify from 'rollup-plugin-minify';
import resolve from '@rollup/plugin-node-resolve';
import picomatch from 'picomatch';

export default defineConfig({
  input: './netlify/functions/api/api.mjs',
  output: {
    file: '../netlify/functions/api.mjs',
    format: 'es',
    exports: 'auto',
    sourcemap: 'inline',
  },
  plugins: [
    json(),
    nodeResolve({
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    }),
    resolve(), // Add this line
    typescript(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
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
    minify(),
  ],
});
