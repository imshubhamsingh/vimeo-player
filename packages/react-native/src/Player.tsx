import {
  ImperativeHandle,
  VimeoPlayerOptions,
  VimeoPlayerProperties,
  VIMEO_PLAYER_EVENTS,
} from "@vimeo-player/core";
import * as React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

import { playerScript, getPlayerProperties } from "./utils";

export type PlayerProps = VimeoPlayerOptions & {
  /**
   * To directly use local html
   */
  useLocalHTML?: boolean;
};

const Player = React.forwardRef<ImperativeHandle, PlayerProps>((props, ref) => {
  const { height, width, useLocalHTML } = props;
  const initialPlayerParamsRef = React.useRef<VimeoPlayerProperties>(
    getPlayerProperties(props)
  );

  const source = React.useMemo(() => {
    const vimeoScript = playerScript(initialPlayerParamsRef.current);
    const res = { html: vimeoScript.htmlString };
    return res;
  }, [useLocalHTML]);

  const onMessage = React.useCallback((event) => {
    const message = JSON.parse(event.nativeEvent.data);
    console.log(message);
  }, []);
  return (
    <View style={{ height, width }}>
      <WebView source={source} onMessage={onMessage} />
    </View>
  );
});

Player.defaultProps = {
  autopause: true,
  autoplay: false,
  background: false,
  controls: false,
  dnt: false,
  loop: false,
  muted: false,
  responsive: true,
  showByline: true,
  showPortrait: false,
  showTitle: true,
  speed: true,
  volume: 1,
  texttrack: "en",
};

export default Player;
