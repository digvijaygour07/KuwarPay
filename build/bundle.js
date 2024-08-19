// build.js

import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const inputOptions = {
  input: 'api.js', // Entry point of your application
  plugins: [
    nodeResolve(), // Resolve node modules
    babel({ // Transpile JavaScript files
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
};

const outputOptions = {
  file: 'bundle.js', // Output file
  format: 'cjs', // Output format (CommonJS)
};

async function build() {
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
}

build();
