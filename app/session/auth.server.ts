import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { db } from '~/db.server';
import { sessionStorage } from './session.server';

export const authenticator = new Authenticator<User | null>(
  sessionStorage
);

/**
 * Partial fields of User Model
 */
type UserInput = Pick<User, 'username' | 'password'>;

/**
 * Checks the database for existing user, if found returns the user,
 * otherwise creates brand new user.
 *
 * @param {string} username - Username of the user.
 * @param {string} password - Password of the user.
 * @returns User instance or null
 */

export async function findOrCreateUser({
  username,
  password,
}: UserInput) {
  const existingUser = await db.user.findFirst({
    where: { username },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { username, password: hashedPassword },
    });

    return user;
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    existingUser?.password
  );

  if (!isCorrectPassword) return null;

  return existingUser;
}

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get('username') as string;
    const password = form.get('password') as string;

    // TODO: do validation here

    const user = await findOrCreateUser({
      username,
      password,
    });

    return user;
  })
);
