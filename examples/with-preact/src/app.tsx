import { Fragment, h } from "preact";
import { Logo } from "./logo";
import { AppPlayer } from "./Player";

export function App() {
  return (
    <>
      <Logo />
      <p>Hello Vite + Preact!</p>
      <p>
        <a
          class="link"
          href="https://preactjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          With TypeScript!
        </a>
      </p>
      <AppPlayer/>
    </>
  );
}
