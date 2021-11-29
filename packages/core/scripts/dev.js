/* eslint-disable */

const pkg = require('../package.json')
const devbuild = require('../../../config/esbuild/dev')

devbuild({
  pkg,
  dirname: __dirname,
  entryPoint: './src/player.ts',
  outfile: pkg.module,
  tsconfigPath: './tsconfig.json',
})
