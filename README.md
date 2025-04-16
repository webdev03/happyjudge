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

1. Clone this repository
2. Run `bun install`
3. Copy `.env.example` to `.env` with `cp .env .env.example`, then fill in your codefort instance URL and your PostgreSQL database URL
4. Run `bun run db:push` to set up the PostgreSQL database
5. Run `bun run build`
6. Run `bun ./build` to start `happyjudge`!
