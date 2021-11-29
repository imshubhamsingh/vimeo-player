<script>
    import Player from '@vimeo-player/svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<Player on:play={(e) => console.log(e)} />
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
