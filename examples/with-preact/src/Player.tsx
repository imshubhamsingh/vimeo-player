import { Fragment, h } from "preact";
import { useState, useRef } from "preact/hooks";
import { Player, ImperativeHandle } from "@vimeo-player/react";


export function AppPlayer() {
   // player ref
   const ref = useRef<ImperativeHandle>(null);
   // video id
   const [videoId, setVideoId] = useState("323783503");
   // control paused state
   const [paused, setPaused] = useState(false);
   // control muted
   const [muted, setMuted] = useState(false);
 
   async function seek(value: number) {
     if (!ref.current) return;
     const totalTime = await ref.current.getDuration();
     const getCurrentTime = await ref.current.getCurrentTime();
     await ref.current.seekTo(
       Math.min(Math.max(getCurrentTime + value, 0), totalTime)
     );
   }
   return (
     <div>
       <div>
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
       </div>
     </div>
   ); 
}
