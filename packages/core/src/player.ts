// vendor lib
import OgPlayer from "@vimeo/player";
import type { Options } from "@vimeo/player";

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

/**
 * Vimeo core wrapper for vimeo player
 */
class VimeoPlayer {
  /**
   * Vimeo player proxied instance
   */
  #player: OgPlayer;

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
    this.#player = new OgPlayer(element, options);
  }

  /**
   * It returns vimeo player instance
   */
  get instance(): OgPlayer {
    return this.#player;
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

  /**
   * It updates video configs
   */
  update(name: string, value: any, options: UpdateOptions = {}) {
    console.log("[[ UPDATE ]]", name, value);
    switch (name) {
      // pause and unpause video
      case VIMEO_CONFIGS.PAUSED: {
        this.#player.getPaused().then((paused) => {
          if (value && !paused) {
            this.#player.pause();
          } else if (!value && paused) {
            this.#player.play();
          }
        });
        break;
      }
      // update video id and load from starting time value
      case VIMEO_CONFIGS.VIDEO: {
        if (value) {
          const loaded = this.#player.loadVideo(value);
          if (typeof options.start === "number") {
            loaded.then(() => {
              this.#player.setCurrentTime(options.start);
            });
          }
        } else {
          this.#player.unload();
        }
        break;
      }
      // updates color
      case VIMEO_CONFIGS.COLOR: {
        this.#player.setColor(value);
        break;
      }
      // set auto pause
      case VIMEO_CONFIGS.AUTO_PAUSE: {
        this.#player.setAutopause(value);
        break;
      }
      // update loop setting
      case VIMEO_CONFIGS.LOOP: {
        this.#player.setLoop(value);
        break;
      }
      // update video volume
      case VIMEO_CONFIGS.VOLUME: {
        this.#player.setVolume(value);
        break;
      }
      // mute or umute video
      case VIMEO_CONFIGS.MUTED: {
        this.#player.setVolume(value ? 0 : options.volume);
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
      this.#player.on(event, (event) => {
        const eventHandlers = handlers[handlerName];
        eventHandlers?.(event);
      });
    });
  }
}

export default VimeoPlayer;
