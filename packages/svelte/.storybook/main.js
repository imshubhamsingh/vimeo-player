const sveltePreprocess = require('svelte-preprocess')
const { addons } = require('../../../config/storybook/main')

module.exports = {
  svelteOptions: {
    preprocess: sveltePreprocess(),
  },
  stories: ['../src/**/*.stories.svelte'],
  addons: [...addons, '@storybook/addon-svelte-csf'],
}
