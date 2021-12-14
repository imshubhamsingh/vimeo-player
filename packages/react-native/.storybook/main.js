const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: (config) => {
    config.module.rules.push(
      {
        test: /postMock.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      }
    )

    config.resolve.alias = {
      // replace `react-native` imports with `react-native-web`
      'react-native$': require.resolve('react-native-web'),
      'react-native-webview': require.resolve('react-native-web-webview'),
    }

    config.resolve.extensions.unshift('.web.js', '.web.tsx', '.ts', '.tsx')

    return config
  },
}
