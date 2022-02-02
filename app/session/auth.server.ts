import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { db } from '~/db/db.server';

/**
 * Partial fields of User Model
 */
type UserInput = Pick<User, 'username' | 'password'>;

/**
 * Checks database for user existence.
 *
 * @param username - Username of the user.
 * @returns `User` or `null`
 */
export async function getUser(username: string) {
  const user = await db.user.findFirst({
    where: { username },
  });

  return user;
}

/**
 * Creates user in the database.
 *
 * @param {string} username - Username of the user.
 * @param {string} password - Password of the user.
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
