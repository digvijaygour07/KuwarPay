import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const inputOptions = {
  input: 'api.js', // Update this line to point to your api.js file
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