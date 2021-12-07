import { Meta, Story } from '@storybook/vue3'
import {
  playerEvents,
  playerProperties,
} from '../../../../config/storybook/player'
import { Player as VimeoPlayer } from '../index'

export default {
  title: 'Vue Vimeo Player',
  component: VimeoPlayer,
  argTypes: {
    ...playerEvents,
    ...playerProperties,
  },
} as Meta

const Template: Story = (args) => ({
  components: { VimeoPlayer },
  setup() {
    return { args }
  },
  template: '<vimeo-player v-bind="args" />',
})

export const TestPlayer = Template.bind({})

TestPlayer.args = {
  video: '323783503',
}

export const LoopCoverPlayer = Template.bind({})

LoopCoverPlayer.args = {
  video: '59777392',
  loop: true,
  background: true,
  volume: 0,
}
