import * as React from "react";
import {
  VimeoPlayer,
  ImperativeHandle,
  VimeoPlayerOptions,
} from "@vimeo-player/core";

export interface PlayerProps extends VimeoPlayerOptions {
  as?: keyof JSX.IntrinsicElements | "div";
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export type { ImperativeHandle };

const Player = React.forwardRef<ImperativeHandle, PlayerProps>((props, ref) => {
  const {
    as = "div",
    start,
    volume,
    autopause,
    color,
    loop,
    muted,
    paused,
    video,
    id,
    className,
    style,
    height,
    width,
  } = props;
  const container = React.useRef<HTMLElement | null>(null);
  const player = React.useRef<VimeoPlayer | null>(null);
  const mounted = React.useRef<boolean>(false);
  const [loaded, setLoaded] = React.useState(false);

  const prevProps = React.useRef({
    autopause,
    color,
    loop,
    muted,
    paused,
    video,
    volume,
  });

  React.useEffect(() => {
    async function getPlayerInstance() {
      if (container.current) {
        player.current = await VimeoPlayer.create(
          container.current,
          VimeoPlayer.getInitialOptions(props),
          VimeoPlayer.getEventHandlers(props)
        );
        // Player loaded
        setLoaded(true);
      }
    }
    getPlayerInstance();

    return () => {
      player.current?.instance.destroy();
      player.current = null;
      container.current = null;
    };
  }, []);

  // componentDidUpdate Equivalent
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      Object.values(VimeoPlayer.config)
        //@ts-ignore TODO check how tslint error can be fix
        .filter((name) => props[name] !== prevProps.current[name])
        .map((name) => {
          //@ts-ignore TODO check how tslint error can be fix
          prevProps.current[name] = props[name];
          //@ts-ignore TODO check how tslint error can be fix
          player.current.update(name, props[name], {
            start: start,
            volume: volume,
          });
        });
    }
  }, [autopause, color, loop, muted, paused, video, volume, height, width]);

  React.useImperativeHandle(
    ref,
    () => VimeoPlayer.imperativeHandle(player.current as VimeoPlayer),
    [loaded]
  );

  return React.createElement(as, {
    ref: container,
    className,
    id,
    style,
  });
});

Player.defaultProps = {
  autopause: true,
  autoplay: false,
  background: false,
  controls: false,
  dnt: false,
  loop: false,
  muted: false,
  // If responsive is set to true, height and width is not respected
  responsive: true,
  showByline: true,
  showPortrait: true,
  showTitle: true,
  speed: true,
  volume: 1,
  language: "en",
};

export { Player };
