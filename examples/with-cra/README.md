# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Running with local packages.

Follow below steps to run this project with local package build.

- Build local `@vimeo-player/core` & `@vimeo-player/react`
  - Go to path `/package/core` and run
    ```bash
        yarn build:dev
        yarn yalc:publish
    ```
    - Go to path `/package/react` and run
    ```bash
        yarn build:dev
        yarn yalc:publish
    ```
- Go to path `/examples/with-nextjs` and run
  ```bash
  yarn install
  yarn yalc:link
  npx npm-check-updates -u to upgrade dependencies to latest.
  ```
- For any update in local package run:
  ```bash
  yalc update
  ```
- Once local testing is complete, in order to remove yalc linked packages, rum:
  ```bash
  yarn yalc:unlink
  ```

For more details regarding `yalc`, you can check out their [README.md](https://github.com/wclr/yalc#usage)
