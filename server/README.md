# Server setup

From this directory, start the API with:

```sh
npm start
```

The server listens on port `5000` by default. Set `PORT` to override it.
Before starting, configure `MONGODB_URI` in `.env` with the MongoDB connection
string. For MongoDB Compass, connect using the same connection string. The
server creates and reads job records in the `jobs` collection of the database
named in that URI.

The jobs API supports persistent create, read, update, and delete operations at
`/api/jobs`.
