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
        </div>
        <script src="https://f.vimeocdn.com/js/froogaloop2.min.js"></script>
        <script src="https://player.vimeo.com/api/player.js"></script>
        <script>
          const urlQueryData = decodeURI("${urlEncodedJSON}");
          const options = JSON.parse(urlQueryData) || {};
          const options = JSON.parse(UrlQueryData) || {};
          const queryString = (params = {}) =>
            Object.keys(params)
              .map((key) => key + "=" + params[key])
              .join("&");
          function getVimeoUrl(options = {}) {
            const url =
              options.video === "number"
                ? "https://player.vimeo.com/video/"
                : options.video;
            const params = {
              api: 1,
              autoplay: options.autoplay,
              loop: options.loop,
              controls: options.controls,
              speed: options.speed,
              player_id: "player",
              muted: options.muted,
            };
            const hash = {
              t: options.start,
            };
            return \`\${url}?\${queryString(params)}#\${queryString(hash)}\`;
          }
          let iframe;
          iframe = document.createElement("iframe");
          iframe.src = getVimeoUrl(options);
          iframe.width = "100%";
          iframe.height = "100%";
          iframe.frameBorder = "0";
          iframe.webkitallowfullscreen = true;
          iframe.allowfullscreen = true;
          iframe.mozallowfullscreen = true;
          iframe.allow = "autoplay;fullscreen";
          iframe.id = "player";
          document.body.appendChild(iframe);
          const player = $f(iframe);

          function sendMessageToRN(msg) {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify(msg));
            }
          }

          const VIMEO_PLAYER_EVENTS = Object.freeze({
            bufferend: "onBufferEnd",
            bufferstart: "onBufferStart",
            chapterchange: "onChapterChange",
            cuepoint: "onCuePoint",
            ended: "onEnd",
            enterpictureinpicture: "onEnterPictureinPicture",
            error: "onError",
            leavepictureinpicture: "onLeavePictureinPicture",
            loaded: "onLoaded",
            pause: "onPause",
            play: "onPlay",
            playbackratechange: "onPlaybackRateChange",
            progress: "onProgress",
            ready: "onReady",
            resize: "onResize",
            seeked: "onSeeked",
            texttrackchange: "onTextTrackChange",
            timeupdate: "onTimeUpdate",
            volumechange: "onVolumeChange",
          });

          const eventHandlers = () =>
            Object.entries(VIMEO_PLAYER_EVENTS).forEach(([event, value]) => {
              player.addEvent(event, (data) => {
                console.log(event, ...args);
                sendMessageToRN(event, {callback: value, ...args});
              });
            });
          
          eventHandlers();
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
