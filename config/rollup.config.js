import typescript from "@rollup/plugin-typescript";
import { resolve as resolvePath } from "path";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import externals from "rollup-plugin-node-externals";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

const isProduction = (env) => env === "production";

export const configuration = (options) => {
  const { input, pkg, path } = options;
  console.log(__dirname)
  /**
   * @type {import('rollup').RollupOptions}
   */
  return function (args) {
    process.env.NODE_ENV = args.environment;
    let config = {
      input: [input],
      output: [
        {
          dir: "./",
          format: "esm",
          entryFileNames: pkg.module,
        },
        {
          dir: "./",
          format: "cjs",
          entryFileNames: pkg.main,
        },
      ],
      external: Object.keys(pkg.peerDependencies),
      plugins: [
        // Delete existing build files.
        del({ targets: resolvePath(path, "./dist/*") }),
        // Leave out third-party dependencies (listed under `package.json`'s `dependencies` option) from the bundled outputs.
        externals({ deps: true }),
        // Find third-party modules within `node_modules` with any one of the following file extensions: `.js`, `.ts` and `.tsx`.
        resolve({
          extensions: [".js", ".ts", ".tsx"],
        }),
        commonjs(),
        typescript({
          tsconfig: options.tsconfig,
        }),
        babel({
          babelHelpers: "runtime",
          configFile: "../../babel.config.js",
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
      input: "./dist/dts/player.d.ts",
      output: [{ file: "./dist/index.d.ts", format: "es" }],
      plugins: [
        dts(),
        del({ hook: "buildEnd", targets: resolvePath(path, "./dist/dts") }),
      ],
    };

    return [config, types];
  };
};
