/* eslint-disable @typescript-eslint/no-var-requires */

const pkg = require('../package.json')
const devbuild = require('../../../config/esbuild/dev')
const vuePlugin = require('esbuild-plugin-vue3')

devbuild({
  pkg,
  dirname: __dirname,
  entryPoint: './src/Player.vue',
  outfile: pkg.module,
  tsconfigPath: './tsconfig.json',
  config: {
    plugins: [vuePlugin()],
  },
})
