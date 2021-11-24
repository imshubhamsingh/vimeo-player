// https://github.com/vimeo/player.js/#events
export const VIMEO_PLAYER_EVENTS = {
  play: "onPlay",
  pause: "onPause",
  ended: "onEnd",
  timeupdate: "onTimeUpdate",
  progress: "onProgress",
  seeked: "onSeeked",
  texttrackchange: "onTextTrackChange",
  cuechange: "onCueChange",
  cuepoint: "onCuePoint",
  volumechange: "onVolumeChange",
  playbackratechange: "onPlaybackRateChange",
  error: "onError",
  loaded: "onLoaded",
  resize: "onResize",
  enterpictureinpicture: "onEnterPictureinPicture",
  leavepictureinpicture: "onLeavePictureinPicture",
  /****** custom *******/
  ready: "onReady",
};

// https://github.com/vimeo/player.js/#methods
export const VIMEO_CONFIGS = {
  COLOR: "color",
  AUTO_PAUSE: "autopause",
  VOLUME: "volume",
  LOOP: "loop",
  PAUSED: "paused",
  VIDEO: "video",
};
