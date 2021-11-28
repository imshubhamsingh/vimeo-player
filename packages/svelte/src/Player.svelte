<script lang="ts">
  import {
    VimeoPlayer,
    VimeoPlayerEvents,
    VIMEO_PLAYER_EVENTS,
    VimeoPlayerProperties,
  } from '@vimeo-player/core'
  import { onMount, createEventDispatcher, onDestroy } from 'svelte'

  let player: VimeoPlayer
  let container
  const dispatch = createEventDispatcher<{
    bufferend: VimeoPlayerEvents['bufferend']
    bufferstart: VimeoPlayerEvents['bufferstart']
    chapterchange: VimeoPlayerEvents['chapterchange']
    cuepoint: VimeoPlayerEvents['cuepoint']
    ended: VimeoPlayerEvents['ended']
    // enterpictureinpicture: VimeoPlayerEvents['enterpictureinpicture']
    // error: VimeoPlayerEvents['error']
    // leavepictureinpicture: VimeoPlayerEvents['leavepictureinpicture']
    // loaded: VimeoPlayerEvents['loaded']
    pause: VimeoPlayerEvents['pause']
    play: VimeoPlayerEvents['play']
    playbackratechange: VimeoPlayerEvents['playbackratechange']
    progress: VimeoPlayerEvents['progress']
    ready: VimeoPlayerEvents['ready']
    resize: VimeoPlayerEvents['resize']
    seeked: VimeoPlayerEvents['seeked']
    texttrackchange: VimeoPlayerEvents['texttrackchange']
    timeupdate: VimeoPlayerEvents['timeupdate']
    volumechange: VimeoPlayerEvents['volumechange']
  }>()

  /* ************ player properties ******************* */
  export let video: VimeoPlayerProperties['video']
  export let volume: VimeoPlayerProperties['volume']
  export let paused: VimeoPlayerProperties['paused']

  /**************************************************** */

  const eventHandlers = () => {
    return Object.keys(VIMEO_PLAYER_EVENTS).map(
      (event: keyof VimeoPlayerEvents) => {
        return (...args) => dispatch(event, ...args)
      }
    )
  }

  onMount(async () => {
    const props = {
      video,
      volume,
      paused,
    }
    player = await VimeoPlayer.create(
      container,
      VimeoPlayer.getInitialOptions(props),
      VimeoPlayer.getEventHandlers(eventHandlers)
    )
    // Player loaded
    if (player) dispatch('ready', player.instance)
  })

  onDestroy(() => {
    if (player) {
      player.instance.destroy()
    }
  })
</script>

<div bind:this={container} />
