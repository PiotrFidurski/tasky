import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { redirect } from 'remix';

import { createUser, getUserByUsername } from '~/models/user';

import { getUserSession } from './session.server';

/**
 * Partial fields of User Model.
 */
type UserInput = Pick<User, 'username' | 'password'>;

/**
 * Checks database for user existence.
 *
 * @param username - Name of the user.
 * @returns `User` or `null`
 */
export async function getUser(username: string) {
  const user = await db.user.findFirst({
    where: { username },
  });

  return user;
}

/**
 * Creates new user in the database.
 *
 * @param username - Username of the user.
 * @param password - Password of the user.
 * @returns `Promise<User>`
 */
export async function register({ username, password }: UserInput) {
  const passwordHash = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      username,
      password: passwordHash,
    },
  });
}
