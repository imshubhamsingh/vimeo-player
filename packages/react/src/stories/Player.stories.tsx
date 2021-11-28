import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ImperativeHandle } from '@vimeo-player/core'
import React from 'react'

import { Player } from '../Player'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'React Vimeo Player',
  component: Player,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    volume: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    paused: { control: { type: 'boolean', defaultValue: false } },
    color: { control: { type: 'color' } },
    quality: {
      options: ['4K', '2K', '1080p', '720p', '540p', '360p', '240p'],
      control: { type: 'radio' },
    },
    onCueChange: {
      action: 'cuechange',
    },
    onCuePoint: {
      action: 'cuepoint',
    },
    onEnd: {
      action: 'ended',
    },
    onEnterPictureinPicture: {
      action: 'enterpictureinpicture',
    },
    onError: {
      action: 'error',
    },
    onLeavePictureinPicture: {
      action: 'leavepictureinpicture',
    },
    onLoaded: {
      action: 'loaded',
    },
    onPause: {
      action: 'pause',
    },
    onPlay: {
      action: 'play',
    },
    onPlaybackRateChange: {
      action: 'playbackratechange',
    },
    onProgress: {
      action: 'progress',
    },
    onReady: {
      action: 'ready',
    },
    onResize: {
      action: 'resize',
    },
    onSeeked: {
      action: 'seeked',
    },
    onTextTrackChange: {
      action: 'texttrackchange',
    },
    onTimeUpdate: {
      action: 'timeupdate',
    },
    onVolumeChange: {
      action: 'volumechange',
    },
  },
} as ComponentMeta<typeof Player>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Player> = ({
  //@ts-ignore
  hideControls = false,
  ...args
}) => {
  const ref = React.useRef<ImperativeHandle>(null)
  async function seek(value: number) {
    if (!ref.current) return
    const totalTime = await ref.current.getDuration()
    const getCurrentTime = await ref.current.getCurrentTime()
    ref.current.seekTo(Math.min(Math.max(getCurrentTime + value, 0), totalTime))
  }
  return (
    <>
      <Player {...args} ref={ref} />
      <div
        style={{
          display: 'flex',
          marginTop: 16,
          justifyContent: 'space-evenly',
        }}
      >
        {!hideControls && (
          <>
            <button onClick={() => seek(-10)}>-10s ⏪</button>
            <button onClick={() => seek(-5)}>-5s ◀️</button>
            <button onClick={() => seek(5)}>+5s ▶️</button>
            <button onClick={() => seek(10)}>+10s ⏩</button>
          </>
        )}
      </div>
    </>
  )
}

export const TestPlayer = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TestPlayer.args = {
  video: '323783503',
  muted: true,
  quality: '360p',
  // autoplay: true,
}

TestPlayer.parameters = {
  docs: {
    source: {
      code: `
function Container() {
  // player ref
  const ref = React.useRef();
  // video id
  const [videoId, setVideoId] = React.useState("20890937");
  // control paused state
  const [paused, setPaused] = React.useState(false);
  // control muted
  const [muted, setMuted] = React.useState(false);

  async function seek(value) {
    const totalTime = await ref.current.getDuration();
    const getCurrentTime = await ref.current.getCurrentTime();
    await ref.current.seekTo(
      Math.min(Math.max(getCurrentTime + value, 0), totalTime)
    );
  }

  return (
    <>
      <Player 
        video={videoId} 
        paused={paused} 
        muted={muted}
        ref={ref} 
      />
      <div>
        <button onClick={() => seek(-10)}>-10s ⏪</button>
        <button onClick={() => seek(-5)}>-5s ◀️</button>
        <button onClick={() => seek(5)}>+5s ▶️</button>
        <button onClick={() => seek(10)}>+10s ⏩</button>
      </div>
    </>
  );
}
`,
    },
  },
}

export const LoopCoverPlayer = Template.bind({})

LoopCoverPlayer.args = {
  video: '59777392',
  loop: true,
  background: true,
  volume: 0,
  //@ts-ignore
  hideControls: true,
}

LoopCoverPlayer.parameters = {
  controls: { disabled: true },
  docs: {
    description: {
      story: 'This is usefull when using vimeo videos as cover',
    },
    source: {
      code: `
<Player 
  video={videoId} 
  loop={true} 
  background={true}
/>
    `,
    },
  },
}

export const VerticalPlayer = Template.bind({})

VerticalPlayer.args = {
  video: '351594821',
  //@ts-ignore
  hideControls: true,
}

export const CuePoints: ComponentStory<typeof Player> = ({ ...args }) => {
  const ref = React.useRef<ImperativeHandle>(null)
  const [playerReady, setPlayerReady] = React.useState(false)
  React.useEffect(() => {
    ;(async () => {
      if (!playerReady) return
      const totalTime = (await ref.current?.getDuration()) || 0
      const cuePoints = 6
      Array(6)
        .fill(1)
        .map((el, idx) =>
          ref.current?.addCuePoint((totalTime / cuePoints) * idx, {
            reached: idx,
            message: `you have watch ${((idx / cuePoints) * 100).toFixed(
              2
            )}% of video`,
          })
        )
    })()
  }, [playerReady])
  return (
    <>
      <Player
        {...args}
        ref={ref}
        onCuePoint={(props) => console.log(props)}
        onReady={(player) => {
          console.log(player)
          setPlayerReady(true)
        }}
      />
    </>
  )
}

CuePoints.args = {
  video: '279121663',
  showByline: false,
  showTitle: false,
  volume: 0,
  showPortrait: false,
}

CuePoints.parameters = {
  controls: { disabled: true },
  docs: {
    description: {
      story: 'This is usefull for adding cue points',
    },
    source: {
      code: `
function Container() {
  const ref = React.useRef<ImperativeHandle>(null);
  const [playerReady, setPlayerReady] = React.useState(false);
  const [videoId, setVideoId] = React.useState("xxxxxxxxx");

  React.useEffect(() => {
    (async () => {
      if (!playerReady) return; // Player not loaded still
      // ... player loaded
      const totalTime = await ref.current.getDuration();
      // Adding 6 cues here
      const cuePoints = 6;
      Array(6)
        .fill(1)
        .map((el, idx) =>
          ref.current.addCuePoint((totalTime / cuePoints) * idx, {
            reached: idx,
            message: \`you have watch \${((idx / cuePoints) * 100).toFixed(
              2
            )}% of video\`,
          })
        );
    })();
  }, [playerReady]);
  return (
    <>
      <Player
        video={videoId}
        ref={ref}
        onCuePoint={(props) => console.log(props)}
        // wait till the video is loaded to add cues
        onReady={() => setPlayerReady(true)}
      />
    </>
  );
}
    `,
    },
  },
}
