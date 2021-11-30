<script>
  import Player from '@vimeo-player/svelte';
  let paused = true;
  let ref; // player ref
  async function seek(value) {
    if (!ref.getDuration) return;
    const totalTime = await ref.getDuration();
    const getCurrentTime = await ref.getCurrentTime();
    await ref.seekTo(Math.min(Math.max(getCurrentTime + value, 0), totalTime));
  }
</script>

<h1>Welcome to SvelteKit</h1>
<Player
  video="323783503"
  {paused}
  bind:ref
  on:ready={({ detail }) => console.log('ready', detail)}
  on:play={({ detail }) => console.log('play', detail)}
  on:pause={({ detail }) => console.log('pause', detail)}
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

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
