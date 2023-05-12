# LunarChat

LunarChat is a Next.js/Socket.IO based real-time chat application developed by the Lunar Inhabitants. For now, it's primarily an experiment.

## Getting Started

This repository is a repo that contains both the joint frontend/server client built in Next.js, and a secondary WebSockets server using ts-node and sockets.io. This secondary server pulls required information such as the Prisma database from the Next.js client. 

Note: LunarChat was developed using PNPM, rather than NPM or Yarn. If you have only used NPM, set up PNPM using [this guide](https://pnpm.io/installation#using-corepack).

To run a local copy, clone the repository, then run `pnpm install` to install the required packages for all projects. Duplicate the .env file and call it .env.local. In this file (that is gitignored), fill in all the TODO marked variables as desired. For the auth providers, if 'AUTH_{provider}_ENABLED' is false, you can delete the other parameters to clean up your env file a little. **DO NOT CHECK IN .env.local!**

LunarChat requires a MySql-like database to run. You can either set up a local instance of MySql or MariaDB, or create a PlanetScale account for free or use another host. LunarChat itself uses PlanetScale. When the connection string is populated in the .env file, run `pnpm db:push` to push the schema to your datbase, then `pnpm db:seed` to seed it with some basic data.

To run both the Next.js client and the WebSockets server, run `pnpm dev` to generate the prisma defintions, then spin up both client and server simultaneously. There are also `:client` and `:server` suffixed commands to target a specific project only (For example, `pnpm dev:client` will launch the client only). By default, the client starts up on port 3000, and the server starts on port 3001. The .env files in the root and the client project folder identify both client and server to one another.

## Technologies

### [PNPM](https://pnpm.io/) - Package Manager

[PNPM](https://pnpm.io/) is used over NPM and Yarn as it is both incredibly fast to work with and allows sharing downloaded node modules across arbitrary projects on a file system using hard links - primarily a developer benefit.

### [Next.js](https://nextjs.org/) - Frontend client and Backend server

[Next.js](https://nextjs.org/) is used as the primary frontend and backend provider due to both its ease of development and deployment to serverless and edge networks. LunarChat uses both the newer Next.JS 13 [app router](https://nextjs.org/docs/app/building-your-application/routing) and the currently in alpha [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) to simplify accessing the backend from client-side components.

### [Prisma ORM](https://www.prisma.io/)- Database ORM layer

[Prisma](https://www.prisma.io/) is used to access the backend database as it's very easy to define schemas and provides an extremely useful bespoke TypeScript client with full type safety.

### [PlanetScale](https://planetscale.com/) - Database

[PlanetScale](https://planetscale.com/) is used as it's a MySql-compatible distributed database service with an extremely generous free tier.

### [Socket.IO](https://socket.io/) - WebSocket server

[Socket.IO](https://socket.io/) is used as a simple and intuitive WebSocket server to handle the realtime aspect of LunarChat.

### [Tailwind CSS](https://tailwindcss.com/) - CSS framework

[Tailwind CSS](https://tailwindcss.com/) provides an easy to use unopinionated style system that works well in a React component-based ecosystem.

### [Nano Stores](https://github.com/nanostores/nanostores) - Global State Management

[Nano Stores](https://github.com/nanostores/nanostores) is used as a simple global state management system to share state across disparate React components avoiding unnecessary rerenders.

### [react-markdown](https://github.com/remarkjs/react-markdown) - Message parser

Messages in LunarChat are written as near-standards compliant Markdown. This library is used to parse messages and convert them into valid HTML via React.

## Definitions

### Realm

A 'realm' can be considered a collection of messaging channels that one or more users belong to. This is analogous to the definition of a server or guild in other chat applications. Multiple realms can exist within a single actual server. When a user logs onto a server, they can only see the realms that belong to that server (for the moment) that they are also members of.

### Channel

A channel is a single message board where multiple users can communicate. This follows the standard functionality of any realtime chat application.

## To-do

### Required.

- [x] Persistent storage of messages.
- [x] Fetch persistent message storage when the client first loads the page.
- [x] Auth (GitHub login only at the moment).
- [x] Multiple channels.
- [x] Emoji support.
- [ ] Advanced/Customer emoji support.
- [ ] Realm/Channel user list.
- [ ] User groups.
- [ ] User personalization.
- [ ] User settings.
- [ ] Customized log-in screen.

### Nice to haves.

- [ ] Distributed server architecture.
