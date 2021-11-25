"use strict";
exports.__esModule = true;
exports.Player = void 0;
var React = require("react");
var core_1 = require("@vimeo-player/core");
var Player = React.forwardRef(function (props, ref) {
    var _a = props.as, as = _a === void 0 ? "div" : _a, start = props.start, volume = props.volume, autopause = props.autopause, color = props.color, loop = props.loop, muted = props.muted, paused = props.paused, video = props.video, id = props.id, className = props.className, style = props.style, height = props.height, width = props.width;
    var container = React.useRef(null);
    var player = React.useRef(null);
    var mounted = React.useRef(false);
    var prevProps = React.useRef({
        autopause: autopause,
        color: color,
        loop: loop,
        muted: muted,
        paused: paused,
        video: video,
        volume: volume
    });
    React.useEffect(function () {
        if (container.current) {
            player.current = core_1["default"].create(container.current, core_1["default"].getInitialOptions(props), core_1["default"].getEventHandlers(props));
        }
        return function () {
            var _a;
            (_a = player.current) === null || _a === void 0 ? void 0 : _a.instance.destroy();
            player.current = null;
            container.current = null;
        };
    }, []);
    // componentDidUpdate Equivalent
    React.useEffect(function () {
        if (!mounted.current) {
            mounted.current = true;
        }
        else {
            Object.values(core_1["default"].config)
                //@ts-ignore TODO check how tslint error can be fix
                .filter(function (name) { return props[name] !== prevProps.current[name]; })
                .map(function (name) {
                //@ts-ignore TODO check how tslint error can be fix
                prevProps.current[name] = props[name];
                //@ts-ignore TODO check how tslint error can be fix
                player.current.update(name, props[name], {
                    start: start,
                    volume: volume
                });
            });
        }
    }, [autopause, color, loop, muted, paused, video, volume, height, width]);
    React.useImperativeHandle(ref, function () { return core_1["default"].imperativeHandle(player.current); }, []);
    return React.createElement(as, {
        ref: container,
        className: className,
        id: id,
        style: style
    });
});
exports.Player = Player;
Player.defaultProps = {
    autopause: true,
    autoplay: false,
    background: false,
    controls: false,
    dnt: false,
    loop: false,
    muted: false,
    // If responsive is set to true, height and width is not respected
    responsive: true,
    showByline: true,
    showPortrait: true,
    showTitle: true,
    speed: true,
    volume: 1,
    language: "en"
};
