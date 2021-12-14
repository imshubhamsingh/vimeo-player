import {
  defineComponent,
  onMounted,
  ref,
  watch,
  PropType,
  onBeforeUnmount,
  isVue2,
  h,
} from "vue-demi";
import {
  VimeoPlayer,
  VimeoPlayerEvents,
  VimeoPlayerProperties,
  VIMEO_PLAYER_EVENTS,
} from "@vimeo-player/core";

export default defineComponent({
  name: "VimeoPlayer",
  props: {
    video: {
      type: String as PropType<VimeoPlayerProperties["video"]>,
      required: true,
    },
    paused: {
      type: Boolean as PropType<VimeoPlayerProperties["paused"]>,
      default: true,
    },
    autopause: {
      type: Boolean as PropType<VimeoPlayerProperties["autopause"]>,
      default: false,
    },
    autoplay: {
      type: Boolean as PropType<VimeoPlayerProperties["autoplay"]>,
      default: false,
    },
    background: {
      type: Boolean as PropType<VimeoPlayerProperties["background"]>,
      default: false,
    },
    controls: {
      type: Boolean as PropType<VimeoPlayerProperties["controls"]>,
      default: false,
    },
    dnt: {
      type: Boolean as PropType<VimeoPlayerProperties["dnt"]>,
      default: false,
    },
    loop: {
      type: Boolean as PropType<VimeoPlayerProperties["loop"]>,
      default: false,
    },
    muted: {
      type: Boolean as PropType<VimeoPlayerProperties["muted"]>,
      default: false,
    },
    responsive: {
      type: Boolean as PropType<VimeoPlayerProperties["responsive"]>,
      default: true,
    },
    showByline: {
      type: Boolean as PropType<VimeoPlayerProperties["showByline"]>,
      default: false,
    },
    showPortrait: {
      type: Boolean as PropType<VimeoPlayerProperties["showPortrait"]>,
      default: false,
    },
    showTitle: {
      type: Boolean as PropType<VimeoPlayerProperties["showTitle"]>,
      default: false,
    },
    speed: {
      type: Boolean as PropType<VimeoPlayerProperties["speed"]>,
      default: false,
    },
    texttrack: {
      type: String as PropType<VimeoPlayerProperties["texttrack"]>,
      default: "en",
    },
    start: {
      type: Number as PropType<VimeoPlayerProperties["start"]>,
      default: 0,
    },
    volume: {
      type: Number as PropType<VimeoPlayerProperties["volume"]>,
      default: 1,
    },
  },
  emits: [...Object.keys(VIMEO_PLAYER_EVENTS)],

  // @ts-ignore
  setup(props, { emit, refs }) {
    const container = ref<HTMLDivElement>();

    let player: VimeoPlayer | null = null;
    const eventHandlers = Object.entries(VIMEO_PLAYER_EVENTS).reduce(
      (acc, [event, value]) => {
        acc[value as keyof VimeoPlayerEvents] = (...args: any) => {
          emit(event as keyof VimeoPlayerEvents, ...args);
        };
        return acc;
      },
      {} as { [K in keyof VimeoPlayerEvents]: (...args: any) => void }
    );

    watch(
      props,
      (newValue, oldValue) => {
        Object.values(VimeoPlayer.config)
          .filter(
            (name) =>
              newValue[name as keyof typeof props] !==
              oldValue?.[name as keyof typeof props]
          )
          .forEach((name: string) => {
            player?.update(name, newValue[name as keyof typeof props], {
              start: props.start,
              volume: props.volume,
            });
          });
      },
      { deep: true, immediate: true }
    );
    onMounted(async () => {
      player = await VimeoPlayer.create(
        isVue2 ? refs["container"] : container.value,
        VimeoPlayer.getInitialOptions(props),
        VimeoPlayer.getEventHandlers(eventHandlers)
      );
      console.log(VimeoPlayer.imperativeHandle(player).getDuration());
      emit("ref", VimeoPlayer.imperativeHandle(player));
      // Player loaded
      if (player) emit("ready", player.instance);
    });

    onBeforeUnmount(() => {
      if (player?.instance) {
        player.instance.destroy();
      }
    });
    return () => {
      return h("div", {
        ref: isVue2 ? "container" : container,
      });
    };
  },
});
