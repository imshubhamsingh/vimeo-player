This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
