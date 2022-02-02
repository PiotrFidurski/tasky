import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect } from 'remix';
import { db } from '~/db/db.server';
import { getUserSession } from './session.server';

/**
 * Partial fields of User Model
 */
type UserInput = Pick<User, 'username' | 'password'>;

/**
 * Retrieves user for the session from the database.
 *
 * @param {Request} request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @returns `User` | `Response` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export async function getUser({ request }: { request: Request }) {
  const session = await getUserSession({ request });

  if (!session.has('userId')) {
    return redirect('/login');
  }

  const user = await db.user.findFirst({
    where: { id: session.data?.userId },
  });

  return user;
}

/**
 * Checks database for user existence.
 *
 * @param {string} username - Username of the user.
 * @returns `User` or `null`
 */
export async function login({ username }: UserInput) {
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
