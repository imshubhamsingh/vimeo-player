const { addons } = require('../../../config/storybook/main')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [...addons],
}
