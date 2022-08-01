// eslint-disable
import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let db: PrismaClient;

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var globalDb: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
  db.$connect();
} else {
  if (!global.globalDb) {
    global.globalDb = new PrismaClient();
    global.globalDb.$connect();
  }

  db = global.globalDb;
}

export { db };
