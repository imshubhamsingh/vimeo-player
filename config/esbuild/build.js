/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')
const { gzip } = require('zlib')

/**
 * Production build
 */
module.exports = async function build({
  /**
   * Entry point file
   */
  entryPoint,
  /**
   * Final Common.js build file
   */
  cjsOutfile,
  /**
   * Final ESM build file
   */
  esmOutfile,
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
  /**
   * Dist Folder Path relative to package.
   */
  const distFolder = path.resolve(dirname, './dist')
  // Remove existing dist folder
  if (fs.existsSync(distFolder)) {
    fs.rmSync(distFolder, { recursive: true }, (e) => {
      if (e) {
        throw e
      }
    })
  }

  /**
   *  Root path of package
   */
  const rootPath = path.resolve(dirname, '../')

  /**
   * Common build config
   */
  const buildConfig = {
    entryPoints: [path.resolve(rootPath, entryPoint).toString()],
    minify: false,
    bundle: true,
    target: 'es6',
    tsconfig: path.resolve(rootPath, tsconfigPath),
    external: Object.keys(pkg.dependencies || {}).concat(
      Object.keys(pkg.peerDependencies)
    ),
    metafile: true,
    sourcemap: true,
  }

  try {
    await esbuild.build({
      ...buildConfig,
      outfile: path.resolve(rootPath, cjsOutfile),
      format: 'cjs',
      ...config,
    })

    const esmResult = await esbuild.build({
      ...buildConfig,
      outfile: path.resolve(rootPath, esmOutfile),
      format: 'esm',
      ...config,
    })

    /**
     * ESM side in KB
     */
    const esmSize = (
      Object.values(esmResult.metafile.outputs).reduce(
        (acc, { bytes }) => acc + bytes,
        0
      ) / 1000
    ) // bytes to kb conversion
      .toFixed(2)

    fs.readFile(path.resolve(rootPath, esmOutfile), (_err, data) => {
      gzip(data, (_err, result) => {
        console.log(
          `✔ ${pkg.name}: Built package. ${esmSize}kb (${(
            result.length / 1000
          ).toFixed(2)}kb minified)`
        )
      })
    })
  } catch (e) {
    console.log(`× ${pkg.name}: Build failed due to an error.`)
    console.log(e)
  }
}
