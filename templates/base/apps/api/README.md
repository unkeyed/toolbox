# Created by Unkey's toolbox

This API is built with speed, and security in mind. The API is built with [Hono](https://hono.dev), [Unkey](https://unkey.com) and [Turso](https://turso.io) with hosting on [Cloudlfare workers](https://cloudlfare.com).

## Getting Started

You will need a free account for both Unkey and Turso to run this project.

### Unkey

For Unkey you will need your API ID and a root key scoped to:

- Create Key
- Create Namespace
- Limit

You can of course add more scopes as required.

### Turso

For turso you need a database and auth token with read and write access.

## Environment Variables

To run this project, you will need to add the following environment variables to your .dev.vars file

```
TURSO_AUTH_TOKEN=TURSO_AUTH_TOKEN
TURSO_DATABASE_URL=TURSO_DATABASE_URL
UNKEY_API_ID=UNKEY_API_ID
UNKEY_ROOT_KEY=UNKEY_ROOT_KEY
```

## Usage

Make sure that you have run:

```
npm run db:generate
npm run db:push

```

You can then run `npm run dev`

Then you will have access to the following routes:

`/keys/create` - To create an API key to use with the other endpoints.

Then the post routes:

```
/posts/create
/posts/getAll
/posts/get/:id
/posts/update/:id
/posts/delete/:id
```

You also have access to the open-api spec found at http://localhost:8787/open-api
