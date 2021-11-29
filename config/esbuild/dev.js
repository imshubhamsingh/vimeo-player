/* eslint-disable */

const esbuild = require('esbuild')
const path = require('path')

module.exports = function devbuild({
  entryPoint,
  outfile,
  tsconfigPath,
  dirname,
  pkg,
  config = {},
}) {
  const rootPath = path.resolve(dirname, '../')
  esbuild.build({
    entryPoints: [path.resolve(rootPath, entryPoint).toString()],
    minify: false,
    bundle: true,
    outfile: path.resolve(rootPath, outfile),
    format: 'esm',
    target: 'es6',
    tsconfig: path.resolve(rootPath, tsconfigPath),
    external: Object.keys(pkg.dependencies || {}).concat(
      Object.keys(pkg.peerDependencies)
    ),
    incremental: true,
    sourcemap: true,
    watch: {
      onRebuild(error) {
        if (error) {
          console.log(`× ${pkg.name}: An error in prevented the rebuild.`)
          return
        }
        console.log(`✔ ${pkg.name}: Rebuilt.`)
      },
    },
    ...config,
  })
}
