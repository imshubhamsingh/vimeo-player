# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Issues to look into

- https://github.com/pnpm/pnpm/issues/3561
- https://github.com/vitejs/vite/issues/2579

## Running with local packages.

Follow below steps to run this project with local package build.

- Build local `@vimeo-player/core` & `@vimeo-player/react`
  - Go to path `/package/core` and run
    ```bash
        yarn build:dev
        yarn yalc:publish
    ```
    - Go to path `/package/svelte` and run
    ```bash
        yarn build:dev
        yarn yalc:publish
    ```
- Go to path `/examples/with-sveltekit` and run
  ```bash
  pnpm run yalc:link
  pnpm install
  ```
- For any update in local package run:
  ```bash
  yalc update
  ```
- Once local testing is complete, in order to remove yalc linked packages, rum:
  ```bash
  pnpm run yalc:unlink
  ```

For more details regarding `yalc`, you can check out their [README.md](https://github.com/wclr/yalc#usage)
