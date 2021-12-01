/* eslint-disable */

const esbuild = require('esbuild')
const path = require('path')

/**
 * Dev build
 */
module.exports = function devbuild({
  /**
   * Entry point file
   */
  entryPoint,
  /**
   * Final build file
   */
  outfile,
  /**
   * Ts config relative path
   */
  tsconfigPath,
  /**
   * Current directory name, it is __dirname usually
   */
  dirname,
  /**
   * Package.json
   */
  pkg,
  /**
   * Es build config to override default one.
   */
  config = {},
}) {
  // Root path of package
  const rootPath = path.resolve(dirname, '../')
  // ESM dev build
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
