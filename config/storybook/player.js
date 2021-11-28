export const playerProperties = {
  volume: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  paused: { control: { type: 'boolean', defaultValue: false } },
  color: { control: { type: 'color' } },
  quality: {
    options: ['4K', '2K', '1080p', '720p', '540p', '360p', '240p'],
    control: { type: 'radio' },
  },
}

export const playerEvents = {
  onCueChange: {
    action: 'cuechange',
  },
  onCuePoint: {
    action: 'cuepoint',
  },
  onEnd: {
    action: 'ended',
  },
  onEnterPictureinPicture: {
    action: 'enterpictureinpicture',
  },
  onError: {
    action: 'error',
  },
  onLeavePictureinPicture: {
    action: 'leavepictureinpicture',
  },
  onLoaded: {
    action: 'loaded',
  },
  onPause: {
    action: 'pause',
  },
  onPlay: {
    action: 'play',
  },
  onPlaybackRateChange: {
    action: 'playbackratechange',
  },
  onProgress: {
    action: 'progress',
  },
  onReady: {
    action: 'ready',
  },
  onResize: {
    action: 'resize',
  },
  onSeeked: {
    action: 'seeked',
  },
  onTextTrackChange: {
    action: 'texttrackchange',
  },
  onTimeUpdate: {
    action: 'timeupdate',
  },
  onVolumeChange: {
    action: 'volumechange',
  },
}
