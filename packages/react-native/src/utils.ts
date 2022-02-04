import { VimeoPlayerProperties } from "./type";
import { EventEmitter } from "events";
import { WebView } from "react-native-webview";

const asyncFn = (str: string) => `(async()=>{${str}})()`;

const playerHandlers = {
  getDuration: () =>
    asyncFn(
      `sendMessageToRN({ event: 'getDuration', data: await player.instance.getDuration() })`
    ),
  getCurrentTime: () =>
    asyncFn(
      `sendMessageToRN({ event: 'getCurrentTime', data: await player.instance.getCurrentTime() })`
    ),
  isMuted: () =>
    asyncFn(
      `sendMessageToRN({ event: 'isMuted', data: await player.instance.getMuted() })`
    ),
  getVolume: () =>
    asyncFn(
      `async()sendMessageToRN({ event: 'getVolume', data: await player.instance.getVolume() })`
    ),
  getPlaybackRate: () =>
    asyncFn(
      `sendMessageToRN({ event: 'getPlaybackRate', data: player.instance.getPlaybackRate() })`
    ),
  seekTo: (seconds: number) => `player.instance.setCurrentTime(${seconds})`,
};

const playerProps = {
  paused: (pausedValue: boolean) => `player.update('paused', ${pausedValue})`,
  color: (color: string) => `player.update('color', ${color})`,
  autopause: (autopause: boolean) => `player.update('autopause', ${autopause})`,
  loop: (loop: boolean) => `player.update('loop', ${loop})`,
  volume: (volume: number) => `player.update('volume', ${volume})`,
  muted: (muted: boolean, { volume }: { volume: number }) =>
    `player.update('muted', ${muted}, {volume: ${volume}})`,
  quality: (quality: number) => `player.update('quality', ${quality})`,
};

export function recievedOnce<T>(
  webViewRef: WebView | null,
  eventEmitter: EventEmitter,
  type: keyof typeof playerHandlers,
  callback: boolean = true,
  ...args: Array<any>
): Promise<T extends void ? void : T> {
  if (!playerHandlers[type]) Promise.reject("Unknown method");
  //@ts-ignore
  const injectedJs = playerHandlers[type](...args);
  webViewRef?.injectJavaScript?.(injectedJs);
  if (callback) {
    return new Promise((resolve) => {
      eventEmitter.once(type, resolve);
    });
  }
  // @ts-ignore
  return Promise.resolve();
}

export function playerUpdate(
  webViewRef: WebView | null,
  type: keyof typeof playerProps,
  ...args: any
) {
  if (!playerProps[type]) {
    console.log("Unknown property update", type);
  } else {
    //@ts-ignore
    webViewRef?.injectJavaScript?.(playerProps[type](...args));
  }
  Promise.resolve();
}

export function playerScript(playerOptions: VimeoPlayerProperties) {
  const data = JSON.stringify(playerOptions);
  const urlEncodedJSON = encodeURI(data);

  const htmlString = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width," />
        <style>
          * {
            margin: 0;
          }
          .container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
          }
          #player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div id="player"></div>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
        <script src="https://unpkg.com/@vimeo-player/core@0.0.0/dist/browser/player.js"></script>
        <script>
          const urlQueryData = decodeURI("${urlEncodedJSON}");
          const options = JSON.parse(urlQueryData) || {};

          const Player = VimeoPlayer.VimeoPlayer;
          const eventHandlers = Object.entries(
            VimeoPlayer.VIMEO_PLAYER_EVENTS
          ).reduce((acc, [event, value]) => {
            acc[value] = (args) => {
              sendMessageToRN({event, data: args});
            };
            return acc;
          }, {});

          function sendMessageToRN(msg) {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify(msg));
            }
          }

          let player;

          Player.create(
            "player",
            Player.getInitialOptions(options),
            Player.getEventHandlers(eventHandlers)
          ).then((p) => {
            player = p;
          });
        </script>
      </body>
    </html>
  `;
  return {
    htmlString,
    urlEncodedJSON,
  };
}

/**
 * Get Player properties for initial load.
 */
export function getPlayerProperties(
  obj: VimeoPlayerProperties
): VimeoPlayerProperties {
  
  return {
    hash: obj.hash,
    video: obj.video,
    width: obj.width,
    height: obj.height,
    autopause: obj.autopause,
    autoplay: obj.autoplay,
    showByline: obj.showByline,
    color: obj.color,
    controls: obj.controls,
    loop: obj.loop,
    showPortrait: obj.showPortrait,
    showTitle: obj.showTitle,
    muted: obj.muted,
    background: obj.background,
    responsive: obj.responsive,
    dnt: obj.dnt,
    speed: obj.speed,
    texttrack: obj.texttrack,
    volume: obj.volume,
    start: obj.start,
  };
}
