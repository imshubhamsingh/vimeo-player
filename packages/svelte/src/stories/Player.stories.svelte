<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import {
    playerEvents,
    playerProperties,
  } from "../../../../config/storybook/player";
  import Player from "../Player.svelte";
</script>

<Meta
  title="Svelte Vimeo Player"
  component={Player}
  argTypes={{
    ...playerProperties,
    /**
     * TODO: check if there is better
     * representation for on binding in storybook
     */
    ...playerEvents,
  }}
/>

<Template let:args>
  <!-- TODO check why on:ready storybook action is not called -->
  <Player
    {...args}
    on:play={args.onPlay}
    on:playing={args.onPlaying}
    on:pause={args.onPause}
    on:ended={args.onEnd}
    on:timeupdate={args.onTimeUpdate}
    on:progress={args.onProgress}
    on:seeking={args.onSeeking}
    on:seeked={args.onSeeked}
    on:texttrackchange={args.onTextTrackChange}
    on:chapterchange={args.onChapterChange}
    on:cuepoint={args.onCuePoint}
    on:volumechange={args.onVolumeChange}
    on:playbackratechange={args.onPlaybackRateChange}
    on:bufferstart={args.onBufferStart}
    on:bufferend={args.onBufferEnd}
    on:error={args.onError}
    on:loaded={args.onLoaded}
    on:fullscreenchange={args.onFullScreenChange}
    on:qualitychange={args.onQualityChange}
    on:resize={args.onResize}
    on:enterpictureinpicture={args.onEnterPictureinPicture}
    on:leavepictureinpicture={args.onLeavePictureinPicture}
    on:ready={args.onReady}
  />
</Template>

<Story
  name="Test Player"
  args={{ video: "323783503", muted: true, quality: "360p" }}
/>

<Story
  name="Loop Cover Player"
  args={{
    video: "59777392",
    loop: true,
    background: true,
    volume: 0,
  }}
/>
