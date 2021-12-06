<script lang="ts">
import { defineComponent, h, onMounted, ref, watch, PropType } from 'vue-demi'
import {
  VimeoPlayer,
  VimeoPlayerEvents,
  VimeoPlayerProperties,
  VIMEO_PLAYER_EVENTS,
} from '@vimeo-player/core'

export default defineComponent({
  name: 'VimeoPlayer',
  props: {
    video: {
      type: String as PropType<VimeoPlayerProperties['video']>,
      required: true,
    },
    paused: {
      type: Boolean as PropType<VimeoPlayerProperties['paused']>,
      default: true,
    },
    autopause: {
      type: Boolean as PropType<VimeoPlayerProperties['autopause']>,
      default: false,
    },
    autoplay: {
      type: Boolean as PropType<VimeoPlayerProperties['autoplay']>,
      default: false,
    },
    background: {
      type: Boolean as PropType<VimeoPlayerProperties['background']>,
      default: false,
    },
    controls: {
      type: Boolean as PropType<VimeoPlayerProperties['controls']>,
      default: false,
    },
    dnt: {
      type: Boolean as PropType<VimeoPlayerProperties['dnt']>,
      default: false,
    },
    loop: {
      type: Boolean as PropType<VimeoPlayerProperties['loop']>,
      default: false,
    },
    muted: {
      type: Boolean as PropType<VimeoPlayerProperties['muted']>,
      default: false,
    },
    responsive: {
      type: Boolean as PropType<VimeoPlayerProperties['responsive']>,
      default: true,
    },
    showByline: {
      type: Boolean as PropType<VimeoPlayerProperties['showByline']>,
      default: false,
    },
    showPortrait: {
      type: Boolean as PropType<VimeoPlayerProperties['showPortrait']>,
      default: false,
    },
    showTitle: {
      type: Boolean as PropType<VimeoPlayerProperties['showTitle']>,
      default: false,
    },
    speed: {
      type: Boolean as PropType<VimeoPlayerProperties['speed']>,
      default: false,
    },
    texttrack: {
      type: String as PropType<VimeoPlayerProperties['texttrack']>,
      default: 'en',
    },
    start: {
      type: Number as PropType<VimeoPlayerProperties['start']>,
      default: 0,
    },
  },
  emits: [...Object.keys(VIMEO_PLAYER_EVENTS)],
  setup(props, { emit }) {
    const player = ref(null)

    const eventHandlers = Object.entries(VIMEO_PLAYER_EVENTS).reduce(
      (acc, [event, value]) => {
        acc[value as keyof VimeoPlayerEvents] = (...args: any) => {
          emit(event as keyof VimeoPlayerEvents, ...args)
        }
        return acc
      },
      {} as { [K in keyof VimeoPlayerEvents]: (...args: any) => void }
    )
    const callback = () => {
      console.log('change')
    }
    watch(props, callback, { deep: true, immediate: true })
    onMounted(async () => {
      const player = await VimeoPlayer.create(
        this.$refs.container as HTMLDivElement,
        VimeoPlayer.getInitialOptions(props),
        VimeoPlayer.getEventHandlers(eventHandlers)
      )
    })
  },
  render() {
    return h('div', {
      ref: 'container',
    })
  },
})
</script>
