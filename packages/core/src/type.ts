import type {
  EventCallback,
  Options,
  Player,
  UnsupportedError,
  VimeoCuePointData,
  VimeoPromise,
  VimeoVideoQuality,
} from '@vimeo/player'

export type EventHandlersObj = { [key: string]: EventCallback }

/**
 * Languages support by vimeo embede player for caption or subtitle.
 */
export type VimeoSupportedLanguages = 'en' | 'es' | 'fr' | 'jp' | 'ko' | 'de'

/**
 * Callback that gives video time details
 */
export type callbackParams = {
  /**
   * Totol duration of video
   */
  duration: number
  /**
   * Percentage of video completed based on current time
   */
  percent: number
  /**
   * Current time of video in seconds
   */
  seconds: number
}

export type PlayerOptions = Options & {
  volume?: number
  start?: number
}

export type VimeoPlayerProperties = {
  /**
   * Vimeo video id or url with hash if its private.
   */
  video: string
  /**
   * Show tile of video.
   */
  showTitle?: boolean
  /**
   * Show user's profile pic beside title
   */
  showPortrait?: boolean
  /**
   * Show Bylines (Owner info) below video title
   */
  showByline?: boolean
  /**
   * Controls Start timev of video.
   */
  start?: number
  /**
   * Controls the volume of video.
   */
  volume?: number
  /**
   * Controls the pause function of video.
   */
  paused?: boolean
  /**
   * Height of Video iframe. Aspect ratio is mantained. If `responsive` is set to true, height value
   * is not respected. Also for arbitrary values Aspect ratio is mantained.
   */
  height?: number
  /**
   * Width of Video iframe. If `responsive` is set to true, width value
   * is not respected. Also for arbitrary values Aspect ratio is mantained.
   */
  width?: number
  /**
   * Controls the language of text track captions/subtitle
   */
  texttrack?: VimeoSupportedLanguages
  /**
   * Automatically start playback of the video. Ensure that `muted` is set to true for it to work.
   * This is done to meet browser's auto play policy.
   * More details here: https://help.vimeo.com/hc/en-us/articles/115004485728-Autoplaying-and-looping-embedded-videos
   */
  autoplay?: boolean
  /**
   * Pauses the video when other players are running. Usefull when more than one player
   * are running.
   */
  autopause?: boolean
  /**
   * Enables player background mode, that hides player controls, autoplays and loop
   * functionality. Userfull when showing vimeo videos as cover or background.
   */
  background?: boolean
  /**
   * Loops the video when it reaches the end. If this is set to true;
   * `onEnd` will not be ever called.
   */
  loop?: boolean
  /**
   * Mutes the video. If you set autoplay to `true`; ensure muted is also set to `true`.
   */
  muted?: boolean
  /**
   * Quality of the video can be set if it is enabled for the video by Vimeo Plus member and higher.
   * More details: https://vimeo.zendesk.com/hc/en-us/articles/224983008-Setting-default-quality-for-embedded-videos
   */
  quality?: VimeoVideoQuality
  /**
   * Plays video in inline mode.
   */
  playsinline?: boolean
  /**
   * Control the visibility of speed control in player. To use this feature, video owner mush be PRO or above user.
   */
  speed?: boolean
  /**
   * Block your player from tracking any video watch. Helpfull when dealing with
   * security regulation like GDPR etc.
   */
  dnt?: boolean
  /**
   * Rezies the player container accoding to parent container.
   */
  responsive?: boolean
  /**
   * Hide all element in player. Available to PRO and above users.
   */
  controls?: boolean
  /**
   * Control the color of video color. If color is already set in preferences,
   * it will be overridden.
   */
  color?: string
}

export type VimeoPlayerEvents = {
  ended: callbackParams
  play: callbackParams
  pause: callbackParams
  timeupdate: callbackParams
  seeked: callbackParams
  /**
   * Vimeo player instance given by `@vimeo/player`
   */
  ready: Player
  progress: callbackParams
  resize: {
    /**
     * Video new width in px.
     */
    videoWidth: number
    /**
     * Video new height in px.
     */
    videoHeight: number
  }
  bufferend: void
  bufferstart: void
  cuepoint: {
    /**
     * Current time in seconds.
     */
    time: number
    /**
     * Data provided during addition of cue.
     */
    data: VimeoCuePointData
    /**
     * Cue id
     */
    id: string
  }
  playbackratechange: {
    /**
     * The player playback rate which scales from 0.5 to 2.
     */
    playbackRate: number
  }
  volumechange: {
    /**
     * The value is between 0 and 1 included.
     */
    volume: number
  }
  texttrackchange: {
    /**
     * Text track type
     */
    kind: 'caption' | 'subtitle'
    /**
     * Language + Kind
     * @example "English CC"
     */
    label: string
    /**
     * It depends on the languages suported by the video.
     */
    language: VimeoSupportedLanguages
  } | null
  chapterchange: {
    /**
     * Start time of chapter in seconds.
     */
    startTime: number
    /**
     * Title of chapter.
     */
    title: string
    /**
     * Index property of each chapter is the place it holds in the order
     * of all the chapters. It starts at 1.
     */
    index: number
  }
}

export type VimeoPlayerEventHandlers = {
  /**
   * Triggered any time the video playback reaches the end. Note: when loop is set to true, the ended event will not fire.
   */
  onEnd?: (props: VimeoPlayerEvents['ended']) => void
  /**
   * Triggered when video playback is initiated.
   */
  onPlay?: (props: VimeoPlayerEvents['play']) => void
  /**
   * Triggered when the video pauses.
   */
  onPause?: (props: VimeoPlayerEvents['pause']) => void
  /**
   * Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser.
   */
  onTimeUpdate?: (props: VimeoPlayerEvents['timeupdate']) => void
  /**
   * Triggered when the player seeks to a specific time. `onTimeupdate` props will also be fired at the same time.
   */
  onSeeked?: (props: VimeoPlayerEvents['seeked']) => void
  /**
   * Called when vimeo player is loaded
   */
  onReady?: (player: VimeoPlayerEvents['ready']) => void
  /**
   * Triggers when the video is loading. The params indicates how much data is loaded
   * in buffer. This is not equivalent to `onTimeUpdate` which shows current time.
   */
  onProgress?: (props: VimeoPlayerEvents['progress']) => void
  /**
   * Called when vimeo player is resized via height and width props.
   */
  onResize?: (props: VimeoPlayerEvents['resize']) => void
  /**
   * Triggere when buffer starts in player
   */
  onBufferStart?: () => void
  /**
   * Triggers when buffer end in player
   */
  onBufferEnd?: () => void
  /**
   * Triggered when the current time hits a registered cue point.
   */
  onCuePoint?: (props: VimeoPlayerEvents['cuepoint']) => void
  /**
   * Triggered when the playback rate of the video in the player changes.
   *
   * NOTE: The ability to change rate can be disabled by the creator and the
   * event will not fire for those videos.
   */
  onPlaybackRateChange?: (
    props: VimeoPlayerEvents['playbackratechange']
  ) => void
  /**
   * Triggered when the volume in the player changes.
   * NOTE: Some devices do not support setting the volume of
   * the video independently from the system volume, so this event
   * will never fire on those devices.
   */
  onVolumeChange?: (props: VimeoPlayerEvents['volumechange']) => void
  /**
   * Triggered when the active text track (captions/subtitles) changes.
   * The values will be null if text tracks are turned off.
   */
  onTextTrackChange?: (props: VimeoPlayerEvents['texttrackchange']) => void
  /**
   *
   */
  onChapterChange?: (props: VimeoPlayerEvents['chapterchange']) => void
}

export type VimeoPlayerOptions = VimeoPlayerProperties &
  VimeoPlayerEventHandlers

export type UpdateOptions = {
  /**
   * start time of the video
   */
  start?: number
  /**
   * current volume of video
   */
  volume?: number
}

export type ImperativeHandle = {
  /**
   * Get the duration of the video in seconds. It will be rounded to the nearest
   * second before playback begins, and to the nearest thousandth of a second after playback begins.
   */
  getDuration: () => VimeoPromise<number, Error>
  /**
   * Get the current playback position in seconds.
   */
  getCurrentTime: () => VimeoPromise<number, Error>
  /**
   * Check if the current playing video is muted.
   */
  isMuted: () => VimeoPromise<boolean, Error>
  /**
   * Get the current volume level of the player on a scale from 0 to 1.
   */
  getVolume: () => VimeoPromise<number, Error>
  /**
   * Get the playback rate of the player on a scale from 0.5 to 2.
   */
  getPlaybackRate: () => VimeoPromise<number, Error>
  /**
   * Set the current playback position in seconds. Once playback has started, if the player was paused,
   * it will remain paused. Likewise, if the player was playing, it will resume playing once the video has buffered.
   * Setting the current time before playback has started will cause playback to start.
   */
  seekTo: (seconds: number) => VimeoPromise<number, RangeError | Error>
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
  ) => VimeoPromise<string, UnsupportedError | Error | RangeError>
}
