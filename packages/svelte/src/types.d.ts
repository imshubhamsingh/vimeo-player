import { VimeoPlayerProperties } from '@vimeo-player/core'
import { SvelteComponentTyped } from 'svelte'

export default class Player extends SvelteComponentTyped<
  VimeoPlayerProperties,
  VimeopPlayerEvents
> {}
