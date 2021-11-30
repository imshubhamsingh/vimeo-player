<script>
    import Player from '@vimeo-player/svelte';

</script>
<Player video="323783503" on:ready={e => console.log(e)} on:play={e => console.log(e)}/>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
