import { VimeoPlayerEvents } from "./type";

// https://github.com/vimeo/player.js/#events
export const VIMEO_PLAYER_EVENTS: Readonly<{
  [key in keyof VimeoPlayerEvents]: string;
}> = Object.freeze({
  play: "onPlay",
  playing: "onPlaying",
  pause: "onPause",
  ended: "onEnd",
  timeupdate: "onTimeUpdate",
  progress: "onProgress",
  seeking: "onSeeking",
  seeked: "onSeeked",
  texttrackchange: "onTextTrackChange",
  chapterchange: "onChapterChange",
  // cuechange: "onCueChange",
  cuepoint: "onCuePoint",
  volumechange: "onVolumeChange",
  playbackratechange: "onPlaybackRateChange",
  bufferstart: "onBufferStart",
  bufferend: "onBufferEnd",
  error: "onError",
  loaded: "onLoaded",
  // durationchange: "onDurationChange",
  fullscreenchange: "onFullScreenChange",
  qualitychange: "onQualityChange",
  // camerachange: 'onCameraChange',
  resize: "onResize",
  enterpictureinpicture: "onEnterPictureinPicture",
  leavepictureinpicture: "onLeavePictureinPicture",
  /**
   * Custom events
   */
  ready: "onReady",
});

// https://github.com/vimeo/player.js/#methods
export const VIMEO_CONFIGS = Object.freeze({
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
  HASH: "h",
});
