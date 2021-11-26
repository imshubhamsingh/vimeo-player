// https://github.com/vimeo/player.js/#events
export const VIMEO_PLAYER_EVENTS = {
  //TODO: streamline api for CUE POINTs
  // cuechange: "onCueChange",
  // cuepoint: "onCuePoint",
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
  bufferstart: "onBufferStart",
  bufferend: "onBufferEnd",
};

// https://github.com/vimeo/player.js/#methods
export const VIMEO_CONFIGS = {
  AUTO_PAUSE: "autopause",
  COLOR: "color",
  LOOP: "loop",
  MUTED: "muted",
  PAUSED: "paused",
  VIDEO: "video",
  VOLUME: "volume",
  HEIGHT: "height",
  WIDTH: "width",
  QUALITY: "quality",
};
