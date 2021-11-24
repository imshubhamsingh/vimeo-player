import OgPlayer from "@vimeo/player";
import type { Options } from "@vimeo/player";
import { getInitialVimeoPlayerOptions } from "./utils";
import { VIMEO_PLAYER_EVENTS } from "./constants";

type Player = OgPlayer;

/**
 * Vimeo core wrapper for vimeo player
 */
class VimeoPlayer {
  /**
   * Vimeo player proxied instance
   */
  #player: Player;

  /**
   * Parse framework props to vimeo's player initial options
   */
  static getInitialOptions = getInitialVimeoPlayerOptions;

  /**
   * Vimeo player events
   */
  static events = VIMEO_PLAYER_EVENTS;

  /**
   * constructor for Vimeo player. At the moment its same as official package.
   */
  constructor(
    element: HTMLIFrameElement | HTMLElement | string,
    options?: Options
  ) {
    this.#player = new Proxy(new OgPlayer(element, options), {});
  }

  /**
   * It returns vimeo player instance
   */
  get instance(): Player {
    return this.#player;
  }
}

export default VimeoPlayer;
