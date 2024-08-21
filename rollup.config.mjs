import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { terser } from '@rollup/plugin-terser'; // Correct import

export default defineConfig({
  input: 'netlify/functions/api/api.js',
  output: {
    file: 'netlify/functions/api.js',
    format: 'es', // Ensure ES format to support top-level await
    exports: 'auto', // Explicitly set output.exports
    sourcemap: 'inline',
  },
  plugins: [
    json(), // Handle JSON imports
    nodeResolve(), // Resolve node modules
    commonjs(), // Convert CommonJS to ES modules
    typescript(), // Compile TypeScript code
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Exclude node_modules from transpilation
    }), // Transpile JavaScript code
    terser(), // Minify output code
  ],
});
