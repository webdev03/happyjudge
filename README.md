# happyjudge

A competitive programming online judging system!

## Features

- Authentication
- Contests
- Many languages (codefort)
- Modern UI

and more!

## Setup

You will need [Bun](https://bun.sh) installed, a PostgreSQL database, and an instance of [codefort](https://github.com/webdev03/codefort) available.

1. Clone this repository with `git clone https://github.com/webdev03/happyjudge.git`
2. Run `bun install`
3. Copy `.env.example` to `.env` with `cp .env .env.example`, then fill in your codefort instance URL and your PostgreSQL database URL
4. Run `bun run db:push` to set up the PostgreSQL database
5. Run `bun run build`
6. Run `bun ./build` to start `happyjudge`!

To update happyjudge, just run `git pull` in the directory that you cloned the source code in! **Note that happyjudge is designed to work with the latest version of codefort on the `main` branch!! If your happyjudge and codefort instances are out of sync, happyjudge may break!**
