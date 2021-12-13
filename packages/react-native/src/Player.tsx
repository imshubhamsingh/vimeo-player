import { ImperativeHandle, VimeoPlayerOptions } from '@vimeo-player/core'
import * as React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

import { playerScript } from './utils'

export type PlayerProps = VimeoPlayerOptions

const Player = React.forwardRef<ImperativeHandle, PlayerProps>((props, ref) => {
  const { height, width } = props
  return (
    <View style={{ height, width }}>
      <WebView source={{ html: playerScript() }} />
    </View>
  )
})

export default Player
