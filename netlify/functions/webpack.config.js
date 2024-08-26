const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'netlify/functions/api/api.mjs'), // Your entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // Match both .js and .mjs files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js'], // Resolve both .mjs and .js extensions
  },
};
