<script lang="ts">
  import { VimeoPlayer, VIMEO_PLAYER_EVENTS } from '@vimeo-player/core'
  import type {
    VimeoPlayerEvents,
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
    enterpictureinpicture: VimeoPlayerEvents['enterpictureinpicture']
    error: VimeoPlayerEvents['error']
    leavepictureinpicture: VimeoPlayerEvents['leavepictureinpicture']
    loaded: VimeoPlayerEvents['loaded']
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
  export let autoplay: VimeoPlayerProperties['autoplay'] = false

  /**************************************************** */

  const eventHandlers = Object.entries(VIMEO_PLAYER_EVENTS).reduce(
    (acc, [event, value]) => {
      acc[value] = (...args) => {
        dispatch(event as keyof VimeoPlayerEvents, ...args)
      }
      return acc
    },
    {}
  )

  onMount(async () => {
    const props = {
      video,
      volume,
      paused,
      autoplay,
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
