<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <vimeo-player video="323783503" @ready="onReady" @ref="playerRef" />
  </div>
</template>

<script>
import { Player } from '@vimeo-player/vue'

export default {
  name: 'HelloWorld',
  components: {
    VimeoPlayer: Player,
  },
  data: {
    playerRef: {}
  },
  methods: {
    onReady: (inst) => {
      console.log('ready now', inst)
    },
  },
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
