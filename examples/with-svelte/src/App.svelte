<script lang="ts">
import type { ImperativeHandle } from "@vimeo-player/core";

  import Player from "@vimeo-player/svelte";
  export let name: string;
  let paused = true;
  let ref: ImperativeHandle; // player ref
  async function seek(value) {
    if (!ref.getDuration) return;
    const totalTime = await ref.getDuration();
    const getCurrentTime = await ref.getCurrentTime();
    await ref.seekTo(Math.min(Math.max(getCurrentTime + value, 0), totalTime));
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <Player
    video="323783503"
    paused={paused}
    bind:ref={ref}
    on:ready={({ detail }) => console.log("ready", detail)}
    on:play={({ detail }) => console.log("play", detail)}
    on:pause={({ detail }) => console.log("pause", detail)}
  />
  <div>
    <button on:click={() => seek(-10)}>-10s ⏪</button>
    <button on:click={() => seek(-5)}>-5s ◀️</button>
    <button on:click={() => seek(5)}>+5s ▶️</button>
    <button on:click={() => seek(10)}>+10s ⏩</button>
  </div>

  <div>
    <button
      on:click={() => {
        paused = true;
      }}>Pause ⏸</button
    >
    <button
      on:click={() => {
        paused = false;
      }}>Play ▶️</button
    >
  </div>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
