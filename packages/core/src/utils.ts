import type { EventCallback, Options } from "@vimeo/player";
import { VIMEO_PLAYER_EVENTS } from "./constants";

export type EventHandlersObj = { [key: string]: EventCallback };

export type VimeoPlayerOptions = Omit<Options, "id"> & {
  video: string;
  showTitle?: boolean;
  showPortrait?: boolean;
  showByline?: boolean;
  start?: number;
  volume?: number;
};

// Empty function
const noop = () => {};

/**
 * It forms Vimeo player options params
 */
export function getInitialPlayerOptions(obj: VimeoPlayerOptions): Options {
  return {
    id: +obj.video,
    width: obj.width,
    height: obj.height,
    autopause: obj.autopause,
    autoplay: obj.autoplay,
    byline: obj.showByline,
    color: obj.color,
    controls: obj.controls,
    loop: obj.loop,
    portrait: obj.showPortrait,
    title: obj.showTitle,
    muted: obj.muted,
    background: obj.background,
    responsive: obj.responsive,
    dnt: obj.dnt,
    speed: obj.speed,
  };
}

/**
 * It forms event handlers for vimeo player
 */
export function getPlayerEventHandlers(obj: any): EventHandlersObj {
  const handlers: EventHandlersObj = {};
  Object.values(VIMEO_PLAYER_EVENTS).map((events) => {
    handlers[events] = obj?.[events] ?? noop;
  });
  return handlers;
}
