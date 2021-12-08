/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('../package.json')
const build = require('../../../config/esbuild/build')
const vuePlugin = require('esbuild-plugin-vue3')

build({
  pkg,
  dirname: __dirname,
  entryPoint: './src/index.ts',
  esmOutfile: pkg.module,
  cjsOutfile: pkg.main,
  tsconfigPath: './tsconfig.json',
  config: {
    plugins: [vuePlugin()],
  },
})
