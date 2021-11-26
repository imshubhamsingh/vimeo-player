import type {
  EventCallback,
  Options,
  VimeoVideoQuality,
  VimeoPromise,
  Player,
} from "@vimeo/player";

export type EventHandlersObj = { [key: string]: EventCallback };

export type callbackParams = {
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
   * Automatically start playback of the video. Ensure that `muted` is set to true for it to work.
   * This is done to meet browser's auto play policy.
   * More details here: https://help.vimeo.com/hc/en-us/articles/115004485728-Autoplaying-and-looping-embedded-videos
   */
  autoplay?: boolean;
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
  /**
   * Called when vimeo player is loaded
   */
  onReady?: (player: Player) => void;
};

export type UpdateOptions = {
  start?: number;
  volume?: number;
};

export type ImperativeHandle = {
  /**
   * Get the duration of the video in seconds. It will be rounded to the nearest
   * second before playback begins, and to the nearest thousandth of a second after playback begins.
   */
  getDuration: () => VimeoPromise<number, Error>;
  /**
   * Get the current playback position in seconds.
   */
  getCurrentTime: () => VimeoPromise<number, Error>;
  /**
   * Check if the current playing video is muted.
   */
  isMuted: () => VimeoPromise<boolean, Error>;
  /**
   * Get the current volume level of the player on a scale from 0 to 1.
   */
  getVolume: () => VimeoPromise<number, Error>;
  /**
   * Get the playback rate of the player on a scale from 0.5 to 2.
   */
  getPlaybackRate: () => VimeoPromise<number, Error>;
  /**
   * Set the current playback position in seconds. Once playback has started, if the player was paused,
   * it will remain paused. Likewise, if the player was playing, it will resume playing once the video has buffered.
   * Setting the current time before playback has started will cause playback to start.
   */
  seekTo: (seconds: number) => VimeoPromise<number, RangeError | Error>;
};
