import type { Options } from "@vimeo/player";
import { VIMEO_PLAYER_EVENTS } from "./constants";
import { EventHandlersObj, VimeoPlayerOptions } from "./type";

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
    texttrack: obj.language,
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
