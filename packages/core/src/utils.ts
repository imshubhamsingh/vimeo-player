import { VIMEO_PLAYER_EVENTS } from "./constants";
import {
  EventHandlersObj,
  PlayerOptions,
  VimeoPlayerProperties,
  VimeoEmbede,
} from "./type";

// Empty function
const noop = () => console.log;

export function getVimeoUrl(id: string): number;
export function getVimeoUrl(id: string, hash?: string): string;
export function getVimeoUrl(id: string, hash?: string) {
  if (hash) {
    return `https://player.vimeo.com/video/${+id}?h=${hash}`;
  }
  return +id;
}

/**
 * It forms Vimeo player options params
 */
export function getInitialPlayerOptions(
  obj: VimeoPlayerProperties
): PlayerOptions {
  const videoDetails: { url?: string; id?: number } = {};
  if (obj.hash) {
    // Unlisted videos
    videoDetails.url = getVimeoUrl(obj.video, obj.hash);
  } else {
    videoDetails.id = getVimeoUrl(obj.video);
  }
  return {
    ...videoDetails,
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
  };
}

/**
 * It forms event handlers for vimeo player
 */
export function getPlayerEventHandlers(obj: any): EventHandlersObj {
  const handlers: EventHandlersObj = {};
  Object.values(VIMEO_PLAYER_EVENTS).map((events) => {
    handlers[events] = obj[events] ? obj[events] : noop;
  });
  return handlers;
}

/**
 * It returns video details
 */
export async function getVideoDetails(
  id: string,
  hash?: string
): Promise<VimeoEmbede | {}> {
  let details = {};
  try {
    const vimeoUrl = `https://player.vimeo.com/video/${+id}${
      hash ? `/${hash}` : ""
    }`;
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${vimeoUrl}`
    );
    if (res.ok) {
      const data: VimeoEmbede = await res.json();
      details = {
        ...data,
      };
    }
  } catch (err) {}

  return details;
}
