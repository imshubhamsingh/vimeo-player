<script lang="ts">
  import {
    ImperativeHandle,
    VimeoPlayer,
    VimeoPlayerOptions,
  } from '@vimeo-player/core'
  import { onMount, createEventDispatcher } from 'svelte'

  let player
  let container
  const dispatch = createEventDispatcher()

  const eventHandlers = {}

  onMount(async () => {
    //     const props: VimeoPlayerOptions = {
    //     };
    //   player = await VimeoPlayer.create(
    //         container,
    //         VimeoPlayer.getInitialOptions(props),
    //         VimeoPlayer.getEventHandlers(eventHandlers)
    //       )
    //       // Player loaded
    //       if (player) dispatch("ready", player.instance)
    //     }
  })
</script>

<div bind:this={container} />
