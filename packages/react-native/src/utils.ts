import { VimeoPlayerProperties } from "@vimeo-player/core";
import { EventEmitter } from "events";
import { WebView } from "react-native-webview";

export const player = {
  getDuration: () =>
    `sendMessageToRN({ event: 'getDuration', data: player.instance.getDuration() })`,
  paused: (pausedValue: boolean) =>
    `player.instance.update('paused', ${pausedValue})`,
};

export function recievedOnce(
  webViewRef: WebView | null,
  eventEmitter: EventEmitter,
  type: keyof typeof player,
  ...args: Array<any>
) {
  if (!player[type]) Promise.reject("Unknown method");
  //@ts-ignore
  webViewRef?.injectJavaScript?.(player[type](...args));
  return new Promise((resolve) => {
    eventEmitter.once(type, resolve);
  });
}

export function playerUpdate(
  webViewRef: WebView | null,
  type: keyof typeof player,
  ...args: any
) {
  if (!player[type]) Promise.reject("Unknown property update");
  console.log(webViewRef, type);
  //@ts-ignore
  webViewRef?.injectJavaScript?.(player[type](...args));
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
        <script src="https://vimeo-player.vercel.app/scripts/core.js"></script>
        <script>
          const urlQueryData = decodeURI("${urlEncodedJSON}");
          const Player = VimeoPlayer.VimeoPlayer;
          const options = JSON.parse(urlQueryData) || {};

          function sendMessageToRN(msg) {
            const msgStr = JSON.stringify(msg);
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(msgStr);
            } else if (window.parent) {
              window.parent.postMessage(msgStr, "*");
            } else {
              window.postMessage(msgStr, "*");
            }
          }

          const eventHandlers = Object.entries(
            VimeoPlayer.VIMEO_PLAYER_EVENTS
          ).reduce((acc, [event, value]) => {
            acc[value] = (...args) => {
              sendMessageToRN({ event, data: args });
            };
            return acc;
          }, {});

          const player = Player.create(
            "player",
            Player.getInitialOptions(options),
            Player.getEventHandlers(eventHandlers)
          );
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
