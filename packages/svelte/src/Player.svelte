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
  export let autopause: VimeoPlayerProperties['autopause'] = false
  export let autoplay: VimeoPlayerProperties['autoplay'] = false
  export let background: VimeoPlayerProperties['background'] = false
  export let controls: VimeoPlayerProperties['controls'] = false
  export let dnt: VimeoPlayerProperties['dnt'] = false
  export let loop: VimeoPlayerProperties['loop'] = false
  export let muted: VimeoPlayerProperties['muted'] = false
  export let responsive: VimeoPlayerProperties['responsive'] = true
  export let showByline: VimeoPlayerProperties['showByline'] = true
  export let showPortrait: VimeoPlayerProperties['showPortrait'] = false
  export let showTitle: VimeoPlayerProperties['showTitle']
  export let speed: VimeoPlayerProperties['speed'] = false
  export let texttrack: VimeoPlayerProperties['texttrack'] = 'en'
  export let start: VimeoPlayerProperties['start']

  /**************************************************** */

  let props = {
    video,
    volume,
    paused,
    autopause,
    autoplay,
    background,
    controls,
    dnt,
    loop,
    responsive,
    muted,
    showByline,
    showPortrait,
    showTitle,
    speed,
    start,
    texttrack,
  }

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

  $: {
    const x = Object.values(VimeoPlayer.config)
      .filter((name: string) => $$props[name] !== props[name])
      .map((name) => {
        const prevProps = props[name]
        props[name] = $$props[name]
        return {
          name,
          prevProps,
          newProps: props[name],
        }
      })
    // .forEach((name: string) => {
    //   props[name] = $$props[name]
    //   player.update(name, props[name], {
    //     start: start,
    //     volume: volume,
    //   })
    // })
    console.log(x)
  }
</script>

<div bind:this={container} />
