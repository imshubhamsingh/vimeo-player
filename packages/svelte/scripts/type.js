/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

function copyFile(src, dest) {
  const folder = path.dirname(dest)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
  return fs.copyFileSync(src, dest)
}

copyFile(
  path.resolve(root, './src/types.d.ts'),
  path.resolve(root, './dist/types/Player.d.ts')
)
