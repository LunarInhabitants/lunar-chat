# LunarChat

LunarChat is a Next.js/Socket.IO based real-time chat application developed by the Lunar Inhabitants. For now, it's primarily an experiment.

## Getting Started

This repository is a monorepo, containing the frontend client built in Next.js, the backend using ts-node and sockets.io, and a shared library containing shared logic including the Prisma database definition. 

Note: LunarChat was developed using PNPM, rather than NPM or Yarn. If you have only used NPM, set up PNPM using [this guide](https://pnpm.io/installation#using-corepack).

To run a local copy, clone the repository, then run `pnpm install` to install the required packages for all projects. Duplicate the .env.example file and call it .env, and do the same in the client project. In both of these files, fill in all the TODO marked variables as desired. For the auth providers, you can also delete their settings outright if you don't plan to use them.

LunarChat requires a MySql-like database to run. You can either set up a local instance of MySql or MariaDB, or create a PlanetScale account for free or use another host. LunarChat itself uses PlanetScale. When the connection string is populated in the .env file, run `pnpm db:push` to push the schema to your datbase, then `pnpm db:seed` to seed it with some basic data.

If your command line is at the root of the project (ie, not in the 'server' or 'client' folders), then you can run `pnpm dev` to generate the prisma defintions, then spin up both client and server simultaneously. There are also `:client` and `:server` suffixed commands to target a specific project only (For example, `pnpm dev:client` will launch the client only). By default, the client starts up on port 3000, and the server starts on port 3001. The .env files in the root and the client project folder identify themselves to each other.

## To-do

- [x] Persistent storage of messages.
- [x] Fetch persistent message storage when the client first loads the page.
- [x] Auth (GitHub login only at the moment).
- [ ] Multiple channels.
- [x] Emoji support.
