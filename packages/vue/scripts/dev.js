/* eslint-disable @typescript-eslint/no-var-requires */

const pkg = require("../package.json");
const devbuild = require("../../../config/esbuild/dev");

devbuild({
  pkg,
  dirname: __dirname,
  entryPoint: "./src/Player.ts",
  outfile: pkg.module,
  tsconfigPath: "./tsconfig.json",
});
