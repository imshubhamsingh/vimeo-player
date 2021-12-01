import {
  ImperativeHandle,
  VimeoPlayerEvents,
  VimeoPlayerProperties,
} from '@vimeo-player/core'
import { SvelteComponentTyped } from 'svelte'

type Events<T> = {
  [K in keyof T]: CustomEvent<T[K]>
}

type Properties = VimeoPlayerProperties & {
  /**
   * Impertative Handler for various functionality
   */
  ref: ImperativeHandle
}

/**
 * Svelte bind for vimeo player
 */
export default class Player extends SvelteComponentTyped<
  Properties,
  Events<VimeoPlayerEvents>
> {}
