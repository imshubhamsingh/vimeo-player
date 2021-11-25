import ts from "@rollup/plugin-typescript";
import typescript from "typescript";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

import pkg from "./package.json";

const isProduction = (env) => env === "production";

/**
 * @type {import('rollup').RollupOptions}
 */
export default (args) => {
  process.env.NODE_ENV = args.environment;
  let config = {
    input: ["./src/Player.tsx"],
    output: [
      {
        dir: "./",
        format: "esm",
        entryFileNames: pkg.module,
      },
      {
        dir: "./",
        format: "commonjs",
        entryFileNames: pkg.main,
      },
      {
        dir: "./",
        format: "commonjs",
        entryFileNames: pkg.main,
      },
      {
        dir: "./",
        format: "umd",
        name: pkg.name,
        entryFileNames: pkg.unpkg,
      },
    ],
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      commonjs(),
      ts({
        typescript,
      }),
      resolve({
        moduleDirectory: [
          // as array
          "@vimeo-player/core",
        ],
      }),
      babel({
        exclude: "**/node_modules",
        babelHelpers: "runtime",
        configFile: "./babel.config.js",
      }),
      ...(isProduction(process.env.NODE_ENV)
        ? [
            terser({
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            }),
          ]
        : []),
    ],
  };

  const types = {
    // path to your declaration files root
    input: "./dist/dts/Player.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  };

  return [config, types];
};
