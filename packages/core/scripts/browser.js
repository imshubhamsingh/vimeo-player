const path = require("path");
const esbuild = require("esbuild");
const pkg = require("../package.json");

// https://github.com/evanw/esbuild/issues/337#issuecomment-954633403
function importAsGlobals(mapping) {
  const escRe = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const filter = new RegExp(
    Object.keys(mapping)
      .map((mod) => `^${escRe(mod)}$`)
      .join("|")
  );

  return {
    name: "global-imports",
    setup(build) {
      build.onResolve({ filter }, (args) => {
        if (!mapping[args.path]) {
          throw new Error("Unknown global: " + args.path);
        }
        return {
          path: args.path,
          namespace: "external-global",
        };
      });

      build.onLoad(
        {
          filter,
          namespace: "external-global",
        },
        async (args) => {
          const global = mapping[args.path];
          return {
            contents: `module.exports = ${global};`,
            loader: "js",
          };
        }
      );
    },
  };
}

async function buildIIFE() {
  const rootPath = path.resolve(__dirname, "../");
  const entryPoint = "./src/player.ts";
  const tsconfigPath = "./tsconfig.json";
  const iifeOutputfile = "./dist/browser/player.js";
  /**
   * Common build config
   */
  const buildConfig = {
    entryPoints: [path.resolve(rootPath, entryPoint).toString()],
    minify: true,
    bundle: true,
    target: "es6",
    tsconfig: path.resolve(rootPath, tsconfigPath),
    metafile: true,
    sourcemap: true,
  };

  try {
    await esbuild.build({
      ...buildConfig,
      outfile: path.resolve(rootPath, iifeOutputfile),
      format: "iife",
      globalName: 'VimeoPlayer',
      plugins: [
        importAsGlobals({
          "@vimeo/player": "Vimeo.Player",
        }),
      ],
    });
  } catch (e) {
    console.log(`× ${pkg.name}: Build failed due to an error.`);
    console.log(e);
  }
}

buildIIFE();
