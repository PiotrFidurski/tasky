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

  return existingUser;
}

/**
 * Parses the cookie header and returns `User`
 *
 * @param {Request} request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @returns `User` | `Response` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */

export async function getUser({
  request,
}: {
  request: Request;
}) {
  const session = await sessionStorage.getSession(
    request.headers.get('cookie')
  );

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
        return json(
          {
            fieldErrors: {
              password: `The password you provided doesn't match.`,
            },
          },
          { status: 400 }
        );
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

      return json(
        {
          fieldErrors: {
            username: errors.fieldErrors.username?.[0],
            password: errors.fieldErrors.password?.[0],
          },
        },
        { status: 400 }
      );
    }
  })
);
