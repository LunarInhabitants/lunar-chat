# LunarChat

LunarChat is a Next.js/Socket.IO based real-time chat application developed by the Lunar Inhabitants. For now, it's primarily an experiment.

## Getting Started

This repository is a monorepo, containing both the frontend client built in Next.js and the backend using ts-node and sockets.io. 

Note: LunarChat was developed using PNPM, rather than NPM or Yarn. If you have only used NPM, set up PNPM using [this guide](https://pnpm.io/installation#using-corepack).

To run a local copy, clone the repository, then run `pnpm install` to install the required packages for all projects. If your command line is at the root of the project (ie, not in the 'server' or 'client' folders), then you can run `pnpm dev` to spin up both client and server simultaniously. By default, the client starts up on port 3000, and the server starts on port 3001. The .env files in both the client and server identify themselves to each other.

## To-do

- [ ] Persistent storage of messages.
- [ ] Fetch persistent message storage when the client first loads the page.
- [ ] Auth.
- [ ] Multiple channels.
- [x] Emoji support.
