import pkg from "./package.json";
import { configuration } from "../../config/rollup.config";

export default configuration({
  input: "./src/Player.tsx",
  pkg,
  path: path.resolve(__dirname),
});
