import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Player, ImperativeHandle } from "@vimeo-player/react";

function App() {
  // player ref
  const ref = React.useRef<ImperativeHandle>(null);
  // video id
  const [videoId, setVideoId] = React.useState("323783503");
  // control paused state
  const [paused, setPaused] = React.useState(false);
  // control muted
  const [muted, setMuted] = React.useState(false);

  async function seek(value: number) {
    if (!ref.current) return;
    const totalTime = await ref.current.getDuration();
    const getCurrentTime = await ref.current.getCurrentTime();
    await ref.current.seekTo(
      Math.min(Math.max(getCurrentTime + value, 0), totalTime)
    );
  }
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Player
            video={videoId}
            ref={ref}
            autoplay={true}
            autopause={true}
            className="vid"
            background={false}
            controls={false}
            dnt={false}
            language="en"
            loop={false}
            muted={true}
            speed={true}
            quality={"360p"}
            responsive={true}
            showByline={true}
            showPortrait={true}
            showTitle={true}
            onReady={() => {
              console.log("ready");
            }}
            onPlay={() => console.log("playing")}
            onPause={() => console.log("paused")}
          />
          <div>
            <button onClick={() => seek(-10)}>-10s ⏪</button>
            <button onClick={() => seek(-5)}>-5s ◀️</button>
            <button onClick={() => seek(5)}>+5s ▶️</button>
            <button onClick={() => seek(10)}>+10s ⏩</button>
          </div>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    </div>
  );
}

export default App;
