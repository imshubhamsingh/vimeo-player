/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('../package.json')
const build = require('../../../config/esbuild/build')

build({
  pkg,
  dirname: __dirname,
  entryPoint: './src/player.ts',
  esmOutfile: pkg.module,
  cjsOutfile: pkg.main,
  browserOutfile: pkg.unpkg,
  tsconfigPath: './tsconfig.json',
})
