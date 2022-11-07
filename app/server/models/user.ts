import { User } from '@prisma/client';

import { db } from '~/server/db/db.server';

import { getTrimmedString } from '~/utils/getTrimmedString';

export function getUserByUsername(username: string) {
  const trimmedUsername = getTrimmedString(username);

  return db.user.findFirst({
    where: {
      username: {
        mode: 'insensitive',
        equals: trimmedUsername,
      },
    },
  });
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
