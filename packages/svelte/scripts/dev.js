/* eslint-disable @typescript-eslint/no-var-requires */

const pkg = require('../package.json')
const devbuild = require('../../../config/esbuild/dev')
const sveltePlugin = require('esbuild-svelte')
const sveltePreprocess = require('svelte-preprocess')

devbuild({
  pkg,
  dirname: __dirname,
  entryPoint: './src/Player.svelte',
  outfile: pkg.module,
  tsconfigPath: './tsconfig.json',
  config: {
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess(),
      }),
    ],
  },
})
