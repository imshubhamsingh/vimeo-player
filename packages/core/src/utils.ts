export function getInitialVimeoPlayerOptions(obj: any) {
  return {
    id: obj.video,
    width: obj.width,
    height: obj.height,
    autopause: obj.autopause,
    autoplay: obj.autoplay,
    byline: obj.showByline,
    color: obj.color,
    controls: obj.controls,
    loop: obj.loop,
    portrait: obj.showPortrait,
    title: obj.showTitle,
    muted: obj.muted,
    background: obj.background,
    responsive: obj.responsive,
    dnt: obj.dnt,
    speed: obj.speed,
  };
}
