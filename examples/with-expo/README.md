This is a [Expo](https://expo.dev/) project bootstrapped with [`expo-cli`](https://docs.expo.dev/workflow/expo-cli/).

## Getting Started

First, run the development server:

```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with local packages.

Follow below steps to run this project with local package build.

- Build local `@vimeo-player/react-native`
    - Go to path `/package/react-native` and run
    ```bash
        yarn build:dev
        yarn yalc:publish
    ```
- Go to path `/examples/with-expo` and run
  ```bash
  yarn install
  yarn yalc:link
  npx npm-check-updates -u  
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
