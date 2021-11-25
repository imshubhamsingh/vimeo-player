// vendor lib
import OgPlayer, { Options, VimeoPromise } from "@vimeo/player";

// custom
import {
  getInitialPlayerOptions,
  getPlayerEventHandlers,
  EventHandlersObj,
  VimeoPlayerOptions,
} from "./utils";
import { VIMEO_CONFIGS, VIMEO_PLAYER_EVENTS } from "./constants";

export type { VimeoPlayerOptions };

type UpdateOptions = {
  start?: number;
  volume?: number;
};

export type ImperativeHandle = {
  getDuration: () => VimeoPromise<number, Error>;
  getCurrentTime: () => VimeoPromise<number, Error>;
  isMuted: () => VimeoPromise<boolean, Error>;
  getVolume: () => VimeoPromise<number, Error>;
  getPlaybackRate: () => VimeoPromise<number, Error>;
  seekTo: (seconds: number) => VimeoPromise<number, RangeError | Error>;
};

/**
 * Vimeo core wrapper for vimeo player
 */
export class VimeoPlayer {
  /**
   * Vimeo player proxied instance
   */
  _player: OgPlayer;

  /**
   * Parse framework props to vimeo's player initial options
   */
  static getInitialOptions = getInitialPlayerOptions;

  /**
   * Vimeo player events
   */
  static events = VIMEO_PLAYER_EVENTS;

  /**
   * Vimeo customisable config
   */
  static config = VIMEO_CONFIGS;

  /**
   * Vimeo player events
   */
  static getEventHandlers = getPlayerEventHandlers;

  /**
   * constructor for Vimeo player. At the moment its same as official package.
   */
  constructor(
    element: HTMLIFrameElement | HTMLElement | string,
    options?: Options
  ) {
    this._player = new OgPlayer(element, options);
  }

  /**
   * It returns vimeo player instance
   */
  get instance(): OgPlayer {
    return this._player;
  }

  /**
   * It creats vimeo player instance and adds
   * event handler to it if available.
   */
  static create(
    element: HTMLIFrameElement | HTMLElement | string,
    options: Options = {},
    eventHandlers: EventHandlersObj = {}
  ) {
    // create instance
    const player = new VimeoPlayer(element, options);
    // add player handler
    player.addEventHandlers(eventHandlers);
    // Check if player is ready or there is some error
    player.instance
      .ready()
      .then(() => eventHandlers?.onReady(player.instance))
      .catch((err) => eventHandlers?.onError(err));
    return player;
  }

  static imperativeHandle(vimeoPlayer: VimeoPlayer): ImperativeHandle {
    const player = vimeoPlayer.instance;
    return {
      getDuration: () => player.getDuration(),
      getCurrentTime: () => player.getCurrentTime(),
      isMuted: () => player.getMuted(),
      getVolume: () => player.getVolume(),
      getPlaybackRate: () => player.getPlaybackRate(),
      seekTo: (seconds: number) => player.setCurrentTime(seconds),
    };
  }

  /**
   * It updates video configs
   */
  update(name: string, value: any, options: UpdateOptions = {}) {
    console.log("[[ UPDATED ]]", name, value);
    switch (name) {
      // pause and unpause video
      case VIMEO_CONFIGS.PAUSED: {
        this._player.getPaused().then((paused) => {
          if (value && !paused) {
            this._player.pause();
          } else if (!value && paused) {
            this._player.play();
          }
        });
        break;
      }
      // update video id and load from starting time value
      case VIMEO_CONFIGS.VIDEO: {
        if (value) {
          const loaded = this._player.loadVideo(value);
          if (typeof options.start === "number") {
            loaded.then(() => {
              this._player.setCurrentTime(options.start as number);
            });
          }
        } else {
          this._player.unload();
        }
        break;
      }
      // updates color
      case VIMEO_CONFIGS.COLOR: {
        this._player.setColor(value);
        break;
      }
      // set auto pause
      case VIMEO_CONFIGS.AUTO_PAUSE: {
        this._player.setAutopause(value);
        break;
      }
      // update loop setting
      case VIMEO_CONFIGS.LOOP: {
        this._player.setLoop(value);
        break;
      }
      // update video volume
      case VIMEO_CONFIGS.VOLUME: {
        this._player.setVolume(value);
        break;
      }
      // mute or umute video
      case VIMEO_CONFIGS.MUTED: {
        this._player.setVolume(value ? 0 : (options.volume as number));
        break;
      }
      case VIMEO_CONFIGS.HEIGHT: {
        //@ts-ignore missing in type
        this._player.height = value;
        break;
      }
      case VIMEO_CONFIGS.WIDTH: {
        //@ts-ignore missing in type
        this._player.width = value;
        break;
      }
      default:
        null;
    }
  }

  /**
   * Add event handlers to vimeo player in bulk
   */
  addEventHandlers(handlers: EventHandlersObj) {
    Object.entries(VIMEO_PLAYER_EVENTS).forEach(([event, handlerName]) => {
      this._player.on(event, (event) => {
        const eventHandlers = handlers[handlerName];
        eventHandlers?.(event);
      });
    });
  }
}
