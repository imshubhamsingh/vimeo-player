import { VIMEO_PLAYER_EVENTS } from './constants'
import { EventHandlersObj, PlayerOptions, VimeoPlayerProperties } from './type'

// Empty function
const noop = () => console.log

/**
 * It forms Vimeo player options params
 */
export function getInitialPlayerOptions(
  obj: VimeoPlayerProperties
): PlayerOptions {
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
    texttrack: obj.texttrack,
    volume: obj.volume,
    start: obj.start,
  }
}

/**
 * It forms event handlers for vimeo player
 */
export function getPlayerEventHandlers(obj: any): EventHandlersObj {
  const handlers: EventHandlersObj = {}
  Object.values(VIMEO_PLAYER_EVENTS).map((events) => {
    handlers[events] = obj[events] ? obj[events] : noop
  })
  return handlers
}
