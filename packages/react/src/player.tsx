import * as React from "react";
import VimeoPlayer, { VimeoPlayerOptions } from "@vimeo-player/core";

export interface IPlayerProps extends VimeoPlayerOptions {
  as?: keyof JSX.IntrinsicElements;
}

class Player extends React.Component<IPlayerProps> {
  static displayName = "Player";
  static defaultProps = {};

  node?: HTMLElement;
  player?: VimeoPlayer;

  componentDidMount(): void {
    if (this.node) {
      this.player = VimeoPlayer.create(
        this.node,
        VimeoPlayer.getInitialOptions(this.props),
        VimeoPlayer.getEventHandlers(this.props)
      );
    }
  }

  componentDidUpdate(
    prevProps: Readonly<IPlayerProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    Object.keys(VimeoPlayer.config)
      //@ts-ignore TODO check how tslint error can be fix
      .filter((name) => this.props[name] !== prevProps[name])
      .map((name) =>
        //@ts-ignore TODO check how tslint error can be fix
        this.player.update(name, this.props[name], { start: this.props.start })
      );
  }

  componentWillUnmount(): void {
    /**
     * clean up
     */
    this.player.instance.destroy();
    this.player = null;
    this.node = null;
  }

  /**
   * Callback Ref which also instantiate vimeo player
   */
  handleNode = (node?: HTMLElement | null) => {
    this.node = node ? node : null;
  };

  render(): React.ReactNode {
    const { children, as, ...props } = this.props;
    return React.createElement(as || "div", {
      ref: this.handleNode,
      ...props,
    });
  }
}

export default Player;
