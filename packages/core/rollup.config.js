import pkg from "./package.json";
import path from "path";
import { configuration } from "../../config/rollup.config";

export default configuration({
  input: "./src/player.ts",
  pkg,
  path: path.resolve(__dirname),
});
