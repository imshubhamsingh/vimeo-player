<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import Player from '../Player.svelte'
</script>

<Meta
  title="Svelte Vimeo Player"
  component={Player}
  argTypes={{
    volume: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    paused: { control: { type: 'boolean', defaultValue: false } },
    color: { control: { type: 'color' } },
    quality: {
      options: ['4K', '2K', '1080p', '720p', '540p', '360p', '240p'],
      control: { type: 'radio' },
    },
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
  }}
/>

<Template let:args>
  <Player {...args} />
</Template>

<Story name="Test Player" args={{}} />

<Story
  name="Loop Cover Player"
  args={{
    video: '59777392',
    loop: true,
    background: true,
    volume: 0,
  }}
/>
