<template>
  <div>
    <vimeo-player
      video="323783503"
      @ref="onPlayerRef"
      @play="onPlay"
      @error="onError"
      @pause="onPause"
    />
    <div>
      <button @click="() => seek(-10)">-10s ⏪</button>
      <button @click="() => seek(-5)">-5s ◀️</button>
      <button @click="() => seek(5)">+5s ▶️</button>
      <button @click="() => seek(10)">+10s ⏩</button>
    </div>
  </div>
</template>

<script>
import { Player } from '@vimeo-player/vue'

export default {
  name: 'Hello',
  data() {
    return {
      player: null,
    }
  },
  components: {
    VimeoPlayer: Player,
  },
  methods: {
    onReady: (inst) => {
      console.log('ready now', inst)
    },
    onPlay: (args) => {
      console.log('play')
    },
    onPause: (args) => {
      console.log('pause')
    },
    onPlayerRef(ref){
      console.log('ref', ref)
      this.playerRef = ref
    },
    onError: (err) => {
      console.log(err)
    },
    async seek(value) {
      console.log('seeked clicked', value, this.playerRef)
      const playerRef = this.playerRef;
      if (!playerRef) return
      const totalTime = await playerRef.getDuration()
      const getCurrentTime = await playerRef.getCurrentTime()
      await playerRef.seekTo(
        Math.min(Math.max(getCurrentTime + value, 0), totalTime)
      )
    },
  },
}
</script>