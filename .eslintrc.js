module.exports = {
  "extends": ["airbnb-base", 'plugin:flowtype/recommended'],
  plugins: [
    'import',
    'flowtype',
  ],
  parser: 'babel-eslint',
  env: {
    node: true,
  },
  rules: {
    semi: 0,
    quotes: ["error", "double", { "avoidEscape": true }],
    "no-return-await": 0,
    "no-underscore-dangle": 0,
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
  },
  settings: {
    "import/resolver": {
      "node": {
          "paths": ["srcFlow"],
        },
    },
  }
};
