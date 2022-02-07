import { db } from '~/db/db.server';

export function getUserByUsername(username: string) {
  return db.user.findFirst({ where: { username } });
}

export function getUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}

export function createUser(username: string, password: string) {
  return db.user.create({
    data: {
      username,
      password,
    },
  });
}
