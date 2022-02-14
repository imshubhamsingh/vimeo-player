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

  /* ************ player properties which have default value or used when props updates ******************* */
  export let video: VimeoPlayerProperties["video"];
  export let hash: VimeoPlayerProperties["hash"];
  export let autoplay: VimeoPlayerProperties["autoplay"] = false;
  export let autopause: VimeoPlayerProperties["autopause"] = true;
  export let background: VimeoPlayerProperties["background"] = false;
  export let showByline: VimeoPlayerProperties["showByline"] = true;
  export let color: VimeoPlayerProperties["color"];
  export let controls: VimeoPlayerProperties["controls"] = false;
  export let dnt: VimeoPlayerProperties["dnt"] = false;
  export let loop: VimeoPlayerProperties["loop"] = false;
  export let muted: VimeoPlayerProperties["muted"] = false;
  export let responsive: VimeoPlayerProperties["responsive"] = true;
  export let showPortrait: VimeoPlayerProperties["showPortrait"] = false;
  export let speed: VimeoPlayerProperties["speed"] = false;
  export let showTitle: VimeoPlayerProperties["showTitle"] = true;
  export let start: VimeoPlayerProperties["start"] = 0;
  export let volume: VimeoPlayerProperties["volume"] = 1;
  export let paused: VimeoPlayerProperties["paused"] = true;
  export let quality: VimeoPlayerProperties["quality"];

  /**************************************************** */

  export let ref: ImperativeHandle;

  let props = {
    hash,
    autopause,
    color,
    loop,
    muted,
    paused,
    video,
    volume,
    quality,
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
      VimeoPlayer.getInitialOptions({
        ...$$props,
        autopause: true,
        autoplay,
        background,
        controls,
        dnt,
        loop,
        start,
        muted,
        responsive,
        showByline,
        showPortrait,
        showTitle,
        speed,
        volume,
      } as VimeoPlayerProperties),
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
            start,
            volume,
            hash,
          });
        });
  });
</script>

<div bind:this={container} />
