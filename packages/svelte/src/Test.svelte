<script>
  import Player from './Player.svelte'
  let paused = false
</script>

<Player {paused} on:play={(props) => console.log(props)} />
