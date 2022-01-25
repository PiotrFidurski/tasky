import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect } from 'remix';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import * as z from 'zod';
import { db } from '~/db/db.server';
import { badRequest } from '~/utils/badRequest';
import {
  getUserSession,
  sessionStorage,
} from './session.server';

export const authenticator = new Authenticator<
  User | Response
>(sessionStorage);

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
 * @returns `User`
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

  return existingUser;
}

/**
 * Retrieves user for the session from the database.
 *
 * @param {Request} request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @returns `User` | `Response` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export async function getUser({
  request,
}: {
  request: Request;
}) {
  const session = await getUserSession({ request });

  if (!session.data.userId) {
    return redirect('/login');
  }

  const user = await db.user.findFirst({
    where: { id: session.data?.userId },
  });

  return user;
}

const schema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(3, 'Username must be at least 3 characters long.'),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, 'Password must be at least 8 characters long.'),
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    try {
      const username = form.get('username') as string;
      const password = form.get('password') as string;

      schema.parse({ username, password });

      const user = await findOrCreateUser({
        username,
        password,
      });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        return badRequest({
          fieldErrors: {
            password: `The password you provided doesn't match.`,
          },
        });
      }

      const session = await sessionStorage.getSession();

      session.set('userId', user.id);

      return redirect('/home', {
        headers: {
          'Set-Cookie': await sessionStorage.commitSession(
            session
          ),
        },
      });
    } catch (error) {
      const errors = (error as z.ZodError).flatten();

      return badRequest({
        fieldErrors: {
          username: errors.fieldErrors.username?.[0],
          password: errors.fieldErrors.password?.[0],
        },
      });
    }
  })
);
