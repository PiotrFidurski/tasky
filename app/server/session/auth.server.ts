import bcrypt from 'bcryptjs';

import { User } from '@prisma/client';

import { redirect } from 'remix';

import { createUser, getUserByUsername } from '~/models/user';

import { getUserSession } from '~/server/session/session.server';

/**
 * Partial fields of User Model.
 */
type UserInput = Pick<User, 'username' | 'password'>;

/**
 * Checks database for user existence.
 *
 * @param username - Username of the user.
 * @returns `Promise<User | null>`
 */
export async function login(username: UserInput['username']) {
  const user = await getUserByUsername(username);

  if (!user) return null;

  return user;
}

/**
 * Securely creates new user in the database.
 *
 * @returns `Promise<User>`
 */
export async function register({ username, password }: UserInput) {
  const passwordHash = await bcrypt.hash(password, 10);
  const lowerCaseUsername = username.toLowerCase().trim();

  return createUser({ username: lowerCaseUsername, password: passwordHash });
}

/**
 * Protects the route from unauthorized requests.
 *
 * @param request - Request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request.
 * @param redirectTo - Where to redirect if we don't find authenticated user.
 * @returns `Promise<string>`
 */
export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);

  const userId = session.get('userId');

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(`/login?${searchParams}`);
  }

  return userId;
}
