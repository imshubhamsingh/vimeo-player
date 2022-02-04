## Motivation

I joined Vimeo recently (Sept 2021). I was playing around with its player and getting to know its products and ecosystem. And I found that it has something called [player sdk](https://github.com/vimeo/player.js) that allows one to interact with and control an embedded Vimeo player.
This is written in pure vanilla js, which is excellent as anyone can use it on the web irrespective of frontend technologies.

In the past couple of years, Frontend ecosystem has changed so much that it's no longer just about HTML, CSS, JS. I think its the ages of the framework we live in especially for frontend devs. It revolves around React, Svelte, Vue, etc. Morden day UI is being written with these so-called frameworks and lib, whether on the web or mobile to save time and to remove repetitive imperative logic. Eventually, people have to write wrappers around the vanilla library to get it work with their framework and to match a certain level of decleration. For example, many Vimeo embed player wrappers are scattered around various repos with varying logic and support. `vimeo-player` is just a project I wanted to do for multiple reasons.

The goal of this project is as follow:

- [ ] To explore various usecase handled by vimeo embede player.
- [ ] To learn and see what all new frameworks provide and possibilities.
- [ ] Learn more about iframe and its limitations on both web and mobile.
- [ ] Learn more about maintaining fully typed mono repo.
- [ ] Explore a new framework for tooling and build process. Such as pnpm, expo, turbo etc.

## Developing

This repo uses [pnpm](https://pnpm.io/). Install it...

```
npm install -g pnpm
```

...then install dependencies:

```
pnpm install
```

## TODO

- [x] React.js
- [x] Svelte.js
- [x] Vue.js
- [x] React Native
- [ ] Lit
- [ ] solid
- [ ] Angular
