<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import {
    playerEvents,
    playerProperties,
  } from '../../../../config/storybook/player'
  import Player from '../Player.svelte'
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
    on:timeupdate={args.onTimeUpdate}
    on:play={args.onPlay}
    on:pause={args.onPause}
    on:seeked={args.seeked}
  />
</Template>

<Story
  name="Test Player"
  args={{ video: '323783503', muted: true, quality: '360p' }}
/>

<Story
  name="Loop Cover Player"
  args={{
    video: '59777392',
    loop: true,
    background: true,
    volume: 0,
  }}
/>
