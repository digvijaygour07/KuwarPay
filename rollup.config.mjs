import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import minify from 'rollup-plugin-minify';
import picomatch from 'picomatch';

module.exports defineConfig({
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
    typescript(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
    minify(),
    {
      name: 'ignore-unused-imports',
      transform(code, id) {
        // Check if the file contains the 'fileURLToPath' declaration
        if (id.includes('url')) {
          // Remove the import statement and usage of 'fileURLToPath'
          return {
            code: code.replace(/import\s+{[^}]*fileURLToPath[^}]*}\s+from\s+['"]url['"];/g, '')
                      .replace(/fileURLToPath\([^)]*\);?/g, ''),
            map: null,
          };
        }
        return {
          code,
          map: null,
        };
      },
    },
  ],
});

