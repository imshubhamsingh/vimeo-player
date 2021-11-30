<script>
    
    import Player from '@vimeo-player/svelte';
    let paused = true;
    let ref;
    $: {
        console.log("paused", paused)
    }
</script>
<Player 
video="323783503" 
paused={paused}
bid:ref={ref}
on:ready={({detail}) => console.log("ready", detail)} 
on:play={({detail}) => console.log("play", detail)}
on:pause={({detail}) => console.log("pause", detail)}
/>

<div>
    <button on:click={() => {paused=true}}>Pause ⏸</button>
    <button on:click={() => {paused=false}}>Play ▶️</button>
  </div>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
