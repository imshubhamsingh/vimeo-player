import { ComponentMeta, ComponentStory } from '@storybook/react-native'
import React from 'react'

import {
  playerEvents,
  playerProperties,
} from '../../../../config/storybook/player'
import Player from '../Player'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'React Vimeo Player',
  component: Player,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    ...playerEvents,
    ...playerProperties,
  },
} as ComponentMeta<typeof Player>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Player> = (args: any) => (
  <Player {...args} />
)

export const LoopCoverPlayer = Template.bind({})

LoopCoverPlayer.args = {
  video: '59777392',
  loop: true,
  background: true,
  volume: 0,
  //@ts-ignore
  hideControls: true,
}
