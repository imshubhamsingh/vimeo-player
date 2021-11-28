import path from 'path'

import { configuration } from '../../config/rollup.config'
import pkg from './package.json'

export default configuration({
  input: './src/player.ts',
  pkg,
  path: path.resolve(__dirname),
  typeFileName: 'player',
})
