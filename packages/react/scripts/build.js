const pkg = require("../package.json");
const build = require("../../../config/esbuild/build");

build({
  pkg,
  dirname: __dirname,
  entryPoint: "./src/Player.tsx",
  esmOutfile: pkg.module,
  cjsOutfile: pkg.main,
  tsconfigPath: "./tsconfig.json",
  config: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
});
