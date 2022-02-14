export const playerProperties = {
  volume: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  paused: { control: { type: 'boolean', defaultValue: false } },
  color: { control: { type: 'color' } },
  quality: {
    options: ['4K', '2K', '1080p', '720p', '540p', '360p', '240p'],
    control: { type: 'radio' },
  },
};

export const playerEvents = {
  onPlay: {
    action: 'play',
  },
  onPlaying: {
    action: 'playing',
  },
  onPause: {
    action: 'pause',
  },
  onEnd: {
    action: 'ended',
  },
  onTimeUpdate: {
    action: 'timeupdate',
  },
  onProgress: {
    action: 'progress',
  },
  onSeeking: {
    action: 'seeking',
  },
  onSeeked: {
    action: 'seeked',
  },
  onTextTrackChange: {
    action: 'texttrackchange',
  },
  onChapterChange: {
    action: 'chapterchange',
  },
  // onCueChange: {
  //   action: 'cuechange',
  // },
  onCuePoint: {
    action: 'cuepoint',
  },
  onVolumeChange: {
    action: 'volumechange',
  },
  onPlaybackRateChange: {
    action: 'playbackratechange',
  },
  onBufferStart: {
    action: 'bufferstart',
  },
  onBufferEnd: {
    action: 'bufferend',
  },
  onError: {
    action: 'error',
  },
  onLoaded: {
    action: 'loaded',
  },
  onFullScreenChange: {
    action: 'fullscreenchange',
  },
  onQualityChange: {
    action: 'qualitychange',
  },
  onResize: {
    action: 'resize',
  },
  onEnterPictureinPicture: {
    action: 'enterpictureinpicture',
  },
  onLeavePictureinPicture: {
    action: 'leavepictureinpicture',
  },
  onReady: {
    action: 'ready',
  },
};
