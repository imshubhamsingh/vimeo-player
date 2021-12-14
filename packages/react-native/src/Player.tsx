import {
  ImperativeHandle,
  VimeoPlayerOptions,
  VimeoPlayerProperties,
  VimeoPlayerEventHandlers,
  VimeoPlayerEvents,
  VIMEO_PLAYER_EVENTS,
} from "@vimeo-player/core";
import * as React from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import { playerScript, getPlayerProperties } from "./utils";

type WebViewMessage<T> = {
  event: keyof T;
  data: Array<any>;
};

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

  const onMessage = (event: WebViewMessageEvent) => {
    try {
      const message: WebViewMessage<typeof VIMEO_PLAYER_EVENTS> = JSON.parse(
        event.nativeEvent.data
      );
      const handler = VIMEO_PLAYER_EVENTS[
        message.event
      ] as keyof VimeoPlayerEventHandlers;
      //@ts-ignore TODO: fix the type
      props?.[handler]?.(...message.data);
    } catch (err) {
      console.log(err);
    }
  };

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
