import { User } from '@prisma/client';

import { db } from '~/db/db.server';

export function getUserByUsername(username: string) {
  return db.user.findFirst({ where: { username } });
}

export function getUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}

type UserInput = Pick<User, 'username' | 'password'>;

export function createUser({ username, password }: UserInput) {
  return db.user.create({
    data: {
      username,
      password,
    },
  });
}
