// Import Rollup and plugins
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Input options
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

// Output options
const outputOptions = {
  file: 'bundle.js', // Output file
  format: 'cjs', // Output format (CommonJS)
};

// Build function
async function build() {
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
}

// Run the build function
build();
