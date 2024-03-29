import type {
  EventCallback,
  Options,
  Player,
  UnsupportedError,
  VimeoCuePointData,
  VimeoPromise,
  VimeoVideoQuality,
} from "@vimeo/player";

export type EventHandlersObj = { [key: string]: EventCallback };

/**
 * Languages support by vimeo embede player for caption or subtitle.
 */
export type VimeoSupportedLanguages = "en" | "es" | "fr" | "jp" | "ko" | "de";

/**
 * Callback that gives video time details
 */
export type callbackParams = {
  /**
   * Totol duration of video
   */
  duration: number;
  /**
   * Percentage of video completed based on current time
   */
  percent: number;
  /**
   * Current time of video in seconds
   */
  seconds: number;
};

export type PlayerOptions = Options & {
  volume?: number;
  start?: number;
};

export type VimeoPlayerProperties = {
  /**
   * Vimeo video id
   */
  video: string | number;
  /**
   * Video hash - Used on privately listed videos
   */
  hash?: string;
  /**
   * Automatically start playback of the video. Ensure that `muted` is set to true for it to work.
   * This is done to meet browser's auto play policy.
   * More details here: https://help.vimeo.com/hc/en-us/articles/115004485728-Autoplaying-and-looping-embedded-videos
   */
  autoplay?: boolean;
  /**
   * Pauses the video when other players are running. Usefull when more than one player
   * are running.
   */
  autopause?: boolean;
  /**
   * Enables player background mode, that hides player controls, autoplays and loop
   * functionality. Userfull when showing vimeo videos as cover or background.
   */
  background?: boolean;
  /**
   * Show Bylines (Owner info) below video title
   */
  showByline?: boolean;
  /**
   * Control the color of video color. If color is already set in preferences,
   * it will be overridden.
   */
  color?: string;
  /**
   * Hide all element in player. Available to PRO and above users.
   */
  controls?: boolean;
  /**
   * Block your player from tracking any video watch. Helpfull when dealing with
   * security regulation like GDPR etc.
   */
  dnt?: boolean;
  /**
   * Height of Video iframe in px. Aspect ratio is mantained. If `responsive` is set to true, height value
   * is not respected. Also for arbitrary values Aspect ratio is mantained.
   */
  height?: number;
  /**
   * Allows for keyboard input to trigger player events.
   * If false, will ignore keyboard input. Tabbing will still be supported in either mode.
   */
  keyboard?: boolean;
  /**
   * Loops the video when it reaches the end. If this is set to true;
   * `onEnd` will not be ever called.
   */
  loop?: boolean;
  /**
   * Mutes the video. If you set autoplay to `true`; ensure muted is also set to `true`.
   */
  muted?: boolean;
  /**
   * Show the picture-in-picture button in the controlbar and enable the picture-in-picture API.
   */
  pip?: boolean;
  /**
   * Plays video in inline mode.
   */
  playsinline?: boolean;
  /**
   * Show user's profile pic beside title
   */
  showPortrait?: boolean;
  /**
   * Quality of the video can be set if it is enabled for the video by Vimeo Plus member and higher.
   * More details: https://vimeo.zendesk.com/hc/en-us/articles/224983008-Setting-default-quality-for-embedded-videos
   */
  quality?: VimeoVideoQuality;
  /**
   * Rezies the player container accoding to parent container.
   */
  responsive?: boolean;
  /**
   * Control the visibility of speed control in player. To use this feature, video owner mush be PRO or above user.
   */
  speed?: boolean;
  /**
   * Controls the language of text track captions/subtitle
   */
  texttrack?: VimeoSupportedLanguages;
  /**
   * Show tile of video.
   */
  showTitle?: boolean;
  /**
   * The responsive player and transparent background are enabled
   * by default, to disable set this parameter to false.
   */
  transparent?: boolean;
  /**
   * Width of Video iframe in px. If `responsive` is set to true, width value
   * is not respected. Also for arbitrary values Aspect ratio is mantained.
   */
  width?: number;
  /**
   * Controls Start time of video.
   */
  start?: number;
  /**
   * Controls the volume of video between 0 and 1.
   */
  volume?: number;
  /**
   * Controls the pause function of video.
   */
  paused?: boolean;
};

export type VimeoPlayerEvents = {
  /**
   * Triggered when video playback is initiated.
   */
  play: callbackParams;
  /**
   * Triggered when the video starts playing.
   */
  playing: callbackParams;
  /**
   * Triggered when the video pauses.
   */
  pause: callbackParams;
  /**
   * Triggered when vimeo player is loaded
   */
  ended: callbackParams;
  /**
   * Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser.
   */
  timeupdate: callbackParams;
  /**
   * Triggers when the video is loading. The params indicates how much data is loaded
   * in buffer.
   */
  progress: callbackParams;
  /**
   * Triggered when the player starts seeking to a specific time. A timeupdate event will also be fired at the same time.
   */
  seeking: callbackParams;
  /**
   * Triggered when the player seeks to a specific time.
   */
  seeked: callbackParams;
  /**
   * Triggered when the active text track (captions/subtitles) changes.
   */
  texttrackchange: {
    /**
     * Text track type
     */
    kind: "caption" | "subtitle";
    /**
     * Language + Kind
     * @example "English CC"
     */
    label: string;
    /**
     * It depends on the languages suported by the video.
     */
    language: VimeoSupportedLanguages;
  } | null;
  /**
   * Triggred when chapter is changed.
   */
  chapterchange: {
    /**
     * Start time of chapter in seconds.
     */
    startTime: number;
    /**
     * Title of chapter.
     */
    title: string;
    /**
     * Index property of each chapter is the place it holds in the order
     * of all the chapters. It starts at 1.
     */
    index: number;
  };
  /**
   * Triggered when the current time hits a registered cue point.
   */
  cuepoint: {
    /**
     * Current time in seconds.
     */
    time: number;
    /**
     * Data provided during addition of cue.
     */
    data: VimeoCuePointData;
    /**
     * Cue id
     */
    id: string;
  };
  /**
   * Triggered when the volume in the player changes.
   */
  volumechange: {
    /**
     * The value is between 0 and 1 included.
     */
    volume: number;
  };
  /**
   * Triggered when the playback rate of the video in the player changes.
   *
   */
  playbackratechange: {
    /**
     * The player playback rate which scales from 0.5 to 2.
     */
    playbackRate: number;
  };
  /**
   * Triggers when buffer end in player
   */
  bufferstart: void;
  /**
   * Triggers when buffer end in player
   */
  bufferend: void;

  /**
   * Triggered when some kind of error is generated in the player.
   */
  error: {
    /**
     * Error name
     */
    name: string;
    /**
     * Error message
     */
    message: string;
    /**
     * Method due to which error occured
     */
    method: string;
  };
  /**
   * Triggered when a new video is loaded in the player.
   */
  loaded: {
    /**
     * New video id
     */
    id: string;
  };
  /**
   * Triggered when the player enters or exits fullscreen.
   */
  fullscreenchange: {
    /**
     * Flag to tell wheather the user in fullscreen
     */
    fullscreen: boolean;
  };
  /**
   * Triggered when the set quality changes.
   */
  qualitychange: {
    /**
     * Vimeo player current quality
     */
    quality: VimeoVideoQuality;
  };
  /**
   * Triggers when player is resized via height and width props.
   */
  resize: {
    /**
     * Video new width in px.
     */
    videoWidth: number;
    /**
     * Video new height in px.
     */
    videoHeight: number;
  };
  /**
   *Triggered when the player enters picture-in-picture.
   */
  enterpictureinpicture: void;
  /**
   * Triggered when the player leaves picture-in-picture.
   */
  leavepictureinpicture: void;

  /**
   * Triggered when Vimeo player is ready and returns instance given by `@vimeo/player`
   */
  ready: Player;
};

export type VimeoPlayerEventHandlers = {
  /**
   * Triggered when video playback is initiated.
   */
  onPlay?: (props: VimeoPlayerEvents["play"]) => void;
  /**
   * Triggered when the video starts playing.
   */
  onPlaying?: (props: VimeoPlayerEvents["playing"]) => void;
  /**
   * Triggered when the video pauses.
   */
  onPause?: (props: VimeoPlayerEvents["pause"]) => void;
  /**
   * Triggered any time the video playback reaches the end. Note: when loop is set to true, the ended event will not fire.
   */
  onEnd?: (props: VimeoPlayerEvents["ended"]) => void;
  /**
   * Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser.
   */
  onTimeUpdate?: (props: VimeoPlayerEvents["timeupdate"]) => void;
  /**
   * Triggers when the video is loading. The params indicates how much data is loaded
   * in buffer. This is not equivalent to `onTimeUpdate` which shows current time.
   */
  onProgress?: (props: VimeoPlayerEvents["progress"]) => void;
  /**
   * Triggered when the player starts seeking to a specific time. A timeupdate event will also be fired at the same time.
   */
  onSeeking?: (props: VimeoPlayerEvents["seeking"]) => void;
  /**
   * Triggered when the player seeks to a specific time. `onTimeupdate` props will also be fired at the same time.
   */
  onSeeked?: (props: VimeoPlayerEvents["seeked"]) => void;
  /**
   * Triggered when the active text track (captions/subtitles) changes.
   * The values will be null if text tracks are turned off.
   */
  onTextTrackChange?: (props: VimeoPlayerEvents["texttrackchange"]) => void;
  /**
   * Triggred when chapter is changed.
   */
  onChapterChange?: (props: VimeoPlayerEvents["chapterchange"]) => void;
  /**
   * Triggered when the current time hits a registered cue point.
   */
  onCuePoint?: (props: VimeoPlayerEvents["cuepoint"]) => void;
  /**
   * Triggered when the volume in the player changes.
   * NOTE: Some devices do not support setting the volume of
   * the video independently from the system volume, so this event
   * will never fire on those devices.
   */
  onVolumeChange?: (props: VimeoPlayerEvents["volumechange"]) => void;
  /**
   * Triggered when the playback rate of the video in the player changes.
   *
   * NOTE: The ability to change rate can be disabled by the creator and the
   * event will not fire for those videos.
   */
  onPlaybackRateChange?: (
    props: VimeoPlayerEvents["playbackratechange"]
  ) => void;
  /**
   * Triggers when buffer starts in player
   */
  onBufferStart?: () => void;
  /**
   * Triggers when buffer end in player
   */
  onBufferEnd?: () => void;
  /**
   * Triggered when some kind of error is generated in the player.
   */
  onError?: (props: VimeoPlayerEvents["error"]) => void;
  /**
   * Triggered when a new video is loaded in the player.
   */
  onLoaded?: (props: VimeoPlayerEvents["loaded"]) => void;
  /**
   * Triggered when the player changes between full screen and normal mode
   */
  onFullScreenChange?: (props: VimeoPlayerEvents["fullscreenchange"]) => void;
  /**
   * Triggered when the set quality changes.
   */
  onQualityChange?: (props: VimeoPlayerEvents["qualitychange"]) => void;
  /**
   * Called when vimeo player is resized via height and width props.
   */
  onResize?: (props: VimeoPlayerEvents["resize"]) => void;
  /**
   * Triggered when the player enters picture-in-picture.
   */
  onEnterPictureInPicture?: () => void;
  /**
   * Triggered when the player leaves picture-in-picture.
   */
  onLeavePictureInPicture?: () => void;
  /**
   * Called when vimeo player is loaded
   */
  onReady?: (player: VimeoPlayerEvents["ready"]) => void;
};

export type VimeoPlayerOptions = VimeoPlayerProperties &
  VimeoPlayerEventHandlers;

export type UpdateOptions = {
  /**
   * start time of the video
   */
  start?: number;
  /**
   * current volume of video
   */
  volume?: number;
  /**
   * Unlisted video hash
   */
  hash?: string;
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
  /**
   * Adds cue points in video timeline, and recieve data back in onCuePoint callback.
   */
  addCuePoint: (
    /**
     * Time in seconds.
     */
    time: number,
    /**
     * When the currentTime of the video passes the specified time,
     * this data will be available via `onCuePoint`
     */
    data: VimeoCuePointData
  ) => VimeoPromise<string, UnsupportedError | Error | RangeError>;
};

/**
 * Vimeo oEembede Response
 */
export type VimeoEmbede = {
  type: string;
  version: string;
  provider_name: string;
  provider_url: string;
  title: string;
  author_name: string;
  author_url: string;
  is_plus: string;
  account_type: string;
  html: string;
  width: number;
  height: number;
  duration: number;
  description: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_url_with_play_button: string;
  upload_date: string;
  video_id: number;
  uri: string;
};
