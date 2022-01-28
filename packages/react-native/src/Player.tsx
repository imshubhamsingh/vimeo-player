import type {
  VimeoPlayerOptions,
  VimeoPlayerProperties,
  VimeoPlayerEventHandlers,
  ImperativeHandle,
} from "./type";
import { VIMEO_PLAYER_EVENTS, CUSTOM_USER_AGENT } from "./constants";
import * as React from "react";
import { View, Platform } from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  WebViewProps,
} from "react-native-webview";
import { EventEmitter } from "events";

import {
  playerScript,
  getPlayerProperties,
  recievedOnce,
  playerUpdate,
} from "./utils";

type NativeProps = {
  /**
   * To directly use local html
   */
  useLocalHTML?: boolean;
  /**
   * WebView props
   */
  webViewProps?: Omit<WebViewProps, "ref" | "source" | "onMessage">;
  /**
   * Player View Height
   */
  height: number;
  /**
   * Player View Width
   */
  width: number;
};

export type PlayerProps = VimeoPlayerOptions & NativeProps;

const Player = React.forwardRef<ImperativeHandle, PlayerProps>((props, ref) => {
  const {
    height,
    width,
    useLocalHTML,
    webViewProps,
    autopause,
    color,
    loop,
    autoplay,
    muted,
    paused,
    video,
    volume,
    quality,
    start,
  } = props;
  const initialPlayerParamsRef = React.useRef<VimeoPlayerProperties>(
    getPlayerProperties(props)
  );

  const mounted = React.useRef<boolean>(false);

  const webViewRef = React.useRef<WebView>(null);
  const eventEmitter = React.useRef(new EventEmitter());
  const prevProps = React.useRef({
    autopause,
    autoplay,
    color,
    loop,
    muted,
    paused,
    video,
    volume,
    quality,
  });

  const source = React.useMemo(() => {
    const vimeoScript = playerScript(initialPlayerParamsRef.current);
    const res = { html: vimeoScript.htmlString };
    return res;
  }, [useLocalHTML]);

  React.useImperativeHandle(
    ref,
    () => ({
      getDuration: () =>
        recievedOnce<number>(
          webViewRef.current,
          eventEmitter.current,
          "getDuration"
        ),
      getCurrentTime: () =>
        recievedOnce<number>(
          webViewRef.current,
          eventEmitter.current,
          "getCurrentTime"
        ),
      isMuted: () =>
        recievedOnce<boolean>(
          webViewRef.current,
          eventEmitter.current,
          "isMuted"
        ),
      getVolume: () =>
        recievedOnce<number>(
          webViewRef.current,
          eventEmitter.current,
          "getVolume"
        ),
      getPlaybackRate: () =>
        recievedOnce<number>(
          webViewRef.current,
          eventEmitter.current,
          "getPlaybackRate"
        ),
      seekTo: (seconds: number) =>
        recievedOnce<void>(
          webViewRef.current,
          eventEmitter.current,
          "seekTo",
          false,
          seconds
        ),
    }),
    []
  );

  const onMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      const handler = VIMEO_PLAYER_EVENTS[
        message.event as keyof typeof VIMEO_PLAYER_EVENTS
      ] as keyof VimeoPlayerEventHandlers;
      if (handler) {
        props?.[handler]?.(message.data);
      } else {
        eventEmitter.current.emit(message.event, message.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      Object.keys(prevProps.current)
        .filter(
          (name: string) =>
            props[name as keyof typeof prevProps.current] !==
            prevProps.current[name as keyof typeof prevProps.current]
        )
        .forEach((name: string) => {
          //@ts-ignore TODO check how tslint error can be fix
          prevProps.current[name] =
            props[name as keyof typeof prevProps.current];
          playerUpdate(
            webViewRef.current,
            name as keyof Pick<VimeoPlayerProperties, "paused">,
            props[name as keyof typeof prevProps.current],
            {
              start: start,
              volume: volume,
            }
          );
        });
    }
  }, [autopause, color, loop, muted, paused, video, volume, quality, autoplay]);

  return (
    <View style={{ height, width }}>
      <WebView
        userAgent={
          autoplay
            ? Platform.select({ android: CUSTOM_USER_AGENT, ios: "" })
            : ""
        }
        {...webViewProps}
        source={source}
        onMessage={onMessage}
        ref={webViewRef}
      />
    </View>
  );
});

Player.defaultProps = {
  autopause: false,
  autoplay: false,
  background: false,
  controls: true,
  dnt: false,
  loop: false,
  start: 0,
  muted: true,
  responsive: true,
  showByline: true,
  showPortrait: true,
  showTitle: true,
  speed: true,
  volume: 1,
  texttrack: "en",
};

export default Player;

export { ImperativeHandle };
