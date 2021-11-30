/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')
const { gzip } = require('zlib')

module.exports = async function build({
  entryPoint,
  cjsOutfile,
  esmOutfile,
  tsconfigPath,
  dirname,
  pkg,
  config = {},
}) {
  const distFoder = path.resolve(dirname, './dist')
  // Remove existing dist folder
  if (fs.existsSync(distFoder)) {
    fs.rmSync(distFoder, { recursive: true }, (e) => {
      if (e) {
        throw e
      }
    })
  }

  const rootPath = path.resolve(dirname, '../')

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

    const esmSize = Object.values(esmResult.metafile.outputs).reduce(
      (acc, { bytes }) => acc + bytes,
      0
    )

    fs.readFile(path.resolve(rootPath, esmOutfile), (_err, data) => {
      gzip(data, (_err, result) => {
        console.log(
          `✔ ${pkg.name}: Built package. ${(esmSize / 1000).toFixed(2)}kb (${(
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
