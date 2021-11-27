import * as React from "react";
import {
  VimeoPlayer,
  ImperativeHandle,
  VimeoPlayerOptions,
} from "@vimeo-player/core";

export interface PlayerProps extends VimeoPlayerOptions {
  /**
   * Parent HTML Element tag name
   */
  as?: keyof JSX.IntrinsicElements | "div";
  /**
   * id selector
   */
  id?: string;
  /**
   * classname selector
   */
  className?: string;
  /**
   * React CSS object
   */
  style?: React.CSSProperties;
}

export type { ImperativeHandle };

/**
 * React Wrapper for Vimeo player using @vimeo/player
 */
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
    quality,
  } = props;
  const container = React.useRef<HTMLElement | null>(null);
  const player = React.useRef<VimeoPlayer | null>(null);
  const mounted = React.useRef<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const prevProps = React.useRef({
    autopause,
    color,
    loop,
    muted,
    paused,
    video,
    volume,
    quality,
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
        if (player.current) props?.onReady?.(player.current.instance);
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
      console.log("video props change");
      Object.values(VimeoPlayer.config)
        //@ts-ignore TODO check how tslint error can be fix
        .filter((name) => props[name] !== prevProps.current[name])
        .map((name) => {
          //@ts-ignore TODO check how tslint error can be fix
          prevProps.current[name] = props[name];
          //@ts-ignore TODO check how tslint error can be fix
          player.current?.update(name, props[name], {
            start: start,
            volume: volume,
          });
        });
    }
  }, [
    autopause,
    color,
    loop,
    muted,
    paused,
    video,
    volume,
    height,
    width,
    quality,
  ]);

  // Handler which can be used outside of component
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
  responsive: true,
  showByline: true,
  showPortrait: true,
  showTitle: true,
  speed: true,
  volume: 1,
  language: "en",
};

export { Player };
