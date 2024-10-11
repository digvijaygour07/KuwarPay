export default  = {
    env: {
      browser: false,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:jsx-a11y/recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'no-syntax-error': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };