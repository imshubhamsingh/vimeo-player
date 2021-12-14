<script lang="ts">
  import {
    ImperativeHandle,
    VimeoPlayer,
    VIMEO_PLAYER_EVENTS,
  } from "@vimeo-player/core";
  import type {
    VimeoPlayerEvents,
    VimeoPlayerProperties,
  } from "@vimeo-player/core";
  import {
    onMount,
    createEventDispatcher,
    onDestroy,
    beforeUpdate,
  } from "svelte";

  let player: VimeoPlayer;
  let container: HTMLDivElement;

  const dispatch = createEventDispatcher<VimeoPlayerEvents>();

  /* ************ player properties ******************* */
  export let video: VimeoPlayerProperties["video"];
  export let volume: VimeoPlayerProperties["volume"] = 1;
  export let paused: VimeoPlayerProperties["paused"] = true;
  export let autopause: VimeoPlayerProperties["autopause"] = false;
  export let autoplay: VimeoPlayerProperties["autoplay"] = false;
  export let background: VimeoPlayerProperties["background"] = false;
  export let controls: VimeoPlayerProperties["controls"] = false;
  export let dnt: VimeoPlayerProperties["dnt"] = false;
  export let loop: VimeoPlayerProperties["loop"] = false;
  export let muted: VimeoPlayerProperties["muted"] = false;
  export let responsive: VimeoPlayerProperties["responsive"] = true;
  export let showByline: VimeoPlayerProperties["showByline"] = true;
  export let showPortrait: VimeoPlayerProperties["showPortrait"] = false;
  export let showTitle: VimeoPlayerProperties["showTitle"];
  export let speed: VimeoPlayerProperties["speed"] = false;
  export let texttrack: VimeoPlayerProperties["texttrack"] = "en";
  export let start: VimeoPlayerProperties["start"] = 0;

  /**************************************************** */

  export let ref: ImperativeHandle;

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
  };

  const eventHandlers = Object.entries(VIMEO_PLAYER_EVENTS).reduce(
    (acc, [event, value]) => {
      acc[value as keyof VimeoPlayerEvents] = (...args: any) => {
        dispatch(event as keyof VimeoPlayerEvents, ...args);
      };
      return acc;
    },
    {} as { [K in keyof VimeoPlayerEvents]: (...args: any) => void }
  );

  onMount(async () => {
    player = await VimeoPlayer.create(
      container,
      VimeoPlayer.getInitialOptions(props),
      VimeoPlayer.getEventHandlers(eventHandlers)
    );

    ref = VimeoPlayer.imperativeHandle(player as VimeoPlayer);

    // Player loaded
    if (player) dispatch("ready", player.instance);
  });

  onDestroy(() => {
    if (player) {
      player.instance.destroy();
    }
  });

  beforeUpdate(() => {
    player?.update &&
      Object.values(VimeoPlayer.config)
        .filter(
          (name) =>
            $$props[name] !== undefined &&
            $$props[name] !== props[name as keyof typeof props]
        )
        .forEach((name: string) => {
          // @ts-ignore
          props[name] = $$props[name];
          //@ts-ignore
          player.update(name, props[name], {
            start: start,
            volume: volume,
          });
        });
  });
</script>

<div bind:this={container} />
