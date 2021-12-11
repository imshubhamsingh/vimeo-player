// @ts-check
const preactRefresh = require("@prefresh/vite");

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: {
    factory: "h",
    fragment: "Fragment",
  },
  alias: {
    react: 'preact/compat',
   'react-dom': 'preact/compat'
  }
};

module.exports = config;
