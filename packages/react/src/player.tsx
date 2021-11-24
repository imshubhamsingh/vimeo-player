import * as React from "react";
import VimeoPlayer from "@vimeo-player/core";

interface IPlayerProps extends React.HTMLAttributes<HTMLDivElement> {}

function Player({ ...restProps }: IPlayerProps) {
  const playerRef = React.useRef<VimeoPlayer>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    playerRef.current = new VimeoPlayer(containerRef.current);
  }, []);

  return <div ref={containerRef} {...restProps} />;
}

export default Player;
