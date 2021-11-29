/* eslint-disable */

const pkg = require('../package.json')
const devbuild = require('../../../config/esbuild/dev')

devbuild({
  pkg,
  dirname: __dirname,
  entryPoint: './src/Player.tsx',
  outfile: pkg.module,
  tsconfigPath: './tsconfig.json',
  config: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
})
