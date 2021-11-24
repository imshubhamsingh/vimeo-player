import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Player from "../Player";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "React/Player",
  component: Player,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    volume: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
} as ComponentMeta<typeof Player>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Player> = (args) => <Player {...args} />;

export const TestPlayer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TestPlayer.args = {
  video: "115783408",
  muted: true,
};
