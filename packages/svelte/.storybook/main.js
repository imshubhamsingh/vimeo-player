const { addons } = require('../../../config/storybook/main')

module.exports = {
  webpackFinal: async (config) => {
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes('svelte-loader')
    )
    svelteLoader.options.preprocess = require('svelte-preprocess')()
    return config
  },
  stories: ['../src/**/*.stories.svelte'],
  addons: [...addons, '@storybook/addon-svelte-csf'],
}
