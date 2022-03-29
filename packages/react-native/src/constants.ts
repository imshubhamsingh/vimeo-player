export const DEFAULT_BASE_URL = "https://vimeo-player.vercel.app/";

export const VIMEO_PLAYER_EVENTS = Object.freeze({
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

export const CUSTOM_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36";
