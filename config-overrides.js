const path = require('path');
const {override, addBabelPresets, addBabelPlugins, addWebpackAlias} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    "*": path.resolve(__dirname, 'src'),
    "components": path.resolve(__dirname, 'src/components'),
    "ducks": path.resolve(__dirname, 'src/ducks'),
    "epics": path.resolve(__dirname, 'src/epics'),
    "utils": path.resolve(__dirname, 'src/utils'),
  }),
  ...addBabelPresets([
    '@emotion/babel-preset-css-prop'
  ]),
  ...addBabelPlugins([
    'emotion'
  ]),
);