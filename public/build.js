import { rollup } from 'rollup';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const inputOptions = {
  input: './netlify/functions/api/api.js',
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
};

const outputOptions = {
  file: 'bundle.js',
  format: 'cjs',
};

async function build() {
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
}

build();