# @vimeo-player/react

`@vimeo-player/react` is unoffical wrapper for Vimeo player using it player sdk. This package contains the React(>=16.8) bindings that wrap around `@vimeo-player/core`.

# Installation
This module is distributed via npm which is bundled with node and should be installed as one of your project's dependencies:

npm install --save @vimeo-player/core @vimeo-player/react
This package also depends on `@vimeo/player` and react. Please make sure you have it installed as well.

Note also this library supports preact out of the box. 👍

# Usage
```tsx
import React from "react";
import { Player as Vimeo, ImperativeHandle } from "@vimeo-player/react";

function App() {
  // player ref
  const ref = React.useRef<ImperativeHandle>(null);
  // video id
  const [videoId, setVideoId] = React.useState("video_id");
  // control paused state
  const [paused, setPaused] = React.useState(false);
  // control muted
  const [muted, setMuted] = React.useState(false);

  async function seek(value: number) {
    if (!ref.current) return;
    const totalTime = await ref.current.getDuration();
    const getCurrentTime = await ref.current.getCurrentTime();
    await ref.current.seekTo(
      Math.min(Math.max(getCurrentTime + value, 0), totalTime)
    );
  }
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Vimeo
            video={videoId}
            ref={ref}
            autoplay={true}
            autopause={true}
            className="vid"
            background={false}
            controls={false}
            dnt={false}
            language="en"
            loop={false}
            muted={true}
            speed={true}
            quality={"360p"}
            responsive={true}
            showByline={true}
            showPortrait={true}
            showTitle={true}
            onReady={() => {
              console.log("ready");
            }}
            onPlay={() => console.log("playing")}
            onPause={() => console.log("paused")}
          />
          <div>
            <button onClick={() => seek(-10)}>-10s ⏪</button>
            <button onClick={() => seek(-5)}>-5s ◀️</button>
            <button onClick={() => seek(5)}>+5s ▶️</button>
            <button onClick={() => seek(10)}>+10s ⏩</button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# Player Props
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| video | number, string |  | Vimeo video ID |
| hash | string |  | Vimeo video hash for unlisted videos |
| as | string |  | DOM tag name for the player element. |
| id | string |  | DOM ID for the player element. |
| className | string |  | CSS className for the video container element. |
| style | object |  | Inline style for video container element. |
| showTitle | bool | true | Show tile of video. |
| showPortrait | bool | true | Show user's profile pic beside title |
| showByline | bool | true | Show Bylines (Owner info) below video title |
| start | number |  | Controls Start time of video. |
| volume | number |  | Controls the playback volume of video between 0 and 1. |
| paused | bool |  | Controls the pause function of video. |
| height | number |  | Height of Video iframe. Aspect ratio is mantained. If `responsive` is set to true, height value is not respected. Also for arbitrary values Aspect ratio is mantained. |
| width | number |  | Width of Video iframe. If `responsive` is set to true, width value is not respected. Also for arbitrary values Aspect ratio is mantained. |
| texttrack | "en", "es", "fr", "jp", "ko", "de" |  | Controls the language of text track captions/subtitle. |
| autoplay | bool | false | Automatically start playback of the video. Ensure that `muted` is set to true for it to work. This is done to meet browser's auto play policy. |
| autopause | bool | true | Pauses the video when other players are running. Usefull when more than one player are running. |
| background | bool | false | Enables player background mode, that hides player controls, autoplays and loop functionality. |
| loop | bool | false | Loops the video when it reaches the end. If this is set to true; `onEnd` will not be ever called. |
| muted | bool | false | Mutes the video. If you set autoplay to `true`; ensure muted is also set to `true` |
| quality | 4K", "2K", "1080p", "720p", "540p", "360p", "240p" | | Quality of the video can be set if it is enabled for the video by Vimeo Plus member and higher. |
| playsinline | bool | | Plays video in inline mode. |
| speed | bool | false | Control the visibility of speed control in player. To use this feature, video owner mush be PRO or above user. |
| dnt | bool | false | Block your player from tracking any video watch. Helpfull when dealing with security regulation like GDPR etc. |
| responsive | bool | false | Rezies the player container accoding to parent container. |
| controls | bool | true | Hide all element in player. Available to PRO and above users. |
| color | string | | Control the color of video color. If color is already set in preferences, it will be overridden. |
| onPlay | function |  | Triggered when video playback is initiated. |
| onPlaying | function |  | Triggered when the video starts playing. |
| onPause | function |  | Triggered when the video pauses. |
| onEnd | function |  | Triggered any time the video playback reaches the end. Note: when loop is set to true, the ended event will not fire. |
| onTimeUpdate | function |  | Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser. |
| onProgress | function |  | Triggers when the video is loading. The params indicates how much data is loaded in buffer. This is not equivalent to `onTimeUpdate` which shows current time. |
| onSeeking | function |  | Triggered when the player starts seeking to a specific time. A timeupdate event will also be fired at the same time. |
| onSeeked | function |  | Triggered when the player seeks to a specific time. `onTimeupdate` props will also be fired at the same time. |
| onTextTrackChange | function |  | Triggered when the player seeks to a specific time. `onTimeupdate` props will also be fired at the same time. |
| onChapterChange | function |  | Triggred when chapter is changed. |
| onCuePoint | function |  | Triggered when the current time hits a registered cue point. |
| onVolumeChange | function |  | Triggered when the volume in the player changes. NOTE: Some devices do not support setting the volume of the video independently from the system volume, so this event will never fire on those devices. |
| onPlaybackRateChange | function |  | Triggered when the playback rate of the video in the player changes. NOTE: The ability to change rate can be disabled by the creator and the event will not fire for those videos. |
| onBufferStart | function |  | Triggers when buffer starts in player. |
| onBufferEnd | function |  | Triggers when buffer end in player |
| onError | function |  | Triggered when some kind of error is generated in the player. |
| onLoaded | function |  | Triggered when a new video is loaded in the player. |
| onFullScreenChange | function |  | Triggered when the player changes between full screen and normal mode. |
| onQualityChange | function |  | Triggered when the set quality changes. |
| onResize | function |  | Called when vimeo player is resized via height and width props. |
| onEnterPictureInPicture | function |  | Triggered when the player enters picture-in-picture |
| onLeavePictureInPicture | function |  | Triggered when the player leaves picture-in-picture. |
| onReady | function |  | Called when vimeo player is loaded. |

More details on props is available [here](https://github.com/imshubhamsingh/vimeo-player/blob/main/packages/core/src/type.ts#L438)
# Examples

Checkout below examples for its usage

- [With Create React App](https://github.com/imshubhamsingh/vimeo-player/tree/main/examples/with-cra)
- [With Next.js](https://github.com/imshubhamsingh/vimeo-player/tree/main/examples/with-nextjs)
- [With Preact](https://github.com/imshubhamsingh/vimeo-player/tree/main/examples/with-preact)
