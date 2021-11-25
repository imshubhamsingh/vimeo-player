import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Player } from "../Player";
import { ImperativeHandle } from "@vimeo-player/core";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "React Vimeo Player",
  component: Player,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    volume: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    paused: { control: { type: "boolean", defaultValue: false } },
    color: { control: { type: "color" } },
    onCueChange: {
      action: "cuechange",
    },
    onCuePoint: {
      action: "cuepoint",
    },
    onEnd: {
      action: "ended",
    },
    onEnterPictureinPicture: {
      action: "enterpictureinpicture",
    },
    onError: {
      action: "error",
    },
    onLeavePictureinPicture: {
      action: "leavepictureinpicture",
    },
    onLoaded: {
      action: "loaded",
    },
    onPause: {
      action: "pause",
    },
    onPlay: {
      action: "play",
    },
    onPlaybackRateChange: {
      action: "playbackratechange",
    },
    onProgress: {
      action: "progress",
    },
    onReady: {
      action: "ready",
    },
    onResize: {
      action: "resize",
    },
    onSeeked: {
      action: "seeked",
    },
    onTextTrackChange: {
      action: "texttrackchange",
    },
    onTimeUpdate: {
      action: "timeupdate",
    },
    onVolumeChange: {
      action: "volumechange",
    },
  },
} as ComponentMeta<typeof Player>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Player> = (args) => {
  const ref = React.useRef<ImperativeHandle>();
  React.useEffect(() => {
    console.log(ref.current);
    setTimeout(() => {
      ref.current.seekTo(20);
    }, 5000);
  }, []);
  return <Player {...args} ref={ref} />;
};

export const TestPlayer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TestPlayer.args = {
  video: "649442299",
  muted: true,
};
