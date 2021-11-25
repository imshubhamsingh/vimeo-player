import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Player, ImperativeHandle } from "@vimeo-player/react";

function App() {
  // player ref
  const ref = React.useRef<ImperativeHandle>(null);
  // video id
  const [videoId, setVideoId] = React.useState("115783408");
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>
        <Player
          video={videoId}
          paused={paused}
          muted={muted}
          ref={ref}
          autoplay={true}
          autopause={false}
        />
        <div>
          <button onClick={() => seek(-10)}>-10s ⏪</button>
          <button onClick={() => seek(-5)}>-5s ◀️</button>
          <button onClick={() => seek(5)}>+5s ▶️</button>
          <button onClick={() => seek(10)}>+10s ⏩</button>
        </div>
      </div>
    </div>
  );
}

export default App;
