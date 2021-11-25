import type { EventCallback, Options, VimeoVideoQuality } from "@vimeo/player";
import { VIMEO_PLAYER_EVENTS } from "./constants";

export type EventHandlersObj = { [key: string]: EventCallback };

type callbackParams = {
  duration: number;
  percent: number;
  seconds: number;
};

export type VimeoPlayerOptions = Omit<
  Options,
  "id" | "title" | "texttrack" | "quality"
> & {
  video: string;
  showTitle?: boolean;
  showPortrait?: boolean;
  showByline?: boolean;
  start?: number;
  volume?: number;
  paused?: boolean;
  height?: number;
  width?: number;
  language?: string;
  /**
   * Quality of the video can be set if it is enabled for the video by Vimeo Plus member and higher.
   * More details: https://vimeo.zendesk.com/hc/en-us/articles/224983008-Setting-default-quality-for-embedded-videos
   */
  quality?: VimeoVideoQuality;
  /**
   * Triggered any time the video playback reaches the end. Note: when loop is set to true, the ended event will not fire.
   */
  onEnd?: (props: callbackParams) => void;
  /**
   * Triggered when video playback is initiated.
   */
  onPlay?: (props: callbackParams) => void;
  /**
   * Triggered when the video pauses.
   */
  onPause?: (props: callbackParams) => void;
  /**
   * Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser.
   */
  onTimeUpdate?: (props: callbackParams) => void;
  /**
   * Triggered when the player seeks to a specific time. `onTimeupdate` props will also be fired at the same time.
   */
  onSeeked?: (props: callbackParams) => void;
  /**
   * Triggered when the active text track (captions/subtitles) changes. The values will be null if text tracks are turned off.
   */
  onTextTrackChange?: (props: {
    kind: string;
    label: string;
    language: string;
  }) => void;
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
